import { z } from "zod";
import { prisma } from "../../db/client";
import { findIsUserLiked } from "../../utils/isLiked";
import { isOwner } from "../../utils/isOwner";
import { inferQueryResponses } from "../../utils/trpc";
import { createPostValidation } from "../../utils/validations";
import { createRouter } from "./context";

export const postsRouter = createRouter()
  .query("get-all-posts", {
    async resolve({ ctx }) {
      const posts = await prisma.post.findMany({
        select: {
          id: true,
          title: true,
          created: true,
          updated: true,
          userToken: true,
          githubUser: {
            select: {
              name: true,
              email: true,
              image: true,
            },
          },
          tags: true,
          views: true,
          likes: {
            select: {
              userToken: true,
              userEmail: true,
            },
          },
          _count: {
            select: {
              likes: true,
              Comment: true,
            },
          },
        },
      });

      return posts.map((post) => {
        return {
          ...post,
          ownerLiked: findIsUserLiked({
            likes: post.likes,
            ctx,
          }),
          isOwner: isOwner({
            contentToken: post.userToken,
            token: ctx.token!,
            contentEmail: post.githubUser?.email,
            email: ctx.session?.user?.email,
          }),
        };
      });
    },
  })
  .query("get-my-posts", {
    async resolve({ ctx }) {
      let posts: {
        githubUser: {
          name: string | null;
          email: string | null;
          image: string | null;
        } | null;
        id: string;
        title: string;
        created: Date;
        userToken: string;
        likes: {
          userToken: string;
          userEmail: string | null;
        }[];
        _count: {
          likes: number;
          Comment: number;
        };
      }[] = [];
      if (ctx.session) {
        posts = await prisma.post.findMany({
          where: {
            userEmail: ctx.session.user?.email,
          },
          select: {
            id: true,
            title: true,
            created: true,
            updated: true,
            userToken: true,
            githubUser: {
              select: {
                name: true,
                email: true,
                image: true,
              },
            },
            tags: true,
            views: true,
            likes: {
              select: {
                userToken: true,
                userEmail: true,
              },
            },
            _count: {
              select: {
                likes: true,
                Comment: true,
              },
            },
          },
        });
      }
      const anonymousPosts = await prisma.post.findMany({
        where: {
          userToken: {
            equals: ctx.token,
          },
          userEmail: {
            equals: null,
          },
        },
        select: {
          id: true,
          title: true,
          created: true,
          updated: true,
          userToken: true,
          githubUser: {
            select: {
              name: true,
              email: true,
              image: true,
            },
          },
          tags: true,
          views: true,
          likes: {
            select: {
              userToken: true,
              userEmail: true,
            },
          },
          _count: {
            select: {
              likes: true,
              Comment: true,
            },
          },
        },
      });

      return [...posts, ...anonymousPosts].map((post) => ({
        ...post,
        ownerLiked: findIsUserLiked({
          likes: post.likes,
          ctx,
        }),
      }));
    },
  })
  .query("get-by-id", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      const fullPostInfo = await prisma.post.findFirst({
        where: {
          id: input.id,
        },
      });
      const post = await prisma.post.findFirst({
        where: {
          id: input.id,
        },
        include: {
          githubUser: {
            select: {
              name: true,
              email: true,
              image: true,
            },
          },
          likes: {
            select: {
              userToken: true,
              userEmail: true,
            },
          },
          _count: {
            select: {
              likes: true,
            },
          },
        },
      });

      const comments = await prisma.comment.findMany({
        where: {
          postId: input.id,
        },
        include: {
          githubUser: {
            select: {
              name: true,
              email: true,
              image: true,
            },
          },
        },
      });

      const commentsWithOwner = comments.map((comment) => {
        return {
          ...comment,
          isOwner: isOwner({
            contentToken: comment.userToken,
            token: ctx.token!,
            contentEmail: comment.githubUser?.email,
            email: ctx.session?.user?.email,
          }),
        };
      });

      return {
        ...post,
        ownerLiked: findIsUserLiked({
          likes: post?.likes!,
          ctx,
        }),
        isOwner: isOwner({
          contentToken: fullPostInfo!.userToken,
          token: ctx.token!,
          contentEmail: post!.githubUser?.email,
          email: ctx.session?.user?.email,
        }),
        comments: commentsWithOwner,
      };
    },
  })
  .mutation("create", {
    input: createPostValidation,
    async resolve({ input, ctx }) {
      if (!ctx.token) throw new Error("Unauthorized");

      if (ctx.session) {
        return await prisma.post.create({
          data: {
            title: input.title,
            description: input.description,
            userToken: ctx.token,
            userEmail: ctx.session.user?.email,
          },
        });
      }
      return await prisma.post.create({
        data: {
          title: input.title,
          description: input.description,
          userToken: ctx.token,
        },
      });
    },
  })
  .mutation("edit", {
    input: z.object({
      id: z.string(),
      title: z.string().min(6).max(200),
      description: z.string().min(6).max(2000).trim(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.token) throw new Error("Unauthorized");

      const post = await prisma.post.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!post) throw new Error("404 Not Found");

      if (post.userEmail !== null) {
        if (!ctx.session) throw new Error("Unauthorized");
        if (ctx.session && ctx.session.user) {
          if (post.userEmail === ctx.session.user.email) {
            return await prisma.post.update({
              where: {
                id: input.id,
              },
              data: {
                title: input.title,
                description: input.description,
                userToken: ctx.token,
                updated: new Date(),
              },
            });
          } else {
            throw new Error("Unauthorized");
          }
        }
      }

      if (post.userToken === ctx.token) {
        return await prisma.post.update({
          where: {
            id: input.id,
          },
          data: {
            title: input.title,
            description: input.description,
            userToken: ctx.token,
          },
        });
      }

      throw new Error("Unauthorized");
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.token) throw new Error("Unauthorized");

      const post = await prisma.post.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!post) throw new Error("404 Not Found");

      if (post.userEmail !== null) {
        if (!ctx.session) throw new Error("Unauthorized");
        if (ctx.session && ctx.session.user) {
          if (post.userEmail === ctx.session.user.email) {
            await prisma.like.deleteMany({
              where: {
                postId: input.id,
              },
            });
            await prisma.tag.deleteMany({
              where: {
                postId: input.id,
              },
            });
            await prisma.comment.deleteMany({
              where: {
                postId: input.id,
              },
            });
            return await prisma.post.delete({
              where: {
                id: input.id,
              },
            });
          } else {
            throw new Error("Unauthorized");
          }
        }
      }

      if (post.userToken === ctx.token) {
        await prisma.like.deleteMany({
          where: {
            postId: input.id,
          },
        });
        await prisma.tag.deleteMany({
          where: {
            postId: input.id,
          },
        });
        await prisma.comment.deleteMany({
          where: {
            postId: input.id,
          },
        });
        return await prisma.post.delete({
          where: {
            id: input.id,
          },
        });
      }

      throw new Error("Unauthorized");
    },
  });

export type GetPostsArrType = inferQueryResponses<"post.get-all-posts">;
export type GetPostType = GetPostsArrType[number];

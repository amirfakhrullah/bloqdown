import { User } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../../db/client";
import { findIsUserLiked } from "../../utils/isLiked";
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
          userToken: true,
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

      return posts.map((post) => {
        return {
          ...post,
          ownerLiked: findIsUserLiked({
            likes: post.likes,
            ctx,
          }),
          isOwner: post.userToken === ctx.token,
        };
      });
    },
  })
  .query("get-my-posts", {
    async resolve({ ctx }) {
      let posts: {
        githubUser: User | null;
        id: string;
        title: string;
        created: Date;
        userToken: string;
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
            userToken: true,
            githubUser: true,
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
          userToken: true,
          githubUser: true,
        },
      });

      return [...posts, ...anonymousPosts];
    },
  })
  .query("get-by-id", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
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
          isOwner: comment.userToken === ctx.token,
        };
      });

      return {
        ...post,
        isOwner: post?.userToken === ctx.token,
        comments: commentsWithOwner,
      };
    },
  })
  .mutation("create", {
    input: createPostValidation,
    async resolve({ input, ctx }) {
      if (!ctx.token) {
        return { error: "Unauthorized" };
      }

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
  });

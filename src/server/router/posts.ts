import { z } from "zod";
import { prisma } from "../../db/client";
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
        },
      });

      return posts.map((post) => {
        return {
          ...post,
          isOwner: post.userToken === ctx.token,
        };
      });
    },
  })
  .query("get-my-posts", {
    async resolve({ ctx }) {
      return await prisma.post.findMany({
        where: {
          userToken: {
            equals: ctx.token,
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

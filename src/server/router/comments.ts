import { z } from "zod";
import { prisma } from "../../db/client";
import { createRouter } from "./context";
import { createCommentValidation } from "../../utils/validations";

export const commentsRouter = createRouter()
  .query("get-comments", {
    input: z.object({
      postId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const comments = await prisma.comment.findMany({
        where: {
          postId: input.postId,
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

      return comments.map((comment) => {
        return {
          ...comment,
          isOwner: comment.userToken === ctx.token,
        };
      });
    },
  })
  .query("get-my-comments", {
    async resolve({ ctx }) {
      return await prisma.comment.findMany({
        where: {
          userToken: {
            equals: ctx.token,
          },
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
    },
  })
  .mutation("create", {
    input: createCommentValidation,
    async resolve({ input, ctx }) {
      if (!ctx.token) {
        return { error: "Unauthorized" };
      }
      if (ctx.session) {
        return await prisma.comment.create({
          data: {
            text: input.text,
            postId: input.postId,
            userToken: ctx.token,
            userEmail: ctx.session.user?.email,
          },
        });
      }
      return await prisma.comment.create({
        data: {
          text: input.text,
          postId: input.postId,
          userToken: ctx.token,
        },
      });
    },
  });

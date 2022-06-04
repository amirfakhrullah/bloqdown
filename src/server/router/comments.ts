import { z } from "zod";
import { prisma } from "../../db/client";
import { createRouter } from "./context";

export const commentsRouter = createRouter()
  .query("get-comments", {
    input: z.object({
      postId: z.string(),
    }),
    async resolve({ input }) {
      return await prisma.comment.findMany({
        where: {
          postId: input.postId,
        },
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
      });
    },
  })
  .mutation("create", {
    input: z.object({
      text: z.string().min(2).max(200),
      postId: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.token) {
        return { error: "Unauthorized" };
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

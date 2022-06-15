import { z } from "zod";
import { prisma } from "../../db/client";
import { createRouter } from "./context";

export const likesRouter = createRouter()
  .mutation("like", {
    input: z.object({
      postId: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.token) throw new Error("Unauthorized");

      if (ctx.session) {
        return await prisma.like.create({
          data: {
            userToken: ctx.token,
            postId: input.postId,
            userEmail: ctx.session.user?.email,
          },
        });
      }
      return await prisma.like.create({
        data: {
          userToken: ctx.token,
          postId: input.postId,
        },
      });
    },
  })
  .mutation("dislike", {
    input: z.object({
      postId: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.token)  throw new Error("Unauthorized");
      
      if (ctx.session) {
        return await prisma.like.delete({
          where: {
            postId_userEmail: {
              postId: input.postId,
              userEmail: ctx.session.user?.email!,
            },
          },
        });
      }
      return await prisma.like.delete({
        where: {
          postId_userToken: {
            postId: input.postId,
            userToken: ctx.token,
          },
        },
      });
    },
  });

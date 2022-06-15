import { z } from "zod";
import { prisma } from "../../db/client";
import { createRouter } from "./context";
import { createCommentValidation } from "../../utils/validations";
import { inferQueryResponses } from "../../utils/trpc";

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
      if (!ctx.token) throw new Error("Unauthorized");

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
  })
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.token) throw new Error("Unauthorized");

      const comment = await prisma.comment.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!comment) throw new Error("404 Not Found");

      if (comment.userEmail !== null) {
        if (!ctx.session) throw new Error("Unauthorized");
        if (ctx.session && ctx.session.user) {
          if (comment.userEmail === ctx.session.user.email) {
            return await prisma.comment.delete({
              where: {
                id: input.id,
              },
            });
          } else {
            throw new Error("Unauthorized");
          }
        }
      }

      if (comment.userToken === ctx.token) {
        return await prisma.comment.delete({
          where: {
            id: input.id,
          },
        });
      }

      throw new Error("Unauthorized");
    },
  });

export type GetCommentsArrType = inferQueryResponses<"comment.get-comments">;
export type GetCommentType = GetCommentsArrType[number];

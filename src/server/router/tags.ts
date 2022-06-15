import { z } from "zod";
import { prisma } from "../../db/client";
import { createRouter } from "./context";
import { inferQueryResponses } from "../../utils/trpc";
import { tagInputValidation } from "../../utils/validations";

export const tagsRouter = createRouter()
  .query("get-all", {
    async resolve() {
      return await prisma.tag.findMany({
        distinct: ["tagName"],
      });
    },
  })
  .query("get-by-postId", {
    input: z.object({
      postId: z.string(),
    }),
    async resolve({ input }) {
      return await prisma.tag.findMany({
        where: {
          postId: input.postId,
        },
      });
    },
  })
  .mutation("add", {
    input: tagInputValidation,
    async resolve({ input, ctx }) {
      if (!ctx.token) throw new Error("Unauthorized");

      const post = await prisma.post.findFirst({
        where: {
          id: input.postId,
        },
      });

      if (!post) throw new Error("404 Not Found");

      if (post.userEmail !== null) {
        if (!ctx.session) throw new Error("Unauthorized");
        if (ctx.session && ctx.session.user) {
          if (post.userEmail === ctx.session.user.email) {
            return await prisma.tag.create({
              data: {
                tagName: input.tagName,
                postId: post.id,
              },
            });
          } else {
            throw new Error("Unauthorized");
          }
        }
      }

      if (post.userToken === ctx.token) {
        return await prisma.tag.create({
          data: {
            tagName: input.tagName,
            postId: post.id,
          },
        });
      }

      throw new Error("Unauthorized");
    },
  })
  .mutation("delete", {
    input: tagInputValidation,
    async resolve({ input, ctx }) {
      if (!ctx.token) throw new Error("Unauthorized");

      const tag = await prisma.tag.findUnique({
        where: {
          postId_tagName: {
            postId: input.postId,
            tagName: input.tagName,
          },
        },
        include: {
          post: true,
        },
      });

      if (!tag) throw new Error("404 Not Found");

      if (tag.post.userEmail !== null) {
        if (!ctx.session) throw new Error("Unauthorized");
        if (ctx.session && ctx.session.user) {
          if (tag.post.userEmail === ctx.session.user.email) {
            return await prisma.tag.delete({
              where: {
                postId_tagName: {
                  postId: input.postId,
                  tagName: input.tagName,
                },
              },
            });
          } else {
            throw new Error("Unauthorized");
          }
        }
      }

      if (tag.post.userToken === ctx.token) {
        return await prisma.tag.delete({
          where: {
            postId_tagName: {
              postId: input.postId,
              tagName: input.tagName,
            },
          },
        });
      }

      throw new Error("Unauthorized");
    },
  });

export type GetTagsArr = inferQueryResponses<"tags.get-all">;
export type GetTags = GetTagsArr[number];

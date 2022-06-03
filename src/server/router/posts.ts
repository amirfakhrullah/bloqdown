import { z } from "zod";
import { prisma } from "../../db/client";
import { createRouter } from "./context";

export const postsRouter = createRouter()
  .query("get-all", {
    async resolve() {
      return await prisma.post.findMany();
    },
  })
  .query("get-by-id", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      return await prisma.post.findFirst({
        where: {
          id: input.id,
        },
      });
    },
  })
  .mutation("create", {
    input: z.object({
      title: z.string().min(6).max(200),
      description: z.string().min(6).max(1000),
    }),
    async resolve({ input }) {
      return await prisma.post.create({
        data: {
          title: input.title,
          description: input.description,
        },
      });
    },
  });

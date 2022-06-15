import { z } from "zod";
import { prisma } from "../../db/client";
import { createRouter } from "./context";
import { createCommentValidation } from "../../utils/validations";
import { inferQueryResponses } from "../../utils/trpc";

export const tagsRouter = createRouter().query("add", {
  input: z.object({
    postId: z.string(),
    tagName: z.string().min(2).max(20).trim(),
  }),
  async resolve({ input, ctx }) {
    if (!ctx.token) {
      return { error: "Unauthorized" };
    }

    const post = await prisma.post.findFirst({
      where: {
        id: input.postId,
      },
    });

    if (!post) throw new Error("404 Not Found");


  },
});

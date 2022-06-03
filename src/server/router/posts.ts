import * as trpc from "@trpc/server";
import { prisma } from "../../db/client";

export const postsRouter = trpc.router().query("get-all", {
  async resolve() {
    return await prisma.post.findMany();
  },
});

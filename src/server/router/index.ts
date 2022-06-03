import * as trpc from "@trpc/server";
import { z } from "zod";
import superjson from 'superjson';
import { postsRouter } from "./posts";

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? "world"}`,
      };
    },
  })
  .merge("posts.", postsRouter)

// export type definition of API
export type AppRouter = typeof appRouter;

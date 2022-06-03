import superjson from "superjson";
import { postsRouter } from "./posts";
import { createRouter } from "./context";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("post.", postsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

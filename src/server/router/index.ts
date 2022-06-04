import superjson from "superjson";
import { postsRouter } from "./posts";
import { createRouter } from "./context";
import { commentsRouter } from "./comments";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("post.", postsRouter)
  .merge("comment.", commentsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

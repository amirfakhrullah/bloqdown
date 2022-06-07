import superjson from "superjson";
import { postsRouter } from "./posts";
import { createRouter } from "./context";
import { commentsRouter } from "./comments";
import { likesRouter } from "./likes";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("post.", postsRouter)
  .merge("comment.", commentsRouter)
  .merge("likes.", likesRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

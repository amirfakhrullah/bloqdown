import superjson from "superjson";
import { postsRouter } from "./posts";
import { createRouter } from "./context";
import { commentsRouter } from "./comments";
import { likesRouter } from "./likes";
import { tagsRouter } from "./tags";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("post.", postsRouter)
  .merge("comment.", commentsRouter)
  .merge("likes.", likesRouter)
  .merge("tags.", tagsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

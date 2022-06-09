import { createReactQueryHooks } from "@trpc/react";
import { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "../server/router";

export const trpc = createReactQueryHooks<AppRouter>();
// => { useQuery: ..., useMutation: ...}

export type inferQueryResponses<
  TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;

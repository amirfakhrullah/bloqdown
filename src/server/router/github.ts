import { createRouter } from "./context";
import { getRepoData } from "../../lib/github";
import { inferQueryResponses } from "../../utils/trpc";

export const githubRouter = createRouter().query("get-repo-data", {
  async resolve() {
    return await getRepoData();
  },
});

export type RepoResType = inferQueryResponses<"github.get-repo-data">;

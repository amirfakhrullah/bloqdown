import { Octokit } from "@octokit/rest";

export const getRepoData = async () => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
  });

  const repo = await octokit.request("GET /repos/amirfakhrullah/BloqDown", {
    owner: "OWNER",
    repo: "REPO",
  });

  if (repo.status !== 200) return;

  const { data } = repo;
  
  return {
    name: data.name,
    owner: {
        login: data.owner.login,
        avatar_url: data.owner.avatar_url,
    },
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    pushedAt: data.pushed_at,
    clone_url: data.clone_url,
    repo_url: data.svn_url,
    size: data.size,
    stars: data.stargazers_count,
    watches: data.watchers,
    forks: data.forks,
    language: data.language,
    issues: data.open_issues,
    license: data.license.name,
  }
};

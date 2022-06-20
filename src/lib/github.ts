import { Octokit } from "@octokit/rest";

export const getRepoData = async () => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
  });

  const repo = await octokit.request("GET /repos/amirfakhrullah/BloqDown", {
    owner: "OWNER",
    repo: "REPO",
  });

  const releases = await octokit.request(
    "GET https://api.github.com/repos/amirfakhrullah/BloqDown/releases",
    {
      owner: "OWNER",
      repo: "REPO",
    }
  );

  if (repo.status !== 200) return;

  const { data } = repo;

  return {
    name: data.name as string,
    owner: {
      login: data.owner.login as string,
      avatar_url: data.owner.avatar_url as string,
    },
    createdAt: data.created_at as Date,
    updatedAt: data.pushed_at as Date,
    pushedAt: data.pushed_at as Date,
    clone_url: data.clone_url as string,
    repo_url: data.svn_url as string,
    size: data.size as number,
    stars: data.stargazers_count as number,
    watches: data.watchers as number,
    forks: data.forks as number,
    language: data.language as string,
    issues: data.open_issues as number,
    license: data.license.spdx_id as string,
    latestRelease: {
      release_url: releases.data[0].html_url as string,
      tag_name: releases.data[0].tag_name as string,
    },
  };
};

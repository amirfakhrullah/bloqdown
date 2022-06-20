import React from "react";
import { BsFileEarmarkCode } from "react-icons/bs";
import { trpc } from "../utils/trpc";
import TagsLeftNavLoader from "./loaders/TagsLeftNavLoader";

const GitHubCard = () => {
  const { data: repoData, isLoading } = trpc.useQuery(["github.get-repo-data"]);

  if (isLoading || !repoData) return <TagsLeftNavLoader />;

  return (
    <>
      <div className="flex flex-row items-center px-2">
        <BsFileEarmarkCode className="mr-2 text-lg" />
        <p className="font-bold ml-1">Repo Stats</p>
      </div>

      <div className="my-1 py-2 px-1 rounded-lg bg-slate-800 border border-gray-600">
        <p>{repoData.size} KB</p>
      </div>
    </>
  );
};

export default GitHubCard;

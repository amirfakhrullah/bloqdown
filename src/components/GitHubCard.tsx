import React from "react";
import {
  BsFileEarmarkCode,
  BsFillCloudUploadFill,
  BsTagFill,
} from "react-icons/bs";
import { trpc } from "../utils/trpc";
import TagsLeftNavLoader from "./loaders/TagsLeftNavLoader";
import { dateFormatter } from "../utils/dateFormatter";
import { AiFillEye, AiFillFolder, AiFillStar } from "react-icons/ai";
import {
  TbGitFork,
  // TbLicense
} from "react-icons/tb";
import { IoCodeSlashSharp } from "react-icons/io5";
import { VscIssues } from "react-icons/vsc";
import Link from "next/link";

const GitHubCard = () => {
  const { data: repoData, isLoading } = trpc.useQuery(["github.get-repo-data"]);

  return (
    <>
      <div className="flex flex-row items-center px-2">
        <BsFileEarmarkCode className="mr-2 text-lg" />
        <p className="font-bold ml-1">Live Repo Stats</p>
      </div>

      {isLoading || !repoData ? (
        <TagsLeftNavLoader />
      ) : (
        <div className="my-1 py-2 px-1 rounded-lg bg-slate-800 border border-gray-600">
          <div className="p-2 px-3 flex flex-row items-center">
            <BsTagFill className="mr-2 text-md" />
            <Link href={repoData.latestRelease.release_url} target="_blank">
              <p className="ml-3 cursor-pointer hover:underline">
                Release {repoData.latestRelease.tag_name}
              </p>
            </Link>
          </div>

          <div className="p-2 px-3 flex flex-row items-center">
            <AiFillStar className="mr-2 text-lg" />
            <p className="ml-2">
              {repoData.stars} Stargazer{repoData.stars > 1 && "s"}
            </p>
          </div>

          <div className="p-2 px-3 flex flex-row items-center">
            <AiFillEye className="mr-2 text-lg" />
            <p className="ml-2">
              {repoData.watches} Watcher{repoData.watches > 1 && "s"}
            </p>
          </div>

          <div className="p-2 px-3 flex flex-row items-center">
            <TbGitFork className="mr-2 text-lg" />
            <p className="ml-2">
              {repoData.forks} Fork{repoData.forks > 1 && "s"}
            </p>
          </div>

          <div className="p-2 px-3 flex flex-row items-center">
            <VscIssues className="mr-2 text-lg" />
            <Link href={`${repoData.repo_url}/issues`} target="_blank">
              <p className="ml-2 cursor-pointer hover:underline">
                {repoData.issues} Open Issue{repoData.issues > 1 && "s"}
              </p>
            </Link>
          </div>

          <div className="p-2 px-3 flex flex-row items-center">
            <IoCodeSlashSharp className="mr-2 text-lg" />
            <p className="ml-2">{repoData.language}</p>
          </div>

          <div className="p-2 px-3 flex flex-row items-center">
            <AiFillFolder className="mr-2 text-lg" />
            <p className="ml-2">{repoData.size} MB</p>
          </div>

          <div className="p-2 px-3 flex flex-row items-center">
            <BsFillCloudUploadFill className="mr-2 text-md" />
            <p className="ml-3">
              {dateFormatter(new Date(repoData.updatedAt))}
            </p>
          </div>

          {/* <div className="p-2 px-3 flex flex-row items-center">
            <TbLicense className="mr-2 text-md" />
            <p className="ml-3">License {repoData.license}</p>
          </div> */}
        </div>
      )}
    </>
  );
};

export default GitHubCard;

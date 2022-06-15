import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCommentAlt } from "react-icons/fa";
import { GetPostType } from "../server/router/posts";
import { dateFormatter } from "../utils/dateFormatter";
import Likes from "./Likes";

const PostCard: React.FC<GetPostType & { isFiltered?: boolean }> = ({
  id,
  title,
  created,
  _count,
  ownerLiked,
  githubUser,
  isOwner,
  tags,
  isFiltered = true,
}) => {
  if (!isFiltered) return <></>;

  return (
    <div className="my-2 p-3 rounded-lg bg-slate-800 border border-gray-600 overflow-hidden">
      <h3 className="font-bold text-lg text-gray-200">{title}</h3>
      {githubUser && (
        <div className="flex flex-row items-center my-1">
          <Image
            src={githubUser.image!}
            height={20}
            width={20}
            alt="github avatar"
            className="rounded-full"
          />
          <p className=" ml-2 text-sm font-bold text-gray-400">
            {githubUser.name}
          </p>
        </div>
      )}
      {typeof isOwner === "boolean" && !githubUser && (
        <p className="text-sm font-bold text-gray-400">
          {isOwner ? "By you" : "Anonymous"}
        </p>
      )}
      <p className="text-gray-500 text-sm">{dateFormatter(created)}</p>

      <div>
        {tags?.map((tag, idx) => (
          <div
            key={`tag__post__${tag.tagName}__${idx}`}
            className="inline-flex flex-row items-center px-2 m-1 rounded-full bg-indigo-500 text-white text-sm border border-indigo-300"
          >
            {tag.tagName}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="flex flex-row items-center">
          <Likes postId={id} ownerLiked={ownerLiked} likes={_count.likes} />

          <Link href={`/posts/${id}#comments`}>
            <div className="flex flex-row items-center ml-2 cursor-pointer hover:bg-slate-900 p-1 rounded-md">
              <p className="text-gray-500 text-sm font-bold mr-1">
                {_count.Comment}{" "}
                <span className="sm:inline hidden">
                  Comment{_count.Comment > 1 && "s"}
                </span>
              </p>
              <FaCommentAlt className="text-gray-500 text-sm" />
            </div>
          </Link>
        </div>

        <Link href={`/posts/${id}`}>
          <div className="py-2 px-4 rounded-md inline-block bg-gray-700 cursor-pointer">
            <p className="text-sm text-white font-medium">Read</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;

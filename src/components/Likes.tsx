import React from "react";
import { AiFillLike } from "react-icons/ai";
import { trpc } from "../utils/trpc";

const Likes: React.FC<{
  postId: string;
  ownerLiked: boolean;
  likes: number;
}> = ({ postId, ownerLiked, likes }) => {
  const client = trpc.useContext();

  const likeMutation = trpc.useMutation("likes.like", {
    onSuccess: () => {
      client.invalidateQueries(["post.get-by-id"]);
      client.invalidateQueries(["post.get-all-posts"]);
    },
  });

  const dislikeMutation = trpc.useMutation("likes.dislike", {
    onSuccess: () => {
      client.invalidateQueries(["post.get-by-id"]);
      client.invalidateQueries(["post.get-all-posts"]);
    },
  });

  const handleClick = () => {
    if (likeMutation.isLoading || dislikeMutation.isLoading) return;

    if (ownerLiked) {
      dislikeMutation.mutate({ postId });
    } else {
      likeMutation.mutate({ postId });
    }
  };

  if (likeMutation.isLoading || dislikeMutation.isLoading) {
    return (
      <div className="flex flex-row items-center cursor-not-allowed p-1 rounded-md">
        <p className="text-gray-500 text-sm font-bold mr-1">Updating</p>
      </div>
    );
  }

  return (
    <div
      onClick={() => handleClick()}
      className="flex flex-row items-center cursor-pointer hover:bg-indigo-900 p-1 rounded-md"
    >
      <p
        className={`text-gray-500 text-sm font-bold mr-1 ${
          ownerLiked ? "text-indigo-500" : "text-gray-500"
        }`}
      >
        {likes} <span className="sm:inline hidden">Like{likes > 1 && "s"}</span>
      </p>
      <div>
        <AiFillLike
          className={`${ownerLiked ? "text-indigo-500" : "text-gray-500"}`}
        />
      </div>
    </div>
  );
};

export default Likes;

import React from "react";
import { AiFillLike } from "react-icons/ai";
import { trpc } from "../utils/trpc";

/**
 * Liking section for posts
 */
const Likes: React.FC<{
  postId: string;
  ownerLiked: boolean;
  likes: number;
  page: "home" | "myPage" | "post"; // for indicating which invalidateQueries to perform, refer the "onSuccess" in the mutation
}> = ({ postId, ownerLiked, likes, page }) => {
  const client = trpc.useContext();

  const likeMutation = trpc.useMutation("likes.like", {
    onSuccess: () => {
      if (page === "home") {
        client.invalidateQueries(["post.get-all-posts"]);
      } else if (page === "myPage") {
        client.invalidateQueries(["post.get-my-posts"]);
      } else if (page === "post") {
        client.invalidateQueries(["post.get-by-id"]);
      }
    },
  });

  const dislikeMutation = trpc.useMutation("likes.dislike", {
    onSuccess: () => {
      if (page === "home") {
        client.invalidateQueries(["post.get-all-posts"]);
      } else if (page === "myPage") {
        client.invalidateQueries(["post.get-my-posts"]);
      } else if (page === "post") {
        client.invalidateQueries(["post.get-by-id"]);
      }
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
      <div>
        <AiFillLike
          className={`${ownerLiked ? "text-indigo-500" : "text-gray-500"}`}
        />
      </div>

      <p
        className={`text-gray-500 text-sm font-medium ml-1 ${
          ownerLiked ? "text-indigo-500" : "text-gray-500"
        }`}
      >
        {likes} <span className="sm:inline hidden">like{likes > 1 && "s"}</span>
      </p>
    </div>
  );
};

export default Likes;

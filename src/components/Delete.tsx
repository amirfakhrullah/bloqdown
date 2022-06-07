import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { trpc } from "../utils/trpc";

const Delete: React.FC<{
  children?: string | string[];
  type: "comment" | "post";
  id: string;
  isOwner: boolean;
  githubUser:
    | {
        image: string | null;
        name: string | null;
        email: string | null;
      }
    | null
    | undefined;
}> = ({ children, type, id, isOwner, githubUser }) => {
  const { data: session } = useSession();
  const client = trpc.useContext();
  const router = useRouter();

  const deletePost = trpc.useMutation("post.delete", {
    onSuccess: () => {
      client.invalidateQueries(["post.get-all-posts"]);
      router.push("/");
    },
  });
  const deleteComment = trpc.useMutation("comment.delete", {
    onSuccess: () => {
      client.invalidateQueries(["post.get-by-id"]);
    },
  });

  const handleClick = () => {
    if (type === "post") {
      return deletePost.mutate({ id });
    }
    if (type === "comment") {
      return deleteComment.mutate({ id });
    }
  };

  if (deletePost.isLoading || deleteComment.isLoading) {
    return (
      <div className="py-2 px-1 cursor-not-allowed">
        <p className="text-sm font-medium text-red-400 ml-1">Deleting</p>
      </div>
    );
  }

  if (
    (githubUser && session && githubUser.email === session.user?.email) ||
    (!githubUser && isOwner)
  ) {
    return (
      <div
        onClick={() => handleClick()}
        className="flex flex-row items-center py-2 px-1 cursor-pointer"
      >
        <AiOutlineDelete className="text-red-400 text-lg" />
        <p className="text-sm font-medium text-red-400 ml-1">{children}</p>
      </div>
    );
  }

  return <></>;
};

export default Delete;

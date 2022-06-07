import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
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

  const [openPopup, setOpenPopup] = useState(false);

  const deletePost = trpc.useMutation("post.delete", {
    onSuccess: () => {
      setOpenPopup(false);
      client.invalidateQueries(["post.get-all-posts"]);
      router.push("/");
    },
  });
  const deleteComment = trpc.useMutation("comment.delete", {
    onSuccess: () => {
      client.invalidateQueries(["post.get-by-id"]);
      setOpenPopup(false);
    },
  });

  const handleClick = () => {
    if (deletePost.isLoading || deleteComment.isLoading) return;
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
      <>
        <div
          onClick={() => setOpenPopup(true)}
          className="flex flex-row items-center py-2 px-1 cursor-pointer"
        >
          <AiOutlineDelete className="text-red-400 text-lg" />
          <p className="text-sm font-medium text-red-400 ml-1">{children}</p>
        </div>

        {/* Modal */}
        <div className={`modal ${openPopup && "modal-open"}`}>
          <div className="modal-box rounded-md bg-slate-900 border border-gray-500">
            <h3 className="font-bold text-lg">This action is permanent</h3>
            <p className="py-4">Are you sure you want to delete this?</p>
            <div className="modal-action">
              <label htmlFor="my-modal" className="btn" onClick={() => setOpenPopup(false)}>
                Cancel
              </label>

              <label
                htmlFor="my-modal"
                className="btn bg-red-800 hover:bg-red-900"
                onClick={() => handleClick()}
              >
                Confirm
              </label>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <></>;
};

export default Delete;

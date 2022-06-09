import { useSession } from "next-auth/react";
import React, { Dispatch, SetStateAction } from "react";

const PostButton: React.FC<{
    setOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ setOpen }) => {
  const { data: session } = useSession();
  return (
    <div className="flex justify-between bg-slate-700 p-2 rounded-md items-center">
      <p className="text-sm text-gray-100 ml-2">
        Post as {session ? session.user?.name : "anonymous"}
      </p>
      <button
        type="button"
        className="py-2 px-4 rounded-md inline-block bg-indigo-500 hover:bg-indigo-700 cursor-pointer text-sm text-white font-medium"
        onClick={() => setOpen(true)}
      >
        + <span className="sm:inline hidden">Add New Post</span>
      </button>
    </div>
  );
};

export default PostButton;

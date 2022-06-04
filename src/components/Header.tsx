import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Header: React.FC<{
  myPostsButton?: boolean;
}> = ({ myPostsButton = true }) => {
  const router = useRouter();

  return (
    <div className="w-full bg-slate-900 border-b border-gray-800 p-5 flex flex-row items-center justify-between">
      <Link href="/">
        <h1 className="text-2xl font-black text-gray-400 cursor-pointer">
          Polley
        </h1>
      </Link>
      {myPostsButton && (
        <button
          type="button"
          className="py-2 px-4 rounded-md inline-block bg-indigo-500 hover:bg-indigo-700 cursor-pointer text-sm text-white font-medium"
          onClick={() => router.push("/posts")}
        >
          See My Posts
        </button>
      )}
    </div>
  );
};

export default Header;

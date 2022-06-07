import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Header: React.FC<{
  displayButtons?: boolean;
}> = ({ displayButtons = true }) => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="w-full bg-slate-900 border-b border-gray-800 md:p-5 p-2 flex flex-row items-center justify-between">
      <Link href="/">
        <h1 className="text-2xl font-black text-gray-400 cursor-pointer">
          Polley
        </h1>
      </Link>
      {displayButtons && (
        <div className="flex flex-row items-center pl-1">
          <button
            type="button"
            className="py-2 px-4 rounded-md inline-block bg-indigo-500 hover:bg-indigo-700 cursor-pointer text-sm text-white font-medium"
            onClick={() =>
              window.open("https://github.com/amirfakhrullah/polley")
            }
          >
            Source Code
          </button>

          <div className="px-1" />

          <button
            type="button"
            className="py-2 px-4 rounded-md inline-block bg-indigo-500 hover:bg-indigo-700 cursor-pointer text-sm text-white font-medium"
            onClick={() => router.push("/posts")}
          >
            My Posts
          </button>
          
          <div className="px-1" />

          {session ? (
            <button
              type="button"
              className="py-2 px-4 rounded-md inline-block bg-indigo-500 hover:bg-indigo-700 cursor-pointer text-sm text-white font-medium"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          ) : (
            <button
              type="button"
              className="py-2 px-4 rounded-md inline-block bg-indigo-500 hover:bg-indigo-700 cursor-pointer text-sm text-white font-medium"
              onClick={() => signIn()}
            >
              Sign In
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;

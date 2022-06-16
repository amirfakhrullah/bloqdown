import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

const Header: React.FC<{
  displayButtons?: boolean;
}> = ({ displayButtons = true }) => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      <div className="w-full bg-gray-900 border-b border-gray-700 md:p-5 p-2 flex flex-row items-center justify-between">
        <Link href="/">
          <h1 className="font-lobster text-3xl font-black text-indigo-500 cursor-pointer">
            BloqDown
          </h1>
        </Link>
        {displayButtons && (
          <div className="flex flex-row items-center pl-1">
            {session && session.user ? (
              <div className="md:flex hidden flex-row items-center">
                <p className="mr-2 text-sm text-gray-400">
                  {session.user.name}
                </p>
                <Image
                  src={session.user.image!}
                  height={30}
                  width={30}
                  alt="github avatar"
                  className="rounded-full"
                />

                <div className="pr-2" />

                <button
                  type="button"
                  className="py-2 px-4 rounded-md inline-block bg-slate-800 border border-gray-400 cursor-pointer text-sm text-white font-medium"
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="py-2 px-4 rounded-md inline-block bg-slate-800 border border-gray-400 cursor-pointer text-sm text-white font-medium"
                onClick={() => signIn()}
              >
                Sign In
              </button>
            )}

            <div className="px-1" />

            <button
              type="button"
              className="py-2 px-4 rounded-md inline-block bg-indigo-500 hover:bg-indigo-700 border border-indigo-500 cursor-pointer text-sm text-white font-medium"
              onClick={() => router.push("/posts")}
            >
              My Posts
            </button>
          </div>
        )}
      </div>

      {session && session.user && displayButtons && (
        <div className="md:hidden w-full bg-slate-900 border-b border-gray-800 md:px-5 p-2 flex flex-row items-center justify-end">
          <p className=" mr-2 text-sm text-gray-400">{session.user.name}</p>
          <Image
            src={session.user.image!}
            height={30}
            width={30}
            alt="github avatar"
            className="rounded-full"
          />

          <div className="pr-2" />

          <button
            type="button"
            className="py-2 px-4 rounded-md inline-block bg-slate-800 border border-gray-400 cursor-pointer text-sm text-white font-medium"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      )}
    </>
  );
};

export default Header;

import Link from "next/link";
import React from "react";

const PostCard: React.FC<{
  id: string;
  title: string;
  created: Date;
  isOwner: boolean;
}> = ({ id, title, created, isOwner }) => {
  return (
    <div className="my-2 p-5 rounded-lg bg-gray-100 border border-gray-500">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm font-bold text-gray-400">{isOwner ? "by you" : "anonymous"}</p>
      <p className="text-gray-500">{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(created)}</p>
      <div className="flex justify-end">
        <Link href={`/posts/${id}`}>
          <div className="mt-2 py-2 px-4 rounded-md inline-block bg-gray-700 hover:bg-gray-900 cursor-pointer">
            <p className="text-sm text-white font-medium">Read</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;

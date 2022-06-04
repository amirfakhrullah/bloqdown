import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 border-b border-gray-800 p-5">
      <Link href="/">
        <h1 className="text-2xl font-black text-gray-400 cursor-pointer">
          Polley
        </h1>
      </Link>
    </div>
  );
};

export default Header;

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { abouts } from "./sidebars/RightNav/About";
import { infos } from "./sidebars/RightNav/Author";

const Footer = () => {
  return (
    <div className="md:p-10 p-5 w-full bg-gray-900 border-t border-gray-700">
      <div className="flex md:flex-row md:items-start md:justify-between flex-col max-w-4xl mx-auto">
        <div>
          <h1 className="font-lobster text-4xl font-black text-indigo-500 mb-1">
            BloqDown
          </h1>
          <div className="cursor-pointer">
            <Link href="https://vercel.com">
              <Image
                src="https://raw.githubusercontent.com/abumalick/powered-by-vercel/master/powered-by-vercel.svg"
                height={40}
                width={180}
                alt="vercel"
              />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-1 md:mt-0 mt-3">About</h3>
          {abouts.map((abt, idx) => (
            <Link key={`abt__footer__${idx}`} href={abt.href}>
              <p className="cursor-pointer my-1 hover:underline">
                {abt.text}
              </p>
            </Link>
          ))}
        </div>

        <div>
          <h3 className="text-xl font-bold mb-1 md:mt-0 mt-3">Author</h3>
          {infos.map((info, idx) => (
            <Link key={`author__footer__${idx}`} href={info.href}>
              <p className="cursor-pointer my-1 hover:underline">
                {info.text}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;

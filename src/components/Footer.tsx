import Image from "next/image";
import Link from "next/link";
import React from "react";
import { guides, sections } from "./RightNav";

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
          {guides.map((guide, idx) => (
            <Link key={`guide__footer__${idx}`} href={guide.href}>
              <p className="cursor-pointer my-1 hover:underline">
                {guide.text}
              </p>
            </Link>
          ))}
        </div>

        <div>
          <h3 className="text-xl font-bold mb-1 md:mt-0 mt-3">Author</h3>
          {sections.map((section, idx) => (
            <Link key={`author__footer__${idx}`} href={section.href}>
              <p className="cursor-pointer my-1 hover:underline">
                {section.text}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;

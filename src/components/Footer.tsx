import Link from "next/link";
import React from "react";
import { guides, sections } from "./RightNav";

const Footer = () => {
  return (
    <div className="md:p-10 p-5 w-full bg-gray-900 border-t border-gray-700">
      <div className="flex md:flex-row md:items-start md:justify-between flex-col max-w-4xl mx-auto">
        <div>
          <h1 className="font-lobster text-3xl font-black text-indigo-500 mb-1">BloqDown</h1>
          <p>© Copyright is a fallacy</p>
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

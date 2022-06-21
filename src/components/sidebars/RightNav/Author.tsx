import React from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { BsBookmarkFill } from "react-icons/bs";
import { RiFileUserLine } from "react-icons/ri";

export const infos = [
  {
    text: "Portfolio Website",
    icon: <RiFileUserLine className="mr-2 text-lg" />,
    href: "https://www.fakhrullah.com",
  },
  {
    text: "Connect on GitHub",
    icon: <AiFillGithub className="mr-2 text-lg" />,
    href: "https://github.com/amirfakhrullah",
  },
  {
    text: "Connect on LinkedIn",
    icon: <AiFillLinkedin className="mr-2 text-lg" />,
    href: "https://www.linkedin.com/in/amir-fakhrullah-358000199/",
  },
];

const Author = () => {
  return (
    <>
      <div className="flex flex-row items-center px-2">
        <BsBookmarkFill className="mr-2 text-md" />
        <p className="font-bold ml-1">Author</p>
      </div>

      <div className="my-1 py-2 px-1 rounded-lg bg-slate-800 border border-gray-600">
        {infos.map((info, idx) => (
          <div
            onClick={() => window.open(info.href)}
            className="p-2 px-3 flex flex-row items-center cursor-pointer rounded-md hover:bg-slate-600 border border-transparent"
            key={`info__${idx}`}
          >
            {info.icon}
            <p className="ml-2">{info.text}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Author;

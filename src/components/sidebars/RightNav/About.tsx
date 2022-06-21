import Link from "next/link";
import React from "react";
import { AiOutlineCode } from "react-icons/ai";
import { BiInfoCircle } from "react-icons/bi";
import { BsAppIndicator, BsMarkdown } from "react-icons/bs";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

export const abouts = [
  {
    text: "New Features",
    icon: <MdOutlineTipsAndUpdates className="mr-2 text-lg" />,
    href: "/posts/cl44dzttj026809mcdzllujg2",
  },
  {
    text: "Markdown Guide",
    icon: <BsMarkdown className="mr-2 text-lg" />,
    href: "/posts/cl49dmtm5003109jwx9o8kvcu",
  },
  {
    text: "About BloqDown",
    icon: <BiInfoCircle className="mr-2 text-lg" />,
    href: "https://github.com/amirfakhrullah/BloqDown/blob/main/README.md",
  },
  {
    text: "Source Code",
    icon: <AiOutlineCode className="mr-2 text-lg" />,
    href: "https://github.com/amirfakhrullah/bloqdown",
  },
];

const About = () => {
  return (
    <>
      <div className="flex flex-row items-center px-2">
        <BsAppIndicator className="mr-2 text-md" />
        <p className="font-bold ml-1">About</p>
      </div>

      <div className="my-1 py-2 px-1 rounded-lg bg-slate-800 border border-gray-600">
        {abouts.map((abt, idx) => (
          <Link key={`abt__${idx}`} href={abt.href}>
            <div className="p-2 px-3 flex flex-row items-center cursor-pointer rounded-md hover:bg-slate-600 border border-transparent">
              {abt.icon}
              <p className="ml-2">{abt.text}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default About;

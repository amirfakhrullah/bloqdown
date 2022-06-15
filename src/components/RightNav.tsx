import React from "react";
import { RiFileUserLine } from "react-icons/ri";
import { BsAppIndicator, BsBookmarkFill, BsMarkdown } from "react-icons/bs";
import { AiFillGithub, AiFillLinkedin, AiOutlineCode } from "react-icons/ai";
import { MdOutlineTipsAndUpdates, MdWorkOutline } from "react-icons/md";
import { BiInfoCircle } from "react-icons/bi";
import { ImBlog } from "react-icons/im";
import Link from "next/link";

const guides = [
  {
    text: "New Features",
    icon: <MdOutlineTipsAndUpdates className="mr-2 text-lg" />,
    href: "/posts/cl49dmtm5003109jwx9o8kvcu",
  },
  {
    text: "Markdown Guide",
    icon: <BsMarkdown className="mr-2 text-lg" />,
    href: "/posts/cl49dmtm5003109jwx9o8kvcu",
  },
  {
    text: "About Polley",
    icon: <BiInfoCircle className="mr-2 text-lg" />,
    href: "https://www.fakhrullah.com/projects/polley",
  },
  {
    text: "Source Code",
    icon: <AiOutlineCode className="mr-2 text-lg" />,
    href: "https://github.com/amirfakhrullah/polley",
  },
];

const sections = [
  {
    text: "Blogs",
    icon: <ImBlog className="mr-2 text-lg" />,
    href: "https://www.fakhrullah.com/blogs",
  },
  {
    text: "All Projects",
    icon: <MdWorkOutline className="mr-2 text-lg" />,
    href: "https://www.fakhrullah.com/projects",
  },
  {
    text: "Portfolio Website",
    icon: <RiFileUserLine className="mr-2 text-lg" />,
    href: "https://www.fakhrullah.com/projects",
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

const RightNav = () => {
  return (
    <div className="md:block hidden">
      <div className="sticky top-2">
        <div className="flex flex-row items-center px-2">
          <BsAppIndicator className="mr-2 text-md" />
          <p className="font-bold ml-1">About</p>
        </div>

        <div className="my-1 py-2 px-1 rounded-lg bg-slate-800 border border-gray-600">
          {guides.map((guide, idx) => (
            <Link key={`guide__${idx}`} href={guide.href}>
              <div className="p-2 px-3 flex flex-row items-center cursor-pointer rounded-md hover:bg-slate-600 border border-transparent">
                {guide.icon}
                <p className="ml-2">{guide.text}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="py-2" />

        <div className="flex flex-row items-center px-2">
          <BsBookmarkFill className="mr-2 text-md" />
          <p className="font-bold ml-1">Author</p>
        </div>

        <div className="my-1 py-2 px-1 rounded-lg bg-slate-800 border border-gray-600">
          {sections.map((section, idx) => (
            <div
              onClick={() => window.open(section.href)}
              className="p-2 px-3 flex flex-row items-center cursor-pointer rounded-md hover:bg-slate-600 border border-transparent"
              key={`section__${idx}`}
            >
              {section.icon}
              <p className="ml-2">{section.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightNav;

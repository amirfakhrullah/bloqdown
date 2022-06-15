import React from "react";
import { BiNews, BiTrendingUp } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { FaHotjar } from "react-icons/fa";
import TagsLeftNav from "./TagsLeftNav";

const activeClassName = "bg-slate-700 border border-slate-600";

const navs = [
  {
    text: "Latest",
    icon: <BsStars className="mr-2 text-lg" />,
  },
  {
    text: "Popular",
    icon: <FaHotjar className="mr-2 text-md" />,
  },
  {
    text: "All",
    icon: <BiNews className="mr-2 text-lg" />,
  },
];

const LeftNav: React.FC<{
  focusTab: 1 | 2 | 3;
  selectTab: (tab: 1 | 2 | 3) => void;
}> = ({ focusTab, selectTab }) => {
  return (
    <div className="md:block hidden">
      <div className="sticky top-2">
        <div className="flex flex-row items-center px-2">
          <BiTrendingUp className="mr-2 text-lg" />
          <p className="font-bold ml-1">Trending</p>
        </div>

        <div className="my-1 py-2 px-1 rounded-lg bg-slate-800 border border-gray-600">
          {navs.map((nav, idx) => (
            <div
              onClick={() => selectTab((idx + 1) as 1 | 2 | 3)}
              className={`p-2 px-3 flex flex-row items-center cursor-pointer rounded-md hover:bg-slate-600 border border-transparent ${
                idx + 1 === focusTab ? activeClassName : ""
              }`}
              key={`nav__${idx}`}
            >
              {nav.icon}
              <p className="ml-2">{nav.text}</p>
            </div>
          ))}
        </div>

        <div className="py-2" />

        <TagsLeftNav />
      </div>
    </div>
  );
};

export default LeftNav;

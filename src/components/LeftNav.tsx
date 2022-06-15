import React, { Dispatch, SetStateAction } from "react";
import { BiNews } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { FaHotjar } from "react-icons/fa";

const activeClassName = "bg-slate-600 rounded-md";

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
        <p className="font-bold">Trending</p>
        <div className="my-1 py-2 px-1 rounded-lg bg-slate-800 border border-gray-600">
          {navs.map((nav, idx) => (
            <div
              className={`p-2 px-3 flex flex-row items-center ${
                idx === 0 ? activeClassName : ""
              }`}
              key={`nav__${idx}`}
            >
              {nav.icon}
              <p className="ml-2">{nav.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftNav;

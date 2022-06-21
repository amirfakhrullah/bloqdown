import React, { ChangeEvent } from "react";
import { BiNews, BiTrendingUp } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { FaRocket } from "react-icons/fa";
import Trending from "./Trending";
import TagsLeftNav from "../../TagsLeftNav";

const activeClassName = "bg-slate-700 border border-slate-600";

const navs = [
  {
    text: "Popular",
    icon: <FaRocket className="mr-3 text-sm" />,
  },
  {
    text: "Latest",
    icon: <BsStars className="mr-2 text-lg" />,
  },
  {
    text: "All",
    icon: <BiNews className="mr-2 text-lg" />,
  },
];

/**
 * Left Side bar
 * Consist of 2 - Trending and Filter by tags
 */
const LeftNav: React.FC<{
  focusTab: 1 | 2 | 3; // 3 options for tabs
  selectTab: (tab: 1 | 2 | 3) => void; // select tab
  handleTag: (e: ChangeEvent<HTMLInputElement>) => void; // select tags function
}> = ({ focusTab, selectTab, handleTag }) => {
  return (
    <div className="md:block hidden">
      <div className="sticky top-2">
        <Trending focusTab={focusTab} selectTab={selectTab} />

        <div className="py-2" />

        <TagsLeftNav handleTag={handleTag} />
      </div>
    </div>
  );
};

export default LeftNav;

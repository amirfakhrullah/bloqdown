import React, { Dispatch, SetStateAction } from "react";
import { BiNews } from "react-icons/bi";
import { FaHotjar } from "react-icons/fa";
import { BsStars } from "react-icons/bs";

const Tabs: React.FC<{
  focusTab: 1 | 2 | 3;
  selectTab: (tab: 1 | 2 | 3) => void;
}> = ({ focusTab, selectTab }) => {
  return (
    <div className="md:hidden tabs mt-5 mb-3">
      <a
        onClick={() => selectTab(1)}
        className={`tab w-1/3 tab-bordered ${
          focusTab === 1 ? "tab-active" : ""
        }`}
      >
        <BsStars className="mr-2 text-lg" />
        <span className="sm:inline hidden">Latest</span>
      </a>
      <a
        onClick={() => selectTab(2)}
        className={`tab w-1/3 tab-bordered ${
          focusTab === 2 ? "tab-active" : ""
        }`}
      >
        <FaHotjar className="mr-2 text-md" />
        <span className="sm:inline hidden">Popular</span>
      </a>
      <a
        onClick={() => selectTab(3)}
        className={`tab w-1/3 tab-bordered ${
          focusTab === 3 ? "tab-active" : ""
        }`}
      >
        <BiNews className="mr-2 text-lg" />
        <span className="sm:inline hidden">All</span>
      </a>
    </div>
  );
};

export default Tabs;

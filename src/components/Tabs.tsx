import React from "react";
import { BiNews } from "react-icons/bi";
import { FaHotjar, FaRocket } from "react-icons/fa";
import { BsStars } from "react-icons/bs";

/**
 * Mobile tabs for trending
 */
const Tabs: React.FC<{
  focusTab: 1 | 2 | 3; // 3 options for tabs
  selectTab: (tab: 1 | 2 | 3) => void; // select tab
}> = ({ focusTab, selectTab }) => {
  return (
    <div className="md:hidden tabs mt-5 mb-3 homeTab">
      <a
        onClick={() => selectTab(1)}
        className={`tab w-1/3 tab-bordered ${
          focusTab === 1 ? "tab-active" : ""
        }`}
      >
        <FaRocket className="sm:text-md text-sm" />
        <span className="sm:ml-2 ml-1">Hot</span>
      </a>
      <a
        onClick={() => selectTab(2)}
        className={`tab w-1/3 tab-bordered ${
          focusTab === 2 ? "tab-active" : ""
        }`}
      >
        <BsStars className="sm:text-lg text-sm" />
        <span className="sm:ml-2 ml-1">Latest</span>
      </a>
      <a
        onClick={() => selectTab(3)}
        className={`tab w-1/3 tab-bordered ${
          focusTab === 3 ? "tab-active" : ""
        }`}
      >
        <BiNews className="sm:text-lg text-sm" />
        <span className="sm:ml-2 ml-1">All</span>
      </a>
    </div>
  );
};

export default Tabs;

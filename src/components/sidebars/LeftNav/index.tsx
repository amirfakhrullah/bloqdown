import React, { ChangeEvent } from "react";
import Trending from "./Trending";
import TagsLeftNav from "./TagsLeftNav";

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
    <div className="sticky top-2">
      <Trending focusTab={focusTab} selectTab={selectTab} />
      <div className="py-2" />
      <TagsLeftNav handleTag={handleTag} />
    </div>
  );
};

export default LeftNav;

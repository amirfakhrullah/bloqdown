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
  filterTags: string[];
  handleTag: (e: ChangeEvent<HTMLInputElement>) => void; // select tags function
}> = ({ focusTab, selectTab, filterTags, handleTag }) => {
  return (
    <>
      <Trending focusTab={focusTab} selectTab={selectTab} />
      <div className="py-2" />
      <TagsLeftNav filterTags={filterTags} handleTag={handleTag} />
    </>
  );
};

export default LeftNav;

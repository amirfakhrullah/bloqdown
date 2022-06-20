import React, { useState } from "react";
import { GetPostType } from "../../server/router/posts";

/**
 * hook for filtering tags
 */
const useFilterTags = () => {
  const [filterTags, setFilterTags] = useState<string[]>([]);

  const filterBoolean = (post: GetPostType) => {
    if (filterTags.length <= 0) return true;
    let boolArray = filterTags.map((tag) => {
      let tagNames = post.tags.map((tag) => tag.tagName);
      return tagNames.includes(tag);
    });
    return !boolArray.includes(false);
  };

  const handleTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    if (target?.checked === true) {
      setFilterTags((tags) => [...tags, target?.value]);
    } else {
      setFilterTags((tags) => [...tags.filter((tag) => tag !== target?.value)]);
    }
  };

  return { filterTags, setFilterTags, filterBoolean, handleTag };
};

export default useFilterTags;

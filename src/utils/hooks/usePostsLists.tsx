import React, { useMemo, useState } from "react";
import { trpc } from "../trpc";
import { sortByLatest, sortByPopularity } from "../sorts";

/**
 * hook for getting filtered posts array
 */
const usePostsLists = () => {
  const { data: posts, isLoading } = trpc.useQuery(["post.get-all-posts"]);

  // searchbar
  const [search, setSearch] = useState("");
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target?.value);
  };

  const filteredPosts = useMemo(() => {
    if (posts === undefined) return [];

    if (search.trim() === "") return posts;

    return posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase().trim())
    );
  }, [posts, search]);

  // sorting
  const byLatest = useMemo(() => {
    return sortByLatest(filteredPosts);
  }, [filteredPosts]);

  const byPopularity = useMemo(() => {
    return sortByPopularity(filteredPosts);
  }, [filteredPosts]);

  return {
    filteredPosts,
    isLoading,
    search,
    handleSearch,
    byLatest,
    byPopularity,
  };
};

export default usePostsLists;

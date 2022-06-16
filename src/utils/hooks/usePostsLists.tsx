import React, { useEffect, useMemo, useState } from "react";
import { GetPostsArrType } from "../../server/router/posts";
import { trpc } from "../trpc";
import { sortByLatest, sortByPopularity } from "../sorts";

const usePostsLists = () => {
  const { data: posts } = trpc.useQuery(["post.get-all-posts"]);

  const [isLoading, setIsLoading] = useState(true);
  const [filteredPosts, setFilteredPosts] = useState<
    GetPostsArrType | undefined
  >();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (
      posts &&
      ((filteredPosts && filteredPosts.length !== posts.length) ||
        !filteredPosts)
    ) {
      setFilteredPosts(posts);
      return setIsLoading(false);
    }
    // eslint-disable-next-line
  }, [posts]);

  // searchbar
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target?.value);
  };

  useEffect(() => {
    setFilteredPosts(
      posts
        ? posts.filter((data) =>
            data.title.toLowerCase().includes(search.toLowerCase().trim())
          )
        : []
    );
    // eslint-disable-next-line
  }, [search]);

  // sorting
  const byLatest = useMemo(() => {
    if (!filteredPosts) return [];

    return sortByLatest(filteredPosts);
  }, [filteredPosts]);

  const byPopularity = useMemo(() => {
    if (!filteredPosts) return [];

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

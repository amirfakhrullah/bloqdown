import React, { useEffect, useState } from "react";
import { GetPostsArrType } from "../../server/router/posts";
import { trpc } from "../trpc";

const useSearchPosts = () => {
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target?.value);
  };

  useEffect(() => {
    setFilteredPosts(
      posts
        ? posts.filter((data) =>
            data.title.toLowerCase().includes(search.toLowerCase())
          )
        : []
    );
    // eslint-disable-next-line
  }, [search]);

  return {
    filteredPosts,
    isLoading,
    search,
    handleSearch,
  };
};

export default useSearchPosts;

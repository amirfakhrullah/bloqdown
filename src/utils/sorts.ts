import { GetPostsArrType } from "../server/router/posts";

/**
 * function for reverse posts array 
 */
export const sortByLatest = (posts: GetPostsArrType): GetPostsArrType => {
  return posts.slice().reverse();
};

/**
 * function for sorting posts array based on the amount of likes
 */
export const sortByPopularity = (posts: GetPostsArrType) => {
  return posts.slice().sort((a, b) =>
    a._count.likes < b._count.likes
      ? 1
      : b._count.likes < a._count.likes
      ? -1
      : 0
  );
};

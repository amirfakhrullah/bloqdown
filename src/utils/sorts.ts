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
  return posts
    .slice()
    .sort((a, b) =>
      a._count.likes + a.views + a._count.Comment <
      b._count.likes + b.views + b._count.Comment
        ? 1
        : b._count.likes + b.views + b._count.Comment <
          a._count.likes + a.views + a._count.Comment
        ? -1
        : 0
    );
};

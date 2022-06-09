import { GetPostsArrType } from "../server/router/posts";


export const sortByLatest = (posts: GetPostsArrType) => {
  return posts.slice().reverse();
};

export const sortByPopularity = (posts: GetPostsArrType) => {
  return posts.slice().sort((a, b) =>
    a._count.likes < b._count.likes
      ? 1
      : b._count.likes < a._count.likes
      ? -1
      : 0
  );
};

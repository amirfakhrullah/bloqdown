import { PostWithIsOwner } from "../components/PostCard";

export const sortByLatest = (posts: PostWithIsOwner[]) => {
  return posts.slice().reverse();
};

export const sortByPopularity = (posts: PostWithIsOwner[]) => {
  return posts.slice().sort((a, b) =>
    a._count.likes < b._count.likes
      ? 1
      : b._count.likes < a._count.likes
      ? -1
      : 0
  );
};

import React from "react";
import Container from "../../components/Container";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import MetaHead from "../../components/MetaHead";
import PostCard, { PostWithIsOwner } from "../../components/PostCard";
import { trpc } from "../../utils/trpc";

const MyPosts: React.FC = () => {
  const { data: posts, isLoading } = trpc.useQuery(["post.get-my-posts"]);

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaHead title="My Posts | Polley" />
      <Header />
      <Container>
        <h1 className="text-2xl font-black text-gray-300">My Posts</h1>

        {posts?.length === 0 && (
          <h3 className="text-center font-bold text-lg text-gray-500">
            No Posts
          </h3>
        )}
        {posts?.map((post) => (
          <PostCard key={post.id} {...(post as PostWithIsOwner)} />
        ))}
      </Container>
    </>
  );
};

export default MyPosts;

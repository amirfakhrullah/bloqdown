import React, { useState } from "react";
import Container from "../../components/Container";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import MetaHead from "../../components/MetaHead";
import PostButton from "../../components/PostButton";
import PostCard, { PostWithIsOwner } from "../../components/PostCard";
import PostForm from "../../components/PostForm";
import Screen from "../../components/Screen";
import { trpc } from "../../utils/trpc";

const MyPosts: React.FC = () => {
  const [openForm, setOpenForm] = useState(false);
  const { data: posts, isLoading } = trpc.useQuery(["post.get-my-posts"]);

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaHead title="My Posts | Polley" />
      <Screen>
        <Header />
        <Container>
          <PostButton setOpen={setOpenForm} />
          <PostForm type="create" open={openForm} setOpen={setOpenForm} isMyPosts={true} />

          <h1 className="mt-5 text-2xl font-black text-gray-300">My Posts</h1>

          {posts?.length === 0 && (
            <h3 className="text-center font-bold text-lg text-gray-500">
              No Posts
            </h3>
          )}
          {posts?.map((post) => (
            <PostCard key={post.id} {...(post as PostWithIsOwner)} />
          ))}
        </Container>
      </Screen>
    </>
  );
};

export default MyPosts;

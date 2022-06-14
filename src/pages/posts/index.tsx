import { useSession } from "next-auth/react";
import React from "react";
import Container from "../../components/Container";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import MetaHead from "../../components/MetaHead";
import PostButton from "../../components/PostButton";
import PostCard from "../../components/PostCard";
import PostForm from "../../components/PostForm";
import Screen from "../../components/Screen";
import { GetPostType } from "../../server/router/posts";
import useFormModal from "../../utils/hooks/useModal";
import { trpc } from "../../utils/trpc";

const MyPosts: React.FC = () => {
  const { open, setOpen } = useFormModal();
  const { data: posts, isLoading } = trpc.useQuery(["post.get-my-posts"]);

  const { data: session } = useSession();

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaHead title="My Posts | Polley" />
      <Screen>
        <Header />
        <Container>
          <PostButton setOpen={setOpen} />
          <PostForm
            type="create"
            open={open}
            setOpen={setOpen}
            isMyPosts={true}
          />

          <h1 className="mt-5 text-2xl font-black text-gray-300">My Posts</h1>

          {!session && (
            <p className="text-sm my-1">
              If you post as anonymous, your post might not appear here because
              of cookie changed. To get full control of your posts and comments,
              please login.
            </p>
          )}

          {posts?.length === 0 && (
            <h3 className="text-center font-bold text-lg text-gray-500">
              No Posts
            </h3>
          )}
          {posts?.map((post) => (
            <PostCard key={post.id} {...(post as GetPostType)} />
          ))}
        </Container>
      </Screen>
    </>
  );
};

export default MyPosts;

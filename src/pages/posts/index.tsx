import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import React from "react";
import Container from "../../components/commons/Container";
import Header from "../../components/commons/Header";
import PostCardLoader from "../../components/loaders/PostCardLoader";
import MetaHead from "../../components/commons/MetaHead";
import PostButton from "../../components/sections/PostButton";
import PostCard from "../../components/sections/PostCard";
import PostForm from "../../components/sections/PostForm";
import RightNav from "../../components/sidebars/RightNav";
import Screen from "../../components/commons/Screen";
import { GetPostType } from "../../server/router/posts";
import useModal from "../../utils/hooks/useModal";
import { trpc } from "../../utils/trpc";
import PopWrapper from "../../components/PopWrapper";

const MyPosts: React.FC = () => {
  const { open, setOpen } = useModal();
  const { open: openMenu, setOpen: setOpenMenu } = useModal();
  const { data: posts, isLoading } = trpc.useQuery(["post.get-my-posts"]);

  const { data: session, status } = useSession();

  return (
    <>
      <MetaHead title="My Posts | BloqDown" />
      <Screen>
        <Header showMenuOnMobile={true} setOpenMenu={setOpenMenu} />
        <Container className="md:grid md:grid-cols-4 md:gap-3 max-w-7xl">
          <div className="md:col-start-2 md:col-span-2">
            <PostButton setOpen={setOpen} />
            <PostForm type="create" open={open} setOpen={setOpen} />

            <h1 className="mt-5 text-2xl font-black text-gray-300">My Posts</h1>

            {status !== "loading" && !session && (
              <p className="text-sm my-1">
                If you post as anonymous, your post might not appear here
                because of cookie changed. To get full control of your posts and
                comments, please login.
              </p>
            )}

            {isLoading ? (
              <PostCardLoader />
            ) : (
              <>
                {posts?.length === 0 && (
                  <h3 className="text-center font-bold text-lg text-gray-500 my-10">
                    No Post Yet
                  </h3>
                )}
                {posts?.map((post) => (
                  <PostCard
                    key={post.id}
                    {...(post as GetPostType)}
                    page="myPage"
                  />
                ))}
              </>
            )}
          </div>

          <div className="md:block hidden">
            <div className="sticky top-2">
              <RightNav />
            </div>
          </div>
        </Container>
      </Screen>

      <div className="md:hidden inline">
        <PopWrapper open={openMenu} setOpen={setOpenMenu}>
          <RightNav />
        </PopWrapper>
      </div>
    </>
  );
};

export default MyPosts;

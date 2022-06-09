import Loader from "../components/Loader";
import MetaHead from "../components/MetaHead";
import { trpc } from "../utils/trpc";
import PostForm from "../components/PostForm";
import { useState } from "react";
import PostCard from "../components/PostCard";
import Header from "../components/Header";
import Container from "../components/Container";
import Screen from "../components/Screen";
import Tabs from "../components/Tabs";
import { sortByLatest, sortByPopularity } from "../utils/sorts";
import PostButton from "../components/PostButton";
import { GetPostsArrType, GetPostType } from "../server/router/posts";

const Home: React.FC = () => {
  const [openForm, setOpenForm] = useState(false);
  const [focusTab, setFocusTab] = useState<1 | 2 | 3>(1);

  const { isLoading, data: posts } = trpc.useQuery(["post.get-all-posts"]);

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaHead title="Polley" />
      <Screen>
        <Header />
        <Container>
          <PostButton setOpen={setOpenForm} />

          <Tabs focusTab={focusTab} setFocusTab={setFocusTab} />

          <PostForm type="create" open={openForm} setOpen={setOpenForm} />

          {focusTab === 1 &&
            sortByLatest(posts as GetPostsArrType).map((post) => (
              <PostCard key={post.id} {...post} />
            ))}

          {focusTab === 2 &&
            sortByPopularity(posts as GetPostsArrType).map((post) => (
              <PostCard key={post.id} {...(post as GetPostType)} />
            ))}

          {focusTab === 3 &&
            posts?.map((post) => (
              <PostCard key={post.id} {...(post as GetPostType)} />
            ))}
        </Container>
      </Screen>
    </>
  );
};

export default Home;

import Loader from "../components/Loader";
import MetaHead from "../components/MetaHead";
import { trpc } from "../utils/trpc";
import PostForm from "../components/PostForm";
import { useState } from "react";
import PostCard, { PostWithIsOwner } from "../components/PostCard";
import Header from "../components/Header";
import Container from "../components/Container";
import Screen from "../components/Screen";
import Tabs from "../components/Tabs";
import { sortByLatest, sortByPopularity } from "../utils/sorts";
import { useSession } from "next-auth/react";
import PostButton from "../components/PostButton";

const Home: React.FC = () => {
  const { data: session } = useSession();

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
            sortByLatest(posts as PostWithIsOwner[]).map((post) => (
              <PostCard key={post.id} {...(post as PostWithIsOwner)} />
            ))}

          {focusTab === 2 &&
            sortByPopularity(posts as PostWithIsOwner[]).map((post) => (
              <PostCard key={post.id} {...(post as PostWithIsOwner)} />
            ))}

          {focusTab === 3 &&
            posts?.map((post) => (
              <PostCard key={post.id} {...(post as PostWithIsOwner)} />
            ))}
        </Container>
      </Screen>
    </>
  );
};

export default Home;

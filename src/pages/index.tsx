import Loader from "../components/Loader";
import MetaHead from "../components/MetaHead";
import { trpc } from "../utils/trpc";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import Header from "../components/Header";
import Container from "../components/Container";
import Screen from "../components/Screen";
import Tabs from "../components/Tabs";
import { sortByLatest, sortByPopularity } from "../utils/sorts";
import PostButton from "../components/PostButton";
import { GetPostsArrType, GetPostType } from "../server/router/posts";
import useModal from "../utils/hooks/useModal";
import useTabs from "../utils/hooks/useTabs";
import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";

const Home: React.FC = () => {
  const { open, setOpen } = useModal();
  const { focusTab, setFocusTab } = useTabs();

  const { isLoading, data: posts } = trpc.useQuery(["post.get-all-posts"]);

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaHead title="Polley" />
      <Screen>
        <Header />
        <Container className="md:grid grid-cols-5 gap-3 max-w-5xl">

          <LeftNav />

          <div className="md:col-span-3">
            <PostButton setOpen={setOpen} />

            <Tabs focusTab={focusTab} setFocusTab={setFocusTab} />

            <PostForm type="create" open={open} setOpen={setOpen} />

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
          </div>

          <RightNav />
        </Container>
      </Screen>
    </>
  );
};

export default Home;

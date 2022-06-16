import Loader from "../components/Loader";
import MetaHead from "../components/MetaHead";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import Header from "../components/Header";
import Container from "../components/Container";
import Screen from "../components/Screen";
import Tabs from "../components/Tabs";
import PostButton from "../components/PostButton";
import { GetPostType } from "../server/router/posts";
import useModal from "../utils/hooks/useModal";
import useTabs from "../utils/hooks/useTabs";
import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";
import SearchInput from "../components/SearchInput";
import useFilterTags from "../utils/hooks/useFilterTags";
import usePostsLists from "../utils/hooks/usePostsLists";

const Home: React.FC = () => {
  const { open, setOpen } = useModal();
  const { focusTab, selectTab } = useTabs();

  const {
    filteredPosts: posts,
    isLoading,
    search,
    handleSearch,
    byLatest,
    byPopularity,
  } = usePostsLists();

  const { filterBoolean, handleTag } = useFilterTags();

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaHead title="BloqDown" />
      <Screen>
        <Header />
        <Container className="md:grid md:grid-cols-4 md:gap-3 max-w-7xl">
          <LeftNav
            focusTab={focusTab}
            selectTab={selectTab}
            handleTag={handleTag}
          />

          <div className="md:col-span-2">
            <PostButton setOpen={setOpen} />

            <SearchInput
              value={search}
              onChange={handleSearch}
              placeholder="Search post"
            />

            <Tabs focusTab={focusTab} selectTab={selectTab} />

            <PostForm type="create" open={open} setOpen={setOpen} />

            {focusTab === 1 &&
              byLatest.map((post) => (
                <PostCard
                  isFiltered={filterBoolean(post)}
                  key={post.id}
                  {...post}
                />
              ))}

            {focusTab === 2 &&
              byPopularity.map((post) => (
                <PostCard
                  isFiltered={filterBoolean(post)}
                  key={post.id}
                  {...(post as GetPostType)}
                />
              ))}

            {focusTab === 3 &&
              posts?.map((post) => (
                <PostCard
                  isFiltered={filterBoolean(post)}
                  key={post.id}
                  {...(post as GetPostType)}
                />
              ))}

              {posts?.length === 0 && <h3 className="font-bold text-center my-5 ">No Post Found</h3>}
          </div>

          <RightNav />
        </Container>
      </Screen>
    </>
  );
};

export default Home;

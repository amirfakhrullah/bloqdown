import MetaHead from "../components/commons/MetaHead";
import PostForm from "../components/sections/PostForm";
import PostCard from "../components/sections/PostCard";
import Header from "../components/commons/Header";
import Container from "../components/commons/Container";
import Screen from "../components/commons/Screen";
import Tabs from "../components/sections/Tabs";
import PostButton from "../components/sections/PostButton";
import { GetPostType } from "../server/router/posts";
import useModal from "../utils/hooks/useModal";
import useTabs from "../utils/hooks/useTabs";
import LeftNav from "../components/sidebars/LeftNav";
import RightNav from "../components/sidebars/RightNav";
import SearchInput from "../components/SearchInput";
import useFilterTags from "../utils/hooks/useFilterTags";
import usePostsLists from "../utils/hooks/usePostsLists";
import PostCardLoader from "../components/loaders/PostCardLoader";
import PopWrapper from "../components/PopWrapper";
import TagsLeftNav from "../components/sidebars/LeftNav/TagsLeftNav";

const Home: React.FC = () => {
  const { open, setOpen } = useModal(); // form
  const { open: openMenu, setOpen: setOpenMenu } = useModal(); // menu
  const { focusTab, selectTab } = useTabs();

  const {
    filteredPosts: posts,
    isLoading,
    search,
    handleSearch,
    byLatest,
    byPopularity,
  } = usePostsLists();

  const { filterBoolean, handleTag, filterTags } = useFilterTags();

  return (
    <>
      <MetaHead title="BloqDown" />
      <Screen>
        <Header showMenuOnMobile={true} setOpenMenu={setOpenMenu} />
        <Container className="md:grid md:grid-cols-4 md:gap-3 max-w-7xl">
          <div className="md:block hidden">
            <div className="sticky top-2">
              <LeftNav
                focusTab={focusTab}
                selectTab={selectTab}
                filterTags={filterTags}
                handleTag={handleTag}
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <PostButton setOpen={setOpen} />

            <div className="mt-5" />

            <SearchInput
              value={search}
              onChange={handleSearch}
              placeholder="Search post"
            />

            <Tabs focusTab={focusTab} selectTab={selectTab} />

            <PostForm type="create" open={open} setOpen={setOpen} />

            {isLoading ? (
              <PostCardLoader />
            ) : (
              <>
                {focusTab === 1 &&
                  byPopularity.map((post) => (
                    <PostCard
                      isFiltered={filterBoolean(post)}
                      key={post.id}
                      {...(post as GetPostType)}
                      page="home"
                    />
                  ))}

                {focusTab === 2 &&
                  byLatest.map((post) => (
                    <PostCard
                      isFiltered={filterBoolean(post)}
                      key={post.id}
                      {...post}
                      page="home"
                    />
                  ))}

                {focusTab === 3 &&
                  posts?.map((post) => (
                    <PostCard
                      isFiltered={filterBoolean(post)}
                      key={post.id}
                      {...(post as GetPostType)}
                      page="home"
                    />
                  ))}

                {posts?.length === 0 && (
                  <h3 className="font-bold text-center my-5 ">No Post Found</h3>
                )}
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
          <TagsLeftNav filterTags={filterTags} handleTag={handleTag} />
          <div className="py-2" />
          <RightNav />
        </PopWrapper>
      </div>
    </>
  );
};

export default Home;

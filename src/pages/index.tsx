import Loader from "../components/Loader";
import MetaHead from "../components/MetaHead";
import { trpc } from "../utils/trpc";
import PostForm from "../components/PostForm";
import { useState } from "react";
import PostCard from "../components/PostCard";
import Header from "../components/Header";

const Home: React.FC<{ posts: any }> = () => {
  const [openForm, setOpenForm] = useState(false);

  const { isLoading, data: posts } = trpc.useQuery(["post.get-all-posts"]);

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaHead title="Polley" />
      <Header />
      <div className="p-4 w-full max-w-xl mx-auto">
        <div className="flex justify-end">
          <button
            type="button"
            className="mt-2 py-2 px-4 rounded-md inline-block bg-indigo-500 hover:bg-indigo-700 cursor-pointer text-sm text-white font-medium"
            onClick={() => setOpenForm(true)}
          >
            + Add New Post
          </button>
        </div>

        <PostForm open={openForm} setOpen={setOpenForm} />

        {posts?.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  );
};

export default Home;

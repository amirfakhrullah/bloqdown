import Loader from "../components/Loader";
import MetaHead from "../components/MetaHead";
import { trpc } from "../utils/trpc";
import PostForm from "../components/PostForm";
import { useState } from "react";
import PostCard from "../components/PostCard";

const Home: React.FC<{ posts: any }> = () => {
  const [openForm, setOpenForm] = useState(false);

  const { isLoading, data: posts } = trpc.useQuery(["post.get-all-posts"]);

  if (isLoading) return <Loader />;

  return (
    <div className="p-4 w-full max-w-xl mx-auto">
      <MetaHead title="Polley" />
      <h1 className="text-4xl font-black mb-5">Polley</h1>
      <div className="flex justify-end">
        <button
          type="button"
          className="mt-2 py-2 px-4 rounded-md inline-block bg-gray-700 hover:bg-gray-900 cursor-pointer text-sm text-white font-medium"
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
  );
};

export default Home;

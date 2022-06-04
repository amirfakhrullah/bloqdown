import Loader from "../components/Loader";
import MetaHead from "../components/MetaHead";
import { trpc } from "../utils/trpc";
import Link from "next/link";
import PostForm from "../components/PostForm";
import { useState } from "react";

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
        <div
          key={post.id}
          className="my-2 p-10 rounded-lg border border-gray-500"
        >
          <h3 className="font-bold">{post.title}</h3>
          <p className="text-gray-500">{JSON.stringify(post.created)}</p>
          <div className="flex justify-end">
            <Link href={`/posts/${post.id}`}>
              <div className="mt-2 py-2 px-4 rounded-md inline-block bg-gray-700 hover:bg-gray-900 cursor-pointer">
                <p className="text-sm text-white font-medium">See More</p>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;

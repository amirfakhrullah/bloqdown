import { Post } from "@prisma/client";
import MetaHead from "../components/MetaHead";
import { trpc } from "../utils/trpc";

const Home: React.FC<{ posts: any }> = () => {
  const client = trpc.useContext();
  const { isLoading, data: posts } = trpc.useQuery(["post.get-all"]);
  const { mutate } = trpc.useMutation("post.create", {
    onSuccess: (data) => {
      client.invalidateQueries(["post.get-all"]);
    },
  });

  if (isLoading) return <h1 className="text-xl font-black">Loading ...</h1>;

  return (
    <div className="p-4 w-full max-w-xl mx-auto">
      <MetaHead title="Polley" />
      <h1 className="text-4xl font-black mb-5">Polley</h1>
      {posts?.map((post: Post) => (
        <div key={post.id} className="my-2 p-10 rounded-lg border border-gray-500">
          <h3 className="font-bold">{post.title}</h3>
          <p>{post.description}</p>
          <p className="text-gray-500">{JSON.stringify(post.created)}</p>
        </div>
      ))}
      <input
        className="py-1 px-2 border border-gray-300 rounded-md w-full my-5"
        placeholder="Type"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            mutate({
              title: event.currentTarget.value,
              description: event.currentTarget.value,
            });
          }
        }}
      ></input>
    </div>
  );
};

export default Home;

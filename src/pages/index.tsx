import MetaHead from "../components/MetaHead";
import { trpc } from "../utils/trpc";

const Home: React.FC<{ posts: any }> = () => {
  const { isLoading, data } = trpc.useQuery(["posts.get-all"]);

  if (isLoading || !data) return <h1 className="text-4xl font-black">Loading ...</h1>;

  return (
    <div>
      <MetaHead title="Polley" />
      <h1 className="text-4xl font-black">Polley</h1>
    </div>
  );
};

export default Home;

import MetaHead from "../components/MetaHead";
import { prisma } from "../db/client";
import { trpc } from "../utils/trpc";

const Home: React.FC<{ posts: any }> = ({ posts }) => {
  const { isLoading, data } = trpc.useQuery(["hello"]);

  if (isLoading || !data) return  <h1 className="text-4xl font-black">Loading ...</h1>

  return (
    <div>
      <MetaHead title="Polley" />
      <h1 className="text-4xl font-black">Polley</h1>
      <p>{data.greeting}</p>
      <p>{JSON.stringify(posts)}</p>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const posts = await prisma.post.findMany();

  return {
    props: {
      posts,
    },
  };
};

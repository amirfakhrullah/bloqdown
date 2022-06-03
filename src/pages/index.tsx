import MetaHead from "../components/MetaHead";
import { prisma } from "../db/client";

const Home: React.FC<{ posts: any }> = ({ posts }) => {
  return (
    <div>
      <MetaHead title="Polley" />
      <h1 className="text-4xl font-black">Polley</h1>
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

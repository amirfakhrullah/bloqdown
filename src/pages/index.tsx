import type { NextPage } from "next";
import MetaHead from "../components/MetaHead";

const Home: NextPage = () => {
  return (
    <div>
      <MetaHead title="Polley" />
      <h1 className="text-4xl font-black">Polley</h1>
    </div>
  );
};

export default Home;

import React from "react";
import Header from "./Header";
import MetaHead from "./MetaHead";

const Loader: React.FC = () => {
  return (
    <>
      <MetaHead title="Loading" />
      <Header myPostsButton={false} />
      <div className="p-4 w-full max-w-xl mx-auto">
        <h1 className="text-xl font-black text-center text-gray-300">
          Loading ...
        </h1>
      </div>
    </>
  );
};

export default Loader;

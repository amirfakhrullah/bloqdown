import React from "react";
import Header from "../commons/Header";
import MetaHead from "../commons/MetaHead";

const Loader: React.FC = () => {
  return (
    <>
      <MetaHead title="Loading" />
      <div className="h-screen">
        <Header displayButtons={false} />
        <h3 className="animate-bounce font-lobster mt-20 text-center font-black text-4xl text-gray-500">
          Loading...
        </h3>
      </div>
    </>
  );
};

export default Loader;

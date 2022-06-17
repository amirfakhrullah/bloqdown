import React from "react";
import Header from "../Header";
import MetaHead from "../MetaHead";

const Loader: React.FC = () => {
  return (
    <>
      <MetaHead title="Loading" />
      <div className="h-screen">
        <Header displayButtons={false} />
        <h3 className="font-lobster mt-20 text-center font-black text-4xl text-gray-500">
          Loading...
        </h3>
      </div>
    </>
  );
};

export default Loader;

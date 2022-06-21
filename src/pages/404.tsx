import React from "react";
import Header from "../components/commons/Header";
import MetaHead from "../components/commons/MetaHead";

const NotFound: React.FC = () => {
  return (
    <>
      <MetaHead title="404 Not Found | BloqDown" />
      <div className="h-screen">
        <Header />
        <div className="p-20">
          <h3 className="font-lobster text-center font-black text-4xl text-gray-500">
            404 Not Found
          </h3>
        </div>
      </div>
    </>
  );
};

export default NotFound;

import React from "react";
import Header from "../components/Header";
import MetaHead from "../components/MetaHead";

const NotFound: React.FC = () => {
  return (
    <>
      <MetaHead title="404 Not Found | Polley" />
      <Header />
      <div className="p-20">
        <h3 className="text-center font-black text-4xl text-gray-500">
          404 Not Found
        </h3>
      </div>
    </>
  );
};

export default NotFound;

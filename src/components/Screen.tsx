import React from "react";
import Footer from "./Footer";

const Screen: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen h-full">
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Screen;

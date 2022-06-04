import React, { ReactNode } from "react";

const Container: React.FC<{
  children?: ReactNode;
}> = ({ children }) => {
  return <div className="p-4 w-full max-w-3xl mx-auto">{children}</div>;
};

export default Container;

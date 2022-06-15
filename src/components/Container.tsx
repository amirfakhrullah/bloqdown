import React, { ReactNode } from "react";

const Container: React.FC<{
  children?: ReactNode;
  className?: string | string[];
}> = ({ children, className }) => {
  return (
    <div
      className={`p-4 w-full max-w-3xl mx-auto ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
};

export default Container;

import React, { ReactNode } from "react";

const Container: React.FC<{
  children?: ReactNode;
  className?: string | string[];
}> = ({ children, className }) => {
  return (
    <div
      className={`p-4 w-full mx-auto ${
        className ?? "max-w-3xl"
      }`}
    >
      {children}
    </div>
  );
};

export default Container;

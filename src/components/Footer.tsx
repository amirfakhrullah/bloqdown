import React from "react";

const Footer = () => {
  return (
    <div className="p-2 w-full bg-indigo-500 flex flex-row items-center justify-center">
      <p
        onClick={() => window.open("https://github.com/amirfakhrullah")}
        className="text-sm text-white font-medium mx-2 cursor-pointer hover:underline hover:underline-offset-1"
      >
        My Github
      </p>
      <p
        onClick={() => window.open("https://github.com/amirfakhrullah/polley")}
        className="text-sm text-white font-medium mx-2 cursor-pointer hover:underline hover:underline-offset-1"
      >
        Source Code
      </p>
      <p
        onClick={() =>
          window.open("https://www.linkedin.com/in/amir-fakhrullah-358000199/")
        }
        className="text-sm text-white font-medium mx-2 cursor-pointer hover:underline hover:underline-offset-1"
      >
        My LinkedIn
      </p>
    </div>
  );
};

export default Footer;

import React from "react";
import GitHubCard from "./GitHubCard";
import About from "./About";
import Author from "./Author";

/**
 * Right Side Bar
 */
const RightNav = () => {
  return (
    <div className="md:block hidden">
      <div className="sticky top-2">
        <About />
        <div className="py-2" />
        <GitHubCard />
        <div className="py-2" />
        <Author />
      </div>
    </div>
  );
};

export default RightNav;

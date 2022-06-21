import React, { ReactInstance } from "react";
import GitHubCard from "./GitHubCard";
import About from "./About";
import Author from "./Author";

/**
 * Right Side Bar
 */
const RightNav = () => {
  return (
    <div className="sticky top-2">
      <About />
      <div className="py-2" />
      <GitHubCard />
      <div className="py-2" />
      <Author />
    </div>
  );
};

export default RightNav;

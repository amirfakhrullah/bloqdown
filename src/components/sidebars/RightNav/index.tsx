import React from "react";
import GitHubCard from "./GitHubCard";
import About from "./About";
import Author from "./Author";

/**
 * Right Side Bar
 */
const RightNav = () => {
  return (
    <>
      <About />
      <div className="py-2" />
      <GitHubCard />
      <div className="py-2" />
      <Author />
    </>
  );
};

export default RightNav;

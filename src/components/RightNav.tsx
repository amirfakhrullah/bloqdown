import React from "react";
import { BsBookmarkFill } from "react-icons/bs";

const sections = [
    {
        text: "My Portfolio",
        // icon: <MdOutlineTipsAndUpdates className="mr-2 text-lg" />,
        href: "",
      },
      {
        text: "My GitHub",
        // icon: <MdOutlineTipsAndUpdates className="mr-2 text-lg" />,
        href: "",
      },
      {
        text: "My LinkedIn",
        // icon: <MdOutlineTipsAndUpdates className="mr-2 text-lg" />,
        href: "",
      },
]

const RightNav = () => {
  return (
    <div className="md:block hidden">
      <div className="sticky top-2">
        <div className="flex flex-row items-center px-2">
        <div className="flex flex-row items-center px-2">
          <BsBookmarkFill className="mr-2 text-md" />
          <p className="font-bold ml-1">About Author</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default RightNav;

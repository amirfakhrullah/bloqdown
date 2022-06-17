import React from "react";
import { AiFillTag } from "react-icons/ai";

const TagsLoader = () => {
  return (
    <div className="md:block hidden">
      <div className="sticky top-2">
        <div className="flex flex-row items-center px-2">
          <AiFillTag className="mr-2 text-md" />
          <p className="font-bold ml-1">Tags</p>
        </div>

        <div className="my-1 p-3 rounded-lg bg-slate-800 border border-gray-600">
          <div className="animate-pulse">
            <div className="h-3 flex-1 bg-gray-700 rounded-sm w-3/5 mb-3" />
            <div className="w-full flex flex-row md:items-center items-end mb-2">
              <div className="h-4 flex-1 mr-1 bg-gray-700 rounded-sm" />
              <div className="h-4 w-14 bg-gray-700 rounded-sm" />
            </div>

            <div>
              {Array.from(Array(4).keys()).map((arr) => (
                <div
                  key={`TagsLoader__${arr}`}
                  className="inline-flex h-4 w-12 flex-row items-center px-2 m-1 rounded-full bg-gray-700 text-white text-sm border border-gray-700"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagsLoader;

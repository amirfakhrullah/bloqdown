import React from "react";

const TagsLoader = () => {
  return (
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
          className="inline-flex h-4 w-12 flex-row items-center px-2 m-1 rounded-full bg-gray-600 text-white text-sm border border-gray-600"
        >
          
        </div>
      ))}
        </div>
      </div>
    </div>
  );
};

export default TagsLoader;

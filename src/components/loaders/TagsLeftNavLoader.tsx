import React from "react";

const TagsLeftNavLoader = () => {
  return (
    <div className="my-1 p-2 rounded-lg bg-slate-800 border border-gray-600">
      {Array.from(Array(5).keys()).map((arr) => (
        <div
          key={`TagsLeftNavLoader__${arr}`}
          className="flex animate-pulse flex-row items-center p-2"
        >
          <div className="h-3 w-3 bg-gray-700 rounded-sm" />

          <div className="ml-2 h-3 flex-1 bg-gray-700 rounded-sm" />
        </div>
      ))}
    </div>
  );
};

export default TagsLeftNavLoader;

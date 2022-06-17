import React from "react";

const PostCardLoader = () => {
  return (
    <>
      {Array.from(Array(5).keys()).map((idx) => (
        <div
          key={`postCardLoader__${idx}`}
          className="my-2 p-3 rounded-lg bg-slate-800 border border-gray-600 overflow-hidden"
        >
          <div className="animate-pulse">
            <div className="h-5 w-full bg-gray-700 rounded-sm mb-2" />
            <div className="flex flex-row items-center mb-2">
              <div className="h-[20px] w-[20px] bg-gray-700 rounded-full" />
              <div className="ml-2 h-3 w-1/4 bg-gray-700 rounded-sm" />
            </div>

            <div>
              {Array.from(Array(5).keys()).map((arr) => (
                <div
                  key={`TagsLoader__${arr}`}
                  className="inline-flex h-4 w-12 flex-row items-center px-2 m-1 rounded-full bg-gray-700 text-white text-sm border border-gray-700"
                ></div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-5">
              <div className="flex flex-row flex-1">
                <div className="h-6 w-1/4 bg-gray-700 rounded-sm" />
                <div className="ml-2 h-6 w-1/4 bg-gray-700 rounded-sm" />
              </div>

              <div className="h-8 w-14 bg-gray-700 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostCardLoader;

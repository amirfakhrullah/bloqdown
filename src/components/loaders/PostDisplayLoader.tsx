import React from "react";

const PostDisplayLoader = () => {
  return (
    <div className="md:col-start-2 md:col-span-2 overflow-hidden">
      {/* post content */}
      <div className="md:p-6 p-4 mb-3 rounded-lg bg-slate-800 border border-gray-600 overflow-hidden">
        <div className="animate-pulse">
          <div className="h-8 w-3/5 bg-gray-700 rounded-sm mb-4" />

          <div className="mb-4">
            {Array.from(Array(4).keys()).map((arr) => (
              <div
                key={`TagsLoader1__${arr}`}
                className="h-5 w-full bg-gray-700 rounded-sm mb-2"
              ></div>
            ))}
          </div>

          <div className="h-6 w-2/5 bg-gray-700 rounded-sm my-4" />

          <div className="mb-4">
            {Array.from(Array(4).keys()).map((arr) => (
              <div
                key={`TagsLoader2__${arr}`}
                className="h-5 w-full bg-gray-700 rounded-sm mb-2"
              ></div>
            ))}
          </div>

          <div className="h-6 w-3/5 bg-gray-700 rounded-sm my-4" />

          <div className="mb-4">
            {Array.from(Array(4).keys()).map((arr) => (
              <div
                key={`TagsLoader3__${arr}`}
                className="h-5 w-full bg-gray-700 rounded-sm mb-2"
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* like and authors section */}
      <div className="animate-pulse flex flex-row justify-between my-4">
        <div className="h-6 w-16 bg-gray-700 rounded-sm" />

        <div className="flex flex-col items-end flex-1">
          <div className="h-6 w-1/4 bg-gray-700 rounded-sm" />
          <div className="mt-2 h-6 w-1/4 bg-gray-700 rounded-sm" />
        </div>
      </div>

      {/* comment section */}
      {Array.from(Array(2).keys()).map((arr) => (
        <div
          key={`CommentsLoader__${arr}`}
          className="my-2 py-2 px-3 rounded-lg bg-slate-800 border border-gray-500"
        >
          <div className="animate-pulse">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-1 flex-row items-center mb-2">
                <div className="h-[20px] w-[20px] bg-gray-700 rounded-full" />
                <div className="ml-2 h-3 w-1/4 bg-gray-700 rounded-sm" />
              </div>

              <div className="ml-2 h-3 w-1/4 bg-gray-700 rounded-sm" />
            </div>

            <div className="mt-4">
              {Array.from(Array(2).keys()).map((arr) => (
                <div
                  key={`comm__${arr}`}
                  className="h-5 w-full bg-gray-700 rounded-sm mb-2"
                ></div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostDisplayLoader;

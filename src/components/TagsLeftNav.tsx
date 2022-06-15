import React, { ChangeEvent } from "react";
import { AiFillTag } from "react-icons/ai";
import { trpc } from "../utils/trpc";

const TagsLeftNav: React.FC<{
  handleTag: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ handleTag }) => {
  const { data: tags, isLoading } = trpc.useQuery(["tags.get-all"]);

  return (
    <>
      <div className="flex flex-row items-center px-2">
        <AiFillTag className="mr-2 text-md" />
        <p className="font-bold ml-1">Filter by tags</p>
      </div>

      <div className="my-1 p-2 rounded-lg bg-slate-800 border border-gray-600">
        {isLoading && <p>Loading...</p>}
        {tags &&
          tags.map((tag, idx) => (
            <div
              key={`tag__filter__${idx}`}
              className="flex flex-row items-center p-2 overflow-hidden"
            >
              <input type="checkbox" value={tag.tagName} onChange={handleTag} />
              <p className="ml-2">{tag.tagName}</p>
            </div>
          ))}
        {tags && tags.length === 0 && <p className="my-2 text-center">No Tag Found</p>}
      </div>
    </>
  );
};

export default TagsLeftNav;

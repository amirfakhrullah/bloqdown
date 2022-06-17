import React, { ChangeEvent, useMemo, useState } from "react";
import { AiFillTag } from "react-icons/ai";
import { trpc } from "../utils/trpc";
import TagsLeftNavLoader from "./loaders/TagsLeftNavLoader";
import SearchInput from "./SearchInput";

const TagsLeftNav: React.FC<{
  handleTag: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ handleTag }) => {
  const { data: tags, isLoading } = trpc.useQuery(["tags.get-all"]);
  const [seeAll, setSeeAll] = useState(false);

  // searchbar
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target?.value);
  };

  const displayedTags = useMemo(() => {
    if (tags === undefined) return [];

    if (search.trim() === "") return tags;

    return tags.filter((tag) =>
      tag.tagName.toLowerCase().includes(search.toLowerCase().trim())
    );
  }, [tags, search]);

  return (
    <>
      <div className="flex flex-row items-center px-2">
        <AiFillTag className="mr-2 text-md" />
        <p className="font-bold ml-1">Filter by tags</p>
      </div>

      {isLoading && <TagsLeftNavLoader />}

      {!isLoading && tags && (
        <div className="my-1 p-2 rounded-lg bg-slate-800 border border-gray-600">

            <SearchInput
              onChange={handleSearch}
              value={search}
              placeholder="Find tag"
            />

          {displayedTags.map((tag, idx) => (
            <div
              key={`tag__filter__${idx}`}
              className={`flex flex-row items-center p-2 overflow-hidden ${
                !seeAll && idx >= 5 ? "hidden" : ""
              }`}
            >
              <input type="checkbox" value={tag.tagName} onChange={handleTag} />
              <p className="ml-2">{tag.tagName}</p>
            </div>
          ))}
          {displayedTags && displayedTags.length > 5 && (
            <p
              className="text-gray-300 cursor-pointer hover:underline text-center"
              onClick={() => setSeeAll((see) => !see)}
            >
              {!seeAll ? "See All" : "Hide"}
            </p>
          )}
          {displayedTags && displayedTags.length === 0 && (
            <p className="my-2 text-center">No Tag Found</p>
          )}
        </div>
      )}
    </>
  );
};

export default TagsLeftNav;

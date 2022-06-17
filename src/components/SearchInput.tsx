import React, { ChangeEvent } from "react";
import { BsSearch } from "react-icons/bs";

const SearchInput: React.FC<{
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}> = ({ value, onChange, placeholder }) => {
  return (
    <div className="px-1 pb-1 flex flex-row items-center overflow-hidden">
      <BsSearch />
      <input
        className="ml-2 p-1 rounded-none flex-1 bg-transparent border-b outline-none"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput;

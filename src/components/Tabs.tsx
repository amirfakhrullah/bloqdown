import React, { Dispatch, SetStateAction } from "react";

const Tabs: React.FC<{
  focusTab: 1 | 2 | 3;
  setFocusTab: Dispatch<SetStateAction<1 | 2 | 3>>;
}> = ({ focusTab, setFocusTab }) => {
  const handleClick = (number: 1 | 2 | 3) => {
    setFocusTab(number);
  };

  return (
    <div className="tabs">
      <a
        onClick={() => handleClick(1)}
        className={`tab tab-bordered ${focusTab === 1 ? "tab-active" : ""}`}
      >
        All
      </a>
      <a
        onClick={() => handleClick(2)}
        className={`tab tab-bordered ${focusTab === 2 ? "tab-active" : ""}`}
      >
        Popular
      </a>
      <a
        onClick={() => handleClick(3)}
        className={`tab tab-bordered ${focusTab === 3 ? "tab-active" : ""}`}
      >
        My Posts
      </a>
    </div>
  );
};

export default Tabs;

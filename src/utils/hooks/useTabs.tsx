import { useState } from "react";

/**
 * hook for trending tabs base functionalities
 */
const useTabs = () => {
  const [focusTab, setFocusTab] = useState<1 | 2 | 3>(1);

  const selectTab = (tab: 1 | 2 | 3) => {
    if (tab > 3 || tab < 1) return;

    setFocusTab(tab);
  };

  return { focusTab, setFocusTab, selectTab }
};

export default useTabs;

import { useState } from "react";

/**
 * hook for popup form
 */
const useModal = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((open) => !open);
  };

  return { open, setOpen, toggle };
};

export default useModal;

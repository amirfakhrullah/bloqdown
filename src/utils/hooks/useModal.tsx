import { useState } from "react";

const useFormModal = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((open) => !open);
  };

  return { open, setOpen, toggle };
};

export default useFormModal;

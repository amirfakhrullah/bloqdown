import React, { Dispatch, SetStateAction } from "react";

const PopWrapper: React.FC<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}> = ({ open, setOpen, children }) => {
  return (
    <div className={`modal ${open && "modal-open"}`}>
      <div className="modal-box max-w-4xl rounded-md bg-slate-800 border border-gray-500">
        {children}
      </div>
    </div>
  );
};

export default PopWrapper;

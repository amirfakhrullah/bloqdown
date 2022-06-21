import React, { Dispatch, SetStateAction } from "react";
import { CgClose } from "react-icons/cg";

const PopWrapper: React.FC<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}> = ({ open, setOpen, children }) => {
  return (
    <div className={`modal ${open && "modal-open"}`}>
      <div className="modal-box p-4 max-w-4xl rounded-md bg-slate-800 border border-gray-500">
        <div className="flex justify-end">
          <div
            onClick={() => setOpen(false)}
            className="inline-flex mr-2 p-2 border border-gray-600 rounded-md cursor-pointer"
          >
            <CgClose className="text-lg" />
          </div>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default PopWrapper;

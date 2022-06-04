import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

const Input: React.FC<{
  title: string;
  type: "input" | "textarea";
  placeholder: string;
  required?: boolean;
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
}> = ({ title, type, placeholder, required = false, register, error }) => {
  return (
    <div className="mt-2 mb-1">
      <div className="flex flex-row mb-1">
        <p className="font-bold text-sm">{title}</p>
        {required && <p className="text-red-400 ml-1">*</p>}
      </div>

      {type === "input" ? (
        <input
          {...register}
          defaultValue=""
          placeholder={placeholder}
          className="py-1 px-2 border border-gray-300 rounded-md w-full"
        />
      ) : (
        <textarea
          {...register}
          rows={7}
          defaultValue=""
          placeholder={placeholder}
          className="py-1 px-2 border border-gray-300 rounded-md w-full"
        />
      )}

      <p className="text-sm font-bold text-red-400 mt-1 text-right">
        {error && error.message}
      </p>
    </div>
  );
};

export default Input;

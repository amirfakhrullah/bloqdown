import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
import Input from "./Input";

const PostForm: React.FC<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const client = trpc.useContext();
  const { mutate } = trpc.useMutation("post.create", {
    onSuccess: () => {
      client.invalidateQueries(["post.get-all-posts"]);
      reset();
      setOpen(false);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    mutate({
      title,
      description,
    });
  };

  if (!open) return <></>;

  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-20">
      <div className="mt-10 p-4 w-full max-w-xl mx-auto border border-gray-500 rounded-lg bg-gray-200">
        <h3 className="font-bold text-2xl">Post</h3>
        
        <Input
          title="Title"
          type="input"
          placeholder="Insert post title"
          required
          register={register("title", {
            required: "Required",
            minLength: {
              value: 6,
              message: "Minimum 6 letters",
            },
            maxLength: {
              value: 200,
              message: "Maximum 200 letters",
            },
          })}
          error={errors.title}
        />

        <Input
          title="Content"
          type="textarea"
          placeholder="Insert your post content here..."
          required
          register={register("description", {
            required: "Required",
            minLength: {
              value: 6,
              message: "Minimum 6 letters",
            },
            maxLength: {
              value: 1000,
              message: "Maximum 1000 letters",
            },
          })}
          error={errors.description}
        />

        <div className="flex justify-end">
          <button
            type="button"
            className="mr-2 mt-2 py-2 px-4 rounded-md inline-block border border-gray-500 hover:bg-gray-400 cursor-pointer text-sm text-black font-medium"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="mt-2 py-2 px-4 rounded-md inline-block bg-gray-700 hover:bg-gray-900 cursor-pointer text-sm text-white font-medium"
            onClick={handleSubmit(onSubmit)}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;

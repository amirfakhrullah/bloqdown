import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
import Input from "./Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostValidation } from "../utils/validations";

const PostForm: React.FC<{
  type: "create" | "edit";
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  inputs?: {
    id: string;
    title: string;
    description: string;
  };
}> = ({ type, open, setOpen, inputs }) => {
  const client = trpc.useContext();
  const { mutate: createMutation, isLoading: createLoading } = trpc.useMutation(
    "post.create",
    {
      onSuccess: () => {
        client.invalidateQueries(["post.get-all-posts"]);
        reset();
        setOpen(false);
      },
    }
  );
  const { mutate: editMutation, isLoading: editLoading } = trpc.useMutation(
    "post.edit",
    {
      onSuccess: () => {
        client.invalidateQueries(["post.get-by-id"]);
        client.invalidateQueries(["post.get-all-posts"]);
        reset();
        setOpen(false);
      },
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: inputs?.title ?? "",
      description: inputs?.description ?? "",
    },
    resolver: zodResolver(createPostValidation),
  });

  const onSubmit = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    if (type === "create") {
      return createMutation({
        title,
        description,
      });
    }
    if (type === "edit" && inputs) {
      return editMutation({
        id: inputs.id,
        title,
        description,
      });
    }
  };

  return (
    <>
      {/* Modal */}
      <div className={`modal ${open && "modal-open"}`}>
        <div className="modal-box max-w-4xl rounded-md bg-slate-800 border border-gray-500">
          <Input
            title="Title"
            type="input"
            placeholder="Insert post title"
            register={register("title")}
            error={errors.title}
          />

          <Input
            title="Content"
            type="textarea"
            placeholder="Insert your post content here..."
            register={register("description")}
            error={errors.description}
          />

          <div className="modal-action">
            {createLoading || editLoading ? (
              <p className="text-white">Publishing...</p>
            ) : (
              <>
                <button
                  type="button"
                  className="py-2 px-4 rounded-md inline-block bg-slate-800 border border-gray-400 cursor-pointer text-sm text-white font-medium"
                  onClick={() => {
                    reset();
                    setOpen(false);
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="py-2 px-4 rounded-md inline-block bg-indigo-500 hover:bg-indigo-700 cursor-pointer text-sm text-white font-medium"
                  onClick={handleSubmit(onSubmit)}
                  disabled={createLoading || editLoading}
                >
                  Publish
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostForm;

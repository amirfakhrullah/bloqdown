import React from "react";
import { useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
import Input from "./Input";
import TextareaAutosize from "react-textarea-autosize";

const Comments: React.FC<{
  id: string | undefined;
}> = ({ id }) => {
  const client = trpc.useContext();
  const { data: comments, isLoading: commentsLoading } = trpc.useQuery([
    "comment.get-comments",
    { postId: id! },
  ]);
  const { mutate, isLoading } = trpc.useMutation("comment.create", {
    onSuccess: () => {
      client.invalidateQueries(["comment.get-comments"]);
      reset();
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = ({ text }: { text: string }) => {
    mutate({
      postId: id!,
      text,
    });
  };

  if (commentsLoading) {
    return <h3 className="text-lg font-bold mt-5">Loading...</h3>;
  }

  return (
    <div className="mt-5">
      <h3 className="text-lg font-bold mt-5">Comments</h3>
      <div className="mt-2 p-4 w-full border border-gray-600 rounded-lg bg-gray-100 flex md:flex-row flex-col md:items-center items-end">
        <div className="w-full flex-1">
          <Input
            title=""
            type="textarea"
            minRows={1}
            placeholder="Insert your comment here..."
            register={register("text", {
              required: "Required",
              minLength: {
                value: 2,
                message: "Minimum 2 letters",
              },
              maxLength: {
                value: 200,
                message: "Maximum 200 letters",
              },
            })}
            error={errors.text}
          />
        </div>
        <div>
          {isLoading ? (
            <p className="p-2">Commenting...</p>
          ) : (
            <button
              type="submit"
              className="ml-2 py-2 px-4 rounded-md inline-block bg-gray-700 hover:bg-gray-900 cursor-pointer text-sm text-white font-medium"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              Comment
            </button>
          )}
        </div>
      </div>

      {comments?.map((comment) => (
        <div
          key={comment.id}
          className="my-2 py-2 px-3 rounded-lg bg-gray-100 border border-gray-300"
        >
          <div className="flex flex-row items-center justify-between">
            <p className="text-sm font-bold text-gray-400">
              {comment.isOwner ? "by you" : "anonymous"}
            </p>

            <p className="text-sm text-gray-400">
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }).format(comment.created)}
            </p>
          </div>
          <TextareaAutosize
            disabled
            readOnly
            defaultValue={comment.text}
            className="resize-none py-1 w-full"
          />
        </div>
      ))}
    </div>
  );
};

export default Comments;

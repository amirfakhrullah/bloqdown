import React from "react";
import { useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
import Input from "./Input";
import TextareaAutosize from "react-textarea-autosize";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCommentValidation } from "../utils/validations";
import { Comment, User } from "@prisma/client";
import Image from "next/image";
import Delete from "./Delete";
import { GetCommentsArrType } from "../server/router/comments";

const Comments: React.FC<{
  id: string | undefined;
  comments: GetCommentsArrType;
}> = ({ id, comments }) => {
  const client = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation("comment.create", {
    onSuccess: () => {
      client.invalidateQueries(["post.get-by-id"]);
      reset();
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      text: "",
      postId: id,
    },
    resolver: zodResolver(createCommentValidation),
  });

  const onSubmit = ({ text }: { text: string }) => {
    mutate({
      postId: id!,
      text,
    });
  };

  return (
    <div className="mt-5" id="comments">
      <h3 className="text-md font-bold mt-5 text-gray-300">Comments ({comments.length})</h3>
      <div className="pb-2 w-full flex md:flex-row flex-col md:items-center items-end">
        <div className="w-full flex-1">
          <Input
            title=""
            type="textarea"
            onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => setValue("text", e.target.value.trim())}
            minRows={1}
            placeholder="Insert your comment here..."
            register={register("text")}
            error={errors.text}
          />
        </div>
        <div>
          {isLoading ? (
            <p className="p-2 text-white">Commenting...</p>
          ) : (
            <button
              type="submit"
              className="ml-2 py-2 px-4 rounded-md inline-block bg-indigo-500 hover:bg-indigo-700 cursor-pointer text-sm text-white font-medium"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              Comment
            </button>
          )}
        </div>
      </div>

      {comments?.length === 0 && (
        <h3 className="text-center font-bold text-lg text-gray-500 py-5">
          No Comment
        </h3>
      )}

      {comments?.map((comment) => (
        <div
          key={comment.id}
          className="my-2 py-2 px-3 rounded-lg bg-slate-800 border border-gray-500"
        >
          <div className="flex flex-row items-center justify-between">
            {comment.githubUser ? (
              <div className="flex flex-row items-center my-1">
                <Image
                  src={comment.githubUser.image!}
                  height={20}
                  width={20}
                  alt="github avatar"
                  className="rounded-full"
                />
                <p className=" ml-2 text-sm font-bold text-gray-400">
                  {comment.githubUser.name}
                </p>
              </div>
            ) : (
              <p className="text-sm font-bold text-gray-400">
                {comment.isOwner ? "By you" : "Anonymous"}
              </p>
            )}
            <div className="flex flex-row items-center">
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
              <Delete 
              type="comment"
              githubUser={comment.githubUser}
              id={comment.id!}
              isOwner={comment.isOwner} />
            </div>
          </div>
          <TextareaAutosize
            disabled
            readOnly
            defaultValue={comment.text}
            className="overflow-hidden resize-none py-1 w-full text-white bg-transparent"
          />
        </div>
      ))}
    </div>
  );
};

export default Comments;

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillCloseCircle, AiFillTag } from "react-icons/ai";
import { trpc } from "../../../utils/trpc";
import { tagInputValidation } from "../../../utils/validations";
import TagsLoader from "../../loaders/TagsLoader";

/**
 * Post tags section on the left side bar
 */
const Tags: React.FC<{
  postId: string;
  isOwner: boolean;
}> = ({ postId, isOwner }) => {
  const { data, isLoading, refetch } = trpc.useQuery([
    "tags.get-by-postId",
    { postId },
  ]);

  const [errMessage, setErrMessage] = useState("");

  const { mutate: addMutation, isLoading: mutateLoading } = trpc.useMutation(
    "tags.add",
    {
      onSuccess: () => {
        setErrMessage("");
        reset();
        refetch();
      },
      onError: (err) => {
        setErrMessage(err.message);
      },
    }
  );

  const { mutate: deleteMutation } = trpc.useMutation("tags.delete", {
    onSuccess: () => {
      setErrMessage("");
      refetch();
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tagName: "",
      postId,
    },
    resolver: zodResolver(tagInputValidation),
  });

  const onSubmit = ({ tagName }: { tagName: string }) => {
    addMutation({
      tagName: tagName.toLowerCase(),
      postId,
    });
  };

  if (isLoading) return <TagsLoader />;

  return (
    <>
      <div className="flex flex-row items-center px-2">
        <AiFillTag className="mr-2 text-md" />
        <p className="font-bold ml-1">Tags</p>
      </div>

      <div className="my-1 p-3 rounded-lg bg-slate-800 border border-gray-600">
        <p className="px-2 font-bold">
          Tags for this post ({data?.length ?? 0}/5)
        </p>
        <p className="text-sm font-bold text-red-400">
          {errMessage && errMessage}
        </p>

        {isOwner && data && data.length < 5 && (
          <div className="w-full flex md:flex-row flex-col md:items-center items-end">
            <div className="w-full flex-1 flex flex-col">
              <input
                {...register("tagName")}
                placeholder="Add tag"
                className="w-full mt-1 mb-2 p-1 bg-transparent rounded-none border-b outline-none text-sm"
              />
              <p className="text-sm font-bold text-red-400 mt-1 text-right">
                {errors.tagName && errors.tagName.message}
              </p>
            </div>
            <div>
              {mutateLoading ? (
                <p className="p-1 text-white">Adding..</p>
              ) : (
                <button
                  type="submit"
                  className="ml-1 px-2 py-1 rounded-md inline-block bg-indigo-500 hover:bg-indigo-700 cursor-pointer text-sm text-white font-medium"
                  onClick={handleSubmit(onSubmit)}
                  disabled={mutateLoading}
                >
                  + Add
                </button>
              )}
            </div>
          </div>
        )}

        <div>
          {data?.map((data, idx) => (
            <div
              key={`tag__${data.tagName}__${idx}`}
              className="inline-flex flex-row items-center px-2 m-1 rounded-full bg-indigo-500 text-white text-sm border border-indigo-300"
            >
              {data.tagName}

              {isOwner && (
                <div
                  className="ml-1 cursor-pointer"
                  onClick={() =>
                    deleteMutation({ postId, tagName: data.tagName })
                  }
                >
                  <AiFillCloseCircle />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Tags;

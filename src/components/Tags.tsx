import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { AiFillCloseCircle, AiFillTag } from "react-icons/ai";
import { trpc } from "../utils/trpc";
import { tagInputValidation } from "../utils/validations";
import Input from "./Input";

const Tags: React.FC<{
  postId: string;
  isOwner: boolean;
}> = ({ postId, isOwner }) => {
  const { data, isLoading, refetch } = trpc.useQuery([
    "tags.get-by-postId",
    { postId },
  ]);

  const { mutate: addMutation, isLoading: mutateLoading } = trpc.useMutation(
    "tags.add",
    {
      onSuccess: () => {
        reset();
        refetch();
      },
    }
  );

  const { mutate: deleteMutation } = trpc.useMutation("tags.delete", {
    onSuccess: () => {
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
      tagName,
      postId,
    });
  };

  return (
    <div className="md:block hidden">
      <div className="sticky top-2">
        <div className="flex flex-row items-center px-2">
          <AiFillTag className="mr-2 text-lg" />
          <p className="font-bold ml-1">Tags</p>
        </div>

        <div className="my-1 p-3 rounded-lg bg-slate-800 border border-gray-600">
          <p className="px-2">
            Tags for this post ({data ? data.length : 0})
          </p>
          {isLoading && <p>Loading...</p>}
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
          {isOwner && data && data.length < 5 && (
            <div className="w-full flex md:flex-row flex-col md:items-center items-end">
              <div className="w-full flex-1">
                <Input
                  title=""
                  type="input"
                  placeholder="Add New Tag"
                  register={register("tagName")}
                  error={errors.tagName}
                />
              </div>
              <div>
                {mutateLoading ? (
                  <p className="p-2 text-white">Adding..</p>
                ) : (
                  <button
                    type="submit"
                    className="ml-2 mt-2 py-2 px-4 rounded-md inline-block bg-indigo-500 hover:bg-indigo-700 cursor-pointer text-sm text-white font-medium"
                    onClick={handleSubmit(onSubmit)}
                    disabled={mutateLoading}
                  >
                    Add Tag
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tags;

import { useRouter } from "next/router";
import React from "react";
import Loader from "../../components/Loader";
import MetaHead from "../../components/MetaHead";
import { trpc } from "../../utils/trpc";
import TextareaAutosize from 'react-textarea-autosize';

const Content: React.FC<{ id: string }> = ({ id }) => {
  const { data: post, isLoading } = trpc.useQuery(["post.get-by-id", { id }]);

  if (isLoading) {
    return <Loader />;
  }

  if (!post) {
    return (
      <div className="py-20">
        <h1 className="text-center font-bold text-xl">Post 404</h1>
      </div>
    );
  }
  return (
    <div className="p-4 w-full max-w-xl mx-auto">
      <MetaHead title={`${post.title} | Polley`} description={post.title} />
      <h1 className="text-2xl font-black mb-3">{post.title}</h1>

      <TextareaAutosize 
        disabled
        readOnly
        defaultValue={post.description}
        className="resize-none py-1 px-2 border border-gray-300 rounded-md w-full"
      />
    </div>
  );
};

const PostDetails: React.FC = () => {
  const {
    query: { id },
  } = useRouter();

  if (!id || typeof id !== "string") {
    return <Loader />;
  }

  return <Content id={id} />;
};

export default PostDetails;

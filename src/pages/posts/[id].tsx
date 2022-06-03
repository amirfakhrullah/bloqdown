import { useRouter } from "next/router";
import React from "react";
import Loader from "../../components/Loader";
import { trpc } from "../../utils/trpc";

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
  return <div>{JSON.stringify(post)}</div>;
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

import { useRouter } from "next/router";
import React, { useState } from "react";
import Loader from "../../components/Loader";
import MetaHead from "../../components/MetaHead";
import { trpc } from "../../utils/trpc";
import TextareaAutosize from "react-textarea-autosize";
import Comments from "../../components/Comments";
import Header from "../../components/Header";
import Container from "../../components/Container";
import Image from "next/image";
import Screen from "../../components/Screen";
import Likes from "../../components/Likes";
import Delete from "../../components/Delete";
import PostForm from "../../components/PostForm";
import { GetCommentsArrType } from "../../server/router/comments";
import ReactMarkdown from "react-markdown";

const Content: React.FC<{ id: string }> = ({ id }) => {
  const [rerender, setRerender] = useState(false);
  const { data: post, isLoading } = trpc.useQuery(["post.get-by-id", { id }], {
    onSettled: () => {
      setRerender(true);
      const timeout = setTimeout(() => {
        setRerender(false);
      }, 200);
      return () => clearTimeout(timeout);
    },
  });
  const [openEdit, setOpenEdit] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  if (!post || !post.title) {
    return (
      <>
        <MetaHead title="Post 404 Not Found | Polley" />
        <Screen>
          <Header />
          <div className="py-20">
            <h1 className="text-center font-black text-4xl text-gray-400">
              Post 404
            </h1>
          </div>
        </Screen>
      </>
    );
  }

  return (
    <>
      <MetaHead title={`${post.title} | Polley`} />
      <Screen>
        <Header />
        <Container>
          <h1 className="text-2xl font-black text-gray-300 mb-5">
            {post.title}
          </h1>
          {!openEdit && (
            <TextareaAutosize
              disabled
              readOnly
              defaultValue={post.description}
              className="overflow-hidden resize-none text-white py-1 w-full bg-transparent"
            />
          )}
          <ReactMarkdown>{post.description as string}</ReactMarkdown>

          <div className="flex flex-row items-center justify-between">
            <Likes
              postId={post.id!}
              ownerLiked={post.ownerLiked}
              likes={post._count?.likes!}
            />
            <div>
              {post.githubUser ? (
                <div className="flex flex-row items-center my-1 justify-end">
                  <Image
                    src={post.githubUser.image!}
                    height={20}
                    width={20}
                    alt="github avatar"
                    className="rounded-full"
                  />
                  <p className=" ml-2 text-sm font-bold text-gray-400">
                    {post.githubUser.name}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500 text-sm font-bold text-right">
                  {post.isOwner ? "By you" : "Anonymous"}
                </p>
              )}

              <p className="text-gray-500 text-sm text-right">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }).format(post.created)}
              </p>
            </div>
          </div>

          <div className="flex justify-end items-center">
            {post.isOwner && (
              <div
                onClick={() => setOpenEdit(true)}
                className="text-sm mr-2 cursor-pointer hover:underline hover:underline-offset-1"
              >
                Edit Post
              </div>
            )}
            <Delete
              type="post"
              githubUser={post.githubUser}
              id={post.id!}
              isOwner={post.isOwner}
            >
              Delete Post
            </Delete>
          </div>

          {!rerender && (
            <PostForm
              type="edit"
              open={openEdit}
              setOpen={setOpenEdit}
              inputs={{
                id: post.id!,
                title: post.title!,
                description: post.description!,
              }}
            />
          )}

          <Comments
            id={post.id}
            comments={post.comments as GetCommentsArrType}
          />
        </Container>
      </Screen>
    </>
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

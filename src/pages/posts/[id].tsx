import React, { useState } from "react";
import MetaHead from "../../components/commons/MetaHead";
import { trpc } from "../../utils/trpc";
import Comments from "../../components/sections/Comments";
import Header from "../../components/commons/Header";
import Container from "../../components/commons/Container";
import Image from "next/image";
import Screen from "../../components/commons/Screen";
import Likes from "../../components/sections/Likes";
import Delete from "../../components/sections/Delete";
import PostForm from "../../components/sections/PostForm";
import { GetCommentsArrType } from "../../server/router/comments";
import Markdown from "../../components/Markdown";
import { dateFormatter } from "../../utils/dateFormatter";
import RightNav from "../../components/sidebars/RightNav";
import Tags from "../../components/sidebars/LeftNav/Tags";
import TagsLoader from "../../components/loaders/TagsLoader";
import PostDisplayLoader from "../../components/loaders/PostDisplayLoader";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { prisma } from "../../db/client";
import { AiFillEye } from "react-icons/ai";
import { Prisma } from "@prisma/client";
import useModal from "../../utils/hooks/useModal";
import PopWrapper from "../../components/PopWrapper";

const PostContent: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id }) => {
  const {
    data: post,
    isLoading,
    isFetching,
  } = trpc.useQuery(["post.get-by-id", { id }]);
  const [openEdit, setOpenEdit] = useState(false);
  const { open: openMenu, setOpen: setOpenMenu } = useModal();

  const postDataLoading = isLoading || !post;

  return (
    <>
      <MetaHead
        title={postDataLoading ? "Loading.." : `${post.title!} | BloqDown`}
      />
      <Screen>
        <Header showMenuOnMobile={true} setOpenMenu={setOpenMenu} />
        <Container className="md:grid md:grid-cols-4 md:gap-3 max-w-7xl">
          {postDataLoading ? (
            <>
              <TagsLoader />
              <PostDisplayLoader />
            </>
          ) : (
            <>
              <div className="md:block hidden">
                <div className="sticky top-2">
                  <Tags postId={post.id!} isOwner={post.isOwner!} />
                </div>
              </div>

              <div className="md:col-start-2 md:col-span-2 overflow-hidden">
                <div className="md:p-6 p-4 mb-3 rounded-lg bg-slate-800 border border-gray-600 overflow-hidden">
                  <article className="mardown-group text-white prose sm:prose-base prose-sm prose-gray max-w-none">
                    <h1>{post.title}</h1>
                    <Markdown>{post.description as string}</Markdown>
                  </article>
                </div>

                <div className="flex sm:flex-row flex-col-reverse sm:items-center items-end justify-between">
                  <div className="flex flex-row items-center">
                    <Likes
                      postId={post.id!}
                      ownerLiked={post.ownerLiked}
                      likes={post._count?.likes!}
                      page="post"
                    />

                    <div className="flex flex-row items-center ml-2">
                      <AiFillEye className="text-gray-500 text-md" />
                      <p className="text-gray-500 text-sm font-medium ml-1">
                        {post.views}{" "}
                        <span className="sm:inline hidden">
                          view{post.views! > 1 && "s"}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="sm:w-auto w-full">
                    {post.githubUser ? (
                      <div className="flex flex-row items-center my-1 sm:justify-end justify-start">
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
                      <p className="text-gray-500 text-sm font-bold text-left">
                        {post.isOwner ? "By you" : "Anonymous"}
                      </p>
                    )}

                    <p className="text-gray-500 text-sm sm:text-right text-left">
                      {post.updated
                        ? `Updated on ${dateFormatter(post.updated)}`
                        : `Created on ${dateFormatter(post.created!)}`}
                    </p>

                    <div className="flex sm:justify-end items-center">
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
                  </div>
                </div>

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

                <Comments
                  id={post.id}
                  comments={post.comments as GetCommentsArrType}
                  postOwner={post.isOwner}
                />
              </div>
            </>
          )}

          <div className="md:block hidden">
            <div className="sticky top-2">
              <RightNav />
            </div>
          </div>
        </Container>
      </Screen>

      {post && (
        <div className="md:hidden inline">
          <PopWrapper open={openMenu} setOpen={setOpenMenu}>
            <Tags postId={post.id!} isOwner={post.isOwner!} />
            <div className="py-2" />
            <RightNav />
          </PopWrapper>
        </div>
      )}
    </>
  );
};

/**
 * Increment views by 1 before renders
 * if error, specifically post not found error, redirect to 404 page before renders
 */
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;

  if (!id || typeof id !== "string") {
    return {
      notFound: true,
    };
  }

  try {
    await prisma.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return {
          notFound: true,
        };
      }
    }
  }

  return {
    props: { id },
  };
};

export default PostContent;

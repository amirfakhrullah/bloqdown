import React from "react";

const PostCard: React.FC<{
  id: string;
  title: string;
  created: Date;
  isOwner: boolean;
}> = ({ id, title, created, isOwner }) => {
  return <div>PostCard</div>;
};

export default PostCard;

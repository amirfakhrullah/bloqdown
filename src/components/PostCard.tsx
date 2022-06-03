import React from "react";

const PostCard: React.FC<{
  title: string;
  description: string;
  created: Date;
}> = ({ title, description, created }) => {
  return <div>PostCard</div>;
};

export default PostCard;

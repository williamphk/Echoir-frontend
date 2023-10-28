import React from "react";

const PostContent = ({ post }) => {
  return (
    <div className="py-2 break-all text-left">
      <p>{post.content}</p>
    </div>
  );
};

export default PostContent;

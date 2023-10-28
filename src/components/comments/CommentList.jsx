import React from "react";

import Comment from "./Comment";

const CommentList = ({ postId, comments, token, user }) => {
  return (
    <div>
      <div>
        {comments.map((comment) => (
          <Comment
            comment={comment}
            postId={postId}
            commentId={comment._id}
            key={comment._id}
            token={token}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentList;

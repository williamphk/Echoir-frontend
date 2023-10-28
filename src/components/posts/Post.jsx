import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostAction from "./PostAction";
import CommentList from "../comments/CommentList";
import AddComment from "../comments/AddComment";

import { getCommentList } from "../../api";

const Post = ({ post, id, token, user, setIsLoading }) => {
  const [isCommentShow, setIsCommentShow] = useState(false);
  const [comments, setComments] = useState([]);

  const createOrUpdateCount = useSelector(
    (state) => state.comment.createOrUpdateCount
  );

  const handleCommentShow = async () => {
    setIsCommentShow(!isCommentShow);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getCommentList(token, id);
        setComments(fetchedComments.data.comments);
      } catch (err) {
        setComments(err);
      }
    };

    fetchComments();
  }, [isCommentShow, createOrUpdateCount, id, token]);

  return (
    <div
      key={post._id}
      id={id}
      className="bg-white w-full rounded-lg p-4 mb-4 shadow"
    >
      <PostHeader post={post} postId={id} user={user} token={token} />
      <PostContent post={post} />
      <PostAction
        handleCommentShow={handleCommentShow}
        comments={comments}
        postId={id}
        user={user}
        token={token}
        setIsLoading={setIsLoading}
      />
      {isCommentShow && (
        <CommentList
          postId={id}
          comments={comments}
          token={token}
          user={user}
        />
      )}
      <AddComment
        postId={id}
        token={token}
        setIsCommentShow={setIsCommentShow}
      />
    </div>
  );
};

export default Post;

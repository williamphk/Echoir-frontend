import React, { useState, useEffect } from "react";

import MaterialIcon from "../common/MaterialIcon";
import PostModal from "./PostModal";

import { getPostLikeList, createPostLike, deletePostLike } from "../../api";

const PostAction = ({
  handleCommentShow,
  comments,
  postId,
  user,
  token,
  setIsLoading,
}) => {
  const [postLikes, setPostLikes] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const [fetchLikesTrigger, setFetchLikesTrigger] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  useEffect(() => {
    const fetchPostLikes = async () => {
      try {
        const fetchedLikes = await getPostLikeList(token, postId);
        setPostLikes(fetchedLikes.data.likes);
        setLikeCount(fetchedLikes.data.likes.length);
        setIsLoading(false);
      } catch (err) {
        setPostLikes([]);
        //console.error("There was an error fetching the post likes: ", err);
      }
    };

    fetchPostLikes();
  }, [fetchLikesTrigger, token, postId]);

  //console.log(postLikes);
  useEffect(() => {
    const userLike = postLikes.find((like) => like.user._id === user._id);
    if (userLike) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [postLikes, user._id]);

  const handleLikeButtonClick = async () => {
    if (isLike) {
      // Optimistic updates the like button and like count
      setIsLike(false);
      setLikeCount(likeCount - 1);
      // Get the userLikeId directly instead of using state as will cause issues when clicking too fast
      const userLikeId = postLikes.find(
        (like) => like.user._id === user._id
      )?._id;
      // checking if the userLikeId exists as the postLikes state may cause issue
      if (userLikeId) {
        // Delete the like
        await deletePostLike(token, postId, userLikeId);
        setFetchLikesTrigger(!fetchLikesTrigger);
      } else {
        //console.error("User like ID is undefined, cannot delete like.");
      }
    } else {
      // Optimistic updates the like button and like count
      setIsLike(true);
      setLikeCount(likeCount + 1);
      // Create a new like
      await createPostLike(token, postId);
      setFetchLikesTrigger(!fetchLikesTrigger);
    }
  };

  const openPostModal = () => {
    setIsPostModalOpen(true);
  };

  const closePostModal = () => {
    setIsPostModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between py-2">
        {postLikes.length > 0 ? (
          <button onClick={openPostModal} className="flex gap-x-1 items-center">
            <MaterialIcon
              className="material-symbols-outlined text-xl text-purple-500"
              iconName={"thumb_up"}
            />
            {likeCount}
          </button>
        ) : (
          <div className="h-7"></div>
        )}
        <button
          className="hover:underline text-gray-500 text-sm"
          onClick={handleCommentShow}
        >
          {comments.length} comments
        </button>
      </div>
      <div className="flex border-t border-b pt-1 pb-1 mb-3">
        <button
          onClick={handleLikeButtonClick}
          className="text-gray-500 font-medium hover:bg-gray-100 py-2 rounded w-1/2 flex items-center justify-center gap-x-2 transition duration-200"
        >
          <MaterialIcon
            className={`material-symbols-outlined text-xl ${
              isLike ? "text-purple-600" : "text-gray-500"
            }`}
            iconName={"thumb_up"}
          />

          <div
            className={
              isLike
                ? "text-purple-600" // Purple when user has liked the post
                : "text-gray-500" // Default color when user hasn't liked the post
            }
          >
            Like
          </div>
        </button>
        <button
          className="text-gray-500 font-medium hover:bg-gray-100 py-2 rounded w-1/2 flex items-center justify-center gap-x-2 transition duration-200"
          onClick={handleCommentShow}
        >
          <MaterialIcon
            className="material-symbols-outlined text-xl"
            iconName={"add_comment"}
          />
          Comment
        </button>
      </div>
      {isPostModalOpen && (
        <PostModal
          title="Likes"
          closePostModal={closePostModal}
          likes={postLikes}
        />
      )}
    </div>
  );
};

export default PostAction;

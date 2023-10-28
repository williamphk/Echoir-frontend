import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import MaterialIcon from "../common/MaterialIcon";
import PostModal from "./PostModal";

import { createPost } from "../../api";
import { incrementCreateOrUpdateCount } from "../../slices/postSlice";

const AddPost = ({ user }) => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const openPostModal = () => {
    setIsPostModalOpen(true);
  };

  const closePostModal = () => {
    setIsPostModalOpen(false);
  };

  const onSubmit = async (data) => {
    await createPost(data, token);
    closePostModal();
    dispatch(incrementCreateOrUpdateCount());
  };

  return (
    <div>
      <button
        onClick={openPostModal}
        className="bg-white w-full rounded-lg p-4 mb-4 shadow flex hover:bg-gray-100 items-center"
      >
        <MaterialIcon
          iconName="post_add"
          className="material-symbols-outlined text-4xl text-gray-500"
        />
        <div className="flex flex-col items-start ml-4">
          <div className="font-bold">Create a Post</div>
          <div className="text-gray-500">Write something</div>
        </div>
      </button>
      {isPostModalOpen && (
        <PostModal
          title="Add a new post"
          placeholder={`What's on your mind, ${user.firstName}?`}
          closePostModal={closePostModal}
          requiredInputField={true}
          button="Post"
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default AddPost;

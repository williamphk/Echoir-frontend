import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import MaterialIcon from "../common/MaterialIcon";
import Modal from "../common/Modal";
import PostModal from "./PostModal";

import { getPostContent, updatePost, deletePost } from "../../api";
import { incrementCreateOrUpdateCount } from "../../slices/postSlice";

const PostMenu = ({ postId, token }) => {
  const [isPostMenuOpen, setPostMenuOpen] = useState(false);
  const [isPostEditModalOpen, setIsPostEditModalOpen] = useState(false);
  const [isPostDeleteModalOpen, setIsPostDeleteModalOpen] = useState(false);
  const [postContent, setPostContent] = useState("loading...");

  const dispatch = useDispatch();

  const openPostEditModal = async () => {
    setIsPostEditModalOpen(true);
    const response = await getPostContent(token, postId);
    setPostContent(response.data.post.content);
  };

  const openPostDeleteModal = async () => {
    setIsPostDeleteModalOpen(true);
    const response = await getPostContent(token, postId);
    setPostContent(response.data.post.content);
  };

  const menuItems = [
    {
      name: "Edit",
      isLink: false,
      onClick: openPostEditModal,
    },
    {
      name: "Delete",
      isLink: false,
      onClick: openPostDeleteModal,
    },
  ];

  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    // If the menu is mounted in the DOM and the clicked element is not one of the menu items
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setPostMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      // When the Navbar component is unmounted, the event listener is removed
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const togglePostMenu = () => {
    setPostMenuOpen(!isPostMenuOpen);
  };

  const closePostModal = () => {
    setIsPostEditModalOpen(false);
    setIsPostDeleteModalOpen(false);
  };

  const onEditSubmit = async (data) => {
    await updatePost(data, token, postId);
    closePostModal();
    dispatch(incrementCreateOrUpdateCount());
  };

  const onDeleteSubmit = async () => {
    await deletePost(token, postId);
    closePostModal();
    dispatch(incrementCreateOrUpdateCount());
  };

  return (
    <div>
      <div className="relative">
        <button
          className="hover:bg-gray-100 rounded-full h-10 w-10 flex justify-center items-center transition duration-200"
          onClick={togglePostMenu}
          ref={menuRef}
        >
          <MaterialIcon
            className="material-symbols-outlined text-3xl"
            iconName={"more_horiz"}
          />
        </button>
        {isPostMenuOpen && <Modal menuItems={menuItems} />}
      </div>
      {isPostEditModalOpen && (
        <PostModal
          title="Edit"
          value={postContent}
          setPostContent={setPostContent}
          closePostModal={closePostModal}
          requiredInputField={true}
          button="Save"
          onSubmit={onEditSubmit}
        />
      )}
      {isPostDeleteModalOpen && (
        <PostModal
          title="Delete"
          closePostModal={closePostModal}
          button="Confirm"
          buttonColor="bg-red-500"
          buttonHoverColor="bg-red-600"
          onSubmit={onDeleteSubmit}
        />
      )}
    </div>
  );
};

export default PostMenu;

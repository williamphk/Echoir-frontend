import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { rejectFriendRequest } from "../../api";
import { incrementAcceptOrDeleteCount } from "../../slices/friendRequestSlice";

const FriendRequestDeleteButton = ({ friendRequest }) => {
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const handleDeleteButton = async () => {
    await rejectFriendRequest(token, friendRequest._id);
    dispatch(incrementAcceptOrDeleteCount());
  };

  return (
    <button
      onClick={handleDeleteButton}
      className="bg-gray-100 hover:bg-red-500 hover:text-white text-gray-500 rounded-lg p-2 w-[200px] h-[35px] overflow-hidden flex justify-center items-center transition duration-200"
    >
      Delete
    </button>
  );
};

export default FriendRequestDeleteButton;

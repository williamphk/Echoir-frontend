import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { deleteFriend } from "../../api";
import { incrementAcceptOrDeleteCount } from "../../slices/friendRequestSlice";

const FriendButton = ({ friendId, setIsRequestSuccess, setMessage }) => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const handleDeleteButton = async () => {
    try {
      const response = await deleteFriend(token, user._id, friendId);
      if (response.status >= 200 && response.status < 300) {
        // The request was successful
        dispatch(incrementAcceptOrDeleteCount());
        setIsRequestSuccess(true);
        setMessage("Friend removed.");
        setTimeout(() => setIsRequestSuccess(null), 3500);
      } else {
        // The request failed, but did not throw an error
        setIsRequestSuccess(false);
        setMessage("Failed to remove friend.");
        setTimeout(() => setIsRequestSuccess(null), 3500);
      }
    } catch (err) {
      // The request failed and threw an error
      setIsRequestSuccess(false);
      setMessage("Failed to remove friend due to a network error.");
      setTimeout(() => setIsRequestSuccess(null), 3500);
      //console.error("Error deleting friend:", err);
    }
  };

  return (
    <div>
      <button
        onClick={handleDeleteButton}
        className="bg-gray-100 hover:bg-red-500 hover:text-white text-gray-500 rounded-lg p-2 w-[200px] h-[35px] overflow-hidden flex justify-center items-center transition duration-200"
      >
        Delete
      </button>
    </div>
  );
};

export default FriendButton;

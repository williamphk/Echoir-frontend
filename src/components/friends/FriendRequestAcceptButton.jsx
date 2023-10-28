import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { acceptFriendRequest } from "../../api";
import { incrementAcceptOrDeleteCount } from "../../slices/friendRequestSlice";

const FriendRequestAcceptButton = ({ friendRequest }) => {
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const handleAcceptButton = async () => {
    await acceptFriendRequest(token, friendRequest._id);
    dispatch(incrementAcceptOrDeleteCount());
  };

  return (
    <button
      onClick={handleAcceptButton}
      className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg p-2 w-[200px] h-[35px] overflow-hidden flex justify-center items-center mb-2 transition duration-200"
    >
      Confirm
    </button>
  );
};

export default FriendRequestAcceptButton;

import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { sendFriendRequest, deleteFriendRequest } from "../../api";
import { incrementSendCount } from "../../slices/friendRequestSlice";

const FriendSuggestionButton = ({
  suggestionId,
  isSent,
  friendRequestId,
  setIsRequestSuccess,
  setMessage,
}) => {
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const timer = useRef(null);

  const handleAddFriendClick = async (receiverId) => {
    setIsRequestSuccess(null);
    clearTimeout(timer.current);
    try {
      if (!isSent) {
        const response = await sendFriendRequest(token, receiverId);
        if (response.status >= 200 && response.status < 300) {
          // The request was successful
          setIsRequestSuccess(true);
          setMessage("Friend request sent.");
          timer.current = setTimeout(() => setIsRequestSuccess(null), 3500);
        } else {
          // The request failed, but did not throw an error
          setIsRequestSuccess(false);
          setMessage("Failed to send friend request.");
          timer.current = setTimeout(() => setIsRequestSuccess(null), 3500);
        }
      } else {
        const response = await deleteFriendRequest(token, friendRequestId);
        if (response.status >= 200 && response.status < 300) {
          // The request was successful
          setIsRequestSuccess(true);
          setMessage("Friend request removed.");
          timer.current = setTimeout(() => setIsRequestSuccess(null), 3500);
        } else {
          // The request failed, but did not throw an error
          setIsRequestSuccess(false);
          setMessage("Failed to remove friend request.");
          timer.current = setTimeout(() => setIsRequestSuccess(null), 3500);
        }
      }
      dispatch(incrementSendCount());
    } catch (error) {
      setIsRequestSuccess(false);
      setMessage(
        "Failed to send/remove friend request due to a network error."
      );
      timer.current = setTimeout(() => setIsRequestSuccess(null), 3500);
      //console.error("Error in sending/removing friend request:", error);
    }
  };

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  return (
    <button
      onClick={() => handleAddFriendClick(suggestionId)}
      className={`${
        isSent
          ? " bg-gray-200 text-gray-500"
          : "bg-purple-500 hover:bg-purple-600 text-white transition duration-200"
      } rounded-lg p-2 w-[200px] h-[35px] relative overflow-hidden
        ${
          isSent ? "before:content-['Sent']" : "before:content-['Add_Friend']"
        } before:absolute before:top-[0px] before:left-[0px] before:flex before:justify-center before:items-center before:w-full before:h-full before:transition-all
        ${
          isSent &&
          `after:content-['Remove_Request'] after:absolute after:top-[50px] after:left-[0px] after:flex after:justify-center after:items-center after:w-full after:h-full after:transition-all
        hover:before:top-[-50px] hover:after:top-[0px] hover:after:bg-red-500 hover:after:text-white`
        }`}
    ></button>
  );
};

export default FriendSuggestionButton;

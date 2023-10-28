import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ResponseModal from "../common/ResponseModal";

import { deleteAccount } from "../../api";
import { logout } from "../../slices/authSlice";
import { switchComponent } from "../../slices/pageSlice";

const Setting = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const [isRequestSuccess, setIsRequestSuccess] = useState(null);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const handleDeleteButtonClick = async () => {
    try {
      // The request was successful
      const response = await deleteAccount(token, user._id);
      if (response.status >= 200 && response.status < 300) {
        dispatch(logout());
        dispatch(switchComponent("setting"));
      } else {
        // The request failed, but did not throw an error
        setIsRequestSuccess(false);
        setMessage("This user cannot be removed.");
        setTimeout(() => setIsRequestSuccess(null), 3500);
      }
    } catch (err) {
      if (err.response.status === 401) {
        setMessage("This user cannot be removed.");
      } else {
        setMessage("Failed to remove this user due to a network error.");
      }
      // The request failed and threw an error
      setIsRequestSuccess(false);
      setTimeout(() => setIsRequestSuccess(null), 3500);
      //console.error("Error deleting friend:", err);
    }
  };

  return (
    <div className="w-full sm:w-3/4 py-3 sm:pr-3">
      <div className="bg-white flex flex-col items-start p-6 w-full text-left rounded-lg">
        <div className="border-b w-full">
          <h2 className="flex text-xl font-medium">Setting</h2>
          <h3 className="pt-5 pb-3 text-lg">Delete your account</h3>
        </div>
        <p className="pt-3">This is permanent</p>
        <p>
          Once you delete your account, you won't be able to retrieve the
          content and information that you've shared on Odin-book, including
          your profile, friends, posts, comments and likes.
        </p>
        <div className="pt-8 flex gap-x-3 self-end">
          <button className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg">
            Cancel
          </button>
          <button
            onClick={handleDeleteButtonClick}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 text-white rounded-lg"
          >
            Continue to account deletion
          </button>
        </div>
      </div>
      {isRequestSuccess !== null && (
        <ResponseModal status={isRequestSuccess} message={message} />
      )}
    </div>
  );
};

export default Setting;

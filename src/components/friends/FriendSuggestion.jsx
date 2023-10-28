import React from "react";

import ProfilePic from "../common/ProfilePic.jsx";
import UserName from "../common/UserName.jsx";
import FriendSuggestionButton from "./FriendSuggestionButton.jsx";

const FriendSuggestion = ({
  suggestion,
  isSent,
  friendRequestId,
  setIsRequestSuccess,
  setMessage,
}) => {
  return (
    <div className="shadow-lg flex flex-col bg-white rounded-lg w-[220px] pb-3 items-center justify-center">
      <div className="flex flex-col w-full h-[230px] overflow-hidden">
        <ProfilePic
          picture={suggestion.profile.picture}
          id={suggestion._id}
          className="w-full rounded-t-lg"
        />
      </div>
      <div className="flex flex-col w-full">
        <UserName
          name={suggestion.profile.fullName}
          id={suggestion._id}
          className="my-2 hover:underline"
        />
      </div>
      <FriendSuggestionButton
        suggestionId={suggestion._id}
        isSent={isSent}
        friendRequestId={friendRequestId}
        setIsRequestSuccess={setIsRequestSuccess}
        setMessage={setMessage}
      />
    </div>
  );
};

export default FriendSuggestion;

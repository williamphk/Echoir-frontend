import React from "react";

import ProfilePic from "../common/ProfilePic.jsx";
import UserName from "../common/UserName.jsx";
import FriendButton from "./FriendButton.jsx";

const Friend = ({ friend, setIsRequestSuccess, setMessage, isFriend }) => {
  return (
    <div className="shadow-lg flex flex-col bg-white rounded-lg w-[220px] pb-3 items-center justify-center">
      <div className="flex flex-col w-full h-[230px] overflow-hidden">
        <ProfilePic
          picture={friend.picture}
          id={friend.user._id}
          className="w-full rounded-t-lg"
        />
      </div>
      <div className="flex flex-col w-full">
        <UserName
          name={friend.fullName}
          id={friend.user._id}
          className="my-2 hover:underline"
        />
      </div>
      {isFriend && (
        <FriendButton
          friendId={friend.user._id}
          setIsRequestSuccess={setIsRequestSuccess}
          setMessage={setMessage}
        />
      )}
    </div>
  );
};

export default Friend;

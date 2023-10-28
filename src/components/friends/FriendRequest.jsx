import React from "react";

import ProfilePic from "../common/ProfilePic";
import UserName from "../common/UserName";
import FriendRequestAcceptButton from "./FriendRequestAcceptButton.jsx";
import FriendRequestDeleteButton from "./FriendRequestDeleteButton.jsx";

const FriendRequest = ({ friendRequest }) => {
  return (
    <div className="shadow-lg flex flex-col bg-white rounded-lg w-[220px] pb-3 items-center justify-center">
      <div className="flex flex-col w-full h-[230px] overflow-hidden">
        <ProfilePic
          picture={friendRequest.sender.profile.picture}
          id={friendRequest.sender._id}
          className="w-full rounded-t-lg"
        />
      </div>
      <div className="flex flex-col w-full">
        <UserName
          name={friendRequest.sender.profile.fullName}
          id={friendRequest.sender._id}
          className="my-2 hover:underline"
        />
      </div>
      <FriendRequestAcceptButton friendRequest={friendRequest} />
      <FriendRequestDeleteButton friendRequest={friendRequest} />
    </div>
  );
};

export default FriendRequest;

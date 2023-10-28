import React from "react";

import ProfilePic from "../common/ProfilePic";
import UserName from "../common/UserName";

const Friends = ({ friends }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow p-3 flex flex-col">
      <div className="font-bold text-lg">Friends</div>
      <div className="text-gray-500">{friends.length} friends</div>
      <div className="flex gap-x-2 mt-3">
        {friends.map((friend) => (
          <div className="flex flex-col" key={friend.user._id}>
            <ProfilePic
              picture={friend.picture}
              id={friend.user._id}
              className="object-cover w-28 h-28 rounded-lg ring-1 ring-gray-100"
            />
            <UserName
              name={friend.fullName}
              id={friend.user._id}
              className="text-sm text-left"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ProfilePic from "../common/ProfilePic";
import UserName from "../common/UserName";

import { getFriendList } from "../../api"

const RightSidebar = ({ className }) => {
  const friendsSwitch = useSelector((state) => state.page.friends);
  const profile = useSelector((state) => state.page.profile);
  const profileFriends = useSelector((state) => state.page.profileFriends);
  const setting = useSelector((state) => state.page.setting);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriend = async () => {
      try {
        const fetchedFriends = await getFriendList(token, user._id);
        setFriends(fetchedFriends.data.friends);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchFriend();
  }, [token, user]);

  if (friendsSwitch || profile || profileFriends || setting) {
    return;
  }

  return (
    <div className={className}>
      <h3 className="font-bold text-lg mb-4">Friends</h3>
      <ul>
        {friends.map((friend) => (
          <li key={friend._id} className="flex items-center py-2 px-2 hover:bg-gray-200 transition duration-200 rounded-lg">
            <div className="flex items-center w-full">
              <ProfilePic
                picture={friend.picture}
                id={friend.user._id}
                className="w-10 h-10 object-cover rounded-full"
              />
              <UserName
                name={friend.fullName}
                id={friend.user._id}
                className="ml-2"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RightSidebar;

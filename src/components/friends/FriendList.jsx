import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Friend from "./Friend.jsx";
import Loading from "../common/Loading.jsx";
import ResponseModal from "../common/ResponseModal.jsx";

import { getFriendList } from "../../api";

const FriendList = ({ userId }) => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const acceptOrDeleteCount = useSelector(
    (state) => state.friendRequest.acceptOrDeleteCount
  );

  const [friends, setFriends] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRequestSuccess, setIsRequestSuccess] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchFriend = async () => {
      try {
        const fetchedFriends = await getFriendList(token, userId);
        setFriends(fetchedFriends.data.friends);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchFriend();
  }, [token, acceptOrDeleteCount, userId]);

  useEffect(() => {
    const fetchFriend = async () => {
      try {
        const fetchedFriends = await getFriendList(token, user._id);
        setUserFriends(fetchedFriends.data.friends);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchFriend();
  }, [token, acceptOrDeleteCount, userId]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  //console.log(friends);

  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="flex text-xl font-medium justify-center sm:justify-start">
        All friends
      </h2>
      <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
        {friends.length === 0 ? (
          <div>No friends yet</div>
        ) : (
          friends.map((friend) => (
            <Friend
              friend={friend}
              key={friend._id}
              setIsRequestSuccess={setIsRequestSuccess}
              setMessage={setMessage}
              isFriend={userFriends.some(
                (element) => element.user._id === friend.user._id
              )}
            />
          ))
        )}
      </div>
      {isRequestSuccess !== null && (
        <ResponseModal status={isRequestSuccess} message={message} />
      )}
    </div>
  );
};

export default FriendList;

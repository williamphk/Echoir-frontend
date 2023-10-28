import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import FriendRequest from "./FriendRequest.jsx";
import Loading from "../common/Loading.jsx";
import { getFriendRequestsReceived } from "../../api";

const FriendRequestList = () => {
  const token = useSelector((state) => state.auth.token);
  const acceptOrDeleteCount = useSelector(
    (state) => state.friendRequest.acceptOrDeleteCount
  );

  const [friendRequests, setFriendRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriendRequest = async () => {
      try {
        const fetchedFriendRequests = await getFriendRequestsReceived(token);
        setFriendRequest(fetchedFriendRequests.data.friendRequests);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchFriendRequest();
  }, [token, acceptOrDeleteCount]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="flex text-xl font-medium justify-center sm:justify-start">
        Friend Requests
      </h2>
      <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
        {friendRequests.length === 0 ? (
          <div>No requests received yet</div>
        ) : (
          friendRequests.map((friendRequest) => (
            <FriendRequest
              friendRequest={friendRequest}
              key={friendRequest._id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FriendRequestList;

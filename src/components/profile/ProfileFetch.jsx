import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

import Heading from "./Heading";
import Nav from "./Nav";
import Home from "./Home";
import FriendList from "../friends/FriendList";

import { getUser } from "../../api";

const ProfileFetch = () => {
  const [profile, setProfile] = useState({});
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isWorkClick, setIsWorkClick] = useState(false);
  const [isEducationClick, setIsEducationClick] = useState(false);
  const [isCityClick, setIsCityClick] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const updatePictureCount = useSelector(
    (state) => state.profile.updatePictureCount
  );

  let { userId } = useParams();
  const location = useLocation();

  const currentPath = location.pathname;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const fetchedProfile = await getUser(
          token,
          userId === "friends" ? (userId = user._id) : userId ?? user._id
        );
        setProfile(fetchedProfile.data.user.profile);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, [token, userId, user._id, updatePictureCount]);

  return (
    <div className="flex flex-col w-full lg:text-left">
      <Heading
        user={user}
        userId={userId}
        profile={profile}
        friends={friends}
        isWorkClick={isWorkClick}
        isEducationClick={isEducationClick}
        isCityClick={isCityClick}
        setIsWorkClick={setIsWorkClick}
        setIsEducationClick={setIsEducationClick}
        setIsCityClick={setIsCityClick}
      />
      <Nav />
      {userId === "friends" ||
      (userId !== "friends" && currentPath.includes("/friends")) ? (
        <div className="flex flex-col md:flex-row gap-x-4 md:px-[5%] lg:px-[15%] pt-4 gap-4 mb-8">
          <FriendList
            userId={
              userId === "friends" ? (userId = user._id) : userId ?? user._id
            }
          />
        </div>
      ) : (
        <Home
          user={user}
          setProfile={setProfile}
          friends={friends}
          setFriends={setFriends}
          isWorkClick={isWorkClick}
          isEducationClick={isEducationClick}
          isCityClick={isCityClick}
          setIsWorkClick={setIsWorkClick}
          setIsEducationClick={setIsEducationClick}
          setIsCityClick={setIsCityClick}
        />
      )}
    </div>
  );
};

export default ProfileFetch;

import React from "react";
import { useSelector } from "react-redux";

import Loading from "../common/Loading";

import ProfileFetch from "./ProfileFetch";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Loading />;
  }

  return (
    <>
      <ProfileFetch />
    </>
  );
};

export default Profile;

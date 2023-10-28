import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { switchComponent } from "../../slices/pageSlice";

const Nav = () => {
  let { userId } = useParams();

  const dispatch = useDispatch();

  const profile = useSelector((state) => state.page.profile);
  const profileFriends = useSelector((state) => state.page.profileFriends);

  return (
    <div className="flex w-full bg-white relative h-12 md:px-[5%] lg:px-[15%] shadow">
      <div className="border-t flex w-full justify-center md:justify-start">
        <button
          onClick={() => dispatch(switchComponent("profile"))}
          className={`${profile && "bg-gray-200"} w-20 h-12`}
        >
          <Link
            className="block h-full w-full flex justify-center items-center"
            to={`${
              userId && userId !== "friends"
                ? "/Odin-Book-frontend/profile/" + userId
                : "/Odin-Book-frontend/profile"
            }`}
          >
            Home
          </Link>
        </button>
        <button
          onClick={() => dispatch(switchComponent("profileFriends"))}
          className={`${profileFriends && "bg-gray-200"} w-20 h-12`}
        >
          <Link
            className="block h-full w-full flex justify-center items-center"
            to={`${
              userId && userId !== "friends"
                ? "/Odin-Book-frontend/profile/" + userId + "/friends"
                : "/Odin-Book-frontend/profile/friends"
            }`}
          >
            Friends
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Nav;

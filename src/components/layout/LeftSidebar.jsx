import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ProfilePic from "../common/ProfilePic";
import UserName from "../common/UserName";

import { switchComponent } from "../../slices/pageSlice";

const LeftSidebar = ({ className }) => {
  const user = useSelector((state) => state.auth.user);
  const newsfeed = useSelector((state) => state.page.newsfeed);
  const friends = useSelector((state) => state.page.friends);
  const profile = useSelector((state) => state.page.profile);
  const profileFriends = useSelector((state) => state.page.profileFriends);

  const dispatch = useDispatch();

  if (profile || profileFriends) {
    return;
  }

  return (
    <div className={className}>
      <div className="flex items-center py-2 px-2 hover:bg-gray-200 transition duration-200 rounded-lg">
        <div className="flex items-center w-full">
          <ProfilePic
            picture={user.picture}
            id={user._id}
            className="w-10 h-10 object-cover rounded-full"
          />
          <UserName
            name={user.fullName}
            id={user._id}
            className="ml-2 font-bold"
          />
        </div>
      </div>
      <nav>
        <ul>
          <li className="flex items-center space-x-2">
            <button
              className="flex text-gray-600 w-full hover:bg-gray-200 transition duration-200 py-2 rounded-lg"
              onClick={() => dispatch(switchComponent("newsfeed"))}
            >
              <Link
                to="/Odin-Book-frontend/"
                className={`${newsfeed && "text-purple-600 border-l-2 border-purple-500"
                  } px-2 w-full flex`}
              >
                Home
              </Link>
            </button>
          </li>
          <li className="flex flex-col items-start space-x-2">
            <button
              className="flex text-gray-600 w-full hover:bg-gray-200 transition duration-200 py-2 rounded-lg"
              onClick={() => dispatch(switchComponent("friends"))}
            >
              <Link
                to="/Odin-Book-frontend/friends"
                className={`${friends && "text-purple-600 border-l-2 border-purple-500"
                  } px-2 w-full flex`}
              >
                Friends
              </Link>
            </button>
            {friends && (
              <ul className="flex flex-col items-start pl-2">
                <li>
                  <Link to="/Odin-Book-frontend/friends">Friend requests</Link>
                </li>
                <li>
                  <Link to="/Odin-Book-frontend/friends/suggestion">
                    Friend suggestions
                  </Link>
                </li>
                <li>
                  <Link to="/Odin-Book-frontend/friends/list">All friends</Link>
                </li>
              </ul>
            )}
          </li>
          <li className="flex items-center space-x-2">
            <button className="flex text-gray-600 w-full hover:bg-gray-200 transition duration-200 py-2 px-2 rounded-lg">
              Ad Center
            </button>
          </li>
          <li className="flex items-center space-x-2">
            <button className="flex text-gray-600 w-full hover:bg-gray-200 transition duration-200 py-2 px-2 rounded-lg">
              Most Recent
            </button>
          </li>
          <li className="flex items-center space-x-2">
            <button className="flex text-gray-600 w-full hover:bg-gray-200 transition duration-200 py-2 px-2 rounded-lg">
              Groups
            </button>
          </li>
          <li className="flex items-center space-x-2">
            <button className="flex text-gray-600 w-full hover:bg-gray-200 transition duration-200 py-2 px-2 rounded-lg">
              Marketplace
            </button>
          </li>
          <li className="flex items-center space-x-2">
            <button className="flex text-gray-600 w-full hover:bg-gray-200 transition duration-200 py-2 px-2 rounded-lg">
              Watch
            </button>
          </li>
          <li className="flex items-center space-x-2">
            <button className="flex text-gray-600 w-full hover:bg-gray-200 transition duration-200 py-2 px-2 rounded-lg">
              See more
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LeftSidebar;

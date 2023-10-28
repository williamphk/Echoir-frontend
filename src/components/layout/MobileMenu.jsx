import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MobileMenu = () => {
  const profile = useSelector((state) => state.page.profile);

  if (profile) {
    return;
  }

  return (
    <ul className="flex flex-col md:hidden text-left pl-2">
      <li className="py-1 hover:bg-gray-100 w-full">
        <Link to="/Odin-Book-frontend/friends">Friend requests</Link>
      </li>
      <li className="py-1 hover:bg-gray-100 w-full">
        <Link to="/Odin-Book-frontend/friends/suggestion">
          Friend suggestions
        </Link>
      </li>
      <li className="py-1 hover:bg-gray-100 w-full">
        <Link to="/Odin-Book-frontend/friends/list">All friends</Link>
      </li>
    </ul>
  );
};

export default MobileMenu;

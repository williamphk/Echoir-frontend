import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { switchComponent } from "../../slices/pageSlice";

const ProfilePic = ({ picture, id, className }) => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(switchComponent("profile"));
  };

  return (
    <button onClick={handleOnClick}>
      <Link className="w-full" to={"/Odin-Book-frontend/profile/" + id}>
        <img
          src={`${
            picture.charAt(0) === "h"
              ? picture
              : picture === "default"
              ? "https://odin-book.azurewebsites.net/images/default.jpg"
              : "https://odin-book.azurewebsites.net/uploads/" + picture
          }`}
          alt="Profile"
          className={className}
        />
      </Link>
    </button>
  );
};

export default ProfilePic;

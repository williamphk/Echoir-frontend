import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { switchComponent } from "../../slices/pageSlice";

const UserName = ({ name, id, className }) => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(switchComponent("profile"));
  };
  return (
    <button onClick={handleOnClick}>
      <Link className="w-full" to={"/Odin-Book-frontend/profile/" + id}>
        <p className={className}>{name}</p>
      </Link>
    </button>
  );
};

export default UserName;

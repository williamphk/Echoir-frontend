import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { switchComponent } from "../../slices/pageSlice";

const SiteNameAndLogo = () => {
  const dispatch = useDispatch();

  const handleSiteNameAndLogoClick = () => {
    dispatch(switchComponent("newsfeed"));
  };

  return (
    <div className="self-center">
      <button
        onClick={handleSiteNameAndLogoClick}
        className="lg:flex justify-start text-purple-500 font-bold text-3xl hidden"
      >
        <Link to="/Odin-Book-frontend/">
          <h1>Odin-book</h1>
        </Link>
      </button>
    </div>
  );
};

export default SiteNameAndLogo;

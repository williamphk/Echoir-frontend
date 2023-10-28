import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../common/Modal";

import { removeTokenInCookie } from "../../api";
import { logout } from "../../slices/authSlice";
import { switchComponent } from "../../slices/pageSlice";

const ProfilePicSection = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const [isMenuOpen, setMenuOpen] = useState(false);

  // Reference the profile menu DOM element.
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    // If the menu is mounted in the DOM and the clicked element is not one of the menu items
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      // When the Navbar component is unmounted, the event listener is removed
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(switchComponent("newsfeed"));
    removeTokenInCookie(token);
  };

  const toggleProfileMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleProfileClick = () => {
    dispatch(switchComponent("profile"));
  };

  const handleSettingClick = () => {
    dispatch(switchComponent("setting"));
  };

  const menuItems = [
    {
      name: "profile",
      isLink: true,
      onClick: handleProfileClick,
    },
    {
      name: "setting",
      isLink: true,
      onClick: handleSettingClick,
    },
    {
      name: "Logout",
      isLink: false,
      onClick: handleLogout,
    },
  ];

  //console.log(user);

  return (
    <div className="relative flex justify-end self-center">
      <button onClick={toggleProfileMenu} ref={menuRef}>
        <img
          src={`${
            user.picture.charAt(0) === "h"
              ? user.picture
              : user.picture === "default"
              ? "https://odin-book.azurewebsites.net/images/default.jpg"
              : "https://odin-book.azurewebsites.net/uploads/" + user.picture
          }`}
          alt="Profile"
          className="w-10 h-10 object-cover rounded-full"
        />
      </button>

      {isMenuOpen && <Modal menuItems={menuItems} />}
    </div>
  );
};

export default ProfilePicSection;

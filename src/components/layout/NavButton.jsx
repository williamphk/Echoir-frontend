import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

import MaterialIcon from "../common/MaterialIcon";
import PostModal from "../posts/PostModal";

import { switchComponent } from "../../slices/pageSlice";
import { createPost } from "../../api";
import { incrementCreateOrUpdateCount } from "../../slices/postSlice";

const NavButton = ({ setIsMobileMenuOpen, isMobileMenuOpen }) => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const newsfeed = useSelector((state) => state.page.newsfeed);
  const friends = useSelector((state) => state.page.friends);

  const dispatch = useDispatch();

  const navIconArray = ["home", "group", "post_add"];
  const navIcons = navIconArray.map((iconName) => (
    <MaterialIcon
      className="material-symbols-outlined text-4xl"
      iconName={iconName}
    />
  ));

  const navItems = ["Home", "Friends", "Post"];
  const navRoutes = {
    Home: "/Odin-Book-frontend/",
    Friends: "/Odin-Book-frontend/friends",
  };

  const navSelected = {
    Home: newsfeed,
    Friends: friends,
  };

  const isMobile = useMediaQuery({
    query: "(max-width: 639px)",
  });

  const navOnClick = {
    Home: () => {
      dispatch(switchComponent("newsfeed"));
    },
    Friends: () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
      if (isMobile) return;
      dispatch(switchComponent("friends"));
    },
  };

  const onSubmit = async (data) => {
    await createPost(data, token);
    closePostModal();
    dispatch(incrementCreateOrUpdateCount());
  };

  const openPostModal = () => {
    setIsPostModalOpen(true);
  };

  const closePostModal = () => {
    setIsPostModalOpen(false);
  };

  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    // If the menu is mounted in the DOM and the clicked element is not one of the menu items
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      // When the Navbar component is unmounted, the event listener is removed
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-center items-center gap-x-4">
      {navItems.map((element, index) => {
        return index === navItems.length - 1 ? (
          <button
            className="text-gray-500 flex flex-col items-center text-xs hover:bg-gray-100 rounded-lg w-32 transition duration-200"
            key={index}
            onClick={openPostModal}
          >
            {navIcons[index]}
            <div className="hidden sm:block">{element}</div>
          </button>
        ) : index === 1 ? (
          <button
            className="flex flex-col items-center hover:bg-gray-100 rounded-lg w-32 transition duration-200"
            key={index}
            onClick={navOnClick[element]}
            ref={menuRef}
          >
            {isMobile ? (
              <div
                className={`${
                  navSelected[element]
                    ? "text-purple-500 border-b-2 border-purple-500"
                    : "text-gray-500"
                } text-xs w-full`}
              >
                {navIcons[index]}
                <div className="hidden sm:block">{element}</div>
              </div>
            ) : (
              <Link
                to={navRoutes[element]}
                className={`${
                  navSelected[element]
                    ? "text-purple-500 border-b-2 border-purple-500"
                    : "text-gray-500"
                } text-xs w-full`}
              >
                {navIcons[index]}
                <div className="hidden sm:block">{element}</div>
              </Link>
            )}
          </button>
        ) : (
          <button
            className="flex flex-col items-center hover:bg-gray-100 rounded-lg w-32 transition duration-200"
            key={index}
            onClick={navOnClick[element]}
            ref={menuRef}
          >
            <Link
              to={navRoutes[element]}
              className={`${
                navSelected[element]
                  ? "text-purple-500 border-b-2 border-purple-500"
                  : "text-gray-500"
              } text-xs w-full`}
            >
              {navIcons[index]}
              <div className="hidden sm:block">{element}</div>
            </Link>
          </button>
        );
      })}
      {isPostModalOpen && (
        <PostModal
          title="Add a new post"
          placeholder={`What's on your mind, ${user.firstName}?`}
          closePostModal={closePostModal}
          requiredInputField={true}
          button="Post"
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default NavButton;

import React from "react";
import { Link } from "react-router-dom";

const Modal = ({ menuItems }) => {
  const capitalizeString = (string) => {
    let capitalizedString = string.substr(0, 1).toUpperCase();
    return (capitalizedString += string.replace(string.substr(0, 1), ""));
  };

  return (
    <div className="absolute top-full right-1 w-36 mt-1 p-1 bg-white rounded-md shadow-3xl text-gray-800">
      {menuItems.map((element, index) => {
        return element.isLink ? (
          <button
            className="w-full block hover:bg-gray-200 rounded-md transition duration-50"
            key={index}
            onClick={element.onClick}
          >
            <Link
              className="w-full block px-4 py-2"
              to={"/Odin-Book-frontend/" + element.name}
            >
              {capitalizeString(element.name)}
            </Link>
          </button>
        ) : (
          <button
            type="button"
            key={index}
            onClick={element.onClick}
            className="w-full block px-4 py-2 hover:bg-gray-200 rounded-md transition duration-50"
          >
            {element.name}
          </button>
        );
      })}
    </div>
  );
};

export default Modal;

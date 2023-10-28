import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import "../styles.css";
import MaterialIcon from "../common/MaterialIcon";
import InputField from "../common/InputField";
import ProfilePic from "../common/ProfilePic";
import UserName from "../common/UserName";

const PostModal = ({
  title,
  placeholder,
  value,
  setPostContent,
  closePostModal,
  requiredInputField,
  requiredFileUpload,
  likes,
  button,
  onSubmit,
  buttonColor,
  buttonHoverColor,
  setSelectedFile,
}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm();

  const closeIcon = "close";

  const user = useSelector((state) => state.auth.user);

  const allFieldValues = watch();

  //console.log(!!allFieldValues.content);

  // if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
      <div
        className="absolute w-full h-full bg-gray-100 bg-opacity-80"
        onClick={closePostModal}
      ></div>
      <div className="relative bg-white rounded-lg z-50 w-[93%] md:w-[55%] lg:w-[36%] shadow-3xl">
        <div className="flex items-center justify-center border-b-[1px]">
          <h2 className="text-xl font-bold py-4">{title}</h2>
          <button
            onClick={closePostModal}
            className="w-[38px] h-[38px] hover:bg-gray-200 rounded-full flex justify-center items-center absolute right-3 top-3"
          >
            <MaterialIcon
              className="material-symbols-outlined text-3xl text-gray-600"
              iconName={closeIcon}
            />
          </button>
        </div>
        {requiredInputField && (
          <div className="flex mx-4 my-4 items-center">
            <ProfilePic
              picture={user.picture}
              id={user._id}
              className="object-cover w-10 h-10 rounded-full"
            />
            <div className="ml-2">{user.fullName}</div>
          </div>
        )}
        {title === "Delete" && (
          <div className="p-4 flex flex-col gap-y-2">
            <div className="font-bold">
              Once the post is deleted, it cannot be recovered.
            </div>
            <div>Continue to delete this post?</div>
          </div>
        )}
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          {requiredInputField && (
            <InputField
              register={register}
              errors={errors}
              id="content"
              type="text"
              placeholder={placeholder}
              value={value}
              setPostContent={setPostContent}
              rows={6}
              isTextArea={true}
              labeltext="Post content"
              inputClassName="mx-4 text-xl focus:outline-none resize-none"
              validation={{
                required: "Content is required",
              }}
            />
          )}
          {requiredFileUpload && (
            <input
              type="file"
              className="mx-4 mt-4"
              id="profile_picture"
              name="profile_picture"
              onChange={(event) => setSelectedFile(event.target.files[0])}
            />
          )}
          {button && (
            <button
              className={`${
                buttonColor || "bg-purple-500"
              } text-white px-4 py-2 rounded-md m-4 ${
                buttonHoverColor
                  ? "hover:" + buttonHoverColor
                  : "hover:bg-purple-600"
              }
            transition duration-200 disabled:bg-gray-300 disabled:text-gray-400`}
              disabled={requiredInputField && !allFieldValues.content}
            >
              {button}
            </button>
          )}
        </form>
        {likes &&
          likes.map((like) => (
            <div
              key={like._id}
              className="flex items-center py-2 px-2 hover:bg-gray-200 transition duration-200 rounded-lg"
            >
              <div className="flex items-center w-full">
                <ProfilePic
                  picture={like.user.profile.picture}
                  id={like.user._id}
                  className="w-10 h-10 object-cover rounded-full"
                />
                <UserName
                  name={like.user.profile.fullName}
                  id={like.user._id}
                  className="ml-2"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostModal;

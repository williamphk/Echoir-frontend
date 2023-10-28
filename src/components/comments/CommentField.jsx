import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import MaterialIcon from "../common/MaterialIcon.jsx";
import InputField from "../common/InputField.jsx";

const CommentField = ({
  commentContent,
  setCommentContent,
  placeholder,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [isDisable, setIsDisable] = useState(true);

  const content = watch("content");

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      // Disable button after submitted by keyboard
      setIsDisable(true);
      handleSubmit(onSubmit)();
    }
  };

  const onSubmitWrapper = (data) => {
    // Disable button after submitted
    setIsDisable(true);
    onSubmit(data);
  };

  // Disable button if no content
  useEffect(() => {
    //console.log(!!content);
    setIsDisable(!content);
  }, [content]);

  return (
    <form
      onSubmit={handleSubmit(onSubmitWrapper)}
      className="relative flex justify-end grow"
    >
      <InputField
        register={register}
        errors={errors}
        id="content"
        type="text"
        placeholder={placeholder || "Write a comment..."}
        value={commentContent}
        setPostContent={setCommentContent}
        inputClassName="bg-gray-100 w-full p-2 rounded-lg focus:outline-none text-sm resize-none"
        rows={2}
        isTextArea={true}
        labeltext="Comment content"
        validation={{
          required: "Content is required",
        }}
        handleKeyPress={handleKeyPress}
      />
      <button
        disabled={isDisable}
        className="absolute bottom-0 right-1 w-[28px] h-[28px] mb-1 hover:bg-gray-200 disabled:bg-transparent rounded-full flex justify-center items-center"
      >
        <MaterialIcon
          className={`material-symbols-outlined text-xl ${
            !isDisable ? "text-purple-500" : "text-gray-500"
          } absolute`}
          iconName={"send"}
        />
      </button>
    </form>
  );
};

export default CommentField;

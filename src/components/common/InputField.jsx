import React from "react";

const InputField = ({
  register,
  errors,
  id,
  type,
  placeholder,
  value,
  setPostContent,
  inputClassName,
  labeltext,
  rows,
  validation,
  requiredError,
  isTextArea = false,
  handleKeyPress,
}) => {
  const { onChange, ...rest } = register(id, validation);

  // Create a custom handleChange function with the original onChange function inside
  const handleChange = (e) => {
    setPostContent && setPostContent(e.target.value);
    onChange(e);
  };

  return (
    <div className="flex flex-col w-full">
      {type === "date" && (
        <label className="text-sm" htmlFor={id}>
          {placeholder}
        </label>
      )}

      {isTextArea ? (
        <textarea
          className={
            inputClassName || "border border-gray-300 w-full p-2 rounded"
          }
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          aria-label={labeltext}
          rows={rows}
          onKeyDown={handleKeyPress}
          {...rest}
        />
      ) : (
        <input
          className={
            inputClassName ||
            "border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
          }
          id={id}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          aria-label={labeltext}
          onKeyDown={handleKeyPress}
          {...rest}
        />
      )}

      {requiredError && (
        <div className="h-5">
          <span className="text-red-500 text-sm">{errors[id]?.message}</span>
        </div>
      )}
    </div>
  );
};

export default InputField;

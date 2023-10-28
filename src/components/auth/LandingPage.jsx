import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slices/authSlice";

import InputField from "../common/InputField.jsx";

import "../styles.css";

const LandingPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isTestLoginLoading, setIsTestLoginLoading] = useState(false);

  const dispatch = useDispatch();
  const errorState = useSelector((state) => state.auth.error);

  const onSubmit = (data) => {
    if (data.email === "test@test.com") {
      setIsTestLoginLoading(true);
    } else {
      setIsLoginLoading(true);
    }
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (errorState && errorState.email) {
      setError("email", { message: errorState.email });
      setIsLoginLoading(false);
    }
    if (errorState && errorState.password) {
      setError("password", { message: errorState.password });
      setIsLoginLoading(false);
    }
  }, [errorState, setError]);

  return (
    <div className="min-h-screen moving-gradient flex flex-col items-center justify-center gap-10">
      <h1 className="text-5xl font-bold text-white">odin-book</h1>
      <h2 className="text-3xl text-white">
        Connect with friends and the world
      </h2>
      <div className="bg-white p-6 rounded shadow-lg w-90 space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* email */}
          <InputField
            register={register}
            errors={errors}
            id="email"
            type="email"
            placeholder="Email:"
            labeltext="Email"
            requiredError={true}
            validation={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            }}
          />
          {/* password */}
          <InputField
            register={register}
            errors={errors}
            id="password"
            type="password"
            placeholder="Password:"
            labeltext="Password"
            requiredError={true}
            validation={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            }}
          />
          {/* login button */}
          <button className="bg-purple-600 text-white hover:bg-purple-800 w-full px-6 py-2 rounded font-semibold mr-4 shadow-md transition duration-200">
            {isLoginLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="flex space-x-4">
          {/* register button */}
          <Link to="/Odin-Book-frontend/register">
            <button className="bg-pink-500 hover:bg-pink-700 text-white px-7 py-2 rounded font-semibold shadow-md transition duration-200">
              Register
            </button>
          </Link>
          {/* login with facebook */}
          <button className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold shadow-md transition duration-200">
            <a href="https://odin-book.azurewebsites.net/login/facebook">
              Login With Facebook
            </a>
          </button>
        </div>
        {/* Login with Test Account */}
        <button
          className="text-black underline hover:text-blue-500 transition duration-50"
          onClick={() =>
            onSubmit({ email: "test@test.com", password: "12345678aA!" })
          }
        >
          {isTestLoginLoading ? "Loading..." : "Login with Test Account"}
        </button>
      </div>
    </div>
  );
};

export default LandingPage;

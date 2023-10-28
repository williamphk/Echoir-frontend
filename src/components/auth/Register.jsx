import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../slices/authSlice";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import InputField from "../common/InputField.jsx";

import "../styles.css";

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const errorState = useSelector((state) => state.auth.error);

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    try {
      setIsRegisterLoading(true);
      dispatch(signUp(data));
    } catch (error) {
      //console.error("Error during registration:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/Odin-Book-frontend/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (errorState && errorState.errors) {
      errorState.errors.forEach((error) => {
        setError(error.path, { message: error.msg });
        setIsRegisterLoading(false);
      });
    }
  }, [errorState, setError]);

  return (
    <div className="min-h-screen moving-gradient flex flex-col items-center justify-center gap-10 ">
      <h1 className="text-5xl font-bold text-white">Register</h1>
      <div className="bg-white p-6 rounded shadow-lg w-2/5 space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
          {/* firstname */}
          <InputField
            register={register}
            errors={errors}
            id="firstName"
            type="text"
            placeholder="First Name:"
            labeltext="First Name"
            requiredError={true}
            validation={{
              required: "First Name is required",
            }}
          />
          {/* lastname */}
          <InputField
            register={register}
            errors={errors}
            id="lastName"
            type="text"
            placeholder="Last Name:"
            labeltext="Last Name"
            requiredError={true}
            validation={{
              required: "Last Name is required",
            }}
          />
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
          {/* confirm password */}
          <InputField
            register={register}
            errors={errors}
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password:"
            labeltext="Confirm Password"
            requiredError={true}
            validation={{
              required: "Confirm Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            }}
          />
          {/* birthday */}
          <InputField
            register={register}
            errors={errors}
            id="birthday"
            type="date"
            placeholder="Birthday:"
            labeltext="Birthday"
            requiredError={true}
            validation={{
              required: "Birthday is required",
            }}
          />
          {/* gender */}
          <div className="flex flex-col">
            <label className="text-sm" htmlFor="gender">
              Gender:
            </label>
            <select
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              id="gender"
              labeltext="Gender"
              {...register("gender", { required: "Gender is required" })}
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
            <div className="h-5">
              <span className="text-red-500 text-sm">
                {errors.gender?.message}
              </span>
            </div>
          </div>
          {/* register button */}
          <button
            className="bg-pink-600 text-white hover:bg-purple-800 w-full px-6 py-2 rounded font-semibold mr-4 shadow-md transition duration-200"
            type="submit"
          >
            {isRegisterLoading ? "Loading..." : "Register"}
          </button>
        </form>
        {/* login button */}
        <div className="flex">
          <Link to="/" className="w-full">
            <button
              className="bg-purple-600 text-white hover:bg-purple-800 w-full px-6 py-2 rounded font-semibold mr-4 shadow-md transition duration-200"
              type="button"
            >
              Already have a account?
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/Toast";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { FaGoogle } from "react-icons/fa";

const Signup = () => {
  const { registerUser } = useAuth();

  const navigate = useNavigate();

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // login handler (dummy for now)
  const onSubmit = async (data) => {
    console.log(data);
    try {
      await registerUser(data.email, data.password);
      handleSuccess("use register successfull");
      // simulate redirect
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      handleError("please provide valid email and password");
      console.log(error);
    }
  };

  //handle gGoogleSignin

  const handleGoogleSignin = () => {};
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-indigo-500">
          create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-indigo-500"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                placeholder="Enter your mail id"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-indigo-500 outline-1 outline-indigo-500 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-indigo-500"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-indigo-500 outline-1 outline-indigo-500 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-indigo-500"
            >
              Register
            </button>
            {/* Signup link */}
            <p className="mt-10 text-center text-sm text-gray-400">
              already a member?{" "}
              <Link
                to="/login"
                className="font-semibold text-indigo-400 hover:text-indigo-300"
              >
                login to your account
              </Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;

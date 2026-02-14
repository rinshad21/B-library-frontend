import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/Toast";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";

import axios from "axios";
import getBaseurl from "./../utils/getBaseurl";

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(`${getBaseurl()}/auth/admin`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const auth = response.data;
      console.log(auth);
      if (auth.token) {
        localStorage.setItem("token", auth.token);
        setTimeout(() => {
          localStorage.removeItem("token");
          handleError("token has expired ,please login again");
          navigate("/login");
        }, 3600 * 1000);
      }
      handleSuccess("admin login successfull");
      navigate("/dashboard");
    } catch (error) {
      handleError("please provide valid username and password");
      console.log(error);
    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-indigo-500">
          Admin Dashboard Login
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-indigo-500"
            >
              username
            </label>
            <div className="mt-2">
              <input
                id="username"
                type="username"
                placeholder="Enter your username"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-indigo-500 outline-1 outline-indigo-500 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
                {...register("username", { required: "username is required" })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
          </div>

 
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

    
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-indigo-500"
            >
              Login in
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;

import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/Toast";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { Footer } from "./Footer";

const Login = () => {
  //log with g account
  const { loginUser, signInWithGoogle } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await loginUser(data.email, data.password);
      handleSuccess("login successfull");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      handleError("please provide valid email and password");
      console.log(error);
    }
  };

  //sign in with google
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      handleSuccess("login successfull");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      handleError("google signin failed");
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-indigo-500">
          Login in to your account
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
              Login in
            </button>
          </div>
        </form>

        {/* Signup link */}
        <p className="mt-4 text-center text-sm text-gray-400">
          Not a member?{" "}
          <Link
            to="/signup"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Register your account
          </Link>
        </p>
        {/* google sign in using firebase */}
        <div className="flex justify-center text-center mt-2 w-full">
          <button
            onClick={handleGoogleSignIn}
            className="flex w-full justify-center gap-2 mt-2 rounded-md bg-book-violet-950 px-3 py-1.5 text-sm font-semibold active:bg-indigo-500  text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-500"
          >
            <FaGoogle className="text-lg" />
            Sign in with google
          </button>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default Login;

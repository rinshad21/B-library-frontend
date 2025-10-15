import React from "react";
import { RiBookOpenFill } from "react-icons/ri";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="relative flex justify-center items-center">
        {/* Spinner circle */}
        <div className="w-16 h-16 border-4 border-book-violet-300 border-t-book-violet-600 rounded-full animate-spin"></div>

        {/* Center icon */}
        <RiBookOpenFill className="absolute text-book-violet-600 w-7 h-7 animate-pulse" />
      </div>

      {/* Text */}
      <p className="mt-4 text-book-violet-600 font-semibold text-lg tracking-wide">
        Loading...
      </p>
    </div>
  );
};

export default Loading;

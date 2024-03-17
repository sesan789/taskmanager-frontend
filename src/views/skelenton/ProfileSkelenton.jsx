import React from "react";

function ProfileSkelenton() {
  return (
    <div className="animate-pulse w-[90%] mx-auto mt-8 h-80 bg-gray-400 rounded-lg">
      <div className="w-full h-full gap-5 flex-col flex justify-center items-center">
        {/* Cirle Image */}
        <div className="circle w-32 h-32 rounded-full bg-gray-300"></div>

        {/* Text */}
        <p className="h-3 w-44 rounded-full bg-gray-300"></p>

        {/* Button */}
        <div className="bg-gray-300 h-7 rounded-md w-20"></div>
      </div>

      {/* cards */}
      <div className="mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        <div className="w-full bg-gray-400 p-10 flex gap-5 flex-col rounded-lg">
          <p className="bg-gray-300 h-2 w-10 rounded-full"></p>
          <p className="h-5 w-5 rounded-full bg-gray-300"></p>
        </div>

        <div className="w-full bg-gray-400 p-10 flex gap-5 flex-col rounded-lg">
          <p className="bg-gray-300 h-2 w-10 rounded-full"></p>
          <p className="h-5 w-5 rounded-full bg-gray-300"></p>
        </div>

        <div className="w-full bg-gray-400 p-10 flex gap-5 flex-col rounded-lg">
          <p className="bg-gray-300 h-2 w-10 rounded-full"></p>
          <p className="h-5 w-5 rounded-full bg-gray-300"></p>
        </div>

        <div className="w-full bg-gray-400 p-10 flex gap-5 flex-col rounded-lg">
          <p className="bg-gray-300 h-2 w-10 rounded-full"></p>
          <p className="h-5 w-5 rounded-full bg-gray-300"></p>
        </div>
      </div>
    </div>
  );
}

export default ProfileSkelenton;

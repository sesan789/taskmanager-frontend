import ProfileSkelenton from "./ProfileSkelenton";

function MainLayoutSkelenton() {
  return (
    <div>
      {/* header skelenton */}
      <div className="animate-pulse w-full bg-gray-400 ">
        <div className="w-[80%] mx-auto py-2 flex justify-between items-center ">
          {/* Logo */}
          <div className="w-20 h-4 rounded-lg bg-gray-300"></div>
          {/* nav  */}
          <div className="w-[30%] h-3 rounded-full bg-gray-300"></div>
          {/* profile image */}
          <div className="w-5 h-5 rounded-full bg-gray-300"></div>
        </div>
      </div>
      {/* main skelenton */}
      <ProfileSkelenton />
    </div>
  );
}

export default MainLayoutSkelenton;

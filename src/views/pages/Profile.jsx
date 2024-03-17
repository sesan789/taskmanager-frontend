import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthState, useLogout } from "../../features/hooks/useAuth";

function Profile() {
  const [showToggle, setShowToggle] = useState(false);

  const { user } = useAuthState();
  const logout = useLogout();

  const handleToggle = () => {
    setShowToggle(!showToggle);
  };

  return (
    <div className="w-[90%] mx-auto mt-8">
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4 relative">
          <button
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
            onClick={handleToggle}
          >
            <span className="sr-only">Open dropdown</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>
          {/* Dropdown menu */}
          <div
            id="dropdown"
            className={`z-10 ${
              showToggle ? null : "hidden"
            } text-base list-none absolute top-14 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
          >
            <ul
              onClick={handleToggle}
              className="py-2 "
              aria-labelledby="dropdownButton"
            >
              <li>
                <NavLink
                  to="/edit-profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Edit Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my-tasks"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  View Tasks
                </NavLink>
              </li>
              <li>
                <p
                  onClick={logout}
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-600 dark:hover:text-white"
                >
                  Log Out
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="/docs/images/people/profile-picture-3.jpg"
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user.first_name} {user.last_name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {user.email}
          </span>
          <div className="flex mt-4 md:mt-6">
            <NavLink
              to="/my-tasks"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              My Task
            </NavLink>
          </div>
        </div>
      </div>

      {/* Analysis */}
      <div className="w-[90%] mx-auto mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        <div className="flex flex-col bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:border-t-blue-500 dark:shadow-slate-700/[.7]">
          <div className="p-4 md:p-5">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Tasks
            </h3>
            <p className="mt-2 text-6xl text-center text-gray-500 dark:text-white">
              0
            </p>
          </div>
        </div>

        <div className="flex flex-col bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:border-t-blue-500 dark:shadow-slate-700/[.7]">
          <div className="p-4 md:p-5">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Completed Tasks
            </h3>
            <p className="mt-2 text-6xl text-center text-gray-500 dark:text-white">
              0
            </p>
          </div>
        </div>

        <div className="flex flex-col bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:border-t-blue-500 dark:shadow-slate-700/[.7]">
          <div className="p-4 md:p-5">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Pending Tasks
            </h3>
            <p className="mt-2 text-6xl text-center text-gray-500 dark:text-white">
              0
            </p>
          </div>
        </div>

        <div className="flex flex-col bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:border-t-blue-500 dark:shadow-slate-700/[.7]">
          <div className="p-4 md:p-5">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Reviewed Tasks
            </h3>
            <p className="mt-2 text-6xl text-center text-gray-500 dark:text-white">
              0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

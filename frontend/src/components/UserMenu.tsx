import { LogOut, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const UserMenu = () => {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/logout`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (res.status === 200) {
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging out", error);
    }
  }

  return (
    <ul className="space-y-2">
      {/* <Link
        to="/profile"
        className="flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 hover:bg-gray-100 hover:text-blue-600 text-gray-700"
      >
        <User size={20} className="text-gray-600" /> Profile
      </Link> */}
      <Link
        to="/settings"
        className="group flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-100 hover:scale-105 hover:bg-gray-50 text-gray-800"
      >
        <Settings
          size={20}
          className="group-hover:text-blue-600 transition-colors duration-100"
        />{" "}
        <span className="group-hover:text-blue-600 transition-colors duration-100">
          Settings
        </span>
      </Link>
      <Link
        to="/signin"
        className="group flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-100 hover:scale-105 hover:bg-gray-50 text-gray-800"
        onClick={handleLogout}
      >
        <LogOut
          size={20}
          className="text-gray-600 group-hover:text-blue-600 transition-colors duration-100"
        />
        <span className="group-hover:text-blue-600 transition-colors duration-100">
          Sign out
        </span>
      </Link>
    </ul>
  );
};

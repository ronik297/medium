import { LogOut } from "lucide-react";
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
        className="flex items-center gap-2 px-4 cursor-pointer hover:bg-gray-100 py-2 rounded hover:scale-115 duration-200"
      >
        <User /> Profile
      </Link>
      <Link
        to="/settings"
        className="flex items-center gap-2 px-4 cursor-pointer hover:bg-gray-100 py-2 rounded hover:scale-115 duration-200"
      >
        <Settings /> Settings
      </Link> */}
      <Link
        to="/signin"
        className="flex items-center gap-2 px-4 cursor-pointer hover:bg-gray-100 py-2 rounded hover:scale-115 duration-200"
        onClick={handleLogout}
      >
        <LogOut /> Logout
      </Link>
    </ul>
  );
};

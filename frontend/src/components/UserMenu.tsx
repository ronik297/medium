import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export const UserMenu = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
  };

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

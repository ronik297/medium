import { Link } from "react-router-dom";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

export const UserMenu = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <ul className="space-y-2">
      {/* <Link
        to="/profile"
        className="flex items-center gap-2 px-4 cursor-pointer hover:bg-gray-100 py-2 rounded hover:scale-125 duration-200"
      >
        <CgProfile /> Profile
      </Link>
      <Link
        to="/settings"
        className="flex items-center gap-2 px-4 cursor-pointer hover:bg-gray-100 py-2 rounded hover:scale-125 duration-200"
      >
        <FiSettings /> Settings
      </Link> */}
      <Link
        to="/signin"
        className="flex items-center gap-2 px-4 cursor-pointer hover:bg-gray-100 py-2 rounded hover:scale-125 duration-200"
        onClick={handleLogout}
      >
        <FiLogOut /> Logout
      </Link>
    </ul>
  );
};

import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import { UserMenu } from "./UserMenu";
import { PenLine } from "lucide-react";
import { useUser } from "../hooks/useUser";

export const Appbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useUser();
  const ref = useOutsideClick({
    handler: () => {
      setShowMenu(false);
    },
  });

  return (
    <div className="border-b border-slate-300 flex justify-between items-center px-10 py-4">
      <Link to={"/blogs"}>
        <div className="cursor-pointer">
          <img src="/medium_logo.svg" className="w-[112px] h-[40px]" />
        </div>
      </Link>
      <div className="flex items-center">
        <Link to={"/publish"}>
          <button
            type="button"
            className="mr-4 focus:outline-none text-white bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg  hover:from-blue-700 hover:to-blue-900 transition-colors font-medium text-sm px-5 py-2.5 cursor-pointer flex items-center gap-2"
          >
            <PenLine size={18} /> Publish
          </button>
        </Link>
        <div
          onClick={() => {
            setShowMenu((prev) => !prev);
          }}
          className="relative"
          ref={ref}
        >
          <Avatar size="big" name={user?.name || ""} />
          {showMenu && (
            <div className="absolute right-0 top-16 bg-white shadow-lg rounded-lg w-48 p-4 z-999 ">
              <UserMenu />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

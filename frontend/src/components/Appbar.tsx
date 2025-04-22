import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import { UserMenu } from "./UserMenu";

export const Appbar = () => {
  const [showMenu, setShowMenu] = useState(false);
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
            className="mr-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer"
          >
            Publish
          </button>
        </Link>
        <div onClick={() => setShowMenu((prev) => !prev)} className="relative">
          <Avatar size="big" name="Ronik Kumar" />
          {showMenu && (
            <div
              className="absolute right-0 top-16 bg-white shadow-lg rounded-lg w-48 p-4 z-999 "
              ref={ref}
            >
              <UserMenu />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

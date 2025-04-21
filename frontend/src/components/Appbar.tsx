import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
  return (
    <div className="border-b border-slate-300 flex justify-between items-center px-10 py-4">
      <Link to={"/blogs"}>
        <div className="cursor-pointer">
          <img src="/medium_logo.svg" className="w-[112px] h-[40px]" />
        </div>
      </Link>
      <div>
        <Link to={"/publish"}>
          <button
            type="button"
            className="mr-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2"
          >
            Publish
          </button>
        </Link>

        <Avatar size="big" name="Ronik Kumar" />
      </div>
    </div>
  );
};

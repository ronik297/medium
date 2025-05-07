import { Pencil } from "lucide-react";
import { Blog } from "../hooks/useBlogs";
import { Avatar } from "./BlogCard";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  const token = localStorage.getItem("token") || "";
  const decodedToken = jwtDecode(token) as { id: number; name: string };
  const userId = decodedToken.id;
  const isAuthor = blog.author.id === userId;

  return (
    <>
      <div className="rounded-lg shadow-2xl mt-10 w-full max-w-4xl p-10 bg-white text-black min-h-[25vh]">
        <div className="grid grid-col-2 sm:grid-cols-12 w-full max-w-screen-xl gap-10">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold text-wrap break-words overflow-hidden">
              {blog.title}
            </div>
            <div className="text-slate-500 pt-4">
              Posted on{" "}
              {new Date(blog.createdAt).toLocaleString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
            <div className="pt-4 text-wrap break-words overflow-hidden">
              {blog.content}
            </div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-600">Author</div>
            <div className="flex pt-2">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar size="big" name={blog.author.name || "Anonymous"} />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
              </div>
            </div>
          </div>
        </div>
        {isAuthor && (
          <div className="flex justify-end pt-4">
            <Link
              to={`/edit/${blog.id}`}
              className="inline-flex items-center gap-2 cursor-pointer px-5 py-2.5 text-sm font-medium text-center text-white bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg  hover:from-blue-700 hover:to-blue-900 transition-colors "
            >
              <Pencil size={18} />
              Edit post
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

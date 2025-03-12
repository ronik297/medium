import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

export default function BlogCard({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b border-slate-400 p-4 w-full cursor-pointer">
        <div className="flex items-center">
          <Avatar size="small" name={authorName} />
          <div className="font-extralight pl-2 text-sm">{authorName}</div>
          <div className="pl-2 text-sm text-slate-500">&#x2022;</div>
          <div className="pl-2 font-thin text-slate-500 text-sm">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
        <div className=" text-slate-500 text-sm font-thin mt-2">{`${Math.ceil(
          content.length / 100
        )} minute(s) read`}</div>
      </div>
    </Link>
  );
}

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        size === "small" ? "h-6 w-6" : "h-9 w-9"
      } overflow-hidden bg-gray-600 rounded-full`}
    >
      <span
        className={`${
          size === "small" ? "text-sm" : "text-lg"
        } font-extralight text-gray-600 dark:text-gray-300`}
      >
        {name[0]}
      </span>
    </div>
  );
}

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
    <Link to={`/blog/${id}`} className="block hover:no-underline group">
      <div className="border border-gray-200 rounded-lg p-6 w-full cursor-pointer hover:shadow-md transition-shadow duration-300 bg-white">
        <div className="flex items-center mb-4">
          <Avatar size="small" name={authorName} />
          <div className="font-bold pl-2 text-sm text-gray-700">
            {authorName}
          </div>
          <div className="pl-2 text-sm text-gray-400">&#x2022;</div>
          <div className="pl-2 text-gray-500 text-sm">{publishedDate}</div>
        </div>
        <div className="text-xl font-bold pt-1 mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
          {title}
        </div>
        <div className="text-gray-600 leading-relaxed mb-4">
          {content.slice(0, 120) + (content.length > 120 ? "..." : "")}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 text-sm font-medium hover:underline">
            Read more
          </span>
          <span className="text-gray-400 text-sm">
            {`${Math.ceil(content.length / 100)} min read`}
          </span>
        </div>
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
      className={`relative inline-flex items-center justify-center cursor-pointer ${
        size === "small" ? "h-8 w-8" : "h-10 w-10"
      } overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 rounded-full`}
    >
      <span
        className={`${
          size === "small" ? "text-sm" : "text-lg"
        } font-medium text-white`}
      >
        {name[0]?.toUpperCase()}
      </span>
    </div>
  );
}

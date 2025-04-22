import BlogCard from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks/useBlogs";
import BlogSkeleton from "../components/BlogSkeleton";
import { useNavigate } from "react-router-dom";

export default function Blogs() {
  const { loading, blogs, error } = useBlogs();

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center items-center overflow-hidden">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Appbar />
      <div className="flex justify-center pb-10">
        <div className="w-full lg:w-1/2">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate="12 March 2025"
            />
          ))}
        </div>
      </div>
    </>
  );
}

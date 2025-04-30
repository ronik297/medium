import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks/useBlogs";
import BlogSkeleton from "../components/BlogSkeleton";

export default function Blogs() {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-[90%] sm:w-full overflow-hidden">
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center p-10 ">
        <div className="w-full flex flex-col gap-4">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={new Date(blog.createdAt).toLocaleDateString(
                "en-GB",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              )}
            />
          ))}
        </div>
      </div>
    </>
  );
}

import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks/useBlogs";
import { useParams } from "react-router-dom";

export default function Blog() {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });

  if (loading || !blog) {
    return (
      <div className="flex justify-center items-center w-full h-[calc(100vh-73px)]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-w-[50vw]">
      <FullBlog blog={blog} />
    </div>
  );
}

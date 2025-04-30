import { useNavigate, useParams } from "react-router-dom";
import { useBlog, useDeleteBlog, useUpdateBlog } from "../hooks/useBlogs";
import BlogSkeleton from "../components/BlogSkeleton";
import TextEditor from "../components/TextEditor";
import { useEffect, useState } from "react";
import { RefreshCcw, Trash2 } from "lucide-react";
import { Spinner } from "../components/Spinner";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, blog } = useBlog({ id: id || "" });
  const {
    updateBlog,
    loading: updateBlogLoading,
    error: updateBlogError,
  } = useUpdateBlog();
  const {
    deleteBlog,
    loading: deleteBlogLoading,
    error: deleteBlogError,
  } = useDeleteBlog();
  const [title, setTitle] = useState(blog?.title || "");
  const [description, setDescription] = useState(blog?.content || "");

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setDescription(blog.content);
    }
  }, [blog]);

  if (loading) {
    return (
      <div className="flex justify-center items-center overflow-hidden">
        <div>
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
        </div>
      </div>
    );
  }

  const handleUpdateBlog = async () => {
    try {
      const response = await updateBlog(id || "", title, description);
      navigate(`/blog/${response?.id}`);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const handleDeleteBlog = async () => {
    try {
      await deleteBlog(id || "");
      navigate("/blogs");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-10 mx-auto p-8 rounded-lg shadow-2xl text-white w-full max-w-4xl">
      <h1 className="text-3xl font-bold text-black">Edit Blog</h1>
      <p className="text-slate-400 text-center">
        Update your title and content below
      </p>
      <div className="p-4 max-w-screen-lg w-full lg:p-0">
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          value={title}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 focus:outline-none"
          placeholder="Title"
        />
        <TextEditor
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex gap-4 w-full justify-center">
        <button
          className="w-full inline-flex justify-center items-center gap-2 cursor-pointer px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          onClick={handleUpdateBlog}
          disabled={updateBlogLoading}
        >
          {updateBlogLoading ? <Spinner /> : <RefreshCcw size={16} />} Update
        </button>
        <button
          className="w-full flex justify-center items-center gap-2 cursor-pointer px-5 py-2.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800"
          onClick={handleDeleteBlog}
          disabled={deleteBlogLoading}
        >
          {deleteBlogLoading ? (
            <Spinner bgColor="#7a7785" />
          ) : (
            <Trash2 size={16} />
          )}{" "}
          Delete
        </button>
      </div>
      {(deleteBlogError || updateBlogError) && (
        <p className="text-red-500 text-sm text-center mt-2">
          {deleteBlogError || updateBlogError}
        </p>
      )}
    </div>
  );
}

export default Edit;

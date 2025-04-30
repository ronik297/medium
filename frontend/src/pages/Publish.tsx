import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import TextEditor from "../components/TextEditor";
import { useCreateBlog } from "../hooks/useBlogs";
import { Spinner } from "../components/Spinner";

export default function Publish() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { createBlog, error, loading } = useCreateBlog();

  const handleCreateBlog = async () => {
    try {
      const response = await createBlog(title, description);
      navigate(`/blog/${response?.id}`);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-10 mx-auto p-8 rounded-lg shadow-2xl text-white w-full max-w-4xl">
      <h1 className="text-3xl font-bold text-black">Create a New Post</h1>
      <p className="text-slate-400 text-center">
        Publish your ideas, knowledge, or creative work with the world.
      </p>
      <div className="p-4 max-w-screen-lg w-full lg:p-0">
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 "
          placeholder="Title"
        />
        <TextEditor onChange={(e) => setDescription(e.target.value)} />
        <div className="flex gap-4 w-full justify-center">
          <button
            type="submit"
            className="w-full inline-flex justify-center items-center gap-2 cursor-pointer px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 "
            onClick={handleCreateBlog}
            disabled={loading}
          >
            {loading ? <Spinner bgColor="#dcdbea" /> : <Send size={16} />}{" "}
            Publish post
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
  content: string;
  title: string;
  id: number;
  author: {
    name: string;
    id: number;
  };
  createdAt: string;
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setBlog(res.data.blog);
        setLoading(false);
      });
  }, [id]);

  return { loading, blog };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setBlogs(res.data.blogs);
        setLoading(false);
      })
      .catch((err) => {
        setError("Something went wrong!" + err + "Please try again later.");
        setLoading(false);
        console.error(err);
      });
  }, []);

  return { loading, blogs, error };
};

export const useCreateBlog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBlog = async (title: string, content: string) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        { title, content },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setLoading(false);
      return res.data;
    } catch (err) {
      setError("Something went wrong! Please try again later.");
      setLoading(false);
      console.error(err);
      throw err;
    }
  };

  return { loading, error, createBlog };
};

export const useUpdateBlog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateBlog = async (id: string, title: string, content: string) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/v1/blog/${id}`,
        { title, content },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setLoading(false);
      return res.data;
    } catch (err) {
      setError("Something went wrong! Please try again later.");
      setLoading(false);
      console.error(err);
    }
  };

  return { loading, error, updateBlog };
};

export const useDeleteBlog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteBlog = async (id: string) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setLoading(false);
      return res.data;
    } catch (err) {
      setError("Something went wrong! Please try again later.");
      setLoading(false);
      console.error(err);
    }
  };

  return { loading, error, deleteBlog };
};

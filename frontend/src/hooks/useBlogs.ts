import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "../config";

export interface Author {
  name: string;
  id: number;
}

export interface Blog {
  content: string;
  title: string;
  id: number;
  author: Author;
  createdAt: string;
}

interface ApiError {
  message: string;
  statusCode?: number;
}

interface BlogResponse {
  blog: Blog;
}

interface BlogsResponse {
  blogs: Blog[];
}

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }
  return { Authorization: `Bearer ${token}` };
};

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchBlog = async () => {
      try {
        const { data } = await axios.get<BlogResponse>(
          `${BACKEND_URL}/api/v1/blog/${id}`,
          {
            headers: getAuthHeader(),
            signal: controller.signal,
          }
        );
        setBlog(data.blog);
      } catch (err) {
        if (!axios.isCancel(err)) {
          // Check if error is from cancellation
          const error = err as AxiosError<{ error?: string }>; // Proper error typing
          setError({
            message: error.response?.data?.error || "Failed to fetch blog",
            statusCode: error.response?.status,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();

    return () => controller.abort();
  }, [id]);

  return { loading, blog, error };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get<BlogsResponse>(
          `${BACKEND_URL}/api/v1/blog/bulk`,
          {
            headers: getAuthHeader(),
            signal: controller.signal,
          }
        );
        setBlogs(data.blogs);
      } catch (err) {
        if (!axios.isCancel(err)) {
          const error = err as AxiosError<{ error?: string }>;
          setError({
            message: error.response?.data?.error || "Failed to fetch blogs",
            statusCode: error.response?.status,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();

    return () => controller.abort();
  }, []);

  return { loading, blogs, error };
};

interface CreateBlogParams {
  title: string;
  content: string;
}

type OperatedBlog = Pick<Blog, "id">;

export const useCreateBlog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const createBlog = async ({ title, content }: CreateBlogParams) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post<OperatedBlog>(
        `${BACKEND_URL}/api/v1/blog`,
        { title, content },
        { headers: getAuthHeader() }
      );
      return data.id;
    } catch (err) {
      const error = err as AxiosError<{ error?: string }>;
      const apiError: ApiError = {
        message: error.response?.data?.error || "Failed to create blog",
        statusCode: error.response?.status,
      };
      setError(apiError);
      throw apiError; // Re-throwing for component-level handling
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, createBlog };
};

interface UpdateBlogParams extends CreateBlogParams {
  id: string;
}

export const useUpdateBlog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const updateBlog = async ({ id, title, content }: UpdateBlogParams) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.put<OperatedBlog>(
        `${BACKEND_URL}/api/v1/blog/${id}`,
        { title, content },
        { headers: getAuthHeader() }
      );
      return data.id;
    } catch (err) {
      const error = err as AxiosError<{ error?: string }>;
      const apiError: ApiError = {
        message: error.response?.data?.error || "Failed to update blog",
        statusCode: error.response?.status,
      };
      setError(apiError);
      throw apiError;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, updateBlog };
};

export const useDeleteBlog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const deleteBlog = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: getAuthHeader(),
      });
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ error?: string }>;
      const apiError: ApiError = {
        message: error.response?.data?.error || "Failed to delete blog",
        statusCode: error.response?.status,
      };
      setError(apiError);
      throw apiError;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleteBlog };
};

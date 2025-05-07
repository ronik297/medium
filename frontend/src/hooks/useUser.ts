import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  username: string;
  password?: string;
}

type UserResponse = Pick<User, "name" | "username">;

interface ApiError {
  message: string;
  statusCode?: number;
}

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }
  return { Authorization: `Bearer ${token}` };
};

interface AuthInput {
  name?: string;
  username: string;
  password: string;
}

export const useAuthActions = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const authRequest = async (type: "signup" | "signin", inputs: AuthInput) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type}`,
        inputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorObj = {
        message: axiosError.response?.data?.message || "Authentication failed",
        statusCode: axiosError.response?.status,
      };
      setError(errorObj);
    } finally {
      setLoading(false);
    }
  };

  return {
    authRequest,
    loading,
    error,
  };
};

export const useUser = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUser = async () => {
      try {
        const { data } = await axios.get<UserResponse>(
          `${BACKEND_URL}/api/v1/user/me`,
          {
            headers: getAuthHeader(),
            signal: controller.signal,
          }
        );
        setUser(data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          const error = err as AxiosError<{ message?: string }>;
          setError({
            message:
              error.response?.data?.message || "Failed to fetch user profile",
            statusCode: error.response?.status,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    return () => controller.abort();
  }, []);

  return { loading, user, error };
};

interface UpdateUserParams {
  name: string;
  username: string;
  password?: string;
}

interface UpdateUserResponse {
  message: string;
  user: User;
}

export const useUpdateUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [success, setSuccess] = useState(false);

  const updateUser = async (userData: UpdateUserParams) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { data } = await axios.put<UpdateUserResponse>(
        `${BACKEND_URL}/api/v1/user/setting`,
        userData,
        {
          headers: getAuthHeader(),
        }
      );
      setSuccess(true);
      setUser(data.user);
      return data;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const apiError: ApiError = {
        message:
          error.response?.data?.message || "Failed to update user settings",
        statusCode: error.response?.status,
      };
      setError(apiError);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, updateUser, user, success };
};

export const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const navigate = useNavigate();

  const deleteUser = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(`${BACKEND_URL}/api/v1/user/delete`, {
        headers: getAuthHeader(),
      });
      localStorage.removeItem("token");
      navigate("/signin", { replace: true });
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const apiError: ApiError = {
        message:
          error.response?.data?.message || "Failed to delete user account",
        statusCode: error.response?.status,
      };
      setError(apiError);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleteUser };
};

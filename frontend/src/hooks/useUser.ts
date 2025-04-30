import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

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
  return { Authorization: token };
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
      throw apiError;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, updateUser, user, success };
};

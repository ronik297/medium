import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface User {
  name: string;
  username: string;
  password: string;
}

export const useUser = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/user/me`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching user profile " + err);
        setLoading(false);
        console.error(err);
      });
  }, []);

  return { loading, user, error };
};

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [success, setSuccess] = useState(false);

  const updateUser = async (user: User) => {
    setLoading(true);
    try {
      const newUser = await axios.put(
        `${BACKEND_URL}/api/v1/user/setting`,
        user,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setLoading(false);
      setUser(newUser.data);
      setSuccess(true);
      setError(null);
    } catch (err) {
      const error =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Failed to update settings";
      setError(error);
      setLoading(false);
      setSuccess(false);
      console.error(error);
    }
  };

  return { loading, error, updateUser, user, success };
};

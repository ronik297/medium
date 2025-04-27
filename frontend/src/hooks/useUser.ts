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
        setError("Something went wrong!" + err + "Please try again later.");
        setLoading(false);
        console.error(err);
      });
  }, []);

  return { loading, user, error };
};

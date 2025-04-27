import { useEffect, useState } from "react";
import { LabelledInput } from "../components/Auth";
import { useUser } from "../hooks/useUser";
import { Spinner } from "../components/Spinner";
import { Save } from "lucide-react";

export default function Settings() {
  const { user, error, loading } = useUser();

  const [userSettings, setUserSettings] = useState({
    username: "",
    name: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setUserSettings({
        username: user.username,
        name: user.name,
        password: "",
      });
    }
  }, [user]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-20 mx-auto p-8 rounded-lg shadow-2xl text-white w-full max-w-4xl">
      <h1 className="text-3xl font-bold text-black">Settings</h1>
      <p className="text-slate-400">Manage your account settings here.</p>
      <div className="flex flex-col items-center gap-4 w-full mt-4">
        <LabelledInput
          label="Name"
          value={userSettings.name}
          placeholder="Enter your name"
          onChange={(e) =>
            setUserSettings((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <LabelledInput
          label="Username"
          value={userSettings.username}
          placeholder="Enter your username"
          onChange={(e) =>
            setUserSettings((prev) => ({
              ...prev,
              username: e.target.value,
            }))
          }
        />
        <LabelledInput
          label="Password"
          placeholder="Enter your password"
          value={userSettings.password}
          type="password"
          onChange={(e) =>
            setUserSettings((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
        />
      </div>
      <div>
        <button>
          <div className="bg-blue-600 hover:bg-blue-900 flex gap-2 text-white font-bold py-2 px-4 rounded cursor-pointer">
            <Save />
            Save Changes
          </div>
        </button>
      </div>
    </div>
  );
}

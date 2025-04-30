import { useEffect, useState } from "react";
import { LabelledInput } from "../components/Auth";
import { useUpdateUser, useUser } from "../hooks/useUser";
import { Spinner } from "../components/Spinner";
import { Save } from "lucide-react";

export default function Settings() {
  const { user, loading, error } = useUser();
  const {
    user: updatedUser,
    updateUser,
    error: updatedUserError,
    loading: updatedUserLoading,
    success,
  } = useUpdateUser();

  const [userSettings, setUserSettings] = useState({
    username: "",
    name: "",
    password: "",
  });

  useEffect(() => {
    if (updatedUser) {
      setUserSettings({
        username: updatedUser.username,
        name: updatedUser.name,
        password: "",
      });
    } else {
      setUserSettings({
        username: user?.username || "",
        name: user?.name || "",
        password: "",
      });
    }
  }, [user, updatedUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-[calc(100vh-73px)]">
        <Spinner color="#fff" bgColor="#2147ec" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-10 mx-auto p-8 rounded-lg shadow-2xl text-white w-full max-w-4xl">
      <h1 className="text-3xl font-bold text-black">Settings</h1>
      <p className="text-slate-400 text-center">
        Manage your account settings here.
      </p>
      <div className="flex flex-col items-center gap-4 w-full mt-4">
        <LabelledInput
          label="Name"
          value={userSettings.name}
          placeholder="Enter your name"
          disabled={updatedUserLoading}
          onChange={(e) =>
            setUserSettings((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <LabelledInput
          label="Username"
          value={userSettings.username}
          placeholder="Enter your username"
          disabled={updatedUserLoading}
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
          disabled={updatedUserLoading}
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
        <button
          onClick={() => updateUser(userSettings)}
          disabled={updatedUserLoading}
        >
          <div className="bg-blue-700 hover:bg-blue-900 flex gap-2 text-white font-bold py-2 px-4 rounded cursor-pointer">
            {updatedUserLoading ? (
              <Spinner color="#2098e2" bgColor="#7a7785" />
            ) : (
              <Save size={16} />
            )}
            Save Changes
          </div>
        </button>
      </div>
      {success && (
        <p className="text-green-500 text-sm text-center mt-2">
          User settings updated successfully!
        </p>
      )}
      {updatedUserError && (
        <p className="text-red-500 text-sm text-center mt-2">
          {updatedUserError}
        </p>
      )}
      {error && (
        <p className="text-red-500 text-sm text-center mt-2">{error}</p>
      )}
    </div>
  );
}

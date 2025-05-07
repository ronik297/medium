import { useEffect, useState } from "react";
import { LabelledInput } from "../components/Auth";
import { useDeleteUser, useUpdateUser, useUser } from "../hooks/useUser";
import { Spinner } from "../components/Spinner";
import { Save, Trash2 } from "lucide-react";

export default function Settings() {
  const { user, loading, error } = useUser();
  const {
    user: updatedUser,
    updateUser,
    error: updatedUserError,
    loading: updatedUserLoading,
    success,
  } = useUpdateUser();
  const {
    loading: deleteUserLoading,
    error: deleteUserError,
    deleteUser,
  } = useDeleteUser();

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
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-10 mx-auto p-8 rounded-lg shadow-2xl text-white w-[90%] sm:w-full max-w-4xl">
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
      <div className="flex flex-col sm:flex-row p-4 sm:p-0 gap-4 w-full justify-center">
        <button
          onClick={() => updateUser(userSettings)}
          disabled={updatedUserLoading}
          className="w-full inline-flex justify-center items-center gap-2 cursor-pointer px-5 py-2.5 text-sm font-medium text-center text-white  bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg  hover:from-blue-700 hover:to-blue-900 transition-colors "
        >
          {updatedUserLoading ? <Spinner size={16} /> : <Save size={16} />}
          Save Changes
        </button>
        <button
          onClick={() => deleteUser()}
          disabled={deleteUserLoading}
          className="w-full flex justify-center items-center gap-2 cursor-pointer px-5 py-2.5 text-sm font-medium text-center text-white  bg-gradient-to-br from-red-500 to-red-700 rounded-lg  hover:from-red-700 hover:to-red-900 transition-colors"
        >
          {deleteUserLoading ? <Spinner size={16} /> : <Trash2 size={16} />}
          Delete User
        </button>
      </div>
      {success && (
        <p className="text-green-500 text-sm text-center mt-2">
          User settings updated successfully!
        </p>
      )}
      {(updatedUserError || error || deleteUserError) && (
        <p className="text-red-500 text-sm text-center mt-2">
          {updatedUserError?.message || error?.message}
        </p>
      )}
    </div>
  );
}

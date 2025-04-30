import { useState } from "react";
import { Link } from "react-router-dom";
import { SignupInput } from "@__rkg__/medium-common";
import { useAuthActions } from "../hooks/useUser";
import { Spinner } from "./Spinner";

export default function Auth({ type }: { type: "signup" | "signin" }) {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });
  const { authRequest, loading, error } = useAuthActions();

  async function sendRequest() {
    await authRequest(type, postInputs);
  }

  return (
    <div className="h-screen flex justify-center items-center bg-blue-50">
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            {type === "signup" ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-gray-500 mt-2">
            {type === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}
            <Link
              className="ml-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 hover:underline"
              to={type === "signin" ? "/signup" : "/signin"}
            >
              {type === "signin" ? "Sign up" : "Sign in"}
            </Link>
          </p>
        </div>

        <div className="space-y-4">
          {type === "signup" && (
            <LabelledInput
              label="Name"
              placeholder="Enter your name"
              onChange={(e) =>
                setPostInputs({ ...postInputs, name: e.target.value })
              }
            />
          )}

          <LabelledInput
            label="Email"
            placeholder="Enter your email"
            onChange={(e) =>
              setPostInputs({ ...postInputs, username: e.target.value })
            }
          />

          <LabelledInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) =>
              setPostInputs({ ...postInputs, password: e.target.value })
            }
          />

          <button
            onClick={sendRequest}
            disabled={loading}
            className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-medium rounded-lg transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner size={18} />
                Processing...
              </span>
            ) : type === "signin" ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </button>
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">
              {error?.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

interface LabelledInputProps {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  value?: string;
  disabled?: boolean;
}

export function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
  value,
  disabled,
}: LabelledInputProps) {
  return (
    <div className="space-y-1 group">
      <label className="block text-sm font-medium text-gray-700 group-focus-within:text-blue-600 transition-colors duration-200">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        value={value}
        disabled={disabled}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 disabled:bg-gray-100"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

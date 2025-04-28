import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@__rkg__/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function Auth({ type }: { type: "signup" | "signin" }) {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );

      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      alert("Something went wrong! Please try again later.");
      console.error(error);
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="px-10">
          <div className="text-3xl font-bold">Create an account</div>
          <div className="text-slate-400 mt-2">
            {type === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}
            <Link
              className="pl-2 hover:underline"
              to={type === "signin" ? "/signup" : "/signin"}
            >
              {type === "signin" ? "Sign up" : "Sign in"}
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col gap-3 pt-4">
          {type === "signup" && (
            <LabelledInput
              label="Name"
              placeholder="Enter your name"
              onChange={(e) =>
                setPostInputs((postInputs) => ({
                  ...postInputs,
                  name: e.target.value,
                }))
              }
            />
          )}
          <LabelledInput
            label="Username"
            placeholder="Enter your email"
            onChange={(e) =>
              setPostInputs((postInputs) => ({
                ...postInputs,
                username: e.target.value,
              }))
            }
          />
          <LabelledInput
            label="Password"
            placeholder="Enter your password"
            type="password"
            onChange={(e) =>
              setPostInputs((postInputs) => ({
                ...postInputs,
                password: e.target.value,
              }))
            }
          />
          <button
            type="button"
            onClick={sendRequest}
            className="w-full mt-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer
            "
          >
            {type === "signin" ? "Sign In" : "Sign Up"}
          </button>
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
    <div className="w-full flex flex-col gap-1">
      <label className=" text-sm font-semibold text-gray-900">{label}</label>
      <input
        onChange={onChange}
        type={type || "text"}
        value={value}
        disabled={disabled}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

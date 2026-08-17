import axios from "axios";
import React, { useState } from "react";
import { VITE_BACKEND_URL } from "../API/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [currentState, setCurrentState] = useState<"login" | "register">(
    "login"
  );
   const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = currentState === "login";

  const onSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsLoading(true)

    try {
      if (isLogin) {
        // LOGIN
        const { data } = await axios.post(
          `${VITE_BACKEND_URL}/api/user/login`,
          {
            email,
            password,
          }
        );

        if (!data.success) {
          toast.error(data.message);
          return;
        }

        localStorage.setItem("token", data.token);

        toast.success(data.message);

        // Clear form
        setEmail("");
        setPassword("");

        // Go home
         window.location.reload()
        navigate("/");
      } else {
        // REGISTER
        const { data } = await axios.post(
          `${VITE_BACKEND_URL}/api/user/register`,
          {
            name,
            email,
            password,
          }
        );

        if (!data.success) {
          toast.error(data.message);
          return;
        }

        localStorage.setItem("token", data.token);

        toast.success(data.message);

        // Clear form
        setName("");
        setEmail("");
        setPassword("");

        // Go home
         window.location.reload()
        navigate("/");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    } finally{
      setIsLoading(false)
    }
  };

  const switchState = () => {
    setCurrentState(isLogin ? "register" : "login");

    // Clear fields when switching
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      {/* Heading */}
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">
          {isLogin ? "Login" : "Sign Up"}
        </p>

        <hr className="border-none w-8 h-[2px] bg-gray-800" />
      </div>

      {/* Name - Only Register */}
      {!isLogin && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800 outline-none"
          required
        />
      )}

      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800 outline-none"
        required
      />

      {/* Password */}<div className="relative w-full">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full px-3 py-2 pr-10 border border-gray-800 outline-none"
    required
  />

  {password.length > 0 && (
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
    >
      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
    </button>
  )}
</div>

      {/* Links */}
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {isLogin ? (
          <p className="cursor-pointer hover:underline">
            Forgot Your Password?
          </p>
        ) : (
          <span />
        )}

        <p
          onClick={switchState}
          className="cursor-pointer hover:underline"
        >
          {isLogin ? "Create Account" : "Login Here"}
        </p>
      </div>

      {/* Submit Button */}
    <button
  type="submit"
  disabled={isLoading}
  className={`bg-black text-white font-light px-6 py-2 mt-5
    ${
      isLoading
        ? "opacity-50 cursor-not-allowed"
        : "cursor-pointer"
    }`}
>
  {isLoading
    ? "Please wait..."
    : isLogin
    ? "Sign In"
    : "Sign Up"}
</button>
    </form>
  );
};

export default Login;
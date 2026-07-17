import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  Sparkles,
} from "lucide-react";

import {
  loginUser,
  loginWithGoogle,
} from "../services/authService";

import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response =
        await loginUser(formData);

      login(response);

      navigate("/");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (
    credentialResponse
  ) => {
    try {
      setError("");

      const response =
        await loginWithGoogle(
          credentialResponse.credential
        );

      login(response);

      navigate("/");
    } catch (error) {
      console.error(error);

      setError(
        "Google authentication failed."
      );
    }
  };

  return (
  <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-black via-zinc-950 to-red-950 px-4 py-8 transition-colors duration-300 dark:from-black dark:via-zinc-950 dark:to-red-950 light:from-gray-100 light:via-white light:to-red-50">
    {/* Background Glow */}
    <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-red-600/20 blur-[120px]" />
    <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-red-500/10 blur-[140px]" />

    <div className="relative z-10 w-full max-w-md">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-600 to-red-800 text-white shadow-2xl shadow-red-500/30 transition-transform duration-300 hover:scale-105">
          <Sparkles size={28} />
        </div>

        <h1 className="bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
          Welcome Back
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Sign in to continue your journey with{" "}
          <span className="font-semibold text-red-400">
            Web Head AI
          </span>
        </p>
      </div>

      <div className="rounded-3xl border border-red-500/20 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
        {error && (
          <div className="mb-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300 backdrop-blur-lg">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-zinc-700 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-red-500 focus:bg-black/50 focus:ring-4 focus:ring-red-500/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Password
            </label>

            <div className="relative">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-zinc-700 bg-black/30 px-4 py-3 pr-12 text-sm text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-red-500 focus:bg-black/50 focus:ring-4 focus:ring-red-500/20"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (previous) => !previous
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-red-400"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-red-700 via-red-600 to-red-500 py-3 text-sm font-semibold text-white shadow-lg shadow-red-700/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-red-600/50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <LoaderCircle
                size={20}
                className="animate-spin"
              />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="my-7 flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

          <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            OR
          </span>

          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
        </div>

        <div className="flex justify-center overflow-hidden rounded-xl">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() =>
              setError(
                "Google sign-in was unsuccessful."
              )
            }
            theme="filled_black"
            size="large"
            shape="pill"
            text="continue_with"
          />
        </div>

        <p className="mt-7 text-center text-sm text-zinc-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-red-400 transition hover:text-red-300 hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  </div>
);
};

export default LoginPage;
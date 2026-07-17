import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  Sparkles,
} from "lucide-react";

import { registerUser } from "../services/authService";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      await registerUser(formData);

      // Registration successful
      // Send the user to the login page
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);

      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-black via-zinc-950 to-red-950 px-4 py-8 transition-colors duration-300 dark:from-black dark:via-zinc-950 dark:to-red-950 light:from-gray-100 light:via-white light:to-red-50">
    {/* Background Glow */}
    <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-red-600/20 blur-[120px]" />
    <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-red-500/10 blur-[140px]" />

    <div className="relative z-10 w-full max-w-md">
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-700 to-red-500 text-white shadow-2xl shadow-red-500/30 transition-transform duration-300 hover:scale-105">
          <Sparkles size={28} />
        </div>

        <h1 className="bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
          Create Your Account
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Start your AI journey with{" "}
          <span className="font-semibold text-red-400">
            Web Head AI
          </span>
        </p>
      </div>

      {/* Register Card */}
      <div className="rounded-3xl border border-red-500/20 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
        {/* Error */}
        {error && (
          <div className="mb-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300 backdrop-blur-lg">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="w-full rounded-2xl border border-zinc-700 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-red-500 focus:bg-black/50 focus:ring-4 focus:ring-red-500/20"
            />
          </div>

          {/* Email */}
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

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                placeholder="Create a password"
                className="w-full rounded-2xl border border-zinc-700 bg-black/30 px-4 py-3 pr-12 text-sm text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-red-500 focus:bg-black/50 focus:ring-4 focus:ring-red-500/20"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((previous) => !previous)
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

            <p className="mt-2 text-xs text-zinc-500">
              Password must contain at least 6 characters.
            </p>
          </div>

          {/* Submit */}
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
              "Create Account"
            )}
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-red-400 transition hover:text-red-300 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  </div>
);
};

export default RegisterPage;
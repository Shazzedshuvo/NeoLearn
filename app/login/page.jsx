"use client";

import { useContext, useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaSpinner,
  FaUserPlus,
  FaCheckCircle,
  FaExclamationTriangle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import axios from "axios";
import { authDataContext } from "../Contaxtapi/AuthContext";
import { useRouter } from "next/navigation";

// ===== COLORS / THEME =====
const PRIMARY_ACCENT = "#00BCD4"; // Cyan
const SECONDARY_ACCENT = "#14b8a6"; // Emerald
const DARK_BG = "bg-slate-900";
const LIGHT_TEXT = "text-gray-100";
const ERROR_COLOR = "#EF4444";
const SUCCESS_COLOR = "#14b8a6";

export default function LoginPage() {
  const { sarvaUrl } = useContext(authDataContext);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // <-- toggle state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${sarvaUrl}/api/login`,
        { email, password },
        { withCredentials: true }
      );

      setSuccess("Login successful! Redirecting...");

      setTimeout(() => {
        router.push("/dashbord"); // Change to your home/dashboard route
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(to right, #CCE0FF, ${PRIMARY_ACCENT})`,
      }}
    >
      {/* Neon blobs */}
      <div
        className="absolute top-0 left-0 w-80 h-80 rounded-full blur-3xl animate-blob"
        style={{ backgroundColor: PRIMARY_ACCENT, opacity: 0.2 }}
      ></div>
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl animate-blob animation-delay-2000"
        style={{ backgroundColor: SECONDARY_ACCENT, opacity: 0.2 }}
      ></div>

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center relative z-10">
        {/* FORM */}
        <div className="flex items-center justify-center">
          <form
            onSubmit={handleLogin}
            className={`w-full max-w-lg ${DARK_BG} p-10 rounded-2xl shadow-2xl ring-4 ring-cyan-500/50 border border-cyan-700`}
          >
            <h2 className="text-3xl font-extrabold text-center mb-6 text-white">
              Login
            </h2>

            {/* ERROR */}
            {error && (
              <p
                className={`mb-4 text-center font-semibold flex items-center justify-center gap-2`}
                style={{ color: ERROR_COLOR }}
              >
                <FaExclamationTriangle /> {error}
              </p>
            )}

            {/* SUCCESS */}
            {success && (
              <p
                className={`mb-4 text-center font-semibold flex items-center justify-center gap-2`}
                style={{ color: SUCCESS_COLOR }}
              >
                <FaCheckCircle /> {success}
              </p>
            )}

            {/* EMAIL */}
            <div className="relative mb-5">
              <FaEnvelope className="absolute top-4 left-3 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-700 ${LIGHT_TEXT} placeholder-gray-400 outline-none focus:ring-2`}
                style={{ borderColor: PRIMARY_ACCENT }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="relative mb-8">
              <FaLock className="absolute top-4 left-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full pl-10 pr-10 py-3 rounded-xl bg-gray-700 ${LIGHT_TEXT} placeholder-gray-400 outline-none focus:ring-2`}
                style={{ borderColor: PRIMARY_ACCENT }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* Show/hide icon */}
              <div
                className="absolute top-3 right-3 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl text-lg text-white font-bold flex items-center justify-center gap-3 transition-all shadow-xl`}
              style={{
                background: `linear-gradient(to right, ${PRIMARY_ACCENT}, ${SECONDARY_ACCENT})`,
              }}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" /> Logging in...
                </>
              ) : (
                <>
                  <FaSignInAlt /> Login
                </>
              )}
            </button>

            {/* SIGNUP REDIRECT */}
            <p className="text-center text-gray-200 mt-6">
              Don’t have an account?
              <button
                type="button"
                onClick={() => router.push("/signup")}
                className="ml-2 text-cyan-400 font-bold hover:text-emerald-400 flex items-center justify-center gap-1"
              >
                <FaUserPlus /> Sign Up
              </button>
            </p>
          </form>
        </div>

        {/* VIDEO */}
        <div className="hidden md:flex items-center justify-center">
          <div className="w-full max-w-lg h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-cyan-400/70">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
              <source src="/l.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}

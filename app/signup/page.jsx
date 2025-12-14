// SignUpOnly.jsx (ফিক্সড ভার্সন)

"use client";

import { useContext, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaIdBadge,
  FaCheckCircle,
  FaExclamationTriangle,
  FaUserPlus,
  FaSpinner,
  FaGraduationCap,
  FaSignInAlt,
} from "react-icons/fa";
import axios from "axios";
import { authDataContext } from "../Contaxtapi/AuthContext";
import { useRouter } from "next/navigation";

// CSS ভ্যারিয়েবলগুলো স্ট্রিং হিসেবে সংজ্ঞায়িত করা হলো
const PRIMARY_ACCENT = "#00BCD4"; // Cyan-500 equivalent
const SECONDARY_ACCENT = "#14b8a6"; // Emerald-500 equivalent
const DARK_BG = "bg-slate-900";
const LIGHT_TEXT = "text-gray-100";
const ERROR_COLOR = "#EF4444"; // Red-500 equivalent

// 💡 লজিক্যাল উন্নতি: যদি আপনার সার্ভারে 'id' অটো-জেনারেটেড হয়, তবে এটি ইনপুট ক্ষেত্র থেকে বাদ দিতে পারেন।
// আপাতত, ID ইনপুটটি রেখে দেওয়া হলো।

export default function SignUpOnly() {
  const { sarvaUrl } = useContext(authDataContext);
  const router = useRouter();

  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetForm = () => {
    setId("");
    setUsername("");
    setRole("student");
    setEmail("");
    setPassword("");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${sarvaUrl}/api/user/create`,
        { id, username, email, password, role },
        { withCredentials: true }
      );

      setSuccess(response.data.message || "Account created successfully!");
      resetForm();

      // 2 সেকেন্ড পরে Login পেজে রিডিরেক্ট
      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (err) {
      // 💡 উন্নতি: সার্ভার যদি 4xx/5xx স্ট্যাটাস কোড সহ এরর মেসেজ না পাঠায়, 
      // তবে Axios এরর মেসেজ দেখাবে। 
      const errorMessage = err.response?.data?.message || err.message || "Sign up failed. Please check network/server.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Neon background */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-400 opacity-20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-400 opacity-20 rounded-full blur-3xl" />

      {/* Header */}
      <header className="pt-8 pb-6 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Welcome to Our Online Learning Platform
        </h1>
        <p className="mt-2 text-gray-500 text-lg">
          Create your account to get started
        </p>
      </header>

      {/* Content */}
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center relative z-10">
        {/* Form */}
        <div className="flex items-center justify-center p-4">
          <form
            onSubmit={handleSignUp}
            // 💡 ফিক্সড: স্টাইল শিট ডাইনামিক কালার ভ্যারিয়েবলের বদলে সরাসরি Tailwind ক্লাস ব্যবহার করা হলো
            className={`w-full max-w-lg ${DARK_BG} p-10 rounded-2xl shadow-2xl ring-4 ring-cyan-500/50 border border-cyan-700`}
          >
            <h2 className="text-3xl font-extrabold text-center mb-8 text-white">
              Create Account
            </h2>

            {/* Error Message */}
            {error && (
                // 💡 ফিক্সড: ইনলাইন স্টাইল ব্যবহার করা হলো
              <div 
                className="mb-5 p-3 rounded-lg border flex items-center gap-3"
                style={{ backgroundColor: `${ERROR_COLOR}20`, color: ERROR_COLOR, borderColor: ERROR_COLOR }}
              >
                <FaExclamationTriangle /> {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
                // 💡 ফিক্সড: ইনলাইন স্টাইল ব্যবহার করা হলো
              <div 
                className="mb-5 p-3 rounded-lg border flex items-center gap-3"
                style={{ backgroundColor: `${SECONDARY_ACCENT}20`, color: SECONDARY_ACCENT, borderColor: SECONDARY_ACCENT }}
              >
                <FaCheckCircle /> {success}
              </div>
            )}

            {/* ID */}
            <div className="relative mb-5">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaIdBadge className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="User ID"
                // 💡 ফিক্সড: focus:ring-[${PRIMARY_ACCENT}] এর বদলে focus:ring-cyan-500 ব্যবহার করা হলো
                className={`w-full pl-10 pr-4 py-3 border border-gray-700 rounded-xl bg-gray-700 ${LIGHT_TEXT} placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 outline-none`}
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </div>

            {/* Username */}
            <div className="relative mb-5">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Username"
                className={`w-full pl-10 pr-4 py-3 border border-gray-700 rounded-xl bg-gray-700 ${LIGHT_TEXT} placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 outline-none`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Role */}
            <div className="relative mb-5">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaGraduationCap className="text-gray-400" />
              </div>
              <select
                className={`w-full pl-10 pr-4 py-3 border border-gray-700 rounded-xl bg-gray-700 ${LIGHT_TEXT} focus:ring-2 focus:ring-cyan-500 outline-none`}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Email */}
            <div className="relative mb-5">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Email address"
                className={`w-full pl-10 pr-4 py-3 border border-gray-700 rounded-xl bg-gray-700 ${LIGHT_TEXT} placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 outline-none`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Password"
                className={`w-full pl-10 pr-4 py-3 border border-gray-700 rounded-xl bg-gray-700 ${LIGHT_TEXT} placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 outline-none`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* SignUp Button */}
            <button
              type="submit"
              disabled={loading}
              // 💡 ফিক্সড: ইনলাইন স্টাইল ব্যবহার করা হলো
              className={`w-full py-4 rounded-xl text-lg text-white font-bold flex items-center justify-center gap-3 transition-all shadow-xl ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "hover:shadow-cyan-400/50 hover:scale-[1.01]"
              }`}
              style={{
                background: `linear-gradient(to right, ${PRIMARY_ACCENT}, ${SECONDARY_ACCENT})`,
              }}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" /> Creating account...
                </>
              ) : (
                <>
                  <FaUserPlus /> Sign Up
                </>
              )}
            </button>

            {/* Login Redirect */}
            <p className="text-center text-gray-400 mt-6">
              Already have an account?
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="ml-2 text-cyan-400 font-bold hover:text-emerald-400 flex items-center justify-center gap-1"
              >
                <FaSignInAlt /> Login
              </button>
            </p>
          </form>
        </div>

        {/* Video */}
        <div className="hidden md:flex items-center justify-center p-4">
          <div className="w-full max-w-lg h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-cyan-400/70">
            {/* 💡 নোট: ভিডিও ট্যাগটি /public ফোল্ডারে 'l.mp4' ফাইল খুঁজছে */}
            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
              <source src="/l.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
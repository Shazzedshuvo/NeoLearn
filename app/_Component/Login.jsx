"use client";

import React, { useContext, useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSignInAlt,
  FaSpinner,
  FaArrowRight, // Forgot Password এর জন্য নতুন আইকন
} from "react-icons/fa";
import axios from "axios";
// আপনার Contxtapi এর সঠিক পাথ ব্যবহার করুন
import { authDataContext } from "../Contaxtapi/AuthContext"; 

// ===== SAME THEME (Constants) =====
const PRIMARY_ACCENT = "#00BCD4"; // Cyan
const SECONDARY_ACCENT = "#14b8a6"; // Emerald
const DARK_BG = "bg-slate-900";
const LIGHT_TEXT = "text-gray-100";
const ERROR_COLOR = "#EF4444";

export const Login = () => {
  const { sarvaUrl } = useContext(authDataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // লগইন API কল
      const response = await axios.post(
        `${sarvaUrl}/api/user/login`,
        { email, password },
        { withCredentials: true }
      );

      setSuccess(response.data.message || "Login successful! Redirecting...");
      setEmail("");
      setPassword("");
      // সফল লগইনের পর ইউজারকে ড্যাশবোর্ডে রিডাইরেক্ট করার কোড এখানে যুক্ত করুন
      // যেমন: router.push('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    // LIGHT BACKGROUND WITH NEON SHADOW EFFECT
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Neon Background Glow - Added transition for better visual quality */}
      <style jsx global>{`
        @keyframes subtle-glow {
            0%, 100% { transform: scale(1.0); }
            50% { transform: scale(1.05); }
        }
        .animate-subtle-glow { animation: subtle-glow 8s ease-in-out infinite; }
      `}</style>

      <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-400 opacity-20 rounded-full blur-3xl animate-subtle-glow" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-400 opacity-20 rounded-full blur-3xl animate-subtle-glow animation-delay-2000" />

      {/* HEADER */}
      <header className="pt-8 pb-6 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Welcome Back
        </h1>
        <p className="mt-2 text-gray-500 text-lg">
          Login to continue your learning journey
        </p>
      </header>

      {/* CONTENT GRID */}
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center relative z-10">
        
        {/* FORM SIDE */}
        <div className="flex items-center justify-center p-4">
          <form
            onSubmit={handleLogin}
            // Neon Ring এবং Shadow সহ ডার্ক কার্ড
            className={`w-full max-w-lg ${DARK_BG} p-10 rounded-2xl shadow-2xl ring-4 ring-cyan-500/50 border border-cyan-700 transition-all duration-300 backdrop-blur-sm`}
          >
            <h2 className="text-3xl font-extrabold text-center mb-8 text-white/95">
              System Access
            </h2>

            {/* Error Notification */}
            {error && (
              <div
                className={`mb-5 p-3 rounded-lg bg-[${ERROR_COLOR}]/20 text-[${ERROR_COLOR}] border border-[${ERROR_COLOR}] flex items-center gap-3`}
              >
                <FaExclamationTriangle className="text-xl" /> {error}
              </div>
            )}

            {/* Success Notification */}
            {success && (
              <div
                className={`mb-5 p-3 rounded-lg bg-[${SECONDARY_ACCENT}]/20 text-[${SECONDARY_ACCENT}] border border-[${SECONDARY_ACCENT}] flex items-center gap-3`}
              >
                <FaCheckCircle className="text-xl" /> {success}
              </div>
            )}

            {/* Email Input */}
            <div className="relative mb-5">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Email address"
                className={`w-full pl-10 pr-4 py-3 border border-gray-700 rounded-xl bg-gray-700 ${LIGHT_TEXT} placeholder-gray-500 focus:ring-2 focus:ring-[${PRIMARY_ACCENT}] focus:border-transparent outline-none transition-colors`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative mb-4"> 
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Password"
                className={`w-full pl-10 pr-4 py-3 border border-gray-700 rounded-xl bg-gray-700 ${LIGHT_TEXT} placeholder-gray-500 focus:ring-2 focus:ring-[${PRIMARY_ACCENT}] focus:border-transparent outline-none transition-colors`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {/* Forgot Password Link - Added for completeness */}
            <div className="text-right mb-8">
                <a 
                    href="/forgot-password" 
                    className={`text-sm font-medium text-[${PRIMARY_ACCENT}] hover:text-[${SECONDARY_ACCENT}] transition-colors flex items-center justify-end`}
                >
                    Forgot Password? <FaArrowRight className="ml-1 text-xs" />
                </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl text-lg text-white font-bold flex items-center justify-center gap-3 transition-all shadow-xl ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : `bg-gradient-to-r from-[${PRIMARY_ACCENT}] to-[${SECONDARY_ACCENT}] hover:from-[${SECONDARY_ACCENT}] hover:to-[${PRIMARY_ACCENT}] active:scale-[0.99]`
              }`}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" /> Authorizing...
                </>
              ) : (
                <>
                  <FaSignInAlt /> Login to Dashboard
                </>
              )}
            </button>

            {/* Link to Sign Up Page */}
             <div className="text-center mt-6 text-gray-400">
                New user? 
                <a 
                    href="/signup" 
                    className={`ml-1 text-[${SECONDARY_ACCENT}] font-extrabold hover:text-[${PRIMARY_ACCENT}] transition-colors`}
                >
                    Create Account
                </a>
            </div>

          </form>
        </div>

        {/* VISUAL / VIDEO SIDE */}
        <div className="hidden md:flex items-center justify-center p-4">
          <div className="w-full max-w-lg h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-cyan-400/70 transform rotate-y-3 scale-105 transition-transform duration-500 perspective-1000">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/l.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};
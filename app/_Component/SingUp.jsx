// "use client";

// import { useContext, useState } from "react";
// import {
//   FaUser,
//   FaEnvelope,
//   FaLock,
//   FaIdBadge,
//   FaCheckCircle,
//   FaExclamationTriangle,
//   FaUserPlus,
//   FaSpinner,
//   FaGraduationCap,
// } from "react-icons/fa";
// import axios from "axios";
// import { authDataContext } from "../Contaxtapi/AuthContext";

// // ===== SAME THEME / COLORS =====
// const PRIMARY_ACCENT = "#00BCD4"; // Cyan
// const SECONDARY_ACCENT = "#14b8a6"; // Emerald
// const DARK_BG = "bg-slate-900";
// const LIGHT_TEXT = "text-gray-100";
// const ERROR_COLOR = "#EF4444";

// export default function SignUpOnly() {
//   const { sarvaUrl } = useContext(authDataContext);

//   const [id, setId] = useState("");
//   const [username, setUsername] = useState("");
//   const [role, setRole] = useState("student");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const resetForm = () => {
//     setId("");
//     setUsername("");
//     setRole("student");
//     setEmail("");
//     setPassword("");
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       await axios.post(
//         `${sarvaUrl}/api/user/create`,
//         { id, username, email, password, role },
//         { withCredentials: true }
//       );

//       setSuccess("Account created successfully!");
//       resetForm();
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           "Sign up failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
//       {/* Neon background blobs */}
//       <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-400 opacity-20 rounded-full blur-3xl" />
//       <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-400 opacity-20 rounded-full blur-3xl" />

//       {/* HEADER */}
//       <header className="pt-8 pb-6 text-center relative z-10">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
//           Welcome to Our Online Learning Platform
//         </h1>
//         <p className="mt-2 text-gray-500 text-lg">
//           Create your account to get started
//         </p>
//       </header>

//       {/* CONTENT */}
//       <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center relative z-10">
//         {/* FORM */}
//         <div className="flex items-center justify-center p-4">
//           <form
//             onSubmit={handleSignUp}
//             className={`w-full max-w-lg ${DARK_BG} p-10 rounded-2xl shadow-2xl ring-4 ring-cyan-500/50 border border-cyan-700`}
//           >
//             <h2 className="text-3xl font-extrabold text-center mb-8 text-white">
//               Create Account
//             </h2>

//             {/* Error */}
//             {error && (
//               <div className={`mb-5 p-3 rounded-lg bg-[${ERROR_COLOR}]/20 text-[${ERROR_COLOR}] border border-[${ERROR_COLOR}] flex items-center gap-3`}>
//                 <FaExclamationTriangle /> {error}
//               </div>
//             )}

//             {/* Success */}
//             {success && (
//               <div className={`mb-5 p-3 rounded-lg bg-[${SECONDARY_ACCENT}]/20 text-[${SECONDARY_ACCENT}] border border-[${SECONDARY_ACCENT}] flex items-center gap-3`}>
//                 <FaCheckCircle /> {success}
//               </div>
//             )}

//             {/* ID */}
//             <div className="relative mb-5">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <FaIdBadge className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="User ID"
//                 className={`w-full pl-10 pr-4 py-3 border border-gray-700 rounded-xl bg-gray-700 ${LIGHT_TEXT} placeholder-gray-500 focus:ring-2 focus:ring-[${PRIMARY_ACCENT}] outline-none`}
//                 value={id}
//                 onChange={(e) => setId(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Username */}
//             <div className="relative mb-5">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <FaUser className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Username"
//                 className={`w-full pl-10 pr-4 py-3 border border-gray-700 rounded-xl bg-gray-700 ${LIGHT_TEXT} placeholder-gray-500 focus:ring-2 focus:ring-[${PRIMARY_ACCENT}] outline-none`}
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Role */}
//             <div className="relative mb-5">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <FaGraduationCap className="text-gray-400" />
//               </div>
//               <select
//                 className={`w-full pl-10 pr-4 py-3 border border-gray-700 rounded-xl bg-gray-700 ${LIGHT_TEXT} focus:ring-2 focus:ring-[${PRIMARY_ACCENT}] outline-none`}
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//               >
//                 <option value="student">Student</option>
//                 <option value="mentor">Mentor</option>
//                 <option value="admin">Admin</option>
//               </select>
//             </div>

//             {/* Email */}
//             <div className="relative mb-5">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <FaEnvelope className="text-gray-400" />
//               </div>
//               <input
//                 type="email"
//                 placeholder="Email address"
//                 className={`w-full pl-10 pr-4 py-3 border border-gray-700 rounded-xl bg-gray-700 ${LIGHT_TEXT} placeholder-gray-500 focus:ring-2 focus:ring-[${PRIMARY_ACCENT}] outline-none`}
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div className="relative mb-8">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <FaLock className="text-gray-400" />
//               </div>
//               <input
//                 type="password"
//                 placeholder="Password"
//                 className={`w-full pl-10 pr-4 py-3 border border-gray-700 rounded-xl bg-gray-700 ${LIGHT_TEXT} placeholder-gray-500 focus:ring-2 focus:ring-[${PRIMARY_ACCENT}] outline-none`}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-4 rounded-xl text-lg text-white font-bold flex items-center justify-center gap-3 transition-all shadow-xl ${
//                 loading
//                   ? "bg-gray-600 cursor-not-allowed"
//                   : `bg-gradient-to-r from-[${PRIMARY_ACCENT}] to-[${SECONDARY_ACCENT}] hover:from-[${SECONDARY_ACCENT}] hover:to-[${PRIMARY_ACCENT}]`
//               }`}
//             >
//               {loading ? (
//                 <>
//                   <FaSpinner className="animate-spin" /> Creating account...
//                 </>
//               ) : (
//                 <>
//                   <FaUserPlus /> Sign Up
//                 </>
//               )}
//             </button>
//           </form>
//         </div>

//         {/* VIDEO */}
//         <div className="hidden md:flex items-center justify-center p-4">
//           <div className="w-full max-w-lg h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-cyan-400/70">
//             <video autoPlay loop muted playsInline className="w-full h-full object-cover">
//               <source src="/l.mp4" type="video/mp4" />
//             </video>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

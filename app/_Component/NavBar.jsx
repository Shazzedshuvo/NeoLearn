// src/components/NavBar.jsx
"use client";

import React, { useState, useContext } from 'react';
// authDataContext ব্যবহার করার জন্য import করা হলো
import { authDataContext } from "../Contaxtapi/AuthContext"; 

import { 
    FaBookOpen, FaCalendarAlt, FaUserGraduate, FaCode, FaBars, FaTimes, 
    FaSignInAlt, FaUserPlus, FaUserCircle, FaTachometerAlt, FaSignOutAlt 
} from 'react-icons/fa';
import { useRouter } from "next/navigation";

// ===== CONSTANTS =====
const PRIMARY_ACCENT = "#00BCD4"; // Cyan/Teal
const SECONDARY_ACCENT = "#14b8a6"; // Emerald
const DARK_BG = "bg-slate-900"; 
const LIGHT_TEXT = "text-gray-100";
const HOVER_BG = "hover:bg-gray-700/50";
const ACTIVE_RING = `focus:ring-[${PRIMARY_ACCENT}]`;

// নেভিগেশন লিংক ডেটা
const navLinks = [
    { name: 'Home', href: '/appa/', icon: FaBookOpen },
    { name: 'Courses', href: '/appa/courses', icon: FaCode },
    { name: 'Events', href: '/appa/events', icon: FaCalendarAlt },
    { name: 'Mentors', href: '/appa/mentors', icon: FaUserGraduate },
];

// --- Profile Dropdown Component ---

const ProfileDropdown = ({ userName, handleLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div className="relative z-50">
            {/* প্রোফাইল আইকন/বাটন */}
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center p-2 rounded-full ${LIGHT_TEXT} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${ACTIVE_RING} transition-colors duration-200 ${HOVER_BG}`}
                aria-expanded={isDropdownOpen}
            >
                <FaUserCircle className="h-8 w-8 text-cyan-400" />
            </button>

            {/* ড্রপডাউন মেনু */}
            {isDropdownOpen && (
                <div 
                    className={`absolute right-0 mt-2 w-48 rounded-md shadow-2xl ${DARK_BG} border border-cyan-800/50 py-1 transition-opacity duration-300`}
                    role="menu"
                    aria-orientation="vertical"
                >
                    {/* ইউজার নাম */}
                    <div className="px-4 py-2 text-sm text-white border-b border-gray-700/50 font-semibold">
                        {userName || "My Account"}
                    </div>

                    {/* ড্যাশবোর্ড লিঙ্ক */}

                    <a
                        href="/admin"
                        className={`flex items-center px-4 py-2 text-sm ${LIGHT_TEXT} hover:text-[${PRIMARY_ACCENT}] ${HOVER_BG}`}
                        role="menuitem"
                    >
                        <FaTachometerAlt className="mr-3" /> Admin Dashboard
                    </a>
                    {/* লগ আউট বাটন */}
                    <button
                        onClick={handleLogout}
                        className={`flex items-center w-full text-left px-4 py-2 text-sm text-red-400 ${HOVER_BG} border-t border-gray-700/50`}
                        role="menuitem"
                    >
                        <FaSignOutAlt className="mr-3" /> Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};


// --- Main NavBar Component ---

export const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter(); 
    
    // AuthContext থেকে লগইন স্ট্যাটাস এবং লগআউট ফাংশন নিয়ে আসা হলো
    const { user, loading: authLoading, logout } = useContext(authDataContext);

    // লগইন স্ট্যাটাস চেক
    const isLoggedIn = !!user; // যদি user অবজেক্ট থাকে, তবে লগইন করা আছে

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        // AuthContext এর logout ফাংশন কল করা
        logout(); 
        router.push("/login"); // লগআউটের পর লগইন পেজে রিডিরেক্ট
    };

    // যদি AuthContext থেকে ডেটা লোড হয়, তবে স্পিনার বা নেভিগেশন লুকিয়ে রাখা যেতে পারে
    if (authLoading) {
        return null; // অথবা একটি Loading state দেখান
    }

    return (
        <nav className={`sticky top-0 z-50 ${DARK_BG} bg-opacity-90 backdrop-blur-md shadow-lg border-b border-cyan-800/50`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    {/* লোগো/ব্র্যান্ড নাম */}
                    <div className="flex-shrink-0">
                        <a href="/" className="flex items-center text-2xl font-extrabold tracking-wider">
                            <span className={`text-[${PRIMARY_ACCENT}] drop-shadow-md`}>Neo</span>
                            <span className="text-white">Learn</span>
                        </a>
                    </div>

                    {/* ডেস্কটপ নেভিগেশন লিংক */}
                    <div className="hidden md:flex flex-1 justify-center">
                        <div className="flex items-baseline space-x-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-gray-300 hover:text-white ${HOVER_BG} ${ACTIVE_RING}`}
                                >
                                    <link.icon className="mr-2" />
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* অথেন্টিকেশন বাটন/প্রোফাইল (ডেস্কটপ) */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isLoggedIn ? (
                            // লগইন করা থাকলে ProfileDropdown দেখাবে
                            <ProfileDropdown userName={user?.name || "User"} handleLogout={handleLogout} />
                        ) : (
                            // লগইন করা না থাকলে Login এবং Sign Up দেখাবে
                            <>
                                <a 
                                    href="/login" 
                                    className={`px-4 py-2 rounded-full text-sm font-medium ${LIGHT_TEXT} transition-all duration-200 border border-gray-600 hover:border-[${PRIMARY_ACCENT}] hover:bg-gray-700`}
                                >
                                    <FaSignInAlt className="inline mr-1" /> Login
                                </a>
                                <a 
                                    href="/signup" 
                                    className={`px-4 py-2 rounded-full text-sm font-bold text-white transition-all duration-200 bg-gradient-to-r from-[${PRIMARY_ACCENT}] to-[${SECONDARY_ACCENT}] hover:from-[${SECONDARY_ACCENT}] hover:to-[${PRIMARY_ACCENT}]`}
                                >
                                    <FaUserPlus className="inline mr-1" /> Sign Up
                                </a>
                            </>
                        )}
                    </div>

                    {/* মোবাইল মেনু বাটন */}
                    <div className="md:hidden">
                        {/* ... (মোবাইল মেনু বাটন লজিক) ... */}
                        <button
                            onClick={toggleMenu}
                            className={`inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset ${ACTIVE_RING}`}
                        >
                            {isOpen ? <FaTimes className="block h-6 w-6" /> : <FaBars className="block h-6 w-6" />}
                        </button>
                    </div>

                </div>
            </div>

            {/* মোবাইল মেনু (Dropdown) */}
            {isOpen && (
                <div className="md:hidden border-t border-gray-700/50">
                    {/* ... (মোবাইল নেভিগেশন লিংকস) ... */}
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 text-gray-300 hover:text-white ${HOVER_BG}`}
                            >
                                <link.icon className="mr-3" />
                                {link.name}
                            </a>
                        ))}
                    </div>
                    {/* মোবাইল অথেন্টিকেশন বাটনস */}
                    <div className="pt-4 pb-3 border-t border-gray-700/50 flex flex-col space-y-2 px-4">
                        {isLoggedIn ? (
                            <>
                                {/* লগইন করা থাকলে */}
                                <a 
                                    href="/dashboard" 
                                    className={`flex items-center justify-center w-full px-3 py-2 rounded-md text-base font-medium ${LIGHT_TEXT} border border-gray-600 hover:border-[${PRIMARY_ACCENT}] ${HOVER_BG}`}
                                >
                                    <FaTachometerAlt className="mr-2" /> Dashboard
                                </a>
                                <button 
                                    onClick={handleLogout}
                                    className={`flex items-center justify-center w-full px-3 py-2 rounded-md text-base font-medium text-red-400 border border-gray-600 hover:bg-red-900/30`}
                                >
                                    <FaSignOutAlt className="mr-2" /> Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                {/* লগইন করা না থাকলে */}
                                <a 
                                    href="/login" 
                                    className={`flex items-center justify-center w-full px-3 py-2 rounded-md text-base font-medium ${LIGHT_TEXT} border border-gray-600 hover:border-[${PRIMARY_ACCENT}] ${HOVER_BG}`}
                                >
                                    <FaSignInAlt className="mr-2" /> Login
                                </a>
                                <a 
                                    href="/signup" 
                                    className={`flex items-center justify-center w-full px-3 py-2 rounded-md text-base font-bold text-white bg-gradient-to-r from-[${PRIMARY_ACCENT}] to-[${SECONDARY_ACCENT}] hover:from-[${SECONDARY_ACCENT}] hover:to-[${PRIMARY_ACCENT}]`}
                                >
                                    <FaUserPlus className="mr-2" /> Sign Up
                                </a>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};
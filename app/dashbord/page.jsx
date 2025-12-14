// /app/dashboard/page.jsx
"use client";

import React from 'react';
import { 
    FaHome, FaCode, FaGraduationCap, FaCalendarAlt, FaUserCircle, 
    FaChartLine, FaBell, FaSignOutAlt, FaBook, FaCheckCircle, FaSpinner, FaArrowRight,
    // সমাধান: FaUserGraduate আইকনটি যুক্ত করা হলো
    FaUserGraduate 
} from 'react-icons/fa';

// ===== SAME THEME CONSTANTS =====
const PRIMARY_ACCENT = "#00BCD4"; // Cyan
const SECONDARY_ACCENT = "#14b8a6"; // Emerald
const DARK_BG = "bg-slate-900"; 
const LIGHT_TEXT = "text-gray-100";
const SIDEBAR_BG = "bg-gray-950";
const CARD_BG = "bg-gray-800";
const BORDER_COLOR = "border-gray-700"; 

// ডামি ডেটা
const user = { 
    name: "John Doe", 
    role: "Student", 
    progress: 75,
    notifications: 3 
};

const dashboardLinks = [
    { name: 'Dashboard', href: '#', icon: FaHome },
    { name: 'My Courses', href: '#', icon: FaBook },
    { name: 'Enrollments', href: '#', icon: FaCode },
    { name: 'Mentors', href: '#', icon: FaUserGraduate }, // এখানে এটি ব্যবহার করা হয়েছিল
    { name: 'Events', href: '#', icon: FaCalendarAlt },
];

const progressCards = [
    { title: "Courses Enrolled", value: 8, icon: FaBook, color: 'text-cyan-400' },
    { title: "Completed Modules", value: 45, icon: FaCheckCircle, color: 'text-emerald-400' },
    { title: "Certificates Earned", value: 3, icon: FaGraduationCap, color: 'text-indigo-400' },
    { title: "Hours Spent", value: 120, icon: FaChartLine, color: 'text-red-400' },
];

const recentCourses = [
    { title: "Advanced React Hooks", progress: 85 },
    { title: "Python Data Science Basics", progress: 60 },
    { title: "Network Security Fundamentals", progress: 20 },
];

// --- Sub-Components ---

// প্রোগ্রেস কার্ড কম্পোনেন্ট
const ProgressCard = ({ title, value, icon: Icon, color }) => (
    <div className={`${CARD_BG} p-6 rounded-xl shadow-xl border ${BORDER_COLOR} transition-transform duration-300 hover:scale-[1.02] hover:border-[${PRIMARY_ACCENT}]/50`}>
        <div className="flex items-center justify-between mb-3">
            <Icon className={`text-4xl ${color}`} />
            <span className="text-3xl font-bold text-white">{value}</span>
        </div>
        <p className={`${LIGHT_TEXT} text-sm`}>{title}</p>
    </div>
);

// কোর্স প্রোগ্রেস বার কম্পোনেন্ট
const CourseProgress = ({ title, progress }) => (
    <div className={`mb-4 p-4 rounded-lg border ${BORDER_COLOR} ${CARD_BG} transition-shadow duration-300 hover:shadow-lg`}>
        <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-white">{title}</h4>
            <span className={`text-sm font-bold text-[${SECONDARY_ACCENT}]`}>{progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
                className="h-2.5 rounded-full" 
                style={{ 
                    width: `${progress}%`,
                    // নিয়ন গ্রাডিয়েন্ট প্রোগ্রেস বার
                    background: `linear-gradient(to right, ${PRIMARY_ACCENT}, ${SECONDARY_ACCENT})`
                }}
            ></div>
        </div>
    </div>
);


export default function Dashboard() {
    return (
        <div className="flex min-h-screen">
            
            {/* ১. সাইডবার নেভিগেশন */}
            <aside className={`w-64 ${SIDEBAR_BG} p-6 border-r ${BORDER_COLOR} shadow-2xl sticky top-0 h-screen hidden md:block`}>
                <div className="mb-10">
                    <h2 className={`text-3xl font-extrabold tracking-wider`}>
                         <span className={`text-[${PRIMARY_ACCENT}]`}>Neo</span>
                         <span className="text-white">Learn</span>
                    </h2>
                </div>
                
                {/* নেভিগেশন লিঙ্কস */}
                <nav className="space-y-2">
                    {dashboardLinks.map(link => (
                        <a 
                            key={link.name}
                            href={link.href}
                            className={`flex items-center p-3 rounded-xl transition-colors duration-200 
                                ${link.name === 'Dashboard' 
                                    ? `bg-[${PRIMARY_ACCENT}] text-gray-900 font-bold shadow-lg` 
                                    : `text-gray-300 hover:bg-gray-800 hover:text-[${PRIMARY_ACCENT}]`}
                            `}
                        >
                            <link.icon className="mr-3" />
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* লগ আউট বাটন */}
                <div className="absolute bottom-6 left-6 right-6">
                    <button className={`w-full flex items-center justify-center p-3 rounded-xl font-medium 
                        text-red-400 bg-gray-800 hover:bg-red-900/40 transition-colors border ${BORDER_COLOR}`}
                    >
                        <FaSignOutAlt className="mr-3" /> Log Out
                    </button>
                </div>
            </aside>

            {/* ২. মূল কন্টেন্ট এরিয়া */}
            <main className={`flex-1 ${DARK_BG} p-6 md:p-10`}>
                
                {/* ড্যাশবোর্ড হেডার */}
                <header className={`flex justify-between items-center pb-6 border-b ${BORDER_COLOR} mb-8`}>
                    <h1 className="text-3xl font-bold text-white">
                        Hello, {user.name}!
                    </h1>
                    <div className="flex items-center space-x-4">
                        
                        {/* নোটিফিকেশন আইকন */}
                        <div className="relative">
                            <FaBell className={`text-2xl text-gray-400 hover:text-[${PRIMARY_ACCENT}] cursor-pointer transition-colors`} />
                            {user.notifications > 0 && (
                                <span className={`absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-gray-900 bg-red-500`}></span>
                            )}
                        </div>
                        
                        {/* ইউজার প্রোফাইল */}
                        <FaUserCircle className={`text-3xl text-[${SECONDARY_ACCENT}]`} />
                    </div>
                </header>

                {/* ৩. স্ট্যাটাস কার্ডস */}
                <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    {progressCards.map((card, index) => (
                        <ProgressCard key={index} {...card} />
                    ))}
                </section>

                {/* ৪. মেইন প্রোগ্রেস এবং টাস্কস */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* কলাম ১: ইউজার প্রোগ্রেস ওভারভিউ */}
                    <div className="lg:col-span-2">
                        <h2 className={`text-2xl font-semibold mb-6 text-white border-b ${BORDER_COLOR} pb-2`}>
                            My Learning Journey
                        </h2>
                        
                        {/* টোটাল প্রোগ্রেস বার */}
                        <div className={`${CARD_BG} p-6 rounded-xl shadow-xl mb-8 border ${BORDER_COLOR}`}>
                            <h3 className="text-xl font-bold mb-3 text-white">Overall Progress</h3>
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-gray-400">Total Progress Across All Courses</p>
                                <span className={`text-2xl font-extrabold text-[${PRIMARY_ACCENT}]`}>{user.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-4">
                                <div 
                                    className="h-4 rounded-full shadow-lg" 
                                    style={{ 
                                        width: `${user.progress}%`,
                                        background: `linear-gradient(to right, ${PRIMARY_ACCENT}, ${SECONDARY_ACCENT})`
                                    }}
                                ></div>
                            </div>
                        </div>

                        {/* রিসেন্ট কোর্স */}
                        <h2 className={`text-2xl font-semibold mb-6 text-white border-b ${BORDER_COLOR} pb-2`}>
                            Continue Learning
                        </h2>
                        <div className="space-y-4">
                            {recentCourses.map((course, index) => (
                                <CourseProgress key={index} {...course} />
                            ))}
                        </div>
                    </div>

                    {/* কলাম ২: অ্যাকশন কার্ড (গুরুত্বপূর্ণ CTA) */}
                    <div className="lg:col-span-1">
                        <h2 className={`text-2xl font-semibold mb-6 text-white border-b ${BORDER_COLOR} pb-2`}>
                            Quick Actions
                        </h2>
                        
                        {/* সার্টিফিকেট অ্যাকশন কার্ড */}
                        <div className={`${CARD_BG} p-6 rounded-xl shadow-xl border-t-4 border-[${SECONDARY_ACCENT}] transition-transform duration-300 hover:ring-2 hover:ring-[${SECONDARY_ACCENT}]/50 mb-6`}>
                            <FaGraduationCap className={`text-4xl text-[${SECONDARY_ACCENT}] mb-3`} />
                            <h3 className="text-xl font-bold mb-2 text-white">View Certificates</h3>
                            <p className="text-gray-400 text-sm mb-4">
                                Download your earned certificates and share them with the world.
                            </p>
                            <button className={`flex items-center font-bold text-[${PRIMARY_ACCENT}] hover:text-white transition-colors`}>
                                Go to Vault <FaArrowRight className="ml-2 text-sm" />
                            </button>
                        </div>
                        
                        {/* নতুন কোর্স অ্যাকশন কার্ড */}
                        <div className={`${CARD_BG} p-6 rounded-xl shadow-xl border-t-4 border-[${PRIMARY_ACCENT}] transition-transform duration-300 hover:ring-2 hover:ring-[${PRIMARY_ACCENT}]/50`}>
                            <FaBook className={`text-4xl text-[${PRIMARY_ACCENT}] mb-3`} />
                            <h3 className="text-xl font-bold mb-2 text-white">Find New Courses</h3>
                            <p className="text-gray-400 text-sm mb-4">
                                Explore hundreds of new courses added this week to expand your skills.
                            </p>
                            <button className={`flex items-center font-bold text-[${SECONDARY_ACCENT}] hover:text-white transition-colors`}>
                                Browse Catalogue <FaArrowRight className="ml-2 text-sm" />
                            </button>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
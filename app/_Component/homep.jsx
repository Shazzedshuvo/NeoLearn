// ./app/_Component/homep.jsx

"use client";

import Link from 'next/link';
import React from 'react';
import { FaBookOpen, FaCode, FaCertificate, FaArrowRight, FaUsers, FaLaptopCode, FaStar } from 'react-icons/fa';


// !!! --- ত্রুটি সৃষ্টিকারী লাইনটি মুছে দেওয়া হয়েছে --- !!!
// import { PRIMARY_ACCENT, SECONDARY_ACCENT, DARK_BG, LIGHT_TEXT } from './auth/AuthLayout'; 

// !!! --- রঙের ভেরিয়েবলগুলি এখানে সরাসরি সংজ্ঞায়িত করা হলো --- !!!
const PRIMARY_ACCENT = "#00BCD4"; // Cyan/Teal
const SECONDARY_ACCENT = "#14b8a6"; // Emerald
const DARK_BG = "bg-slate-900"; 
const LIGHT_TEXT = "text-gray-100";


// --- ডামি ডেটা (আপনার কোর্সের তথ্য) ---
const featuredCourses = [
    { 
        icon: FaCode, 
        title: "Advanced React & Next.js", 
        description: "Modern web development with server-side rendering and full-stack architecture.", 
        color: 'text-cyan-400' 
    },
    { 
        icon: FaLaptopCode, 
        title: "AI/ML Fundamentals (Python)", 
        description: "Introduction to Machine Learning, data science, and practical projects using Python.", 
        color: 'text-emerald-400' 
    },
    { 
        icon: FaCertificate, 
        title: "Cyber Security Essentials", 
        description: "Learn ethical hacking, network defense, and system security fundamentals.", 
        color: 'text-indigo-400' 
    },
];

export const LearningHomePage = () => { // আপনার পূর্বের homep ফাংশনটিকে LearningHomePage নাম দিলাম
    return (
        // পুরো পেজের ব্যাকগ্রাউন্ড ডার্ক/ব্ল্যাক থিম
        <div className={`min-h-screen bg-gray-900 ${LIGHT_TEXT} font-sans`}>
            
            {/* 1. HERO SECTION - High Contrast, Neon Focused */}
            <section className={`py-24 md:py-32 text-center relative overflow-hidden ${DARK_BG} border-b border-cyan-800/50`}>
                
                {/* Neon Title Glow Effect */}
                <h1 className="text-5xl md:text-7xl font-extrabold mb-4 relative z-10">
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r from-[${PRIMARY_ACCENT}] to-[${SECONDARY_ACCENT}] drop-shadow-lg`}>
                        Future Skills
                    </span>
                    <span className="block text-white/90 mt-2"> Starts Here.</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 z-10">
                    Unlock your potential with cutting-edge courses in Web Development, AI, and Cybersecurity.
                </p>

                {/* Primary Call to Action Button - Neon Gradient */}
                <div className="relative z-10">
                    <button
                        className={`px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-xl 
                            bg-gradient-to-r from-[${PRIMARY_ACCENT}] to-[${SECONDARY_ACCENT}] 
                            hover:from-[${SECONDARY_ACCENT}] hover:to-[${PRIMARY_ACCENT}] 
                            active:scale-[0.98] transform border border-cyan-400/50`}
                    >
                        Start Free Trial <FaArrowRight className="inline ml-2" />
                    </button>
                </div>

                {/* Subtle Background Abstract Shape/Glow (Hero specific) */}
                <div className="absolute inset-0 z-0 opacity-10">
                    <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <defs>
                            <radialGradient id="neonGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                <stop offset="0%" style={{stopColor: PRIMARY_ACCENT, stopOpacity: 0.5}} />
                                <stop offset="100%" style={{stopColor: PRIMARY_ACCENT, stopOpacity: 0}} />
                            </radialGradient>
                        </defs>
                        <circle cx="500" cy="500" r="400" fill="url(#neonGlow)" />
                    </svg>
                </div>

            </section>
      

            {/* 2. FEATURED COURSES SECTION */}
            <section className="py-20 bg-gray-950">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h2 className={`text-4xl font-bold mb-12 text-center border-b pb-4 border-gray-700/50`}>
                        Featured Paths
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {featuredCourses.map((course, index) => (
                            // Course Card: Darker BG, Neon Border on Hover
                            <div 
                                key={index} 
                                className={`p-6 rounded-xl shadow-2xl transition-transform duration-300 hover:scale-[1.03] 
                                    bg-gray-800 border-2 border-gray-700 hover:border-[${PRIMARY_ACCENT}]`}>
                                
                                <course.icon className={`text-5xl mb-4 ${course.color}`} />
                                <h3 className="text-2xl font-semibold mb-3 text-white">{course.title}</h3>
                                <p className="text-gray-400 mb-4">{course.description}</p>
                                
                                <button className={`flex items-center text-[${PRIMARY_ACCENT}] font-medium hover:text-[${SECONDARY_ACCENT}] transition-colors`}>
                                    View Course <FaArrowRight className="ml-2 text-sm" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. FINAL CTA / STATS */}
            <section className={`py-20 text-center bg-gray-900 border-t border-cyan-800/50`}>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white/95">
                    Ready to Build Your Digital Future?
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                    Join over 50,000 students learning next-generation technologies.
                </p>

                {/* Secondary CTA */}
                <Link href="/courses"><button
                    className={`px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 
                        bg-gray-700 text-[${PRIMARY_ACCENT}] border border-[${PRIMARY_ACCENT}] 
                        hover:bg-gray-600 hover:text-white`}
                >
                    Explore All Courses
                </button></Link>
            </section>

            {/* Footer Section (Minimalist Dark) */}
            <footer className="bg-gray-950 border-t border-gray-800 py-6 text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} FutureSkills Academy. All rights reserved.</p>
            </footer>

        </div>
    );
};
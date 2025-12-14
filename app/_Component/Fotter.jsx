// src/components/LargeFooter.jsx
"use client";

import React from 'react';
import { 
    FaFacebookF, 
    FaTwitter, 
    FaLinkedinIn, 
    FaInstagram, 
    FaPhone, 
    FaEnvelope, 
    FaMapMarkerAlt,
    FaCode,
    FaCalendarAlt,
    FaUserGraduate,
    FaArrowRight 
} from 'react-icons/fa';

// কালার কনস্ট্যান্টস
const PRIMARY_ACCENT = "#00BCD4"; // Cyan
const SECONDARY_ACCENT = "#14b8a6"; // Emerald
const DARK_BG_DEEP = "bg-gray-950"; 
const LIGHT_TEXT = "text-gray-100";
const GRAY_TEXT = "text-gray-400";
const BORDER_COLOR = "border-gray-800";

const FooterLink = ({ href, children }) => (
    <li className="mb-2">
        <a 
            href={href} 
            className={`flex items-center text-sm ${GRAY_TEXT} hover:text-[${PRIMARY_ACCENT}] transition-colors duration-200`}
        >
            <FaArrowRight className="mr-2 text-xs" />
            {children}
        </a>
    </li>
);

export const LargeFooter = () => {
    return (
        // ফুটার কন্টেইনার: একদম ডার্ক ব্যাকগ্রাউন্ড এবং নিয়ন বর্ডার
        <footer className={`${DARK_BG_DEEP} ${LIGHT_TEXT} border-t-4 border-[${PRIMARY_ACCENT}]/30`}>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                {/* 1. Main Grid Layout */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
                    
                    {/* কলাম ১: লোগো এবং পরিচিতি */}
                    <div className="col-span-2 md:col-span-2">
                        <a href="/" className="flex items-center text-3xl font-extrabold tracking-wider mb-4">
                            <span className={`text-[${PRIMARY_ACCENT}] drop-shadow-md`}>
                                Neo
                            </span>
                            <span className="text-white">Learn</span>
                        </a>
                        <p className={`text-sm mb-6 ${GRAY_TEXT} max-w-sm`}>
                            Empowering the next generation of innovators with high-fidelity, future-proof technical education.
                        </p>
                        
                        {/* কন্টাক্ট ইনফো */}
                        <div className="space-y-3">
                            <div className={`flex items-center ${GRAY_TEXT}`}>
                                <FaMapMarkerAlt className={`mr-3 text-lg text-[${PRIMARY_ACCENT}]`} />
                                <span className="text-sm">123 Tech Avenue, Dhaka, Bangladesh</span>
                            </div>
                            <div className={`flex items-center ${GRAY_TEXT}`}>
                                <FaPhone className={`mr-3 text-lg text-[${PRIMARY_ACCENT}]`} />
                                <span className="text-sm">+880 1XXXXXXXXX</span>
                            </div>
                            <div className={`flex items-center ${GRAY_TEXT}`}>
                                <FaEnvelope className={`mr-3 text-lg text-[${PRIMARY_ACCENT}]`} />
                                <span className="text-sm">support@neolearn.com</span>
                            </div>
                        </div>
                    </div>

                    {/* কলাম ২: দ্রুত লিঙ্ক (Quick Links) */}
                    <div>
                        <h3 className={`text-lg font-bold mb-4 border-b-2 border-[${PRIMARY_ACCENT}]/50 inline-block text-white`}>
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <FooterLink href="/">Home</FooterLink>
                            <FooterLink href="/about">About Us</FooterLink>
                            <FooterLink href="/blog">Blog & News</FooterLink>
                            <FooterLink href="/faqs">FAQ</FooterLink>
                            <FooterLink href="/contact">Contact</FooterLink>
                        </ul>
                    </div>

                    {/* কলাম ৩: কোর্স ক্যাটাগরি */}
                    <div>
                        <h3 className={`text-lg font-bold mb-4 border-b-2 border-[${PRIMARY_ACCENT}]/50 inline-block text-white`}>
                            Top Courses
                        </h3>
                        <ul className="space-y-2">
                            <FooterLink href="/courses/webdev">Web Development</FooterLink>
                            <FooterLink href="/courses/ai">AI & Machine Learning</FooterLink>
                            <FooterLink href="/courses/cybersec">Cyber Security</FooterLink>
                            <FooterLink href="/courses/design">UI/UX Design</FooterLink>
                            <FooterLink href="/courses/data">Data Science</FooterLink>
                        </ul>
                    </div>

                    {/* কলাম ৪: লার্নিং হাব */}
                    <div>
                        <h3 className={`text-lg font-bold mb-4 border-b-2 border-[${PRIMARY_ACCENT}]/50 inline-block text-white`}>
                            The Hub
                        </h3>
                        <ul className="space-y-2">
                            <FooterLink href="/courses"><FaCode className="mr-2 text-sm" /> All Courses</FooterLink>
                            <FooterLink href="/events"><FaCalendarAlt className="mr-2 text-sm" /> Events & Webinars</FooterLink>
                            <FooterLink href="/mentors"><FaUserGraduate className="mr-2 text-sm" /> Expert Mentors</FooterLink>
                            <FooterLink href="/careers">Careers</FooterLink>
                            <FooterLink href="/privacy">Privacy Policy</FooterLink>
                        </ul>
                    </div>

                </div>

                {/* 2. Divider */}
                <hr className={`my-12 ${BORDER_COLOR}`} />

                {/* 3. Social Media & Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    
                    {/* সোশ্যাল মিডিয়া আইকন */}
                    <div className="flex space-x-4 mb-6 md:mb-0">
                        {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, index) => (
                            <a 
                                key={index} 
                                href="#" 
                                target="_blank"
                                className={`p-3 rounded-full ${GRAY_TEXT} bg-gray-800 hover:bg-[${PRIMARY_ACCENT}] hover:text-white transition-colors duration-300 shadow-md`}
                            >
                                <Icon className="text-lg" />
                            </a>
                        ))}
                    </div>

                    {/* কপিরাইট */}
                    <p className={`text-sm ${GRAY_TEXT}`}>
                        &copy; {new Date().getFullYear()} NeoLearn Academy. All Rights Reserved.
                    </p>
                    
                    {/* থিম অ্যাকসেন্ট */}
                    <div className={`text-sm font-medium text-[${PRIMARY_ACCENT}]`}>
                        Designed with High-Fidelity Tech Theme
                    </div>
                </div>
            </div>
        </footer>
    );
};
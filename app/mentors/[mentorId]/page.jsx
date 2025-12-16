// src/pages/mentors/[mentorId].jsx
// অথবা src/app/mentors/[mentorId]/page.jsx

"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; 
import Link from 'next/link'; 
import axios from 'axios';
import { 
    FaSpinner, FaEnvelope, FaPhone, FaMapMarkerAlt, FaStar, 
    FaUserGraduate, FaBriefcase, FaGraduationCap, FaArrowRight, 
    FaChalkboardTeacher 
} from 'react-icons/fa';

// ===== COLORS / THEME =====
const DARK_BG = "bg-slate-950"; 
const LIGHT_TEXT = "text-gray-50"; 
const CARD_BG = "bg-slate-800"; // Slightly lighter dark background for cards
const ACCENT_COLOR = "text-cyan-400"; // Primary Accent for text
const SHADOW_COLOR = "shadow-cyan-500/30"; // Accent shadow

// আপনার API রুট (ডাইনামিক)
const MENTOR_API_BASE_URL = "https://neolearnfull-backend-1.onrender.com/api/mentor";

export default function MentorDetailsPage() {
    const params = useParams();
    const mentorId = params.mentorId; 
    
    const [mentor, setMentor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!mentorId) return;

        const fetchMentorDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                // API-তে mentorId দিয়ে কল করা হচ্ছে
                const response = await axios.get(`${MENTOR_API_BASE_URL}/${mentorId}`);
                setMentor(response.data.data); 
            } catch (err) {
                console.error(`Error fetching mentor ${mentorId}:`, err);
                setError("Mentor details not found or failed to load.");
                setMentor(null);
            } finally {
                setLoading(false);
            }
        };
        fetchMentorDetails();
    }, [mentorId]); 

    if (loading) {
        return (
            <div className={`min-h-screen ${DARK_BG} ${LIGHT_TEXT} flex justify-center items-center`}>
                <FaSpinner className="animate-spin text-4xl text-cyan-400" />
                <p className="ml-4 text-xl">Loading mentor details...</p>
            </div>
        );
    }

    if (error || !mentor) {
        return (
             <div className={`min-h-screen ${DARK_BG} ${LIGHT_TEXT} text-center p-10 flex flex-col items-center justify-center`}>
                <FaChalkboardTeacher className="text-6xl text-red-500 mb-4"/>
                <p className="text-2xl text-red-500 font-bold mb-4">{error}</p>
                <Link 
                    href="/mentors" 
                    className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium transition"
                >
                    <FaArrowRight className="mr-2 rotate-180" /> Go back to Mentors List
                </Link>
            </div>
        );
    }

    // মেন্টর ডেটা ডিস্ট্রাকচার করা
    const { 
        name, designation, departmentName, reviews, experienceTrainedStudents, 
        profileImg, bio, specialized_area, education_qualification, email, 
        contactNo, address, workExperience 
    } = mentor;

    return (
        <div className={`min-h-screen ${DARK_BG} ${LIGHT_TEXT} p-4 sm:p-8`}>
            <div className="max-w-5xl mx-auto py-8">
                
                {/* Header (Image, Name, Designation) */}
                <div className={`${CARD_BG} p-8 rounded-3xl shadow-2xl ${SHADOW_COLOR} transition-shadow duration-500 border border-slate-700 mb-8`}>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Image */}
                        <div className="relative p-1 rounded-full bg-gradient-to-br from-cyan-500 to-teal-400">
                            <img
                                src={profileImg || 'https://via.placeholder.com/200'}
                                alt={name}
                                className="w-48 h-48 object-cover rounded-full border-4 border-slate-800 shadow-inner"
                            />
                        </div>
                        
                        {/* Info */}
                        <div className="text-center md:text-left">
                            <h1 className="text-5xl font-extrabold text-white mb-1">{name}</h1>
                            <p className={`text-2xl font-semibold mb-3 ${ACCENT_COLOR}`}>
                                {designation}
                            </p>
                            <p className="text-xl text-gray-300 mb-4">
                                {departmentName}
                            </p>
                            
                            {/* Stats */}
                            <div className="flex justify-center md:justify-start items-center gap-6 text-lg text-gray-300 border-t border-b border-slate-700 py-3">
                                <span className="flex items-center">
                                    <FaStar className="text-yellow-400 mr-2" /> 
                                    <span className="font-bold text-white">{reviews || 'N/A'}</span> Reviews
                                </span>
                                <span className="flex items-center">
                                    <FaUserGraduate className="text-emerald-400 mr-2" /> 
                                    <span className="font-bold text-white">{experienceTrainedStudents || '0+'}</span> Students
                                </span>
                            </div>

                            {/* Bio */}
                            <p className="text-gray-400 mt-5 text-base leading-relaxed italic max-w-xl">
                                "{bio || "A passionate and dedicated mentor committed to guiding students towards success."}"
                            </p>
                            
                        </div>
                    </div>
                </div>

                {/* Main Content (Details Grid) */}
                <div className="grid md:grid-cols-3 gap-8">
                    
                    {/* Column 1: Expertise & Education (2/3 width on small screens) */}
                    <div className="md:col-span-2 space-y-8">
                        
                        {/* 1. Expertise */}
                        <div className={`${CARD_BG} p-6 rounded-xl shadow-lg border border-slate-700/50`}>
                            <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
                                <FaBriefcase className={`mr-3 ${ACCENT_COLOR}`} /> Key Expertise Areas
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {(specialized_area || []).map((area) => (
                                    <span 
                                        key={area} 
                                        className="px-4 py-1.5 text-sm rounded-full bg-cyan-700/40 text-cyan-200 font-medium hover:bg-cyan-600/60 transition"
                                    >
                                        {area}
                                    </span>
                                ))}
                                {(!specialized_area || specialized_area.length === 0) && (
                                    <p className="text-gray-500 text-sm">No specialized areas listed.</p>
                                )}
                            </div>
                        </div>

                        {/* 2. Education */}
                        <div className={`${CARD_BG} p-6 rounded-xl shadow-lg border border-slate-700/50`}>
                            <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
                                <FaGraduationCap className="mr-3 text-emerald-400" /> Educational Qualifications
                            </h2>
                            <ul className="list-none text-gray-300 space-y-3">
                                {(education_qualification || []).map((edu, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-emerald-400 mr-3 mt-1 text-lg">›</span>
                                        <p className="text-base">{edu}</p>
                                    </li>
                                ))}
                                {(!education_qualification || education_qualification.length === 0) && (
                                    <p className="text-gray-500 text-sm">No education history available.</p>
                                )}
                            </ul>
                        </div>
                        
                        {/* 3. Work Experience */}
                        <div className={`${CARD_BG} p-6 rounded-xl shadow-lg border border-slate-700/50`}>
                             <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
                                <FaBriefcase className="mr-3 text-yellow-400" /> Professional Experience
                            </h2>
                             <ul className="list-none text-gray-300 space-y-3">
                                {(workExperience || []).map((exp, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-yellow-400 mr-3 mt-1 text-lg">›</span>
                                        <p className="text-base">{exp}</p>
                                    </li>
                                ))}
                                {(!workExperience || workExperience.length === 0) && (
                                    <p className="text-gray-500 text-sm">No detailed work experience listed.</p>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Column 2: Contact & Action (1/3 width on small screens) */}
                    <div className="md:col-span-1 space-y-8">
                        
                        {/* 1. Contact Info */}
                        <div className={`${CARD_BG} p-6 rounded-xl shadow-lg border border-slate-700/50`}>
                            <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
                                <FaPhone className={`mr-3 ${ACCENT_COLOR}`} /> Get In Touch
                            </h2>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex items-center">
                                    <FaEnvelope className="text-cyan-400 mr-3 flex-shrink-0" /> 
                                    <Link href={`mailto:${email}`} className="text-sm hover:text-cyan-300 break-all transition">
                                        {email || 'N/A'}
                                    </Link>
                                </li>
                                <li className="flex items-center">
                                    <FaPhone className="text-cyan-400 mr-3 flex-shrink-0" /> 
                                    <span className="text-sm">{contactNo || 'N/A'}</span>
                                </li>
                                <li className="flex items-start">
                                    <FaMapMarkerAlt className="text-cyan-400 mr-3 mt-1 flex-shrink-0" /> 
                                    <span className="text-sm">{address || 'Location not specified'}</span>
                                </li>
                            </ul>
                        </div>
                        
                        {/* 2. Action Button (Browse Courses) */}
                        <div className="text-center">
                            <Link 
                                href="/courses"
                                className={`w-full inline-flex justify-center items-center px-8 py-3 text-lg font-bold rounded-xl 
                                           bg-cyan-600 text-white shadow-xl shadow-cyan-600/40 
                                           transition duration-300 ease-in-out hover:bg-cyan-500 hover:shadow-cyan-400/50 transform hover:scale-[1.03]`}
                            >
                                Browse Courses
                                <FaArrowRight className="ml-3 text-sm" />
                            </Link>
                            <p className="text-gray-500 text-xs mt-3">Taught by {name}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
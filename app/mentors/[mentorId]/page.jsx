// src/pages/mentors/[mentorId].jsx
// অথবা src/app/mentors/[mentorId]/page.jsx

"use client";

import React, { useState, useEffect } from 'react';
// 🛑 NEXT/ROUTER এর বদলে NEXT/NAVIGATION ব্যবহার করুন 
import { useParams } from 'next/navigation'; 
import Link from 'next/link'; // Link App Router এও ব্যবহার করা যায়
import axios from 'axios';
import { FaSpinner, FaEnvelope, FaPhone, FaMapMarkerAlt, FaStar, FaUserGraduate, FaBriefcase, FaGraduationCap } from 'react-icons/fa';

// ===== COLORS / THEME =====
const DARK_BG = "bg-slate-950"; 
const LIGHT_TEXT = "text-gray-50"; 
// const PRIMARY_ACCENT = "#00BCD4"; // (Directly used in style)
const CARD_BG = "bg-slate-900";

// আপনার API রুট (ডাইনামিক)
const MENTOR_API_BASE_URL = "http://localhost:3005/api/mentor";

export default function MentorDetailsPage() {
    // 💡 মূল পরিবর্তন: useRouter এর বদলে useParams
    const params = useParams();
    const mentorId = params.mentorId; // ডাইনামিক রুট ফোল্ডারের নাম ([mentorId]) ব্যবহার করা হয়েছে
    
    const [mentor, setMentor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // mentorId পেলেই কেবল API কল শুরু হবে
        if (!mentorId) return;

        const fetchMentorDetails = async () => {
            try {
                setLoading(true);
                setError(null);
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
    }, [mentorId]); // mentorId পরিবর্তন হলে আবার ফেচ করবে

    if (loading) {
        return (
            <div className={`min-h-screen ${DARK_BG} ${LIGHT_TEXT} flex justify-center items-center`}>
                <FaSpinner className="animate-spin text-3xl text-cyan-400" />
                <p className="ml-3 text-lg">Loading mentor details...</p>
            </div>
        );
    }

    if (error || !mentor) {
        return (
             <div className={`min-h-screen ${DARK_BG} ${LIGHT_TEXT} text-center p-10`}>
                <p className="text-xl text-red-500">{error}</p>
                <Link href="/mentors" className="text-cyan-400 hover:underline mt-4 block">
                    Go back to Mentors List
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
            <div className="max-w-4xl mx-auto">
                
                {/* Header and Bio Section */}
                <div className={`${CARD_BG} p-8 rounded-2xl shadow-2xl border border-cyan-700/30 mb-8`}>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        {/* Image */}
                        <img
                            src={profileImg || 'https://via.placeholder.com/200'}
                            alt={name}
                            className="w-40 h-40 object-cover rounded-full border-4 border-cyan-500/50 shadow-xl flex-shrink-0"
                        />
                        
                        {/* Info */}
                        <div>
                            <h1 className="text-4xl font-extrabold text-white mb-1">{name}</h1>
                            <p className={`text-2xl font-semibold mb-2 text-cyan-400`}>
                                {designation} at {departmentName}
                            </p>
                            
                            <div className="flex items-center gap-4 text-lg text-gray-300 mt-2">
                                <span className="flex items-center">
                                    <FaStar className="text-yellow-500 mr-1" /> {reviews || 'N/A'}
                                </span>
                                <span className="flex items-center">
                                    <FaUserGraduate className="text-emerald-400 mr-1" /> {experienceTrainedStudents || '0+'} Students
                                </span>
                            </div>

                            <p className="text-gray-400 mt-4 text-lg italic">"{bio}"</p>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    
                    {/* Specialized Area & Education */}
                    <div className={`${CARD_BG} p-6 rounded-xl shadow-lg border border-gray-700/50`}>
                        <h2 className="text-2xl font-bold mb-4 text-cyan-400 flex items-center">
                            <FaBriefcase className="mr-2" /> Expertise & Work
                        </h2>
                        
                        {/* Expertise */}
                        <div className="mb-4">
                            <h3 className="font-semibold text-white mb-2">Specialized Areas:</h3>
                            <div className="flex flex-wrap gap-2">
                                {(specialized_area || []).map(area => (
                                    <span key={area} className="px-3 py-1 text-sm rounded-full bg-cyan-900/50 text-cyan-200 font-medium">
                                        {area}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Education */}
                         <div className="mt-6">
                            <h3 className="font-semibold text-white mb-2 flex items-center">
                                <FaGraduationCap className="mr-2 text-emerald-400" /> Education:
                            </h3>
                            <ul className="list-disc list-inside text-gray-300 pl-4 space-y-1">
                                {(education_qualification || []).map((edu, index) => (
                                    <li key={index}>{edu}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact & Professional Info */}
                    <div className={`${CARD_BG} p-6 rounded-xl shadow-lg border border-gray-700/50`}>
                         <h2 className="text-2xl font-bold mb-4 text-cyan-400 flex items-center">
                            <FaPhone className="mr-2" /> Contact & Location
                        </h2>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-start">
                                <FaEnvelope className="text-emerald-400 mr-3 mt-1 flex-shrink-0" /> 
                                <span className="break-all">{email}</span>
                            </li>
                            <li className="flex items-center">
                                <FaPhone className="text-emerald-400 mr-3 flex-shrink-0" /> 
                                <span>{contactNo}</span>
                            </li>
                            <li className="flex items-start">
                                <FaMapMarkerAlt className="text-emerald-400 mr-3 mt-1 flex-shrink-0" /> 
                                <span>{address}</span>
                            </li>
                            <li className="pt-3 border-t border-gray-700/50">
                                <h3 className="font-semibold text-white mb-1">Work History:</h3>
                                <ul className="list-disc list-inside text-gray-300 pl-4 space-y-1 text-sm">
                                    {(workExperience || []).map((exp, index) => (
                                        <li key={index}>{exp}</li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
        </div>
    );
}
// src/components/HomeMentors.jsx
"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaUsers, FaArrowRight, FaSpinner } from 'react-icons/fa';

import MentorCard from './MentorCard'; 

// ===== COLORS / THEME (CoursesPage থেকে নেওয়া হয়েছে) =====
const DARK_BG = "bg-slate-950"; 
const LIGHT_TEXT = "text-gray-50"; 
const PRIMARY_ACCENT = "#00BCD4"; // Cyan

// আপনার API রুট
const MENTOR_API_URL = "http://localhost:3005/api/mentor";

export default function HomeMentors() {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const response = await axios.get(MENTOR_API_URL);
                // API থেকে ডেটা array টি state-এ সংরক্ষণ করা
                setMentors(response.data.data.slice(0, 3)); // শুধু প্রথম 3 জন মেন্টর দেখানো হচ্ছে
            } catch (err) {
                console.error("Error fetching mentors:", err);
                setError("Failed to load mentors. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchMentors();
    }, []);

    if (loading) {
        return (
            <div className={`py-16 ${DARK_BG} ${LIGHT_TEXT} flex justify-center items-center`}>
                <FaSpinner className="animate-spin text-3xl text-cyan-400" />
                <p className="ml-3 text-lg">Loading mentors...</p>
            </div>
        );
    }

    if (error) {
        return (
             <div className={`py-16 ${DARK_BG} ${LIGHT_TEXT} text-center`}>
                <p className="text-xl text-red-500">{error}</p>
            </div>
        );
    }
    
    // যদি কোনো মেন্টর না থাকে
    if (mentors.length === 0) {
        return (
            <div className={`py-16 ${DARK_BG} ${LIGHT_TEXT} text-center`}>
                <p className="text-xl text-gray-500">No mentors available at the moment. 😔</p>
            </div>
        );
    }

    return (
        <section className={`py-16 ${DARK_BG} ${LIGHT_TEXT}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className={`text-4xl font-extrabold mb-3 text-white`}>
                        Meet Our <span style={{ color: PRIMARY_ACCENT }}>Expert Mentors</span>
                    </h2>
                    <p className="text-xl text-gray-400">
                        Learn from the industry leaders and highly-rated professionals.
                    </p>
                </div>

                {/* Mentor Grid (h-full ensures equal height via MentorCard.jsx) */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {mentors.map(mentor => (
                        // প্রতিটি মেন্টর অবজেক্ট MentorCard এ পাস করা হচ্ছে
                        <MentorCard key={mentor._id} mentor={mentor} />
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-12">
                    <Link
                        href="/mentors"
                        className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg 
                                   bg-cyan-600 hover:bg-cyan-700 text-white transition duration-300 ease-in-out`}
                    >
                        View All Mentors <FaArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>

            </div>
        </section>
    );
}

// এটি আপনার মূল হোমপেজ কম্পোনেন্টে <HomeMentors /> হিসেবে ব্যবহার করুন।
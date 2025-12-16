// src/pages/mentors/MentorsPage.jsx
"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSpinner, FaUsers, FaArrowRight, FaSearch } from 'react-icons/fa';

import Link from 'next/link';
import MentorCard from '../_Component/MentorCard';

// ===== COLORS / THEME =====
const DARK_BG = "bg-slate-950"; 
const LIGHT_TEXT = "text-gray-50"; 
// PRIMARY_ACCENT = "#00BCD4"; // (Tailwind syntax এর জন্য সরাসরি ক্লাস ব্যবহার করা হলো)

// আপনার API রুট
const MENTOR_API_URL = "https://neolearnfull-backend-1.onrender.com/api/mentor";

export default function MentorsPage() {
    const [allMentors, setAllMentors] = useState([]);
    const [filteredMentors, setFilteredMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    // API থেকে ডেটা আনা
    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const response = await axios.get(MENTOR_API_URL);
                const data = response.data.data;
                setAllMentors(data);
                setFilteredMentors(data);
            } catch (err) {
                console.error("Error fetching mentors:", err);
                setError("Failed to load mentors data.");
            } finally {
                setLoading(false);
            }
        };
        fetchMentors();
    }, []);

    // সার্চ ফিল্টারিং লজিক
    useEffect(() => {
        if (!searchTerm) {
            setFilteredMentors(allMentors);
            return;
        }
        
        const lowerCaseSearch = searchTerm.toLowerCase();
        const results = allMentors.filter(mentor =>
            (mentor.name || '').toLowerCase().includes(lowerCaseSearch) ||
            (mentor.designation || '').toLowerCase().includes(lowerCaseSearch) ||
            (mentor.specialized_area || []).some(area => area.toLowerCase().includes(lowerCaseSearch))
        );
        setFilteredMentors(results);
    }, [searchTerm, allMentors]);


    if (loading) {
        return (
            <div className={`min-h-screen ${DARK_BG} ${LIGHT_TEXT} flex justify-center items-center`}>
                <FaSpinner className="animate-spin text-3xl text-cyan-400" />
                <p className="ml-3 text-lg">Loading mentors list...</p>
            </div>
        );
    }

    if (error) {
        return (
             <div className={`min-h-screen ${DARK_BG} ${LIGHT_TEXT} text-center p-10`}>
                <p className="text-xl text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${DARK_BG} ${LIGHT_TEXT} p-4 sm:p-8`}>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-4 text-center text-cyan-400">
                    <FaUsers className="inline mr-3" /> Meet Our Elite Mentors
                </h1>
                <p className="text-center text-gray-400 mb-10">
                    Find the perfect guide for your learning journey from our expert faculty.
                </p>

                {/* Search Bar */}
                <div className="max-w-xl mx-auto mb-10">
                    <div className="relative">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search mentors by name, designation, or expertise..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            // 🛑 ফিক্সড: focus:ring-[${PRIMARY_ACCENT}] এর বদলে focus:ring-cyan-500 ব্যবহার করা হলো
                            className={`w-full py-3 pl-12 pr-4 rounded-xl bg-slate-800 border border-cyan-600/50 focus:ring-2 focus:ring-cyan-500 outline-none placeholder-gray-400 transition`}
                        />
                    </div>
                </div>

                {/* Mentor Grid */}
                {filteredMentors.length === 0 ? (
                    <p className="text-center p-10 text-xl text-gray-500">
                        No mentors found matching "{searchTerm}". 😔
                    </p>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredMentors.map(mentor => (
                            // ✅ ফিক্সড: mentor._id এর বদলে mentor.id ব্যবহার করা হয়েছে
                            <Link key={mentor._id} href={`/mentors/${mentor.id}`} className="block h-full group">
                                <MentorCard mentor={mentor} />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
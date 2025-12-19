// src/pages/courses/CoursesPage.jsx (Premium Look & Hover Effect - Equal Height)
"use client";

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Link from "next/link";
import { FaStar, FaClock, FaBook, FaSortAlphaDown, FaSortNumericDown, FaFilter, FaTimes, FaSearch } from 'react-icons/fa';

// ===== COLORS / THEME (প্রিমিয়াম ভাইব) =====
const PRIMARY_ACCENT = "#00BCD4"; // Cyan
const SECONDARY_ACCENT = "#14b8a6"; // Emerald
const DARK_BG = "bg-slate-950"; // আরও ঘন ব্যাকগ্রাউন্ড
const LIGHT_TEXT = "text-gray-50"; // সাদাটে টেক্সট
const CARD_BG = "bg-slate-900"; // ঘন কার্ড ব্যাকগ্রাউন্ড
const BORDER_COLOR = "border-cyan-700/30"; // তীক্ষ্ণ বর্ডার

// ডামি ক্যাটাগরি ডেটা (আপনার API থেকে এটি আনতে হতে পারে)
const DUMMY_CATEGORIES = ['Web Development', 'Mobile App', 'Data Science', 'UI/UX Design', 'AI & ML'];
const MAX_PRICE = 100000; 

export default function CoursesPage() {
    const [allCourses, setAllCourses] = useState([]); 
    const [loading, setLoading] = useState(true);
    
    // ===== ফিল্টার ও সর্টিং স্টেট =====
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('rating_desc');
    const [priceRange, setPriceRange] = useState(MAX_PRICE); 
    const [selectedCategory, setSelectedCategory] = useState('All');

    // API থেকে ডেটা আনা
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get("https://neolearnfull-backend-1.onrender.com/api/course");
                setAllCourses(res.data.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
                setAllCourses([]);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    // ===== ডেটা ফিল্টারিং এবং সর্টিং লজিক (useMemo ব্যবহার করে) =====
    const filteredAndSortedCourses = useMemo(() => {
        let filtered = allCourses;

        if (searchTerm) {
            filtered = filtered.filter(course =>
                (course.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (course.courseOverview || '').toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(course => course.category === selectedCategory);
        }
        filtered = filtered.filter(course => course.fee <= priceRange);

        filtered.sort((a, b) => {
            switch (sortOption) {
                case 'rating_desc':
                    return (b.rating || 0) - (a.rating || 0); 
                case 'fee_asc': 
                    return a.fee - b.fee;
                // অন্যান্য সর্টিং বিকল্পগুলি অপরিবর্তিত
                default:
                    return 0;
            }
        });

        return filtered;
    }, [allCourses, searchTerm, selectedCategory, priceRange, sortOption]);


    if (loading) {
        return (
            <div className={`min-h-screen ${DARK_BG} flex items-center justify-center`}>
                <p className="p-10 text-xl text-cyan-400">Loading courses...</p>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${DARK_BG} ${LIGHT_TEXT} p-4 sm:p-8`}>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-10 text-center text-cyan-400">
                     Find Your Dream Course
                </h1>
                
                {/* --- প্রিমিয়াম ফিল্টার এবং সর্টিং কন্ট্রোল (অপরিবর্তিত) --- */}
                <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-2xl shadow-slate-900/50 mb-12 border border-cyan-700/20">
                    {/* ... (Filter and Sort controls code here - no change needed for equal height) ... */}
                    {/* সার্চ এবং সর্টিং */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
                        {/* সার্চ ইনপুট */}
                        <div className="relative flex-grow w-full md:w-auto">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search courses by title or keyword..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-full py-3 pl-10 pr-4 rounded-xl ${CARD_BG} border border-cyan-600/50 focus:ring-2 focus:ring-[${PRIMARY_ACCENT}] outline-none placeholder-gray-400 transition`}
                            />
                            {searchTerm && (
                                <button 
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
                                >
                                    <FaTimes />
                                </button>
                            )}
                        </div>

                        {/* সর্টিং ড্রপডাউন */}
                        <div className="flex-shrink-0 w-full md:w-60">
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className={`w-full py-3 px-4 rounded-xl ${CARD_BG} border border-cyan-600/50 focus:ring-2 focus:ring-[${PRIMARY_ACCENT}] outline-none appearance-none cursor-pointer font-medium`}
                            >
                                <option value="rating_desc">🌟 Rating (Best)</option>
                                <option value="rating_asc">Rating (Lowest)</option>
                                <option value="fee_asc">💸 Price (Lowest)</option>
                                <option value="fee_desc">Price (Highest)</option>
                                <option value="duration_asc">⏱️ Duration (Shortest)</option>
                                <option value="duration_desc">Duration (Longest)</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-cyan-700/30">
                        
                        {/* ক্যাটাগরি ফিল্টার */}
                        <div>
                            <label className="block text-md font-semibold mb-3 text-cyan-400">
                                <FaFilter className="inline mr-2" /> Filter by Category:
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {['All', ...DUMMY_CATEGORIES].map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-1.5 text-sm rounded-full font-medium transition-all duration-300 shadow-md 
                                            ${selectedCategory === category 
                                                ? `bg-gradient-to-r from-[${PRIMARY_ACCENT}] to-[${SECONDARY_ACCENT}] text-slate-900 font-bold shadow-cyan-500/30` 
                                                : `bg-gray-700 text-gray-300 hover:bg-cyan-900/40 hover:text-white`
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* মূল্য পরিসর স্লাইডার */}
                        <div>
                            <label className="block text-md font-semibold mb-3 text-cyan-400">
                                Max Price: ৳ {priceRange.toLocaleString()}
                            </label>
                            <input
                                type="range"
                                min="0"
                                max={MAX_PRICE} 
                                step="1000"
                                value={priceRange}
                                onChange={(e) => setPriceRange(Number(e.target.value))}
                                className={`w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-600 slider-thumb-cyan`} 
                                style={{ accentColor: PRIMARY_ACCENT }}
                            />
                            <div className="flex justify-between text-sm text-gray-400 mt-2">
                                <span>৳ 0</span>
                                <span>৳ {MAX_PRICE.toLocaleString()}+</span>
                            </div>
                        </div>
                    </div>
                </div>


                {/* --- কোর্স গ্রিড --- */}
                {filteredAndSortedCourses.length === 0 ? (
                    <p className="text-center p-10 text-xl text-gray-500">
                        No courses found matching your criteria. 😔
                    </p>
                ) : (
                    // গুরুত্বপূর্ণ পরিবর্তন: grid-auto-rows-fr বা equivalent (যদি Tailwind এ থাকে)
                    // অথবা কন্টেন্টকে flex-column করে উচ্চতা নির্ধারণ করা
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredAndSortedCourses.map(course => (
                            <Link
                                key={course._id}
                                href={`/courses/${course.slug}`}
                                className="group block h-full" // h-full যোগ করা হয়েছে
                            >
                                {/* প্রিমিয়াম কার্ড লুক */}
                                <div
                                    className={`${CARD_BG} rounded-2xl overflow-hidden shadow-2xl border ${BORDER_COLOR} 
                                               transition-all duration-500 ease-in-out h-full flex flex-col 
                                               group-hover:scale-[1.03] group-hover:shadow-cyan-500/30 group-hover:shadow-xl`}
                                >
                                    {/* IMAGE (Fixed Height) */}
                                    <img
                                        src={course.image || 'https://via.placeholder.com/600x300?text=Course+Image'}
                                        alt={course.title}
                                        className="h-48 w-full object-cover transition-opacity duration-300 group-hover:opacity-90 flex-shrink-0" // flex-shrink-0 যোগ করা হয়েছে
                                    />

                                    {/* CONTENT */}
                                    <div className="p-6 flex flex-col justify-between flex-grow"> 
                                        {/* flex-grow এবং flex-col যোগ করা হয়েছে */}
                                        <div>
                                            {/* Title (Fixed height for title is not good, but description must be fixed) */}
                                            <h2 className="text-2xl font-bold mb-2 transition-colors duration-300 group-hover:text-cyan-400">
                                                {course.title}
                                            </h2>

                                            {/* Description (Fixed Height/Line Clamp) */}
                                            <p className="text-gray-400 text-sm mb-4 line-clamp-2 min-h-[2.5rem]"> 
                                                {/* min-h-[2.5rem] যোগ করা হয়েছে যাতে ফাঁকা থাকলেও ২ লাইনের স্থান থাকে */}
                                                {course.courseOverview}
                                            </p>

                                            {/* INFO BAR */}
                                            <div className="flex justify-between text-sm text-gray-300 mb-4 border-t border-b border-gray-700 py-2">
                                                <span className="flex items-center gap-1 font-medium">
                                                    <FaClock className="text-emerald-400" /> {course.durationMonth}M
                                                </span>
                                                <span className="flex items-center gap-1 font-medium">
                                                    <FaBook className="text-cyan-400" /> {course.lectures} Lectures
                                                </span>
                                            </div>
                                        </div>

                                        {/* FOOTER (Price & Rating) */}
                                        <div className="flex items-center justify-between pt-2 mt-auto"> 
                                            {/* mt-auto যোগ করা হয়েছে footer-কে নিচে ঠেলে দিতে */}
                                            <span className="font-extrabold text-3xl text-emerald-400">
                                                ৳ {course.fee}
                                            </span>

                                            <span className="flex items-center gap-1 text-lg font-bold">
                                                <FaStar className="text-yellow-500" />
                                                {course.rating || 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
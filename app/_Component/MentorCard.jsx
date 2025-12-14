// src/components/MentorCard.jsx
import React from 'react';
import { FaStar, FaUserGraduate, FaCode } from 'react-icons/fa';

// ===== COLORS / THEME (CoursesPage থেকে নেওয়া হয়েছে) =====
const PRIMARY_ACCENT = "#00BCD4"; // Cyan
const CARD_BG = "bg-slate-900"; 
const BORDER_COLOR = "border-cyan-700/30"; 

// মেন্টর কার্ড কম্পোনেন্ট
// এখানে 'mentor' prop-এর মধ্যে আপনার API থেকে আসা ডেটা পাস করা হবে
const MentorCard = ({ mentor }) => {
    // API ডেটা থেকে প্রয়োজনীয় ভ্যালুগুলি বের করা
    const name = mentor.name || 'Mentor Name';
    const expertise = mentor.specialized_area?.[0] || mentor.designation || 'Expertise Area';
    const rating = mentor.reviews || 'N/A'; // আপনার API তে 'reviews' আছে, ধরে নিচ্ছি এটি রেটিং
    // 'experienceTrainedStudents' স্ট্রিং ফরম্যাটে আছে, তাই সরাসরি ব্যবহার করা হচ্ছে
    const students = mentor.experienceTrainedStudents || '0+'; 
    const image = mentor.profileImg || 'https://via.placeholder.com/150';
    const bio = mentor.bio || 'Experienced professional dedicated to guiding the next generation of tech leaders.';

    return (
        // প্রিমিয়াম কার্ড লুক এবং হোভার ইফেক্ট
        // h-full এবং flex-col ব্যবহার করা হয়েছে কার্ডের উচ্চতা সমান রাখতে
        <div
            className={`${CARD_BG} rounded-2xl p-6 shadow-2xl border ${BORDER_COLOR} 
                       transition-all duration-500 ease-in-out h-full flex flex-col items-center text-center
                       hover:scale-[1.03] hover:shadow-cyan-500/30 hover:shadow-xl cursor-pointer`}
        >
            {/* Image (Rounded) */}
            <div className="relative mb-4 flex-shrink-0">
                <img
                    src={image}
                    alt={name}
                    // profileImg URL যদি "http://example.com" বা "https://example.com" ডোমেইন হয়, তবে Next.js-এর জন্য এটি কনফিগার করতে হবে। 
                    // অথবা ডামি ছবি ব্যবহারের জন্য একটি ফলব্যাক রাখা যেতে পারে।
                    className="w-28 h-28 object-cover rounded-full border-4 border-cyan-500/50 shadow-lg shadow-cyan-900/50"
                />
                {/* Rating Badge */}
                <span className="absolute bottom-0 right-0 bg-yellow-500 text-slate-900 font-bold text-xs p-1 rounded-full flex items-center shadow-lg">
                    <FaStar className="w-3 h-3 mr-0.5" /> {rating}
                </span>
            </div>

            {/* Content */}
            <h3 className="text-xl font-extrabold text-white mb-1 transition-colors duration-300 hover:text-cyan-400">
                {name}
            </h3>
            
            <p className="text-cyan-400 text-sm font-medium mb-3 flex items-center">
                <FaCode className="mr-2" /> {expertise}
            </p>

            {/* Bio (Fixed height/line-clamp to ensure equal height) */}
            <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow min-h-[3.5rem] overflow-hidden"> 
                {/* 3 লাইন পর্যন্ত টেক্সট দেখাবে */}
                {bio}
            </p>

            {/* Stats */}
            <div className="w-full border-t border-gray-700 pt-4 mt-auto">
                <div className="flex items-center justify-center text-sm text-gray-300">
                    <FaUserGraduate className="text-emerald-400 mr-2" /> 
                    <span className="font-semibold">{students}</span> 
                    <span className="text-gray-400 ml-1">Students Trained</span>
                </div>
            </div>
        </div>
    );
};

export default MentorCard;
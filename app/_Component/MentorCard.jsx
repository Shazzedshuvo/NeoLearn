// src/pages/_Component/MentorCard.jsx
import React from 'react';
// FaArrowRight সহ সব প্রয়োজনীয় আইকন ইমপোর্ট করা হলো
import { FaGraduationCap, FaBriefcase, FaStar, FaArrowRight } from 'react-icons/fa'; 

const MentorCard = ({ mentor }) => {
    // ইমেজ URL না থাকলে একটি প্লেসহোল্ডার ব্যবহার করুন
    const avatarUrl = mentor.profileImage || "https://via.placeholder.com/150/06b6d4/ffffff?text=M";
    
    // specialized_area অ্যারে বা স্ট্রিং যাই হোক, প্রথম ৩টি ট্যাগ নেওয়া হলো 
    let areas = [];
    if (Array.isArray(mentor.specialized_area)) {
        areas = mentor.specialized_area;
    } else if (typeof mentor.specialized_area === 'string' && mentor.specialized_area) {
        areas = mentor.specialized_area.split(',').map(item => item.trim()); // যদি কমা সেপারেটেড স্ট্রিং হয়
    }
    areas = areas.slice(0, 3);
    if (areas.length === 0) {
        areas = ['Expert']; // কোনো ডেটা না পেলে ডিফল্ট ট্যাগ
    }

    return (
        <div className="bg-slate-800 border border-slate-700/70 p-6 rounded-2xl shadow-xl h-full flex flex-col transition duration-300 group-hover:border-cyan-500/50 group-hover:bg-slate-700/50">
            
            {/* Image and Rating */}
            <div className="flex justify-center mb-4 relative">
                <img
                    src={avatarUrl}
                    alt={mentor.name || 'Mentor Avatar'}
                    // ছবি লোড না হলে একটি ডিফল্ট স্টাইল
                    onError={(e) => {
                        e.target.onError = null; 
                        e.target.src = "https://via.placeholder.com/150/06b6d4/ffffff?text=M";
                    }}
                    className="w-28 h-28 object-cover rounded-full border-4 border-cyan-500/50 shadow-lg transition duration-300 group-hover:border-cyan-400"
                />
                
                {/* Dynamic Rating Badge */}
                <div className="absolute -bottom-1 right-1/2 translate-x-1/2 bg-cyan-600 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center shadow-md">
                    <FaStar className="w-3 h-3 mr-1" /> 
                    {/* রেটিং না থাকলে 4.5 ডিফল্ট */}
                    {mentor.rating ? mentor.rating.toFixed(1) : '4.5'} 
                </div>
            </div>

            {/* Info */}
            <div className="text-center flex-grow">
                <h3 className="text-2xl font-bold text-gray-50 mb-1 group-hover:text-cyan-300 transition">{mentor.name || 'Unknown Mentor'}</h3>
                
                <p className="text-md text-gray-300 flex items-center justify-center mb-3">
                    <FaBriefcase className="w-4 h-4 mr-2 text-teal-400" />
                    {mentor.designation || 'Industry Specialist'}
                </p>

                {/* Tags for Expertise */}
                <div className="flex flex-wrap justify-center gap-2 mt-auto pt-3 border-t border-slate-700/50">
                    {areas.map((area, index) => (
                        <span 
                            key={index} 
                            className="text-xs font-medium bg-cyan-900/50 text-cyan-300 px-3 py-1 rounded-full border border-cyan-700/50 shadow-inner"
                        >
                            {area}
                        </span>
                    ))}
                </div>
            </div>
            
            {/* View Profile Button */}
            <div className="mt-6">
                <button className="w-full bg-cyan-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center transition duration-300 hover:bg-cyan-500 group-hover:ring-2 ring-offset-2 ring-offset-slate-800 ring-cyan-500">
                    View Profile <FaArrowRight className="ml-2 w-3 h-3" />
                </button>
            </div>
        </div>
    );
};

export default MentorCard;
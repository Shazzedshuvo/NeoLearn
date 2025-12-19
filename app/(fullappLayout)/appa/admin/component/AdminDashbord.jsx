// src/components/admin/adminDashbord.jsx
"use client";

import React, { useState } from 'react';
import { 
    FaTachometerAlt, FaUsers, FaChalkboardTeacher, FaBook, FaPlus, 
    FaList, FaEdit, FaTrash, FaCertificate, FaHandshake, FaImage, 
    FaGraduationCap, FaCalendarAlt, FaAngleDown, FaAngleUp 
} from 'react-icons/fa';

// ===== COLORS / THEME =====
const DARK_BG = "bg-slate-950"; 
const SIDEBAR_BG = "bg-slate-900";
const MAIN_BG = "bg-slate-900/50";
const ACCENT_COLOR = "text-cyan-400";
const ACCENT_HOVER_BG = "hover:bg-cyan-700/30";
const CARD_BG = "bg-slate-800";

// নেভিগেশন মেনু ডেটা
const navItems = [
    { name: "Dashboard", icon: FaTachometerAlt, path: "dashboard", routes: [] },
    { 
        name: "User Management", 
        icon: FaUsers, 
        routes: [
            { name: "All Users", path: "user-list", api: "/api/user" },
            { name: "Students", path: "students", api: "/api/student" },
            { name: "Mentors", path: "mentors", api: "/api/mentor" },
        ]
    },
    { 
        name: "Content Management", 
        icon: FaBook, 
        routes: [
            { name: "Categories", path: "categories", api: "/api/catagory" },
            { name: "Courses", path: "courses", api: "/api/course" },
            { name: "Success Stories", path: "success-stories", api: "/api/sucessstory" },
            { name: "Certificates", path: "certificates", api: "/api/certificate" },
        ]
    },
    { name: "Events", icon: FaCalendarAlt, routes: [{ name: "Manage Events", path: "events", api: "/api/event" }] },
    { name: "Gallery", icon: FaImage, routes: [{ name: "Manage Gallery", path: "gallery", api: "/api/gallery" }] },
    { name: "Partners", icon: FaHandshake, routes: [{ name: "Working Partners", path: "partners", api: "/api/partner" }] },
];

// ডেটা অপারেশন আইকন ম্যাপ
const operationIcons = {
    post: <FaPlus className="text-emerald-400" />,
    get: <FaList className="text-cyan-400" />,
    update: <FaEdit className="text-yellow-400" />,
    delete: <FaTrash className="text-red-500" />,
};

// সিমুলেটেড কার্ড ডেটা
const summaryData = [
    { title: "Total Users", value: "1,200", icon: FaUsers, color: "text-blue-400" },
    { title: "Total Courses", value: "45", icon: FaBook, color: "text-green-400" },
    { title: "Active Mentors", value: "15", icon: FaChalkboardTeacher, color: "text-yellow-400" },
    { title: "Pending Events", value: "3", icon: FaCalendarAlt, color: "text-red-400" },
];


// **ড্যাশবোর্ড লেআউট কম্পোনেন্ট**
export const AdminDashbord = () => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [openMenu, setOpenMenu] = useState('');

    // **সাইডবার নেভিগেশন কম্পোনেন্ট**
    const Sidebar = () => (
        <div className={`w-64 min-h-screen ${SIDEBAR_BG} p-5 fixed top-0 left-0 text-gray-200 shadow-xl z-20`}>
            <div className="flex items-center mb-10 border-b border-slate-700 pb-4">
                <FaChalkboardTeacher className={`text-3xl ${ACCENT_COLOR}`} />
                <h2 className="text-2xl font-bold ml-3 text-white">NeoLearn Admin</h2>
            </div>
            
            <nav className="space-y-2">
                {navItems.map((item) => (
                    <div key={item.name}>
                        {item.routes.length === 0 ? (
                            // সিঙ্গেল আইটেম (যেমন ড্যাশবোর্ড)
                            <button
                                onClick={() => setActiveSection(item.path)}
                                className={`w-full flex items-center p-3 rounded-lg transition duration-200 
                                            ${ACCENT_HOVER_BG} ${activeSection === item.path ? 'bg-cyan-700/50 text-white font-semibold' : 'text-gray-300'}`}
                            >
                                <item.icon className="mr-3 text-lg" />
                                {item.name}
                            </button>
                        ) : (
                            // ড্রপডাউন সহ গ্রুপ আইটেম
                            <>
                                <button
                                    onClick={() => setOpenMenu(openMenu === item.name ? '' : item.name)}
                                    className={`w-full flex items-center justify-between p-3 rounded-lg transition duration-200 
                                                ${ACCENT_HOVER_BG} ${openMenu === item.name ? 'bg-slate-700/50 text-white font-semibold' : 'text-gray-300'}`}
                                >
                                    <div className="flex items-center">
                                        <item.icon className="mr-3 text-lg" />
                                        {item.name}
                                    </div>
                                    {openMenu === item.name ? <FaAngleUp /> : <FaAngleDown />}
                                </button>
                                {openMenu === item.name && (
                                    <div className="ml-5 mt-1 space-y-1 border-l-2 border-slate-700 pl-3">
                                        {item.routes.map((route) => (
                                            <button
                                                key={route.path}
                                                onClick={() => setActiveSection(route.path)}
                                                className={`w-full text-left text-sm p-2 rounded-md transition duration-200 
                                                            ${ACCENT_HOVER_BG} ${activeSection === route.path ? 'bg-cyan-600/50 text-white font-medium' : 'text-gray-400'}`}
                                            >
                                                {route.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </nav>
        </div>
    );

    // **মেইন কন্টেন্ট ডিসপ্লে কম্পোনেন্ট**
    const MainContent = () => {
        // রুট ডেটা খুঁজে বের করা
        const currentRoute = navItems
            .flatMap(item => item.routes)
            .find(route => route.path === activeSection);
        
        return (
            <div className={`ml-64 p-8 ${MAIN_BG} min-h-screen text-gray-100`}>
                <h1 className="text-3xl font-bold mb-8 text-white border-b border-slate-700 pb-3">
                    {currentRoute ? currentRoute.name : "Admin Dashboard"}
                </h1>

                {activeSection === 'dashboard' && (
                    <DashboardSummary />
                )}

                {currentRoute && activeSection !== 'dashboard' && (
                    <CrudSection route={currentRoute} />
                )}
            </div>
        );
    };

    // **ড্যাশবোর্ড সামারি কার্ডস**
    const DashboardSummary = () => (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {summaryData.map(item => (
                    <div key={item.title} className={`${CARD_BG} p-6 rounded-xl shadow-lg border border-slate-700 transition hover:border-cyan-500/50`}>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-400 font-medium">{item.title}</p>
                            <item.icon className={`text-2xl ${item.color}`} />
                        </div>
                        <p className="text-4xl font-extrabold mt-2">{item.value}</p>
                    </div>
                ))}
            </div>
            
            {/* ডেটা অপারেশন ওভারভিউ */}
            <div className={`${CARD_BG} p-6 rounded-xl shadow-lg border border-slate-700`}>
                <h2 className={`text-2xl font-bold mb-4 ${ACCENT_COLOR}`}>Available API Operations</h2>
                <div className="space-y-3">
                    {navItems.flatMap(item => item.routes).map(route => (
                        <div key={route.path} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                            <p className="font-semibold">{route.name} Management</p>
                            <div className="flex gap-4 text-sm text-gray-400">
                                <div className="flex items-center gap-1">{operationIcons.get} GET</div>
                                <div className="flex items-center gap-1">{operationIcons.post} POST</div>
                                <div className="flex items-center gap-1">{operationIcons.update} PUT</div>
                                <div className="flex items-center gap-1">{operationIcons.delete} DELETE</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
    
    // **CRUD সেকশন কম্পোনেন্ট**
    const CrudSection = ({ route }) => (
        <div className={`${CARD_BG} p-8 rounded-xl shadow-2xl border border-slate-700`}>
            <p className="text-lg text-gray-400 mb-6">
                API Endpoint: <code className={`${ACCENT_COLOR} font-mono`}>{route.api}</code>
            </p>
            
            <h3 className="text-xl font-bold mb-4 flex items-center text-white">
                <FaList className={`mr-2 ${ACCENT_COLOR}`} /> List Existing {route.name}
            </h3>
            <div className="h-48 bg-slate-700/50 flex justify-center items-center rounded-lg text-gray-400 mb-6">
                {/* এখানে API থেকে ডেটা এনে টেবিল বা লিস্ট ডিসপ্লে হবে */}
                <p>Data Table for {route.name} (GET Operation)</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
                {/* Post/Create Form */}
                <div className="p-4 bg-slate-700 rounded-lg border border-slate-600">
                    <h4 className="text-lg font-semibold mb-3 flex items-center">
                        {operationIcons.post} Create New {route.name.slice(0, -1)} (POST)
                    </h4>
                    <div className="h-24 bg-slate-600 flex justify-center items-center text-sm text-gray-300 rounded">
                        Form Placeholder
                    </div>
                </div>

                {/* Update & Delete Actions */}
                <div className="p-4 bg-slate-700 rounded-lg border border-slate-600 space-y-3">
                    <h4 className="text-lg font-semibold mb-3">Actions</h4>
                    <div className="flex justify-between items-center p-2 bg-slate-600 rounded">
                        <span className="flex items-center text-yellow-400 font-medium">{operationIcons.update} Update {route.name.slice(0, -1)}</span>
                        <button className="text-sm bg-yellow-600/30 text-yellow-300 px-3 py-1 rounded hover:bg-yellow-600/50">Edit</button>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-slate-600 rounded">
                        <span className="flex items-center text-red-500 font-medium">{operationIcons.delete} Delete {route.name.slice(0, -1)}</span>
                        <button className="text-sm bg-red-600/30 text-red-300 px-3 py-1 rounded hover:bg-red-600/50">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={DARK_BG}>
            <Sidebar />
            <MainContent />
        </div>
    );
}


// admin
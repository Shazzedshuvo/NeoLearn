// src/components/admin/MentorListComponent.jsx
"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSpinner, FaList, FaEdit, FaTrash, FaStar, FaUserGraduate, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';

// ===== COLORS / THEME (আপনার পূর্বের থিম অনুযায়ী) =====
const CARD_BG = "bg-slate-800";
const ACCENT_COLOR = "text-cyan-400";

// আপনার API রুট
const MENTOR_API_URL = "https://neolearnfull-backend-1.onrender.com/api/mentor";

export const MentorListComponent = () => {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

    // API থেকে ডেটা আনা
    useEffect(() => {
        const fetchMentors = async () => {
            try {
                setLoading(true);
                const response = await axios.get(MENTOR_API_URL);
                // API রেসপন্স থেকে ডেটা ডিস্ট্রাকচার করা
                setMentors(response.data.data); 
            } catch (err) {
                console.error("Error fetching mentors:", err);
                setError("Failed to load mentor list from API.");
            } finally {
                setLoading(false);
            }
        };
        fetchMentors();
    }, []);

    // **Sorting Logic**
    const sortedMentors = React.useMemo(() => {
        let sortableItems = [...mentors];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key] || '';
                const bValue = b[sortConfig.key] || '';
                
                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [mentors, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getClassNamesFor = (key) => {
        if (!sortConfig) return;
        return sortConfig.key === key ? sortConfig.direction : undefined;
    };
    
    // Loading State
    if (loading) {
        return (
            <div className={`p-6 ${CARD_BG} rounded-xl shadow-lg border border-slate-700 h-64 flex justify-center items-center`}>
                <FaSpinner className={`animate-spin text-4xl ${ACCENT_COLOR}`} />
                <p className="ml-4 text-lg text-gray-300">Fetching mentors data...</p>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className={`p-6 ${CARD_BG} rounded-xl shadow-lg border border-slate-700 h-64 flex justify-center items-center`}>
                <p className="text-xl text-red-500">{error}</p>
            </div>
        );
    }
    
    // Empty State
    if (mentors.length === 0) {
        return (
             <div className={`p-6 ${CARD_BG} rounded-xl shadow-lg border border-slate-700 h-64 flex justify-center items-center`}>
                <p className="text-xl text-gray-500">No mentors found in the database.</p>
            </div>
        );
    }

    return (
        <div className={`${CARD_BG} p-6 rounded-xl shadow-lg border border-slate-700`}>
            <h3 className="text-2xl font-bold mb-4 text-white flex items-center">
                <FaList className={`mr-2 ${ACCENT_COLOR}`} /> All Mentors ({mentors.length})
            </h3>
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-700">
                    <thead className="bg-slate-700/50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Image</th>
                            
                            {/* Sortable Header: Name */}
                            <th 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition"
                                onClick={() => requestSort('name')}
                            >
                                <div className="flex items-center">
                                    Name
                                    {getClassNamesFor('name') === 'ascending' && <FaSortAlphaUp className="ml-1 text-xs" />}
                                    {getClassNamesFor('name') === 'descending' && <FaSortAlphaDown className="ml-1 text-xs" />}
                                </div>
                            </th>
                            
                            {/* Sortable Header: Designation */}
                            <th 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition"
                                onClick={() => requestSort('designation')}
                            >
                                <div className="flex items-center">
                                    Designation
                                    {getClassNamesFor('designation') === 'ascending' && <FaSortAlphaUp className="ml-1 text-xs" />}
                                    {getClassNamesFor('designation') === 'descending' && <FaSortAlphaDown className="ml-1 text-xs" />}
                                </div>
                            </th>
                            
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Department</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Reviews</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700 text-gray-300">
                        {sortedMentors.map((mentor) => (
                            <tr key={mentor._id} className="hover:bg-slate-700/50 transition duration-150">
                                {/* Image */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img 
                                        src={mentor.profileImg || 'https://via.placeholder.com/50'} 
                                        alt={mentor.name} 
                                        className="w-10 h-10 rounded-full object-cover border border-slate-600"
                                    />
                                </td>
                                
                                {/* Name */}
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-white">{mentor.name}</td>
                                
                                {/* Designation */}
                                <td className="px-6 py-4 whitespace-nowrap text-cyan-300">{mentor.designation}</td>
                                
                                {/* Department */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{mentor.departmentName}</td>
                                
                                {/* Reviews & Students */}
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <span className="flex items-center justify-center text-yellow-400 text-sm">
                                        <FaStar className="mr-1" /> {mentor.reviews || '0'}
                                    </span>
                                    <span className="flex items-center justify-center text-emerald-400 text-xs mt-1">
                                        <FaUserGraduate className="mr-1" /> {mentor.experienceTrainedStudents || '0'}
                                    </span>
                                </td>
                                
                                {/* Actions (Edit/Delete) */}
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                    <button 
                                        className="text-yellow-400 hover:text-yellow-300 p-2 rounded transition"
                                        title="Edit Mentor"
                                        onClick={() => alert(`Editing: ${mentor.name}`)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button 
                                        className="text-red-500 hover:text-red-400 p-2 ml-2 rounded transition"
                                        title="Delete Mentor"
                                        onClick={() => alert(`Deleting: ${mentor.name}`)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// এই কম্পোনেন্টটিকে এখন আপনার CrudSection বা adminDashbord এর ভেতর ব্যবহার করতে পারবেন।
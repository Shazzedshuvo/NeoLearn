"use client";

import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { FaStar, FaUserGraduate, FaArrowRight } from "react-icons/fa";
import { DataContext } from "../Contaxtapi/DataProvide"; // Context path adjust করে নিতে হবে

const DARK_BG = "bg-slate-950";
const LIGHT_TEXT = "text-gray-50";
const PRIMARY_ACCENT = "text-cyan-400";

export const BestMentor = () => {
  const { data: mentors, loading, error, fetchData } = useContext(DataContext);

  useEffect(() => {
    fetchData("/api/mentor");
  }, []);

  const topMentors = (mentors || []).sort((a, b) => (b.reviews || 0) - (a.reviews || 0)).slice(0, 3);

  if (loading)
    return (
      <div className={`min-h-[300px] flex justify-center items-center ${DARK_BG} ${LIGHT_TEXT}`}>
        <p className="text-xl animate-pulse">Loading top mentors...</p>
      </div>
    );

  if (error)
    return (
      <div className={`min-h-[300px] flex justify-center items-center ${DARK_BG} ${LIGHT_TEXT}`}>
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );

  return (
    <div className={`py-12 px-4 sm:px-8 ${DARK_BG} ${LIGHT_TEXT}`}>
      <h2 className="text-4xl font-extrabold mb-4 text-center">
        🏆 Our <span className={PRIMARY_ACCENT}>Best</span> Mentors
      </h2>
      <p className="text-center text-gray-400 mb-10 max-w-2xl mx-auto">
        Meet the top-rated mentors leading the way in their respective fields.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {topMentors.map((mentor) => (
          <div
            key={mentor._id}
            className="bg-slate-800 border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden 
                       transition-all duration-500 hover:shadow-cyan-500/30 hover:scale-[1.02]"
          >
            <div className="relative h-56">
              <img
                src={mentor.profileImg || "https://via.placeholder.com/600x400?text=Mentor+Image"}
                alt={mentor.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-800/80 to-transparent"></div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-1">{mentor.name}</h3>
              <p className={`font-semibold text-sm mb-3 ${PRIMARY_ACCENT}`}>{mentor.designation}</p>

              <div className="flex justify-start items-center space-x-6 border-b border-slate-700 pb-3 mb-4">
                <div className="flex items-center text-yellow-400">
                  <FaStar className="mr-2 text-lg" />
                  <span className="font-bold">{mentor.reviews || "N/A"}</span>
                  <span className="text-gray-400 text-sm ml-1">Reviews</span>
                </div>
                <div className="flex items-center text-emerald-400">
                  <FaUserGraduate className="mr-2 text-lg" />
                  <span className="font-bold">{mentor.experienceTrainedStudents || "0"}</span>
                  <span className="text-gray-400 text-sm ml-1">Students</span>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {mentor.bio || "No biography provided."}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {(mentor.specialized_area || []).slice(0, 3).map((area) => (
                  <span
                    key={area}
                    className="bg-cyan-700/30 px-3 py-1 rounded-full text-xs font-medium text-cyan-300 transition hover:bg-cyan-600/50"
                  >
                    {area}
                  </span>
                ))}
                {(mentor.specialized_area || []).length > 3 && (
                  <span className="bg-slate-700/50 px-3 py-1 rounded-full text-xs font-medium text-gray-400">
                    +{(mentor.specialized_area.length - 3)} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/mentors"
          className={`inline-flex items-center px-8 py-3 text-lg font-semibold rounded-full 
                     bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 
                     transition duration-300 ease-in-out hover:bg-cyan-500 hover:shadow-cyan-400/40`}
        >
          See All Mentors
          <FaArrowRight className="ml-2 text-sm" />
        </Link>
      </div>
    </div>
  );
};

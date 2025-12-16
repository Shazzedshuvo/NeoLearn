"use client";

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// 1️⃣ Context তৈরি
export const DataContext = createContext();

// 2️⃣ Provider বানাও
export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);     // API data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "https://neolearnfull-backend-1.onrender.com"; // তোমার backend

  // 3️⃣ Data fetch function
  const fetchData = async (endpoint) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`${API_BASE_URL}${endpoint}`);
      setData(res.data.data); // ধরলাম API response { success:true, data: ... }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // 4️⃣ Value object
  const value = {
    data,
    loading,
    error,
    fetchData, // 🔥 যেকোনো page থেকে call করা যাবে
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

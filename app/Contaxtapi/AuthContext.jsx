// src/Contaxtapi/AuthContext.js
"use client";

import React, { createContext, useState, useEffect } from "react";
import Cookies from 'js-cookie'; 
// axios আর লাগবে না, যেহেতু /api/me কল করা হচ্ছে না
// useRouter এখানে ব্যবহার না করাই শ্রেয়, এটি শুধু NavBar/LoginPage এ রাখুন।

export const authDataContext = createContext();

// ===== CONSTANTS =====
const sarvaUrl = "http://localhost:3005"; 
const AUTH_TOKEN_COOKIE = 'auth_token'; // আপনার কুকির নাম

export const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ১. প্রাথমিক চেক (কুকি আছে কি না)
    useEffect(() => {
        const token = Cookies.get(AUTH_TOKEN_COOKIE); 
        
        // টোকেন থাকলেই ধরে নেওয়া হবে ইউজার লগইন করেছে (কম নিরাপদ, কিন্তু /api/me ছাড়া এটিই সহজ)
        if (token) {
            // টোকেন থাকলে ডামি ইউজার ডেটা সেট করা হলো
            setUser({ name: "Authenticated User", email: "user@example.com" });
        }
        setLoading(false);
    }, []);

    // ২. লগইন সফল হওয়ার পর ইউজার ডেটা সেট করার ফাংশন
    // LoginPage থেকে এটি কল হবে।
    const setUserLoggedIn = (userData = { name: "User", email: "default@user.com" }) => {
        setUser(userData);
    };

    // ৩. লগআউট ফাংশন
    const logout = () => {
        Cookies.remove(AUTH_TOKEN_COOKIE); // কুকি থেকে টোকেন ডিলিট
        setUser(null); // ইউজার স্টেট রিসেট
    };
    
    // (refetchUserStatus এর পরিবর্তে এখন setUserLoggedIn ব্যবহার করব)

    let value = {
        sarvaUrl,
        user, 
        loading, 
        logout, 
        setUserLoggedIn, // 🔥 নতুন ফাংশন
    };

    return (
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    );
};
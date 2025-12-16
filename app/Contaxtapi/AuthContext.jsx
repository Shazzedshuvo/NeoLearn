"use client";

import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const authDataContext = createContext();

const sarvaUrl = "https://neolearnfull-backend-1.onrender.com";
const AUTH_TOKEN_COOKIE = "auth_token";

export const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 REAL USER FETCH
  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get(AUTH_TOKEN_COOKIE);

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${sarvaUrl}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.data);
      } catch (error) {
        console.error("Auth check failed", error);
        Cookies.remove(AUTH_TOKEN_COOKIE);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 🔹 Login success handler
  const setUserLoggedIn = (token, userData) => {
    Cookies.set(AUTH_TOKEN_COOKIE, token);
    setUser(userData);
  };

  // 🔹 Logout
  const logout = () => {
    Cookies.remove(AUTH_TOKEN_COOKIE);
    setUser(null);
  };

  return (
    <authDataContext.Provider
      value={{
        sarvaUrl,
        user,
        loading,
        logout,
        setUserLoggedIn,
      }}
    >
      {children}
    </authDataContext.Provider>
  );
};

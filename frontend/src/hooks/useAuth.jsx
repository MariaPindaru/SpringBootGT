import React, { createContext, useContext, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const [loading, setLoading] = useState(false);

    const login = async (authData) => {
        try {
            setLoading(true);
            const response = await axiosInstance.post(
                "/auth/login",
                {},
                {
                    auth: {
                        username: authData.username,
                        password: authData.password,
                    },
                }
            );

            if (response.status === 200) {
                localStorage.setItem("token", response.data["token"]);
                localStorage.setItem("role", response.data['role']);

                setIsLoggedIn(true); 
                return true;
            }
        } catch (error) {
            console.error("Login error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const getRole = () => {
        return localStorage.getItem("role");
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, loading, getRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
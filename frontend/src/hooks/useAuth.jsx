import React, { createContext, useContext, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const [loading, setLoading] = useState(false);

    const login = async (authData) => {
        try {
            console.log(authData.username);
            console.log(authData.password);
            
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
                setIsLoggedIn(true); // Update the authentication state
                return true;
            }
        } catch (error) {
            console.error("Login error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
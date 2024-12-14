import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

const Login = () => {
    const { login, loading } = useAuth();

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const isAuthenticated = await login(credentials);
            if (isAuthenticated) {
                alert("Login successful!");
                navigate("/"); 
            } else {
                alert("Invalid username or password. Please try again.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div
            style={{
                maxWidth: "400px",
                margin: "50px auto",
                padding: "20px",
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
        >
            <h1
                style={{
                    textAlign: "center",
                    color: "#007BFF",
                    marginBottom: "20px",
                }}
            >
                Login
            </h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <label
                        style={{
                            display: "block",
                            marginBottom: "5px",
                            fontWeight: "bold",
                            color: "#333",
                        }}
                    >
                        Username:
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            fontSize: "16px",
                        }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label
                        style={{
                            display: "block",
                            marginBottom: "5px",
                            fontWeight: "bold",
                            color: "#333",
                        }}
                    >
                        Password:
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            fontSize: "16px",
                        }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "12px",
                        backgroundColor: "#007BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        fontSize: "16px",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;

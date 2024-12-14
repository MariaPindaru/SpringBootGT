import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const goToEvents = () => {
        navigate('/events');
    };

    const addEvent = () => {
        navigate('/add-event');
    };

    const logoutEvent = () => {
        logout();
        navigate('/login');
    };

    return (
        <header
            style={{
                position: "sticky",
                top: 0,
                backgroundColor: "#007BFF",
                color: "#fff",
                padding: "10px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
            }}
        >
            <h1 style={{ margin: 0, cursor: "pointer" }} onClick={() => navigate('/')}>
                Event Management App
            </h1>

            {isLoggedIn ?

                <div>
                    <button
                        onClick={goToEvents}
                        style={{
                            marginRight: "10px",
                            padding: "10px 15px",
                            backgroundColor: "#fff",
                            color: "#007BFF",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                    >
                        Go to Events
                    </button>

                    <button
                        onClick={addEvent}
                        style={{
                            marginRight: "10px",
                            padding: "10px 15px",
                            backgroundColor: "#fff",
                            color: "#007BFF",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                    >
                        Add event
                    </button>

                    <button
                        onClick={logoutEvent}
                        style={{
                            marginRight: "10px",
                            padding: "10px 15px",
                            backgroundColor: "#fff",
                            color: "#007BFF",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                    >
                        Logout
                    </button>
                </div>
                :
                null}
        </header>
    );
};

export default Header;

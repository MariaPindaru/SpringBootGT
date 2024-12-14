import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, deleteEvent } from "../services/eventService";
import { useAuth } from "../hooks/useAuth";

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    const { getRole } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventData = await getEventById(id);
                setEvent(eventData);
            } catch (error) {
                console.error("Error fetching event details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this event?");
        if (confirmDelete) {
            try {
                await deleteEvent(id);
                alert("Event deleted successfully!");
                navigate("/");
            } catch (error) {
                console.error("Error deleting event:", error);
                alert("Failed to delete the event. Please try again.");
            }
        }
    };

    const handleEdit = () => {
        navigate(`/edit-event/${id}`);
    };

    if (loading) {
        return <div>Loading event details...</div>;
    }

    if (!event) {
        return <div>Event not found</div>;
    }

    return (
        <div
            style={{
                maxWidth: "600px",
                margin: "40px auto",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                }}
            >
                <h1 style={{ margin: "0", color: "#333" }}>{event.title}</h1>
            </div>
            <p style={{ color: "#555", marginBottom: "16px" }}>{event.description}</p>
            <p style={{ margin: "0 0 8px", color: "#777" }}>
                <strong>Date:</strong> {new Date(event.dateTime).toLocaleString()}
            </p>
            <p style={{ margin: "0 0 16px", color: "#777" }}>
                <strong>Location:</strong> {event.location}
            </p>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                }}
            >
                {getRole() == "admin" ?
                    <button
                        onClick={handleEdit}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#007BFF",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "16px",
                        }}
                    >
                        Edit Event
                    </button>
                    : null}

                {getRole() == "admin" ?

                    <button
                        onClick={handleDelete}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#DC3545",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "16px",
                        }}
                    >
                        Delete Event
                    </button>
                    : null}

                {getRole() == "user" ?

                    <button
                        onClick={handleDelete}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#007BFF",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "16px",
                        }}
                    >
                        Book Event
                    </button>
                    : null}

            </div>
        </div>
    );
};

export default EventDetails;


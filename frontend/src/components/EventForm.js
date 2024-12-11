import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, updateEvent, createEvent } from "../services/eventService";

const EventForm = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [event, setEvent] = useState({
        title: "",
        description: "",
        dateTime: "",
        location: "",
    });
    const [loading, setLoading] = useState(!!id); 

    useEffect(() => {
        if (id) {
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
        }
    }, [id]);

    const handleChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateEvent(id, event);
                alert("Event updated successfully!");
                navigate(`/event/${id}`);
            } else {
                const newEvent = await createEvent(event);
                alert("Event created successfully!");
                navigate(`/event/${newEvent.id}`);
            }
        } catch (error) {
            console.error("Error submitting the form:", error);
            alert("An error occurred. Please try again.");
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px", fontSize: "18px" }}>
                Loading event details...
            </div>
        );
    }

    return (
        <div
            style={{
                maxWidth: "600px",
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
                {id ? "Edit Event" : "Add New Event"}
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
                        Title:
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={event.title}
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
                        Description:
                    </label>
                    <textarea
                        name="description"
                        value={event.description}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            fontSize: "16px",
                            resize: "vertical",
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
                        Date & Time:
                    </label>
                    <input
                        type="datetime-local"
                        name="dateTime"
                        value={event.dateTime ? new Date(event.dateTime).toISOString().slice(0, -1) : ""}
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
                        Location:
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={event.location}
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
                    {id ? "Save Changes" : "Create Event"}
                </button>
            </form>
        </div>
    );
};

export default EventForm;

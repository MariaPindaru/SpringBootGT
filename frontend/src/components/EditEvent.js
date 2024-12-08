import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, updateEvent } from "../services/eventService";

const EditEvent = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [event, setEvent] = useState({
        title: "",
        description: "",
        dateTime: "",
        location: "",
    });
    const [loading, setLoading] = useState(true);

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

    const handleChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateEvent(id, event); // Update event details
            alert("Event updated successfully!");
            navigate(`/event/${id}`); // Redirect to the event details page
        } catch (error) {
            console.error("Error updating event:", error);
            alert("Failed to update the event. Please try again.");
        }
    };

    if (loading) {
        return <div>Loading event details...</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Edit Event</h1>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={event.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    name="description"
                    value={event.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Date & Time:</label>
                <input
                    type="datetime-local"
                    name="dateTime"
                    value={new Date(event.dateTime).toISOString().slice(0, -1)}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Location:</label>
                <input
                    type="text"
                    name="location"
                    value={event.location}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Save Changes</button>
        </form>
    );
};

export default EditEvent;

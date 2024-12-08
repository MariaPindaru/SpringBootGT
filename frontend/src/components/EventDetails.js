import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, deleteEvent } from "../services/eventService";

const EventDetails = () => {
    const { id } = useParams(); 
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <div>Loading event details...</div>;
    }

    if (!event) {
        return <div>Event not found</div>;
    }

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
        <div>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <p><strong>Date:</strong> {new Date(event.dateTime).toLocaleString()}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <button onClick={handleEdit} style={{ marginRight: "10px" }}>
                Edit Event
            </button>
            <button onClick={handleDelete} style={{ backgroundColor: "red", color: "white" }}>
                Delete Event
            </button>
        </div>
    );
};

export default EventDetails;

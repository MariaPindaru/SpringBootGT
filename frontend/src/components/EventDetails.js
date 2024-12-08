import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { getEventById } from "../services/eventService"; 

const EventDetails = () => {
    const { id } = useParams(); 
    const [event, setEvent] = useState(null);
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
        </div>
    );
};

export default EventDetails;

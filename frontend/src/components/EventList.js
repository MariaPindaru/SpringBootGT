import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllEvents } from "../services/eventService";
import EventCard from "./eventCard/EventCard";

const EventList = () => {
    const [events, setEvents] = useState([]);  
    const [loading, setLoading] = useState(true);  

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            const eventsData = await getAllEvents();
            setEvents(eventsData);
            setLoading(false); 
        };

        fetchEvents();  
    }, []);  

    if (loading) {
        return <div>Loading events...</div>;  
    }

    const handleEventClick = (id) => {
        navigate(`/event/${id}`); 
    };


    return (
        <div>
        <h1 style={{ textAlign: "center" }}>Event List</h1>
        <ul>
                {events.length > 0 ? (
                    events.map((event) => (
                        <EventCard key={event.id} event={event} onEventClick={handleEventClick} />
                    ))
                ) : (
                    <p>No events available</p>
                )}
            </ul>
        </div>
    );
};

export default EventList;

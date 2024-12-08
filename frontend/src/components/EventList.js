import React, { useEffect, useState } from "react";
import { getAllEvents } from "../services/eventService";  

const EventList = () => {
    const [events, setEvents] = useState([]);  
    const [loading, setLoading] = useState(true);  

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

    return (
        <div>
            <h1>Event List</h1>
            <ul>
                {events.length > 0 ? (
                    events.map((event) => (
                        <li key={event.id}>
                            <h2>{event.title}</h2>
                            <p>{event.description}</p>
                            <p><strong>Date:</strong> {new Date(event.dateTime).toLocaleString()}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                        </li>
                    ))
                ) : (
                    <p>No events available</p>
                )}
            </ul>
        </div>
    );
};

export default EventList;

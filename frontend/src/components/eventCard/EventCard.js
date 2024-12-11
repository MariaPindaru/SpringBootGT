import React from "react";
import Image from "../../assets/pngwing.com.png"

const EventCard = ({ event, onEventClick }) => {
    return (
        <div
            onClick={() => onEventClick(event.id)}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "20px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                transition: "transform 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
            <div style={{ flex: 1, marginRight: "16px" }}>
                <h2 style={{ margin: "0 0 8px", color: "#333" }}>{event.title}</h2>
                <p style={{ margin: "0 0 12px", color: "#555" }}>{event.description}</p>
                <p style={{ margin: "0 0 8px", color: "#777" }}>
                    <strong>Date:</strong> {new Date(event.dateTime).toLocaleString()}
                </p>
                <p style={{ margin: "0", color: "#777" }}>
                    <strong>Location:</strong> {event.location}
                </p>
            </div>
            <img
                src={Image}
                alt={event.title}
                style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "8px",
                    objectFit: "cover",
                }}
            />
        </div>
    );
};

export default EventCard;
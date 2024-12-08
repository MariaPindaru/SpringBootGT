import React, { useState } from 'react';
import { createEvent } from '../services/eventService'; 
import { useNavigate } from 'react-router-dom';  

const AddEvent = () => {
  const navigate = useNavigate(); 

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState('');  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); 

    const event = {
      title,
      description,
      dateTime,
      location,
    };

    try {
      const newEvent = await createEvent(event);  
      if (newEvent) {
        navigate('/events'); 
      } else {
        setError('Failed to create event. Please try again.');  
      }
    } catch (err) {
      setError('Error occurred while creating event.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Add a New Event</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="dateTime">Date and Time:</label>
          <input
            type="datetime-local"
            id="dateTime"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Creating Event...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
};

export default AddEvent;

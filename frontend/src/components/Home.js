import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
  const navigate = useNavigate(); 

  const goToEvents = () => {
    navigate('/events'); 
  };

  return (
    <div>
      <h1>Welcome to the Event Management App</h1>
      <button onClick={goToEvents}>Go to Events</button> 
    </div>
  );
};

export default Home;

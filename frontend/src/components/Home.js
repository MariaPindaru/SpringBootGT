import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
    const { getRole } = useAuth();
    const role = getRole();
  return (
      <div style={{ textAlign: "center", marginTop: "50px", fontSize: "20px" }}>
          <p>You are logged in as <strong>{role}</strong>.</p>
      </div>
  );
};

export default Home;

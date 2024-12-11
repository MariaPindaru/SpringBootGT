import React from 'react';

const Home = () => {
  const role = "Admin";
  return (
      <div style={{ textAlign: "center", marginTop: "50px", fontSize: "20px" }}>
          <p>You are logged in as <strong>{role}</strong>.</p>
      </div>
  );
};

export default Home;

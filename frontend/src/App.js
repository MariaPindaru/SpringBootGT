import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EventList from "./components/EventList";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/events' element={<EventList />} />
      </Routes>
      {/* <Footer /> */}

    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EventList from "./components/EventList";
import AddEvent from "./components/AddEvent";
import EventDetails from "./components/EventDetails";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path='/events' element={<EventList />} />

      </Routes>
      {/* <Footer /> */}

    </BrowserRouter>
  );
}

export default App;

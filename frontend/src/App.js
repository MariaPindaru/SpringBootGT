import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EventList from "./components/EventList";
import AddEvent from "./components/AddEvent";
import EventDetails from "./components/EventDetails";
import EditEvent from "./components/EditEvent";
import Home from "./components/Home";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header /> 
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/edit-event/:id" element={<EditEvent />} />

        <Route path='/events' element={<EventList />} />

      </Routes>
      {/* <Footer /> */}

    </BrowserRouter>
  );
}

export default App;

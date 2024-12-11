import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EventDetails from "./components/EventDetails";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Header /> 
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/add-event" element={<EventForm />} />
        <Route path="/edit-event/:id" element={<EventForm />} />
        <Route path='/events' element={<EventList />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;

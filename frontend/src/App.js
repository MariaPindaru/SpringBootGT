import React from "react";
import { BrowserRouter, Route, Routes, Navigate, useLocation  } from 'react-router-dom';
import EventDetails from "./components/EventDetails";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import { AuthProvider, useAuth } from "./hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
  }

  return children;
};


const App = () => {
  return (
      <AuthProvider>
          <BrowserRouter>
              <Header />
              <Routes>
                  <Route path="/login" element={<Login />} />

                  <Route
                      path="/"
                      element={
                          <ProtectedRoute>
                              <Home />
                          </ProtectedRoute>
                      }
                  />
                  <Route
                      path="/event/:id"
                      element={
                          <ProtectedRoute>
                              <EventDetails />
                          </ProtectedRoute>
                      }
                  />
                  <Route
                      path="/add-event"
                      element={
                          <ProtectedRoute>
                              <EventForm />
                          </ProtectedRoute>
                      }
                  />
                  <Route
                      path="/edit-event/:id"
                      element={
                          <ProtectedRoute>
                              <EventForm />
                          </ProtectedRoute>
                      }
                  />
                  <Route
                      path="/events"
                      element={
                          <ProtectedRoute>
                              <EventList />
                          </ProtectedRoute>
                      }
                  />
              </Routes>
          </BrowserRouter>
      </AuthProvider>
  );
};

export default App;

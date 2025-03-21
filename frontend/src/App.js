
import './App.css';
import ItemsList from './ItemList.jsx';
import React, { useState, useEffect } from 'react';

import { CSRFProvider } from './Contexts/CsrfContext.js';
import SeeBookings from "./Locations/seeBookings.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home.jsx"
import Login from './security/login.jsx';
import { AuthProvider } from './Contexts/Authenticated.js';
import User from './pages/User.jsx';
function App() {
  
  
  return (
    <CSRFProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </CSRFProvider>
  );
}

export default App;

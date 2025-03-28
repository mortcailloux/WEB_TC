
import './App.css';
import React, { useState, useEffect } from 'react';

import { CSRFProvider } from './Contexts/CsrfContext.js';
import SeeBookings from "./Locations/seeBookings.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home.jsx"
import Login from './security/login.jsx';
import Cars from './Cars/Cars.jsx';
import { AuthProvider } from './Contexts/Authenticated.js';
import User from './pages/User.jsx';
import Registration from './security/registration.jsx';
import { Admin } from "./Admin/Admin.js"
import { VarProvider } from './Contexts/VariablesGlobales.js';
import Assistance from './Locations/Assistance.jsx';

function App() {

  return (
    <VarProvider>
      <CSRFProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user" element={<User />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/cars" element={<Cars />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/contact" element={<Assistance />} />
            </Routes>
          </Router>
        </AuthProvider>
      </CSRFProvider>
    </VarProvider>
  );
}

export default App;

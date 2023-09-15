import './styles/HorizontalLayout.css';
import './styles/NavbarComp.css';
import './styles/Sidebar.css';
import Homepage from './pages/Homepage';
import Studentpage from './pages/Studentpage';
import ApplicationPage from './pages/ApplicationPage';

import React, { useState, useEffect } from 'react';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes and Route


function App() {
  useEffect(() => {
    document.body.style.overflow = "hidden";

  }, []);
    return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/student-interface" element={<Studentpage/>} />
            <Route path="/application-form" element={<ApplicationPage />} />
          </Routes>
      </Router>
    </>
  );
}
export default App;

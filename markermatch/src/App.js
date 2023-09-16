import './styles/HorizontalLayout.css';
import './styles/NavbarComp.css';
import './styles/Sidebar.css';
import Homepage from './pages/Homepage';
import Authentication from './pages/Authentication';
import Testpage from './pages/Testpage';
import NoAuth from './pages/NoAuth';
import Cart from './pages/Cart'

import NavbarComp from './components/NavbarComp';
import Sidebar from './components/Sidebar';
import { RequireAuthCourseCoord } from './components/RequireAuthCourseCoord';
import { RequireAuthMarkerCoord } from './components/RequireAuthUser';
import { RequireAuthUser } from './components/RequireAuthUser';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import Studentpage from './pages/Studentpage';


function App() {
  useEffect(() => {
    // document.body.style.overflow = "hidden";

  }, []);  

return (
    <Router>
      <Authenticator.Provider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/cart" element={<RequireAuthUser><Cart /></RequireAuthUser>} />
          <Route path="/student-page" element={<Studentpage />} />
          <Route path="/notauthorised" element={<NoAuth/>} />
        </Routes>
      </Authenticator.Provider>
    </Router>
  );
}
export default App;
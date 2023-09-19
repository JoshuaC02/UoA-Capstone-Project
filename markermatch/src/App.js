import './styles/HorizontalLayout.css';
import './styles/NavbarComp.css';
import './styles/Sidebar.css';
import './styles/AddCourses.css';
import Homepage from './pages/Homepage';
import Authentication from './pages/Authentication';
import Testpage from './pages/Testpage';
import NoAuth from './pages/NoAuth';
import Cart from './pages/Cart'
import AddCourses from './pages/AddCourses';
import Studentpage from './pages/Studentpage';
import ApplicationPage from './pages/ApplicationPage';

import NavbarComp from './components/NavbarComp';
import Sidebar from './components/Sidebar';
import { RequireAuthCourseCoord } from './components/RequireAuthCourseCoord';
import { RequireAuthMarkerCoord } from './components/RequireAuthUser';
import { RequireAuthUser } from './components/RequireAuthUser';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';

import { Amplify, Storage } from 'aws-amplify';


function App() {
  useEffect(() => {
    document.body.style.overflow = "hidden";

  }, []);  
return (
    <Router>
      <Authenticator.Provider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/cart" element={<RequireAuthUser><Cart /></RequireAuthUser>} />
          <Route path="/test" element={<RequireAuthCourseCoord><Testpage /></RequireAuthCourseCoord>} />
          <Route path="/addcourses" element={<RequireAuthCourseCoord><AddCourses /></RequireAuthCourseCoord>} />
          <Route path="/notauthorised" element={<NoAuth/>} />
          <Route path="/student-interface" element={<Studentpage/>} />
          <Route path="/application-form" element={<ApplicationPage />} />
        </Routes>
      </Authenticator.Provider>
    </Router>
  );
}
export default App;
import './Styles/App.css';
import './Styles/NavbarComp.css';
import './Styles/Sidebar.css';
import Homepage from './pages/Homepage';
import Authentication from './pages/Authentication';
import Testpage from './pages/Testpage';

import NavbarComp from './components/NavbarComp';
import Sidebar from './components/Sidebar';
import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//document.body.style.overflow = 'hidden'; // making sure the page is compact

function App() {
  // calculating the size of the navbar
  const [navHeight, setnavHeight] = useState(0);
  useEffect(() => {
    const navElement = document.querySelector(".my-navbar");
    if (navElement) {
      const height = Math.floor(navElement.clientHeight);

      setnavHeight(height);
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={[<NavbarComp/>, <Sidebar navHeight={navHeight} />, <Homepage />]} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/test" element={<Testpage />} />
      </Routes>
    </Router>
  );
}
export default App;
//[<NavbarComp/>, <Sidebar navHeight={navHeight} />]
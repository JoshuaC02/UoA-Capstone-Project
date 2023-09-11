import './Styles/App.css';
import './Styles/NavbarComp.css';
import './Styles/Sidebar.css';
import Homepage from './pages/Homepage';
import Sidebar from './components/Sidebar';
import CourseCard from './components/CourseCard'
import React, { useState, useEffect } from 'react';


import { BrowserRouter as Router } from 'react-router-dom';

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
    <>
      <Router>
          <Homepage/>
          <Sidebar navHeight={navHeight} />
      </Router>
    </>
  );
}
// 
export default App;

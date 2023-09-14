import './styles/HorizontalLayout.css';
import './styles/NavbarComp.css';
import './styles/Sidebar.css';
import Homepage from './pages/Homepage';

import React, { useState, useEffect } from 'react';


import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  useEffect(() => {
    // Set body overflow to "hidden" when the component mounts
    document.body.style.overflow = "hidden";

  }, []);
    return (
    <>
      <Router>
          <Homepage/>
          
      </Router>
    </>
  );
}
export default App;

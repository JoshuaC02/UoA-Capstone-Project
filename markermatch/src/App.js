import './Styles/HorizontalLayout.css';
import './Styles/NavbarComp.css';
import './Styles/Sidebar.css';
import Homepage from './pages/Homepage';

import React, { useState, useEffect } from 'react';


import { BrowserRouter as Router } from 'react-router-dom';


function App() {

  return (
    <>
      <Router>
          <Homepage/>
          
      </Router>
    </>
  );
}
export default App;

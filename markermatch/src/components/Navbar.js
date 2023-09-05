import React from 'react';
import markermatch from '../images/markermatch.png';

function Navbar() {
  return (
    <div className="header">
      <nav className="navbar navbar-expand">
        <div className="navbar-header">
          <div className="row">
            <div className="col-4"> 
              <img src={markermatch} className="logo img-fluid" alt="Logo" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

// --- no bootstrap

// function Navbar() {
//   return (
//     <div className="header">
//       <img src={markermatch} className="logo"></img>
//     </div>
//   );
// }

// export default Navbar


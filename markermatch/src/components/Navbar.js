import React from 'react';
import markermatch from '../images/markermatch.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  return (
    <>
      <div className="header">
        <div className="row align-items-center">
          <div className="col-3">
            <img src={markermatch} className="logo img-fluid" id="logo-adjust" alt="Logo" style={{ maxWidth: '50%' }} />
          </div>
          <div className="col d-flex justify-content-end align-items-center"> 
            <p id="text-adjust">Charles Olivera</p>
            <FontAwesomeIcon icon={faUser} className="adjust-user-size" id="user-adjust"/>
          </div>
        </div>
      </div>

    </>
  );
}

export default Navbar;

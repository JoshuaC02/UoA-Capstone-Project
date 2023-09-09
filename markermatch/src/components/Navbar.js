import React, { useState, useEffect } from 'react';
import markermatch from '../images/markermatch.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

// currently the code just fetches the first user, but this will be later changed to fetch the respective user-
// -once they've logged in.
function Navbar() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const url = "http://localhost:3030/user/1";

    fetch(url).then(response => response.json()).then(user=>setUser(user));

  },[]); // dependency array which changes state upon change.


  return (
    <>
      <div className="header">
        <div className="row align-items-center">
          <div className="col-3">
            <img src={markermatch} className="logo img-fluid" id="logo-adjust" alt="Logo" style={{ maxWidth: '50%' }} />
          </div>
          <div className="col d-flex justify-content-end align-items-center"> 
          {/* ternary operator means that it only renders the name once it has been loaded from the API*/}
            {user && (
              <>
                <p id="text-adjust">{user.name}</p>
                <FontAwesomeIcon icon={faUser} className="adjust-user-size" id="user-adjust"/>
              </>
            )}
          </div>
        </div>
      </div>

    </>
  );
}

export default Navbar;

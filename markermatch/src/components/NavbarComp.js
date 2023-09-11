import React from 'react';
import { useState, useEffect } from 'react';
import markermatch from '../images/markermatch.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // format to use fontawsome in case we need
// import { faUser } from '@fortawesome/free-solid-svg-icons'; // format to use fontawsome in case we need
import Navbar from 'react-bootstrap/Navbar';
import { PiSignOut } from 'react-icons/pi';
import { BiUser } from 'react-icons/bi';


function NavbarComp() {
  
  // currently the code just fetches the first user, but this will be later changed to fetch the respective user-
  // -once they've logged in.
    const [user, setUser] = useState(null);

    useEffect(() => {
      const url = "http://localhost:3030/user/1";

      fetch(url).then(response => response.json()).then(user=>setUser(user)).catch(error => console.log('Error:', error));
    },[]); // dependency array which changes state upon change.

  return (
    <Navbar expand="lg" className="my-navbar" style={{position:'sticky'}}>
        <Navbar.Brand href="#home" className="logo ">
            <img src={markermatch} id="logo" alt="Logo"></img>
        </Navbar.Brand> 
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="my-nav-list" id="basic-navbar-nav">
                <div className="user login">
                  {/* ternary operator means that it only renders the name once it has been loaded from the API*/}
                  {user ? (
                      <>
                        <p className="adjust sign">{user.name}</p>
                        
                      </>
                    ) : (<a href="/auth"><p className="adjust sign">Login</p></a>) }
                    <BiUser className="adjust-user-size"/>
                </div>
                <div className="user logout">
                    <p className="adjust sign">Sign out</p>
                    <PiSignOut className="adjust-user-size"/>
                </div>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComp;

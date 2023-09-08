import React from 'react';
import markermatch from '../images/markermatch.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // format to use fontawsome in case we need
// import { faUser } from '@fortawesome/free-solid-svg-icons'; // format to use fontawsome in case we need
import Navbar from 'react-bootstrap/Navbar';
import { PiSignOut } from 'react-icons/pi';
import { BiUser } from 'react-icons/bi';


function NavbarComp() {
  return (
    <Navbar expand="lg" className="my-navbar">
        <Navbar.Brand href="#home" className="logo ">
            <img src={markermatch} id="logo" alt="Logo"></img>
        </Navbar.Brand> 
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="my-nav-list" id="basic-navbar-nav">
                <div className="user login">
                    <p className="adjust sign">Charles Olivera</p>
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

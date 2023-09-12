import React from 'react';
import markermatch from '../images/markermatch.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // format to use fontawsome in case we need
// import { faUser } from '@fortawesome/free-solid-svg-icons'; // format to use fontawsome in case we need
import Navbar from 'react-bootstrap/Navbar';
import { PiSignOut, PiWifiNoneLight } from 'react-icons/pi';
import { BiUser } from 'react-icons/bi';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router';


function NavbarComp() {
  // currently the code just fetches the first user, but this will be later changed to fetch the respective user-
  // -once they've logged in.
  const { user, signOut } = useAuthenticator((context) => [context.user, context.signOut]);
  const navigate = useNavigate();
  function logOut() {
    signOut();
    navigate("/", { replace: true });
  }
  return (
    <Navbar expand="lg" className="my-navbar">
        <Navbar.Brand href="#home" className="logo ">
            <img src={markermatch} id="logo" alt="Logo"></img>
        </Navbar.Brand> 
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="my-nav-list" id="basic-navbar-nav">
                <div className="user login">
                  {/* ternary operator means that it only renders the name once it has been loaded from the API*/}
                  {user ? (
                      <>
                        <p className="adjust sign">Hello {user.attributes.given_name}!</p>
                        
                      </>
                    ) : (<a href="/auth"><p className="adjust sign">Login</p></a>) }
                    <BiUser className="adjust-user-size"/>
                </div>
                <div className="user logout">
                <a style={{textDecoration:'underline', color:'blue'}} onClick={() => logOut()}><p className="adjust sign">Sign out</p></a>
                    <PiSignOut className="adjust-user-size"/>
                </div>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComp;

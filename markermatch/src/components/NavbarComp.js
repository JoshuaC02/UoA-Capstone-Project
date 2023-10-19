import React from 'react';
import markermatch from '../images/markermatch.png';
import Navbar from 'react-bootstrap/Navbar';
import { PiSignOut, PiWifiNoneLight } from 'react-icons/pi';
import { BiUser } from 'react-icons/bi';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router';


function NavbarComp() {
  const { user, signOut } = useAuthenticator((context) => [context.user, context.signOut]);
  const navigate = useNavigate();
  function logOut() {
    signOut();
    navigate("/", { replace: true });
    alert("Sign out successful.")

  }

  return (
    <Navbar expand="sm" className="my-navbar" style={{padding: '0px'}}>
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
                <a style={{textDecoration:'underline', color:'blue', cursor:'pointer'}} onClick={() => logOut()}><p className="adjust sign">Sign out</p></a>
                    <PiSignOut className="adjust-user-size"/>
                </div>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComp;

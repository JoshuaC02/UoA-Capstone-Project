import NavbarComp from '../components/NavbarComp';
import Sidebar from '../components/Sidebar';

function NoAuth() {
    return (
      <>
        <NavbarComp />
        <div className="homepage-container">
          <div className="content-container">
            <Sidebar />
            <h2>Not Authorised</h2>
            <a href="/home"><h4>Return Home</h4></a>
          </div>
        </div>
          
      </>
    );
  }

export default NoAuth

// 
import NavbarComp from '../components/NavbarComp';
import Sidebar from '../components/Sidebar';
import '../Styles/HorizontalLayout.css';
import HorizontalLayout from '../components/HorizontalLayout';

function Homepage() {
  return (
    <>
      <NavbarComp />
      <Sidebar />
      <div className="homepage-container">
        <div className="content-container">
          <HorizontalLayout />
        </div>
      </div>
    </>
  );
}

export default Homepage;

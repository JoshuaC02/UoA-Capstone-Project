import NavbarComp from '../components/NavbarComp';
import Sidebar from '../components/Sidebar';
import '../Styles/App.css';
import HorizontalLayout from '../components/HorizontalLayout';

function Homepage() {
  return (
    <div className="homepage-container">
      <NavbarComp />
      <div className="content-container">
        <Sidebar />
        <HorizontalLayout />
      </div>
    </div>
  );
}

export default Homepage;

<<<<<<< HEAD
import HorizontalLayout from '../components/HorizontalLayout';

function Homepage() {
    return (
      <>
        <div class="mainBody" style={{width: '100vw', zIndex: 0, position:'absolute', overflow:'scroll'}}>
          <HorizontalLayout />
        </div>
      </>
    );
  }
=======
import NavbarComp from '../components/NavbarComp';
import Sidebar from '../components/Sidebar';
import '../Styles/HorizontalLayout.css';
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
>>>>>>> withBoot

export default Homepage;

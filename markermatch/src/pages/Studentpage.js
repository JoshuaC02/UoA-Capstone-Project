import NavbarComp from '../components/NavbarComp';
import Sidebar from '../components/Sidebar';
import '../styles/HorizontalLayout.css';
import '../styles/StudentView.css';
import StudentView from '../components/StudentView';


function Studentpage() {
  return (
    <>
      <NavbarComp />
        <div className="student-container">
          <Sidebar />
          <StudentView />
        </div>
    </>
  );
}

export default Studentpage;

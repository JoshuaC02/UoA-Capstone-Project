import NavbarComp from '../components/NavbarComp';
import Sidebar from '../components/Sidebar';
import '../styles/HorizontalLayout.css';
import '../styles/StudentView.css';
import HorizontalLayout from '../components/HorizontalLayout';
import StudentView from '../components/StudentView';
import MaterialTable from 'material-table';


function Studentpage() {
  return (
    <>
      <NavbarComp />
      <div className="student">
        <div className="student-container">
          <Sidebar />
          <StudentView />
        </div>
      </div>
    </>
  );
}

export default Studentpage;

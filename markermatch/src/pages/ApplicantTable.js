import MarkerApplicantTable from "../components/MarkerApplicantTable";
import NavbarComp from "../components/NavbarComp";
import Sidebar from "../components/Sidebar";

function ApplicantTable() {
    return (
        <>
            <NavbarComp />
            <div className="homepage-container">
                <div className="content-container">
                    <Sidebar />
                        <MarkerApplicantTable />
                </div>
            </div>
        </>
    );
}

export default ApplicantTable
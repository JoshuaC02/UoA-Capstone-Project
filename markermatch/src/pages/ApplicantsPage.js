import NavbarComp from "../components/NavbarComp";
import Sidebar from "../components/Sidebar";
import ApplicantsTableView from "../components/ApplicantsTableView";

function ApplicantsTable() {
    return (
        <>
            <NavbarComp />
            <div className="homepage-container">
                <div className="content-container">
                    <Sidebar/>
                    <ApplicantsTableView/>
                </div>
            </div>
        </>
    );
}

export default ApplicantsTable

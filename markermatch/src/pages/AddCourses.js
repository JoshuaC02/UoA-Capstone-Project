import NavbarComp from '../components/NavbarComp';
import Sidebar from '../components/Sidebar';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


function AddCourses() {
    return (
        <>
            <NavbarComp />
            <div className="homepage-container">
                <div className="content-container">
                    <Sidebar />
                    <div id="add-course-form">
                        <Form className="border p-4 rounded " style={{ fontWeight: 600 }}>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Course Faculty</Form.Label> {/* we can change this at any time as i understand this is to be used in compsci*/}
                                    <Form.Control placeholder="e.g. COMPSCI" />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Course Code</Form.Label>
                                    <Form.Control placeholder="e.g. 225" />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Course Coordinator</Form.Label> {/* we can change this at any time as i understand this is to be used in compsci*/}
                                    <Form.Control placeholder="Name" />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>⠀</Form.Label>
                                    <Form.Control placeholder="Email" />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Year</Form.Label>
                                    <Form.Control defaultValue="2023" />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Semester</Form.Label> {/* we can change this at any time as i understand this is to be used in compsci*/}
                                    <Form.Select aria-label="Default select example">
                                        <option value="1">Semester 1</option>
                                        <option value="2">Semester 2</option>

                                    </Form.Select>
                                </Form.Group>


                                <Form.Group as={Col}>
                                    <Form.Label>Course Director</Form.Label> {/* we can change this at any time as i understand this is to be used in compsci*/}
                                    <Form.Control placeholder="Name" />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>⠀</Form.Label>
                                    <Form.Control placeholder="Email" />
                                </Form.Group>


                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} className="d-flex align-items-center">
                                    <Form.Label >Estimated number of students</Form.Label>
                                    <Form.Control />
                                </Form.Group>

                                <Form.Group as={Col} className="d-flex align-items-center">
                                    <Form.Label >Do you require markers for this course? ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀</Form.Label>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label=""
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} className="d-flex align-items-center">
                                    <Form.Label >Current number of enrolled students</Form.Label>
                                    <Form.Control />
                                </Form.Group>

                                <Form.Group as={Col} className="d-flex align-items-center">
                                    <Form.Label >Would you like to preassign markers if available?⠀⠀⠀⠀⠀⠀⠀</Form.Label>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label=""
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} className="d-flex align-items-center">
                                    <Form.Label >Number of available marking hours</Form.Label>
                                    <Form.Control />
                                </Form.Group>

                                <Form.Group as={Col} className="d-flex align-items-center">
                                    <Form.Label >Applicant minimum grade</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option value="1">A+</option>
                                        <option value="2">A</option>
                                        <option value="3">A-</option>
                                        <option value="4">B+</option>
                                        <option value="5">B</option>
                                        <option value="6">B-</option>

                                    </Form.Select>
                                </Form.Group>
                            </Row>


                           
                        </Form>
                    </div>
                </div>
            </div>

        </>
    );
}

export default AddCourses

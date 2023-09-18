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
                        <Form>
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

                            <Form.Group className="mb-3">
                                <Form.Label>Estimated number of students</Form.Label>
                                <Form.Control />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Current number of enrolled students</Form.Label>
                                <Form.Control  />
                            </Form.Group>


                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>

        </>
    );
}

export default AddCourses

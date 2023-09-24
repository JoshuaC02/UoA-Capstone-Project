import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { DataStore } from '@aws-amplify/datastore';
import { Course } from '../models';
import { useState } from 'react';

function CourseForm() {
    const [formData, setFormData] = useState({
        faculty: 'COMPSCI',
        courseCode: '201',
        coordinatorName: 'John Doe',
        coordinatorEmail: 'johndoe@gmail.com',
        year: '2023',
        semester: '1',
        directorName: 'Johnny Doe',
        directorEmail: 'Johnnydde@gmail.com',
        estimatedStudents: '100',
        requireMarkers: false,
        enrolledStudents: '90',
        preassignMarkers: false,
        totalHours: '50',
        minGrade: 'A+',
        description: 'This course is not real lol',
        summary: 'Blah blahj longer not real course blahhhhh',

    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        for (const key in formData) {
            if (formData[key]  === '') {
                alert(`Please fill in all fields (no empty fields are allowed).`);
                return;
            }

        }

        try {
            await DataStore.save(
                new Course({
                    coordinatorName: formData.coordinatorName,
                    coordinatorEmail: formData.coordinatorEmail,
                    courseCode: formData.courseCode,
                    yearSemester: `${formData.year} Semester ${formData.semester}`,
                    faculty: formData.faculty,
                    preassignMarkers: formData.preassignMarkers,
                    requireMarkers: formData.requireMarkers,
                    estimatedStudents: formData.estimatedStudents, 
                    enrolledStudents: formData.enrolledStudents, 
                    summary: formData.summary,
                    minGrade: formData.minGrade,
                    totalHours: `${formData.totalHours}`, 
                    appOpen: true, 
                    description: formData.description,
                    directorName: formData.directorName,
                    directorEmail: formData.directorEmail,
                    name: `${formData.faculty} ${formData.courseCode}`
                })
            );
            alert('Course successfully added.');
        } catch (error) {
            console.error('Error adding course:', error);
            alert('An error has occurred, please refer to console.'); 
        }
    };


    return (
        <>

            <Form className="border p-4 rounded " style={{ fontWeight: 600 }} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Course Faculty</Form.Label>
                        <Form.Control
                            name="faculty"
                            placeholder="e.g. COMPSCI"
                            value={formData.faculty}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Course Code</Form.Label>
                        <Form.Control
                            name="courseCode"
                            placeholder="e.g. 225"
                            value={formData.courseCode}
                            onChange={handleChange}
                            type="number"
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Course Coordinator</Form.Label>
                        <Form.Control
                            name="coordinatorName"
                            placeholder="Name"
                            value={formData.coordinatorName}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>⠀</Form.Label>
                        <Form.Control
                            name="coordinatorEmail"
                            placeholder="Email"
                            value={formData.coordinatorEmail}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                            name="year"
                            defaultValue="2023"
                            value={formData.year}
                            onChange={handleChange}
                            type="number"
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Semester</Form.Label>
                        <Form.Select
                            name="semester"
                            aria-label="Default select example"
                            value={formData.semester}
                            onChange={handleChange}
                        >
                            <option value="Semester 1">Semester 1</option>
                            <option value="Semester 2">Semester 2</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Course Director</Form.Label>
                        <Form.Control
                            name="directorName"
                            placeholder="Name"
                            value={formData.directorName}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>⠀</Form.Label>
                        <Form.Control
                            name="directorEmail"
                            placeholder="Email"
                            value={formData.directorEmail}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} className="d-flex align-items-center">
                        <Form.Label>Estimated number of students</Form.Label>
                        <Form.Control
                            name="estimatedStudents"
                            value={formData.estimatedStudents}
                            onChange={handleChange}
                            type="number"
                        />
                    </Form.Group>

                    <Form.Group as={Col} className="d-flex align-items-center">
                        <Form.Label>Do you require markers for this course? ⠀⠀⠀⠀⠀⠀⠀⠀⠀</Form.Label>
                        <Form.Check
                            type="switch"
                            id="custom-switch-1"
                            label=""
                            checked={formData.requireMarkers}
                            onChange={handleChange}
                            name="requireMarkers"
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} className="d-flex align-items-center">
                        <Form.Label>Current number of enrolled students</Form.Label>
                        <Form.Control
                            name="enrolledStudents"
                            value={formData.enrolledStudents}
                            onChange={handleChange}
                            type="number"
                        />
                    </Form.Group>

                    <Form.Group as={Col} className="d-flex align-items-center">
                        <Form.Label>Would you like to preassign markers if available?⠀⠀⠀</Form.Label>
                        <Form.Check
                            type="switch"
                            id="custom-switch-2"
                            label=""
                            checked={formData.preassignMarkers}
                            onChange={handleChange}
                            name="preassignMarkers"
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} className="d-flex align-items-center">
                        <Form.Label>Number of available marking hours</Form.Label>
                        <Form.Control
                            name="totalHours"
                            value={formData.totalHours}
                            onChange={handleChange}
                            type="number"
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Applicant minimum grade</Form.Label>
                        <Form.Select
                            name="minGrade"
                            aria-label="Default select example"
                            value={formData.minGrade}
                            onChange={handleChange}
                        >
                            <option value="A+">A+</option>
                            <option value="A">A</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B">B</option>
                            <option value="B-">B-</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>A short description of what the course is about</Form.Label>
                        <Form.Control
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>A longer summary for applicants who want to find out more</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="summary"
                            value={formData.summary}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </>
    );
}

export default CourseForm

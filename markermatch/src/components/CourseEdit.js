import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { DataStore } from '@aws-amplify/datastore';
import { useState } from 'react';

import { Course } from '../models';

function CourseEdit({ course }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [previewFile, setPreviewFile] = useState(null);
    const [uploadFile, setUploadFile] = useState(null);

    const [formData, setFormData] = useState({
        faculty: course.faculty,
        courseCode: course.courseCode,
        coordinatorName: course.coordinatorName,
        coordinatorEmail: course.coordinatorEmail,
        year: course.year,
        semester: course.semester,
        directorName: course.directorName,
        directorEmail: course.directorEmail,
        estimatedStudents: course.estimatedStudents,
        requireMarkers: course.requireMarkers,
        enrolledStudents: course.enrolledStudents,
        preassignMarkers: course.preassignMarkers,
        totalHours: course.totalHours,
        minGrade: course.minGrade,
        description: course.description,
        summary: course.summary,
        thumbnailId: course.thumbnailId,
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

        for (const key in formData) {
            if (formData[key] === '' && key !== 'thumbnailId') {
                alert(`Please fill in all fields (no empty fields are allowed).`);
                return;
            }

        }


        try {
            const original = await DataStore.query(Course, course.id);

        if (original) {
            await DataStore.save(
                Course.copyOf(original, updated => {
                    updated.faculty = formData.faculty;
                        updated.courseCode = formData.courseCode;
                        updated.coordinatorName = formData.coordinatorName;
                        updated.coordinatorEmail = formData.coordinatorEmail;
                        updated.year = formData.year;
                        updated.semester = formData.semester;
                        updated.directorName = formData.directorName;
                        updated.directorEmail = formData.directorEmail;
                        updated.estimatedStudents = formData.estimatedStudents;
                        updated.requireMarkers = formData.requireMarkers;
                        updated.enrolledStudents = formData.enrolledStudents;
                        updated.preassignMarkers = formData.preassignMarkers;
                        updated.totalHours = formData.totalHours;
                        updated.minGrade = formData.minGrade;
                        updated.description = formData.description;
                        updated.summary = formData.summary;
                        updated.thumbnailId = formData.thumbnailId;
                })
            );
        }

            alert('Course successfully edited.');
        } catch (error) {
            console.error('Error editing course:', error);
            alert('An error has occurred, please refer to console.');
        }
    };


    return (


        <Form className="mb-3 border p-4 rounded " style={{ fontWeight: 600 }} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Course Faculty</Form.Label>
                    <Form.Control
                        name="faculty"
                        placeholder="e.g. COMPSCI"
                        value={formData.faculty}
                        disabled={true}

                    />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Course Code</Form.Label>
                    <Form.Control
                        name="courseCode"
                        placeholder="e.g. 225"
                        value={formData.courseCode}
                        disabled={true}
                        type="number"
                    />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Course Coordinator</Form.Label>
                    <Form.Control
                        name="coordinatorName"
                        placeholder="Name"
                        value={formData.coordinatorName}
                        disabled={true}
                    />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>⠀</Form.Label>
                    <Form.Control
                        name="coordinatorEmail"
                        placeholder="Email"
                        value={formData.coordinatorEmail}
                        disabled={true}
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
                        disabled={true}
                        type="number"
                    />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Semester</Form.Label>
                    <Form.Select
                        name="semester"
                        aria-label="Default select example"
                        value={formData.semester}
                        disabled={true}
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
                        disabled={true}
                    />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>⠀</Form.Label>
                    <Form.Control
                        name="directorEmail"
                        placeholder="Email"
                        value={formData.directorEmail}
                        disabled={true}
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
                    <Form.Label>Number of available marking hours</Form.Label>
                    <Form.Control
                        name="totalHours"
                        value={formData.totalHours}
                        onChange={handleChange}
                        type="number"
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
                    <Form.Label className='mx-2'>Applicant minimum grade</Form.Label>
                    <Form.Select
                        name="minGrade"
                        aria-label="Default select example"
                        value={formData.minGrade}
                        disabled={true}
                        className="mx-2"
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

            <Button variant="primary" type="submit">Confirm Changes</Button>
        </Form>

    );
}

export default CourseEdit

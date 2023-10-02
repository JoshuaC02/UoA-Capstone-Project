import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { DataStore } from '@aws-amplify/datastore';
import { MarkerApplication } from '../models';
import { useState, useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router';
import { Amplify, Auth, Storage } from 'aws-amplify';
import CourseData from '../hooks/CourseData';
import { Cart, Course, ApplicationStatus } from '../models';
import Card from 'react-bootstrap/Card';
import ReactCardFlip from "react-card-flip";
import '../styles/MarkerApplicationForm.css';
import MultiStepProgressBar from "./MultiStepProgressBar/MultiStepProgressBar";
import NavbarComp from '../components/NavbarComp';
import Sidebar from '../components/Sidebar';


function MarkerApplicationForm() {
    const { user } = useAuthenticator((context) => [context.user]);
    const { courses } = CourseData();
    const [outCourses, setCourses] = useState([]);
    const navigate = useNavigate();

    const ApplicationCard = ({course}) => {
        const [isFlipped, setIsFlipped] = useState(false);
        let appStatus = "No"
        if (course.appOpen) {appStatus = "Yes"}
        return (
          <div className="p-2" key={course.id}>
            <ReactCardFlip isFlipped={isFlipped}>
                <Card style={{ height:"620px", width:"250px" }} key="front">
                    <Card.Img style={{ width: "248px", height: "248px" }} variant="top" src={course.thumbnailId ? `https://capstone-project-team-12-storage-951c1da6205613-staging.s3.ap-southeast-2.amazonaws.com/public/${course.thumbnailId}` : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Computer_science_education.png/238px-Computer_science_education.png"} />
                    <Card.Body>
                    <Card.Title style={{ fontWeight:"bolder" }}>{course.name}</Card.Title>
                    <Card.Subtitle style={{ fontStyle:"italic" }}>
                        {course.coordinatorName}
                    </Card.Subtitle>
                    <Card.Text style={{ textOverflow:"ellipsis", whiteSpace:"nowrap", overflow:"hidden"}}>
                        {course.description}
                    </Card.Text>
                    <Button variant="secondary" onClick={() => setIsFlipped((prev) => !prev)}>See More</Button>{' '}
                    <Card.Text>Preference?</Card.Text>
                        <Form.Control
                                    name={course.faculty + course.courseCode + "_preference"}
                                    value={formData.courseSpecifics[course.faculty + course.courseCode + "_preference"]}
                                    onChange={handlePreferenceChange}
                                    type="number"
                                    id="preference"
                                />
                        <Card.Text>Previous Grade</Card.Text>
                        <Form.Control
                                    name={course.faculty + course.courseCode + "_previousGrade"}
                                    value={formData.courseSpecifics[course.faculty + course.courseCode + "_previousGrade"]}
                                    onChange={handleGradeChange}
                                    type="string"
                                    id="previousGrade"
                                />
                        <Card.Text>Previous Tutor?</Card.Text>
                        <Form.Check
                                    name={course.faculty + course.courseCode + "_previousTutor"}
                                    type="checkbox"
                                    id="previousTutor"
                                    checked={formData.courseSpecifics[course.faculty + course.courseCode + "_previousTutor"]}
                                    onChange={handlePreviousMarkerChange}
                                />
                    </Card.Body>
                </Card>

                <Card style={{ height:'620px', width: '250px'}} key="back">
                    <Card.Body>
                    <Card.Text>
                        Minimum Grade: {course.minGrade}
                    </Card.Text>
                    <Card.Text>
                        Estimated Hours: {course.totalHours}
                    </Card.Text>
                    <Card.Text>
                        Taking Applications: {course.appOpen ? 'Yes' : 'No'}
                    </Card.Text>
                    <Card.Text style={{ height:"199px", overflowY: "auto"}}>
                        Description: <br />
                        {course.summary}
                    </Card.Text>
                    <Button variant="secondary" onClick={() => setIsFlipped((prev) => !prev)}>See Less</Button>{' '}
                    <Card.Text>Preference?</Card.Text>
                        <Form.Control
                                    name={course.faculty + course.courseCode + "_preference"}
                                    value={formData.courseSpecifics[course.faculty + course.courseCode + "_preference"]}
                                    onChange={handlePreferenceChange}
                                    type="number"
                                    id="preference"
                                />
                        <Card.Text>Previous Grade</Card.Text>
                        <Form.Control
                                    name={course.faculty + course.courseCode + "_previousGrade"}
                                    value={formData.courseSpecifics[course.faculty + course.courseCode + "_previousGrade"]}
                                    onChange={handleGradeChange}
                                    type="string"
                                    id="previousGrade"
                                />
                        <Card.Text>Previous Tutor?</Card.Text>
                        <Form.Check
                                    name={course.faculty + course.courseCode + "_previousTutor"}
                                    type="checkbox"
                                    id="previousTutor"
                                    checked={formData.courseSpecifics[course.faculty + course.courseCode + "_previousTutor"]}
                                    onChange={handlePreviousMarkerChange}
                                />
                    </Card.Body>
                </Card>
            </ReactCardFlip>
          </div>
        )
      }

      async function getUserSelectedCourses() {
        const userCart = await DataStore.query(Cart, (c) => c.userId.eq(user.username));
        let listOfCourses = [];
        console.log("testing-- " + userCart);
        if (userCart[0] !== undefined) {
            const selectedCourses = userCart[0].selectedCourses?.split(",");
            const allCourses = await DataStore.query(Course)
            for (let element in selectedCourses) {
                for (let course in allCourses) {
                    console.log("all courses -  " + allCourses[course].faculty + allCourses[course].courseCode);
                    console.log("selected no trim -  " + selectedCourses[element]);
                    console.log("selected -  " + selectedCourses[element].trim().replace(/\s+/g, ''));
                    console.log(" ---------------- ");
                    if (allCourses[course].faculty + allCourses[course].courseCode === selectedCourses[element].trim().replace(/\s+/g, '')) {
                        listOfCourses.push(allCourses[course]);
                    }
                }
            }
        }

        return listOfCourses;
    }

    const [formData, setFormData] = useState({
        givenName: user?.attributes?.given_name,
        familyName: user?.attributes?.family_name,
        auid: '',
        upi: '',
        preferredEmail: user?.attributes?.email,
        overseas: false,
        validNzWorkPermit: false,
        degree: '',
        yearsOfStudy: '',
        underPostGrad: 'Undergraduate',
        currentTutor: false,
        maxHours: 0,
        transcriptId: '',
        cvId: '',
        courseSpecifics: {}
    });

    useEffect(() => {
        const fetchCourses = async () => {
            const fetchedCourses = await getUserSelectedCourses();
            /* 
            for (let course in fetchedCourses) {
                formData.courseSpecifics[fetchedCourses[course].faculty + fetchedCourses[course].courseCode + "_preference"] = "";
                formData.courseSpecifics[fetchedCourses[course].faculty + fetchedCourses[course].courseCode + "_previousGrade"] = "";
                formData.courseSpecifics[fetchedCourses[course].faculty + fetchedCourses[course].courseCode + "_previousTutor"] = false;
            }
            */
            setCourses(fetchedCourses);
        };

        fetchCourses();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handlePreferenceChange = async (e) => { 
        const { name, value } = e.target;
        formData.courseSpecifics[name] = parseInt(value);
    }

    const handleGradeChange = async (e) => {
        const { name, value } = e.target;
        formData.courseSpecifics[name] = value
    }

    const handlePreviousMarkerChange = async (e) => {
        const { name, value } = e.target;
        formData.courseSpecifics[name] = value
    }

    const handleCvChange = async (e) => {
        const file = e.target.files[0];
        if (file.type != "application/pdf") {
            alert("Your file has not been uploaded. This input only accepts '.pdf' file extensions.");
            return;
        }
        try {
            formData.cvId = (await Storage.put(file.name, file, {level: "protected"})).key;
            alert("File successfully uploaded!");
        } catch (error) {
            console.log("Error uploading cv: ", error);
        }
    }

    const handleTranscriptChange = async (e) => {
        const file = e.target.files[0];
        if (file.type != "application/pdf") {
            alert("Your file has not been uploaded. This input only accepts '.pdf' file extensions.");
            return;
        }
        try {
            formData.transcriptId = (await Storage.put(file.name, file, {level: "protected"})).key;
            alert("File successfully uploaded!");
        } catch (error) {
            console.log("Error uploading transcript: ", error);
        }
    }
//

        const handleSubmit = async (e) => {
            e.preventDefault();
            // Rest of your form data handling code...
        
            // Reformat the courseSpecifics data
            const reformattedCourseSpecifics = {};
            for (const key in formData.courseSpecifics) {
            const [courseCode, property] = key.split('_');
            if (!reformattedCourseSpecifics[courseCode]) {
                reformattedCourseSpecifics[courseCode] = [];
            }
            reformattedCourseSpecifics[courseCode].push({
                property: property,
                value: formData.courseSpecifics[key],
            });
            }

        try {

            await DataStore.save(
                new MarkerApplication({
                    givenName: formData.givenName,
                    familyName: formData.familyName,
                    userId: user?.username,
                    auid: formData.auid,
                    upi: formData.upi,
                    preferredEmail: formData.preferredEmail,
                    overseas: formData.overseas,
                    validNzWorkPermit: formData.validNzWorkPermit,
                    degree: formData.degree,
                    yearsOfStudy: formData.yearsOfStudy, 
                    underPostGrad: formData.underPostGrad, 
                    currentTutor: formData.currentTutor,
                    maxHours: parseInt(formData.maxHours),
                    transcriptId: formData.transcriptId, 
                    cvId: formData.cvId, 
                    courseSpecifics: JSON.stringify(reformattedCourseSpecifics)
                })
            );
            addCheckOut(outCourses, user.username);
            alert('Application successfully submitted.');
            navigate("/application-status", { replace: true })
        } catch (error) {
            console.error('Error submitting application:', error);
            alert(error)
            alert('An error has occurred, please refer to console.');
        }
    };

    const [step, setStep] = useState(1);
    
    const nextPageNumber = (pageNumber) => {
        switch (pageNumber) {
          case "1":
            break;
          case "2":
            break;
          case "3":
            break;
        }
      };
    const handleNext = () => {
        setStep(step + 1);
      };
    
      const handlePrevious = () => {
        setStep(step - 1);
      };
    async function addCheckOut(outCourses, userId) {
        let flag = true;
        if (outCourses.length !== 0) {
            try {
                for (const course of outCourses) {
                await DataStore.save(new ApplicationStatus({
                    userId: userId,
                    appliedCourses: course.faculty + " " + course.courseCode,
                }));
            }
            } catch (error) {
                flag = false;
            }
        }
        if(flag){
            deleteAllSelectedCourses();
        }
        else{
            alert("Error Submitting the form");
        }
    }
    async function deleteAllSelectedCourses (){
        const userCart = await DataStore.query(Cart, (c) => c.userId.eq(user.username));
        const selectedCourses = userCart[0].selectedCourses?.split(",") || [];

        try{
            await DataStore.delete(userCart[0]);
        }catch(e){
            alert("Error removing selected courses from cart")
        }
    }


    return (
        <>
        <div className="page-container">
        <NavbarComp />
        <div className="content">
            <Sidebar />
            <Form className="p-4 rounded" style={{ fontWeight: 600, width: '100%', height: '100%' }} onSubmit={handleSubmit}>
            <MultiStepProgressBar step={step.toString()} onPageNumberClick={nextPageNumber} />
                {step === 1 && (
                <div>

                    <Row className="mb-3">
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload your transcript:</Form.Label>
                            <Form.Control 
                                type="file"
                                name="transcript"
                                onChange={handleTranscriptChange}
                                accept="application/pdf"
                            />
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload your CV:</Form.Label>
                            <Form.Control 
                                type="file" 
                                name="cv"
                                onChange={handleCvChange}
                                accept="application/pdf"
                            />
                        </Form.Group>
                    </Row>
                    
                    <button className="next-button" type="button" onClick={handleNext}>Next</button>
                </div>
                )}

                {step === 2 && (
                <div>

                    <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Given Name</Form.Label>
                        <Form.Control
                            name="givenName"
                            placeholder="John"
                            value={formData.givenName}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Family Name</Form.Label>
                        <Form.Control
                            name="familyName"
                            placeholder="Doe"
                            value={formData.familyName}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Auckland University ID (AUID)</Form.Label>
                        <Form.Control
                            name="auid"
                            placeholder="e.g. 123456789"
                            value={formData.auid}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>University Username (UPI)</Form.Label>
                        <Form.Control
                            name="upi"
                            placeholder="e.g. tuoa001"
                            value={formData.upi}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Contact Email:</Form.Label>
                        <Form.Control
                            name="preferredEmail"
                            value={formData.preferredEmail}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Are you currently overseas?</Form.Label>
                        <Form.Check
                            type="checkbox"
                            id="overseas"
                            checked={formData.overseas}
                            onChange={handleChange}
                            name="overseas"
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Are you legally allowed to work in New Zealand (Resident or Work Permit)</Form.Label>
                        <Form.Check
                            type="checkbox"
                            id="validNzWorkPermit"
                            checked={formData.validNzWorkPermit}
                            onChange={handleChange}
                            name="validNzWorkPermit"
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>What degree are you studying?</Form.Label>
                        <Form.Control
                            name="degree"
                            placeholder="e.g. Bachelor of Science, Major in Computer Science"
                            value={formData.degree}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>How long have you been studying?</Form.Label>
                        <Form.Control
                            name="yearsOfStudy"
                            placeholder="e.g. 2 years"
                            value={formData.yearsOfStudy}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} className="d-flex align-items-center">
                        <Form.Label>Are you an Undergraduate or Postgraduate student?</Form.Label>
                        <Form.Select
                            name="underPostGrad"
                            aria-label="Default select example"
                            value={formData.underPostGrad}
                            onChange={handleChange}
                        >
                            <option value="Undergraduate">Undergraduate</option>
                            <option value="Postgraduate">Postgraduate</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} className="d-flex align-items-center">
                        <Form.Label>Are you currently contracted as a tutor?</Form.Label>
                        <Form.Check
                            type="checkbox"
                            id="currentTutor"
                            checked={formData.currentTutor}
                            onChange={handleChange}
                            name="currentTutor"
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} className="d-flex align-items-center">
                        <Form.Label>How many hours can you work this Semester?</Form.Label>
                        <Form.Control
                            name="maxHours"
                            value={formData.maxHours}
                            onChange={handleChange}
                            type="number"
                        />
                    </Form.Group>

                </Row>
                    <button className="previous-button" type="button" onClick={handlePrevious}>Previous</button>
                    <button className="next-button" type="button" onClick={handleNext}>Next</button>
                </div>
                )}

                {step === 3 && (
                <div>

                <Row>
                <div className="grid-container">
                    <div className="courses">
                        {outCourses.map(course => (
                            <ApplicationCard key={course.id} course={course} user={user}/>
                        ))}
                    </div>
                </div>
                </Row>
                <button className="previous-button" type="button" onClick={handlePrevious}>Previous</button>
                <Button className="next-button " variant="primary" type="submit">Submit</Button>
                </div>
                )}
            </Form>
            </div>
            </div>
        </>
    );
}

export default MarkerApplicationForm

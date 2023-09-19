import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { DataStore } from '@aws-amplify/datastore';
import { MarkerApplication } from '../models';
import { useState } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Amplify, Auth, Storage } from 'aws-amplify';

function MarkerApplicationForm() {
    const { user } = useAuthenticator((context) => [context.user]);
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
        underPostGrad: '',
        currentTutor: false,
        maxHours: 0,
        transcriptId: '',
        cvId: '',
        prefRating: '1, 2, 3'
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCvChange = async (e) => {
        const file = e.target.files[0];
        try {
            formData.cvId = (await Storage.put(file.name, file, {level: "protected"})).key;
        } catch (error) {
            console.log("Error uploading cv: ", error);
        }
    }

    const handleTranscriptChange = async (e) => {
        const file = e.target.files[0];
        try {
            formData.transcriptId = (await Storage.put(file.name, file, {level: "protected"})).key;
        } catch (error) {
            console.log("Error uploading transcript: ", error);
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        for (const key in formData) {
            if (formData[key] == '') {
                alert(`Please fill in all fields (no empty fields are allowed).`);
                return;
            }
        }

        try {

            await DataStore.save(
                new MarkerApplication({
                    givenName: formData.givenName,
                    givenName: formData.familyName,
                    familyName: user?.attributes?.familyName,
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
                    prefRating: formData.prefRating
                })
            );
            alert('Application successfully submitted.');
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('An error has occurred, please refer to console.');
        }
    };


    return (
        <>

            <Form className="border p-4 rounded " style={{ fontWeight: 600 }} onSubmit={handleSubmit}>
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

                <Row className="mb-3">
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload your transcript:</Form.Label>
                        <Form.Control 
                            type="file"
                            name="transcript"
                            onChange={handleTranscriptChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload your CV:</Form.Label>
                        <Form.Control 
                            type="file" 
                            name="cv"
                            onChange={handleCvChange}
                        />
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </>
    );
}

export default MarkerApplicationForm

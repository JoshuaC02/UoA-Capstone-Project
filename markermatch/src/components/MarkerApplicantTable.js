//https://docs.amplify.aws/lib/datastore/data-access/q/platform/js/#query-data

import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { MarkerApplication } from '../models';
import { Course } from '../models';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router';
import { isEmpty } from '@aws-amplify/core';

function MarkerApplicantTable() {
    const navigate = useNavigate();
    const [applicants, setApplicants] = useState([]);
    const [searchedCourse, setSearchedCourse] = useState("");
    const [isPreferred, setPreferred] = useState(false);
    const { user } = useAuthenticator((context) => [context.user]);

    async function changePreferred(applicationUserId, applicationPreferred) {
        const selectedApplication = await DataStore.query(MarkerApplication, (c) => c.userId.eq(applicationUserId));
        
        const updatedCart = await DataStore.save(
            MarkerApplication.copyOf(selectedApplication[0], updated => {
                updated.preferredMarker = !applicationPreferred
            })
        );
    }
    /*
    async function getAllApplications() {
        const allMarkerApplications = await DataStore.query(MarkerApplication, (c) => c.familyName.eq("Test"));
        return allMarkerApplications;
    }
    useEffect(() => {
        const fetchApplications = async () => {
            const fetchedApplications = await getAllApplications();
            setApplicants(fetchedApplications);
        };
        fetchApplications();
    }, []);
    */
    async function getApplicationsByCourse(selectedCourse) {
        const selectedMarkerApplications = await DataStore.query(MarkerApplication, (c) => c.courseSpecifics.contains(selectedCourse));
        return selectedMarkerApplications;
    }
    
    useEffect(() => {
        const fetchApplications = async () => {
            const fetchedApplications = await getApplicationsByCourse(searchedCourse);
            setApplicants(fetchedApplications);
        };
        fetchApplications();
    }, [searchedCourse]);
    
    
    async function updateSelectedCourses(text) {
        setSearchedCourse(text);
    }
    return (
        <>
            <div className="grid-container">
                <div className="shopping-cart">
                <div>
                    <input type='text' placeholder='Course' id="courseSearchField"></input>
                    <button onClick={() => updateSelectedCourses(document.getElementById("courseSearchField").value)} >Search</button>

                </div>
                    <table className="styled-table">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Previous Grade</th>
                                <th>Availability (hours per week)</th>
                                <th>Undergrad or Postgrad</th>
                                <th>Preferred Applicant</th>
                            </tr>
                            {applicants.length > 0 ? (
                                applicants.map(application => (
                                    <tr key={application.auid}>
                                        <td>{application.givenName}</td>
                                        <td>{"A+"}</td>
                                        <td>{application.maxHours}</td>
                                        <td>{application.underPostGrad}</td>
                                        <td>
                                            <input type="checkbox"
                                                id="preferred-checkbox"
                                                onClick={() => changePreferred(application.userId, application.preferredMarker)}
                                            />
                                            
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">
                                        <p style={{ textAlign: 'center' }}>No applicants.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default MarkerApplicantTable;

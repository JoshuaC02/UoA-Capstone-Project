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
    const { user } = useAuthenticator((context) => [context.user]);

    /*async function getApplicationsByCourse() {
        const allMarkerApplications = await DataStore.query(MarkerApplication, (c) => c.courseSpecifics.eq(user.username));
        let listOfCourses = [];
        if (userCart[0] !== undefined) {
            const selectedCourses = userCart[0].selectedCourses?.split(",");
            for (let element in selectedCourses) {
                let application = await DataStore.query(MarkerApplication, (c) => c.name.eq(selectedCourses[element].trim()))
                listOfCourses.push(application[0]);
            }
        }

        return listOfCourses;
    }

    useEffect(() => {
        const fetchCourses = async () => {
            const fetchedCourses = await getApplicationsByCourse();
            setApplicants(fetchedCourses);
        };

        fetchCourses();
    }, []); */
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
    return (
        <>
            <div className="grid-container">
                <div className="shopping-cart">
                    <table className="styled-table">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Overseas</th>
                                <th>Availability (hours per week)</th>
                                <th>Undergrad or Postgrad</th>
                            </tr>
                            {applicants.length > 0 ? (
                                applicants.map(application => (
                                    <tr key={application.auid}>
                                        <td>{application.givenName}</td>
                                        <td>{application.overseas.toString()}</td>
                                        <td>{application.maxHours}</td>
                                        <td>{application.underPostGrad}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">
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

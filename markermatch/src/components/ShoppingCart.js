//https://docs.amplify.aws/lib/datastore/data-access/q/platform/js/#query-data

import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Cart } from '../models';
import { Course } from '../models';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router';
import { isEmpty } from '@aws-amplify/core';

function ShoppingCart() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const { user } = useAuthenticator((context) => [context.user]);

    async function getUserSelectedCourses() {
        const userCart = await DataStore.query(Cart, (c) => c.userId.eq(user.username));
        let listOfCourses = [];
        if (userCart[0] !== undefined) {
            const selectedCourses = userCart[0].selectedCourses?.split(",");
            const allCourses = await DataStore.query(Course)
            for (let element in selectedCourses) {
                for (let course in allCourses) {
                    if (allCourses[course].faculty + allCourses[course].courseCode == selectedCourses[element].trim()) {
                        listOfCourses.push(allCourses[course]);
                    }
                }
            }
        }
        return listOfCourses;
    }
    async function deleteUserSelectedCourse(courseId, userId) {

        const userCart = await DataStore.query(Cart, (c) => c.userId.eq(userId));
        const courseRemoved = courseId.trim();
        let selectedCourses = userCart[0].selectedCourses?.split(",");
        for (let element in selectedCourses) {
            if (selectedCourses[element].trim()=== courseId) {
                if (parseInt(element)=== selectedCourses.length - 1) {
                    selectedCourses.pop()
                } else {
                    selectedCourses = selectedCourses.slice(0, element) + selectedCourses.slice(element + 1)
                }
            }
        }
        if (selectedCourses.length=== 0) {
            await DataStore.delete(userCart[0]);
        }
        const updatedCart = await DataStore.save(
            Cart.copyOf(userCart[0], updated => {
                updated.selectedCourses = selectedCourses.toString()
            })
        );

        const newCourses = courses.filter(course => course.name !== courseRemoved);
        alert(courseRemoved + ' has been removed from your cart.')
        setCourses(newCourses);
    }

    useEffect(() => {
        const fetchCourses = async () => {
            const fetchedCourses = await getUserSelectedCourses();
            setCourses(fetchedCourses);
        };

        fetchCourses();
    }, []);

    return (
        <>
            <div className="grid-container">
                <div className="shopping-cart">
                    <table className="styled-table">
                        <tbody>
                            <tr>
                                <th>Course Name</th>
                                <th>Summary</th>
                                <th>Instructor</th>
                                <th>Remove</th>
                            </tr>
                            {courses.length > 0 ? (
                                courses.map(course => (
                                    <tr key={course.id}>
                                        <td>{course.faculty} {course.courseCode}</td>
                                        <td>{course.summary}</td>
                                        <td>{course.directorName}</td>
                                        <td>
                                            <button
                                                id="remove-button"
                                                onClick={() => deleteUserSelectedCourse(course.faculty + course.courseCode, user.username)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">
                                        <p style={{ textAlign: 'center' }}>No courses in your cart.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div id="checkout-button"><a href="/application-form">Checkout!</a></div>
            </div>
        </>
    );
}

export default ShoppingCart;
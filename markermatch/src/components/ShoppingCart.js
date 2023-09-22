//https://docs.amplify.aws/lib/datastore/data-access/q/platform/js/#query-data

import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Cart } from '../models';
import { Course } from '../models';
import { ApplicationStatus } from '../models';
import { Alert, useAuthenticator } from '@aws-amplify/ui-react';

function ShoppingCart() {
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

    const checkOut = (courses, userId) => {
        addCheckOut(courses, userId);
    }

    async function addCheckOut(courses, userId) {
        let flag = true;
        if (courses.length !== 0) {
            try {
                for (const course of courses) {
                await DataStore.save(new ApplicationStatus({
                    userId: userId,
                    appliedCourses: course.name,
                }));
            }
            } catch (error) {
                flag = false;
            }
        }
        if(flag){
            try{
                for (const course of courses){
                    deleteUserSelectedCourse(course.name, userId)
                }
                
            }catch(error){
                alert("Error checking out");      
            }
            alert("Successfully checked out");
        }
        else{
          alert("Error checking out");
        }
    }
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
                <div id="checkout-button" onClick={() => checkOut(courses, user?.username)} >Checkout!</div>
            </div>
        </>
    );
}

export default ShoppingCart;
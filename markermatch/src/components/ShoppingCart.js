//https://docs.amplify.aws/lib/datastore/data-access/q/platform/js/#query-data

import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Cart } from '../models';
import { Course } from '../models';
import { ApplicationStatus } from '../models';
import { useAuthenticator } from '@aws-amplify/ui-react';

function ShoppingCart() {
    const [courses, setCourses] = useState([]);
    const { user } = useAuthenticator((context) => [context.user]);

    async function getUserSelectedCourses() {
        const userCart = await DataStore.query(Cart, (c) => c.userId.eq(user.username));
        let listOfCourses = [];
        if (userCart[0] !== undefined) {
            const selectedCourses = userCart[0].selectedCourses?.split(",");
            for (let element in selectedCourses) {
                let course = await DataStore.query(Course, (c) => c.name.eq(selectedCourses[element].trim()))
                listOfCourses.push(course[0]);
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
        // console.log(courses);
        // const models = await DataStore.query(Cart, (c) => c.userId.eq(userId));
        // if (models.length !== 0){
        //     let flag = false;
        //     const list = models[0].selectedCourses.split(",");

        //     const updatedCourses = models[0].selectedCourses + ", ";
        //     // await DataStore.save(
        //     //   Cart.copyOf(models[0], updated => {
        //     //     updated.selectedCourses = updatedCourses
        //     //   })
        //     //   );
        // }
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
                                        <td>{course.name}</td>
                                        <td>{course.summary}</td>
                                        <td>{course.instructor}</td>
                                        <td>
                                            <button
                                                id="remove-button"
                                                onClick={() => deleteUserSelectedCourse(course.name, user.username)}
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
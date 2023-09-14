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
    const [courses, selectedCourses] = useState([]);
    const { user } = useAuthenticator((context) => [context.user]);

    async function getUserSelectedCourses() {
        const userCart = await DataStore.query(Cart, (c) => c.userId.eq(user.username));
        let listOfCourses = [];
        if (userCart[0] != undefined){
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
        let selectedCourses = userCart[0].selectedCourses?.split(",");
        for (let element in selectedCourses) {
            if (selectedCourses[element].trim() == courseId) {
                if (parseInt(element) == selectedCourses.length-1) {
                    selectedCourses.pop()
                }else {
                    selectedCourses = selectedCourses.slice(0, element) + selectedCourses.slice(element + 1)
                }
            }
        }
        if (selectedCourses.length == 0) {
            await DataStore.delete(userCart[0]);
        }
        const updatedCart = await DataStore.save(
            Cart.copyOf(userCart[0], updated => {
                updated.selectedCourses = selectedCourses.toString()
            })
        );
    }

    useEffect(() => {
        const fetchCourses = async () => {
          const fetchedCourses = await getUserSelectedCourses();
          selectedCourses(fetchedCourses);
        };
    
        fetchCourses();
    }, []);

    return (
        <>
          <div className="shopping-cart">
            <table>
                <tr>
                    <th>
                        course.name
                    </th>
                    <th>
                        course.summary
                    </th>
                    <th>
                        course.instructor
                    </th>
                    <th>
                        Remove?
                    </th>
                </tr>
                {courses.map(course => (
                    <tr>
                        <td>
                            {course.name}
                        </td>
                        <td>
                            {course.summary}
                        </td>
                        <td>
                            {course.instructor}
                        </td>
                        <td>
                            <a onClick={() => deleteUserSelectedCourse(course.name, user.username)}>Delete</a>
                        </td>
                    </tr>
                ))}
            </table>
          </div>
          <footer>
            Checkout!
          </footer>
        </>
      );
}

export default ShoppingCart;
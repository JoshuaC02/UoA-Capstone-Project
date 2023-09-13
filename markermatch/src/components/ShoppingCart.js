//https://docs.amplify.aws/lib/datastore/data-access/q/platform/js/#query-data

import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Cart } from '../models';
import { Course } from '../models';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router';

function ShoppingCart() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const { user } = useAuthenticator((context) => [context.user]);

    function getUserSelectedCourses() {

    }

    function deleteUserSelectedCourse(userId, courseId) {

    }

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
                            Delete
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
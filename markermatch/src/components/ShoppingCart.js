//https://docs.amplify.aws/lib/datastore/data-access/q/platform/js/#query-data

import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Cart } from '../models';
import { Course } from '../models';
import { ApplicationStatus } from '../models';
import { Alert, useAuthenticator } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ReactCardFlip from "react-card-flip";


function ShoppingCart() {
    const [courses, setCourses] = useState([]);
    const { user } = useAuthenticator((context) => [context.user]);
    const navigate = useNavigate();
    
    async function getUserSelectedCourses() {
        const userCart = await DataStore.query(Cart, (c) => c.userId.eq(user.username));

        let listOfCourses = [];
        if (userCart[0] !== undefined) {
            const selectedCourses = userCart[0].selectedCourses?.split(",");
            const allCourses = await DataStore.query(Course)
            for (let element in selectedCourses) {
                for (let course in allCourses) {
                    if (allCourses[course].faculty + ' ' + allCourses[course].courseCode == selectedCourses[element].trim()) {
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
        let modifiedCourses = []
        for (let element in selectedCourses) {
            if (selectedCourses[parseInt(element)].trim() === courseId) {
                if (parseInt(element) === selectedCourses.length - 1) {
                    selectedCourses.pop()
                    modifiedCourses = selectedCourses
                } else {
                    modifiedCourses = selectedCourses.slice(0, parseInt(element)).concat(selectedCourses.slice(parseInt(element)+1))
                }
            }
        }
        if (selectedCourses.length=== 0) {
            await DataStore.delete(userCart[0]);
        }
        const updatedCart = await DataStore.save(
            Cart.copyOf(userCart[0], updated => {
                updated.selectedCourses = modifiedCourses.toString()
            })
        );

        const newCourses = courses.filter(course => course.name !== courseRemoved);
        alert(courseRemoved + ' has been removed from your cart.')
        setCourses(newCourses);
    }

    const CourseCardCart = ({course, user}) => {
        const [isFlipped, setIsFlipped] = useState(false);
        let appStatus = "No"
        if (course.appOpen) {appStatus = "Yes"}
        return (
          <div className="p-2" key={course.id}>
            <ReactCardFlip isFlipped={isFlipped}>
              <Card style={{ width: '18rem'}} key="front">
                <Card.Img style={{ height: "200px" }} variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Computer_science_education.png/238px-Computer_science_education.png" />
                <Card.Body>
                  <Card.Title>{course.faculty + '' + course.courseCode}</Card.Title>
                  <Card.Text>
                    {course.coordinatorName}
                  </Card.Text>
                  <Card.Text>
                    {course.description}
                  </Card.Text>
                  <Button variant="secondary" onClick={() => setIsFlipped((prev) => !prev)}>See More</Button>{' '}
                  <Button variant="primary" style={{ backgroundColor: "#FF0000" }} onClick={() => deleteUserSelectedCourse(course.faculty + " " + course.courseCode, user?.username)}>Remove from cart</Button>
                </Card.Body>
              </Card>
    
              <Card style={{ width: '18rem'}} key="back">
                <Card.Body>
                  <Card.Text>
                    Minimum Grade: {course.minGrade}
                  </Card.Text>
                  <Card.Text>
                    Estimated Hours: {course.totalHours}
                  </Card.Text>
                  <Card.Text>
                    Taking Applications: {course.appOpen}
                  </Card.Text>
                  <Card.Text style={{height:"176px", overflow:"scroll"}}>
                    Description: <br />
                    {course.summary}
                  </Card.Text>
                  <Button variant="secondary" onClick={() => setIsFlipped((prev) => !prev)}>See More</Button>{' '}
                  <Button variant="primary" style={{ backgroundColor: "#FF0000" }} onClick={() => deleteUserSelectedCourse(course.faculty + " " + course.courseCode, user?.username)}>Remove from cart</Button>
                </Card.Body>
              </Card>
            </ReactCardFlip>
          </div>
        )
      }

    useEffect(() => {
        const fetchCourses = async () => {
            const fetchedCourses = await getUserSelectedCourses();

            setCourses(fetchedCourses);
        };

        fetchCourses();
    }, []);

    const handleCartSubmission = () => {
        if (courses.length == 0){
            alert('There are no courses in your cart!')
        }
        navigate("/application-form", { replace: true });
    }

    return (
        <>
            <div className="grid-container">
                <div className="shopping-cart">
                    <div className="courses">
                        {courses.map(course => (
                            <CourseCardCart course={course} user={user}/>
                        ))}
                    </div>
                </div>
                <div id="checkout-button"><button onClick={handleCartSubmission}>Checkout!</button></div>
            </div>
        </>
    );
}

export default ShoppingCart;
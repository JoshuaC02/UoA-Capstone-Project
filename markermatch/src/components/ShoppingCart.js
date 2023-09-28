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
                    if (allCourses[course].name == selectedCourses[element].trim()) {
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
              <Card style={{ height:"400px", width:"250px" }} key="front">
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
                  <Button variant="primary" style={{ backgroundColor: "#FF0000" }} onClick={() => deleteUserSelectedCourse(course.faculty + " " + course.courseCode, user?.username)}>Remove</Button>
                </Card.Body>
              </Card>

              <Card style={{ height:'400px', width: '250px'}} key="back">
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
                  <Card.Text style={{ height:"199px", overflowY: "scroll"}}>
                    Description: <br />
                    {course.summary}
                  </Card.Text>
                  <Button variant="secondary" onClick={() => setIsFlipped((prev) => !prev)}>See Less</Button>{' '}
                  <Button variant="primary" style={{ backgroundColor: "#FF0000" }} onClick={() => deleteUserSelectedCourse(course.faculty + " " + course.courseCode, user?.username)}>Remove</Button>
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
            navigate("/", { replace: true });
            return;
        }
        navigate("/application-form", { replace: true });
    }

    return (
        <>
            <div className="grid-container">
                <div className="shopping-cart">
                  {courses.length != 0 ? (
                      <>
                        <div className="courses">
                          {courses.map(course => (
                              <CourseCardCart course={course} user={user}/>
                          ))}
                        </div>
                        
                      </>
                    ) : (<><h2>No Courses in Cart</h2><a href="/"><h4>Return Home</h4></a></>) }
                </div>
                {courses.length != 0 ? (<div id="checkout-button"><button onClick={handleCartSubmission}>Checkout!</button></div>) : (null)}
                
            </div>
        </>
    );
}

export default ShoppingCart;
import CourseForm from "../components/CourseForm";
import NavbarComp from "../components/NavbarComp";
import Sidebar from "../components/Sidebar";
import CourseEdit from "../components/CourseEdit";
import { DataStore } from '@aws-amplify/datastore';
import { useState, useEffect } from 'react';
import { Course } from '../models';
import { useAuthenticator } from '@aws-amplify/ui-react';

function EditCourses() {
    const { user } = useAuthenticator((context) => [context.user]);
    const [courses, setCourses] = useState([]);
    const [editingCourse, setEditingCourse] = useState(null);

    const userEmail = user?.getSignInUserSession()?.getIdToken()?.payload["email"];

    useEffect(() => {
        const fetchCourses = async () => {
            const courses = await DataStore.query(Course, (c) => c.coordinatorEmail.eq(userEmail));
            setCourses(courses);
        };

        fetchCourses();
    }, []);


    return (
        <>
            <NavbarComp />
            <div className="homepage-container">
                <div className="content-container">
                    <Sidebar />
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h1 className="mb-4">Current courses you coordinate:</h1>

                                {courses.map(course => (
                                    <div key={course.id}>
                                        {editingCourse === course.id ? (
                                            <CourseEdit course={course} />
                                        ) : (
                                            <div className="mb-3">
                                                <div className="card">
                                                    <div className="card-body d-flex justify-content-between">
                                                        <div>
                                                            <h5 className="card-title">{course.name}</h5>
                                                        </div>
                                                        <button className="btn btn-primary" onClick={() => setEditingCourse(course.id)}>Edit Course</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default EditCourses




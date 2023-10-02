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

    const userEmail = user?.getSignInUserSession()?.getIdToken()?.payload["email"];

    // console.log(user?.getSignInUserSession()?.getIdToken()?.payload["email"])

    useEffect(() => {
        const fetchCourses = async () => {
            const courses = await DataStore.query(Course, (c) => c.coordinatorEmail.eq(userEmail));
            // console.log(courses)
            setCourses(courses);
        };

        fetchCourses();
    }, []);



    const fetchCoordCourses = () => {

    }


    return (
        <>
            <NavbarComp />
            <div className="homepage-container">
                <div className="content-container">
                    <Sidebar />


                    {courses.map(course => (
                        <div key={course.id}>
       
                            <p>{course.name}</p>
   
                        </div>
                    ))}
                    </div>
            </div>
        </>
    );
}

export default EditCourses

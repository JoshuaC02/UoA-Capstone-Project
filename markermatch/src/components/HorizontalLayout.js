import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CourseData from '../hooks/CourseData';
import { useAuthenticator } from '@aws-amplify/ui-react';

function HorizontalLayout() {
  const { courses, searchTerm, handleSearch, addCourseToCart } = CourseData();
  const { user } = useAuthenticator((context) => [context.user]);

  return (
    <>
      <div className="grid-container">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={e => handleSearch(e.target.value)}
                className="search-bar"
              />          
        </div>
        <div className="courses">
          {courses.map(course => (
            <div className="p-2" key={course.id}>
              <Card style={{ width: '18rem'}}>
                <Card.Img style={{ height: "200px" }} variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Computer_science_education.png/238px-Computer_science_education.png" />
                <Card.Body>
                  <Card.Title>{course.name}</Card.Title>
                  <Card.Text>
                    {course.summary}
                  </Card.Text>
                  <Card.Text>
                    {course.instructor}
                  </Card.Text>
                  <Button variant="primary" style={{ backgroundColor: "#005DFF" }} onClick={() => addCourseToCart(course.name, user?.username)}>Add to Cart</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
        
      </div>
    </>
  );
}

export default HorizontalLayout;

import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Cart } from './models';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function getCourseData() {
  return fetch(`http://localhost:3030/courses`)
    .then(response => response.json())
    .then(data => data);
}

function addToCart() {

}

function HorizontalLayout() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const fetchedCourses = await getCourseData();
      setCourses(fetchedCourses);
      setAllCourses(fetchedCourses);
    };

    fetchCourses();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);

    if (term.trim() === '') {
      setCourses(allCourses);
      return;
    }

    const filteredCourses = allCourses.filter(course =>
      course.courseName.toLowerCase().includes(term.toLowerCase())
    );

    setCourses(filteredCourses);
  }

  return (
    <>
      <div className="content-containers">
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
                  <Card.Title>{course.courseName}</Card.Title>
                  <Card.Text>
                    {course.summary}
                  </Card.Text>
                  <Card.Text>
                    {course.instructor}
                  </Card.Text>
                  <Button variant="primary" style={{ backgroundColor: "#005DFF" }}>Add to Cart</Button>
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

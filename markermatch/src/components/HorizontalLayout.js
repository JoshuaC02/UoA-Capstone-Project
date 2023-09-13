//https://docs.amplify.aws/lib/datastore/data-access/q/platform/js/#query-data

import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Cart } from '../models';
import { Course } from '../models';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router';



async function getCourseData() {
  return DataStore.query(Course);
}

function HorizontalLayout() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [allCourses, setAllCourses] = useState([]);
  const { user } = useAuthenticator((context) => [context.user]);

  async function addToCart(courseId, userId) {
    if (userId === undefined) {
      navigate("/auth", { replace: true });
    } else {
      const models = await DataStore.query(Cart, (c) => c.userId.eq(userId));
      if (models.length === 0) {
        DataStore.save(new Cart({
          userId: userId,
          selectedCourses: courseId
        }))
        alert("Added " + courseId + " to cart!");
      }else {
        let flag = false;
        const list = models[0].selectedCourses.split(",")
        for (const int in list) {
          if (list[parseInt(int)].trim() === courseId) {
            flag = true;
          }
        }
        if (!flag) {
          const updatedCourses = models[0].selectedCourses + ", " + courseId;
          const updatedPost = await DataStore.save(
            Cart.copyOf(models[0], updated => {
              updated.selectedCourses = updatedCourses
            })
          );
          alert("Added " + courseId + " to cart!");
        } else {
          alert(courseId + " already in cart!");
        }
      }
    }
  }

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
      course.name.toLowerCase().includes(term.toLowerCase())
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
                  <Card.Title>{course.name}</Card.Title>
                  <Card.Text>
                    {course.summary}
                  </Card.Text>
                  <Card.Text>
                    {course.instructor}
                  </Card.Text>
                  <Button variant="primary" style={{ backgroundColor: "#005DFF" }} onClick={() => addToCart(course.name, user?.username)}>Add to Cart</Button>
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

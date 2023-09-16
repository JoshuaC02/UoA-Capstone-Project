import { useEffect, useState } from 'react';
import { getCourseData, filterCourses, addToCart } from '../helperFunctions/HorizontalHelper';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ReactCardFlip from "react-card-flip";


function CourseData() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [allCourses, setAllCourses] = useState([]);
  const navigate = useNavigate(); 

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
    const filteredCourses = filterCourses(allCourses, term);
    setCourses(filteredCourses);
  }

  const addCourseToCart = (courseId, userId) => {
    addToCart(courseId, userId, navigate)
  }

  const CourseCard = ({course, user}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    let appStatus = "No"
    if (course.appOpen) {appStatus = "Yes"}
    return (
      <div className="p-2" key={course.id}>
        <ReactCardFlip isFlipped={isFlipped}>
          <Card style={{ width: '18rem'}} key="front">
            <Card.Img style={{ height: "200px" }} variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Computer_science_education.png/238px-Computer_science_education.png" />
            <Card.Body>
              <Card.Title>{course.name}</Card.Title>
              <Card.Text>
                {course.summary}
              </Card.Text>
              <Card.Text>
                {course.instructor}
              </Card.Text>
              <Button variant="secondary" onClick={() => setIsFlipped((prev) => !prev)}>See More</Button>{' '}
              <Button variant="primary" style={{ backgroundColor: "#005DFF" }} onClick={() => addCourseToCart(course.name, user?.username)}>Add to Cart</Button>
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
                Taking Applications: {appStatus}
              </Card.Text>
              <Card.Text style={{height:"176px", overflow:"scroll"}}>
                Description: <br />
                {course.desc}
              </Card.Text>
              <Button variant="secondary" onClick={() => setIsFlipped((prev) => !prev)}>See More</Button>{' '}
              <Button variant="primary" style={{ backgroundColor: "#005DFF" }} onClick={() => addCourseToCart(course.name, user?.username)}>Add to Cart</Button>
            </Card.Body>
          </Card>
        </ReactCardFlip>
      </div>
    )
  }

  return {
    courses,
    searchTerm,
    handleSearch,
    CourseCard
  };
}

export default CourseData;
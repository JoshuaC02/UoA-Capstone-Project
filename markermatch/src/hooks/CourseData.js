import { useEffect, useState } from 'react';
import { getCourseData, filterCourses, addToCart } from '../helperFunctions/HorizontalHelper';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ReactCardFlip from "react-card-flip";
import { DataStore } from '@aws-amplify/datastore';



function CourseData() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [allCourses, setAllCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const fetchedCourses = await getCourseData();
      console.log(fetchedCourses)
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

  const CourseCard = ({ course, user }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    let appStatus = "No"
    if (course.appOpen) { appStatus = "Yes" }
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
              <Button variant="primary" style={{ backgroundColor: "#005DFF" }} onClick={() => addCourseToCart(course.name, user?.username)}>Add to Cart</Button>
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
              <Card.Text style={{ height:"199px", overflowY: "auto"}}>
                Description: <br />
                {course.summary}
              </Card.Text>
              <Button variant="secondary" onClick={() => setIsFlipped((prev) => !prev)}>See Less</Button>{' '}
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

export default CourseData; //"55.5%"
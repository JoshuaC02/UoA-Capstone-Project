import { useEffect, useState } from 'react';
import { getCourseData, filterCourses, addToCart } from '../helperFunctions/HorizontalHelper';
import { useNavigate } from 'react-router-dom';

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

  return {
    courses,
    searchTerm,
    handleSearch,
    addCourseToCart
  };
}

export default CourseData;
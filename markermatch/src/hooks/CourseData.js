import { useEffect, useState } from 'react';
import { getCourseData, filterCourses, addToCart } from '../helperFunctions/HorizontalHelper';

function CourseData() {
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
    const filteredCourses = filterCourses(allCourses, term);
    setCourses(filteredCourses);
  }

  const addCourseToCart = (courseId, userId) => {
    addToCart(courseId, userId)
  }

  return {
    courses,
    searchTerm,
    handleSearch,
    addCourseToCart
  };
}

export default CourseData;
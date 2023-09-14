export async function getCourseData() {
    try {
      const response = await fetch(`http://localhost:3030/courses`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching course data:', error);
      return [];
    }
  }
  
export function filterCourses(allCourses, term) {
    if (term.trim() === '') {
      return allCourses;
    }
  
    const filteredCourses = allCourses.filter(course =>
      course.courseName.toLowerCase().includes(term.toLowerCase()) ||
      course.instructor.toLowerCase().includes(term.toLowerCase())
    );
  
    return filteredCourses;
}

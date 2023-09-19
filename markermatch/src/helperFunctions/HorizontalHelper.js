import { DataStore } from '@aws-amplify/datastore';
import { Cart } from '../models';
import { Course } from '../models';

export async function getCourseData() {
  // console.log(DataStore);
  return DataStore.query(Course);
}
  
export function filterCourses(allCourses, term) {
    if (term.trim() === '') {
      return allCourses;
    }
    console.log(allCourses)
    console.log(term)
    const filteredCourses = allCourses.filter(course =>
      course.name.toLowerCase().includes(term.toLowerCase()) ||
      course.instructor.toLowerCase().includes(term.toLowerCase())
    );
  
    return filteredCourses;
}

export async function addToCart(courseId, userId, callBack) {
  if (userId === undefined) {
    callBack("/auth", { replace: true });
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
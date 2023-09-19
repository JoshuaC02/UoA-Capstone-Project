//this file is for josh, just to reference the old content in horizontallayout.js

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
  return DataStore.query(Course); // done
}

function HorizontalLayout() {
  const navigate = useNavigate(); // done
  const [courses, setCourses] = useState([]); // done
  const [searchTerm, setSearchTerm] = useState(''); // done
  const [allCourses, setAllCourses] = useState([]); // done
  const { user } = useAuthenticator((context) => [context.user]); // done

  async function addToCart(courseId, userId) { // done
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
}
import axios from "axios";
import { useEffect, useState } from "react";
import { BaseUrl } from "../../assets/Constants";
import CoursesList from "../CoursesList";


export default function AdminCourseList() {
  const [courses, setCourses] = useState([]);
  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}admincourselist/`
      );
      console.log(response.data)
      setCourses(response.data);
    } catch (error) {
      console.log("Error fetching Courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
    <CoursesList courses ={courses}/>
    </>
  );
}

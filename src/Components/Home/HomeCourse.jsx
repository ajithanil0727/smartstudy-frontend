import { useEffect, useState } from "react";
import { useUser } from "../../assets/Context";
import axios from "axios"
import { BaseUrl } from "../../assets/Constants";
import { Link } from "react-router-dom";
export default function HomeCourse() {
  const [courses, setCourses] = useState([]);
  const { userData } = useUser();
  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}homecourselist/`
      );
      setCourses(response.data);
    } catch (error) {
      console.log("Error fetching Courses:", error);
    }
  };

  useEffect(()=>{
    fetchCourses();
  },[])
  if (!courses || courses.length === 0) {
    return <div>No courses available</div>;
  }
  return (
    <>
  
  <div className="container mx-auto mt-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-screen">
      {courses.map((course) => (
        <Link key={course.id} to={userData ? `/coursedetails/${course.id}` : "/login"}>
        <div className="max-w-xs rounded overflow-hidden shadow-lg mt-5 ml-5 transform transition-transform hover:scale-110 hover:shadow-xl hover:bg-gray-100">
          <img
            className="w-full h-36 object-cover"
            src={course.cover}
            alt={course.title}
          />
          <div className="px-4 py-2">
            <div className="font-bold text-lg mb-1">{course.title}</div>
            <p className="text-gray-700 text-sm mb-1 truncate">
              {course.description}
            </p>
            <p className="text-gray-700 text-sm mb-1">{course.category.name}</p>
            <div className="flex justify-between">
            <p className="text-gray-600 text-xs">
              Instructor: {course.tutor.first_name}
            </p>
            <p className="text-black text-lg mb-1">Rs: {course.fee}</p>
            </div>
          </div>
        </div>
        </Link>
      ))}
      
    </div>
  </div>

    </>
  );
}

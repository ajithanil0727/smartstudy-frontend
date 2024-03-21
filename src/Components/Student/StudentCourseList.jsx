import { useEffect, useState } from "react";
import { BaseUrl } from "../../assets/Constants"
import { useUser } from "../../assets/Context"
import axios from "axios"
import { Link } from "react-router-dom";
export default function StudentCourseList(){
    const [courses, setCourses] = useState()
    const { userData } = useUser();
    const userId = userData?.user.id;
    const purchaselist = async () => {
        try {
            const response = await axios.get(`${BaseUrl}userorderlist/${userId}`);
            setCourses(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching user order list:', error);
        }
    };
    useEffect(()=>{
        if (userData){
            purchaselist();
        }
    },[])
    if (!courses || courses.length === 0) {
        return <div>No courses available</div>;
      }
      return (
        <>
      
      <div className="container mx-auto mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-screen">
          {courses.map((course) => (
            <Link key={course.course.id} to={userData ? `/coursedetails/${course.course.id}` : "/login"}>
            <div className="max-w-xs rounded overflow-hidden shadow-lg mt-5 ml-5 transform transition-transform hover:scale-110 hover:shadow-xl hover:bg-gray-100">
              <img
                className="w-full h-36 object-cover"
                src={course.course.cover}
                alt={course.course.title}
              />
              <div className="px-4 py-2">
                <div className="font-bold text-lg mb-1">{course.course.title}</div>
                <p className="text-gray-700 text-sm mb-1 truncate">
                  {course.description}
                </p>
                <p className="text-gray-700 text-sm mb-1">{course.course.category.name}</p>
                <p className="text-gray-600 text-xs">
                  Instructor: {course.course.tutor.first_name}
                </p>
              </div>
            </div>
            </Link>
          ))}
          
        </div>
      </div>
    
        </>
    )
}
import { useEffect, useState } from "react";
import AddCourseModal from "../Modals/AddCourseModal";
import CoursesList from "./CoursesList";
import { useUser } from "../assets/Context";
import { BaseUrl } from "../assets/Constants";
import axios from "axios"
import NotApprovedTab from "./NotApprovedTab";

export default function CourseTab() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const { userData } = useUser();
  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}courselist/${userData.user.id}/`
      );
      setCourses(response.data);
      console.log(response.data)
    } catch (error) {
      console.log("Error fetching Courses:", error);
    }
  };

  const handleclick = () =>{
    setModalIsOpen(true)
  }
  const handleClose = ()=>{
    setModalIsOpen(false)
    fetchCourses();
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  if (userData.user.is_approved == false){
    return <NotApprovedTab />
  }

  return (
    <>
    <div className="flex flex-row justify-between text-lg">
      <h1 className="px-4 py-2 text-black border rounded-md focus:outline-none focus:shadow-outline-blue">My Courses</h1>
      <button
        onClick={handleclick}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add Course
      </button>
    </div>
    <div>
      <CoursesList courses={courses} />
    </div>
    {modalIsOpen && <AddCourseModal visible={modalIsOpen} onClose={handleClose}/> }
    </>
  );
}

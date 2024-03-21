import { Link } from "react-router-dom";
import { useUser } from "../assets/Context";
import { BaseUrl } from "../assets/Constants";

const CourseCard = ({ details }) => {
  const { userData } = useUser();
  let route;
    if (userData.message === "student") {
    route = `/studentprofile/courses/coursedetail/${details.id}`;
  } else if (userData.message === "tutor") {
    route = `/tutorprofile/courses/coursedetail/${details.id}`;
  } else if (userData.message === "admin") {
    route = `/admin/courses/coursedetail/${details.id}`;
  } 
  return (
    <Link to={route}>
      <div className="max-w-xs rounded overflow-hidden shadow-lg mt-5 ml-5 transform transition-transform hover:scale-110 hover:shadow-xl hover:bg-gray-100">
        <img
          className="w-full h-36 object-cover"
          src={
            userData
              ? userData.message === "tutor"
                ? `${BaseUrl}${details.cover.slice(1)}`
                : details.cover
              : details.cover
          }
          alt={details.title}
        />
        <div className="px-4 py-2">
          <div className="font-bold text-lg mb-1">{details.title}</div>
          <p className="text-gray-700 text-sm mb-1 truncate">
            {details.description}
          </p>
          <p className="text-gray-700 text-sm mb-1">{details.category.name}</p>
          <p className="text-gray-600 text-xs">
            Instructor: {details.tutor.first_name}
          </p>
          <p
            className={`text-xs ${
              details.isApproved ? "text-green-600" : "text-red-600"
            }`}
          >
            {details.isApproved ? "Approved" : "Not Approved"}
          </p>
        </div>
      </div>
    </Link>
  );
};

const CoursesList = (props) => {
  const courses = props.courses;
  if (!courses || courses.length === 0) {
    return <div>No courses available</div>;
  }
  return (
    <div className="container mx-auto mt-4 h-full overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} details={course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesList;

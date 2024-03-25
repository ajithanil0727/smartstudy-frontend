import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import LoginForm from "./LoginForm";
import ProfilePage from "../Pages/ProfilePage";
import Header from "./Header";
import CourseTab from "./CourseTab";
import CourseDetail from "./CourseDetail";
import Setting from "./Settings";
import ChatRoom from "../Pages/ChatRoom";
import AdminProfile from "./AdminProfile";
import AdminDash from "./Admin/AdminDash";
import AdminStudentList from "./Admin/AdminStudentList";
import AdminTutorList from "./Admin/AdminTutorList";
import AdminCourseList from "./Admin/AdminCourseList";
import AdminSetting from "./Admin/AdminSetting";
import StudentProfile from "./Student/StudentProfile";
import StudentSetting from "./Student/StudentSetting";
import RegisterForm from "./RegisterForm";
import HomeCourseDetails from "./Home/HomeCourseDetails";
import Cart from "./Student/Cart";
import PaymentStatus from "./Student/PaymentStatus";
import StudentCourseList from "./Student/StudentCourseList";
import CategoryCourse from "./CategoryCourse";
import EntrolledList from "./EntrolledList";




export default function Navigation() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/tutorregister" element={<RegisterForm />} />
          <Route path="/coursedetails/:courseId" element={<HomeCourseDetails />} />
          <Route path="/categorycourse/:categoryId" element={<CategoryCourse />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/paymentstatus" element={<PaymentStatus />} />
          <Route path="/admin" element={<AdminProfile />}>
            <Route index element={<AdminDash />} />
            <Route path="tutor" element={<AdminTutorList />} />
            <Route path="students" element={<AdminStudentList />} />
            <Route path="courses" element={<AdminCourseList />} />
            <Route path="courses/coursedetail/:courseId" element={<CourseDetail />} />
            <Route path="setting" element={<AdminSetting />} />
            <Route path="setting/chat" element={<ChatRoom />} />
          </Route>
          <Route path="/tutorprofile" element={<ProfilePage />}>
            <Route index element={<CourseTab />} />
            <Route path="courses/coursedetail/:courseId" element={<CourseDetail />} />
            <Route path="entrolledusers" element={<EntrolledList />} />
            <Route path="setting" element={<Setting />} />
            <Route path="setting/chat" element={<ChatRoom />} />
          </Route>
          <Route path="/student" element={<StudentProfile />}>
            <Route index element={<StudentCourseList />} />
            <Route path="setting" element={<StudentSetting />} />
            <Route path="setting/chat" element={<ChatRoom />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

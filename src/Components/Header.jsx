import { useEffect, useState } from "react";
import { BaseUrl, Logo } from "../assets/Constants";
import { useUser } from "../assets/Context";
import { Link, useNavigate } from "react-router-dom";
import Notification from "./Notification";
import axios from "axios";
export default function Header() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { userData, setUserData } = useUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem("userdata");
    console.log("logout sucessfully");
    navigate("/");
  };

  const handleCategoryChange = (event) => {
    const categoryId = Number(event.target.value);
    setSelectedCategory(categoryId);
    if (categoryId) {
      console.log(categoryId)
      navigate(`/categorycourse/${categoryId}`);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BaseUrl}categorylist/`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
    const userdata = localStorage.getItem("userdata");
    const dataobject = JSON.parse(userdata);
    if (dataobject) {
      setUserData(dataobject);
      console.log(dataobject);
    }
  }, []);
  return (
    <>
      <header className="bg-gray-800 text-white px-4 py-1">
        <div className="container mx-auto flex justify-between items-center">
        <Link to="/" onClick={() => setSelectedCategory("")}>
          <img className="h-16" src={Logo} alt="logo" />
          </Link>
          <div className="flex items-center space-x-4">
            {/* <input
              type="search"
              className="px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-gray-400"
              placeholder="Search"
            /> */}
            <select
              className="px-3 py-2 text-black rounded border border-gray-600 focus:outline-none focus:border-gray-400"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="" disabled>
                Category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {userData ? (
              <div className="flex items-center space-x-4">
                <p className="mr-3">
                  {userData.message === "admin"
                    ? "admin"
                    : userData.user.first_name}
                </p>
                {userData.message === "tutor" && (
                  <Link to={"/tutorprofile"}>Profile</Link>
                )}

                {userData.message === "admin" && (
                  <Link to={"/admin"}>Profile</Link>
                )}

                {userData.message === "student" && (
                  <>
                    <div>
                      <Link to={"/student"}>Profile</Link>
                    </div>
                    <div>
                      <Link to={"/cart"}>cart</Link>
                    </div>
                    <Notification />
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to={"/login"} className="text-gray-300 hover:text-white">
                  Be a Tutor
                </Link>
                <Link
                  className="px-4 py-2 bg-gray-600 text-white rounded"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="px-4 py-2 bg-gray-600 text-white rounded"
                  to="/Signup"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

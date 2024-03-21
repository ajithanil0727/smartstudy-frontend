import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { BaseUrl } from "../assets/Constants";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.pathname === "/tutorregister"){
    axios
      .post(`${BaseUrl}createtutor/`, formData)
      .then((response) => {
        console.log("success:", response.data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("error:", error);
      });
    }else{
        axios
      .post(`${BaseUrl}createuser/`, formData)
      .then((response) => {
        console.log("success:", response.data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("error:", error);
      });
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
      <div className="w-full max-w-md p-6 mx-auto bg-white rounded-md shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              pattern="[a-zA-Z]+"
              name="first_name"
              
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              pattern="[a-zA-Z]+"
              name="last_name"
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              pattern="^\S{4,}$"
              name="password"
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="password_confirmation"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              pattern="^\S{4,}$"
              name="password_confirmation"
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Register
            </button>
          </div>
        </form>

        <div className="mt-4 text-gray-600">
          Already have an account?{" "}
          <span>
            <NavLink className="text-purple-600 hover:underline" to={"/login"}>
              Login
            </NavLink>
          </span>
        </div>
      </div>
    </div>
  );
}

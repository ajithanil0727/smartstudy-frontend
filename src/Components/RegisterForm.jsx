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
    if (location.pathname === "/tutorregister") {
      axios
        .post(`${BaseUrl}createtutor/`, formData)
        .then((response) => {
          console.log("success:", response.data);
          navigate("/login");
        })
        .catch((error) => {
          console.error("error:", error);
        });
    } else {
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
    <>
      <div className="flex items-center justify-center h-[calc(100vh-100px)]">
        <div className="w-full max-w-md bg-gray-800 shadow-md rounded-md p-8">
          <h2 className="text-3xl font-bold mb-4 text-center text-white">
            SignUp
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                pattern="[a-zA-Z]+"
                name="first_name"
                placeholder="first name"
                onChange={handleChange}
                className="border w-full border-gray-600 bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                pattern="[a-zA-Z]+"
                name="last_name"
                placeholder="last name"
                onChange={handleChange}
                className="border w-full border-gray-600 bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="email"
                className="border w-full border-gray-600 bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <input
                type="password"
                pattern="^\S{4,}$"
                name="password"
                placeholder="password"
                onChange={handleChange}
                className="border w-full border-gray-600 bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <input
                type="password"
                pattern="^\S{4,}$"
                placeholder="confirm password"
                name="password_confirmation"
                onChange={handleChange}
                className="border w-full border-gray-600 bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex items-center justify-between mt-4">
            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Register
              </button>
            </div>
          </form>

          <div className="mt-4 text-gray-600 text-center">
            Already have an account?{" "}
            <span>
              <NavLink
               className="text-blue-400 hover:underline"
                to={"/login"}
              >
                Login
              </NavLink>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

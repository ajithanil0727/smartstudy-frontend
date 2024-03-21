import { useEffect, useState } from "react";
import { BaseUrl } from "../assets/Constants";
import { useUser } from "../assets/Context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export default function LoginForm() {
  const { setUserData } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const data = {
    "email": email,
    "password": password
    }
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BaseUrl}userlogin/`, data);
      localStorage.setItem("userdata", JSON.stringify(response.data))
      setUserData(response.data);
      navigate('/')

    } catch (error) {
      alert(error.response.data.message)
      console.log(error)
    
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-gray-800 shadow-md rounded-md p-8">
          <h2 className="text-3xl font-bold mb-4 text-center text-white">
            LOGIN
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex flex-col">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"

                required
                className="border border-gray-600 bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="border border-gray-600 bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Login
              </button>
            </div>
            <div className="mt-4 text-gray-300 text-center">
              Don't have an account?{" "}
              <Link to={'/tutorregister'} className="text-blue-400 hover:underline">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

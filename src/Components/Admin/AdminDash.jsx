import React, { useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../../assets/Constants";

export default function AdminDash() {
  const [userCount, setUserCount] = useState(0);
  const [tutorCount, setTutorCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}count/`);
        setUserCount(response.data.user_count);
        setTutorCount(response.data.tutor_count);
        setCourseCount(response.data.course_count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="flex justify-between items-center p-8 space-x-8">
        <div className="rounded-lg bg-blue-500 text-white p-6 shadow-lg w-1/3 flex flex-col items-start">
          <h2 className="text-lg font-bold mb-4">User Count</h2>
          <p className="text-4xl font-bold">{userCount}</p>
        </div>
        <div className="rounded-lg bg-green-500 text-white p-6 shadow-lg w-1/3 flex flex-col items-start">
          <h2 className="text-lg font-bold mb-4">Tutor Count</h2>
          <p className="text-4xl font-bold">{tutorCount}</p>
        </div>
        <div className="rounded-lg bg-yellow-500 text-white p-6 shadow-lg w-1/3 flex flex-col items-start">
          <h2 className="text-lg font-bold mb-4">Course Count</h2>
          <p className="text-4xl font-bold">{courseCount}</p>
        </div>
      </div>
    </>
  );
}

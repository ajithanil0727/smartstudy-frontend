import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../assets/Context";
import { BaseUrl } from "../../assets/Constants";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [courses, setCourses] = useState([]);
  const { userData } = useUser();

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}cartitems/${userData.user.id}`
      );
      setCourses(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching Courses:", error);
    }
  };

  const handleRemoveCourse = async (courseId) => {
    try {
      const response = await axios.delete(
        `${BaseUrl}removecartitem/${userData.user.id}/${courseId}`
      );
      fetchCourses();
    } catch (error) {
      console.log("Error fetching Courses:", error);
    }
  };
  const handlepayment = async () => {
    try {
        const response = await axios.post(`${BaseUrl}pay/${userData.user.id}/`);
        console.log(response.data); // Log the response data
        if (response.data.redirect_url) {
          window.location.href = response.data.redirect_url;
          // Handle the redirect response as needed
        } else {
          console.error("Redirect URL not found in response.");
          // Handle the case where redirect URL is not present in the response
        }
    } catch (error) {
        console.error(error); // Log any errors
        // Handle errors here
    }
}

  useEffect(() => {
    fetchCourses();
  }, []);

  if (!courses || courses.length === 0) {
    return <div>No courses available</div>;
  }

  return (
    <>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable payment method.
          </p>
          <div className="my-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="flex flex-col rounded-lg bg-white sm:flex-row"
              >
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={`${BaseUrl}${course.course.cover.slice(1)}`}
                  alt={course.title}
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">{course.course.title}</span>
                  <p className="text-lg font-bold">{course.course.fee}</p>
                </div>
                <button
                  className="text-red-500 mt-2"
                  onClick={() => handleRemoveCourse(course.course.id)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0 ">
          <p className="mt-8 text-lg font-medium">Payment Methods</p>
          <div className="mb-4">
            <form className="mt-5 grid gap-6">
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_1"
                  type="radio"
                  name="radio"
                  checked
                />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label
                  className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor="radio_1"
                >
                  <img
                    className="w-14 object-contain"
                    src="../../../../../assets/icons/istockphoto-1195705227-612x612.jpg"
                    alt=""
                  />
                  <div className="ml-5 flex items-center">
                    <span className="block font-semibold">Online Payment</span>
                  </div>
                </label>
              </div>
            </form>
          </div>
          <section className="border rounded border-light-gray px-4 py-6 sm:px-6 w-full">
            <div className="flex justify-between text-base font-medium my-2 text-gray-900">
              <p>Subtotal</p>
              <p>{courses.reduce((acc, value)=> {
                return acc + Number(value.course.fee)
              },0)}</p>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handlepayment}
                className="flex items-center justify-center w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Pay
              </button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

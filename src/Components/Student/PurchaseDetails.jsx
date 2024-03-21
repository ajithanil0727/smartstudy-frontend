import { useParams } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../assets/Constants";
import { useEffect, useState } from "react";

export default function PurchaseDetails() {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);

    const handleRemoveCourse = () => {
        setCourse(null); 
    };

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await axios.get(`${BaseUrl}coursesdetail/${courseId}`);
                setCourse(response.data);
            } catch (error) {
                console.error("Error fetching course details:", error);
            }
        };

        fetchCourseDetails();
    }, [courseId]);

    if (!course) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                <div class="px-4 pt-8">
                    <p class="text-xl font-medium">Order Summary</p>
                    <p class="text-gray-400">Check your items. And select a suitable payment method.</p>
                    <div class="my-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                        {
                            <div class="flex flex-col rounded-lg bg-white sm:flex-row">
                                <img class="m-2 h-24 w-28 rounded-md border object-cover object-center"
                                    src={`${BaseUrl}${course.cover.slice(1)}`}
                                    alt={course.title} />
                                <div class="flex w-full flex-col px-4 py-4">
                                    <span class="font-semibold">{course.title}</span>
                                    <p class="text-lg font-bold">{course.fee}</p>
                                    <button className="text-red-500 mt-2" onClick={handleRemoveCourse}>Remove</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0 ">
                    <p class="mt-8 text-lg font-medium">Payment Methods</p>
                    {/* Payment methods UI */}
                </div>
            </div>
        </>
    );
}

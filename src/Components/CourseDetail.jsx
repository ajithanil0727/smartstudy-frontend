import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { BaseUrl } from "../assets/Constants";
import AddVideoModal from "../Modals/AddVideoModal";
import VideoPlayer from "./VideoPlayer";
import { useUser } from "../assets/Context"; 
import { toast } from 'react-toastify';

export default function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [playerIsOpen, setplayerIsOpen] = useState(false);
  const { userData } = useUser();
  const fetchVideosByCourseId = async (courseId) => {
    try {
      const response = await axios.get(`${BaseUrl}videolist/${courseId}`);
      setVideos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(`${BaseUrl}coursesdetail/${courseId}`);
      setCourse(response.data);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const playvideo = (videoId) => {
    setSelectedVideo(videoId);
    setplayerIsOpen(true);
  };

  const handleClosePlayer = () => {
    setplayerIsOpen(false);
    setSelectedVideo(null);
  };

  const handleCourseStatus = async () => {
    try {
      const response = await axios.put(`${BaseUrl}courseapprove/${courseId}/`, {
        is_approved: !course.is_approved
      });
      fetchCourseDetails();
    } catch (error) {
      console.error("Error updating course approval status:", error);
    }
  };
  

  const handleClick = () => {
    setModalIsOpen(true);
  };
  const handleClose = () => {
    setModalIsOpen(false);
    fetchVideosByCourseId(courseId);
  };
  useEffect(() => {
    fetchCourseDetails();
    fetchVideosByCourseId(courseId);
  }, [courseId]);

  if (!course) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8 flex gap-8">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">{course.title}</h2>

          <div className="mb-4 h-64">
            <img
              src={`${BaseUrl}${course.cover.slice(1)}`}
              alt={course.title}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Course Details</h3>
            <p className="mb-2">
              <span className="font-bold">Category:</span>{" "}
              {course.category.name}
            </p>
            <p className="mb-2">
              <span className="font-bold">Description:</span>{" "}
              {course.description}
            </p>
            <div className="mt-4">
              {userData.message === "tutor" && (
                <button
                  onClick={handleClick}
                  className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add Video
                </button>
              )}
              {userData.message === "admin" && (
                <button
                  onClick={()=>handleCourseStatus(courseId)}
                  className="block text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  {course.isApproved ? "Approved" : "Approve Course"}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="w-1/2 border border-gray-300 rounded-lg p-4">
          <h3 className="text-xl font-bold mb-4">Existing Videos</h3>
          {videos.length > 0 ? (
            <div className="grid gap-4">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md flex"
                  onClick={() => playvideo(video.video.slice(1))}
                >
                  <div className="w-1/4 relative overflow-hidden">
                    <img
                      src={`${BaseUrl}${video.thumbnail.slice(1)}`}
                      alt={video.title}
                      className="h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <h4 className="text-lg font-semibold mb-1 overflow-hidden whitespace-nowrap">
                      {video.title}
                    </h4>
                    <p className="text-gray-600 overflow-hidden whitespace-nowrap">
                      {video.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No videos</p>
          )}
        </div>
      </div>
      <AddVideoModal
        visible={modalIsOpen}
        onClose={handleClose}
        id={courseId}
      />
      {playerIsOpen && (
        <VideoPlayer videoId={selectedVideo} onClose={handleClosePlayer} />
      )}
    </>
  );
}

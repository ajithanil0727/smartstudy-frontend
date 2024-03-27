import axios from "axios";
import { useState } from "react";
import { BaseUrl } from "../assets/Constants";
import { toast } from "react-toastify";

export default function AddVideoModal({ visible, onClose, id }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: null,
    video: null,
    duration: "",
    request: "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseId = id;
    const data = new FormData();
    data.append("course", courseId);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("thumbnail", formData.thumbnail);
    data.append("video", formData.video);
    data.append("duration", formData.duration);
    data.append("request", formData.request);

    try {
      const response = await axios.post(`${BaseUrl}createvideo/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Video added successfully:", response.data);
      toast.success("Video added successfully")
      onClose();
    } catch (error) {
      console.error("Error adding video:", error);
      toast.success("Error adding video")
    }
  };

  if (!visible) return null;
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center w-full backdrop-blur">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-slate-800 rounded-lg shadow">
            <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-black">Add Video</h3>
              <button
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={onClose}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Video Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    pattern="^[^\s][\w\s-]*$"
                    title="The title should start with a character or special character"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Video Title"
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Video Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    pattern="^[^\s][\w\s-]*$"
                    title="The title should start with a character or special character"
                    placeholder="Description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                <div>
                  <label
                    htmlFor="thumbnail"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Thumbnail
                  </label>
                  <input
                    type="file"
                    name="thumbnail"
                    placeholder="Choose Thumbnail"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    onChange={handleFileChange}
                    required
                  ></input>
                </div>
                <div>
                  <label
                    htmlFor="video"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Video File
                  </label>
                  <input
                    type="file"
                    name="video"
                    placeholder="Choose Video File"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    onChange={handleFileChange}
                    required
                  ></input>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-red-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Add Video
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

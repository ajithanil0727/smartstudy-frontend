import axios from "axios";
import { useState, useEffect } from "react";
import AddCategoryModal from "./AddCategoryModal";
import { BaseUrl } from "../assets/Constants";
import AddSubCategoryModal from "./AddSubCategoryModal";
import { useUser } from "../assets/Context";
import { toast } from "react-toastify";

export default function AddCourseModal({ visible, onClose }) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showSubPopup, setShowSubPopup] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cover: null,
    fee: "",
    category: "",
    subcategory: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const { userData } = useUser()


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BaseUrl}categorylist/`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await axios.get(
        `${BaseUrl}subcategorylist/?category_id=${categoryId}`
      );
      setSubCategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleAddCategory = () => {
    setShowPopup(true);
  };

  const handleAddSubCategory = () => {
    setShowSubPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    fetchCategories();
  };

  const handleSubPopupClose = () => {
    setShowSubPopup(false);
    fetchSubCategories(selectedCategory);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setSelectedCategory(value);
      fetchSubCategories(value);
    }
    if (name === "cover") {
      setFormData({ ...formData, cover: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = userData.user.id
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("cover", formData.cover);
    data.append("fee", formData.fee);
    data.append("category", formData.category);
    data.append("subcategory", formData.subcategory);
    data.append("tutor", user);
    try {
      const response = await axios.post(
        `${BaseUrl}createcourse/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Course created successfully:", response.data);
      toast.success("Course created successfully")
      onClose();
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Error creating course")
    }
  };

  if (!visible) return null;
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center w-full backdrop-blur">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-slate-800 rounded-lg shadow">
            <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-black">Add Course</h3>
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
                    Course Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    pattern="[A-Za-z][A-Za-z\s]*"
                    title="The text should start with a letter and may contain letters and spaces."
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Course Title"
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Course Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    pattern="[A-Za-z][A-Za-z\s]*"
                    title="The text should start with a letter and may contain letters and spaces."
                    placeholder="Description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                <div>
                  <label
                    htmlFor="cover"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Course Image
                  </label>
                  <input
                    type="file"
                    name="cover"
                    placeholder="Choose Image"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                <div>
                  <label
                    htmlFor="fee"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Course Fee
                  </label>
                  <input
                    type="number"
                    name="fee"
                    min={0}
                    placeholder="Course Fee"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <div className="flex">
                    <select
                      name="category"
                      id="category"
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={handleAddCategory}
                      className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subcategory"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Sub Category
                  </label>
                  <div className="flex">
                    <select
                      name="subcategory"
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    >
                      <option value="">Select SubCategory</option>
                      {subCategories.map((subcat) => (
                        <option key={subcat.id} value={subcat.id}>
                          {subcat.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={handleAddSubCategory}
                      className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-red-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create Course
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <AddCategoryModal visible={showPopup} onClose={handlePopupClose} />
      )}
      {showSubPopup && selectedCategory && (
        <AddSubCategoryModal
          visible={showSubPopup}
          onClose={handleSubPopupClose}
          curcat={selectedCategory}
        />
      )}
    </>
  );
}

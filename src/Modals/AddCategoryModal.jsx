import { useState } from "react";
import axios from "axios";
import { BaseUrl } from "../assets/Constants";
import { toast } from "react-toastify";

export default function AddCategoryModal({ visible, onClose }){
    const [newCategory, setNewCategory] = useState('');
    const handleAddNewCategory = async () => {
      try {
        const response = await axios.post(`${BaseUrl}createcategory/`, {name:newCategory});
        console.log('New category added:', response.data);
        toast.success("New category added")
        onClose();
      } catch (error) {
        console.error('Error adding new category:', error);
        toast.error(error.response.data.detail)
      }
    };
    
    if (!visible) return null;
    return(
        <>
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg">
            <label
              htmlFor="newCategory"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New Category
            </label>
            <input
              type="text"
              pattern="[a-zA-Z]+"
              id="newCategory"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="mr-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewCategory}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add
              </button>
            </div>
          </div>
        </div>
        </>
    )
}
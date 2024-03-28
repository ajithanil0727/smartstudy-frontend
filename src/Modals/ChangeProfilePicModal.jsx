import { useState } from "react";
import axios from "axios";
import { BaseUrl } from "../assets/Constants";
import { useUser } from "../assets/Context";
import { toast } from "react-toastify";

export default function ChangeProfilePicModal({
  visible,
  onClose,
  user,
  newdata,
}) {
  const [profilePicture, setProfilePicture] = useState(null);
  const { userData } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("profile_picture", profilePicture);

      const response = await axios.put(
        `${BaseUrl}changeuserprofilepic/${userData?.user.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      newdata();
      toast.success("Profile Pic Changed");
      onClose();
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast.error("Error Updating ProfilePic");
    }
  };

  if (!visible) return null;

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center w-full backdrop-blur">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-slate-800 rounded-lg shadow">
            <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-black">
                Change Profile Picture
              </h3>
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
                    htmlFor="profile_picture"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    name="profile_picture"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                    accept=".jpg,.jpeg"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-red-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

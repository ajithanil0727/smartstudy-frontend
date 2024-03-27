import { useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../assets/Constants';
import { useUser } from '../assets/Context';
import { toast } from 'react-toastify';

export default function EditPasswordModal({ visible, onClose, user }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const { userData } = useUser()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newPassword === newPassword1) {
        const response = await axios.put(`${BaseUrl}changeuserpassword/${userData?.user.id}/`, {
          old_password: currentPassword,
          new_password: newPassword,
          confirm_password: newPassword1
        });
        console.log(response.data);
        toast.success("Password Changed Sucessfully")
        onClose();
      } else {
        console.log("New passwords do not match");
        toast.error("New password and confirm password does not match")
      } 
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const responseData = error.response.data;
        if (responseData.error) {
          toast.error(responseData.error);
        } else {
          console.log("An error occurred:", responseData);
        }
      } else {
        console.error('Error updating user:', error);
      }
    }
  };

  if (!visible) return null;

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center w-full backdrop-blur">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-slate-800 rounded-lg shadow">
            <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-black">Change Password</h3>
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
                    htmlFor="current_password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="current_password"
                    pattern="^\S{4,}$"
                    title="Please enter at least 4 non-space characters"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className={`bg-gray-50 border ${passwordError ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                    required
                  />
                  {passwordError && <p className="text-red-500 text-sm">Incorrect current password</p>}
                </div>
                <div>
                  <label
                    htmlFor="new_password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="new_password"
                    pattern="^\S{4,}$"
                    title="Please enter at least 4 non-space characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm_password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirm_password"
                    pattern="^\S{4,}$"
                    title="Please enter at least 4 non-space characters"
                    value={newPassword1}
                    onChange={(e) => setNewPassword1(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
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

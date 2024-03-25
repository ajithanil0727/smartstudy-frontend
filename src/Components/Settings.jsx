import EditPasswordModal from '../Modals/EditPasswordModal';
import { useState } from 'react';
import { useUser } from '../assets/Context'
import EditModal from '../Modals/EditModal';
import { Link } from 'react-router-dom';
import ChangeProfilePicModal from '../Modals/ChangeProfilePicModal';
import axios from "axios"
import { BaseUrl } from '../assets/Constants';
export default function Setting() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [profilePicIsOpen, setProfilePicIsOpen] = useState(false);
  const { userData, setUserData } = useUser();
  const fetchUserData = async () => {
    try {
        const response = await axios.post(`${BaseUrl}fetchuserdata/`, { refresh_token: userData?.refresh });
        localStorage.removeItem('userdata');
        localStorage.setItem("userdata", JSON.stringify(response.data))
        setUserData(response.data);
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};
  const handleclick = () =>{
    setModalIsOpen(true)
  }
  const handlepass = () =>{
    setPopupIsOpen(true)
  }
  const handlepic = () =>{
    setProfilePicIsOpen(true)
  }
  const handleClose = ()=>{
    setModalIsOpen(false)
  }
  const handlepassClose = ()=>{
    setPopupIsOpen(false)
  }
  const handlepicClose = ()=>{
    setProfilePicIsOpen(false)
  }
  return (
    <>
      <div className="h-full bg-gray-200 rounded-2xl flex justify-evenly items-center">
        <div className="h-5/6 bg-white w-1/3 rounded-2xl">
          <div className="flex justify-center h-1/2">
          {userData?.user.profile_picture === null ? (
                <img
                  src=""
                  alt="profile image"
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={`${BaseUrl}${userData?.user.profile_picture.slice(1)}`}
                  alt="profile image"
                  className="w-full h-full object-contain"
                />
              )}
          </div>
          <div className="h-56 flex flex-col justify-start items-center">
            <h1 className="text-yellow-600 capitalize ">
              {userData.user.first_name} {userData.user.last_name}
            </h1>
            <h1 className="text-sky-600">{userData.user.email}</h1>
            <div className="grid grid-cols-2 gap-5 mt-10">
              <div>
                <button className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white rounded" onClick={handleclick}>
                  Edit
                </button>
              </div>
              <div>
                <button className="w-full h-10 bg-green-500 hover:bg-green-600 text-white rounded px-1" onClick={handlepass}>
                  Change Password
                </button>
              </div>
              <div>
              <Link to={"/tutorprofile/setting/chat"}>
                <button className="w-full h-10 bg-yellow-500 hover:bg-yellow-600 text-white rounded">
                  Chat
                </button>
                </Link>
              </div>
              <div>
                <button className="w-full h-10 bg-red-500 hover:bg-red-600 text-white rounded" onClick={handlepic}>
                  Change Profile Pic
                </button>
              </div>
            </div>
          </div>
        </div>  
      </div>
      <EditModal visible={modalIsOpen} onClose={handleClose} user={userData}/>
      <EditPasswordModal visible={popupIsOpen} onClose={handlepassClose} user={userData}/>
      <ChangeProfilePicModal visible={profilePicIsOpen} onClose={handlepicClose} user={userData} newdata={fetchUserData} />
    </>
  );
}

import EditPasswordModal from '../../Modals/EditPasswordModal';
import { useState } from 'react';
import { useUser } from '../../assets/Context';
import EditModal from '../../Modals/EditModal'; 
import { BsChat } from "@react-icons/all-files/bs/BsChat";
import { FaUserEdit } from "@react-icons/all-files/fa/FaUserEdit";
import { CgProfile } from "@react-icons/all-files/cg/CgProfile";
import { BsFillGearFill } from "@react-icons/all-files/bs/BsFillGearFill";
import { Link } from 'react-router-dom';
import ChangeProfilePicModal from '../../Modals/ChangeProfilePicModal';
import axios from "axios"
import { BaseUrl } from '../../assets/Constants';
export default function AdminSetting() {
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
      <div className="h-5/6 w-1/3 bg-gray-800 rounded-2xl shadow-lg">
        <div className="img-box h-2/3 w-full flex justify-center items-center">
          <div className="flex justify-center w-[15rem] h-[15rem] my-2 rounded-full overflow-hidden">
            {userData?.user.profile_picture === null ? (
              <img
                src=""
                alt="profile image"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={`${BaseUrl}${userData?.user.profile_picture.slice(1)}`}
                alt="profile image"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between items-center">
          <div className="userdata text-center">
            <h1 className="text-orange-500 capitalize font-extrabold">
              {userData.user.first_name} {userData.user.last_name}
            </h1>
            <h1 className="text-sky-600">{userData.user.email}</h1>
          </div>
          <div className="w-[60%] flex justify-between children:text-3xl mt-5 text-gray-50 children:cursor-pointer">
            <div onClick={handleclick} title="Edit User">
              <FaUserEdit />
            </div>
            <div onClick={handlepass} title="Change Password">
              <BsFillGearFill />
            </div>
            <div title="Chat">
              <Link to={"/admin/setting/chat"}>
                <BsChat />
              </Link>
            </div>
            <div onClick={handlepic} title="Change Profile Pic">
              <CgProfile />
            </div>
          </div>
        </div>
      </div>
    </div>
    <EditModal visible={modalIsOpen} onClose={handleClose} user={userData} newdata={fetchUserData}/>
    <EditPasswordModal
      visible={popupIsOpen}
      onClose={handlepassClose}
      user={userData}
    />
    <ChangeProfilePicModal
      visible={profilePicIsOpen}
      onClose={handlepicClose}
      user={userData}
      newdata={fetchUserData}
    />
  </>
  );
}

// import TutorPassEdit from "../Modals/TutorPassEdit";
import { useState } from 'react';
import { useUser } from '../../assets/Context'; 
import EditModal from '../../Modals/EditModal';
import { Link } from 'react-router-dom';
export default function StudentSetting() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [popupIsOpen, setPopupIsOpen] = useState(false);
const { userData } = useUser();
  const handleclick = () =>{
    setModalIsOpen(true)
  }
  const handlepass = () =>{
    setPopupIsOpen(true)
  }
  const handleClose = ()=>{
    setModalIsOpen(false)
  }
//   const handlepassClose = ()=>{
//     setPopupIsOpen(false)
//   }
  return (
    <>
      <div className="h-full bg-gray-200 rounded-2xl flex justify-evenly items-center">
        <div className="h-5/6 bg-white w-1/3 rounded-2xl">
          <div className="flex justify-center h-1/2">
            <img
              src=""
              alt="profile image"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="h-56 flex flex-col justify-start items-center">
            <h1 className="text-yellow-600 capitalize ">
              {userData?.user.first_name} {userData?.user.last_name}
            </h1>
            <h1 className="text-sky-600">{userData?.user.email}</h1>
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
              <Link to={"/student/setting/chat"}>
                <button className="w-full h-10 bg-yellow-500 hover:bg-yellow-600 text-white rounded">
                  Chat
                </button>
                </Link>
              </div>
              <div>
                <button className="w-full h-10 bg-red-500 hover:bg-red-600 text-white rounded">
                  AdminChat
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-5/6 w-1/3 rounded-2xl flex flex-col justify-between">
          
          <div className="bg-white h-52 rounded-2xl overflow-y-auto p-4">
            <h2 className="text-xl font-semibold mb-2">WishList</h2>
          </div>
        </div>
      </div>
      <EditModal visible={modalIsOpen} onClose={handleClose} user={userData}/>
      {/* <TutorPassEdit visible={popupIsOpen} onClose={handlepassClose} user={userData}/> */}
    </>
  );
}

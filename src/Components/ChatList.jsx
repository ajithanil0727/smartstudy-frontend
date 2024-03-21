import { useEffect, useState } from "react";
import { BaseUrl } from "../assets/Constants";
import { useUser } from "../assets/Context";
import axios from "axios";
import ChatArea from "./ChatArea";


export default function ChatList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { userData } = useUser();
  const handleUserClick = (userId) => {
    setSelectedUser(userId);
  };
  
  useEffect(() => {
    const fetchUsers = async () => {
        try {
          const response = await axios.get(
            `${BaseUrl}getusers/${userData.user.id}/`
          );
          setUsers(response.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
    fetchUsers();
  }, []);
  return (
    <>
  <div className=" bg-gray-800">
    <div className="h-full p-4">
      <h2 className="text-lg font-semibold text-white mb-2">Users</h2>
      <ul className="overflow-y-auto">
        {users && users.length > 0 ? (
          users.map((user) => (
            <li key={user.id} className="mb-2 border-b border-gray-700">
              <button className="text-blue-500 hover:underline" onClick={() => handleUserClick(user.id)}>
                {user.first_name}
              </button>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No users found</li>
        )}
      </ul>
    </div>
  </div>
  {selectedUser && (
            <ChatArea userId={selectedUser}/>
          )}

    </>
  );
}

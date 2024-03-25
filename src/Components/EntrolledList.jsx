import { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '../assets/Constants'; 
import { useUser } from '../assets/Context';

export default function EntrolledList(){
  const [purchasedUsers, setPurchasedUsers] = useState([]);
  const { userData } = useUser()

  useEffect(() => {
    const fetchPurchasedUsers = async () => {
      try {
        const response = await axios.get(`${BaseUrl}purchasedusers/${userData?.user.id}`);
        setPurchasedUsers(response.data);
      } catch (error) {
        console.error('Error fetching purchased users:', error);
      }
    };

    fetchPurchasedUsers();
  }, [userData?.user.id]);

  return (
    <>
    <div className="container mx-auto p-4">
  <h1 className="text-2xl font-bold mb-4">Purchased Users List</h1>
  <div className="overflow-x-auto">
    <table className="min-w-full table-auto border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 px-4 py-2">First Name</th>
          <th className="border border-gray-300 px-4 py-2">Email</th>
        </tr>
      </thead>
      <tbody>
        {purchasedUsers.map((user) => (
          <tr key={user.id} className="bg-white hover:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">{user.first_name}</td>
            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
    </>
  );
};



import { useEffect, useState } from "react"
import axios from "axios"
import { BaseUrl } from "../../assets/Constants";
export default function AdminTutorList(){
    const [tutors, setTutors] = useState([]);

    const handleApproval = async (tutorId) => {
      try {
        const response = await axios.put(`${BaseUrl}tutorapprove/${tutorId}/`);
        setTutors(prevTutors =>
          prevTutors.map(tutor =>
            tutor.id === tutorId ? { ...tutor, is_approved: !tutor.is_approved } : tutor
          )
        );
        console.log(`Tutor with ID ${tutorId} approval status toggled.`, response.data);
      } catch (error) {
        console.error("Error updating field", error);
      }
    };
    const handleBlock = async (tutorId) => {
      try {
        const response = await axios.put(`${BaseUrl}blockuser/${tutorId}/`);
        setTutors(prevTutors =>
          prevTutors.map(tutor =>
            tutor.id === tutorId ? { ...tutor, is_active: !tutor.is_active } : tutor
          )
        );
        console.log(`Tutor with ID ${tutorId} status toggled.`, response.data);
      } catch (error) {
        console.error("Error updating field", error);
      }
    };
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}tutorlist/`);
        setTutors(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {
      
        fetchData();
      }, []);
    return(
      <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Tutor Listing</h1>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">First Name</th>
              <th className="border border-gray-300 p-2">Last Name</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {tutors.map((tutor) => (
              <tr key={tutor.id}>
                <td className="border border-gray-300 p-2">{tutor.email}</td>
                <td className="border border-gray-300 p-2">{tutor.first_name}</td>
                <td className="border border-gray-300 p-2">{tutor.last_name}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    className={`px-4 py-2 ${
                      tutor.is_approved ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                    }`}
                    onClick={() => handleApproval(tutor.id)}
                  >
                    {tutor.is_approved ? "Approved" : "Approve"}
                  </button>
                  <button
                    className={`px-4 py-2 ml-2 ${
                      tutor.is_active ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                    }`}
                    onClick={() => handleBlock(tutor.id)}
                  >
                    {tutor.is_active ? "Block" : "Unblock"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
    )
}
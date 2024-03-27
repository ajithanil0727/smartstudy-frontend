import { useEffect, useState } from "react"
import axios from "axios"
import { BaseUrl } from "../../assets/Constants";
import { toast } from 'react-toastify';

export default function AdminStudentList(){
    const [students, setStudents] = useState([]);
    const handleApproval = async (studentId) => {
        try {
          const response = await axios.put(`${BaseUrl}blockuser/${studentId}/`);
          setStudents(prevStudents =>
            prevStudents.map(student =>
              student.id === studentId ? { ...student, is_active: !student.is_active } : student
            )
          );
          if (response.data.is_active) {
            toast.info("Student unblocked");
          } else {
            toast.info("Student blocked");
          }
          console.log(`Tutor with ID ${studentId} approval status toggled.`, response.data);
        } catch (error) {
          console.error("Error updating field", error);
        }
      };

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${BaseUrl}studentlist/`);
            setStudents(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, []);

    if (students.length === 0) {
        return <div>Loading...</div>;
      }
    return(
      <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Students Listing</h1>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">First Name</th>
              <th className="border border-gray-300 p-2">Last Name</th>
              <th className="border border-gray-300 p-2">Is Active</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="border border-gray-300 p-2">{student.email}</td>
                <td className="border border-gray-300 p-2">{student.first_name}</td>
                <td className="border border-gray-300 p-2">{student.last_name}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    className={`px-4 py-2 ${
                      student.is_active ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                    }`}
                    onClick={() => handleApproval(student.id)}
                  >
                    {student.is_active ? "Block" : "Unblock"}
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
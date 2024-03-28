import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./Context";
import axios from "axios";
import { useEffect } from "react";
import { BaseUrl } from "./Constants";

export default function ProtectedRoutes() {
  const { userData, setUserData } = useUser();
  const fetchUserData = async () => {
    try {
      const response = await axios.post(`${BaseUrl}fetchuserdata/`, {
        refresh_token: userData?.refresh,
      });
      localStorage.removeItem("userdata");
      localStorage.setItem("userdata", JSON.stringify(response.data));
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (userData) { 
      fetchUserData()
    }
  }, []);

  return <>{userData ? <Outlet /> : <Navigate to="https://smartstudy-frontend.vercel.app" />}</>;
}

import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BaseUrl } from "../../assets/Constants";
import { useUser } from "../../assets/Context";
import axios from "axios";

export default function PaymentStatus() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get("message");
  const { userData } = useUser();
  const userId = userData?.user.id;
  useEffect(() => {
    if (userId) {
    const createOrder = async () => {
      try {
        const response = await axios.post(`${BaseUrl}ordercreate/${userId}/`);
        console.log('Order created:', response.data);
      } catch (error) {
        console.error('Error creating order:', error);
      }
    };

    createOrder();
  }
  }, [userId]);
  
  
  return (
    <>
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        {message === "success" && userId ? (
          <>
            <h1 className="text-3xl font-semibold text-green-600 mb-4">
              Payment Successful!
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Your payment was successful. Thank you for your purchase.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-semibold text-green-600 mb-4">
              Payment Failed
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Your payment was Failed. Try Again
            </p>
          </>
        )}
        <Link to={"/"}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-400">
            Go to Home
          </button>
        </Link>
      </div>
    </>
  );
}

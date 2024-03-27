import { useState, useEffect } from "react";
import { useUser } from "../assets/Context";
import { BaseUrl } from "../assets/Constants";
import axios from "axios"

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [ws, setWs] = useState(null);
  const { userData } = useUser();

  const deleteUnread = async () => {
    try {
      const response = await axios.get(`${BaseUrl}chat/deleteUnread/${userData.user.id}/`);
      console.log('Messages deleted successfully:', response.data);
    } catch (error) {
      console.error('Error deleting messages:', error.message);
    }
  };

  useEffect(() => {
    if (userData && userData.access) {
      const client = new WebSocket(
        `wss://oddityfinds.shop/ws/notifications/?token=${userData.access}`
      );
      setWs(client);

      client.onopen = () => {
        console.log("WebSocket Client Connected");
      };

      client.onmessage = (message) => {
        const notification = JSON.parse(message.data);
        console.log(notification)
        setNotifications(notification);
        setUnreadCount(unreadCount + notification.length);
        
      };

      return () => {
        client.close();
      };
    }
  }, [userData]);

  const toggleDropdown = () => {
    deleteUnread();
    setIsOpen(!isOpen);
    if (isOpen) {
      setUnreadCount(0);
    }
  };

  return (
    <div className="notification-dropdown relative">
      <button className="notification-icon relative" onClick={toggleDropdown}>
        <span className="bell-icon" role="img" aria-label="Bell">
          🔔
        </span>
        {unreadCount > 0 && <span className="unread-count absolute right-0 top-[-5px] text-xs bg-red-700 px-1 rounded-full">{unreadCount}</span>}
      </button>
      {isOpen && (
        <div className="absolute right-0 top-[70px] shadow-lg bg-white py-2 z-[1000] min-w-full rounded-lg w-[410px] max-h-[500px] overflow-auto">
          <ul className="divide-y">
            {notifications.map((notification, index) => (
              <li key={index} className="py-4 px-4 flex items-center hover:bg-gray-50 text-black text-sm cursor-pointer">
                <img
                  src="https://readymadeui.com/profile_2.webp"
                  className="w-12 h-12 rounded-full shrink-0"
                />
                <div className="ml-6">
                  <h3 className="text-sm text-[#333] font-semibold">
                  Your have a new message from {notification.sentby}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-blue-500 leading-3 mt-2">
                    10 minutes ago
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationComponent;

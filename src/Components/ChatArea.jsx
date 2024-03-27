import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../assets/Context";

export default function ChatArea({ userId }) {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const { userData } = useUser();

  useEffect(() => {
    if (!userData) return; 

    const chatWs = new WebSocket(`wss://oddityfinds.shop/ws/chat/?token=${userData.access}&chat_with=${userId}`);
    setWs(chatWs);

    chatWs.onopen = () => {
      console.log('WebSocket connected');
      fetchOldMessages();
    };

    chatWs.onmessage = (message) => {
      const parsedMessage = JSON.parse(message.data);
      console.log('Received message:', parsedMessage);
      setMessages(prevMessages => [...prevMessages, parsedMessage]);
    };

    chatWs.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    chatWs.onclose = () => {
      console.log('WebSocket closed');
      refreshChat();
    };

    return () => {
      if (chatWs) {
        chatWs.close();
      }
    };
  }, [userId]);

  const sendMessage = () => {
    if (!ws || ws.readyState !== WebSocket.OPEN || !inputValue.trim()) {
      return;
    }
    const message = { message: inputValue.trim() };
    console.log(message)
    ws.send(JSON.stringify(message));
    console.log("messagesent")
    setInputValue('');
  };

  const refreshChat = () => {
    setMessages([]);
  };

  const fetchOldMessages = () => {
    if (!userData) return;
    const token = userData.access;
    axios.get(`http://127.0.0.1:8000/chat/chathistory/${userId}/?token=${token}`)
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error('Error fetching old messages:', error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen bg-gray-100 text-gray-800 ">
      <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex w-full mt-2 space-x-3 ${
                message.user === userData.user.email ? "justify-end" : "justify-start"
              }`}
            >
              <div>
                <div
                  className={`${
                    message.user === userData.user.email
                      ? "bg-blue-600 text-white rounded-l-lg rounded-br-lg"
                      : "bg-gray-300 rounded-r-lg rounded-bl-lg"
                  } p-3`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <span className="text-xs text-gray-500 leading-none">{message.timestamp}</span>
              </div>
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            </div>
          ))}
        </div>

        <div className="bg-gray-300 p-4 flex items-center justify-between">
          <input
            className="flex-grow h-10 rounded px-3 text-sm mr-2"
            type="text"
            placeholder="Type your message…"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

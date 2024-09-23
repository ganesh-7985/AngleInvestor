import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ChatList = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('/api/chat');
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
    fetchChats();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Your Chats</h2>
      <div className="space-y-2">
        {chats.map(chat => (
          <Link 
            key={chat._id} 
            to={`/chat/${chat._id}`}
            className="block p-3 bg-white shadow rounded-lg hover:bg-gray-100 transition duration-300"
          >
            <div className="font-semibold">{chat.participants[0].fullName}</div>
            <div className="text-sm text-gray-500">
              {chat.lastMessage ? chat.lastMessage.content.substring(0, 50) + '...' : 'No messages yet'}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
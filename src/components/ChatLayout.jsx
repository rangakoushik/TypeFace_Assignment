import React, { useState, useEffect } from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import './Chat.css';

const initialChats = [
  { id: '1', name: 'Personal TYPE FACE CHAT', lastMessage: 'Hello there!' },
  { id: '2', name: 'Work TYPE FACE CHAT', lastMessage: 'Meeting at 3 PM' },
];

const sampleMessages = {
  '1': [
    {
      id: '101',
      content: 'Hi Koushik!',
      timestamp: new Date().getTime() - 3600000,
      sender: 'You',
      isSent: true
    },
    {
      id: '102',
      content: 'How are you doing?',
      timestamp: new Date().getTime() - 3500000,
      sender: 'You',
      isSent: true
    }
  ],
  '2': [
    {
      id: '201',
      content: 'Don\'t forget about the meeting later.',
      timestamp: new Date().getTime() - 7200000,
      sender: 'You',
      isSent: true
    },
    {
      id: '202',
      content: 'Meeting at 3 PM',
      timestamp: new Date().getTime() - 7000000,
      sender: 'You',
      isSent: true
    }
  ]
};

const ChatLayout = () => {
  const [chats, setChats] = useState(initialChats);
  const [messages, setMessages] = useState(sampleMessages);
  const [activeChat, setActiveChat] = useState(null);
  const [activeChatMessages, setActiveChatMessages] = useState([]);

  useEffect(() => {
    if (activeChat) {
      setActiveChatMessages(messages[activeChat.id] || []);
    } else {
      setActiveChatMessages([]);
    }
  }, [activeChat, messages]);

  const handleSelectChat = (chat) => {
    setActiveChat(chat);
  };

  const handleSendMessage = (chatId, content) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      timestamp: new Date().getTime(),
      sender: 'You',
      isSent: true
    };
    const updatedChatMessages = [...(messages[chatId] || []), newMessage];
    setMessages({
      ...messages,
      [chatId]: updatedChatMessages
    });
    setChats(chats.map(chat => 
      chat.id === chatId 
        ? { ...chat, lastMessage: content } 
        : chat
    ));
  };

  const handleCreateChat = () => {
    const chatName = prompt('Enter a name for the new TYPE FACE CHAT:');
    if (chatName && chatName.trim()) {
      const newChat = {
        id: Date.now().toString(),
        name: chatName.trim(),
        lastMessage: null
      };
      
      setChats([...chats, newChat]);
      setActiveChat(newChat);
      setMessages({
        ...messages,
        [newChat.id]: []
      });
    }
  };

  const handleDeleteChat = (chatId) => {
    const chatToDelete = chats.find(chat => chat.id === chatId);
    if (window.confirm(`Are you sure you want to delete "${chatToDelete.name}" TYPE FACE CHAT?`)) {

      const updatedChats = chats.filter(chat => chat.id !== chatId);
      setChats(updatedChats);
      
      const { [chatId]: _, ...remainingMessages } = messages;
      setMessages(remainingMessages);
      
      if (activeChat && activeChat.id === chatId) {
        setActiveChat(updatedChats.length > 0 ? updatedChats[0] : null);
      }
    }
  };

  return (
    <div className="chat-container">
      <ChatList
        chats={chats}
        activeChat={activeChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        onCreateChat={handleCreateChat}
      />
      <ChatWindow
        activeChat={activeChat}
        messages={activeChatMessages}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatLayout;

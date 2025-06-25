import { useEffect, useRef } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import { FiMessageSquare } from 'react-icons/fi';

const ChatWindow = ({ activeChat, messages, onSendMessage }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!activeChat) {
    return (
      <div className="chat-main">
        <div className="empty-state">
          <FiMessageSquare className="empty-state-icon" />
          <h2 className="empty-state-text">No TYPE FACE CHAT selected</h2>
          <p className="empty-state-subtext">Select a chat from the sidebar or create a new one</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-main">
      <div className="chat-header">
        <h2 className="chat-title">{activeChat.name}</h2>
      </div>
      <div className="chat-messages">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSendMessage={(content) => onSendMessage(activeChat.id, content)} />
    </div>
  );
};

export default ChatWindow;

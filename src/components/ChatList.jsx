import { FiPlus, FiTrash2 } from 'react-icons/fi';

const ChatList = ({ chats, activeChat, onSelectChat, onDeleteChat, onCreateChat }) => {
  return (
    <div className="chat-sidebar">
      <div className="sidebar-header">
        <h2>TYPE FACE CHAT</h2>
        <button className="new-chat-btn" onClick={onCreateChat}>
          <FiPlus />
        </button>
      </div>
      <ul className="chat-list">
        {chats.length === 0 ? (
          <li className="chat-item">
            <div className="chat-item-content">
              <div className="chat-item-title">No TYPE FACE CHAT yet</div>
              <div className="chat-item-preview">Click the + button to create a new chat</div>
            </div>
          </li>
        ) : (
          chats.map((chat) => (
            <li
              key={chat.id}
              className={`chat-item ${activeChat && activeChat.id === chat.id ? 'active' : ''}`}
              onClick={() => onSelectChat(chat)}
            >
              <div className="chat-item-content">
                <div className="chat-item-title">{chat.name}</div>
                <div className="chat-item-preview">
                  {chat.lastMessage || 'No messages yet'}
                </div>
              </div>
              <div 
                className="chat-item-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat(chat.id);
                }}
              >
                <FiTrash2 />
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ChatList;

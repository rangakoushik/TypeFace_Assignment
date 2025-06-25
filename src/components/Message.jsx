const Message = ({ message }) => {
  const {content, timestamp, sender, isSent } = message;
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className={`message ${isSent ? 'message-sent' : 'message-received'}`}>
      {!isSent && <div className="message-sender">{sender}</div>}
      <p className="message-content">{content}</p>
      <div className="message-time">{formatTime(timestamp)}</div>
    </div>
  );
};

export default Message;
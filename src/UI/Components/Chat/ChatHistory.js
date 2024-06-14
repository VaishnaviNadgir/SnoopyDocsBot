import React from 'react';

const ChatHistory = ({ chatHistory }) => {
  return (
    <div className="chat-history">
      {chatHistory.map((chat, index) => (
        <div key={index} className="chat-history-item">
          {chat.map((message, msgIndex) => (
            <div key={msgIndex} className={`message ${message.type === 'user' ? 'user-message' : 'system-message'}`}>
              {message.text}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;

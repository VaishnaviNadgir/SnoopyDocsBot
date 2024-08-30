import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faPaperPlane, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import '../Chat/ChatInterface.css';
import Fileupload from '../UploadFiles/Fileupload'; // Import the Fileupload component

const ChatInterface = () => {

  const [showModal, setShowModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleAttachmentClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage = { type: 'user', text: input };
    setMessages([...messages, userMessage]);

    setTimeout(sendSystemReply, 1000);

    setInput('');
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const sendSystemReply = () => {
    const systemMessage = { type: 'system', text: 'This is a system reply.' };
    setMessages(prevMessages => [...prevMessages, systemMessage]);
  };

  useEffect(() => {
    const chatbox = document.getElementById('chatbox');
    chatbox.scrollTop = chatbox.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const handleNewChat = () => {
      setMessages([]);
    };

    window.addEventListener('newChat', handleNewChat);
    return () => {
      window.removeEventListener('newChat', handleNewChat);
    };
  }, []);

  return (
    <div className="chat-interface">
      <div className="chatbox" id="chatbox">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.type === 'user' ? 'user-message' : 'system-message'}`}
            style={{ width: `${message.text.length * 15}px` }}
          >
            {message.text}
            {message.type === 'system' && (
              <FontAwesomeIcon
                icon={faCopy}
                className="copy-icon"
                onClick={() => handleCopy(message.text)}
              />
            )}
          </div>
        ))}
      </div>
      <div className="message-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a message..."
        />
        <FontAwesomeIcon
          icon={faPaperPlane}
          className="icon send-icon"
          onClick={handleSend}
        />
        {/* <div className="attachment-container" onClick={handleAttachmentClick}>
          <FontAwesomeIcon
            icon={faPaperclip}
            className="icon attachment-icon"
          />
        </div> */}
      </div>
      {/* <Fileupload show={showModal} handleClose={handleCloseModal} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} /> */}
    </div>
  );
};

export default ChatInterface;


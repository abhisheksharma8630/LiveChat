import React, { useState } from 'react';
import './chat.css'

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage = {
        text: inputValue,
        sender: 'User1', // You can set this dynamically based on the logged-in user
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === 'User1' ? 'sent' : 'received'}`}>
            <div className="message-text">{message.text}</div>
            <div className="message-timestamp">{message.timestamp}</div>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatApp;

import { useState, useEffect } from 'react';

import {
  API,
  model
} from './lib/constants';

import './App.css';
import Message from './components/Message/Message';
import Input from './components/Input/Input';

const App = () => {
  const day = new Date().toLocaleString('en-us', {weekday:'long'})

  const [messages, setMessages] = useState([
    {
      message: `Hello, happy ${day}! Ask me anything!`,
      sentTime: "just now",
      sender: "ChatGPT",
      position: "single",
      direction: "incoming"
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [prompt, setPrompt] = useState('');

  const processMessageToChatGPT = async (chatMessages) => {
    const apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";

      return {
        role,
        content: messageObject.message
      };
    });

    const apiRequestBody = {
      model: model,
      messages: [
        { role: "system", content: "I'm a Student using ChatGPT for learning" },
        ...apiMessages,
      ],
    };

    const response = await fetch(API.url, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API.key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });  

    return response.json();
  }

  const handleSendRequest = async () => {
    const newMessage = {
      message: prompt,
      direction: 'outgoing',
      sender: "you",
    };

    console.log("newMessage", newMessage);

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsTyping(true);
    setPrompt("");

    try {
      const response = await processMessageToChatGPT([...messages, newMessage]);

      console.log("response", response);

      const content = response.choices[0]?.message?.content;
      if (content) {
        const chatGPTResponse = {
          message: content,
          sender: "ChatGPT",
        };
        setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {

    console.log("messages", messages);

  }, [messages]);

  return (
    <div className="app-container">
      <div className="chat-container"> 
        <div className="messages-container">
          {messages.map((message, i) => {
            return (
              <Message key={i} message={message} />
            )
          })}
        </div>
        <Input 
          handleSendRequest={handleSendRequest} 
          prompt={prompt} 
          setPrompt={setPrompt} 
          isTyping={isTyping}
          />
      </div>
    </div>
  )
}

export default App;
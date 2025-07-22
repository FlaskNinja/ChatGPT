import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgpt.svg';

import { useEffect, useRef, useState } from 'react';
import { getGroqReply } from './openai'; // ✅ fixed import

function App() {
  const msgEnd = useRef(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      text: 'Ask me anything...',
      isBot: true,
      isIntro: true,
    },
  ]);
  

  useEffect(() => {
    msgEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const handleSend = async () => {
    if (!input.trim()) return;
  
    // Remove the intro if it exists
    setMessages((prev) => [
      ...prev.filter((msg) => !msg.isIntro),
      { text: input, isBot: false },
    ]);
    setInput('');
  
    // Show "Typing..." placeholder
    const typingMsg = { text: 'Typing...', isBot: true };
    setMessages((prev) => [...prev, typingMsg]);
  
    try {
      const botResponse = await getGroqReply(input);
  
      // Replace Typing...
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { text: botResponse, isBot: true };
        return updated;
      });
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          text: 'Something went wrong. Try refreshing your internet connection.',
          isBot: true,
        };
        return updated;
      });
  
      console.error(err);
    }
  };
    const handleNewChat = () => {
    setMessages([
      {
        text: 'I am ChatGPT, designed to help you.',
        isBot: true,
      },
    ]);
    setInput('');
  };
  
  
  return (
    <div className="App">
      <div className="mobileHeader"><img src={gptImgLogo} alt="" /> ChatGPT</div>
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="chatgpt-logo" className="logo" />
            <span className="brand">ChatGPT</span>
          </div>
          <button className="midBtn" onClick={handleNewChat}>
            <img src={addBtn} alt="" className="addBtn" /> New Chat
          </button>

          <div className="upperSideBottom">
            <span className="chats-head">Chats</span>
            <button className="query">
              <img src={msgIcon} alt="" /> What is Programming?
            </button>
            <button className="query">
              <img src={msgIcon} alt="" /> Explain an API?
            </button>
          </div>
        </div>

        <div className="lowerSide">
          <div className="listItems">
            <img src={home} alt="" className="listItemsImg" /> Home
          </div>
          <div className="listItems">
            <img src={saved} alt="" className="listItemsImg" /> Saved
          </div>
          <div className="listItems">
            <img src={rocket} alt="" className="listItemsImg" /> Upgrade to pro
          </div>
        </div>
      </div>

      <div className="main">
        <div className="chats">
          {/* {messages.map((message, i) => (
            <div key={i} className={message.isBot ? 'chat bot' : 'chat'}>
              <p className={`txt ${message.text === 'Typing...' ? 'typing-indicator' : ''}`}>
                {message.text}
              </p>
            </div>
          ))} */}
          {messages.map((message, i) => (
            <div
            key={i}
            className={`chat ${message.isBot ? 'bot' : ''} ${message.isIntro ? 'centered-intro' : ''}`}
          >
            <p className={`txt ${message.text === 'Typing...' ? 'typing-indicator' : ''}`}>
              {message.text}
            </p>
          </div>
        ))}


          <div ref={msgEnd} />
        </div>

        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="send" onClick={handleSend}>
              <img src={sendBtn} alt="Send" />
            </button>
          </div>
          <p className='coright'>ChatGPT may produce incorrect results, please verify important information. 
          <small className='coright'> Made By Triumph Ojocheyi Samuel</small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;


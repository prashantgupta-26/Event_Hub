nodeimport React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Send, User, Bot } from 'lucide-react';

const ChatBuddy = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your Event Buddy. Ask me anything about events in your community!", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/chat', { message: input });
      setMessages(prev => [...prev, { text: res.data.response, isBot: true }]);
    } catch (err) {
      setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting right now.", isBot: true }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 90px)' }}>
      <header style={{ marginBottom: '16px' }}>
        <h2 className="gradient-text">ChatBuddy</h2>
        <p style={{ color: '#666', fontSize: '14px' }}>Powered by AI</p>
      </header>

      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px', padding: '8px' }}>
        {messages.map((msg, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: msg.isBot ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ 
              display: 'flex', 
              justifyContent: msg.isBot ? 'flex-start' : 'flex-end',
              marginBottom: '12px'
            }}
          >
            <div style={{ 
              maxWidth: '80%', 
              padding: '12px 16px', 
              borderRadius: msg.isBot ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
              background: msg.isBot ? '#F0F0F0' : 'var(--primary-gradient)',
              color: msg.isBot ? '#333' : 'white',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {loading && <p style={{ color: '#888', fontSize: '12px' }}>Buddy is typing...</p>}
        <div ref={scrollRef} />
      </div>

      <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px', position: 'relative' }}>
        <input 
          type="text" 
          className="input" 
          placeholder="Ask something..." 
          style={{ marginBottom: 0, borderRadius: '24px' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="btn" style={{ width: 'auto', borderRadius: '50%', padding: '12px' }}>
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatBuddy;

// components/ChatBot.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Halo! Saya AgriBot 🤖\n\nAda yang bisa saya bantu? Silakan tanya tentang:\n\n🌾 Pupuk (Urea, NPK, ZA, KCL)\n🐛 Hama & Penyakit (Walang sangit, Blas, Antraknosa)\n💡 Tips Bertani (Pupuk dasar, Irigasi, Panen)',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input,
          history: messages 
        })
      });

      const data = await response.json();

      const botMessage: Message = {
        id: Date.now() + 1,
        text: data.reply || data.error || 'Maaf, terjadi kesalahan. Silakan coba lagi.',
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: 'Maaf, terjadi kesalahan koneksi. Silakan coba lagi.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  // Tombol chat (ketika tertutup)
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
      isMinimized ? 'w-80 h-14' : 'w-[90vw] sm:w-[400px] h-[600px]'
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">AgriBot AI</h3>
            <p className="text-white/70 text-[10px] flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              Online • Siap membantu
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white/70 hover:text-white p-1 rounded-lg transition"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white p-1 rounded-lg transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] ${msg.isUser ? 'order-2' : 'order-1'}`}>
                  <div className={`flex items-start gap-2 ${msg.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.isUser ? 'bg-emerald-500' : 'bg-gray-300'
                    }`}>
                      {msg.isUser ? (
                        <User className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <Bot className="w-3.5 h-3.5 text-gray-600" />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-2 text-sm ${
                        msg.isUser
                          ? 'bg-emerald-500 text-white rounded-tr-none'
                          : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-gray-800">{msg.text}</p>
                      <p className={`text-[10px] mt-1 ${
                        msg.isUser ? 'text-emerald-100' : 'text-gray-400'
                      }`}>
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-2 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tanya tentang pertanian..."
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-2.5 rounded-xl disabled:opacity-50 hover:shadow-lg transition-all duration-200"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-2">
              AgriBot siap membantu 24 jam
            </p>
          </div>
        </>
      )}
    </div>
  );
}
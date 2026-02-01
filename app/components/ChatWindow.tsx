"use client";

import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../lib/types';
import Image from 'next/image';

interface ChatWindowProps {
  onClose: () => void;
}

const QUICK_REPLIES = [
  "What projects have you worked on?",
  "What are your skills?",
  "Tell me about your experience",
  "Are you available for work?"
];

const ChatWindow = ({ onClose }: ChatWindowProps) => {
  const [userId] = useState(() => {
    // Get or create persistent user ID (session-based)
    if (typeof window !== 'undefined') {
      let id = sessionStorage.getItem('chatUserId');
      if (!id) {
        id = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        sessionStorage.setItem('chatUserId', id);
      }
      return id;
    }
    return `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [lastPollTime, setLastPollTime] = useState<string | null>(null);
  const [humanTookOver, setHumanTookOver] = useState(false);
  const [isHumanTyping, setIsHumanTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Poll for new human messages every 3 seconds
  useEffect(() => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch('/api/chat/poll', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            lastMessageTime: lastPollTime
          })
        });

        const data = await response.json();

        // Check if human took over
        if (data.conversationStatus === 'human_active' && !humanTookOver) {
          setHumanTookOver(true);
          // Show takeover notification
          const takeoverMessage: ChatMessage = {
            role: 'system',
            content: '🎉 Great news! Marc is now personally handling your conversation.',
            timestamp: new Date().toISOString()
          };
          setMessages(prev => [...prev, takeoverMessage]);
        }

        if (data.newMessages && data.newMessages.length > 0) {
          // Show typing indicator briefly
          setIsHumanTyping(true);
          
          setTimeout(() => {
            // Add new human messages to the chat
            const humanMessages: ChatMessage[] = data.newMessages.map((msg: any) => ({
              role: 'human',
              content: msg.message,
              timestamp: new Date().toISOString()
            }));

            setMessages(prev => [...prev, ...humanMessages]);
            setLastPollTime(data.newMessages[data.newMessages.length - 1].created_at);
            setIsHumanTyping(false);
          }, 1000); // Show typing for 1 second
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 3000); // Poll every 3 seconds

    return () => clearInterval(pollInterval);
  }, [userId, lastPollTime, humanTookOver]);

  // Load conversation history on mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        // Try to load from sessionStorage first (instant)
        const cached = sessionStorage.getItem(`chat_${userId}`);
        if (cached) {
          const cachedMessages = JSON.parse(cached);
          setMessages(cachedMessages);
        } else {
          // Show welcome message if no history
          setMessages([{
            role: 'assistant',
            content: "Hi! I'm Marc's AI assistant. How can I help you today?",
            timestamp: new Date().toISOString()
          }]);
        }
      } catch (error) {
        console.error('Error loading history:', error);
        // Fallback to welcome message
        setMessages([{
          role: 'assistant',
          content: "Hi! I'm Marc's AI assistant. How can I help you today?",
          timestamp: new Date().toISOString()
        }]);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    loadHistory();
  }, [userId]);

  // Save messages to sessionStorage whenever they change
  useEffect(() => {
    if (messages.length > 0 && !isLoadingHistory) {
      sessionStorage.setItem(`chat_${userId}`, JSON.stringify(messages));
    }
  }, [messages, userId, isLoadingHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: textToSend,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowQuickReplies(false);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          userId: userId,
          userName: 'Website Visitor'
        })
      });

      const data = await response.json();

      if (data.success) {
        const aiMessage: ChatMessage = {
          role: 'assistant',
          content: data.response,
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: "Sorry, I'm having trouble right now. Please try again or contact Marc directly at marcveslino000@gmail.com",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setShowClearConfirm(true);
  };

  const confirmClearChat = () => {
    sessionStorage.removeItem(`chat_${userId}`);
    setMessages([{
      role: 'assistant',
      content: "Hi! I'm Marc's AI assistant. How can I help you today?",
      timestamp: new Date().toISOString()
    }]);
    setShowQuickReplies(true);
    setShowClearConfirm(false);
  };

  const copyMessage = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const handleQuickReply = (reply: string) => {
    setInput(reply);
    inputRef.current?.focus();
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-[9999] animate-slideUp border border-gray-200" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg">
              <Image
                src="/android-chrome-512x512.png"
                alt="Marc Vesliño"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="font-semibold">Marc's AI Assistant</h3>
            <p className="text-xs text-green-300 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearChat}
            className="hover:bg-gray-800 p-2 rounded-full transition-colors"
            title="Clear chat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <button
            onClick={onClose}
            className="hover:bg-gray-800 p-2 rounded-full transition-colors"
            title="Close chat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
        {messages.map((msg, index) => {
          // System messages (takeover notification)
          if (msg.role === 'system') {
            return (
              <div key={index} className="flex justify-center animate-fadeIn">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 text-blue-800 px-4 py-3 rounded-xl shadow-sm max-w-[90%] text-center">
                  <p className="text-sm font-medium">{msg.content}</p>
                </div>
              </div>
            );
          }

          // Human messages (from you via Telegram)
          if (msg.role === 'human') {
            return (
              <div key={index} className="flex justify-start animate-fadeIn">
                <div className="flex flex-col items-start max-w-[85%]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-purple-300">
                      <Image
                        src="/android-chrome-512x512.png"
                        alt="Marc"
                        width={24}
                        height={24}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs font-semibold text-purple-700 flex items-center gap-1">
                      Marc Vesliño
                      <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                  <div className="group relative p-3 rounded-2xl rounded-tl-none shadow-md bg-gradient-to-br from-amber-50 via-rose-50 to-purple-100 text-gray-900 border border-purple-200">
                    <p className="text-sm whitespace-pre-wrap leading-relaxed font-medium">{msg.content}</p>
                    
                    {/* Copy button */}
                    <button
                      onClick={() => copyMessage(msg.content, index)}
                      className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 text-white p-1.5 rounded-full shadow-lg hover:bg-gray-600"
                      title="Copy message"
                    >
                      {copiedIndex === index ? (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <span className="text-xs text-gray-400 mt-1 px-2">{formatTime(msg.timestamp)}</span>
                </div>
              </div>
            );
          }

          // Regular messages (user and AI)
          return (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
              <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[85%]`}>
                <div
                  className={`group relative p-3 rounded-2xl shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-gray-900 to-black text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  
                  {/* Copy button */}
                  <button
                    onClick={() => copyMessage(msg.content, index)}
                    className={`absolute -top-2 ${msg.role === 'user' ? '-left-2' : '-right-2'} opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 text-white p-1.5 rounded-full shadow-lg hover:bg-gray-600`}
                    title="Copy message"
                  >
                    {copiedIndex === index ? (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>
                <span className="text-xs text-gray-400 mt-1 px-2">{formatTime(msg.timestamp)}</span>
              </div>
            </div>
          );
        })}
        
        {/* Human Typing Indicator */}
        {isHumanTyping && (
          <div className="flex justify-start animate-fadeIn">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-purple-300">
                <Image
                  src="/android-chrome-512x512.png"
                  alt="Marc"
                  width={24}
                  height={24}
                  className="object-cover"
                />
              </div>
              <div className="bg-gradient-to-br from-amber-50 via-rose-50 to-purple-100 border border-purple-200 px-4 py-3 rounded-2xl rounded-tl-none shadow-md">
                <div className="flex gap-1.5 items-center">
                  <span className="text-xs font-medium mr-2 text-gray-900">Marc is typing</span>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* AI Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start animate-fadeIn">
            <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-bl-none shadow-sm">
              <div className="flex gap-1.5 items-center">
                <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Quick Replies */}
        {showQuickReplies && messages.length === 1 && !isLoading && (
          <div className="space-y-2 animate-fadeIn">
            <p className="text-xs text-gray-500 text-center">Quick questions:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {QUICK_REPLIES.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-full hover:border-black hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-full focus:outline-none focus:border-black transition-all duration-200 text-sm"
              disabled={isLoading}
            />
            {input && (
              <button
                onClick={() => setInput('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <button
            onClick={() => sendMessage()}
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-gray-900 to-black text-white p-3 rounded-full hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none transform hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Powered by AI • Press Enter to send
        </p>
      </div>
    </div>

    {/* Clear Chat Confirmation Modal */}
    {showClearConfirm && (
      <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-[10000] animate-fadeIn" onClick={() => setShowClearConfirm(false)}>
        <div className="bg-white rounded-2xl p-6 max-w-sm mx-4 shadow-2xl animate-slideUp" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Clear Chat History?</h3>
              <p className="text-sm text-gray-500">This will start a new conversation</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowClearConfirm(false)}
              className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={confirmClearChat}
              className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Clear Chat
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  );
};

export default ChatWindow;

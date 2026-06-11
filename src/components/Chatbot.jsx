'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { MessageCircle, X, Send } from 'lucide-react';
import { getResponse } from '../lib/chatEngine';

const INITIAL_MESSAGE = {
  id: 'welcome',
  text: "Hey! I'm Vipul's AI assistant. Ask me anything about his skills, experience, or projects!",
  sender: 'bot',
  suggestions: [
    'What tech stack does Vipul use?',
    'Tell me about his experience',
    'Is he available for work?',
  ],
};

const nextId = () => `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const bubbleRef = useRef(null);
  const pulseRef = useRef(null);
  const panelRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const floatTween = useRef(null);
  const pulseTween = useRef(null);
  const typingDotsRef = useRef(null);

  // ----- Bubble floating + pulse animation -----
  useEffect(() => {
    if (!bubbleRef.current) return;

    floatTween.current = gsap.to(bubbleRef.current, {
      y: -4,
      duration: 1.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    pulseTween.current = gsap.to(pulseRef.current, {
      scale: 2.2,
      opacity: 0,
      duration: 1.8,
      ease: 'power2.out',
      repeat: -1,
      repeatDelay: 0.5,
    });

    return () => {
      floatTween.current?.kill();
      pulseTween.current?.kill();
    };
  }, []);

  // ----- (body scroll lock removed — panel is no longer full-screen) -----

  // ----- Scroll to bottom on new messages -----
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // ----- Typing dots animation -----
  useEffect(() => {
    if (!isTyping || !typingDotsRef.current) return;

    const dots = typingDotsRef.current.querySelectorAll('.typing-dot');
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(dots, {
      scale: 1.4,
      opacity: 1,
      duration: 0.3,
      stagger: 0.15,
      ease: 'power2.out',
    }).to(dots, {
      scale: 1,
      opacity: 0.4,
      duration: 0.3,
      stagger: 0.15,
      ease: 'power2.in',
    });

    return () => tl.kill();
  }, [isTyping]);

  // ----- Escape key handler -----
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closePanel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // ----- Animate a single message on mount -----
  const animateMessage = useCallback((el) => {
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
    );
  }, []);

  // ----- Open panel -----
  const openPanel = useCallback(() => {
    setIsOpen(true);

    if (!hasOpened) {
      setHasOpened(true);
      setMessages([INITIAL_MESSAGE]);
    }

    // Kill bubble animations while open
    floatTween.current?.pause();
    pulseTween.current?.pause();
    gsap.set(pulseRef.current, { opacity: 0 });

    requestAnimationFrame(() => {
      if (!panelRef.current) return;

      gsap.fromTo(
        panelRef.current,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.35,
          ease: 'back.out(1.7)',
          transformOrigin: 'bottom right',
          onComplete: () => {
            inputRef.current?.focus();
          },
        }
      );
    });
  }, [hasOpened]);

  // ----- Close panel -----
  const closePanel = useCallback(() => {
    if (!panelRef.current) return;

    gsap.to(panelRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      transformOrigin: 'bottom right',
      onComplete: () => {
        setIsOpen(false);
        floatTween.current?.resume();
        pulseTween.current?.resume();
      },
    });
  }, []);

  // ----- Send message -----
  const sendMessage = useCallback(
    async (text) => {
      const trimmed = (text || '').trim();
      if (!trimmed || isTyping) return;

      const userMsg = { id: nextId(), text: trimmed, sender: 'user' };
      setMessages((prev) => [...prev, userMsg]);
      setInputValue('');
      setIsTyping(true);

      // Simulated delay for realism
      const delay = 300 + Math.random() * 500;
      await new Promise((r) => setTimeout(r, delay));

      try {
        const response = await getResponse(trimmed);
        const botMsg = {
          id: nextId(),
          text: response.text || response,
          sender: 'bot',
          suggestions: response.suggestions || [],
        };
        setMessages((prev) => [...prev, botMsg]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            text: "Sorry, something went wrong. Please try again!",
            sender: 'bot',
            suggestions: [],
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [isTyping]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  return (
    <>
      {/* ---- Chat Panel ---- */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Chat with Vipul's AI"
          data-chatbot
          className="fixed z-[9999] flex flex-col bg-[#0a0a0a] border border-white/10
            rounded-2xl shadow-2xl
            bottom-20 right-4 left-4 md:left-auto md:right-6 md:bottom-24 md:w-[380px]"
          style={{ height: 'min(520px, calc(100dvh - 7rem))' }}
        >

          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              background:
                'linear-gradient(to bottom, rgba(255,255,255,0.03), transparent)',
              paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-white">
                Chat with Vipul&apos;s AI
              </span>
            </div>
            <button
              onClick={closePanel}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Close chat"
              style={{ minWidth: 44, minHeight: 44 }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">
            {messages.map((msg) => (
              <div key={msg.id}>
                <div
                  ref={animateMessage}
                  className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed rounded-2xl whitespace-pre-wrap break-words ${
                    msg.sender === 'bot'
                      ? 'bg-white/[0.06] text-gray-200 rounded-bl-sm mr-auto'
                      : 'bg-white/[0.12] text-white rounded-br-sm ml-auto'
                  }`}
                  style={{ overflowWrap: 'anywhere' }}
                >
                  {msg.text}
                </div>
                {/* Suggestion chips */}
                {msg.sender === 'bot' &&
                  msg.suggestions &&
                  msg.suggestions.length > 0 && (
                    <div
                      ref={animateMessage}
                      className="flex flex-wrap gap-2 mt-2"
                    >
                      {msg.suggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => handleSuggestionClick(s)}
                          className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-gray-400
                            hover:text-white hover:border-white/25 hover:bg-white/[0.04]
                            transition-colors"
                          style={{ minHeight: 32 }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div
                ref={typingDotsRef}
                className="flex items-center gap-1 px-3.5 py-3 bg-white/[0.06] rounded-2xl rounded-bl-sm w-fit"
              >
                <span className="typing-dot w-1.5 h-1.5 rounded-full bg-gray-400 opacity-40" />
                <span className="typing-dot w-1.5 h-1.5 rounded-full bg-gray-400 opacity-40" />
                <span className="typing-dot w-1.5 h-1.5 rounded-full bg-gray-400 opacity-40" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form
            onSubmit={handleSubmit}
            className="shrink-0 flex items-center gap-2 px-3 py-3 border-t border-white/[0.08]"
            style={{
              paddingBottom:
                'max(0.75rem, env(safe-area-inset-bottom))',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-white/[0.06] text-sm text-white placeholder-gray-500
                rounded-xl px-4 py-2.5 outline-none
                focus:ring-1 focus:ring-white/20 transition-shadow"
              style={{ minHeight: 44 }}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-2.5 rounded-xl bg-white/[0.1] text-gray-300
                hover:bg-white/[0.18] hover:text-white
                disabled:opacity-30 disabled:hover:bg-white/[0.1]
                transition-colors"
              aria-label="Send message"
              style={{ minWidth: 44, minHeight: 44 }}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* ---- Floating Bubble Button ---- */}
      <button
        ref={bubbleRef}
        onClick={isOpen ? closePanel : openPanel}
        aria-label="Open chat"
        className="fixed bottom-6 right-6 z-[9998] w-14 h-14 rounded-full
          bg-white/[0.1] backdrop-blur-sm border border-white/10
          flex items-center justify-center
          text-white hover:bg-white/[0.18] transition-colors shadow-lg"
        style={{ minWidth: 56, minHeight: 56 }}
      >
        {/* Pulse ring */}
        <span
          ref={pulseRef}
          className="absolute inset-0 rounded-full border border-white/20 pointer-events-none"
          aria-hidden="true"
        />
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot, User, ShieldCheck } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text: 'Namaste! I am the PARIKALP AICTE Regulatory Intelligence Assistant. Ask me anything about the Approval Process Handbook (APH 2026-27), document verification norms, EVC inspection criteria, or continuous compliance tracking.',
      timestamp: '11:30 AM',
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [isOpen, messages]);

  const botResponses: { [key: string]: string } = {
    land: 'Under AICTE APH 2026-27, Technical Institutions in Urban category require minimum 7.5 contiguous acres of unencumbered land (registered or perpetual lease >= 30 years). Rural institutions require 10 acres.',
    faculty: 'The mandatory Student-to-Faculty Cadre Ratio is 1:15 for UG Engineering & Technology programs (1 Professor : 2 Associate Professors : 6 Assistant Professors). Compliance is verified via Form-16 and biometric logs.',
    evc: 'Expert Visit Committees (EVC) are scheduled with automated conflict-of-interest screening. The inspection committee comprises a Chairman (Senior Academician), Subject Expert, and CPWD/PWD Civil Representative with mandatory geotagged photographic evidence.',
    discrepancy: 'When the AI verification pipeline detects expired validity (such as an expired Fire NOC) or layout anomalies, it flags a discrepancy (RED/AMBER). Scrutiny officers issue a time-bound rectification notice (default 7 days).',
    escalation: 'The 3-tier SLA escalation matrix automatically escalates pending actions: Level 1 (Assigned Officer) -> Level 2 (Regional Director) -> Level 3 (AICTE HQ / Member Secretary) with automated SMS and priority alerts.',
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: timeStr,
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const lower = text.toLowerCase();
      let reply = 'According to the AICTE Approval Process Handbook (APH 2026-27), all institutions must adhere to statutory land, infrastructure, and faculty norms. All actions are immutably logged in the PARIKALP audit ledger.';

      if (lower.includes('land') || lower.includes('area') || lower.includes('lease')) {
        reply = botResponses.land;
      } else if (lower.includes('faculty') || lower.includes('cadre') || lower.includes('ratio')) {
        reply = botResponses.faculty;
      } else if (lower.includes('evc') || lower.includes('inspection') || lower.includes('visit')) {
        reply = botResponses.evc;
      } else if (lower.includes('discrepancy') || lower.includes('fire') || lower.includes('document')) {
        reply = botResponses.discrepancy;
      } else if (lower.includes('escalat') || lower.includes('sla') || lower.includes('delay')) {
        reply = botResponses.escalation;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: reply,
        timestamp: timeStr,
      };
      setMessages(prev => [...prev, botMsg]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
      {/* Chat Panel */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-modal border border-slate-200 overflow-hidden flex flex-col max-h-[520px] transition-all animate-float">
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-parikalp-primary flex items-center justify-center text-white font-bold text-sm shadow-xs">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-xs text-white">PARIKALP Regulatory AI</h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <p className="text-[10px] text-slate-400">
                  AICTE APH 2026-27 Knowledge Assistant
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="p-4 overflow-y-auto space-y-3 flex-1 bg-slate-50/50 text-xs min-h-[260px] max-h-[320px]">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-parikalp-lightblue text-parikalp-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-parikalp-primary text-white rounded-tr-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 shadow-xs rounded-tl-xs'
                  }`}
                >
                  <p className="text-xs">{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 ${
                      msg.sender === 'user' ? 'text-sky-200 text-right' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Bot className="w-4 h-4 text-parikalp-primary animate-pulse" />
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></span>
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 bg-slate-100/70 border-t border-slate-200/70 flex gap-1.5 overflow-x-auto text-[10px]">
            <button
              onClick={() => handleSend('What are the land norms for engineering colleges?')}
              className="px-2 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-full text-slate-700 whitespace-nowrap"
            >
              📐 Land Norms
            </button>
            <button
              onClick={() => handleSend('What is the mandatory faculty cadre ratio?')}
              className="px-2 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-full text-slate-700 whitespace-nowrap"
            >
              👥 Faculty Ratio
            </button>
            <button
              onClick={() => handleSend('How does EVC inspection scoring operate?')}
              className="px-2 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-full text-slate-700 whitespace-nowrap"
            >
              📋 EVC Scoring
            </button>
          </div>

          {/* Input Row */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Ask regulatory assistant..."
              className="flex-1 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-parikalp-primary focus:border-parikalp-primary bg-slate-50/50"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 rounded-xl bg-parikalp-primary hover:bg-blue-800 text-white transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-parikalp-primary text-white flex items-center justify-center shadow-elevated hover:scale-105 transition-transform relative group"
        title="Open PARIKALP Regulatory AI Assistant"
      >
        <MessageCircle className="w-6 h-6" />
        {hasUnread && !isOpen && (
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-amber-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>
    </div>
  );
};


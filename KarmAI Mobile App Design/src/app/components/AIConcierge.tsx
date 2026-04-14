import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Mic, Send } from "lucide-react";
import { fetchAIConciergeResponse } from "../../utils/ai-client";

interface AIConciergeProps {
  onClose: () => void;
}

export default function AIConcierge({ onClose }: AIConciergeProps) {
  const quickPrompts = [
    "Best combo under ₹100",
    "Free events today",
    "Study room now",
    "Break my bubble"
  ];

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string; customUI?: React.ReactNode }[]>([
    {
      role: 'user', 
      content: 'Book me a study room for 3 people, 2 hours, quiet, under ₹100'
    },
    {
      role: 'ai',
      content: 'Found 3 options for you within ₹100 · Quiet zones · 2hr slots available',
      customUI: (
        <div className="space-y-2 mt-3">
          {[
            { name: "Library Room 201", capacity: 4, price: 80, noise: "quiet" },
            { name: "Study Pod A3", capacity: 3, price: 60, noise: "quiet" },
            { name: "Co-Work Zone 5", capacity: 6, price: 90, noise: "quiet" },
          ].map((room, i) => (
            <div
              key={i}
              className="rounded-xl p-3"
              style={{ backgroundColor: "#1A1A22", border: "1px solid #222233" }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold" style={{ fontSize: "12px" }}>{room.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#888899]" style={{ fontSize: "11px" }}>{room.capacity}</span>
                  <span className="text-[#D97706] font-semibold" style={{ fontSize: "12px" }}>₹{room.price}</span>
                </div>
              </div>
              <button
                className="w-full h-7 rounded-lg font-medium"
                style={{ backgroundColor: "rgba(13, 148, 136, 0.15)", color: "#0D9488", fontSize: "11px" }}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )
    }
  ]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isTyping) return;

    const userPrompt = text.trim();
    setMessages((prev) => [...prev, { role: 'user', content: userPrompt }]);
    setInput("");
    setIsTyping(true);

    try {
      // Call the AMD ROCm backend
      const aiResponseText = await fetchAIConciergeResponse({ prompt: userPrompt });
      setMessages((prev) => [...prev, { role: 'ai', content: aiResponseText }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: 'ai', content: "My systems seem offline right now." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <motion.div
      className="absolute inset-0 z-[200] flex flex-col"
      style={{ backgroundColor: "#0A0A0F" }}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
    >
      <div className="h-[44px]" />
      <div className="h-[60px] px-5 flex items-center justify-between">
        <button onClick={onClose} className="flex items-center gap-2">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-white font-bold" style={{ fontSize: "16px" }}>KarmBot Concierge</h1>
          <p className="text-[#0D9488]" style={{ fontSize: "10px" }}>Powered by AMD LLM</p>
        </div>
        <div className="px-2 py-1 rounded-full" style={{ backgroundColor: "rgba(124, 58, 237, 0.15)", border: "1px solid rgba(124, 58, 237, 0.3)"}}>
          <span className="text-[#7C3AED] font-semibold" style={{ fontSize: "9px" }}>MI250X</span>
        </div>
      </div>

      <div 
        className="flex-1 overflow-y-auto px-5 py-4"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <div className="space-y-4 pb-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`p-4 rounded-[18px] ${msg.role === 'user' ? 'max-w-[75%]' : 'max-w-[85%]'}`}
                style={msg.role === 'user' 
                  ? { backgroundColor: "#2D1B69" }
                  : { backgroundColor: "#111118", borderLeft: "3px solid #0D9488" }
                }
              >
                <div className="text-white" style={{ fontSize: "13px", whiteSpace: "pre-wrap" }}>
                  {msg.content}
                </div>
                {msg.customUI && msg.customUI}
              </div>
            </div>
          ))}
          {isTyping && (
             <div className="flex justify-start">
               <div className="max-w-[85%] rounded-[18px] p-4" style={{ backgroundColor: "#111118", borderLeft: "3px solid #0D9488" }}>
                  <span className="text-[#666677] text-xs animate-pulse">Computing on AMD ROCm...</span>
               </div>
             </div>
          )}
        </div>
      </div>

      <div className="px-5 pb-6" style={{ backgroundColor: "#0A0A0F", borderTop: "1px solid #1A1A22" }}>
        <div className="flex gap-2 overflow-x-auto pb-3 pt-3" style={{ scrollbarWidth: "none" }}>
          {quickPrompts.map((prompt, i) => (
             <button
               key={i}
               onClick={() => handleSend(prompt)}
               className="px-3 py-1.5 rounded-full whitespace-nowrap"
               style={{ border: "1px solid #2A2A3E", color: "#0D9488", fontSize: "11px" }}
             >
               {prompt}
             </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#0D9488]/15">
            <Mic size={18} className="text-[#0D9488]" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything..."
            className="flex-1 h-12 px-4 rounded-xl text-white placeholder:text-[#666677] bg-[#1A1A2E] border border-[#2A2A3E] text-[13px] outline-none"
          />
          <button
            onClick={() => handleSend()}
            disabled={isTyping}
            className="w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #7C3AED, #9F7AEA)", boxShadow: "0 4px 12px rgba(124, 58, 237, 0.3)" }}
          >
            <Send size={18} className="text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}


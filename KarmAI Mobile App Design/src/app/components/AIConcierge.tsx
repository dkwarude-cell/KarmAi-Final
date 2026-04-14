import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Mic, Send } from "lucide-react";
import { fetchAIConciergeResponse } from "../../utils/ai-client";

interface AIConciergeProps {
  onClose: () => void;
}

export default function AIConcierge({ onClose }: AIConciergeProps) {
  const quickPrompts = [
    "Canteen reco (₹80)",
    "Gift finder (₹1,500)",
    "Club poster in 5 mins",
    "Expand Horizons"
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
      // Presentation Mocks for Priya's User Journey
      const lowerText = userPrompt.toLowerCase();
      if (lowerText.includes("canteen") || lowerText.includes("reco") || lowerText.includes("80")) {
        setMessages((prev) => [...prev, {
          role: 'ai',
          content: 'Here are 3 healthy breakfast options under ₹80 near Powai. I picked these because they are fast (under 10 mins) and fit your budget before your 8 AM lecture:',
          customUI: (
            <div className="space-y-2 mt-3">
              {[
                { name: "Aahar Canteen", distance: "2 mins", reason: "Idli Sambar - Fast & healthy", price: 45 },
                { name: "Powai Cafe", distance: "5 mins", reason: "Oats & Fruits - High protein", price: 75 },
                { name: "Campus Eatery", distance: "1 min", reason: "Poha - Ready to eat", price: 30 },
              ].map((item, i) => (
                <div key={i} className="rounded-xl p-3" style={{ backgroundColor: "#1A1A22", border: "1px solid #222233" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold flex-1" style={{ fontSize: "12px" }}>{item.name}</span>
                    <span className="text-[#00CBA4] font-semibold flex-shrink-0" style={{ fontSize: "12px" }}>₹{item.price}</span>
                  </div>
                  <div className="text-[#00CBA4]" style={{ fontSize: "11px", marginBottom: "4px" }}>Why? {item.reason}</div>
                  <div className="text-[#888899]" style={{ fontSize: "10px" }}>{item.distance} away • Grab before 8 AM lecture</div>
                </div>
              ))}
            </div>
          )
        }]);
        return;
      }

      if (lowerText.includes("gift") || lowerText.includes("1500") || lowerText.includes("1,500")) {
        setMessages((prev) => [...prev, {
          role: 'ai',
          content: 'Here are 5 curated birthday gifts for your roommate under ₹1,500! I noticed from her profile that she likes art and photography based on her Campus check-ins:',
          customUI: (
            <div className="space-y-2 mt-3">
              <div className="rounded-xl p-3" style={{ backgroundColor: "#1A1A22", border: "1px solid #222233" }}>
                <span className="text-white font-semibold block" style={{ fontSize: "12px" }}>1. Vintage Film Camera</span>
                <span className="text-[#00CBA4] font-semibold block mb-1" style={{ fontSize: "12px" }}>₹1,200</span>
                <span className="text-[#888899]" style={{ fontSize: "11px" }}>Available at: Powai Camera Store</span>
              </div>
              <div className="rounded-xl p-3" style={{ backgroundColor: "#1A1A22", border: "1px solid #222233" }}>
                <span className="text-white font-semibold block" style={{ fontSize: "12px" }}>2. Calligraphy Set</span>
                <span className="text-[#00CBA4] font-semibold block mb-1" style={{ fontSize: "12px" }}>₹850</span>
                <span className="text-[#888899]" style={{ fontSize: "11px" }}>Pairs perfectly with her design background</span>
              </div>
              <div className="rounded-xl p-3" style={{ backgroundColor: "#1A1A22", border: "1px solid #222233" }}>
                <span className="text-white font-semibold block" style={{ fontSize: "12px" }}>3. Customized Canvas Tote</span>
                <span className="text-[#00CBA4] font-semibold block mb-1" style={{ fontSize: "12px" }}>₹500</span>
              </div>
              <div className="text-[#666677] text-center mt-2 text-xs">View 2 more options below...</div>
            </div>
          )
        }]);
        return;
      }

      if (lowerText.includes("poster") || lowerText.includes("design") || lowerText.includes("club")) {
        setMessages((prev) => [...prev, {
          role: 'ai',
          content: 'No problem. I\'ve generated an AI-designed poster for your club event in just 5 seconds. No Canva subscription required!',
          customUI: (
             <div className="mt-3 p-3 rounded-xl flex flex-col items-center" style={{ backgroundColor: "rgba(124, 92, 232, 0.15)", border: "1px solid rgba(124, 92, 232, 0.3)" }}>
                <div className="w-full aspect-[4/5] bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center relative overflow-hidden mb-3">
                   <div className="absolute inset-0 bg-black/20" />
                   <div className="relative text-center p-4">
                     <div className="text-white font-bold text-lg mb-2 drop-shadow-md">Art & Intellect Night</div>
                     <div className="text-white/90 text-xs shadow-md">Dec 12 • Location: Student Center</div>
                   </div>
                </div>
                <button className="w-full py-2 bg-[#7C5CE8] text-white rounded-lg text-xs font-bold shadow-lg text-center">
                  Use this Design
                </button>
             </div>
          )
        }]);
        return;
      }

      if (lowerText.includes("expand") || lowerText.includes("horizon")) {
        setMessages((prev) => [...prev, {
          role: 'ai',
          content: 'Karma unlocked! 🌟 50 XP awarded for exploring a new genre. Here is a phenomenal documentary about Marine Biology (outside your usual interests) to expand your horizons. Because you love analyzing structure, this deep dive into cetacean communication might blow your mind.',
          customUI: (
            <div className="mt-3 p-3 rounded-xl border border-[#00CBA4]/30 bg-[#00CBA4]/10">
              <div className="w-full h-32 bg-teal-900/50 rounded-lg mb-2 flex items-center justify-center">
                <span className="text-4xl">🐋</span>
              </div>
              <div className="text-white text-sm font-bold">Deep Blue: Secrets of the Ocean</div>
              <div className="text-[#00CBA4] text-xs font-semibold mb-2">98% match for your philosophical curiosity</div>
              
              <button className="w-full py-2 mt-2 bg-gradient-to-r from-[#00CBA4] to-teal-500 text-gray-900 rounded-lg text-xs font-bold text-center">
                Watch Now (+50 Karma Premium Unlock)
              </button>
            </div>
          )
        }]);
        return;
      }

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


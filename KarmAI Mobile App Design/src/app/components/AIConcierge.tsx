import { motion } from "motion/react";
import { ArrowLeft, Mic, Send } from "lucide-react";

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

  return (
    <motion.div
      className="absolute inset-0 z-[200] flex flex-col"
      style={{ backgroundColor: "#0A0A0F" }}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
    >
      {/* Status Bar */}
      <div className="h-[44px]" />

      {/* Top Bar */}
      <div className="h-[60px] px-5 flex items-center justify-between">
        <button onClick={onClose} className="flex items-center gap-2">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-white font-bold" style={{ fontSize: "16px" }}>
            KarmBot Concierge
          </h1>
          <p className="text-[#0D9488]" style={{ fontSize: "10px" }}>
            Understands time, budget & your bubble
          </p>
        </div>
        <div
          className="px-2 py-1 rounded-full"
          style={{
            backgroundColor: "rgba(124, 58, 237, 0.15)",
            border: "1px solid rgba(124, 58, 237, 0.3)",
          }}
        >
          <span className="text-[#7C3AED] font-semibold" style={{ fontSize: "9px" }}>
            GPT-4
          </span>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        className="flex-1 overflow-y-auto px-5 py-4"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        {/* Conversation Thread */}
        <div className="space-y-4">
          {/* User Message 1 */}
          <div className="flex justify-end">
            <div
              className="max-w-[75%] px-4 py-3 rounded-[18px]"
              style={{
                backgroundColor: "#2D1B69",
              }}
            >
              <p className="text-white" style={{ fontSize: "13px" }}>
                Book me a study room for 3 people, 2 hours, quiet, under ₹100
              </p>
            </div>
          </div>

          {/* AI Response 1 */}
          <div className="flex justify-start">
            <div
              className="max-w-[85%] rounded-[18px] p-4"
              style={{
                backgroundColor: "#111118",
                borderLeft: "3px solid #0D9488",
              }}
            >
              <h3 className="text-white font-bold mb-3" style={{ fontSize: "14px" }}>
                Found 3 options for you
              </h3>

              {/* Result Cards */}
              <div className="space-y-2">
                {[
                  { name: "Library Room 201", capacity: 4, price: 80, noise: "quiet" },
                  { name: "Study Pod A3", capacity: 3, price: 60, noise: "quiet" },
                  { name: "Co-Work Zone 5", capacity: 6, price: 90, noise: "quiet" },
                ].map((room, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-3"
                    style={{
                      backgroundColor: "#1A1A22",
                      border: "1px solid #222233",
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-semibold" style={{ fontSize: "12px" }}>
                        {room.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="5" r="2" fill="#888899" />
                            <path d="M3 12c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="#888899" strokeWidth="1.5" fill="none" />
                          </svg>
                          <span className="text-[#888899]" style={{ fontSize: "11px" }}>
                            {room.capacity}
                          </span>
                        </div>
                        <span className="text-[#D97706] font-semibold" style={{ fontSize: "12px" }}>
                          ₹{room.price}
                        </span>
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: "#10B981" }}
                        />
                      </div>
                    </div>
                    <button
                      className="w-full h-7 rounded-lg font-medium"
                      style={{
                        backgroundColor: "rgba(13, 148, 136, 0.15)",
                        color: "#0D9488",
                        fontSize: "11px",
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                ))}
              </div>

              <p className="text-[#666677] mt-3" style={{ fontSize: "10px" }}>
                All within ₹100 · Quiet zones · 2hr slots available
              </p>
            </div>
          </div>

          {/* User Message 2 */}
          <div className="flex justify-end">
            <div
              className="max-w-[75%] px-4 py-3 rounded-[18px]"
              style={{
                backgroundColor: "#2D1B69",
              }}
            >
              <p className="text-white" style={{ fontSize: "13px" }}>
                What's for lunch today? I have ₹150 and I'm vegetarian
              </p>
            </div>
          </div>

          {/* AI Response 2 */}
          <div className="flex justify-start">
            <div
              className="max-w-[85%] rounded-[18px] p-4"
              style={{
                backgroundColor: "#111118",
                borderLeft: "3px solid #0D9488",
              }}
            >
              <h3 className="text-white font-bold mb-3" style={{ fontSize: "14px" }}>
                Best combo for ₹150 🌱
              </h3>

              {/* Food Items Horizontal Scroll */}
              <div className="flex gap-2 overflow-x-auto pb-2 mb-3" style={{ scrollbarWidth: "none" }}>
                {[
                  { name: "Paneer Tikka", price: 70, counter: "Counter 3" },
                  { name: "Veg Biryani", price: 50, counter: "Counter 7" },
                  { name: "Lassi", price: 22, counter: "Counter 3" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="min-w-[120px] rounded-xl p-2"
                    style={{
                      backgroundColor: "#1A1A22",
                      border: "1px solid #222233",
                    }}
                  >
                    <p className="text-white font-semibold mb-1" style={{ fontSize: "11px" }}>
                      {item.name}
                    </p>
                    <p className="text-[#D97706] font-bold mb-1" style={{ fontSize: "13px" }}>
                      ₹{item.price}
                    </p>
                    <p className="text-[#888899]" style={{ fontSize: "9px" }}>
                      📍 {item.counter}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#888899]" style={{ fontSize: "11px" }}>
                    Total
                  </span>
                  <span className="text-[#0D9488] font-bold" style={{ fontSize: "14px" }}>
                    ₹142
                  </span>
                </div>
                
                <p className="text-[#D97706]" style={{ fontSize: "10px" }}>
                  Usually ₹165 · Saving ₹23 today
                </p>

                <div
                  className="inline-flex px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(16, 185, 129, 0.15)",
                  }}
                >
                  <span className="text-[#10B981]" style={{ fontSize: "10px" }}>
                    ✓ Matches your diet
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Input Bar */}
      <div 
        className="px-5 pb-6"
        style={{
          backgroundColor: "#0A0A0F",
          borderTop: "1px solid #1A1A22",
        }}
      >
        {/* Quick Prompts */}
        <div className="flex gap-2 overflow-x-auto pb-3 pt-3" style={{ scrollbarWidth: "none" }}>
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              className="px-3 py-1.5 rounded-full whitespace-nowrap"
              style={{
                border: "1px solid #2A2A3E",
                color: "#0D9488",
                fontSize: "11px",
              }}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Field */}
        <div className="flex items-center gap-2">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "rgba(13, 148, 136, 0.15)",
            }}
          >
            <Mic size={18} className="text-[#0D9488]" />
          </button>

          <input
            type="text"
            placeholder="Ask anything... time, budget, food, rooms, events"
            className="flex-1 h-12 px-4 rounded-xl text-white placeholder:text-[#666677]"
            style={{
              backgroundColor: "#1A1A2E",
              border: "1px solid #2A2A3E",
              fontSize: "13px",
              outline: "none",
            }}
          />

          <button
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #9F7AEA)",
              boxShadow: "0 4px 12px rgba(124, 58, 237, 0.3)",
            }}
          >
            <Send size={18} className="text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

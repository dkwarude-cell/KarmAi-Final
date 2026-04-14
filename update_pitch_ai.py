import re

filepath = r"KarmAI Mobile App Design\src\app\components\AIConcierge.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace quickPrompts
new_prompts = """const quickPrompts = [
    "Canteen reco (₹80)",
    "Gift finder (₹1,500)",
    "Club poster in 5 mins",
    "Expand Horizons"
  ];"""
content = re.sub(r'const quickPrompts = \[.*?\];', new_prompts, content, flags=re.DOTALL)

# Add hardcoded AI intercepts in handleSend
old_try = r"""    try \{
      // Call the AMD ROCm backend"""

new_try = r"""    try {
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

      // Call the AMD ROCm backend"""
content = re.sub(old_try, new_try, content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated AIConcierge for Priya Demo!")

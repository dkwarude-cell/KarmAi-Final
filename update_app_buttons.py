import re

filepath = r"KarmAI Mobile App Design\src\app\App.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

old_buttons = """              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setCheckInPlace(selectedMarker);
                    setShowCheckIn(true);
                  }}
                  className="flex-1 h-12 rounded-xl border text-[#00CBA4] font-medium flex items-center justify-center gap-2"
                  style={{
                    borderColor: "#00CBA4",
                    backgroundColor: "rgba(0, 203, 164, 0.05)",
                    fontSize: "14px",
                  }}
                >
                  <MapPin size={16} className="text-[#00CBA4]" />
                  Check-in
                </button>
                <button
                  onClick={() => {
                    setShowDriftDetail(true);
                    setSelectedMarker(null);
                  }}
                  className="flex-1 h-12 rounded-xl bg-[#7C5CE8] text-white font-medium"
                  style={{ fontSize: "14px" }}
                >
                  Add to drift
                </button>
              </div>"""

new_buttons = """              {/* Dynamic Contextual Action Buttons for Pitch */}
              <div className="grid grid-cols-2 gap-2 mb-2">
                {/* 1. GPS + Verification Check-in (Always first) */}
                <button onClick={() => { setCheckInPlace(selectedMarker); setShowCheckIn(true); }} className="h-10 rounded-[12px] border text-[#00CBA4] font-medium flex items-center justify-center gap-2" style={{ borderColor: "#00CBA4", backgroundColor: "rgba(0, 203, 164, 0.05)", fontSize: "12px" }}>
                  <MapPin size={14} className="text-[#00CBA4]" />
                  GPS Check-in
                </button>
                
                {/* 2. Ask AI - Always Available */}
                <button onClick={() => { setShowAIConcierge(true); setSelectedMarker(null); }} className="h-10 rounded-[12px] font-medium flex items-center justify-center gap-2" style={{ backgroundColor: "rgba(124, 92, 232, 0.15)", color: "#7C5CE8", border: "1px solid rgba(124, 92, 232, 0.3)", fontSize: "12px" }}>
                  <Wand2 size={14} />
                  Ask AI About This
                </button>
                
                {/* Specific campus or city buttons based on type */}
                {campusMode === "within" && (selectedMarker.type === "cafe" || selectedMarker.type === "canteen") && (
                   <button className="h-10 rounded-[12px] bg-[#FF6B35] text-white font-medium flex items-center justify-center" style={{ fontSize: "12px" }}>Order Now</button>
                )}
                {campusMode === "within" && (selectedMarker.type === "club" || selectedMarker.type === "event") && (
                   <button className="h-10 rounded-[12px] bg-[#7C5CE8] text-white font-medium flex items-center justify-center" style={{ fontSize: "12px" }}>Join Group</button>
                )}
                {campusMode === "outside" && (selectedMarker.type === "cafe" || selectedMarker.type === "restaurant") && (
                   <button className="h-10 rounded-[12px] bg-[#00CBA4] text-white font-medium flex items-center justify-center" style={{ fontSize: "12px" }}>Book Table</button>
                )}
                {campusMode === "outside" && (selectedMarker.type === "event" || selectedMarker.type === "workshop") && (
                   <button className="h-10 rounded-[12px] bg-[#7C5CE8] text-white font-medium flex items-center justify-center" style={{ fontSize: "12px" }}>Register Now</button>
                )}
                {campusMode === "outside" && (selectedMarker.type === "heritage" || selectedMarker.type === "adventure") && (
                   <button className="col-span-2 h-10 rounded-[12px] text-white font-medium flex items-center justify-center" style={{ background: "linear-gradient(135deg, #00CBA4, #3B8ADD)", fontSize: "12px" }}>Start This Journey</button>
                )}
                {campusMode === "outside" && !["heritage", "adventure", "event", "workshop", "cafe", "restaurant"].includes(selectedMarker.type) && (
                   <button className="h-10 rounded-[12px] bg-[#4A90E2] text-white font-medium flex items-center justify-center" style={{ fontSize: "12px" }}>Visit Place</button>
                )}
              </div>
              
              <button 
                onClick={() => { setShowDriftDetail(true); setSelectedMarker(null); }}
                className="w-full h-11 rounded-[12px] font-bold text-center border"
                style={{ backgroundColor: "#1A1A1A", color: "#FFFFFF", borderColor: "#333", fontSize: "13px" }}
              >
                Add to your schedule (Drift)
              </button>"""

content = content.replace(old_buttons, new_buttons)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated App_BottomSheet buttons!")

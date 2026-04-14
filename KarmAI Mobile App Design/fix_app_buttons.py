import re

file_path = 'src/app/App.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

replacement = """              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
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
                </div>
                
                {/* Dynamically inserted Contextual Action Buttons */}
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {campusMode === "within" ? (
                    <>
                      <button onClick={() => window.open('https://zomato.com', '_blank')} className="h-10 rounded-lg bg-[#FF6B35] text-white font-medium text-xs shadow-md shadow-[#FF6B35]/20">Order Now</button>
                      <button onClick={() => window.open('https://lu.ma', '_blank')} className="h-10 rounded-lg bg-[#333344] text-white font-medium text-xs shadow-md">Register Now</button>
                      <button onClick={() => { setShowAICards(true); setSelectedMarker(null); }} className="h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium text-xs flex items-center justify-center gap-1 shadow-md shadow-purple-500/20"><Wand2 size={12}/> Ask AI</button>
                      <button onClick={() => window.open('https://chat.whatsapp.com', '_blank')} className="h-10 rounded-lg bg-[#00CBA4] text-white font-medium text-xs shadow-md shadow-[#00CBA4]/20">Join Group</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => window.open('https://maps.google.com', '_blank')} className="h-10 rounded-lg bg-[#FF6B35] text-white font-medium text-xs shadow-md shadow-[#FF6B35]/20">Visit</button>
                      <button onClick={() => window.open('https://dineout.co.in', '_blank')} className="h-10 rounded-lg bg-[#333344] text-white font-medium text-xs shadow-md">Book Table</button>
                      <button onClick={() => window.open('https://bookmyshow.com', '_blank')} className="h-10 rounded-lg border border-[#7C5CE8] text-[#7C5CE8] font-medium text-xs shadow-sm bg-[#7C5CE8]/10">Book Now</button>
                      <button onClick={() => window.open('https://maps.google.com', '_blank')} className="h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-xs shadow-md shadow-pink-500/20">Start this journey</button>
                    </>
                  )}
                </div>
              </div>"""

pattern = r'<div className="flex gap-2">\s*<button\s*onClick=\{\(\) => \{\s*setCheckInPlace\(selectedMarker\);\s*setShowCheckIn\(true\);\s*\}\}\s*className="flex-1 h-12 rounded-xl border text-\[#00CBA4\] font-medium flex items-center justify-center gap-2"\s*style=\{\{\s*borderColor: "#00CBA4",\s*backgroundColor: "rgba\(0, 203, 164, 0\.05\)",\s*fontSize: "14px",\s*\}\}\s*>\s*<MapPin size=\{16\} className="text-\[#00CBA4\]" />\s*Check-in\s*</button>\s*<button\s*onClick=\{\(\) => \{\s*setShowDriftDetail\(true\);\s*setSelectedMarker\(null\);\s*\}\}\s*className="flex-1 h-12 rounded-xl bg-\[#7C5CE8\] text-white font-medium"\s*style=\{\{ fontSize: "14px" \}\}\s*>\s*Add to drift\s*</button>\s*</div>'

if re.search(pattern, content):
    content = re.sub(pattern, replacement, content)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully updated App.tsx buttons")
else:
    print("Pattern not found!")
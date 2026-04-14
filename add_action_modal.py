import re

file_path = r'c:\D\KarmAI\KarmAI Mobile App Design\src\app\App.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add import
if 'import ActionModal' not in content:
    import_stmt = 'import ActionModal from "./components/ActionModal";\n'
    content = re.sub(r'(import .* from "lucide-react";)', r'\1\n' + import_stmt, content)

# 2. Add state
if 'const [activeActionModal, setActiveActionModal]' not in content:
    state_stmt = '  const [activeActionModal, setActiveActionModal] = useState<{type: string, placeName: string} | null>(null);\n'
    content = re.sub(r'(const \[selectedMarker, setSelectedMarker\] = useState<any>\(null\);\n)', r'\1' + state_stmt, content)

# 3. Replace the grid buttons inside the bottom sheet
replacement = """                <div className="grid grid-cols-2 gap-2 mt-2">
                  {campusMode === "within" ? (
                    <>
                      <button onClick={() => setActiveActionModal({type: 'order', placeName: selectedMarker.name})} className="h-10 rounded-lg bg-[#FF6B35] text-white font-medium text-xs shadow-md shadow-[#FF6B35]/20">Order Now</button>
                      <button onClick={() => setActiveActionModal({type: 'register', placeName: selectedMarker.name})} className="h-10 rounded-lg bg-[#333344] text-white font-medium text-xs shadow-md">Register Now</button>
                      <button onClick={() => { setShowAICards(true); setSelectedMarker(null); }} className="h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium text-xs flex items-center justify-center gap-1 shadow-md shadow-purple-500/20"><Wand2 size={12}/> Ask AI</button>
                      <button onClick={() => setActiveActionModal({type: 'group', placeName: selectedMarker.name})} className="h-10 rounded-lg bg-[#00CBA4] text-white font-medium text-xs shadow-md shadow-[#00CBA4]/20">Join Group</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => window.open('https://maps.google.com/maps?q=' + selectedMarker.name, '_blank')} className="h-10 rounded-lg bg-[#FF6B35] text-white font-medium text-xs shadow-md shadow-[#FF6B35]/20">Visit</button>
                      <button onClick={() => setActiveActionModal({type: 'book', placeName: selectedMarker.name})} className="h-10 rounded-lg bg-[#333344] text-white font-medium text-xs shadow-md">Book Table</button>
                      <button onClick={() => setActiveActionModal({type: 'book', placeName: selectedMarker.name})} className="h-10 rounded-lg border border-[#7C5CE8] text-[#7C5CE8] font-medium text-xs shadow-sm bg-[#7C5CE8]/10">Book Now</button>
                      <button onClick={() => window.open('https://maps.google.com/maps?daddr=' + selectedMarker.name, '_blank')} className="h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-xs shadow-md shadow-pink-500/20">Start this journey</button>
                    </>
                  )}
                </div>"""

pattern = r'<div className="grid grid-cols-2 gap-2 mt-2">.*?</div>'
content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# 4. Mount the modal component
if '<ActionModal' not in content:
    modal_jsx = """      
      {activeActionModal && (
        <ActionModal 
          isOpen={true} 
          onClose={() => setActiveActionModal(null)} 
          actionType={activeActionModal.type} 
          placeName={activeActionModal.placeName} 
        />
      )}
"""
    content = content.replace('{/* Conditional Overlays */}', modal_jsx + '{/* Conditional Overlays */}')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated App.tsx successfully.")
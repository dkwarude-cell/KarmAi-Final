import re

filepath = r"KarmAI Mobile App Design\src\app\App.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure FloatingAICardGlass is rendered and onClick triggers setShowAIConcierge(true)
old_glass_code = r"{/\* Map View - Instruction overlay \(map is visible in background\) \*/}"
new_glass_code = """{/* Floating AI Agent for Pitch Demo */}
        {showAICards && navMode === "home" && (
          <div className="absolute right-4 bottom-24 z-[100]" onClick={() => setShowAIConcierge(true)}>
             <FloatingAICardGlass title="KarmAI AI" subtitle="Ask anything..." />
          </div>
        )}
        
        {/* Map View - Instruction overlay (map is visible in background) */}"""

if "Floating AI Agent for Pitch Demo" not in content:
    content = content.replace(old_glass_code, new_glass_code)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Added Floating AI Button to HomeScreen!")

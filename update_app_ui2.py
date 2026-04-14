import re

filepath = r"KarmAI Mobile App Design\src\app\App.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    '<FloatingAICardGlass title="KarmAI AI" subtitle="Ask anything..." />',
    '<FloatingAICardGlass title="KarmAI AI" subtitle="Ask anything..." x={0} y={0} onClick={() => setShowAIConcierge(true)} />'
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated FloatingAICardGlass props!")

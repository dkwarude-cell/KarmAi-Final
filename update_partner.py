import re

filepath = r"KarmAI Mobile App Design\src\app\components\PartnerDashboard.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add tabs
old_return = """  return (
    <motion.div
      className="absolute inset-0 z-[200] flex flex-col"
      style={{ backgroundColor: "#F8F9FA" }}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
    >
      {/* Header */}
      <div className="h-[44px] bg-white flex-shrink-0" />
      <div className="h-[60px] bg-white px-5 flex items-center justify-between border-b border-[#E5E7EB] flex-shrink-0">"""

new_return = """  const [activeTab, setActiveTab] = import("react").then(r => r.useState("restaurant"));
  const tabs = [
    { id: "restaurant", label: "Restaurant/Cafe" },
    { id: "club", label: "Clubs & Committees" },
    { id: "social", label: "Social Places" }
  ];

  return (
    <motion.div
      className="absolute inset-0 z-[200] flex flex-col"
      style={{ backgroundColor: "#F8F9FA" }}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
    >
      {/* Header */}
      <div className="h-[44px] bg-white flex-shrink-0" />
      <div className="h-[60px] bg-white px-5 flex items-center justify-between flex-shrink-0">"""

content = content.replace(old_return, new_return)

tabs_ui = """      </div>
      
      {/* Platform Monetization Tabs */}
      <div className="bg-white px-5 border-b border-[#E5E7EB] flex gap-4 overflow-x-auto pb-2 flex-shrink-0" style={{ scrollbarWidth: "none" }}>
        {["Restaurant Admin", "Club/Committee", "Social Spaces"].map((tab, i) => (
           <button key={i} className={`whitespace-nowrap px-4 py-2 font-bold text-sm border-b-2 ${i === 0 ? 'border-[#0D9488] text-[#0D9488]' : 'border-transparent text-[#666677]'}`}>{tab}</button>
        ))}
      </div>"""

content = content.replace('        </div>\n      </div>', '        </div>\n      </div>\n' + tabs_ui, 1)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated PartnerDashboard Monetization Tabs!")

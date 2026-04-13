import { useState } from "react";
import { motion } from "motion/react";
import { Building2, MapPin, Coffee, Calendar, Users, TrendingUp, Sparkles, ChevronRight } from "lucide-react";

interface CampusSelectionScreenProps {
  onSelect: (mode: "within" | "outside") => void;
  userLocation?: string;
}

export default function CampusSelectionScreen({ onSelect, userLocation = "Mumbai" }: CampusSelectionScreenProps) {
  const [selectedMode, setSelectedMode] = useState<"within" | "outside" | null>(null);

  const campusData = {
    within: {
      title: "Within Campus",
      subtitle: "Explore your campus ecosystem",
      color: "#FF6B35",
      gradient: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
      icon: Building2,
      stats: [
        { icon: Coffee, label: "5 Canteens", value: "2 min away" },
        { icon: Calendar, label: "12 Events", value: "Today" },
        { icon: Users, label: "234 Active", value: "Students online" },
      ],
      serendipityExamples: [
        "🍱 Counter 7 has your favorite dish (₹80)",
        "🎭 Philosophy Club meetup at 5 PM",
        "📚 DSA study group forming now",
      ],
    },
    outside: {
      title: "Outside Campus",
      subtitle: "Discover experiences in " + userLocation,
      color: "#4A90E2",
      gradient: "linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)",
      icon: MapPin,
      stats: [
        { icon: Coffee, label: "48 Cafes", value: "Within 3 km" },
        { icon: Calendar, label: "8 Events", value: "This weekend" },
        { icon: TrendingUp, label: "15 New", value: "Places to try" },
      ],
      serendipityExamples: [
        "☕ Blue Tokai - specialty coffee you'll love",
        "🎭 Open Mic at Prithvi Theatre tonight",
        "🍽️ Try Mediterranean at The Bohemian",
      ],
    },
  };

  const handleSelect = (mode: "within" | "outside") => {
    setSelectedMode(mode);
    setTimeout(() => {
      onSelect(mode);
    }, 600);
  };

  return (
    <div className="w-full h-full bg-[#F8F9FA] flex flex-col items-center justify-center p-5">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles size={28} className="text-[#FF6B35]" />
          <h1 className="text-[#1A1A1A] font-bold" style={{ fontSize: "28px" }}>
            Choose Your Experience
          </h1>
        </div>
        <p className="text-[#6B7280]" style={{ fontSize: "15px" }}>
          Where would you like to explore today?
        </p>
      </motion.div>

      {/* Serendipity Engine Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6 px-4 py-2 rounded-full"
        style={{
          background: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)",
          border: "1.5px solid #BAE6FD",
        }}
      >
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-[#0EA5E9]" />
          <span className="text-[#0369A1] font-semibold" style={{ fontSize: "12px" }}>
            AI Serendipity Engine Active
          </span>
        </div>
      </motion.div>

      {/* Campus Mode Cards */}
      <div className="w-full max-w-md space-y-4">
        {(["within", "outside"] as const).map((mode, index) => {
          const data = campusData[mode];
          const Icon = data.icon;
          const isSelected = selectedMode === mode;

          return (
            <motion.button
              key={mode}
              onClick={() => handleSelect(mode)}
              className="w-full rounded-3xl overflow-hidden text-left relative"
              style={{
                background: isSelected ? data.gradient : "#FFFFFF",
                border: `2px solid ${isSelected ? data.color : "#E5E7EB"}`,
                boxShadow: isSelected
                  ? `0 12px 32px ${data.color}40`
                  : "0 2px 8px rgba(0, 0, 0, 0.04)",
              }}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{
                        backgroundColor: isSelected ? "rgba(255,255,255,0.2)" : `${data.color}15`,
                      }}
                    >
                      <Icon size={28} style={{ color: isSelected ? "#FFFFFF" : data.color }} />
                    </div>
                    <div>
                      <h2
                        className="font-bold mb-1"
                        style={{
                          fontSize: "20px",
                          color: isSelected ? "#FFFFFF" : "#1A1A1A",
                        }}
                      >
                        {data.title}
                      </h2>
                      <p
                        style={{
                          fontSize: "13px",
                          color: isSelected ? "rgba(255,255,255,0.9)" : "#6B7280",
                        }}
                      >
                        {data.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    size={24}
                    style={{ color: isSelected ? "#FFFFFF" : data.color }}
                  />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {data.stats.map((stat, i) => {
                    const StatIcon = stat.icon;
                    return (
                      <div
                        key={i}
                        className="text-center p-3 rounded-xl"
                        style={{
                          backgroundColor: isSelected
                            ? "rgba(255,255,255,0.15)"
                            : "#F8F9FA",
                        }}
                      >
                        <StatIcon
                          size={18}
                          className="mx-auto mb-1"
                          style={{ color: isSelected ? "#FFFFFF" : data.color }}
                        />
                        <p
                          className="font-semibold mb-0.5"
                          style={{
                            fontSize: "11px",
                            color: isSelected ? "#FFFFFF" : "#1A1A1A",
                          }}
                        >
                          {stat.label}
                        </p>
                        <p
                          style={{
                            fontSize: "9px",
                            color: isSelected ? "rgba(255,255,255,0.8)" : "#6B7280",
                          }}
                        >
                          {stat.value}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Serendipity Examples */}
                <div
                  className="p-3 rounded-xl"
                  style={{
                    backgroundColor: isSelected ? "rgba(255,255,255,0.15)" : "#F8F9FA",
                    border: `1px solid ${isSelected ? "rgba(255,255,255,0.2)" : "#E5E7EB"}`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles
                      size={14}
                      style={{ color: isSelected ? "#FFFFFF" : data.color }}
                    />
                    <span
                      className="font-semibold"
                      style={{
                        fontSize: "11px",
                        color: isSelected ? "#FFFFFF" : data.color,
                      }}
                    >
                      AI RECOMMENDATIONS
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {data.serendipityExamples.map((example, i) => (
                      <p
                        key={i}
                        style={{
                          fontSize: "11px",
                          color: isSelected ? "rgba(255,255,255,0.9)" : "#6B7280",
                        }}
                      >
                        {example}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Selection Animation */}
              {isSelected && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: data.gradient,
                    mixBlendMode: "soft-light",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Bottom Note */}
      <motion.p
        className="text-center text-[#9CA3AF] mt-6"
        style={{ fontSize: "12px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        You can switch between modes anytime from settings
      </motion.p>
    </div>
  );
}

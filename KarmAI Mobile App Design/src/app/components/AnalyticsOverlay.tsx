import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

import { UserProfile } from "../types/profile";

interface AnalyticsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  profile?: UserProfile;
}

const radarData = [
  { category: "Departments", value: 14 },
  { category: "Events", value: 12 },
  { category: "People", value: 35 },
  { category: "Canteens", value: 18 },
  { category: "Places", value: 28 },
  { category: "Culture", value: 8 },
];

export default function AnalyticsOverlay({ isOpen, onClose, profile }: AnalyticsOverlayProps) {
  const getPersonalizedInsights = () => {
    if (!profile) return [];

    const insights = [];

    // Environment preference insight
    if (profile.environmentPreference === "indoor") {
      insights.push({
        text: "You avoid outdoor places → 78% of outdoor venues unexplored",
        color: "#F0A500",
      });
    }

    // Social preference insight
    if (profile.activityPreference === "solo") {
      insights.push({
        text: "You prefer solo activities → 0 group events attended",
        color: "#7C5CE8",
      });
    }

    // Connection insight
    if (profile.connectionsMode === 0) {
      insights.push({
        text: "You mostly interact with same 3 people → Expand your network",
        color: "#00CBA4",
      });
    }

    // Budget insight
    if (profile.budgetLevel === "free") {
      insights.push({
        text: "You only visit free places → Missing 60% of premium experiences",
        color: "#E85D30",
      });
    }

    return insights;
  };

  const personalizedInsights = getPersonalizedInsights();
  return (
    <AnimatePresence>
      {isOpen && (
        <div>
          {/* Blurred backdrop */}
          <motion.div
            className="absolute inset-0 z-30"
            style={{
              backgroundColor: "rgba(10, 10, 15, 0.7)",
              backdropFilter: "blur(12px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Center panel */}
          <motion.div
            className="absolute z-40 rounded-3xl border-[0.5px] overflow-y-auto"
            style={{
              top: "50%",
              left: "50%",
              width: "85%",
              maxWidth: "360px",
              maxHeight: "75%",
              backgroundColor: "#12121A",
              borderColor: "rgba(255, 255, 255, 0.1)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)",
            }}
            initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%" }}
            animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
            exit={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%" }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#12121A] border-b border-white/5 px-5 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-white font-bold" style={{ fontSize: "18px" }}>
                  Your Bubble
                </h2>
                <p className="text-[#00CBA4]" style={{ fontSize: "11px", fontWeight: 600 }}>
                  ✓ Real-world actions tracked
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X size={18} className="text-[#888899]" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Behavioral Engine Badge */}
              <div
                className="px-3 py-1.5 rounded-full inline-block mb-4"
                style={{
                  backgroundColor: "rgba(124, 92, 232, 0.15)",
                  color: "#A890F0",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                🧠 BEHAVIORAL GRAPH ENGINE
              </div>

              {/* Radar Chart */}
              <div
                className="rounded-2xl p-4 mb-4 border-[0.5px]"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  borderColor: "rgba(255, 255, 255, 0.08)",
                }}
              >
                <div className="h-[200px] flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="rgba(255, 255, 255, 0.1)" />
                        <PolarAngleAxis dataKey="category" tick={{ fill: "#888899", fontSize: 10 }} />
                        <Radar
                          dataKey="value"
                          stroke="#7C5CE8"
                          fill="rgba(124, 92, 232, 0.25)"
                          strokeWidth={1.5}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center">
                        <div className="text-white font-bold mb-0.5" style={{ fontSize: "28px" }}>
                          23%
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7C5CE8] mx-auto" />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-[#666677] text-center mt-2" style={{ fontSize: "10px" }}>
                  Explored so far — started 3 months ago
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { label: "Departments", value: "2 / 14", change: "↑ 12%" },
                  { label: "Canteen variety", value: "18%", change: "↑ 6%" },
                  { label: "Event types", value: "1 / 8", change: "→" },
                  { label: "Connections", value: "0", change: "Start!" },
                ].map((metric, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-3"
                    style={{ backgroundColor: "#1A1A26" }}
                  >
                    <p className="text-[#666677] mb-1" style={{ fontSize: "10px" }}>
                      {metric.label}
                    </p>
                    <p className="text-white font-bold mb-0.5" style={{ fontSize: "18px" }}>
                      {metric.value}
                    </p>
                    <p className="text-[#00CBA4]" style={{ fontSize: "9px" }}>
                      {metric.change}
                    </p>
                  </div>
                ))}
              </div>

              {/* Unexplored */}
              <div
                className="rounded-xl p-3 border-[0.5px]"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  borderColor: "rgba(255, 255, 255, 0.06)",
                }}
              >
                <h4 className="text-white font-medium mb-2" style={{ fontSize: "12px" }}>
                  Unexplored on campus
                </h4>
                {[
                  { name: "Philosophy Dept", color: "#7C5CE8" },
                  { name: "South Canteen", color: "#00CBA4" },
                  { name: "Library Wing", color: "#F0A500" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 py-1.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="flex-1 text-white" style={{ fontSize: "11px" }}>
                      {item.name}
                    </span>
                    <ArrowRight size={12} className="text-[#7C5CE8]" />
                  </div>
                ))}
              </div>

              {/* Personalized Insights */}
              {personalizedInsights.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-white font-medium mb-2" style={{ fontSize: "12px" }}>
                    💡 Personal Growth Areas
                  </h4>
                  <div className="space-y-2">
                    {personalizedInsights.map((insight, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg border-l-[2px]"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.02)",
                          borderLeftColor: insight.color,
                        }}
                      >
                        <p className="text-[#888899]" style={{ fontSize: "10px" }}>
                          {insight.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

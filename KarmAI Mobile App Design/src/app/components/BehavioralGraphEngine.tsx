import { motion } from "motion/react";
import { Brain, HelpCircle, TrendingUp } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

interface BehavioralGraphEngineProps {
  onClose?: () => void;
}

const diversityData = [
  { category: "People", value: 35, maxValue: 100 },
  { category: "Places", value: 28, maxValue: 100 },
  { category: "Events", value: 12, maxValue: 100 },
  { category: "Culture", value: 8, maxValue: 100 },
  { category: "Skills", value: 18, maxValue: 100 },
];

export default function BehavioralGraphEngine({ onClose }: BehavioralGraphEngineProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div
        className="rounded-2xl p-5 border-[0.5px]"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#EDE9FE",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#EDE9FE" }}
          >
            <Brain size={24} className="text-[#7C5CE8]" />
          </div>
          <div>
            <h2 className="text-[#1A1A1A] font-bold mb-0.5" style={{ fontSize: "18px" }}>
              Behavioral Graph Engine
            </h2>
            <p className="text-[#6B7280]" style={{ fontSize: "11px" }}>
              Deep AI analyzing your real-world behavior
            </p>
          </div>
        </div>

        <div
          className="px-3 py-2 rounded-lg"
          style={{ backgroundColor: "#EDE9FE" }}
        >
          <p className="text-[#7C5CE8] text-center font-medium" style={{ fontSize: "10px" }}>
            🧠 Proprietary algorithm • Patent pending
          </p>
        </div>
      </div>

      {/* 1. Comfort Zone Radius */}
      <motion.div
        className="rounded-2xl p-5 border-[0.5px]"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#E5E7EB",
          boxShadow: "var(--shadow-sm)",
        }}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-[#1A1A1A] font-bold mb-1" style={{ fontSize: "15px" }}>
              1. Comfort Zone Radius
            </h3>
            <p className="text-[#6B7280]" style={{ fontSize: "11px" }}>
              Your life exposure area
            </p>
          </div>
          <button className="p-1">
            <HelpCircle size={16} className="text-[#6B7280]" />
          </button>
        </div>

        {/* Circular Visualization */}
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            {/* Outer circle (max potential) */}
            <svg width="160" height="160" className="relative">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              {/* Current radius */}
              <motion.circle
                cx="80"
                cy="80"
                r="0"
                fill="#EDE9FE"
                stroke="#7C5CE8"
                strokeWidth="2"
                initial={{ r: 0 }}
                animate={{ r: 32 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <text
                x="80"
                y="75"
                textAnchor="middle"
                fill="#7C5CE8"
                fontSize="32"
                fontWeight="bold"
              >
                2.3
              </text>
              <text
                x="80"
                y="95"
                textAnchor="middle"
                fill="#6B7280"
                fontSize="12"
              >
                km radius
              </text>
            </svg>
          </div>
        </div>

        {/* AI Insight */}
        <div
          className="rounded-xl p-3 border-l-[3px]"
          style={{
            backgroundColor: "#F8F9FA",
            borderLeftColor: "#7C5CE8",
          }}
        >
          <div className="flex items-start gap-2">
            <div className="text-lg mt-0.5">🎯</div>
            <div>
              <div className="text-[#1A1A1A] font-medium mb-1" style={{ fontSize: "12px" }}>
                AI Analysis
              </div>
              <p className="text-[#6B7280]" style={{ fontSize: "11px" }}>
                Your comfort zone is 78% smaller than average explorer. Try visiting places 5km+ away.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. Exploration Diversity Index */}
      <motion.div
        className="rounded-2xl p-5 border-[0.5px]"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#E5E7EB",
          boxShadow: "var(--shadow-sm)",
        }}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-[#1A1A1A] font-bold mb-1" style={{ fontSize: "15px" }}>
              2. Exploration Diversity Index
            </h3>
            <p className="text-[#6B7280]" style={{ fontSize: "11px" }}>
              Variety across life dimensions
            </p>
          </div>
          <div
            className="px-3 py-1 rounded-full"
            style={{
              backgroundColor: "#CCFBF1",
              color: "#0D9488",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            28/100
          </div>
        </div>

        {/* Radar Chart */}
        <div className="h-[180px] mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={diversityData}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis
                dataKey="category"
                tick={{ fill: "#6B7280", fontSize: 11 }}
              />
              <Radar
                dataKey="value"
                stroke="#0D9488"
                fill="rgba(13, 148, 136, 0.15)"
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Insight */}
        <div
          className="rounded-xl p-3 border-l-[3px]"
          style={{
            backgroundColor: "#F8F9FA",
            borderLeftColor: "#0D9488",
          }}
        >
          <div className="flex items-start gap-2">
            <div className="text-lg mt-0.5">💡</div>
            <div>
              <div className="text-[#1A1A1A] font-medium mb-1" style={{ fontSize: "12px" }}>
                AI Analysis
              </div>
              <p className="text-[#6B7280]" style={{ fontSize: "11px" }}>
                You mostly visit cafes and tech events. Try heritage sites or cultural events for diversity boost.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3. Action Conversion Rate */}
      <motion.div
        className="rounded-2xl p-5 border-[0.5px]"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#E5E7EB",
          boxShadow: "var(--shadow-sm)",
        }}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-[#1A1A1A] font-bold mb-1" style={{ fontSize: "15px" }}>
              3. Action Conversion Rate
            </h3>
            <p className="text-[#6B7280]" style={{ fontSize: "11px" }}>
              Suggestions → Real actions
            </p>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp size={14} className="text-[#D97706]" />
            <span className="text-[#D97706] font-bold" style={{ fontSize: "12px" }}>
              +12%
            </span>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="space-y-2 mb-4">
          {[
            { label: "Suggestions Shown", value: 100, width: "100%" },
            { label: "Viewed on Map", value: 68, width: "68%" },
            { label: "Real-World Actions", value: 42, width: "42%" },
          ].map((stage, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[#1A1A1A]" style={{ fontSize: "12px" }}>
                  {stage.label}
                </span>
                <span className="text-[#D97706] font-bold" style={{ fontSize: "12px" }}>
                  {stage.value}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#F3F4F6] overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: i === 2 ? "linear-gradient(90deg, #D97706, #F59E0B)" : "#9CA3AF",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: stage.width }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.2 }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* AI Insight */}
        <div
          className="rounded-xl p-3 border-l-[3px]"
          style={{
            backgroundColor: "#F8F9FA",
            borderLeftColor: "#D97706",
          }}
        >
          <div className="flex items-start gap-2">
            <div className="text-lg mt-0.5">🔥</div>
            <div>
              <div className="text-[#1A1A1A] font-medium mb-1" style={{ fontSize: "12px" }}>
                AI Analysis
              </div>
              <p className="text-[#6B7280]" style={{ fontSize: "11px" }}>
                You act on 42% of suggestions — that's above average! Keep the momentum going.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* System Info */}
      <div
        className="rounded-xl p-4 border-[0.5px]"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#EDE9FE",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div className="text-center">
          <p className="text-[#1A1A1A] font-semibold mb-1" style={{ fontSize: "12px" }}>
            How does this work?
          </p>
          <p className="text-[#6B7280]" style={{ fontSize: "10px" }}>
            Our Behavioral Graph Engine analyzes your GPS check-ins, category exploration, and
            connection patterns to create a unique behavioral profile. This powers personalized
            suggestions that push you beyond your comfort zone.
          </p>
        </div>
      </div>
    </div>
  );
}

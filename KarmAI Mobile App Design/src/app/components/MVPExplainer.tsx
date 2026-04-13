import { motion } from "motion/react";
import { X, MapPin, Gift, Compass } from "lucide-react";

interface MVPExplainerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MVPExplainer({ isOpen, onClose }: MVPExplainerProps) {
  if (!isOpen) return null;

  const features = [
    {
      icon: Compass,
      title: "Daily Drift",
      subtitle: "One AI suggestion per day",
      description: "Get a single, highly-personalized place or person to explore today. No infinite scrolling. One focused action.",
      color: "#7C5CE8",
      gradient: "linear-gradient(135deg, rgba(124, 92, 232, 0.15), rgba(124, 92, 232, 0.05))",
      stats: ["1 suggestion/day", "91% match accuracy", "Real-world focused"],
    },
    {
      icon: MapPin,
      title: "Smart Map",
      subtitle: "Real places, real distance",
      description: "See nearby unexplored places with AI match %. GPS-verified locations only. Filter by category, distance, and budget.",
      color: "#00CBA4",
      gradient: "linear-gradient(135deg, rgba(0, 203, 164, 0.15), rgba(0, 203, 164, 0.05))",
      stats: ["GPS verified", "Category markers", "Match % shown"],
    },
    {
      icon: Gift,
      title: "Reward After Action",
      subtitle: "Earn by exploring",
      description: "Visit places in real life → GPS confirms → Earn Karma & XP. Redeem for discounts, free entries, and event passes.",
      color: "#F0A500",
      gradient: "linear-gradient(135deg, rgba(240, 165, 0, 0.15), rgba(240, 165, 0, 0.05))",
      stats: ["+50 Karma/visit", "Real rewards", "No fake points"],
    },
  ];

  return (
    <motion.div
      className="absolute inset-0 z-50 bg-[#0A0A0F] overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="px-5 pt-14 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-white font-bold mb-1" style={{ fontSize: "24px" }}>
              What We Built (MVP)
            </h1>
            <p className="text-[#888899]" style={{ fontSize: "13px" }}>
              Focus on 3 core features
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* MVP Positioning */}
        <div
          className="rounded-2xl p-5 mb-6 border-[0.5px]"
          style={{
            background: "linear-gradient(135deg, rgba(124, 92, 232, 0.15), rgba(0, 203, 164, 0.15))",
            borderColor: "rgba(124, 92, 232, 0.3)",
          }}
        >
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h2 className="text-white font-bold mb-2" style={{ fontSize: "18px" }}>
              Extreme Focus
            </h2>
            <p className="text-[#888899] mb-4" style={{ fontSize: "12px" }}>
              We deliberately built ONLY what matters for behavior change
            </p>
            <div className="flex items-center justify-center gap-2">
              <div
                className="px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: "rgba(0, 203, 164, 0.2)",
                  color: "#00CBA4",
                  fontSize: "11px",
                  fontWeight: 600,
                }}
              >
                ✓ No social feed
              </div>
              <div
                className="px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: "rgba(0, 203, 164, 0.2)",
                  color: "#00CBA4",
                  fontSize: "11px",
                  fontWeight: 600,
                }}
              >
                ✓ No infinite scroll
              </div>
              <div
                className="px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: "rgba(0, 203, 164, 0.2)",
                  color: "#00CBA4",
                  fontSize: "11px",
                  fontWeight: 600,
                }}
              >
                ✓ Action-only
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Features */}
        <div className="space-y-4 mb-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                className="rounded-2xl p-5 border-[0.5px]"
                style={{
                  background: feature.gradient,
                  borderColor: `${feature.color}40`,
                }}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.15 }}
              >
                {/* Feature Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${feature.color}30` }}
                  >
                    <Icon size={28} style={{ color: feature.color }} />
                  </div>
                  <div className="flex-1">
                    <div
                      className="px-3 py-1 rounded-full inline-block mb-2"
                      style={{
                        backgroundColor: `${feature.color}20`,
                        color: feature.color,
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                      }}
                    >
                      FEATURE #{i + 1}
                    </div>
                    <h3 className="text-white font-bold mb-1" style={{ fontSize: "18px" }}>
                      {feature.title}
                    </h3>
                    <p className="text-[#888899]" style={{ fontSize: "12px" }}>
                      {feature.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white mb-4" style={{ fontSize: "13px", lineHeight: "1.6" }}>
                  {feature.description}
                </p>

                {/* Stats */}
                <div className="flex gap-2">
                  {feature.stats.map((stat, j) => (
                    <div
                      key={j}
                      className="px-3 py-1.5 rounded-lg"
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                    >
                      <span className="text-white font-medium" style={{ fontSize: "11px" }}>
                        {stat}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Why This Matters */}
        <div
          className="rounded-2xl p-5 border-l-[4px]"
          style={{
            backgroundColor: "#1A1A26",
            borderLeftColor: "#7C5CE8",
          }}
        >
          <h3 className="text-white font-bold mb-3" style={{ fontSize: "15px" }}>
            Why Only 3 Features?
          </h3>
          <div className="space-y-2">
            {[
              "Behavior change needs focus, not features",
              "Every feature must drive real-world action",
              "Prevents analysis paralysis",
              "Easier to measure impact",
            ].map((reason, i) => (
              <div key={i} className="flex items-start gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full mt-1.5"
                  style={{ backgroundColor: "#7C5CE8" }}
                />
                <p className="text-[#888899] flex-1" style={{ fontSize: "12px" }}>
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-6 text-center">
          <p className="text-[#7C5CE8] font-bold mb-2" style={{ fontSize: "16px" }}>
            "From scrolling → to exploring"
          </p>
          <p className="text-[#666677]" style={{ fontSize: "11px" }}>
            Real-world growth, not screen time
          </p>
        </div>
      </div>
    </motion.div>
  );
}

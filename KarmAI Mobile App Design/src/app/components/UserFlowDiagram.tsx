import { motion } from "motion/react";
import { X, ChevronRight } from "lucide-react";

interface UserFlowDiagramProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserFlowDiagram({ isOpen, onClose }: UserFlowDiagramProps) {
  if (!isOpen) return null;

  const steps = [
    {
      number: 1,
      title: "User Joins",
      description: "Sign up with college email",
      icon: "👤",
      color: "#7C5CE8",
    },
    {
      number: 2,
      title: "Profile Setup",
      description: "Interests + behavior + intent",
      icon: "📝",
      color: "#00CBA4",
    },
    {
      number: 3,
      title: "Daily Drift Generated",
      description: "AI suggests 1 place/person",
      icon: "🎯",
      color: "#F0A500",
    },
    {
      number: 4,
      title: "User Visits Place",
      description: "Real-world action taken",
      icon: "🚶",
      color: "#3B8ADD",
    },
    {
      number: 5,
      title: "GPS Verifies Visit",
      description: "Location confirmed automatically",
      icon: "📍",
      color: "#E85D30",
    },
    {
      number: 6,
      title: "Reward Unlocked",
      description: "+50 Karma, +100 XP, badges",
      icon: "🎁",
      color: "#E84393",
    },
    {
      number: 7,
      title: "Profile Updates",
      description: "Bubble expands, metrics improve",
      icon: "📊",
      color: "#7C5CE8",
    },
    {
      number: 8,
      title: "New Suggestion",
      description: "Next drift generated based on behavior",
      icon: "🔄",
      color: "#00CBA4",
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
              How KarmAI Works
            </h1>
            <p className="text-[#888899]" style={{ fontSize: "13px" }}>
              Complete user journey
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Hero */}
        <div
          className="rounded-2xl p-5 mb-6 text-center border-[0.5px]"
          style={{
            background: "linear-gradient(135deg, rgba(124, 92, 232, 0.15), rgba(0, 203, 164, 0.15))",
            borderColor: "rgba(124, 92, 232, 0.3)",
          }}
        >
          <div className="text-4xl mb-3">🔄</div>
          <h2 className="text-white font-bold mb-2" style={{ fontSize: "18px" }}>
            Continuous Growth Loop
          </h2>
          <p className="text-[#888899]" style={{ fontSize: "12px" }}>
            Each action improves your next suggestion
          </p>
        </div>

        {/* Flow Steps */}
        <div className="space-y-3 mb-6">
          {steps.map((step, i) => (
            <div key={i}>
              <motion.div
                className="rounded-2xl p-4 border-[0.5px] relative"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  borderColor: `${step.color}40`,
                }}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Step indicator */}
                <div
                  className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center font-bold border-2 border-[#0A0A0F]"
                  style={{
                    backgroundColor: step.color,
                    fontSize: "11px",
                    color: "#FFFFFF",
                  }}
                >
                  {step.number}
                </div>

                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${step.color}20` }}
                  >
                    <span style={{ fontSize: "24px" }}>{step.icon}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-white font-bold mb-0.5" style={{ fontSize: "14px" }}>
                      {step.title}
                    </h3>
                    <p className="text-[#888899]" style={{ fontSize: "11px" }}>
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow for non-last items */}
                  {i < steps.length - 1 && (
                    <ChevronRight size={18} style={{ color: step.color, opacity: 0.5 }} />
                  )}
                </div>
              </motion.div>

              {/* Connecting line */}
              {i < steps.length - 1 && (
                <div className="flex justify-center py-1">
                  <div
                    className="w-0.5 h-4"
                    style={{
                      background: `linear-gradient(180deg, ${step.color}, ${steps[i + 1].color})`,
                      opacity: 0.3,
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Loop Indicator */}
        <motion.div
          className="rounded-2xl p-4 border-[0.5px]"
          style={{
            backgroundColor: "rgba(0, 203, 164, 0.1)",
            borderColor: "rgba(0, 203, 164, 0.3)",
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-3">
            <div className="text-3xl">♻️</div>
            <div>
              <h3 className="text-white font-bold mb-1" style={{ fontSize: "14px" }}>
                Cycle Repeats Forever
              </h3>
              <p className="text-[#888899]" style={{ fontSize: "11px" }}>
                Each action → Better AI → More growth → Better suggestions
              </p>
            </div>
          </div>
        </motion.div>

        {/* Key Insights */}
        <div className="mt-6 space-y-3">
          <h3 className="text-white font-semibold" style={{ fontSize: "14px" }}>
            Why This Works
          </h3>

          {[
            {
              icon: "🎯",
              title: "One focused action per day",
              description: "No decision fatigue or infinite scroll",
            },
            {
              icon: "📍",
              title: "GPS proof required",
              description: "Can't fake progress, must take real action",
            },
            {
              icon: "🧠",
              title: "Behavioral learning",
              description: "AI improves with every verified visit",
            },
            {
              icon: "💰",
              title: "Real rewards",
              description: "Actual value, not fake gamification",
            },
          ].map((insight, i) => (
            <div
              key={i}
              className="rounded-xl p-3 border-l-[3px]"
              style={{
                backgroundColor: "#1A1A26",
                borderLeftColor: i % 2 === 0 ? "#7C5CE8" : "#00CBA4",
              }}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">{insight.icon}</span>
                <div>
                  <div className="text-white font-medium mb-0.5" style={{ fontSize: "12px" }}>
                    {insight.title}
                  </div>
                  <p className="text-[#888899]" style={{ fontSize: "11px" }}>
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div className="mt-6 text-center">
          <p className="text-[#7C5CE8] font-bold mb-1" style={{ fontSize: "15px" }}>
            "Do one new thing every week"
          </p>
          <p className="text-[#666677]" style={{ fontSize: "11px" }}>
            Break your bubble. Real-world growth, not screen time.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

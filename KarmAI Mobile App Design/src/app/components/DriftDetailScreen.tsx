import { motion } from "motion/react";

interface DriftDetailScreenProps {
  onClose: () => void;
}

export default function DriftDetailScreen({ onClose }: DriftDetailScreenProps) {
  return (
    <div className="w-[390px] h-[844px] bg-[#0A0A0F] relative overflow-hidden">
      {/* Blurred background - dimmed home screen */}
      <div
        onClick={onClose}
        className="absolute inset-0 cursor-pointer"
        style={{
          backgroundColor: "rgba(10, 10, 15, 0.6)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Simulated blurred content */}
        <div className="opacity-40 p-5 pt-20">
          <div className="h-12 bg-[#1A1A26] rounded-xl mb-4" />
          <div className="h-32 bg-[#1A1A26] rounded-xl mb-4" />
          <div className="h-16 bg-[#1A1A26] rounded-xl" />
        </div>
      </div>

      {/* Bottom Sheet */}
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-0 left-0 right-0 rounded-t-[28px] border-t-[0.5px]"
        style={{
          backgroundColor: "#12121A",
          borderColor: "rgba(255, 255, 255, 0.08)",
        }}
        initial={{ y: 600 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-4">
          <div className="w-10 h-1 rounded-full bg-[#2A2A3A]" />
        </div>

        <div className="px-6 pb-8">
          {/* Title section */}
          <div className="mb-4">
            <div
              className="inline-block px-3 py-1 rounded-[11px] mb-3"
              style={{
                backgroundColor: "rgba(124, 92, 232, 0.15)",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                color: "#A890F0",
              }}
            >
              WHY THIS DRIFT?
            </div>

            <h2 className="text-white font-bold" style={{ fontSize: "20px" }}>
              Try Counter 7 instead of Counter 2
            </h2>
          </div>

          {/* Match Score Visual */}
          <div className="flex flex-col items-center mb-5">
            <div className="relative w-[100px] h-[100px] mb-2">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="#0A0A0F"
                  stroke="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="rgba(124, 92, 232, 0.2)"
                  strokeWidth="6"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="#7C5CE8"
                  strokeWidth="6"
                  strokeDasharray={`${2 * Math.PI * 44}`}
                  strokeDashoffset={`${2 * Math.PI * 44 * (1 - 0.91)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-extrabold" style={{ fontSize: "28px" }}>
                  91%
                </span>
              </div>
            </div>
            <p className="text-[#666677]" style={{ fontSize: "12px" }}>
              Creative Collision Potential
            </p>
          </div>

          {/* Reasoning Cards */}
          <div className="space-y-2 mb-4">
            {[
              {
                title: "Skill Complement",
                body: "Your Engineering background + their Fine Arts creativity = unexplored synergy",
                color: "#7C5CE8",
              },
              {
                title: "Timing Alignment",
                body: "Both available 12:30–1:30PM. Zero scheduling friction.",
                color: "#00CBA4",
              },
              {
                title: "Interest Gap",
                body: "Philosophy is in your top 5 unexplored domains. This fills it.",
                color: "#F0A500",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="rounded-xl p-3 border-l-[3px]"
                style={{
                  backgroundColor: "#1A1A26",
                  borderLeftColor: card.color,
                }}
              >
                <h4 className="text-white font-medium mb-1" style={{ fontSize: "13px" }}>
                  {card.title}
                </h4>
                <p className="text-[#888899]" style={{ fontSize: "12px" }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>

          {/* Budget Row */}
          <div className="flex gap-2 mb-5">
            {[
              { label: "Free", color: "#00CBA4" },
              { label: "10 min", color: "#00CBA4" },
              { label: "Accessible", color: "#3B8ADD" },
            ].map((badge, i) => (
              <div
                key={i}
                className="px-3 py-1 rounded-full"
                style={{
                  backgroundColor: `${badge.color}20`,
                  color: badge.color,
                  fontSize: "11px",
                  fontWeight: 500,
                }}
              >
                {badge.label}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-2">
            <button
              className="w-full h-[52px] rounded-[14px] bg-[#7C5CE8] text-white font-semibold"
              style={{ fontSize: "16px" }}
            >
              Accept this Drift
            </button>
            <button
              onClick={onClose}
              className="w-full h-[52px] rounded-[14px] text-[#666677] font-medium"
              style={{
                backgroundColor: "#1A1A26",
                fontSize: "16px",
              }}
            >
              Skip today
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

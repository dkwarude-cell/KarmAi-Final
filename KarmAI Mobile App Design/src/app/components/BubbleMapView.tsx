import { motion } from "motion/react";

export default function BubbleMapView() {
  const bubbles = [
    { x: 50, y: 50, color: "#00CBA4", size: 16, label: "You", pulse: true },
    { x: 35, y: 40, color: "#7C5CE8", size: 12, label: "PH" },
    { x: 65, y: 45, color: "#00CBA4", size: 10, label: "ICT" },
    { x: 45, y: 65, color: "#F0A500", size: 14, label: "MU" },
    { x: 60, y: 60, color: "#3B8ADD", size: 8 },
    { x: 40, y: 30, color: "#7C5CE8", size: 10 },
    { x: 70, y: 55, color: "#E85D30", size: 9 },
    { x: 30, y: 55, color: "#00CBA4", size: 11 },
  ];

  return (
    <div
      className="rounded-2xl p-5 border relative overflow-hidden"
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: "#CCFBF1",
        height: "280px",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Background circle */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: 0.3 }}
      >
        <div
          className="rounded-full border-2 border-dashed"
          style={{
            width: "220px",
            height: "220px",
            borderColor: "#CCFBF1",
          }}
        />
      </div>

      {/* Bubbles */}
      <div className="absolute inset-0">
        {bubbles.map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full flex items-center justify-center"
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: `${bubble.size * 4}px`,
              height: `${bubble.size * 4}px`,
              backgroundColor: `${bubble.color}40`,
              border: `2px solid ${bubble.color}`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 0 }}
            animate={{ scale: bubble.pulse ? [1, 1.1, 1] : 1 }}
            transition={{
              duration: bubble.pulse ? 2 : 0.5,
              delay: i * 0.1,
              repeat: bubble.pulse ? Infinity : 0,
            }}
          >
            {bubble.label && (
              <span
                className="font-bold"
                style={{
                  color: bubble.color,
                  fontSize: "10px",
                }}
              >
                {bubble.label}
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Bottom overlay */}
      <div className="absolute bottom-5 left-5 right-5">
        <div
          className="rounded-full px-4 py-2 flex items-center justify-between"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(12px)",
            border: "1px solid #E5E7EB",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div>
            <span className="text-[#1A1A1A] font-semibold" style={{ fontSize: "13px" }}>
              Your Bubble — 23% explored
            </span>
          </div>
          <div className="relative w-10 h-10">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="#EDE9FE"
                strokeWidth="3"
              />
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="#7C5CE8"
                strokeWidth="3"
                strokeDasharray={`${2 * Math.PI * 16}`}
                strokeDashoffset={`${2 * Math.PI * 16 * (1 - 0.23)}`}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-[#6B7280] text-xs uppercase tracking-wider">
            PERSONALIZED RADIUS
          </span>
        </div>

        <div className="flex items-center justify-center gap-1 mt-2">
          <div className="text-[#0D9488]" style={{ fontSize: "11px" }}>
            ✓
          </div>
          <span className="text-[#0D9488]" style={{ fontSize: "11px" }}>
            All verified via GPS check-in
          </span>
        </div>
      </div>
    </div>
  );
}

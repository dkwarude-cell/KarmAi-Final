import { motion } from "motion/react";
import { Hourglass } from "lucide-react";

export default function PredictivePlanningCard() {
  const timeline = [
    { time: "9AM", place: "Counter 2", crossed: true },
    { time: "11AM", place: "Library", crossed: false },
    { time: "2PM", place: "Coding Club", crossed: false },
    { time: "?", place: "", crossed: false, isUnknown: true },
  ];

  return (
    <motion.div
      className="rounded-2xl p-4"
      style={{
        backgroundColor: "#0F0F1A",
        borderLeft: "3px solid #D97706",
        minHeight: "130px",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "rgba(217, 119, 6, 0.15)",
            }}
          >
            <Hourglass size={14} className="text-[#D97706]" />
          </div>
          <h3 className="text-white font-bold" style={{ fontSize: "14px" }}>
            Your Usual Tuesday
          </h3>
        </div>
        <div
          className="px-2 py-1 rounded-full"
          style={{
            border: "1px solid #D97706",
            color: "#D97706",
            fontSize: "9px",
            fontWeight: 600,
          }}
        >
          PREDICTED
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-4 relative">
        <div className="flex items-center justify-between">
          {timeline.map((stop, i) => (
            <div key={i} className="flex flex-col items-center relative">
              {/* Connector Line */}
              {i < timeline.length - 1 && (
                <div
                  className="absolute h-0.5"
                  style={{
                    width: "calc(100% + 20px)",
                    left: "50%",
                    top: "8px",
                    borderTop: "1.5px dashed #333344",
                  }}
                />
              )}

              {/* Stop Dot */}
              <div
                className="w-4 h-4 rounded-full z-10 relative"
                style={{
                  backgroundColor: stop.isUnknown
                    ? "#D97706"
                    : stop.crossed
                    ? "#2A2A3A"
                    : "#333344",
                  border: stop.isUnknown ? "2px solid #D97706" : "none",
                  boxShadow: stop.isUnknown ? "0 0 12px rgba(217, 119, 6, 0.5)" : "none",
                }}
              >
                {stop.isUnknown && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      backgroundColor: "#D97706",
                      opacity: 0.3,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                )}
              </div>

              {/* Labels */}
              <div className="mt-2 text-center">
                <p
                  className={stop.crossed ? "text-[#666677]" : "text-[#888899]"}
                  style={{
                    fontSize: "10px",
                    textDecoration: stop.crossed ? "line-through" : "none",
                  }}
                >
                  {stop.time}
                </p>
                {stop.place && (
                  <p
                    className={stop.crossed ? "text-[#666677]" : "text-[#888899]"}
                    style={{
                      fontSize: "9px",
                      textDecoration: stop.crossed ? "line-through" : "none",
                    }}
                  >
                    {stop.place}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Suggestion Box */}
      <div
        className="rounded-xl p-3 mb-3"
        style={{
          backgroundColor: "#1A1A14",
          borderLeft: "2px solid #D97706",
        }}
      >
        <p className="text-white mb-2" style={{ fontSize: "12px" }}>
          Instead of Coding Club → Philosophy talk at 2PM
        </p>
        <p className="text-[#888899] mb-1" style={{ fontSize: "10px" }}>
          Same time slot · Same building · 0 extra effort
        </p>
        <p className="text-[#D97706]" style={{ fontSize: "9px" }}>
          3 students from your network attending
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          className="flex-1 h-9 rounded-xl font-medium"
          style={{
            border: "1px solid #333344",
            color: "#888899",
            fontSize: "12px",
          }}
        >
          Keep My Routine
        </button>
        <button
          className="flex-1 h-9 rounded-xl font-semibold text-white"
          style={{
            background: "linear-gradient(135deg, #D97706, #F59E0B)",
            fontSize: "12px",
            boxShadow: "0 4px 12px rgba(217, 119, 6, 0.3)",
          }}
        >
          Take the Drift
        </button>
      </div>
    </motion.div>
  );
}

import { motion } from "motion/react";
import { ArrowLeft, MapPin, HelpCircle } from "lucide-react";

interface SquadDriftProps {
  onClose: () => void;
}

export default function SquadDrift({ onClose }: SquadDriftProps) {
  const squadMembers = [
    { initial: "A", color: "#7C3AED" },
    { initial: "R", color: "#0D9488" },
    { initial: "P", color: "#EC4899" },
    { initial: "M", color: "#F59E0B" },
  ];

  const suggestedDrifts = [
    {
      title: "Jazz & Espresso Evening",
      venue: "The Jazz Club",
      distance: "0.3km",
      tags: ["Music ✓", "Coffee ✓", "All 4 interested"],
      details: "Free · 2hrs · Tonight 7PM",
      compatibility: "91%",
      borderColor: "#7C3AED",
    },
    {
      title: "Photography Walk + Chai",
      venue: "Heritage District",
      distance: "15min walk",
      tags: ["Photography ✓", "Outdoor ✓", "3/4 interested"],
      details: "Free · 1.5hrs · Tomorrow 5PM",
      compatibility: "84%",
      borderColor: "#0D9488",
    },
    {
      title: "Open Mic Night",
      venue: "Black Box Theatre",
      distance: "On campus",
      tags: ["Theatre ✓", "Music ✓", "Art ✓", "All 4 interested"],
      details: "Free · 3hrs · Saturday",
      compatibility: "96%",
      borderColor: "#D97706",
    },
  ];

  return (
    <motion.div
      className="absolute inset-0 z-[200] flex flex-col"
      style={{ backgroundColor: "#0A0A0F" }}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
    >
      {/* Status Bar */}
      <div className="h-[44px]" />

      {/* Top Bar */}
      <div className="h-[60px] px-5 flex items-center justify-between border-b" style={{ borderColor: "#1A1A22" }}>
        <button onClick={onClose}>
          <ArrowLeft size={20} className="text-white" />
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-white font-bold" style={{ fontSize: "16px" }}>
            Squad Drift
          </h1>
          <p className="text-[#888899]" style={{ fontSize: "11px" }}>
            Drift together, grow together
          </p>
        </div>
        <button
          className="px-3 py-1.5 rounded-full"
          style={{
            border: "1px solid #0D9488",
            color: "#0D9488",
            fontSize: "11px",
          }}
        >
          + Invite
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* Active Squad Card */}
        <motion.div
          className="rounded-2xl p-4 mb-4 flex items-center gap-3"
          style={{
            background: "linear-gradient(135deg, #1A1028, #0D1828)",
            border: "2px solid #7C3AED",
            boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Overlapping Avatars */}
          <div className="flex">
            {squadMembers.map((member, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold border-2"
                style={{
                  backgroundColor: member.color,
                  borderColor: "#0A0A0F",
                  marginLeft: i > 0 ? "-8px" : "0",
                  zIndex: squadMembers.length - i,
                }}
              >
                <span className="text-white" style={{ fontSize: "12px" }}>
                  {member.initial}
                </span>
              </div>
            ))}
          </div>

          {/* Squad Info */}
          <div className="flex-1">
            <h3 className="text-white font-bold mb-1" style={{ fontSize: "14px" }}>
              Team AMD · 4 members
            </h3>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
              <span className="text-[#0D9488]" style={{ fontSize: "11px" }}>
                All online now
              </span>
            </div>
          </div>

          {/* Start Button */}
          <button
            className="px-4 py-2 rounded-xl text-white font-semibold"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #9F7AEA)",
              fontSize: "12px",
            }}
          >
            Start Drift →
          </button>
        </motion.div>

        {/* Find Your Overlap Card */}
        <motion.div
          className="rounded-2xl p-4 mb-4"
          style={{
            backgroundColor: "#111118",
            border: "1px solid #222233",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-white font-bold mb-4" style={{ fontSize: "15px" }}>
            Where your interests collide
          </h3>

          {/* Venn Diagram Visual */}
          <div className="relative h-48 mb-4 flex items-center justify-center">
            {/* Circle 1 - You */}
            <div
              className="absolute w-28 h-28 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "rgba(124, 58, 237, 0.2)",
                border: "2px solid #7C3AED",
                top: "10px",
                left: "20px",
              }}
            >
              <div className="text-center">
                <p className="text-[#7C3AED] font-bold" style={{ fontSize: "10px" }}>
                  You
                </p>
                <p className="text-white" style={{ fontSize: "8px" }}>
                  AI · Coffee
                </p>
                <p className="text-white" style={{ fontSize: "8px" }}>
                  Music
                </p>
              </div>
            </div>

            {/* Circle 2 - Aryan */}
            <div
              className="absolute w-28 h-28 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "rgba(13, 148, 136, 0.2)",
                border: "2px solid #0D9488",
                top: "10px",
                right: "20px",
              }}
            >
              <div className="text-center">
                <p className="text-[#0D9488] font-bold" style={{ fontSize: "10px" }}>
                  Aryan
                </p>
                <p className="text-white" style={{ fontSize: "8px" }}>
                  Design · Coffee
                </p>
                <p className="text-white" style={{ fontSize: "8px" }}>
                  Photography
                </p>
              </div>
            </div>

            {/* Circle 3 - Priya */}
            <div
              className="absolute w-28 h-28 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "rgba(217, 119, 6, 0.2)",
                border: "2px solid #D97706",
                bottom: "10px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <div className="text-center">
                <p className="text-[#D97706] font-bold" style={{ fontSize: "10px" }}>
                  Priya
                </p>
                <p className="text-white" style={{ fontSize: "8px" }}>
                  Theatre · Music
                </p>
                <p className="text-white" style={{ fontSize: "8px" }}>
                  Art
                </p>
              </div>
            </div>

            {/* Center Overlap */}
            <div
              className="absolute rounded-full flex items-center justify-center"
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                boxShadow: "0 0 30px rgba(255, 255, 255, 0.5)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="text-center">
                <p className="text-[#0A0A0F] font-bold" style={{ fontSize: "9px" }}>
                  Coffee +
                </p>
                <p className="text-[#0A0A0F] font-bold" style={{ fontSize: "9px" }}>
                  Music
                </p>
              </div>
            </div>
          </div>

          <div
            className="rounded-xl p-2 text-center"
            style={{
              backgroundColor: "rgba(124, 58, 237, 0.1)",
              border: "1px solid rgba(124, 58, 237, 0.3)",
            }}
          >
            <p className="text-[#7C3AED] font-semibold" style={{ fontSize: "11px" }}>
              Best Squad Drift Zone
            </p>
          </div>
        </motion.div>

        {/* AI Suggested Squad Drifts */}
        <h3 className="text-white font-bold mb-3" style={{ fontSize: "15px" }}>
          AI Suggested Squad Drifts
        </h3>

        <div className="space-y-3">
          {suggestedDrifts.map((drift, i) => (
            <motion.div
              key={i}
              className="rounded-2xl p-4"
              style={{
                backgroundColor: "#111118",
                borderLeft: `3px solid ${drift.borderColor}`,
                border: "1px solid #222233",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <h4 className="text-white font-bold mb-2" style={{ fontSize: "14px" }}>
                {drift.title}
              </h4>

              <div className="flex items-center gap-1 mb-3">
                <MapPin size={12} className="text-[#888899]" />
                <span className="text-[#888899]" style={{ fontSize: "11px" }}>
                  {drift.venue} · {drift.distance}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {drift.tags.map((tag, j) => (
                  <div
                    key={j}
                    className="px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: "#1A1A22",
                      fontSize: "9px",
                      color: "#AAAACC",
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>

              {/* Bottom Row */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#888899]" style={{ fontSize: "11px" }}>
                  {drift.details}
                </span>
                <div
                  className="px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(13, 148, 136, 0.15)",
                  }}
                >
                  <span className="text-[#0D9488] font-semibold" style={{ fontSize: "10px" }}>
                    {drift.compatibility} Squad Compatibility
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  className="flex-1 h-9 rounded-xl font-medium flex items-center justify-center gap-1"
                  style={{
                    border: "1px solid #333344",
                    color: "#AAAACC",
                    fontSize: "12px",
                  }}
                >
                  <HelpCircle size={14} />
                  Why This?
                </button>
                <button
                  className="flex-1 h-9 rounded-xl font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #9F7AEA)",
                    fontSize: "12px",
                  }}
                >
                  Squad Up
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Squad Bubble Impact */}
        <motion.div
          className="rounded-2xl p-4 mt-4 mb-8"
          style={{
            backgroundColor: "#111118",
            border: "1px solid #222233",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-white font-semibold mb-3" style={{ fontSize: "12px" }}>
            Your Squad's Combined Bubble
          </p>

          {/* Progress Bars */}
          <div className="space-y-3 mb-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[#888899]" style={{ fontSize: "11px" }}>
                  Solo
                </span>
                <span className="text-[#7C3AED] font-semibold" style={{ fontSize: "11px" }}>
                  23% explored
                </span>
              </div>
              <div
                className="w-full h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: "#1A1A22" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "23%",
                    backgroundColor: "#7C3AED",
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[#888899]" style={{ fontSize: "11px" }}>
                  Squad
                </span>
                <span className="text-[#0D9488] font-semibold" style={{ fontSize: "11px" }}>
                  41% explored
                </span>
              </div>
              <div
                className="w-full h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: "#1A1A22" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "41%",
                    background: "linear-gradient(90deg, #0D9488, #14B8A6)",
                    boxShadow: "0 0 10px rgba(13, 148, 136, 0.5)",
                  }}
                />
              </div>
            </div>
          </div>

          <p className="text-[#666677]" style={{ fontSize: "10px" }}>
            Drifting together expands your world 2x faster
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

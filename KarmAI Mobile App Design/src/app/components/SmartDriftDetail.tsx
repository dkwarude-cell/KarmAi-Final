import { motion } from "motion/react";
import { UserProfile } from "../types/profile";

interface SmartDriftDetailProps {
  onClose: () => void;
  profile: UserProfile;
}

export default function SmartDriftDetail({ onClose, profile }: SmartDriftDetailProps) {
  const getPersonalizedReasons = () => {
    const reasons = [];

    // Based on current intent
    if (profile.currentIntent === "meet-people") {
      reasons.push({
        title: "Aligned with your goal",
        body: `You want to meet new people → This cafe has 3 active students right now`,
        color: "#7C5CE8",
      });
    }

    // Based on budget
    if (profile.budgetLevel === "free" || profile.budgetLevel === "low") {
      reasons.push({
        title: "Budget-friendly",
        body: `Your budget is ${profile.budgetLevel} → Average spend here is ₹50`,
        color: "#0D9488",
      });
    }

    // Based on interests
    if (profile.primaryInterests.includes("Photography")) {
      reasons.push({
        title: "Interest match",
        body: `You love Photography → Philosophy student here shares this interest`,
        color: "#D97706",
      });
    }

    // Based on time
    if (profile.activeHours === "afternoon") {
      reasons.push({
        title: "Perfect timing",
        body: `You're active in afternoons → Both available 12:30-1:30 PM today`,
        color: "#0D9488",
      });
    }

    // Based on personality
    if (profile.personality === "introvert") {
      reasons.push({
        title: "Comfort zone awareness",
        body: `You're an introvert → This is a 1-on-1 connection, not a group`,
        color: "#7C5CE8",
      });
    }

    // Based on exploration style
    if (profile.explorationStyle === "cautious") {
      reasons.push({
        title: "Gentle push",
        body: `You explore cautiously → This is just 0.3 km from your usual spot`,
        color: "#D97706",
      });
    }

    return reasons.slice(0, 3);
  };

  const personalizedReasons = getPersonalizedReasons();

  return (
    <div className="absolute inset-0 z-50 bg-[#F8F9FA] overflow-hidden">
      {/* Blurred background */}
      <div
        onClick={onClose}
        className="absolute inset-0 cursor-pointer"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="opacity-40 p-5 pt-20">
          <div className="h-12 bg-[#E5E7EB] rounded-xl mb-4" />
          <div className="h-32 bg-[#E5E7EB] rounded-xl mb-4" />
          <div className="h-16 bg-[#E5E7EB] rounded-xl" />
        </div>
      </div>

      {/* Bottom Sheet */}
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-0 left-0 right-0 rounded-t-[28px] border-t-[0.5px]"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#E5E7EB",
          boxShadow: "0 -4px 24px rgba(0, 0, 0, 0.08)",
        }}
        initial={{ y: 600 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex justify-center pt-3 pb-4">
          <div className="w-10 h-1 rounded-full bg-[#E5E7EB]" />
        </div>

        <div className="px-6 pb-8 max-h-[600px] overflow-y-auto">
          {/* Title section */}
          <div className="mb-4">
            <div
              className="inline-block px-3 py-1 rounded-[11px] mb-3"
              style={{
                backgroundColor: "#EDE9FE",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                color: "#7C5CE8",
              }}
            >
              PERSONALIZED FOR YOU
            </div>

            <h2 className="text-[#1A1A1A] font-bold mb-1" style={{ fontSize: "20px" }}>
              Try Counter 7 instead of Counter 2
            </h2>
            <p className="text-[#6B7280]" style={{ fontSize: "12px" }}>
              AI-matched based on your profile
            </p>
          </div>

          {/* Match Score Visual */}
          <div className="flex flex-col items-center mb-5">
            <div className="relative w-[100px] h-[100px] mb-2">
              <svg className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="44" fill="#FFFFFF" stroke="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="#EDE9FE"
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
                <span className="text-[#1A1A1A] font-extrabold" style={{ fontSize: "28px" }}>
                  91%
                </span>
              </div>
            </div>
            <p className="text-[#6B7280]" style={{ fontSize: "12px" }}>
              Personal Match Score
            </p>
          </div>

          {/* Why this is for YOU */}
          <div className="mb-4">
            <div
              className="px-3 py-1.5 rounded-full inline-block mb-3"
              style={{
                backgroundColor: "#EDE9FE",
                color: "#7C5CE8",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.08em",
              }}
            >
              🎯 WHY THIS? (AI EXPLAINABILITY)
            </div>
            <h3 className="text-[#1A1A1A] font-semibold mb-3" style={{ fontSize: "14px" }}>
              Personalized Reasoning
            </h3>
            <div className="space-y-2">
              {personalizedReasons.map((reason, i) => (
                <div
                  key={i}
                  className="rounded-xl p-3 border-l-[3px]"
                  style={{
                    backgroundColor: "#F8F9FA",
                    borderLeftColor: reason.color,
                  }}
                >
                  <h4 className="text-[#1A1A1A] font-medium mb-1" style={{ fontSize: "12px" }}>
                    {reason.title}
                  </h4>
                  <p className="text-[#6B7280]" style={{ fontSize: "11px" }}>
                    {reason.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Generic reasoning */}
          <div className="mb-4">
            <h3 className="text-[#1A1A1A] font-semibold mb-3" style={{ fontSize: "13px" }}>
              Additional context
            </h3>
            <div className="space-y-2">
              <div
                className="rounded-xl p-3 border-l-[3px]"
                style={{
                  backgroundColor: "#F8F9FA",
                  borderLeftColor: "#7C5CE8",
                }}
              >
                <h4 className="text-[#1A1A1A] font-medium mb-1" style={{ fontSize: "12px" }}>
                  Skill Complement
                </h4>
                <p className="text-[#6B7280]" style={{ fontSize: "11px" }}>
                  Your {profile.course} + their Fine Arts = creative collision
                </p>
              </div>

              <div
                className="rounded-xl p-3 border-l-[3px]"
                style={{
                  backgroundColor: "#F8F9FA",
                  borderLeftColor: "#D97706",
                }}
              >
                <h4 className="text-[#1A1A1A] font-medium mb-1" style={{ fontSize: "12px" }}>
                  Interest Gap Filling
                </h4>
                <p className="text-[#6B7280]" style={{ fontSize: "11px" }}>
                  Philosophy is in your top 5 unexplored domains
                </p>
              </div>
            </div>
          </div>

          {/* Budget Row */}
          <div className="flex gap-2 mb-5">
            {[
              { label: profile.budgetLevel === "free" ? "Free" : "₹50", color: "#0D9488" },
              { label: "10 min", color: "#0D9488" },
              { label: "0.3 km", color: "#3B82F6" },
            ].map((badge, i) => (
              <div
                key={i}
                className="px-3 py-1 rounded-full"
                style={{
                  backgroundColor: i === 2 ? "#DBEAFE" : "#CCFBF1",
                  color: badge.color,
                  fontSize: "11px",
                  fontWeight: 500,
                }}
              >
                {badge.label}
              </div>
            ))}
          </div>

          {/* Action Emphasis */}
          <div
            className="rounded-xl p-3 mb-4 border-[0.5px]"
            style={{
              backgroundColor: "#CCFBF1",
              borderColor: "#0D9488",
            }}
          >
            <p className="text-center text-[#1A1A1A] font-medium mb-1" style={{ fontSize: "12px" }}>
              📍 Real-world action required
            </p>
            <p className="text-center text-[#6B7280]" style={{ fontSize: "10px" }}>
              Visit physically → GPS verifies → Earn rewards
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-2">
            <button
              className="w-full h-[52px] rounded-[14px] text-white font-semibold"
              style={{
                fontSize: "16px",
                background: "linear-gradient(135deg, #7C5CE8, #0D9488)",
              }}
            >
              Go Now (Real World) →
            </button>
            <button
              onClick={onClose}
              className="w-full h-[52px] rounded-[14px] text-[#6B7280] font-medium border"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E5E7EB",
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

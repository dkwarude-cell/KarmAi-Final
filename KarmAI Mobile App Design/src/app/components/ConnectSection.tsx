import { motion } from "motion/react";
import { Users, Target, Flame, Trophy, TrendingUp, Award } from "lucide-react";

interface ConnectSectionProps {
  currentStreak?: number;
  karmaPoints?: number;
  bubbleExplored?: number;
}

export default function ConnectSection({
  currentStreak = 5,
  karmaPoints = 1250,
  bubbleExplored = 23,
}: ConnectSectionProps) {
  const profileMatches = [
    {
      id: 1,
      name: "Priya Patel",
      college: "VJTI Mumbai",
      match: 91,
      matchType: "Creative Collision",
      interests: ["Photography", "Design", "Travel"],
      bubbleOverlap: 34,
      commonPlaces: 7,
      distance: "0.5 km",
      online: true,
    },
    {
      id: 2,
      name: "Rahul Kumar",
      college: "IIT Bombay",
      match: 87,
      matchType: "Skill Complement",
      interests: ["Technology", "Photography", "Music"],
      bubbleOverlap: 28,
      commonPlaces: 5,
      distance: "1.2 km",
      online: false,
    },
    {
      id: 3,
      name: "Ananya Singh",
      college: "VJTI Mumbai",
      match: 82,
      matchType: "Interest Overlap",
      interests: ["Art", "Culture", "Food"],
      bubbleOverlap: 41,
      commonPlaces: 9,
      distance: "0.8 km",
      online: true,
    },
  ];

  return (
    <div className="absolute top-[180px] left-0 right-0 bottom-[80px] z-20 overflow-y-auto px-5 pb-4">
      <div className="space-y-4">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-[#1A1A1A] font-bold mb-1" style={{ fontSize: "24px" }}>
            Connect
          </h2>
          <p className="text-[#6B7280]" style={{ fontSize: "13px" }}>
            Find people who expand your world
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            className="rounded-2xl p-3 border text-center"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#FEF3C7",
              boxShadow: "var(--shadow-sm)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Flame size={20} className="text-[#D97706] mx-auto mb-1" />
            <div className="text-[#D97706] font-bold mb-0.5" style={{ fontSize: "20px" }}>
              {currentStreak}
            </div>
            <div className="text-[#6B7280]" style={{ fontSize: "9px" }}>
              Day Streak
            </div>
          </motion.div>

          <motion.div
            className="rounded-2xl p-3 border text-center"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#EDE9FE",
              boxShadow: "var(--shadow-sm)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Award size={20} className="text-[#7C5CE8] mx-auto mb-1" />
            <div className="text-[#7C5CE8] font-bold mb-0.5" style={{ fontSize: "20px" }}>
              {karmaPoints}
            </div>
            <div className="text-[#6B7280]" style={{ fontSize: "9px" }}>
              Karma Points
            </div>
          </motion.div>

          <motion.div
            className="rounded-2xl p-3 border text-center"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#CCFBF1",
              boxShadow: "var(--shadow-sm)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Target size={20} className="text-[#0D9488] mx-auto mb-1" />
            <div className="text-[#0D9488] font-bold mb-0.5" style={{ fontSize: "20px" }}>
              {bubbleExplored}%
            </div>
            <div className="text-[#6B7280]" style={{ fontSize: "9px" }}>
              Bubble Explored
            </div>
          </motion.div>
        </div>

        {/* Bubble Exploration Visualization */}
        <motion.div
          className="rounded-2xl p-5 border"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#E5E7EB",
            boxShadow: "var(--shadow-sm)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[#1A1A1A] font-bold" style={{ fontSize: "14px" }}>
              Your Bubble Progress
            </h3>
            <div
              className="px-2 py-1 rounded-full"
              style={{
                backgroundColor: bubbleExplored < 30 ? "#FEE2E2" : "#CCFBF1",
                color: bubbleExplored < 30 ? "#EF4444" : "#0D9488",
                fontSize: "10px",
                fontWeight: 600,
              }}
            >
              {bubbleExplored < 30 ? "⚠️ Expand More" : "✓ Growing"}
            </div>
          </div>

          <div className="flex items-center justify-center mb-3">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full -rotate-90">
                <circle cx="64" cy="64" r="56" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="#7C5CE8"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - bubbleExplored / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[#7C5CE8] font-bold" style={{ fontSize: "28px" }}>
                  {bubbleExplored}%
                </span>
                <span className="text-[#6B7280]" style={{ fontSize: "10px" }}>
                  explored
                </span>
              </div>
            </div>
          </div>

          <p className="text-[#6B7280] text-center" style={{ fontSize: "11px" }}>
            You've explored {bubbleExplored}% of your potential social bubble
          </p>
        </motion.div>

        {/* Profile Matches */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[#1A1A1A] font-bold" style={{ fontSize: "16px" }}>
              🎯 High Match Profiles
            </h3>
            <span className="text-[#6B7280]" style={{ fontSize: "11px" }}>
              {profileMatches.length} nearby
            </span>
          </div>

          <div className="space-y-3">
            {profileMatches.map((person, index) => (
              <motion.div
                key={person.id}
                className="rounded-2xl p-4 border"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: person.match > 85 ? "#EDE9FE" : "#E5E7EB",
                  boxShadow: "var(--shadow-sm)",
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                {/* Header with profile */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="relative">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white"
                      style={{ background: "linear-gradient(135deg, #7C5CE8, #0D9488)", fontSize: "18px" }}
                    >
                      {person.name.charAt(0)}
                    </div>
                    {person.online && (
                      <div
                        className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white"
                        style={{ backgroundColor: "#10B981" }}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[#1A1A1A] font-bold mb-0.5" style={{ fontSize: "15px" }}>
                      {person.name}
                    </h4>
                    <p className="text-[#6B7280] mb-1" style={{ fontSize: "11px" }}>
                      {person.college}
                    </p>
                    <div
                      className="inline-block px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: "#EDE9FE",
                        color: "#7C5CE8",
                        fontSize: "9px",
                        fontWeight: 600,
                      }}
                    >
                      {person.matchType}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#7C5CE8] font-bold mb-0.5" style={{ fontSize: "24px" }}>
                      {person.match}%
                    </div>
                    <div className="text-[#6B7280]" style={{ fontSize: "9px" }}>
                      Match
                    </div>
                  </div>
                </div>

                {/* Interests */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {person.interests.map((interest, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: "#F3F4F6",
                        color: "#6B7280",
                        fontSize: "9px",
                        fontWeight: 500,
                      }}
                    >
                      {interest}
                    </span>
                  ))}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div
                    className="rounded-lg p-2 text-center"
                    style={{ backgroundColor: "#F8F9FA" }}
                  >
                    <div className="text-[#7C5CE8] font-bold" style={{ fontSize: "16px" }}>
                      {person.bubbleOverlap}%
                    </div>
                    <div className="text-[#9CA3AF]" style={{ fontSize: "8px" }}>
                      Bubble Overlap
                    </div>
                  </div>
                  <div
                    className="rounded-lg p-2 text-center"
                    style={{ backgroundColor: "#F8F9FA" }}
                  >
                    <div className="text-[#0D9488] font-bold" style={{ fontSize: "16px" }}>
                      {person.commonPlaces}
                    </div>
                    <div className="text-[#9CA3AF]" style={{ fontSize: "8px" }}>
                      Common Places
                    </div>
                  </div>
                  <div
                    className="rounded-lg p-2 text-center"
                    style={{ backgroundColor: "#F8F9FA" }}
                  >
                    <div className="text-[#D97706] font-bold" style={{ fontSize: "16px" }}>
                      {person.distance}
                    </div>
                    <div className="text-[#9CA3AF]" style={{ fontSize: "8px" }}>
                      Distance
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    className="flex-1 h-10 rounded-xl font-semibold"
                    style={{
                      backgroundColor: "#7C5CE8",
                      color: "#FFFFFF",
                      fontSize: "13px",
                    }}
                  >
                    Connect Now
                  </button>
                  <button
                    className="h-10 px-4 rounded-xl border font-medium"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E5E7EB",
                      color: "#6B7280",
                      fontSize: "13px",
                    }}
                  >
                    View Profile
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Leaderboard Preview */}
        <motion.div
          className="rounded-2xl p-4 border"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#FEF3C7",
            boxShadow: "var(--shadow-sm)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Trophy size={18} className="text-[#D97706]" />
            <h3 className="text-[#1A1A1A] font-bold" style={{ fontSize: "14px" }}>
              Your Rank This Week
            </h3>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-[#6B7280]" style={{ fontSize: "12px" }}>
              College Ranking
            </span>
            <div className="flex items-center gap-2">
              <TrendingUp size={14} className="text-[#10B981]" />
              <span className="text-[#10B981] font-semibold" style={{ fontSize: "14px" }}>
                #8
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#6B7280]" style={{ fontSize: "12px" }}>
              Global Ranking
            </span>
            <div className="flex items-center gap-2">
              <TrendingUp size={14} className="text-[#10B981]" />
              <span className="text-[#10B981] font-semibold" style={{ fontSize: "14px" }}>
                #142
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

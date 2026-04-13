import { motion } from "motion/react";
import { ArrowLeft, Trophy, TrendingUp, Award } from "lucide-react";

interface LeaderboardScreenProps {
  onClose: () => void;
  currentUserRank: number;
}

const leaderboardData = [
  {
    rank: 1,
    name: "Priya Raut",
    college: "ICT Mumbai",
    karmaPoints: 2340,
    level: 7,
    badge: "🏆",
    isCurrentUser: false,
  },
  {
    rank: 2,
    name: "Aryan Shah",
    college: "VJTI",
    karmaPoints: 2180,
    level: 6,
    badge: "🥈",
    isCurrentUser: false,
  },
  {
    rank: 3,
    name: "Meera Joshi",
    college: "Symbiosis",
    karmaPoints: 1950,
    level: 6,
    badge: "🥉",
    isCurrentUser: false,
  },
  {
    rank: 4,
    name: "Ravi Kumar",
    college: "SP College",
    karmaPoints: 1720,
    level: 5,
    badge: "⭐",
    isCurrentUser: false,
  },
  {
    rank: 5,
    name: "Deepak Walia",
    college: "ICT Mumbai",
    karmaPoints: 450,
    level: 3,
    badge: "🧭",
    isCurrentUser: true,
  },
  {
    rank: 6,
    name: "Sarah Khan",
    college: "DJ College",
    karmaPoints: 380,
    level: 2,
    badge: "🌟",
    isCurrentUser: false,
  },
  {
    rank: 7,
    name: "Amit Desai",
    college: "SIES",
    karmaPoints: 290,
    level: 2,
    badge: "✨",
    isCurrentUser: false,
  },
];

export default function LeaderboardScreen({ onClose, currentUserRank }: LeaderboardScreenProps) {
  return (
    <div className="w-[390px] h-[844px] bg-[#0A0A0F] relative flex flex-col">
      {/* Header */}
      <div
        className="px-5 pt-14 pb-4"
        style={{
          background: "linear-gradient(180deg, rgba(124, 92, 232, 0.15) 0%, transparent 100%)",
        }}
      >
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <div>
            <h1 className="text-white font-bold" style={{ fontSize: "22px" }}>
              Leaderboard
            </h1>
            <p className="text-[#888899]" style={{ fontSize: "12px" }}>
              Top explorers this week
            </p>
          </div>
        </div>

        {/* Time filter */}
        <div className="flex gap-2">
          {["This Week", "This Month", "All Time"].map((period, i) => (
            <button
              key={period}
              className="px-4 py-2 rounded-xl transition-all"
              style={{
                backgroundColor: i === 0 ? "rgba(124, 92, 232, 0.2)" : "rgba(255, 255, 255, 0.05)",
                color: i === 0 ? "#A890F0" : "#888899",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="px-5 pb-4">
        <div className="flex items-end justify-center gap-2 mb-4">
          {/* 2nd Place */}
          <motion.div
            className="flex-1 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div
              className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center border-2"
              style={{
                backgroundColor: "rgba(192, 192, 192, 0.15)",
                borderColor: "#C0C0C0",
              }}
            >
              <span className="text-white font-bold">AS</span>
            </div>
            <div className="text-2xl mb-1">🥈</div>
            <div className="text-white font-bold mb-0.5" style={{ fontSize: "12px" }}>
              {leaderboardData[1].name.split(" ")[0]}
            </div>
            <div className="text-[#666677] mb-2" style={{ fontSize: "10px" }}>
              {leaderboardData[1].college.split(" ")[0]}
            </div>
            <div
              className="h-16 rounded-t-xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(192, 192, 192, 0.1)" }}
            >
              <div className="text-[#C0C0C0] font-bold" style={{ fontSize: "14px" }}>
                {leaderboardData[1].karmaPoints}
              </div>
            </div>
          </motion.div>

          {/* 1st Place */}
          <motion.div
            className="flex-1 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div
              className="w-20 h-20 rounded-full mx-auto mb-2 flex items-center justify-center border-2 relative"
              style={{
                backgroundColor: "rgba(255, 215, 0, 0.15)",
                borderColor: "#FFD700",
              }}
            >
              <span className="text-white font-bold text-lg">PR</span>
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Trophy size={20} className="text-[#FFD700]" />
              </motion.div>
            </div>
            <div className="text-3xl mb-1">👑</div>
            <div className="text-white font-bold mb-0.5" style={{ fontSize: "13px" }}>
              {leaderboardData[0].name.split(" ")[0]}
            </div>
            <div className="text-[#666677] mb-2" style={{ fontSize: "10px" }}>
              {leaderboardData[0].college.split(" ")[0]}
            </div>
            <div
              className="h-24 rounded-t-xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(255, 215, 0, 0.1)" }}
            >
              <div className="text-[#FFD700] font-bold" style={{ fontSize: "16px" }}>
                {leaderboardData[0].karmaPoints}
              </div>
            </div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            className="flex-1 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div
              className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center border-2"
              style={{
                backgroundColor: "rgba(205, 127, 50, 0.15)",
                borderColor: "#CD7F32",
              }}
            >
              <span className="text-white font-bold">MJ</span>
            </div>
            <div className="text-2xl mb-1">🥉</div>
            <div className="text-white font-bold mb-0.5" style={{ fontSize: "12px" }}>
              {leaderboardData[2].name.split(" ")[0]}
            </div>
            <div className="text-[#666677] mb-2" style={{ fontSize: "10px" }}>
              {leaderboardData[2].college.split(" ")[0]}
            </div>
            <div
              className="h-12 rounded-t-xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(205, 127, 50, 0.1)" }}
            >
              <div className="text-[#CD7F32] font-bold" style={{ fontSize: "14px" }}>
                {leaderboardData[2].karmaPoints}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Rest of leaderboard */}
      <div className="flex-1 overflow-y-auto px-5">
        <div
          className="rounded-2xl border-[0.5px] overflow-hidden mb-4"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            borderColor: "rgba(255, 255, 255, 0.05)",
          }}
        >
          {leaderboardData.slice(3).map((user, i) => (
            <motion.div
              key={user.rank}
              className="flex items-center gap-3 p-4 border-b border-white/5"
              style={{
                backgroundColor: user.isCurrentUser
                  ? "rgba(124, 92, 232, 0.1)"
                  : "transparent",
              }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              {/* Rank */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: user.isCurrentUser
                    ? "rgba(124, 92, 232, 0.2)"
                    : "rgba(255, 255, 255, 0.05)",
                }}
              >
                <span
                  className="font-bold"
                  style={{
                    fontSize: "13px",
                    color: user.isCurrentUser ? "#A890F0" : "#666677",
                  }}
                >
                  #{user.rank}
                </span>
              </div>

              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center border-2 flex-shrink-0"
                style={{
                  backgroundColor: user.isCurrentUser
                    ? "rgba(124, 92, 232, 0.2)"
                    : "rgba(255, 255, 255, 0.05)",
                  borderColor: user.isCurrentUser ? "#7C5CE8" : "rgba(255, 255, 255, 0.1)",
                }}
              >
                <span className="text-white font-medium" style={{ fontSize: "12px" }}>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-white font-medium" style={{ fontSize: "13px" }}>
                    {user.name}
                  </span>
                  {user.isCurrentUser && (
                    <span
                      className="px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: "rgba(124, 92, 232, 0.2)",
                        color: "#A890F0",
                        fontSize: "9px",
                        fontWeight: 600,
                      }}
                    >
                      YOU
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#666677]" style={{ fontSize: "11px" }}>
                    {user.college}
                  </span>
                  <span className="text-[#666677]">•</span>
                  <span className="text-[#666677]" style={{ fontSize: "11px" }}>
                    Level {user.level}
                  </span>
                </div>
              </div>

              {/* Points */}
              <div className="text-right">
                <div
                  className="font-bold mb-0.5"
                  style={{
                    fontSize: "15px",
                    color: user.isCurrentUser ? "#7C5CE8" : "#FFFFFF",
                  }}
                >
                  {user.karmaPoints}
                </div>
                <div className="text-[#666677]" style={{ fontSize: "10px" }}>
                  Karma
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Your progress */}
        <div
          className="rounded-xl p-4 mb-4 border-l-[3px]"
          style={{
            backgroundColor: "#1A1A26",
            borderLeftColor: "#00CBA4",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={14} className="text-[#00CBA4]" />
            <span className="text-white font-semibold" style={{ fontSize: "12px" }}>
              Your Progress
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[#888899]" style={{ fontSize: "11px" }}>
                To reach rank 4
              </span>
              <span className="text-[#00CBA4] font-bold" style={{ fontSize: "11px" }}>
                1270 Karma needed
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#888899]" style={{ fontSize: "11px" }}>
                Weekly growth
              </span>
              <span className="text-[#00CBA4] font-bold" style={{ fontSize: "11px" }}>
                +28% ↑
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

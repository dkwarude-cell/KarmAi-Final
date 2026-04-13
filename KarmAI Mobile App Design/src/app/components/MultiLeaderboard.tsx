import { motion } from "motion/react";
import { useState } from "react";
import { Trophy, TrendingUp, Users, MapPin, Calendar, Flame } from "lucide-react";

type LeaderboardType = "global" | "monthly" | "college" | "category" | "friends" | "rising";

interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar?: string;
  college: string;
  karma: number;
  level: number;
  change?: number; // rank change, positive = went up
  badge?: string;
}

interface MultiLeaderboardProps {
  currentUserId: string;
  onClose: () => void;
}

export default function MultiLeaderboard({ currentUserId, onClose }: MultiLeaderboardProps) {
  const [selectedType, setSelectedType] = useState<LeaderboardType>("global");

  const leaderboardTabs: { id: LeaderboardType; label: string; icon: any; emoji: string }[] = [
    { id: "global", label: "Global", icon: Trophy, emoji: "🌍" },
    { id: "monthly", label: "Monthly", icon: Calendar, emoji: "📅" },
    { id: "college", label: "College", icon: Users, emoji: "🎓" },
    { id: "category", label: "Category", icon: MapPin, emoji: "📍" },
    { id: "friends", label: "Friends", icon: Users, emoji: "👥" },
    { id: "rising", label: "Rising", icon: TrendingUp, emoji: "⭐" },
  ];

  // Mock data - in production this would come from API
  const leaderboardData: Record<LeaderboardType, LeaderboardEntry[]> = {
    global: [
      { rank: 1, userId: "u1", username: "Aditya Sharma", college: "IIT Bombay", karma: 15420, level: 47, badge: "🏆" },
      { rank: 2, userId: "u2", username: "Priya Patel", college: "VJTI", karma: 14890, level: 45, badge: "🥈" },
      { rank: 3, userId: "u3", username: "Rahul Mehta", college: "SPIT", karma: 14200, level: 44, badge: "🥉" },
      { rank: 4, userId: "u4", username: "Sneha Desai", college: "DJ Sanghvi", karma: 13750, level: 42, change: 2 },
      { rank: 5, userId: "u5", username: "Arjun Kumar", college: "IIT Bombay", karma: 13500, level: 41, change: -1 },
      { rank: 6, userId: "u6", username: "Ananya Singh", college: "VJTI", karma: 12980, level: 40, change: 1 },
      { rank: 7, userId: "u7", username: "Rohan Gupta", college: "SPIT", karma: 12450, level: 39, change: -2 },
      { rank: 8, userId: currentUserId, username: "You", college: "VJTI", karma: 12100, level: 38, change: 3 },
      { rank: 9, userId: "u9", username: "Kavya Nair", college: "DJ Sanghvi", karma: 11850, level: 37, change: 0 },
      { rank: 10, userId: "u10", username: "Vikram Shah", college: "IIT Bombay", karma: 11600, level: 36, change: -1 },
    ],
    monthly: [
      { rank: 1, userId: "u4", username: "Sneha Desai", college: "DJ Sanghvi", karma: 2450, level: 42, change: 5, badge: "🏆" },
      { rank: 2, userId: currentUserId, username: "You", college: "VJTI", karma: 2280, level: 38, change: 12, badge: "🥈" },
      { rank: 3, userId: "u6", username: "Ananya Singh", college: "VJTI", karma: 2100, level: 40, change: 3, badge: "🥉" },
      { rank: 4, userId: "u1", username: "Aditya Sharma", college: "IIT Bombay", karma: 1950, level: 47, change: -2 },
      { rank: 5, userId: "u9", username: "Kavya Nair", college: "DJ Sanghvi", karma: 1870, level: 37, change: 8 },
    ],
    college: [
      { rank: 1, userId: currentUserId, username: "You", college: "VJTI", karma: 12100, level: 38, badge: "🏆" },
      { rank: 2, userId: "u2", username: "Priya Patel", college: "VJTI", karma: 14890, level: 45, badge: "🥈" },
      { rank: 3, userId: "u6", username: "Ananya Singh", college: "VJTI", karma: 12980, level: 40, badge: "🥉" },
      { rank: 4, userId: "u11", username: "Sameer Joshi", college: "VJTI", karma: 10200, level: 35 },
      { rank: 5, userId: "u12", username: "Riya Kapoor", college: "VJTI", karma: 9850, level: 34 },
    ],
    category: [
      { rank: 1, userId: "u1", username: "Aditya Sharma", college: "IIT Bombay", karma: 3420, level: 47, badge: "🏛️" },
      { rank: 2, userId: "u3", username: "Rahul Mehta", college: "SPIT", karma: 3200, level: 44 },
      { rank: 3, userId: currentUserId, username: "You", college: "VJTI", karma: 2890, level: 38 },
      { rank: 4, userId: "u5", username: "Arjun Kumar", college: "IIT Bombay", karma: 2650, level: 41 },
      { rank: 5, userId: "u7", username: "Rohan Gupta", college: "SPIT", karma: 2420, level: 39 },
    ],
    friends: [
      { rank: 1, userId: "u6", username: "Ananya Singh", college: "VJTI", karma: 12980, level: 40, badge: "🏆" },
      { rank: 2, userId: currentUserId, username: "You", college: "VJTI", karma: 12100, level: 38, badge: "🥈" },
      { rank: 3, userId: "u9", username: "Kavya Nair", college: "DJ Sanghvi", karma: 11850, level: 37, badge: "🥉" },
      { rank: 4, userId: "u11", username: "Sameer Joshi", college: "VJTI", karma: 10200, level: 35 },
      { rank: 5, userId: "u13", username: "Neha Verma", college: "SPIT", karma: 9500, level: 33 },
    ],
    rising: [
      { rank: 1, userId: currentUserId, username: "You", college: "VJTI", karma: 2280, level: 38, change: 12, badge: "⭐" },
      { rank: 2, userId: "u9", username: "Kavya Nair", college: "DJ Sanghvi", karma: 1870, level: 37, change: 8 },
      { rank: 3, userId: "u4", username: "Sneha Desai", college: "DJ Sanghvi", karma: 2450, level: 42, change: 5 },
      { rank: 4, userId: "u6", username: "Ananya Singh", college: "VJTI", karma: 2100, level: 40, change: 3 },
      { rank: 5, userId: "u14", username: "Karan Malhotra", college: "IIT Bombay", karma: 1650, level: 32, change: 7 },
    ],
  };

  const currentData = leaderboardData[selectedType];
  const currentUser = currentData.find(e => e.userId === currentUserId);

  return (
    <div className="absolute inset-0 z-50 bg-[#F8F9FA] overflow-hidden">
      {/* Header */}
      <div
        className="px-5 pt-12 pb-4 border-b"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#E5E7EB",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#FEF3C7" }}
            >
              <Trophy size={20} className="text-[#D97706]" />
            </div>
            <div>
              <h2 className="text-[#1A1A1A] font-bold" style={{ fontSize: "20px" }}>
                Leaderboards
              </h2>
              <p className="text-[#6B7280]" style={{ fontSize: "12px" }}>
                Compete with explorers worldwide
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#F3F4F6" }}
          >
            <span className="text-[#6B7280]">×</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {leaderboardTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id)}
              className="px-3 py-2 rounded-full whitespace-nowrap border transition-all flex items-center gap-1.5"
              style={{
                backgroundColor: selectedType === tab.id ? "#EDE9FE" : "#FFFFFF",
                borderColor: selectedType === tab.id ? "#7C5CE8" : "#E5E7EB",
                color: selectedType === tab.id ? "#7C5CE8" : "#6B7280",
                fontSize: "11px",
                fontWeight: selectedType === tab.id ? 600 : 500,
              }}
            >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Current User Card */}
      {currentUser && (
        <div className="p-5 border-b" style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}>
          <div
            className="rounded-2xl p-4 border-2"
            style={{
              backgroundColor: "#EDE9FE",
              borderColor: "#7C5CE8",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
                style={{ background: "linear-gradient(135deg, #7C5CE8, #0D9488)", fontSize: "18px" }}
              >
                #{currentUser.rank}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#1A1A1A] font-bold" style={{ fontSize: "14px" }}>
                    Your Rank
                  </span>
                  {currentUser.change !== undefined && currentUser.change !== 0 && (
                    <div
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: currentUser.change > 0 ? "#CCFBF1" : "#FEE2E2",
                        fontSize: "10px",
                        fontWeight: 600,
                        color: currentUser.change > 0 ? "#0D9488" : "#EF4444",
                      }}
                    >
                      {currentUser.change > 0 ? "↑" : "↓"} {Math.abs(currentUser.change)}
                    </div>
                  )}
                </div>
                <p className="text-[#6B7280]" style={{ fontSize: "11px" }}>
                  {currentUser.karma.toLocaleString()} Karma • Level {currentUser.level}
                </p>
              </div>
              {currentUser.badge && (
                <div style={{ fontSize: "32px" }}>{currentUser.badge}</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard List */}
      <div className="overflow-y-auto" style={{ height: "calc(100vh - 320px)" }}>
        <div className="p-5 space-y-2">
          {currentData.map((entry, index) => (
            <motion.div
              key={entry.userId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <LeaderboardCard entry={entry} isCurrentUser={entry.userId === currentUserId} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LeaderboardCard({ entry, isCurrentUser }: { entry: LeaderboardEntry; isCurrentUser: boolean }) {
  const getPodiumColor = (rank: number) => {
    if (rank === 1) return "#FFD700"; // Gold
    if (rank === 2) return "#C0C0C0"; // Silver
    if (rank === 3) return "#CD7F32"; // Bronze
    return "#6B7280";
  };

  const isTopThree = entry.rank <= 3;

  return (
    <div
      className="rounded-2xl p-4 border"
      style={{
        backgroundColor: isCurrentUser ? "#F0FDF4" : "#FFFFFF",
        borderColor: isCurrentUser ? "#0D9488" : "#E5E7EB",
        boxShadow: isTopThree ? "var(--shadow-md)" : "var(--shadow-sm)",
      }}
    >
      <div className="flex items-center gap-3">
        {/* Rank */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0"
          style={{
            backgroundColor: isTopThree ? `${getPodiumColor(entry.rank)}20` : "#F3F4F6",
            color: isTopThree ? getPodiumColor(entry.rank) : "#6B7280",
            fontSize: "16px",
          }}
        >
          {entry.badge || `#${entry.rank}`}
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="font-bold truncate"
              style={{
                fontSize: "14px",
                color: isCurrentUser ? "#0D9488" : "#1A1A1A",
              }}
            >
              {entry.username}
            </span>
            {entry.change !== undefined && entry.change !== 0 && (
              <div
                className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full shrink-0"
                style={{
                  backgroundColor: entry.change > 0 ? "#CCFBF1" : "#FEE2E2",
                  fontSize: "9px",
                  fontWeight: 600,
                  color: entry.change > 0 ? "#0D9488" : "#EF4444",
                }}
              >
                {entry.change > 0 ? "↑" : "↓"} {Math.abs(entry.change)}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-[#6B7280]" style={{ fontSize: "11px" }}>
            <span>🎓 {entry.college}</span>
            <span>•</span>
            <span>Lv.{entry.level}</span>
          </div>
        </div>

        {/* Karma */}
        <div className="text-right shrink-0">
          <div
            className="font-bold"
            style={{
              fontSize: "16px",
              color: isTopThree ? getPodiumColor(entry.rank) : "#1A1A1A",
            }}
          >
            {entry.karma.toLocaleString()}
          </div>
          <div className="text-[#6B7280]" style={{ fontSize: "10px" }}>
            Karma
          </div>
        </div>
      </div>
    </div>
  );
}

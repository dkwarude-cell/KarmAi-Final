import { useState } from "react";
import { motion } from "motion/react";
import ImpactDashboard from "./ImpactDashboard";
import BubbleMapView from "./BubbleMapView";
import { GamificationState } from "../types/gamification";
import { UserProfile } from "../types/profile";

interface HomeTabsViewProps {
  gamification: GamificationState;
  userProfile: UserProfile;
  onDriftClick: () => void;
  onStatsClick: () => void;
  onBehavioralClick: () => void;
  onActiveTabChange?: (tab: string) => void;
  campusMode?: "within" | "outside";
}

type Tab = "overview" | "today" | "insights" | "profile";

export default function HomeTabsView({
  gamification,
  userProfile,
  onDriftClick,
  onStatsClick,
  onBehavioralClick,
  onActiveTabChange,
  campusMode = "outside",
}: HomeTabsViewProps) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    onActiveTabChange?.(tab);
  };

  const tabs = [
    { id: "overview" as Tab, label: "Overview" },
    { id: "today" as Tab, label: "Today" },
    { id: "insights" as Tab, label: "Insights" },
    { id: "profile" as Tab, label: "Profile" },
  ];

  return (
    <div className="absolute top-[180px] left-0 right-0 bottom-[82px] z-20 flex flex-col">
      {/* Tab Navigation - Underline Style */}
      <div className="px-5 mb-4">
        <div className="flex border-b" style={{ borderColor: "#E5E7EB" }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className="flex-1 h-11 flex items-center justify-center relative transition-all duration-200"
              >
                <span
                  className={isActive ? "text-[#1A1A1A]" : "text-[#6B7280]"}
                  style={{ fontSize: "13px", fontWeight: isActive ? 700 : 500 }}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: "#7C5CE8" }}
                    layoutId="tabIndicator"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {activeTab === "overview" && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Real Impact This Week */}
            <ImpactDashboard variant="home" campusMode={campusMode} />

            {/* Interactive Bubble Map */}
            <BubbleMapView />

            {/* Quick Stats Row (3x1 Grid) */}
            <div className="grid grid-cols-3 gap-3">
              {/* Daily Drift */}
              <button
                onClick={onDriftClick}
                className="rounded-2xl p-4 border relative overflow-hidden text-left"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#EDE9FE",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div
                  className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-3xl"
                  style={{ background: "rgba(124, 92, 232, 0.08)" }}
                />
                <div className="relative z-10">
                  <div
                    className="px-2 py-0.5 rounded-full inline-block mb-2"
                    style={{
                      backgroundColor: "#CCFBF1",
                      fontSize: "7px",
                      fontWeight: 600,
                      color: "#0D9488",
                      letterSpacing: "0.05em",
                    }}
                  >
                    LIVE
                  </div>
                  <div className="text-[#7C5CE8] text-3xl font-bold mb-1">
                    50
                  </div>
                  <div className="text-[#1A1A1A] font-semibold mb-0.5" style={{ fontSize: "11px" }}>
                    Daily Drift
                  </div>
                  <div className="text-[#6B7280]" style={{ fontSize: "9px" }}>
                    AI pick today
                  </div>
                </div>
              </button>

              {/* Places This Week */}
              <button
                onClick={onStatsClick}
                className="rounded-2xl p-4 border relative overflow-hidden text-left"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#CCFBF1",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div
                  className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-3xl"
                  style={{ background: "rgba(13, 148, 136, 0.08)" }}
                />
                <div className="relative z-10">
                  <div className="text-[#0D9488] text-3xl font-bold mb-1">
                    7
                  </div>
                  <div className="text-[#1A1A1A] font-semibold mb-0.5" style={{ fontSize: "11px" }}>
                    Places
                  </div>
                  <div className="text-[#6B7280]" style={{ fontSize: "9px" }}>
                    this week
                  </div>
                </div>
              </button>

              {/* Streak */}
              <button
                onClick={onStatsClick}
                className="rounded-2xl p-4 border relative overflow-hidden text-left"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#FEF3C7",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div
                  className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-3xl"
                  style={{ background: "rgba(217, 119, 6, 0.08)" }}
                />
                <div className="relative z-10">
                  <div className="text-[#D97706] text-3xl font-bold mb-1">
                    5🔥
                  </div>
                  <div className="text-[#1A1A1A] font-semibold mb-0.5" style={{ fontSize: "11px" }}>
                    Streak
                  </div>
                  <div className="text-[#6B7280]" style={{ fontSize: "9px" }}>
                    day streak
                  </div>
                </div>
              </button>
            </div>

            {/* Level Progress Card */}
            <div
              className="rounded-2xl p-5 border"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E5E7EB",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-[#6B7280] text-xs mb-1">YOUR LEVEL</div>
                  <div className="text-[#1A1A1A] font-bold text-xl">
                    Level {gamification.level} • {gamification.levelName}
                  </div>
                </div>
                <div className="text-4xl">🏆</div>
              </div>

              <div className="mb-2">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[#6B7280] text-xs">Progress to next level</span>
                  <span className="text-[#1A1A1A] text-xs font-bold">70%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F3F4F6] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#7C5CE8] to-[#0D9488]"
                    style={{ width: "70%" }}
                  />
                </div>
              </div>

              <div className="text-[#6B7280] text-xs">
                {gamification.karmaPoints} Karma Points • {gamification.xp} XP
              </div>
            </div>

          </motion.div>
        )}

        {activeTab === "today" && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Today's Drift Header */}
            <div>
              <h2 className="text-[#1A1A1A] font-bold mb-1" style={{ fontSize: "20px" }}>
                Today's Drift
              </h2>
              <p className="text-[#6B7280]" style={{ fontSize: "13px" }}>
                Your personalized AI suggestion for today
              </p>
            </div>

            {/* Main Drift Card */}
            <div
              className="rounded-2xl p-5 border"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#EDE9FE",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <div
                className="inline-block px-3 py-1 rounded-full mb-3"
                style={{
                  backgroundColor: "#EDE9FE",
                  fontSize: "9px",
                  fontWeight: 600,
                  color: "#7C5CE8",
                  letterSpacing: "0.05em",
                }}
              >
                PERSONALIZED FOR YOU
              </div>

              <h3 className="text-[#1A1A1A] font-bold mb-2" style={{ fontSize: "18px" }}>
                {campusMode === "within"
                  ? "Try Main Canteen - Counter 7"
                  : "Try Blue Tokai Coffee Roasters"}
              </h3>

              <p className="text-[#6B7280] mb-4" style={{ fontSize: "13px", lineHeight: "1.5" }}>
                {campusMode === "within"
                  ? "You want to meet people → 3 students active here now • Your favorite paneer tikka available"
                  : "You drink coffee 3x/week but never tried specialty roasts • Popular with students"}
              </p>

              {/* Match Score */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b" style={{ borderColor: "#E5E7EB" }}>
                <span className="text-[#6B7280] text-xs">Match Score</span>
                <div className="flex items-center gap-2">
                  <div className="text-[#7C5CE8] text-2xl font-bold">91%</div>
                  <div
                    className="px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: "#CCFBF1",
                      fontSize: "8px",
                      fontWeight: 600,
                      color: "#0D9488",
                    }}
                  >
                    HIGH MATCH
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="flex gap-2 mb-4">
                {(campusMode === "within"
                  ? ["₹80", "2 min walk", "Free"]
                  : ["₹250", "1.2 km", "15 min"]
                ).map((label, i) => (
                  <div
                    key={i}
                    className="px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: "#CCFBF1",
                      color: "#0D9488",
                      fontSize: "11px",
                      fontWeight: 500,
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>

              <button
                onClick={onDriftClick}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#7C5CE8] to-[#0D9488] text-white font-semibold text-sm"
              >
                View Details & Why This? →
              </button>
            </div>

            {/* Action Required Badge */}
            <div
              className="rounded-2xl p-4 border-l-[3px]"
              style={{
                backgroundColor: "#CCFBF1",
                borderLeftColor: "#0D9488",
              }}
            >
              <p className="text-[#1A1A1A] font-semibold mb-1" style={{ fontSize: "12px" }}>
                📍 Real-world action required
              </p>
              <p className="text-[#6B7280]" style={{ fontSize: "11px" }}>
                Visit physically → GPS verifies → Earn 50 Karma + rewards
              </p>
            </div>
          </motion.div>
        )}

        {activeTab === "insights" && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <h2 className="text-[#1A1A1A] font-bold mb-1" style={{ fontSize: "20px" }}>
                AI Insights
              </h2>
              <p className="text-[#6B7280]" style={{ fontSize: "13px" }}>
                Your behavioral patterns and growth areas
              </p>
            </div>

            {/* Bubble Progress Card */}
            <div
              className="rounded-2xl p-5 border"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E5E7EB",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="64" cy="64" r="56" fill="none" stroke="#EDE9FE" strokeWidth="8" />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="#7C5CE8"
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.23)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[#1A1A1A] font-bold text-3xl">23%</span>
                    <span className="text-[#6B7280] text-xs">Campus Explored</span>
                  </div>
                </div>
              </div>

              <div
                className="px-3 py-1.5 rounded-full flex items-center justify-center gap-2 border"
                style={{
                  backgroundColor: "#FEE2E2",
                  borderColor: "#FCA5A5",
                }}
              >
                <span className="text-[#EF4444] text-xs font-semibold">⚠️ Filter Bubble Risk: HIGH</span>
              </div>
            </div>

            {/* Growth Areas */}
            <div
              className="rounded-2xl p-4 border"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E5E7EB",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <h3 className="text-[#1A1A1A] font-semibold mb-3" style={{ fontSize: "14px" }}>
                Growth Opportunities
              </h3>
              <div className="space-y-2">
                {[
                  { area: "Cross-Department", score: 23, color: "#D97706" },
                  { area: "Social Connections", score: 67, color: "#7C5CE8" },
                  { area: "Spontaneous Visits", score: 45, color: "#0D9488" },
                  { area: "Creative Zones", score: 34, color: "#3B82F6" },
                ].map((item) => (
                  <div key={item.area}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[#6B7280] text-xs">{item.area}</span>
                      <span className="text-[#1A1A1A] text-xs font-bold">{item.score}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#F3F4F6] overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${item.score}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onBehavioralClick}
              className="w-full h-12 rounded-xl border text-[#7C5CE8] font-medium text-sm"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#EDE9FE",
              }}
            >
              View Full Behavioral Graph Engine →
            </button>
          </motion.div>
        )}

        {activeTab === "profile" && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <h2 className="text-[#1A1A1A] font-bold mb-1" style={{ fontSize: "20px" }}>
                Your Profile
              </h2>
              <p className="text-[#6B7280]" style={{ fontSize: "13px" }}>
                Manage your preferences and settings
              </p>
            </div>

            {/* Level & Stats */}
            <div
              className="rounded-2xl p-5 border"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E5E7EB",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[#6B7280] text-xs mb-1">YOUR LEVEL</div>
                  <div className="text-[#1A1A1A] font-bold text-xl">
                    Level {gamification.level} • {gamification.levelName}
                  </div>
                </div>
                <div className="text-4xl">🏆</div>
              </div>

              <div className="mb-2">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[#6B7280] text-xs">Progress to next level</span>
                  <span className="text-[#1A1A1A] text-xs font-bold">70%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F3F4F6] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#7C5CE8] to-[#0D9488]"
                    style={{ width: "70%" }}
                  />
                </div>
              </div>

              <div className="text-[#6B7280] text-xs">
                {gamification.karmaPoints} Karma Points • {gamification.xp} XP
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <button
                onClick={onBehavioralClick}
                className="w-full h-12 rounded-xl border flex items-center justify-center gap-2 text-[#7C5CE8] font-medium text-left px-4"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#EDE9FE",
                  fontSize: "13px",
                }}
              >
                <span className="flex-1">Edit Profile & Preferences</span>
                <span>→</span>
              </button>
              <button
                onClick={onStatsClick}
                className="w-full h-12 rounded-xl border flex items-center justify-center gap-2 text-[#0D9488] font-medium text-left px-4"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#CCFBF1",
                  fontSize: "13px",
                }}
              >
                <span className="flex-1">View Rewards Wallet</span>
                <span>→</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

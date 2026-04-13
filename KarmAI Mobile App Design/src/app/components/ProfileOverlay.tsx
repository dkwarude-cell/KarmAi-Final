import { motion, AnimatePresence } from "motion/react";
import { X, Edit2, MapPin, TrendingUp, Users, Target, Award, Zap } from "lucide-react";
import { UserProfile } from "../types/profile";
import { GamificationState } from "../types/gamification";

interface ProfileOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  gamification?: GamificationState;
  onEditProfile: () => void;
  onViewRewards?: () => void;
  onEditTasteProfile?: () => void;
}

export default function ProfileOverlay({
  isOpen,
  onClose,
  profile,
  gamification,
  onEditProfile,
  onViewRewards,
  onEditTasteProfile,
}: ProfileOverlayProps) {
  const getIntentLabel = (intent: string) => {
    const labels = {
      "meet-people": "Meet new people",
      "explore-places": "Explore places",
      "build-skills": "Build skills",
      "find-opportunities": "Find opportunities",
      "break-routine": "Break routine",
    };
    return labels[intent as keyof typeof labels] || intent;
  };

  const getBudgetLabel = (budget: string) => {
    const labels = { free: "Free", low: "₹0-200", medium: "₹200-500", high: "₹500+" };
    return labels[budget as keyof typeof labels] || budget;
  };

  const getDistanceLabel = (distance: string) => {
    const labels = { "1km": "1 km", "5km": "5 km", citywide: "Citywide", anywhere: "Anywhere" };
    return labels[distance as keyof typeof labels] || distance;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div>
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 z-40"
            style={{
              backgroundColor: "rgba(10, 10, 15, 0.7)",
              backdropFilter: "blur(12px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Profile Panel */}
          <motion.div
            className="absolute z-50 rounded-t-[28px] border-t-[0.5px] overflow-y-auto"
            style={{
              bottom: 0,
              left: 0,
              right: 0,
              maxHeight: "85%",
              backgroundColor: "#12121A",
              borderColor: "rgba(255, 255, 255, 0.08)",
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-4 sticky top-0 bg-[#12121A] z-10">
              <div className="w-10 h-1 rounded-full bg-[#2A2A3A]" />
            </div>

            <div className="px-6 pb-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center border-2"
                    style={{
                      backgroundColor: "rgba(124, 92, 232, 0.2)",
                      borderColor: "#7C5CE8",
                    }}
                  >
                    <span className="text-white font-bold text-xl">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-white font-bold mb-0.5" style={{ fontSize: "20px" }}>
                      {profile.name}
                    </h2>
                    <p className="text-[#888899] mb-1" style={{ fontSize: "12px" }}>
                      {profile.course} • {profile.year}
                    </p>
                    <p className="text-[#666677]" style={{ fontSize: "11px" }}>
                      {profile.college}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onEditProfile}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Edit2 size={16} className="text-[#7C5CE8]" />
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                <div
                  className="rounded-xl p-3 text-center"
                  style={{ backgroundColor: "rgba(124, 92, 232, 0.1)" }}
                >
                  <div className="text-[#7C5CE8] font-bold mb-1" style={{ fontSize: "18px" }}>
                    {profile.bubblePercentage}%
                  </div>
                  <div className="text-[#888899]" style={{ fontSize: "9px" }}>
                    Explored
                  </div>
                </div>
                <div
                  className="rounded-xl p-3 text-center"
                  style={{ backgroundColor: "rgba(0, 203, 164, 0.1)" }}
                >
                  <div className="text-[#00CBA4] font-bold mb-1" style={{ fontSize: "18px" }}>
                    {profile.placesVisited}
                  </div>
                  <div className="text-[#888899]" style={{ fontSize: "9px" }}>
                    Places
                  </div>
                </div>
                <div
                  className="rounded-xl p-3 text-center"
                  style={{ backgroundColor: "rgba(240, 165, 0, 0.1)" }}
                >
                  <div className="text-[#F0A500] font-bold mb-1" style={{ fontSize: "18px" }}>
                    {gamification?.weeklyStreak || 0}
                  </div>
                  <div className="text-[#888899]" style={{ fontSize: "9px" }}>
                    Streak
                  </div>
                </div>
                <div
                  className="rounded-xl p-3 text-center"
                  style={{ backgroundColor: "rgba(232, 93, 48, 0.1)" }}
                >
                  <div className="text-[#E85D30] font-bold mb-1" style={{ fontSize: "18px" }}>
                    L{gamification?.level || 1}
                  </div>
                  <div className="text-[#888899]" style={{ fontSize: "9px" }}>
                    Level
                  </div>
                </div>
              </div>

              {/* Gamification Banner */}
              {gamification && (
                <button
                  onClick={() => {
                    onClose();
                    onViewRewards?.();
                  }}
                  className="w-full rounded-xl p-4 mb-6 border-[0.5px] text-left"
                  style={{
                    background: "linear-gradient(135deg, rgba(124, 92, 232, 0.15), rgba(0, 203, 164, 0.15))",
                    borderColor: "rgba(124, 92, 232, 0.3)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Award size={18} className="text-[#7C5CE8]" />
                      <span className="text-white font-semibold" style={{ fontSize: "13px" }}>
                        {gamification.karmaPoints} Karma Points
                      </span>
                    </div>
                    <span className="text-[#7C5CE8]" style={{ fontSize: "11px" }}>
                      View Wallet →
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="text-[#888899] mb-1" style={{ fontSize: "10px" }}>
                        Progress to {gamification.levelName}
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-black/30 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#7C5CE8] to-[#00CBA4]"
                          style={{ width: "70%" }}
                        />
                      </div>
                    </div>
                    <div className="text-[#00CBA4] font-bold" style={{ fontSize: "11px" }}>
                      +28%
                    </div>
                  </div>
                </button>
              )}

              {/* Current Intent */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Target size={16} className="text-[#7C5CE8]" />
                  <h3 className="text-white font-semibold" style={{ fontSize: "13px" }}>
                    Current Focus
                  </h3>
                </div>
                <div
                  className="rounded-xl p-4 border-[0.5px]"
                  style={{
                    backgroundColor: "rgba(124, 92, 232, 0.1)",
                    borderColor: "rgba(124, 92, 232, 0.3)",
                  }}
                >
                  <div className="text-[#A890F0] font-bold mb-1" style={{ fontSize: "16px" }}>
                    {getIntentLabel(profile.currentIntent)}
                  </div>
                  <div className="text-[#888899]" style={{ fontSize: "11px" }}>
                    AI suggestions are tailored to this goal
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold" style={{ fontSize: "13px" }}>
                    Your Interests
                  </h3>
                  {onEditTasteProfile && (
                    <button
                      onClick={() => {
                        onClose();
                        onEditTasteProfile();
                      }}
                      className="text-[#7C5CE8] font-medium hover:underline"
                      style={{ fontSize: "11px" }}
                    >
                      Edit Taste Profile →
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.primaryInterests.map((interest, i) => (
                    <div
                      key={i}
                      className="px-3 py-1.5 rounded-full"
                      style={{
                        backgroundColor: "rgba(124, 92, 232, 0.15)",
                        color: "#A890F0",
                        fontSize: "11px",
                        fontWeight: 500,
                      }}
                    >
                      {interest}
                    </div>
                  ))}
                </div>
              </div>

              {/* Behavior Profile */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3" style={{ fontSize: "13px" }}>
                  Behavior Profile
                </h3>
                <div className="space-y-2">
                  {[
                    { icon: MapPin, label: "Distance", value: getDistanceLabel(profile.distanceWillingness) },
                    { icon: TrendingUp, label: "Budget", value: getBudgetLabel(profile.budgetLevel) },
                    { icon: Users, label: "Style", value: profile.activityPreference },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl"
                      style={{ backgroundColor: "#1A1A26" }}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={16} className="text-[#666677]" />
                        <span className="text-[#888899]" style={{ fontSize: "12px" }}>
                          {item.label}
                        </span>
                      </div>
                      <span className="text-white font-medium" style={{ fontSize: "12px" }}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Insights */}
              <div>
                <h3 className="text-white font-semibold mb-3" style={{ fontSize: "13px" }}>
                  AI Insights
                </h3>
                <div className="space-y-2">
                  <div
                    className="p-3 rounded-xl border-l-[3px]"
                    style={{
                      backgroundColor: "#1A1A26",
                      borderLeftColor: "#7C5CE8",
                    }}
                  >
                    <div className="text-white font-medium mb-1" style={{ fontSize: "12px" }}>
                      Personality: {profile.personality}
                    </div>
                    <div className="text-[#888899]" style={{ fontSize: "10px" }}>
                      {profile.personality === "introvert"
                        ? "You prefer deeper, fewer connections. We'll suggest quality over quantity."
                        : "You thrive in social settings. We'll show you active group spots."}
                    </div>
                  </div>

                  <div
                    className="p-3 rounded-xl border-l-[3px]"
                    style={{
                      backgroundColor: "#1A1A26",
                      borderLeftColor: "#00CBA4",
                    }}
                  >
                    <div className="text-white font-medium mb-1" style={{ fontSize: "12px" }}>
                      Exploration: {profile.explorationStyle}
                    </div>
                    <div className="text-[#888899]" style={{ fontSize: "10px" }}>
                      {profile.explorationStyle === "cautious"
                        ? "You take calculated steps. We'll ease you into new experiences."
                        : "You love adventures. We'll push your boundaries further."}
                    </div>
                  </div>

                  <div
                    className="p-3 rounded-xl border-l-[3px]"
                    style={{
                      backgroundColor: "#1A1A26",
                      borderLeftColor: "#F0A500",
                    }}
                  >
                    <div className="text-white font-medium mb-1" style={{ fontSize: "12px" }}>
                      Active Time: {profile.activeHours}
                    </div>
                    <div className="text-[#888899]" style={{ fontSize: "10px" }}>
                      Most suggestions are tailored for your peak hours (12-3 PM)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

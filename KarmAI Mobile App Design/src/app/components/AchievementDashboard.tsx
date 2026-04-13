import { motion } from "motion/react";
import { TrendingUp, MapPin, Users, Zap, Award, Calendar } from "lucide-react";

interface AchievementStats {
  totalDistance: number; // in km
  placesVisited: number;
  categoriesCompleted: Record<string, number>;
  longestStreak: number;
  currentStreak: number;
  maxKarmaDay: number;
  totalConnections: number;
  rarestLocationVisited: string;
  comfortZoneExpansion: number; // percentage
}

interface AchievementDashboardProps {
  stats: AchievementStats;
  onClose: () => void;
}

export default function AchievementDashboard({ stats, onClose }: AchievementDashboardProps) {
  // Calculate category completion percentages
  const categories = [
    { name: "Heritage", total: 20, color: "#7C5CE8", emoji: "🏛️" },
    { name: "Cafes", total: 25, color: "#0D9488", emoji: "☕" },
    { name: "Culture", total: 15, color: "#D97706", emoji: "🎭" },
    { name: "Adventure", total: 18, color: "#EF4444", emoji: "⛰️" },
    { name: "Nature", total: 12, color: "#10B981", emoji: "🌳" },
  ];

  const categoryStats = categories.map((cat) => ({
    ...cat,
    visited: stats.categoriesCompleted[cat.name.toLowerCase()] || 0,
    percentage: Math.round(((stats.categoriesCompleted[cat.name.toLowerCase()] || 0) / cat.total) * 100),
  }));

  // Calculate distance milestone
  const distanceMilestones = [
    { distance: 10, name: "Local Explorer" },
    { distance: 50, name: "City Navigator" },
    { distance: 100, name: "Urban Wanderer" },
    { distance: 200, name: "Distance Champion" },
    { distance: 500, name: "Epic Traveler" },
  ];

  const currentMilestone = distanceMilestones.reduce((prev, curr) =>
    stats.totalDistance >= curr.distance ? curr : prev
  , distanceMilestones[0]);

  const nextMilestone = distanceMilestones.find(m => m.distance > stats.totalDistance);

  // Fun distance comparison
  const getDistanceComparison = (km: number) => {
    const comparisons = [
      { km: 300, text: "Mumbai to Pune and back!" },
      { km: 150, text: "Mumbai to Nashik" },
      { km: 100, text: "Mumbai to Lonavala and back!" },
      { km: 50, text: "Half a marathon!" },
      { km: 20, text: "Around Marine Drive 10 times!" },
      { km: 10, text: "Gateway of India to Bandra!" },
    ];

    return comparisons.find(c => km >= c.km)?.text || "Just getting started!";
  };

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
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#EDE9FE" }}
            >
              <Award size={20} className="text-[#7C5CE8]" />
            </div>
            <div>
              <h2 className="text-[#1A1A1A] font-bold" style={{ fontSize: "20px" }}>
                Achievement Tracker
              </h2>
              <p className="text-[#6B7280]" style={{ fontSize: "12px" }}>
                Your exploration journey
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
      </div>

      {/* Content */}
      <div className="overflow-y-auto p-5 space-y-4" style={{ height: "calc(100vh - 120px)" }}>
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={<MapPin size={20} className="text-[#0D9488]" />}
            value={stats.placesVisited.toString()}
            label="Places Visited"
            color="#0D9488"
          />
          <StatCard
            icon={<Users size={20} className="text-[#7C5CE8]" />}
            value={stats.totalConnections.toString()}
            label="Connections"
            color="#7C5CE8"
          />
          <StatCard
            icon={<Zap size={20} className="text-[#D97706]" />}
            value={`${stats.currentStreak}🔥`}
            label="Current Streak"
            color="#D97706"
          />
          <StatCard
            icon={<Calendar size={20} className="text-[#EF4444]" />}
            value={stats.maxKarmaDay.toString()}
            label="Max Karma/Day"
            color="#EF4444"
          />
        </div>

        {/* Distance Tracker */}
        <motion.div
          className="rounded-2xl p-5 border"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#E5E7EB",
            boxShadow: "var(--shadow-sm)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={16} className="text-[#7C5CE8]" />
            <h3 className="text-[#1A1A1A] font-bold" style={{ fontSize: "16px" }}>
              Total Distance Traveled
            </h3>
          </div>

          <div className="text-center mb-4">
            <div className="text-[#7C5CE8] font-bold mb-1" style={{ fontSize: "48px" }}>
              {stats.totalDistance.toFixed(1)}
            </div>
            <div className="text-[#6B7280]" style={{ fontSize: "14px" }}>
              kilometers
            </div>
          </div>

          <div
            className="rounded-xl p-3 mb-3"
            style={{ backgroundColor: "#EDE9FE" }}
          >
            <p className="text-[#7C5CE8] text-center font-medium" style={{ fontSize: "12px" }}>
              🌍 {getDistanceComparison(stats.totalDistance)}
            </p>
          </div>

          {/* Milestone Progress */}
          {nextMilestone && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#6B7280]" style={{ fontSize: "11px" }}>
                  Current: {currentMilestone.name}
                </span>
                <span className="text-[#1A1A1A] font-semibold" style={{ fontSize: "11px" }}>
                  Next: {nextMilestone.name}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#F3F4F6] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#7C5CE8] to-[#0D9488]"
                  style={{
                    width: `${(stats.totalDistance / nextMilestone.distance) * 100}%`,
                  }}
                />
              </div>
              <p className="text-[#6B7280] mt-1 text-center" style={{ fontSize: "10px" }}>
                {(nextMilestone.distance - stats.totalDistance).toFixed(1)}km to {nextMilestone.name}
              </p>
            </div>
          )}
        </motion.div>

        {/* Category Completion */}
        <motion.div
          className="rounded-2xl p-5 border"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#E5E7EB",
            boxShadow: "var(--shadow-sm)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={16} className="text-[#0D9488]" />
            <h3 className="text-[#1A1A1A] font-bold" style={{ fontSize: "16px" }}>
              Category Completion
            </h3>
          </div>

          <div className="space-y-3">
            {categoryStats.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: "16px" }}>{cat.emoji}</span>
                    <span className="text-[#1A1A1A] font-medium" style={{ fontSize: "13px" }}>
                      {cat.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#6B7280]" style={{ fontSize: "11px" }}>
                      {cat.visited}/{cat.total}
                    </span>
                    <span className="text-[#1A1A1A] font-bold" style={{ fontSize: "13px" }}>
                      {cat.percentage}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F3F4F6] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: cat.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Streak Achievements */}
        <motion.div
          className="rounded-2xl p-5 border"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#E5E7EB",
            boxShadow: "var(--shadow-sm)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span style={{ fontSize: "20px" }}>🔥</span>
            <h3 className="text-[#1A1A1A] font-bold" style={{ fontSize: "16px" }}>
              Streak Achievements
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div
              className="rounded-xl p-4 text-center"
              style={{ backgroundColor: "#FEF3C7" }}
            >
              <div className="text-[#D97706] font-bold mb-1" style={{ fontSize: "32px" }}>
                {stats.currentStreak}
              </div>
              <div className="text-[#6B7280]" style={{ fontSize: "11px" }}>
                Current Streak
              </div>
            </div>
            <div
              className="rounded-xl p-4 text-center"
              style={{ backgroundColor: "#CCFBF1" }}
            >
              <div className="text-[#0D9488] font-bold mb-1" style={{ fontSize: "32px" }}>
                {stats.longestStreak}
              </div>
              <div className="text-[#6B7280]" style={{ fontSize: "11px" }}>
                Longest Streak
              </div>
            </div>
          </div>
        </motion.div>

        {/* Special Achievements */}
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
          <div className="flex items-center gap-2 mb-4">
            <Award size={16} className="text-[#EF4444]" />
            <h3 className="text-[#1A1A1A] font-bold" style={{ fontSize: "16px" }}>
              Special Achievements
            </h3>
          </div>

          <div className="space-y-3">
            <SpecialAchievement
              emoji="💎"
              title="Rarest Discovery"
              description={stats.rarestLocationVisited}
              color="#B9F2FF"
            />
            <SpecialAchievement
              emoji="🎯"
              title="Comfort Zone Expansion"
              description={`${stats.comfortZoneExpansion}% growth in exploration radius`}
              color="#7C5CE8"
            />
            <SpecialAchievement
              emoji="👥"
              title="Social Connection Graph"
              description={`${stats.totalConnections} meaningful connections made`}
              color="#0D9488"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: string }) {
  return (
    <motion.div
      className="rounded-2xl p-4 border"
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: "#E5E7EB",
        boxShadow: "var(--shadow-sm)",
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
        style={{ backgroundColor: `${color}15` }}
      >
        {icon}
      </div>
      <div className="font-bold mb-1" style={{ fontSize: "24px", color }}>
        {value}
      </div>
      <div className="text-[#6B7280]" style={{ fontSize: "11px" }}>
        {label}
      </div>
    </motion.div>
  );
}

function SpecialAchievement({ emoji, title, description, color }: { emoji: string; title: string; description: string; color: string }) {
  return (
    <div
      className="rounded-xl p-3 flex items-start gap-3"
      style={{ backgroundColor: `${color}15` }}
    >
      <div style={{ fontSize: "24px" }}>{emoji}</div>
      <div className="flex-1">
        <h4 className="text-[#1A1A1A] font-semibold mb-1" style={{ fontSize: "13px" }}>
          {title}
        </h4>
        <p className="text-[#6B7280]" style={{ fontSize: "11px" }}>
          {description}
        </p>
      </div>
    </div>
  );
}

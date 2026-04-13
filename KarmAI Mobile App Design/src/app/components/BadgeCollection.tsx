import { motion } from "motion/react";
import { useState } from "react";
import { Badge, BADGE_DEFINITIONS, RARITY_COLORS, BadgeCategory } from "../types/badges";
import { Trophy, Lock } from "lucide-react";

interface BadgeCollectionProps {
  earnedBadges: Badge[];
  onClose: () => void;
}

export default function BadgeCollection({ earnedBadges, onClose }: BadgeCollectionProps) {
  const [filterCategory, setFilterCategory] = useState<BadgeCategory | "all">("all");
  const [filterRarity, setFilterRarity] = useState<"all" | "bronze" | "silver" | "gold" | "platinum" | "diamond">("all");

  // Merge badge definitions with earned status
  const allBadges: Badge[] = BADGE_DEFINITIONS.map((def) => {
    const earned = earnedBadges.find((b) => b.id === def.id);
    return {
      ...def,
      earned: !!earned,
      earnedAt: earned?.earnedAt,
      progress: earned?.progress || 0,
    };
  });

  // Filter badges
  const filteredBadges = allBadges.filter((badge) => {
    if (filterCategory !== "all" && badge.category !== filterCategory) return false;
    if (filterRarity !== "all" && badge.rarity !== filterRarity) return false;
    return true;
  });

  const earnedCount = filteredBadges.filter((b) => b.earned).length;
  const totalCount = filteredBadges.length;

  const categories: { id: BadgeCategory | "all"; label: string; emoji: string }[] = [
    { id: "all", label: "All", emoji: "🎯" },
    { id: "distance", label: "Distance", emoji: "🚀" },
    { id: "social", label: "Social", emoji: "🤝" },
    { id: "streak", label: "Streak", emoji: "🔥" },
    { id: "category", label: "Category", emoji: "📍" },
    { id: "time", label: "Time", emoji: "⏰" },
    { id: "combo", label: "Combo", emoji: "⚡" },
    { id: "seasonal", label: "Seasonal", emoji: "🌸" },
    { id: "rare", label: "Rare", emoji: "✨" },
  ];

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
              style={{ backgroundColor: "#EDE9FE" }}
            >
              <Trophy size={20} className="text-[#7C5CE8]" />
            </div>
            <div>
              <h2 className="text-[#1A1A1A] font-bold" style={{ fontSize: "20px" }}>
                Badge Collection
              </h2>
              <p className="text-[#6B7280]" style={{ fontSize: "12px" }}>
                {earnedCount} of {totalCount} earned
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

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full h-2 rounded-full bg-[#F3F4F6] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#7C5CE8] to-[#0D9488]"
              initial={{ width: 0 }}
              animate={{ width: `${(earnedCount / totalCount) * 100}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className="px-3 py-1.5 rounded-full whitespace-nowrap border transition-all"
              style={{
                backgroundColor: filterCategory === cat.id ? "#EDE9FE" : "#FFFFFF",
                borderColor: filterCategory === cat.id ? "#7C5CE8" : "#E5E7EB",
                color: filterCategory === cat.id ? "#7C5CE8" : "#6B7280",
                fontSize: "11px",
                fontWeight: filterCategory === cat.id ? 600 : 500,
              }}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Badge Grid */}
      <div className="p-5 overflow-y-auto" style={{ height: "calc(100vh - 250px)" }}>
        <div className="grid grid-cols-3 gap-3">
          {filteredBadges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02, duration: 0.3 }}
            >
              <BadgeCard badge={badge} />
            </motion.div>
          ))}
        </div>

        {filteredBadges.length === 0 && (
          <div className="text-center py-12">
            <div className="text-[#9CA3AF] text-5xl mb-3">🏆</div>
            <p className="text-[#6B7280]" style={{ fontSize: "14px" }}>
              No badges in this category yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function BadgeCard({ badge }: { badge: Badge }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowDetails(true)}
        className="w-full aspect-square rounded-2xl p-3 border relative overflow-hidden transition-all"
        style={{
          backgroundColor: badge.earned ? "#FFFFFF" : "#F8F9FA",
          borderColor: badge.earned ? badge.color : "#E5E7EB",
          opacity: badge.earned ? 1 : 0.6,
          boxShadow: badge.earned ? "var(--shadow-sm)" : "none",
        }}
      >
        {/* Rarity indicator */}
        <div
          className="absolute top-1 right-1 w-2 h-2 rounded-full"
          style={{ backgroundColor: RARITY_COLORS[badge.rarity] }}
        />

        {/* Badge Icon */}
        <div className="text-center mb-2">
          <div
            className="text-3xl mb-1"
            style={{
              filter: badge.earned ? "none" : "grayscale(100%)",
              opacity: badge.earned ? 1 : 0.5,
            }}
          >
            {badge.earned ? badge.emoji : <Lock size={28} className="mx-auto text-[#9CA3AF]" />}
          </div>
        </div>

        {/* Badge Name */}
        <div
          className="text-center font-semibold mb-1"
          style={{
            fontSize: "9px",
            color: badge.earned ? "#1A1A1A" : "#6B7280",
            lineHeight: "1.2",
          }}
        >
          {badge.name}
        </div>

        {/* Progress bar for locked badges */}
        {!badge.earned && badge.progress !== undefined && badge.progress > 0 && (
          <div className="mt-2">
            <div className="w-full h-1 rounded-full bg-[#E5E7EB] overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${badge.progress}%`,
                  backgroundColor: badge.color,
                }}
              />
            </div>
            <div className="text-center text-[#6B7280] mt-1" style={{ fontSize: "7px" }}>
              {badge.progress}%
            </div>
          </div>
        )}
      </button>

      {/* Detail Modal */}
      {showDetails && (
        <motion.div
          className="absolute inset-0 z-50 flex items-center justify-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(8px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowDetails(false)}
        >
          <motion.div
            className="bg-white rounded-3xl p-6 m-5 max-w-sm border"
            style={{ borderColor: badge.color, boxShadow: "var(--shadow-lg)" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Badge emoji/icon */}
            <div className="text-center mb-4">
              <div
                className="text-6xl inline-block p-4 rounded-full"
                style={{
                  backgroundColor: `${badge.color}15`,
                  filter: badge.earned ? "none" : "grayscale(100%)",
                }}
              >
                {badge.earned ? badge.emoji : "🔒"}
              </div>
            </div>

            {/* Badge info */}
            <div className="text-center mb-4">
              <div
                className="inline-block px-3 py-1 rounded-full mb-2"
                style={{
                  backgroundColor: `${RARITY_COLORS[badge.rarity]}20`,
                  color: RARITY_COLORS[badge.rarity],
                  fontSize: "10px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {badge.rarity} • Level {badge.level}
              </div>
              <h3 className="text-[#1A1A1A] font-bold mb-2" style={{ fontSize: "20px" }}>
                {badge.name}
              </h3>
              <p className="text-[#6B7280] mb-3" style={{ fontSize: "13px" }}>
                {badge.description}
              </p>
              <div
                className="inline-block px-4 py-2 rounded-xl"
                style={{
                  backgroundColor: "#F3F4F6",
                  fontSize: "12px",
                  color: "#1A1A1A",
                  fontWeight: 500,
                }}
              >
                📋 {badge.requirement}
              </div>
            </div>

            {/* Earned status */}
            {badge.earned && badge.earnedAt && (
              <div
                className="text-center p-3 rounded-xl mb-4"
                style={{ backgroundColor: "#CCFBF1" }}
              >
                <p className="text-[#0D9488] font-semibold" style={{ fontSize: "12px" }}>
                  ✓ Earned on {new Date(badge.earnedAt).toLocaleDateString()}
                </p>
              </div>
            )}

            {/* Progress for locked badges */}
            {!badge.earned && badge.progress !== undefined && (
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-[#6B7280]" style={{ fontSize: "11px" }}>
                    Progress
                  </span>
                  <span className="text-[#1A1A1A] font-bold" style={{ fontSize: "11px" }}>
                    {badge.progress}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F3F4F6] overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${badge.progress}%`,
                      backgroundColor: badge.color,
                    }}
                  />
                </div>
              </div>
            )}

            <button
              onClick={() => setShowDetails(false)}
              className="w-full h-12 rounded-xl font-semibold border"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E5E7EB",
                color: "#6B7280",
                fontSize: "14px",
              }}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

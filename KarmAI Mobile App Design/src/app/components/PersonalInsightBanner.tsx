import { motion } from "motion/react";
import { Sparkles, X } from "lucide-react";
import { UserProfile } from "../types/profile";

interface PersonalInsightBannerProps {
  profile: UserProfile;
  onDismiss: () => void;
}

export default function PersonalInsightBanner({ profile, onDismiss }: PersonalInsightBannerProps) {
  const getInsight = () => {
    const insights = [];

    // Budget-based insight
    if (profile.budgetLevel === "free" || profile.budgetLevel === "low") {
      insights.push({
        icon: "💰",
        text: `We're showing you ${profile.budgetLevel} options first`,
        color: "#00CBA4",
      });
    }

    // Time-based insight
    if (profile.activeHours === "afternoon") {
      insights.push({
        icon: "⏰",
        text: `${new Date().getHours() >= 12 && new Date().getHours() <= 15 ? "Perfect timing! " : ""}Most suggestions match your afternoon peak`,
        color: "#7C5CE8",
      });
    }

    // Intent-based insight
    if (profile.currentIntent === "meet-people") {
      insights.push({
        icon: "👥",
        text: "Highlighting active social spots for you",
        color: "#F0A500",
      });
    } else if (profile.currentIntent === "explore-places") {
      insights.push({
        icon: "🗺️",
        text: "Showing unexplored areas within your comfort zone",
        color: "#3B8ADD",
      });
    }

    // Personality-based insight
    if (profile.personality === "introvert") {
      insights.push({
        icon: "🎯",
        text: "Suggesting quality 1-on-1 connections, not crowds",
        color: "#7C5CE8",
      });
    }

    // Distance-based insight
    if (profile.distanceWillingness === "1km") {
      insights.push({
        icon: "📍",
        text: "All suggestions within 1 km of you",
        color: "#00CBA4",
      });
    }

    return insights[Math.floor(Math.random() * insights.length)] || insights[0];
  };

  const insight = getInsight();

  if (!insight) return null;

  return (
    <motion.div
      className="absolute top-[140px] left-5 right-5 z-20 rounded-2xl p-4 border-[0.5px]"
      style={{
        backgroundColor: "rgba(18, 18, 26, 0.95)",
        borderColor: `${insight.color}40`,
        backdropFilter: "blur(20px)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
      }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${insight.color}20` }}
        >
          <Sparkles size={14} style={{ color: insight.color }} />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div
                className="font-medium mb-0.5"
                style={{ fontSize: "12px", color: insight.color }}
              >
                AI Personalization Active
              </div>
              <p className="text-white" style={{ fontSize: "13px" }}>
                {insight.text}
              </p>
            </div>

            <button
              onClick={onDismiss}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={14} className="text-[#666677]" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

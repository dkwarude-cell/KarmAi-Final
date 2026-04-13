import { motion } from "motion/react";
import { CheckCircle2, Sparkles, TrendingUp, Target, Users, MapPin } from "lucide-react";

interface ProofBadgeProps {
  type: "verified" | "ai-powered" | "personalized" | "trending" | "matched" | "gps-verified";
  label?: string;
  size?: "small" | "medium" | "large";
  showIcon?: boolean;
  animated?: boolean;
}

export default function ProofBadge({
  type,
  label,
  size = "medium",
  showIcon = true,
  animated = true,
}: ProofBadgeProps) {
  const config = {
    verified: {
      icon: CheckCircle2,
      color: "#00CBA4",
      bgColor: "rgba(0, 203, 164, 0.15)",
      defaultLabel: "VERIFIED",
    },
    "ai-powered": {
      icon: Sparkles,
      color: "#7C5CE8",
      bgColor: "rgba(124, 92, 232, 0.15)",
      defaultLabel: "AI POWERED",
    },
    personalized: {
      icon: Target,
      color: "#A890F0",
      bgColor: "rgba(168, 144, 240, 0.15)",
      defaultLabel: "FOR YOU",
    },
    trending: {
      icon: TrendingUp,
      color: "#F0A500",
      bgColor: "rgba(240, 165, 0, 0.15)",
      defaultLabel: "TRENDING",
    },
    matched: {
      icon: Users,
      color: "#00CBA4",
      bgColor: "rgba(0, 203, 164, 0.15)",
      defaultLabel: "MATCHED",
    },
    "gps-verified": {
      icon: MapPin,
      color: "#00CBA4",
      bgColor: "rgba(0, 203, 164, 0.15)",
      defaultLabel: "GPS VERIFIED",
    },
  };

  const { icon: Icon, color, bgColor, defaultLabel } = config[type];
  const displayLabel = label || defaultLabel;

  const sizeConfig = {
    small: {
      height: "h-5",
      px: "px-2",
      fontSize: "8px",
      iconSize: 10,
      gap: "gap-1",
    },
    medium: {
      height: "h-6",
      px: "px-2.5",
      fontSize: "9px",
      iconSize: 12,
      gap: "gap-1.5",
    },
    large: {
      height: "h-7",
      px: "px-3",
      fontSize: "10px",
      iconSize: 14,
      gap: "gap-2",
    },
  };

  const { height, px, fontSize, iconSize, gap } = sizeConfig[size];

  const BadgeContent = (
    <div
      className={`inline-flex items-center ${gap} ${height} ${px} rounded-full`}
      style={{
        backgroundColor: bgColor,
        color: color,
        fontSize: fontSize,
        fontWeight: 600,
        letterSpacing: "0.05em",
      }}
    >
      {showIcon && <Icon size={iconSize} />}
      <span>{displayLabel}</span>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {BadgeContent}
      </motion.div>
    );
  }

  return BadgeContent;
}

import { motion } from "motion/react";
import { Sparkles, TrendingUp, Target, CheckCircle2 } from "lucide-react";

interface ProofPoint {
  icon: "sparkles" | "trending" | "target" | "check";
  text: string;
}

interface PersonalizedProofCardProps {
  title: string;
  subtitle?: string;
  proofPoints: ProofPoint[];
  variant?: "default" | "compact";
}

export default function PersonalizedProofCard({
  title,
  subtitle,
  proofPoints,
  variant = "default",
}: PersonalizedProofCardProps) {
  const iconMap = {
    sparkles: Sparkles,
    trending: TrendingUp,
    target: Target,
    check: CheckCircle2,
  };

  if (variant === "compact") {
    return (
      <motion.div
        className="rounded-xl p-3 border-l-[3px]"
        style={{
          backgroundColor: "rgba(124, 92, 232, 0.08)",
          borderLeftColor: "#7C5CE8",
        }}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-start gap-2">
          <Sparkles size={14} className="text-[#7C5CE8] mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-white font-semibold mb-1" style={{ fontSize: "11px" }}>
              {title}
            </p>
            <p className="text-[#888899]" style={{ fontSize: "10px", lineHeight: "1.4" }}>
              {subtitle || proofPoints[0]?.text}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="rounded-2xl p-4 border"
      style={{
        background: "linear-gradient(135deg, rgba(124, 92, 232, 0.1), rgba(0, 203, 164, 0.05))",
        borderColor: "rgba(124, 92, 232, 0.2)",
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: "rgba(124, 92, 232, 0.2)" }}
        >
          <Sparkles size={16} className="text-[#7C5CE8]" />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold" style={{ fontSize: "13px" }}>
            {title}
          </h3>
          {subtitle && (
            <p className="text-[#888899]" style={{ fontSize: "10px" }}>
              {subtitle}
            </p>
          )}
        </div>
        <div
          className="px-2 py-1 rounded-full"
          style={{
            backgroundColor: "rgba(0, 203, 164, 0.2)",
            fontSize: "8px",
            fontWeight: 600,
            color: "#00CBA4",
            letterSpacing: "0.05em",
          }}
        >
          VERIFIED
        </div>
      </div>

      {/* Proof Points */}
      <div className="space-y-2">
        {proofPoints.map((point, i) => {
          const Icon = iconMap[point.icon];
          return (
            <motion.div
              key={i}
              className="flex items-start gap-2 p-2 rounded-lg"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <Icon size={14} className="text-[#7C5CE8] mt-0.5 flex-shrink-0" />
              <p className="text-[#CCCCDD] flex-1" style={{ fontSize: "11px", lineHeight: "1.5" }}>
                {point.text}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Badge */}
      <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-white/5">
        <CheckCircle2 size={12} className="text-[#00CBA4]" />
        <span className="text-[#888899]" style={{ fontSize: "9px" }}>
          Personalized based on your profile • AI-powered matching
        </span>
      </div>
    </motion.div>
  );
}

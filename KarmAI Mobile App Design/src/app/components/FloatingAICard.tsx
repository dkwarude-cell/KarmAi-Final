import { motion } from "motion/react";
import { X, ChevronRight } from "lucide-react";

interface FloatingAICardProps {
  title: string;
  subtitle: string;
  badge?: string;
  x: number;
  y: number;
  onClick?: () => void;
  onDismiss?: () => void;
}

export default function FloatingAICard({
  title,
  subtitle,
  badge,
  x,
  y,
  onClick,
  onDismiss,
}: FloatingAICardProps) {
  return (
    <motion.div
      className="absolute z-20 cursor-pointer"
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0, opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.2}
      onClick={onClick}
    >
      <div
        className="rounded-2xl p-4 border-[0.5px] min-w-[240px] max-w-[280px]"
        style={{
          backgroundColor: "rgba(18, 18, 26, 0.95)",
          borderColor: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div className="flex items-start justify-between mb-2">
          {badge && (
            <div
              className="px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: "rgba(124, 92, 232, 0.2)",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.06em",
                color: "#A890F0",
              }}
            >
              {badge}
            </div>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDismiss?.();
            }}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={14} className="text-[#666677]" />
          </button>
        </div>

        <h4 className="text-white font-bold mb-1" style={{ fontSize: "14px" }}>
          {title}
        </h4>
        <p className="text-[#888899] mb-3" style={{ fontSize: "12px" }}>
          {subtitle}
        </p>

        <div className="flex items-center justify-between">
          <div
            className="px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: "rgba(0, 203, 164, 0.15)",
              color: "#00CBA4",
              fontSize: "9px",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            ACTION REQUIRED
          </div>
          <div className="flex items-center gap-1 text-[#7C5CE8]">
            <span style={{ fontSize: "12px", fontWeight: 500 }}>Why This? →</span>
          </div>
        </div>
      </div>

      {/* Connecting line to marker */}
      <div
        className="absolute w-[2px] h-8 -bottom-8 left-1/2 -translate-x-1/2"
        style={{
          background: "linear-gradient(to bottom, rgba(124, 92, 232, 0.5), transparent)",
        }}
      />
    </motion.div>
  );
}

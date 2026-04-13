import { motion } from "motion/react";
import { X, Sparkles } from "lucide-react";
import { GlassBadge } from "./GlassCard";

interface FloatingAICardGlassProps {
  title: string;
  subtitle: string;
  badge?: string;
  x: number;
  y: number;
  onClick?: () => void;
  onDismiss?: () => void;
}

/**
 * Premium Glassmorphism AI Card with Advanced Micro-interactions
 * Features: Spring physics, glow effects, floating animation
 */
export default function FloatingAICardGlass({
  title,
  subtitle,
  badge,
  x,
  y,
  onClick,
  onDismiss,
}: FloatingAICardGlassProps) {
  return (
    <motion.div
      className="absolute z-20 cursor-pointer"
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
      initial={{ scale: 0, opacity: 0, y: 20, rotate: -5 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: 0,
        rotate: 0,
      }}
      exit={{
        scale: 0,
        opacity: 0,
        y: -20,
        rotate: 5,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 0.8,
      }}
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.15}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 20 }}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Glass Card with Glow */}
      <motion.div
        className="relative min-w-[260px] max-w-[300px] rounded-3xl p-5"
        style={{
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(32px) saturate(180%)",
          WebkitBackdropFilter: "blur(32px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.9)",
          boxShadow: `
            0 12px 48px rgba(124, 92, 232, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.5) inset,
            0 2px 0 0 rgba(255, 255, 255, 0.8) inset
          `,
        }}
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Ambient Glow Effect */}
        <div
          className="absolute inset-0 rounded-3xl opacity-50 blur-xl"
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(124, 92, 232, 0.2), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Content Container */}
        <div className="relative z-10">
          {/* Header Row */}
          <div className="flex items-start justify-between mb-3">
            {/* AI Badge with Sparkles */}
            {badge && (
              <motion.div
                className="flex items-center gap-1.5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles size={12} className="text-purple-600" />
                <GlassBadge variant="purple" className="text-[10px]">
                  {badge}
                </GlassBadge>
              </motion.div>
            )}

            {/* Dismiss Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onDismiss?.();
              }}
              className="p-1.5 rounded-full transition-all hover:bg-white/50"
              style={{
                backdropFilter: "blur(8px)",
              }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <X size={14} className="text-gray-500" strokeWidth={2.5} />
            </motion.button>
          </div>

          {/* Title */}
          <motion.h4
            className="font-bold mb-2 tracking-tight"
            style={{
              fontSize: "15px",
              color: "#0F172A",
              lineHeight: 1.3,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            {title}
          </motion.h4>

          {/* Subtitle */}
          <motion.p
            className="mb-4 leading-relaxed"
            style={{
              fontSize: "12px",
              color: "#475569",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {subtitle}
          </motion.p>

          {/* Bottom Action Row */}
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            {/* Action Required Badge */}
            <div
              className="px-3 py-1.5 rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(13, 148, 136, 0.15) 0%, rgba(13, 148, 136, 0.08) 100%)",
                border: "1px solid rgba(13, 148, 136, 0.2)",
                boxShadow: "0 0 0 1px rgba(13, 148, 136, 0.1) inset",
              }}
            >
              <span
                className="font-bold tracking-wide"
                style={{
                  fontSize: "9px",
                  color: "#0F766E",
                  letterSpacing: "0.08em",
                }}
              >
                ACTION REQUIRED
              </span>
            </div>

            {/* Why This? Link */}
            <motion.div
              className="flex items-center gap-1"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span
                className="font-semibold"
                style={{
                  fontSize: "12px",
                  color: "#7C5CE8",
                }}
              >
                Why This?
              </span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ color: "#7C5CE8" }}
              >
                →
              </motion.span>
            </motion.div>
          </motion.div>
        </div>

        {/* Glossy Highlight Strip */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl opacity-60"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)",
          }}
        />
      </motion.div>

      {/* Connecting Line to Map Marker */}
      <motion.div
        className="absolute w-[2px] -bottom-10 left-1/2 -translate-x-1/2"
        style={{
          height: "40px",
          background: "linear-gradient(to bottom, rgba(124, 92, 232, 0.4), transparent)",
        }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scaleY: 1,
        }}
        transition={{
          opacity: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
          scaleY: {
            delay: 0.4,
            type: "spring",
            stiffness: 100,
            damping: 15,
          },
        }}
      />

      {/* Pulsing Dot at Connection Point */}
      <motion.div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
        style={{
          background: "linear-gradient(135deg, #7C5CE8, #9F7AEA)",
          boxShadow: "0 0 12px rgba(124, 92, 232, 0.6)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

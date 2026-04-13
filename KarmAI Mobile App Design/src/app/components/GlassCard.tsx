import { motion, HTMLMotionProps } from "motion/react";
import { ReactNode } from "react";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  variant?: "standard" | "strong" | "subtle";
  hover?: boolean;
  glow?: "purple" | "teal" | "orange" | "gold" | "none";
  innerGlow?: boolean;
  className?: string;
}

/**
 * GlassCard - Reusable glassmorphism card component
 *
 * @param variant - Glass opacity level (standard | strong | subtle)
 * @param hover - Enable hover scale effect
 * @param glow - Add colored glow shadow
 * @param innerGlow - Add inner white glow reflection
 * @param className - Additional Tailwind classes
 */
export default function GlassCard({
  children,
  variant = "standard",
  hover = false,
  glow = "none",
  innerGlow = true,
  className = "",
  ...motionProps
}: GlassCardProps) {
  const baseClass = variant === "strong"
    ? "glass-card-strong"
    : variant === "subtle"
    ? "glass-card-subtle"
    : "glass-card";

  const glowClass = glow === "purple"
    ? "glass-glow-purple"
    : glow === "teal"
    ? "glass-glow-teal"
    : "";

  const combinedClassName = `${baseClass} ${glowClass} ${className}`.trim();

  return (
    <motion.div
      className={combinedClassName}
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      }}
      whileHover={hover ? { scale: 1.02 } : undefined}
      whileTap={hover ? { scale: 0.98 } : undefined}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

/**
 * GlassBadge - Premium badge component for AI labels
 */
interface GlassBadgeProps {
  children: ReactNode;
  variant?: "purple" | "teal" | "gold";
  className?: string;
}

export function GlassBadge({
  children,
  variant = "purple",
  className = "",
}: GlassBadgeProps) {
  const badgeClass = variant === "teal"
    ? "glass-badge-teal"
    : variant === "gold"
    ? "glass-badge-gold"
    : "glass-badge";

  return (
    <motion.div
      className={`${badgeClass} ${className}`.trim()}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * GlassButton - Premium glassmorphism button
 */
interface GlassButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent";
  fullWidth?: boolean;
  className?: string;
}

export function GlassButton({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...motionProps
}: GlassButtonProps) {
  const variantStyles = variant === "primary"
    ? "bg-gradient-to-br from-purple-500 to-purple-600 text-white border-purple-400/30"
    : variant === "accent"
    ? "bg-gradient-to-br from-teal-500 to-teal-600 text-white border-teal-400/30"
    : "";

  return (
    <motion.button
      className={`glass-button ${variantStyles} ${
        fullWidth ? "w-full" : ""
      } px-6 py-3 rounded-2xl font-semibold text-sm tracking-tight ${className}`.trim()}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}

/**
 * GlassInput - Frosted glass input field
 */
interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function GlassInput({ className = "", ...inputProps }: GlassInputProps) {
  return (
    <input
      className={`glass-input px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 w-full ${className}`.trim()}
      {...inputProps}
    />
  );
}

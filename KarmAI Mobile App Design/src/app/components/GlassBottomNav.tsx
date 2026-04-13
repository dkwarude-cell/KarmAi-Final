import { motion } from "motion/react";
import { Home, MapPin, Compass, Users, Trophy, Award, User, LucideIcon } from "lucide-react";

interface NavItem {
  name: string;
  icon: LucideIcon;
  label: string;
}

interface GlassBottomNavProps {
  activeNav: string;
  onNavClick: (nav: string) => void;
}

const navItems: NavItem[] = [
  { name: "home", icon: Home, label: "Home" },
  { name: "explore", icon: MapPin, label: "Explore" },
  { name: "map", icon: Compass, label: "Map" },
  { name: "connect", icon: Users, label: "Connect" },
  { name: "leaderboard", icon: Trophy, label: "Rank" },
  { name: "rewards", icon: Award, label: "Rewards" },
  { name: "profile", icon: User, label: "Profile" },
];

export default function GlassBottomNav({ activeNav, onNavClick }: GlassBottomNavProps) {
  return (
    <motion.div
      className="absolute bottom-6 z-50 w-full flex justify-center px-4"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2,
      }}
    >
      {/* Floating Glass Dock Container */}
      <div className="glass-dock px-2 py-3 flex items-center justify-center gap-0">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeNav === item.name;

          return (
            <motion.button
              key={item.name}
              onClick={() => onNavClick(item.name)}
              className="relative flex flex-col items-center justify-center w-[52px] py-1.5 rounded-[18px] transition-colors"
              style={{
                color: isActive ? "#7C5CE8" : "#94A3B8",
              }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: index * 0.06,
                type: "spring",
                stiffness: 400,
                damping: 22,
              }}
              whileHover={{
                scale: 1.08,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.92 }}
            >
              {/* Active Background Pill with Enhanced Glow */}
              {isActive && (
                <motion.div
                  layoutId="activeNavPill"
                  className="absolute inset-0 rounded-[18px]"
                  style={{
                    background: "linear-gradient(135deg, rgba(124, 92, 232, 0.15) 0%, rgba(159, 122, 234, 0.1) 100%)",
                    boxShadow: "0 0 0 1.5px rgba(124, 92, 232, 0.25) inset, 0 4px 12px rgba(124, 92, 232, 0.15)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 28,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                />
              )}

              {/* Futuristic Icon Container */}
              <motion.div
                className="relative z-10 mb-0.5"
                animate={{
                  scale: isActive ? 1.15 : 1,
                  rotateZ: isActive ? [0, -5, 5, 0] : 0,
                }}
                transition={{
                  scale: {
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                  },
                  rotateZ: {
                    duration: 0.5,
                    ease: "easeInOut",
                  }
                }}
              >
                {/* Ambient Glow Behind Icon */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full blur-md"
                    style={{
                      background: "radial-gradient(circle, rgba(124, 92, 232, 0.4) 0%, transparent 70%)",
                      transform: "scale(1.8)",
                    }}
                    animate={{
                      opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}

                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  className={isActive ? "drop-shadow-[0_2px_12px_rgba(124,92,232,0.5)]" : ""}
                  style={{
                    filter: isActive ? "drop-shadow(0 0 8px rgba(124, 92, 232, 0.3))" : "none",
                  }}
                />
              </motion.div>

              {/* Compact Label */}
              <motion.span
                className="relative z-10 text-[9px] font-bold tracking-tight"
                style={{
                  fontWeight: isActive ? 700 : 600,
                  textShadow: isActive ? "0 1px 4px rgba(124, 92, 232, 0.3)" : "none",
                }}
                animate={{
                  opacity: isActive ? 1 : 0.75,
                }}
              >
                {item.label}
              </motion.span>

              {/* Futuristic Active Indicator - Line instead of dot */}
              {isActive && (
                <motion.div
                  className="absolute -bottom-0.5 w-8 h-[2px] rounded-full"
                  style={{
                    background: "linear-gradient(90deg, transparent, #7C5CE8 50%, transparent)",
                    boxShadow: "0 0 8px rgba(124, 92, 232, 0.6), 0 0 12px rgba(124, 92, 232, 0.4)",
                  }}
                  layoutId="navDot"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 28,
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Subtle Shadow Below Dock */}
      <motion.div
        className="absolute -bottom-2 left-1/2 w-3/4 h-4 rounded-full blur-xl opacity-20"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(124, 92, 232, 0.3), transparent)",
          transform: "translateX(-50%)",
        }}
        animate={{
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

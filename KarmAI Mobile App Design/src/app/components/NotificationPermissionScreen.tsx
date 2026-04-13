import { motion } from "motion/react";
import { Bell, X } from "lucide-react";

interface NotificationPermissionScreenProps {
  isOpen: boolean;
  onAllow: () => void;
  onSkip: () => void;
}

export default function NotificationPermissionScreen({
  isOpen,
  onAllow,
  onSkip,
}: NotificationPermissionScreenProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      className="absolute inset-0 z-50 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="h-full flex flex-col items-center justify-center px-6">
        {/* Skip button */}
        <button
          onClick={onSkip}
          className="absolute top-14 right-5 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-gray-100"
        >
          <X size={20} className="text-[#6B7280]" />
        </button>

        {/* Animated Bell Icon */}
        <motion.div
          className="w-24 h-24 rounded-3xl flex items-center justify-center mb-8"
          style={{
            background: "linear-gradient(135deg, #7C5CE8, #A890F0)",
            boxShadow: "0 20px 60px rgba(124, 92, 232, 0.4)",
          }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <motion.div
            animate={{
              rotate: [0, 15, -15, 15, 0],
            }}
            transition={{
              duration: 0.6,
              delay: 0.6,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <Bell size={40} className="text-white" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-[#1A1A1A] font-bold text-center mb-3"
          style={{ fontSize: "24px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Never miss your daily drift
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-[#6B7280] text-center mb-8"
          style={{ fontSize: "14px", lineHeight: "1.6" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Get notified when your personalized daily suggestion is ready
        </motion.p>

        {/* Benefits List */}
        <motion.div
          className="w-full max-w-sm space-y-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {[
            {
              emoji: "🎯",
              title: "Daily Drift Alerts",
              desc: "One smart suggestion per day",
            },
            {
              emoji: "🏆",
              title: "Reward Unlocks",
              desc: "Know when you earn new rewards",
            },
            {
              emoji: "⚡",
              title: "Streak Reminders",
              desc: "Keep your exploration streak alive",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-3 p-3 rounded-xl"
              style={{
                backgroundColor: "rgba(124, 92, 232, 0.05)",
                borderLeft: "3px solid rgba(124, 92, 232, 0.5)",
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <div className="text-2xl">{item.emoji}</div>
              <div className="flex-1">
                <h3 className="text-[#1A1A1A] font-semibold mb-0.5" style={{ fontSize: "13px" }}>
                  {item.title}
                </h3>
                <p className="text-[#6B7280]" style={{ fontSize: "11px" }}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Allow Button */}
        <motion.button
          onClick={onAllow}
          className="w-full max-w-sm h-14 rounded-2xl bg-gradient-to-r from-[#7C5CE8] to-[#A890F0] text-white font-semibold mb-3"
          style={{ fontSize: "15px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileTap={{ scale: 0.98 }}
        >
          Allow Notifications
        </motion.button>

        {/* Skip Button */}
        <motion.button
          onClick={onSkip}
          className="text-[#6B7280] font-medium"
          style={{ fontSize: "14px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          Not now
        </motion.button>

        {/* Footer Note */}
        <motion.p
          className="text-[#9CA3AF] text-center mt-8"
          style={{ fontSize: "11px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          We respect your privacy. Only essential notifications.
        </motion.p>
      </div>
    </motion.div>
  );
}

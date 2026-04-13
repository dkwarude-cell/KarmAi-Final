import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X } from "lucide-react";

interface RewardUnlockPopupProps {
  isOpen: boolean;
  onClose: () => void;
  reward: {
    karmaPoints: number;
    xp: number;
    badge?: string;
    placeName: string;
  };
}

export default function RewardUnlockPopup({ isOpen, onClose, reward }: RewardUnlockPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div>
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 z-50"
            style={{
              backgroundColor: "rgba(10, 10, 15, 0.9)",
              backdropFilter: "blur(20px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Popup */}
          <motion.div
            className="absolute z-50 rounded-3xl p-8 text-center"
            style={{
              top: "50%",
              left: "50%",
              width: "85%",
              maxWidth: "340px",
              backgroundColor: "#12121A",
              border: "1px solid rgba(124, 92, 232, 0.3)",
              boxShadow: "0 20px 60px rgba(124, 92, 232, 0.3)",
            }}
            initial={{ scale: 0.5, opacity: 0, x: "-50%", y: "-50%" }}
            animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
            exit={{ scale: 0.5, opacity: 0, x: "-50%", y: "-50%" }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Confetti particles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: i % 3 === 0 ? "#7C5CE8" : i % 3 === 1 ? "#00CBA4" : "#F0A500",
                  left: "50%",
                  top: "50%",
                }}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{
                  x: Math.cos((i / 20) * Math.PI * 2) * 120,
                  y: Math.sin((i / 20) * Math.PI * 2) * 120,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.03,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10"
            >
              <X size={16} className="text-[#888899]" />
            </button>

            {/* Content */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Success icon */}
              <motion.div
                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #7C5CE8, #00CBA4)",
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Sparkles size={36} className="text-white" />
              </motion.div>

              <h2 className="text-white font-bold mb-2" style={{ fontSize: "24px" }}>
                Visit Verified! 🎉
              </h2>

              <p className="text-[#888899] mb-6" style={{ fontSize: "13px" }}>
                You explored {reward.placeName}
              </p>

              {/* Rewards */}
              <div className="space-y-3 mb-6">
                <motion.div
                  className="rounded-xl p-4"
                  style={{ backgroundColor: "rgba(124, 92, 232, 0.15)" }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-[#7C5CE8] font-bold mb-1" style={{ fontSize: "28px" }}>
                    +{reward.karmaPoints}
                  </div>
                  <div className="text-[#888899]" style={{ fontSize: "11px" }}>
                    Karma Points
                  </div>
                </motion.div>

                <motion.div
                  className="rounded-xl p-4"
                  style={{ backgroundColor: "rgba(0, 203, 164, 0.15)" }}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-[#00CBA4] font-bold mb-1" style={{ fontSize: "28px" }}>
                    +{reward.xp}
                  </div>
                  <div className="text-[#888899]" style={{ fontSize: "11px" }}>
                    Experience Points
                  </div>
                </motion.div>

                {reward.badge && (
                  <motion.div
                    className="rounded-xl p-4"
                    style={{ backgroundColor: "rgba(240, 165, 0, 0.15)" }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                  >
                    <div className="text-4xl mb-2">{reward.badge}</div>
                    <div className="text-white font-bold mb-1" style={{ fontSize: "13px" }}>
                      New Badge Unlocked!
                    </div>
                    <div className="text-[#888899]" style={{ fontSize: "10px" }}>
                      Heritage Explorer
                    </div>
                  </motion.div>
                )}
              </div>

              {/* CTA */}
              <button
                onClick={onClose}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#7C5CE8] to-[#00CBA4] text-white font-semibold"
                style={{ fontSize: "14px" }}
              >
                Continue Exploring
              </button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

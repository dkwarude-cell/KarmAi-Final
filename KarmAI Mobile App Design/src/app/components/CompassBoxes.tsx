import { motion } from "motion/react";
import { Compass, TrendingUp, Zap } from "lucide-react";

interface CompassBoxesProps {
  onDriftClick: () => void;
  onStatsClick: () => void;
  karmaPoints: number;
  placesThisWeek: number;
  streakDays: number;
}

export default function CompassBoxes({
  onDriftClick,
  onStatsClick,
  karmaPoints,
  placesThisWeek,
  streakDays
}: CompassBoxesProps) {
  return (
    <div className="flex gap-2">
      {/* Daily Drift Box */}
      <motion.button
        onClick={onDriftClick}
        className="flex-1 rounded-2xl p-4 border border-white/10 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(124, 92, 232, 0.15), rgba(124, 92, 232, 0.05))",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Glow effect */}
        <div
          className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-3xl"
          style={{ background: "rgba(124, 92, 232, 0.3)" }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "rgba(124, 92, 232, 0.3)" }}
            >
              <Compass size={16} className="text-[#A890F0]" />
            </div>
            <div
              className="px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "rgba(0, 203, 164, 0.2)",
                fontSize: "8px",
                fontWeight: 600,
                color: "#00CBA4",
                letterSpacing: "0.05em",
              }}
            >
              LIVE
            </div>
          </div>

          <h3 className="text-white font-bold mb-1" style={{ fontSize: "13px" }}>
            Daily Drift
          </h3>
          <p className="text-[#888899]" style={{ fontSize: "10px" }}>
            Your AI pick for today
          </p>

          {/* Pulse indicator */}
          <motion.div
            className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-[#00CBA4]"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.button>

      {/* This Week Stats Box */}
      <motion.button
        onClick={onStatsClick}
        className="flex-1 rounded-2xl p-4 border border-white/10 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(0, 203, 164, 0.15), rgba(0, 203, 164, 0.05))",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Glow effect */}
        <div
          className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-3xl"
          style={{ background: "rgba(0, 203, 164, 0.3)" }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "rgba(0, 203, 164, 0.3)" }}
            >
              <TrendingUp size={16} className="text-[#00CBA4]" />
            </div>
          </div>

          <h3 className="text-[#00CBA4] font-bold mb-0.5" style={{ fontSize: "20px" }}>
            {placesThisWeek}
          </h3>
          <p className="text-[#888899]" style={{ fontSize: "10px" }}>
            places this week
          </p>
        </div>
      </motion.button>

      {/* Streak Box */}
      <motion.button
        onClick={onStatsClick}
        className="flex-1 rounded-2xl p-4 border border-white/10 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(240, 165, 0, 0.15), rgba(240, 165, 0, 0.05))",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Glow effect */}
        <div
          className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-3xl"
          style={{ background: "rgba(240, 165, 0, 0.3)" }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "rgba(240, 165, 0, 0.3)" }}
            >
              <Zap size={16} className="text-[#F0A500]" />
            </div>
          </div>

          <h3 className="text-[#F0A500] font-bold mb-0.5" style={{ fontSize: "20px" }}>
            {streakDays}🔥
          </h3>
          <p className="text-[#888899]" style={{ fontSize: "10px" }}>
            day streak
          </p>
        </div>
      </motion.button>
    </div>
  );
}

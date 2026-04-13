import { motion } from "motion/react";
import { TrendingUp, Users, MapPin, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

interface ImpactDashboardProps {
  variant?: "home" | "profile";
  campusMode?: "within" | "outside";
}

export default function ImpactDashboard({ variant = "home", campusMode = "outside" }: ImpactDashboardProps) {
  const [counts, setCounts] = useState({ users: 0, explored: 0, met: 0 });

  // Animated count-up effect
  useEffect(() => {
    const targets = campusMode === "within"
      ? { users: 234, explored: 12, met: 45 }  // Campus: Students active, Events today, Connections
      : { users: 50, explored: 32, met: 18 };  // City: Users nearby, New places, Connections
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        users: Math.floor(targets.users * progress),
        explored: Math.floor(targets.explored * progress),
        met: Math.floor(targets.met * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [campusMode]);

  return (
    <motion.div
      className="rounded-2xl p-5 border-[0.5px]"
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: "#CCFBF1",
        boxShadow: "var(--shadow-sm)",
      }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#CCFBF1" }}
          >
            <Sparkles size={16} className="text-[#0D9488]" />
          </div>
          <div>
            <h3 className="text-[#1A1A1A] font-bold" style={{ fontSize: "14px" }}>
              {campusMode === "within" ? "Campus Activity Today" : "Real Impact This Week"}
            </h3>
            <p className="text-[#6B7280]" style={{ fontSize: "10px" }}>
              {campusMode === "within"
                ? "Live campus ecosystem stats"
                : "We don't track clicks. We track actions."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp size={12} className="text-[#0D9488]" />
          <span className="text-[#0D9488] font-bold" style={{ fontSize: "11px" }}>
            +28%
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div
          className="text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <div
            className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
            style={{ backgroundColor: "#EDE9FE" }}
          >
            <Users size={20} className="text-[#7C5CE8]" />
          </div>
          <motion.div
            className="text-[#7C5CE8] font-bold mb-1"
            style={{ fontSize: "24px" }}
            key={counts.users}
          >
            {counts.users}
          </motion.div>
          <div className="text-[#6B7280]" style={{ fontSize: "10px" }}>
            {campusMode === "within" ? "Students Online" : "Students Active"}
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <div
            className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
            style={{ backgroundColor: "#CCFBF1" }}
          >
            <MapPin size={20} className="text-[#0D9488]" />
          </div>
          <motion.div
            className="text-[#0D9488] font-bold mb-1"
            style={{ fontSize: "24px" }}
            key={counts.explored}
          >
            {counts.explored}
          </motion.div>
          <div className="text-[#6B7280]" style={{ fontSize: "10px" }}>
            {campusMode === "within" ? "Events Today" : "New Places"}
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          <div
            className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
            style={{ backgroundColor: "#FEF3C7" }}
          >
            <div className="text-xl">🤝</div>
          </div>
          <motion.div
            className="text-[#D97706] font-bold mb-1"
            style={{ fontSize: "24px" }}
            key={counts.met}
          >
            {counts.met}
          </motion.div>
          <div className="text-[#6B7280]" style={{ fontSize: "10px" }}>
            Connections
          </div>
        </motion.div>
      </div>

      {/* Tagline */}
      <div
        className="mt-4 pt-4 border-t text-center"
        style={{ borderColor: "#E5E7EB" }}
      >
        <p className="text-[#0D9488] font-medium" style={{ fontSize: "11px" }}>
          ✓ All verified via GPS check-in
        </p>
      </div>
    </motion.div>
  );
}

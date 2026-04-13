import { motion } from "motion/react";
import { X, TrendingUp, Users, MapPin, Clock } from "lucide-react";

interface BusinessDashboardPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BusinessDashboardPreview({ isOpen, onClose }: BusinessDashboardPreviewProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      className="absolute inset-0 z-50 bg-[#0A0A0F] overflow-y-auto"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-5 pt-14 pb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-white font-bold mb-1" style={{ fontSize: "22px" }}>
              Business Analytics
            </h1>
            <div className="flex items-center gap-2">
              <p className="text-[#666677]" style={{ fontSize: "12px" }}>
                Counter 7 Cafe Dashboard
              </p>
              <div
                className="px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: "rgba(0, 203, 164, 0.15)",
                  color: "#00CBA4",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                PAY-PER-FOOTFALL
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: "Students Visited", value: "127", change: "+24%", icon: Users, color: "#7C5CE8" },
            { label: "Revenue Impact", value: "₹18.5k", change: "+32%", icon: TrendingUp, color: "#00CBA4" },
            { label: "Avg. Distance", value: "2.3 km", change: "-8%", icon: MapPin, color: "#F0A500" },
            { label: "Peak Time", value: "2-4 PM", change: "Consistent", icon: Clock, color: "#3B8ADD" },
          ].map((kpi, i) => (
            <motion.div
              key={i}
              className="rounded-xl p-4"
              style={{ backgroundColor: "#1A1A26" }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <kpi.icon size={16} style={{ color: kpi.color }} />
                <span
                  className="text-[#00CBA4] font-medium"
                  style={{ fontSize: "10px" }}
                >
                  {kpi.change}
                </span>
              </div>
              <div className="font-bold mb-0.5" style={{ fontSize: "20px", color: kpi.color }}>
                {kpi.value}
              </div>
              <div className="text-[#666677]" style={{ fontSize: "10px" }}>
                {kpi.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Student Demographics */}
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-3" style={{ fontSize: "14px" }}>
            Student Demographics
          </h3>
          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
          >
            {[
              { college: "ICT Mumbai", visits: 45, percentage: 35 },
              { college: "VJTI", visits: 38, percentage: 30 },
              { college: "Symbiosis", visits: 25, percentage: 20 },
              { college: "SP College", visits: 19, percentage: 15 },
            ].map((college, i) => (
              <div key={i} className="mb-3 last:mb-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white" style={{ fontSize: "12px" }}>
                    {college.college}
                  </span>
                  <span className="text-[#7C5CE8] font-bold" style={{ fontSize: "12px" }}>
                    {college.visits} visits
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-black/30 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#7C5CE8]"
                    style={{ width: `${college.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-3" style={{ fontSize: "14px" }}>
            KarmAI Conversion Funnel
          </h3>
          <div className="space-y-2">
            {[
              { stage: "Suggestion Shown", count: 450, percentage: 100 },
              { stage: "Map View", count: 280, percentage: 62 },
              { stage: "Check-in", count: 127, percentage: 28 },
              { stage: "Conversion", count: 98, percentage: 22 },
            ].map((stage, i) => (
              <div
                key={i}
                className="rounded-xl p-3 flex items-center justify-between"
                style={{
                  backgroundColor: "#1A1A26",
                  opacity: 1 - i * 0.15,
                }}
              >
                <div>
                  <div className="text-white font-medium mb-0.5" style={{ fontSize: "12px" }}>
                    {stage.stage}
                  </div>
                  <div className="text-[#666677]" style={{ fontSize: "10px" }}>
                    {stage.count} students
                  </div>
                </div>
                <div
                  className="px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(0, 203, 164, 0.15)",
                    color: "#00CBA4",
                    fontSize: "11px",
                    fontWeight: 600,
                  }}
                >
                  {stage.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Model */}
        <div
          className="rounded-xl p-4 border-l-[3px]"
          style={{
            backgroundColor: "#1A1A26",
            borderLeftColor: "#00CBA4",
          }}
        >
          <div className="text-white font-semibold mb-2" style={{ fontSize: "13px" }}>
            💰 Your KarmAI Earnings
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[#888899]" style={{ fontSize: "11px" }}>
                CPC (Cost per Check-in)
              </span>
              <span className="text-white font-bold" style={{ fontSize: "12px" }}>
                ₹50 × 127 = ₹6,350
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#888899]" style={{ fontSize: "11px" }}>
                CPA (Conversion bonus)
              </span>
              <span className="text-white font-bold" style={{ fontSize: "12px" }}>
                ₹125 × 98 = ₹12,250
              </span>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-[#00CBA4] font-semibold" style={{ fontSize: "12px" }}>
                Total Revenue
              </span>
              <span className="text-[#00CBA4] font-bold" style={{ fontSize: "16px" }}>
                ₹18,600
              </span>
            </div>
          </div>
        </div>

        {/* Platform Note */}
        <div
          className="mt-4 rounded-xl p-4 border-[0.5px]"
          style={{
            backgroundColor: "rgba(124, 92, 232, 0.05)",
            borderColor: "rgba(124, 92, 232, 0.2)",
          }}
        >
          <div className="text-center mb-3">
            <div className="text-2xl mb-2">💰</div>
            <h3 className="text-white font-bold mb-1" style={{ fontSize: "14px" }}>
              Pay-per-Footfall Model
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[#888899]" style={{ fontSize: "11px" }}>
                1. KarmAI suggests your place
              </span>
              <span className="text-[#7C5CE8]">→</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#888899]" style={{ fontSize: "11px" }}>
                2. Student visits physically
              </span>
              <span className="text-[#7C5CE8]">→</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#888899]" style={{ fontSize: "11px" }}>
                3. GPS confirms visit
              </span>
              <span className="text-[#7C5CE8]">→</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#00CBA4] font-semibold" style={{ fontSize: "11px" }}>
                4. You pay • Student earns
              </span>
              <span className="text-[#00CBA4]">✓</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

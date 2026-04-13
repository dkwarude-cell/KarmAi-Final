import { motion } from "motion/react";
import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  Users,
  TrendingUp,
  DollarSign,
  Play,
  Pause,
  Edit3,
  Plus,
} from "lucide-react";

interface PartnerDashboardProps {
  onClose: () => void;
}

export default function PartnerDashboard({ onClose }: PartnerDashboardProps) {
  const campaigns = [
    {
      id: 1,
      name: "Weekend Coffee Drift",
      targeted: 120,
      acceptance: 68,
      costPerDrift: 8,
      color: "#0D9488", // teal
    },
    {
      id: 2,
      name: "Open Mic Night",
      targeted: 85,
      acceptance: 82,
      costPerDrift: 12,
      color: "#7C3AED", // purple
    },
  ];

  const heatmapData = [
    ["Morning", 20, 45, 60, 30, 25, 70, 85], // Mon-Sun
    ["Afternoon", 80, 75, 85, 90, 80, 95, 100],
    ["Evening", 60, 55, 70, 65, 90, 100, 95],
  ];

  return (
    <motion.div
      className="absolute inset-0 z-[200] flex flex-col"
      style={{ backgroundColor: "#F8F9FA" }}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
    >
      {/* Status Bar */}
      <div className="h-[44px]" />

      {/* Top Bar */}
      <div className="h-[56px] px-5 flex items-center justify-between bg-white border-b border-[#E5E7EB]">
        <button onClick={onClose} className="flex items-center gap-2">
          <ArrowLeft size={20} className="text-[#1A1A1A]" />
        </button>
        <span className="text-[#1A1A1A] font-bold" style={{ fontSize: "16px" }}>
          Partner Dashboard
        </span>
        <button>
          <Bell size={20} className="text-[#9CA3AF]" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* Venue Name */}
        <div className="mb-4 flex items-center gap-2">
          <h2 className="text-[#1A1A1A] font-bold" style={{ fontSize: "18px" }}>
            Brew Lab Cafe
          </h2>
          <CheckCircle2 size={18} className="text-[#10B981]" />
        </div>

        {/* Hero Metrics Card */}
        <motion.div
          className="rounded-[20px] p-5 mb-4 bg-white border"
          style={{
            borderColor: "#0D9488",
            boxShadow: "0 4px 12px rgba(13, 148, 136, 0.1)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-[#1A1A1A] font-bold mb-4" style={{ fontSize: "15px" }}>
            This Week's Reach
          </h3>

          <div className="grid grid-cols-3 gap-3 mb-3">
            {/* Students Reached */}
            <div>
              <div className="text-[#7C3AED] font-bold mb-1" style={{ fontSize: "24px" }}>
                247
              </div>
              <p className="text-[#6B7280]" style={{ fontSize: "11px" }}>
                Students Reached
              </p>
            </div>

            {/* Drift Visits */}
            <div>
              <div className="text-[#0D9488] font-bold mb-1" style={{ fontSize: "24px" }}>
                34
              </div>
              <p className="text-[#6B7280]" style={{ fontSize: "11px" }}>
                Drift Visits
              </p>
            </div>

            {/* Revenue Impact */}
            <div>
              <div className="text-[#D97706] font-bold mb-1" style={{ fontSize: "24px" }}>
                ₹4,200
              </div>
              <p className="text-[#6B7280]" style={{ fontSize: "11px" }}>
                Est. Revenue Impact
              </p>
            </div>
          </div>

          <p className="text-[#9CA3AF]" style={{ fontSize: "10px" }}>
            Powered by Karm AI auto-recommendations
          </p>
        </motion.div>

        {/* Active Campaigns */}
        <motion.div
          className="rounded-[20px] p-4 mb-4 bg-white border"
          style={{
            borderColor: "#E5E7EB",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-[#1A1A1A] font-bold flex-1" style={{ fontSize: "15px" }}>
              Your Active Campaigns
            </h3>
            <div
              className="px-2 py-1 rounded-full flex items-center gap-1"
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.2)",
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span className="text-[#10B981] font-semibold" style={{ fontSize: "9px" }}>
                LIVE
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {campaigns.map((campaign, i) => (
              <div
                key={campaign.id}
                className="p-3 rounded-[14px] bg-white border"
                style={{
                  borderColor: `${campaign.color}30`,
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-[#1A1A1A] font-semibold mb-1" style={{ fontSize: "13px" }}>
                      {campaign.name}
                    </h4>
                    <p className="text-[#6B7280]" style={{ fontSize: "11px" }}>
                      {campaign.targeted} students targeted
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      className="w-8 h-8 rounded-lg flex items-center justify-center border"
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#E5E7EB",
                      }}
                    >
                      <Pause size={14} className="text-[#6B7280]" />
                    </button>
                    <button
                      className="w-8 h-8 rounded-lg flex items-center justify-center border"
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#E5E7EB",
                      }}
                    >
                      <Edit3 size={14} className="text-[#6B7280]" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#6B7280]" style={{ fontSize: "10px" }}>
                      Acceptance Rate
                    </span>
                    <span className="text-[#1A1A1A] font-semibold" style={{ fontSize: "11px" }}>
                      {campaign.acceptance}%
                    </span>
                  </div>
                  <div
                    className="w-full h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: "#E5E7EB" }}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${campaign.acceptance}%`,
                        backgroundColor: campaign.color,
                      }}
                    />
                  </div>
                </div>

                {/* Cost */}
                <div className="flex items-center gap-1">
                  <DollarSign size={12} className="text-[#6B7280]" />
                  <span className="text-[#6B7280]" style={{ fontSize: "11px" }}>
                    ₹{campaign.costPerDrift}/drift
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Student Footfall Heatmap */}
        <motion.div
          className="rounded-[20px] p-4 mb-4 bg-white border"
          style={{
            borderColor: "#E5E7EB",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-[#1A1A1A] font-bold mb-1" style={{ fontSize: "15px" }}>
            Peak Visit Times
          </h3>
          <p className="text-[#6B7280] mb-4" style={{ fontSize: "11px" }}>
            When students drift to you
          </p>

          <div className="space-y-2">
            {/* Days header */}
            <div className="flex gap-1 mb-2 pl-[70px]">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                <div
                  key={i}
                  className="flex-1 text-center text-[#9CA3AF]"
                  style={{ fontSize: "9px" }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Heatmap rows */}
            {heatmapData.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-1 items-center">
                <div
                  className="w-[65px] text-[#6B7280] text-right pr-2"
                  style={{ fontSize: "10px" }}
                >
                  {row[0]}
                </div>
                {row.slice(1).map((intensity, colIndex) => {
                  const normalizedIntensity = intensity as number;
                  const opacity = normalizedIntensity / 100;
                  return (
                    <div
                      key={colIndex}
                      className="flex-1 h-7 rounded"
                      style={{
                        backgroundColor: `rgba(13, 148, 136, ${opacity * 0.8 + 0.1})`,
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Create Campaign Button */}
        <motion.button
          className="w-full h-[52px] rounded-[14px] font-bold text-white flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(90deg, #7C3AED 0%, #0D9488 100%)",
            boxShadow: "0 4px 16px rgba(124, 58, 237, 0.3)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus size={20} />
          <span style={{ fontSize: "14px" }}>Create New Drift Campaign</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
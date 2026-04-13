import { ArrowRight, Share2 } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import BottomNav from "./BottomNav";

interface BubbleAnalyticsScreenProps {
  onNavigate: (screen: string) => void;
}

const radarData = [
  { category: "Departments", value: 14, maxValue: 100 },
  { category: "Events", value: 12, maxValue: 100 },
  { category: "People", value: 35, maxValue: 100 },
  { category: "Canteens", value: 18, maxValue: 100 },
  { category: "Places", value: 28, maxValue: 100 },
  { category: "Culture", value: 8, maxValue: 100 },
];

export default function BubbleAnalyticsScreen({ onNavigate }: BubbleAnalyticsScreenProps) {
  return (
    <div className="w-[390px] h-[844px] bg-[#0A0A0F] relative flex flex-col">
      <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-white font-bold mb-1" style={{ fontSize: "22px" }}>
          Your Bubble
        </h1>
        <p className="text-[#666677]" style={{ fontSize: "14px" }}>
          Track your world expansion
        </p>
      </div>

      {/* Main Bubble Visualization */}
      <div className="mx-5 mb-3">
        <div
          className="rounded-[24px] p-5 border-[0.5px]"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            borderColor: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="h-[240px] flex items-center justify-center">
            <div className="relative w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255, 255, 255, 0.1)" />
                  <PolarAngleAxis
                    dataKey="category"
                    tick={{ fill: "#888899", fontSize: 12 }}
                  />
                  <Radar
                    dataKey="value"
                    stroke="#7C5CE8"
                    fill="rgba(124, 92, 232, 0.25)"
                    strokeWidth={1.5}
                  />
                </RadarChart>
              </ResponsiveContainer>

              {/* Center percentage */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white font-bold mb-0.5" style={{ fontSize: "32px" }}>
                    23%
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7C5CE8] mx-auto" />
                </div>
              </div>
            </div>
          </div>

          <p className="text-[#666677] text-center" style={{ fontSize: "11px" }}>
            Explored so far — started 3 months ago
          </p>
        </div>
      </div>

      {/* Metric Grid */}
      <div className="mx-5 mb-3">
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Departments", value: "2 / 14", change: "↑ 12% this week" },
            { label: "Canteen variety", value: "18%", change: "↑ 6% this week" },
            { label: "Event types", value: "1 / 8", change: "→ No change" },
            { label: "New connections", value: "0", change: "Start exploring!" },
          ].map((metric, i) => (
            <div
              key={i}
              className="rounded-xl p-3"
              style={{ backgroundColor: "#1A1A26" }}
            >
              <p className="text-[#666677] mb-1" style={{ fontSize: "11px" }}>
                {metric.label}
              </p>
              <p className="text-white font-bold mb-1" style={{ fontSize: "22px" }}>
                {metric.value}
              </p>
              <p
                className="text-[#00CBA4]"
                style={{ fontSize: "11px" }}
              >
                {metric.change}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Before / After Section */}
      <div className="mx-5 mb-3">
        <h3 className="text-white font-medium mb-3" style={{ fontSize: "14px" }}>
          Your journey
        </h3>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute top-2 left-0 right-0 h-[1px]"
            style={{ backgroundColor: "#333344" }}
          />

          {/* Timeline points */}
          <div className="relative flex justify-between items-start">
            {[
              { label: "Start", sublabel: "3 months ago", value: "8%", active: false },
              { label: "Now", sublabel: "Today", value: "23%", active: true },
              { label: "Goal", sublabel: "1 year", value: "65%", active: false },
            ].map((point, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className="w-3 h-3 rounded-full border-2 mb-2"
                  style={{
                    backgroundColor: point.active ? "#7C5CE8" : "#1A1A26",
                    borderColor: point.active ? "#7C5CE8" : "#333344",
                  }}
                />
                <p className="text-white font-medium mb-0.5" style={{ fontSize: "12px" }}>
                  {point.label}
                </p>
                <p className="text-[#666677] mb-0.5" style={{ fontSize: "10px" }}>
                  {point.sublabel}
                </p>
                <p
                  className="font-bold"
                  style={{
                    fontSize: "11px",
                    color: point.active ? "#7C5CE8" : "#888899",
                  }}
                >
                  {point.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Unexplored Section */}
      <div className="mx-5 mb-3">
        <h3 className="text-white font-medium mb-3" style={{ fontSize: "14px" }}>
          The campus you haven't met
        </h3>

        <div
          className="rounded-xl overflow-hidden border-[0.5px]"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            borderColor: "rgba(255, 255, 255, 0.06)",
          }}
        >
          {[
            { name: "Philosophy Department", color: "#7C5CE8" },
            { name: "South Campus Canteen", color: "#00CBA4" },
            { name: "Heritage Library Wing", color: "#F0A500" },
          ].map((item, i) => (
            <div key={i}>
              <div className="px-4 py-3 flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="flex-1 text-white font-medium" style={{ fontSize: "13px" }}>
                  {item.name}
                </span>
                <span className="text-[#7C5CE8] flex items-center gap-1" style={{ fontSize: "12px" }}>
                  Drift here
                  <ArrowRight size={12} />
                </span>
              </div>
              {i < 2 && (
                <div
                  className="h-[0.5px] mx-4"
                  style={{ backgroundColor: "#1A1A26" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Share Card */}
      <div className="mx-5">
        <div
          className="rounded-xl p-4 border-[0.5px] flex items-center gap-3"
          style={{
            backgroundColor: "rgba(0, 203, 164, 0.08)",
            borderColor: "rgba(0, 203, 164, 0.2)",
          }}
        >
          <div className="flex-1">
            <p className="text-white font-medium mb-0.5" style={{ fontSize: "13px" }}>
              Share your bubble growth journey
            </p>
            <p className="text-[#00CBA4]" style={{ fontSize: "11px" }}>
              Let friends see your 3-month transformation
            </p>
          </div>
          <button
            className="w-9 h-9 rounded-full border flex items-center justify-center"
            style={{ borderColor: "#00CBA4" }}
          >
            <Share2 size={16} className="text-[#00CBA4]" />
          </button>
        </div>
      </div>
      </div>

      {/* Bottom Nav */}
      <BottomNav activeScreen="bubble" onNavigate={onNavigate} />
    </div>
  );
}

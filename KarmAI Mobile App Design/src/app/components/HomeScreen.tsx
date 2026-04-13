import { Bell, Settings, ChevronRight } from "lucide-react";
import BottomNav from "./BottomNav";
import DriftDestinationsRow from "./DriftDestinationsRow";
import PartnerBanner from "./PartnerBanner";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  onShowDriftDetail: () => void;
  onShowPartnerDashboard?: () => void;
}

export default function HomeScreen({ onNavigate, onShowDriftDetail, onShowPartnerDashboard }: HomeScreenProps) {
  return (
    <div className="w-[390px] h-[844px] bg-[#0A0A0F] relative flex flex-col">
      <div className="flex-1 overflow-y-auto">
      {/* Status bar */}
      <div className="h-[44px]" />

      {/* Top nav */}
      <div className="h-[56px] px-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center border-[1.5px] border-[#7C5CE8]"
            style={{ backgroundColor: "rgba(124, 92, 232, 0.15)" }}
          >
            <span className="text-white font-medium" style={{ fontSize: "13px" }}>
              DW
            </span>
          </div>
          <span className="text-white font-medium" style={{ fontSize: "15px" }}>
            Good evening, Deepak
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell size={20} className="text-[#666677]" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#00CBA4]" />
          </div>
          <Settings size={20} className="text-[#666677]" />
        </div>
      </div>

      {/* Bubble Score Banner */}
      <div className="mx-5 mt-4 mb-4">
        <button
          onClick={() => onNavigate("bubble")}
          className="w-full h-[72px] rounded-[16px] px-4 flex items-center gap-3 border-[0.5px] text-left"
          style={{
            backgroundColor: "rgba(124, 92, 232, 0.12)",
            borderColor: "rgba(124, 92, 232, 0.3)",
          }}
        >
          {/* Circular progress */}
          <div className="relative w-[52px] h-[52px] flex-shrink-0">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="26"
                cy="26"
                r="22"
                fill="none"
                stroke="rgba(124, 92, 232, 0.2)"
                strokeWidth="4"
              />
              <circle
                cx="26"
                cy="26"
                r="22"
                fill="none"
                stroke="#7C5CE8"
                strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 22}`}
                strokeDashoffset={`${2 * Math.PI * 22 * (1 - 0.23)}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[#7C5CE8] font-bold" style={{ fontSize: "14px" }}>
                23%
              </span>
            </div>
          </div>

          <div className="flex-1">
            <p className="text-[#AAAACC] font-medium mb-0.5" style={{ fontSize: "13px" }}>
              Your Bubble Score
            </p>
            <p className="text-[#666677]" style={{ fontSize: "12px" }}>
              You've explored 23% of your world. The other 77% is waiting.
            </p>
          </div>

          <ChevronRight size={16} className="text-[#7C5CE8] flex-shrink-0" />
        </button>
      </div>

      {/* Today's Drift Card */}
      <div className="mx-5 mb-4">
        <div
          className="rounded-[20px] p-5 border-[0.5px]"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            borderColor: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            className="inline-block px-3 py-1 rounded-[11px] mb-2"
            style={{
              backgroundColor: "rgba(124, 92, 232, 0.2)",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              color: "#A890F0",
            }}
          >
            TODAY'S DRIFT
          </div>

          <h3 className="text-white font-bold mb-2" style={{ fontSize: "16px" }}>
            Try Counter 7 instead of Counter 2 today
          </h3>

          <p className="text-[#888899] mb-4" style={{ fontSize: "13px" }}>
            A Philosophy + Fine Arts student eats here — 91% creative collision potential.
          </p>

          {/* Drift Reward Badge */}
          <div
            className="mb-4 py-2 px-3 rounded-[10px] flex items-center gap-2"
            style={{
              backgroundColor: "rgba(13, 148, 136, 0.1)",
              border: "1px solid rgba(13, 148, 136, 0.2)",
            }}
          >
            <span style={{ fontSize: "14px" }}>🎁</span>
            <span className="text-[#0D9488]" style={{ fontSize: "11px", fontWeight: 500 }}>
              Earn 25 XP + 10% off at Brew Lab
            </span>
          </div>

          <div className="flex gap-2">
            <button
              className="h-9 px-6 rounded-[10px] bg-[#7C5CE8] text-white font-medium"
              style={{ fontSize: "13px" }}
            >
              Accept
            </button>
            <button
              className="h-9 px-6 rounded-[10px] border-[0.5px] border-[#333344] text-[#888899] font-medium"
              style={{ fontSize: "13px" }}
            >
              Skip
            </button>
            <button
              onClick={onShowDriftDetail}
              className="h-9 px-4 text-[#00CBA4] font-medium"
              style={{ fontSize: "13px" }}
            >
              Why This?
            </button>
          </div>
        </div>
      </div>

      {/* Collision Score */}
      <div className="mx-5 mb-4">
        <button
          onClick={() => onNavigate("connections")}
          className="w-full h-[64px] rounded-[16px] px-4 flex items-center gap-3 border-[0.5px] text-left"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            borderColor: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="flex items-center -space-x-3">
            <div className="w-9 h-9 rounded-full bg-[#7C5CE8] border-2 border-[#0A0A0F] flex items-center justify-center">
              <span className="text-white font-medium" style={{ fontSize: "12px" }}>
                PR
              </span>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#00CBA4] border-2 border-[#0A0A0F] flex items-center justify-center">
              <span className="text-white font-medium" style={{ fontSize: "12px" }}>
                DW
              </span>
            </div>
          </div>

          <div className="flex-1">
            <p className="text-white font-medium" style={{ fontSize: "13px" }}>
              91% match potential with Priya (ICT)
            </p>
            <p className="text-[#666677]" style={{ fontSize: "11px" }}>
              Complementary skills: Design + Engineering
            </p>
          </div>

          <div className="w-2 h-2 rounded-full bg-[#00CBA4] animate-pulse" />
        </button>
      </div>

      {/* Section Header */}
      <div className="mx-5 mb-3 flex items-center justify-between">
        <span className="text-white font-medium" style={{ fontSize: "14px" }}>
          Nearby discoveries
        </span>
        <span className="text-[#7C5CE8]" style={{ fontSize: "13px" }}>
          View all
        </span>
      </div>

      {/* Drift Destinations Row - Business Partner Layer */}
      <DriftDestinationsRow onCardClick={(venue) => console.log("Venue clicked:", venue)} />

      {/* Horizontal Scroll Cards */}
      <div className="overflow-x-auto px-5 pb-6">
        <div className="flex gap-3">
          {[
            {
              name: "Kala Ghoda Cafe",
              distance: "0.8 km away",
              tag: "Heritage + Food",
              color: "#00CBA4",
              bgColor: "rgba(240, 165, 0, 0.15)",
            },
            {
              name: "Ajanta Heritage Walk",
              distance: "2.3 km away",
              tag: "Culture",
              color: "#3B8ADD",
              bgColor: "rgba(59, 138, 221, 0.15)",
            },
          ].map((place, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[200px] rounded-[16px] overflow-hidden border-[0.5px]"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                borderColor: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="h-1 w-full" style={{ backgroundColor: place.color }} />
              <div
                className="h-[60px]"
                style={{
                  backgroundColor: place.bgColor,
                }}
              />
              <div className="p-3">
                <h4 className="text-white font-medium mb-1" style={{ fontSize: "14px" }}>
                  {place.name}
                </h4>
                <p className="text-[#666677] mb-2" style={{ fontSize: "11px" }}>
                  {place.distance}
                </p>
                <div
                  className="inline-block px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: `${place.color}20`,
                    color: place.color,
                    fontSize: "10px",
                    fontWeight: 500,
                  }}
                >
                  {place.tag}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Partner Banner - Above Bottom Nav */}
      <PartnerBanner onClick={() => onShowPartnerDashboard?.()} />

      {/* Bottom Nav Bar */}
      <BottomNav activeScreen="home" onNavigate={onNavigate} />
    </div>
  );
}
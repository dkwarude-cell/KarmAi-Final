import { Filter, ChevronRight } from "lucide-react";
import BottomNav from "./BottomNav";

interface ConnectionsScreenProps {
  onNavigate: (screen: string) => void;
}

export default function ConnectionsScreen({ onNavigate }: ConnectionsScreenProps) {
  const connections = [
    { name: "Aryan Shah", college: "VJTI", match: 78, initials: "AS", color: "#F0A500" },
    { name: "Meera Joshi", college: "Symbiosis", match: 65, initials: "MJ", color: "#00CBA4" },
    { name: "Ravi Kumar", college: "SP College", match: 71, initials: "RK", color: "#3B8ADD" },
  ];

  const countries = [
    { code: "IN", flag: "🇮🇳" },
    { code: "DE", flag: "🇩🇪" },
    { code: "JP", flag: "🇯🇵" },
    { code: "BR", flag: "🇧🇷" },
    { code: "US", flag: "🇺🇸" },
    { code: "KR", flag: "🇰🇷" },
  ];

  return (
    <div className="w-[390px] h-[844px] bg-[#0A0A0F] relative flex flex-col">
      <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-start justify-between">
        <div>
          <h1 className="text-white font-bold mb-1" style={{ fontSize: "22px" }}>
            Potential Collisions
          </h1>
          <p className="text-[#666677]" style={{ fontSize: "14px" }}>
            People who expand your world
          </p>
        </div>
        <button>
          <Filter size={20} className="text-[#666677]" />
        </button>
      </div>

      {/* Top Match Card */}
      <div className="mx-5 mb-4">
        <div
          className="rounded-[20px] p-5 border"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            borderColor: "rgba(124, 92, 232, 0.3)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Avatar and info */}
          <div className="flex items-start gap-3 mb-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center border-2"
              style={{
                backgroundColor: "rgba(124, 92, 232, 0.2)",
                borderColor: "#7C5CE8",
              }}
            >
              <span className="text-white font-bold" style={{ fontSize: "18px" }}>
                PR
              </span>
            </div>
            <div>
              <h3 className="text-white font-bold mb-0.5" style={{ fontSize: "16px" }}>
                Priya Raut
              </h3>
              <p className="text-[#888899]" style={{ fontSize: "12px" }}>
                ICT Mumbai
              </p>
            </div>
          </div>

          {/* Match Score */}
          <div className="text-center mb-3">
            <div className="text-[#A890F0] font-extrabold mb-1" style={{ fontSize: "40px" }}>
              91%
            </div>
            <p className="text-[#666677]" style={{ fontSize: "11px" }}>
              Creative Collision Potential
            </p>
          </div>

          {/* Skill Tags */}
          <div className="flex justify-center gap-2 mb-4">
            {[
              { label: "Design", color: "#7C5CE8" },
              { label: "Photography", color: "#00CBA4" },
              { label: "UX Research", color: "#F0A500" },
            ].map((tag) => (
              <div
                key={tag.label}
                className="px-3 py-1 rounded-xl"
                style={{
                  backgroundColor: `${tag.color}20`,
                  color: tag.color,
                  fontSize: "11px",
                  fontWeight: 500,
                }}
              >
                {tag.label}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              className="flex-1 h-10 rounded-[10px] bg-[#7C5CE8] text-white font-medium"
              style={{ fontSize: "13px" }}
            >
              Connect at Counter 7, 1PM
            </button>
            <button
              className="h-10 px-4 rounded-[10px] border-[0.5px] text-[#00CBA4] font-medium"
              style={{
                borderColor: "#00CBA4",
                fontSize: "13px",
              }}
            >
              Why This Match?
            </button>
          </div>
        </div>
      </div>

      {/* Section Label */}
      <div className="px-5 mb-2">
        <p className="text-[#888899] font-medium" style={{ fontSize: "13px" }}>
          More connections nearby
        </p>
      </div>

      {/* List Items */}
      <div className="px-5">
        <div
          className="rounded-xl overflow-hidden border-[0.5px]"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            borderColor: "rgba(255, 255, 255, 0.06)",
          }}
        >
          {connections.map((person, i) => (
            <div key={i}>
              <div className="px-4 py-4 flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center border-2"
                  style={{
                    backgroundColor: `${person.color}20`,
                    borderColor: person.color,
                  }}
                >
                  <span className="text-white font-medium" style={{ fontSize: "14px" }}>
                    {person.initials}
                  </span>
                </div>

                <div className="flex-1">
                  <p className="text-white font-medium mb-0.5" style={{ fontSize: "13px" }}>
                    {person.name}
                  </p>
                  <p className="text-[#666677]" style={{ fontSize: "11px" }}>
                    {person.college}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className="px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor:
                        person.match > 70
                          ? "rgba(0, 203, 164, 0.15)"
                          : "rgba(240, 165, 0, 0.15)",
                      color: person.match > 70 ? "#00CBA4" : "#F0A500",
                      fontSize: "11px",
                      fontWeight: 600,
                    }}
                  >
                    {person.match}%
                  </div>
                  <ChevronRight size={16} className="text-[#444455]" />
                </div>
              </div>

              {i < connections.length - 1 && (
                <div
                  className="h-[0.5px] mx-4"
                  style={{ backgroundColor: "#1A1A26" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Global Section */}
      <div className="mx-5 mt-4">
        <div
          className="rounded-[16px] p-4 border"
          style={{
            backgroundColor: "rgba(0, 203, 164, 0.05)",
            borderColor: "#00CBA4",
          }}
        >
          <h3 className="text-white font-medium mb-1" style={{ fontSize: "14px" }}>
            Global interest match
          </h3>
          <p className="text-[#888899] mb-3" style={{ fontSize: "12px" }}>
            Students worldwide share your Photography interest
          </p>

          {/* Country flags */}
          <div className="flex gap-2 mb-3">
            {countries.map((country) => (
              <div
                key={country.code}
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  fontSize: "14px",
                }}
              >
                {country.flag}
              </div>
            ))}
          </div>

          <p className="text-[#00CBA4]" style={{ fontSize: "11px" }}>
            47 students matched globally this week
          </p>
        </div>
      </div>
      </div>

      {/* Bottom Nav */}
      <BottomNav activeScreen="connections" onNavigate={onNavigate} />
    </div>
  );
}

import { Plus } from "lucide-react";
import BottomNav from "./BottomNav";

interface ExploreScreenProps {
  onNavigate: (screen: string) => void;
}

export default function ExploreScreen({ onNavigate }: ExploreScreenProps) {
  const tabs = ["For You", "City", "National", "Global"];

  const experiencesData = [
    {
      name: "Ajanta Caves, Maharashtra",
      uploader: "Riya from VJTI Mumbai",
      tags: ["History", "Architecture", "Photography"],
      interested: 23,
      color: "#F0A500",
      category: "Heritage",
    },
    {
      name: "Marine Drive Sunrise Walk",
      uploader: "Arjun from ICT",
      tags: ["Nature", "Photography"],
      interested: 15,
      color: "#00CBA4",
      category: "Nature",
    },
    {
      name: "Prithvi Theatre Weekend",
      uploader: "Meera from Symbiosis",
      tags: ["Culture", "Theatre"],
      interested: 18,
      color: "#7C5CE8",
      category: "Culture",
    },
  ];

  return (
    <div className="w-[390px] h-[844px] bg-[#0A0A0F] relative flex flex-col">
      <div className="flex-1 overflow-y-auto pb-6">
      {/* Header */}
      <div className="px-5 pt-6 pb-3">
        <h1 className="text-white font-bold" style={{ fontSize: "22px" }}>
          Explore
        </h1>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-3">
        <div
          className="flex gap-6 border-b-[0.5px] pb-0"
          style={{ borderColor: "#1A1A26" }}
        >
          {tabs.map((tab, i) => (
            <button
              key={tab}
              className="pb-3 relative"
              style={{
                color: i === 0 ? "#FFFFFF" : "#666677",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {tab}
              {i === 0 && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#7C5CE8]"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Card */}
      <div className="px-5 mb-3">
        <div
          className="rounded-[20px] overflow-hidden border-[0.5px]"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            borderColor: "rgba(255, 255, 255, 0.08)",
          }}
        >
          {/* Image area with overlay */}
          <div
            className="h-[140px] relative"
            style={{
              backgroundColor: "rgba(240, 165, 0, 0.15)",
            }}
          >
            {/* Category badge */}
            <div
              className="absolute top-3 left-3 px-3 py-1 rounded-[11px] border-[0.5px]"
              style={{
                backgroundColor: "rgba(240, 165, 0, 0.2)",
                borderColor: "#F0A500",
              }}
            >
              <span
                className="font-medium"
                style={{
                  fontSize: "10px",
                  color: "#F0A500",
                }}
              >
                Heritage
              </span>
            </div>

            {/* Place name at bottom */}
            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="text-white font-bold" style={{ fontSize: "18px" }}>
                Ajanta Caves, Maharashtra
              </h3>
            </div>
          </div>

          {/* Content area */}
          <div className="p-4">
            <p className="text-[#888899] mb-2" style={{ fontSize: "12px" }}>
              Uploaded by Riya from VJTI Mumbai
            </p>

            {/* Tags */}
            <div className="flex gap-2 mb-3">
              {["History", "Architecture", "Photography"].map((tag) => (
                <div
                  key={tag}
                  className="px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(240, 165, 0, 0.15)",
                    color: "#F0A500",
                    fontSize: "10px",
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>

            {/* Students interested */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["#7C5CE8", "#00CBA4", "#F0A500"].map((color, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-[#0A0A0F] flex items-center justify-center"
                      style={{ backgroundColor: color }}
                    >
                      <span className="text-white text-[8px] font-bold">
                        {String.fromCharCode(65 + i)}
                      </span>
                    </div>
                  ))}
                </div>
                <span className="text-[#888899]" style={{ fontSize: "11px" }}>
                  23 students interested
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              className="w-full h-10 rounded-[10px] bg-[#7C5CE8] text-white font-medium"
              style={{ fontSize: "13px" }}
            >
              Add to my drift
            </button>
          </div>
        </div>
      </div>

      {/* Regular Cards */}
      {experiencesData.slice(1).map((experience, i) => (
        <div key={i} className="px-5 mb-3">
          <div
            className="rounded-[16px] overflow-hidden border-[0.5px] flex"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              borderColor: "rgba(255, 255, 255, 0.08)",
            }}
          >
            {/* Left image */}
            <div
              className="w-[100px] h-[120px] flex-shrink-0"
              style={{
                backgroundColor:
                  experience.color === "#00CBA4"
                    ? "rgba(0, 203, 164, 0.15)"
                    : "rgba(124, 92, 232, 0.15)",
              }}
            />

            {/* Right content */}
            <div className="flex-1 p-3">
              <h4 className="text-white font-medium mb-1" style={{ fontSize: "14px" }}>
                {experience.name}
              </h4>
              <p className="text-[#888899] mb-2" style={{ fontSize: "11px" }}>
                {experience.uploader}
              </p>

              {/* Tags */}
              <div className="flex gap-1.5 mb-2">
                {experience.tags.map((tag) => (
                  <div
                    key={tag}
                    className="px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${experience.color}20`,
                      color: experience.color,
                      fontSize: "9px",
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>

              {/* Match */}
              <div
                className="inline-block px-2 py-1 rounded-full"
                style={{
                  backgroundColor: "rgba(0, 203, 164, 0.15)",
                  color: "#00CBA4",
                  fontSize: "10px",
                  fontWeight: 600,
                }}
              >
                {85 - i * 10}% match
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>

      {/* Upload FAB */}
      <button
        className="absolute w-14 h-14 rounded-full bg-[#7C5CE8] flex items-center justify-center shadow-lg"
        style={{
          bottom: "100px",
          right: "20px",
        }}
      >
        <Plus size={20} className="text-white" />
      </button>

      {/* Bottom Nav */}
      <BottomNav activeScreen="explore" onNavigate={onNavigate} />
    </div>
  );
}

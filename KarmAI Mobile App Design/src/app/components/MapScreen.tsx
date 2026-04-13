import { Search, Plus, Minus, Locate } from "lucide-react";
import { motion } from "motion/react";
import BottomNav from "./BottomNav";

interface MapScreenProps {
  onNavigate: (screen: string) => void;
}

const markers = [
  { type: "college", name: "ICT", x: 45, y: 35, abbr: "ICT" },
  { type: "college", name: "VJTI", x: 60, y: 50, abbr: "VJTI" },
  { type: "college", name: "SP", x: 30, y: 60, abbr: "SP" },
  { type: "cafe", name: "Counter 7", x: 50, y: 45 },
  { type: "cafe", name: "Cafe Mondegar", x: 40, y: 55 },
  { type: "cafe", name: "Kala Ghoda Cafe", x: 55, y: 40 },
  { type: "heritage", name: "Gateway", x: 65, y: 65 },
  { type: "heritage", name: "Museum", x: 35, y: 45 },
  { type: "adventure", name: "Trek Point", x: 70, y: 35 },
  { type: "culture", name: "Art Gallery", x: 48, y: 58 },
  { type: "culture", name: "Theatre", x: 38, y: 68 },
  { type: "club", name: "Cowork", x: 62, y: 42 },
];

const categories = [
  { name: "All", active: true },
  { name: "Colleges", active: false },
  { name: "Cafes", active: false },
  { name: "Heritage", active: false },
  { name: "Adventure", active: false },
  { name: "Culture", active: false },
];

export default function MapScreen({ onNavigate }: MapScreenProps) {
  return (
    <div className="w-[390px] h-[844px] bg-[#0D1520] relative overflow-hidden">
      {/* Dark map background with streets */}
      <div className="absolute inset-0">
        {/* Simulated map grid */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-[1px]"
            style={{
              top: `${i * 12.5}%`,
              backgroundColor: i % 2 === 0 ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.06)",
            }}
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-[1px]"
            style={{
              left: `${i * 12.5}%`,
              backgroundColor: i % 2 === 0 ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.06)",
            }}
          />
        ))}

        {/* Water bodies */}
        <div
          className="absolute w-32 h-24 rounded-lg"
          style={{ top: "20%", left: "10%", backgroundColor: "#0A1218" }}
        />
        <div
          className="absolute w-40 h-32 rounded-lg"
          style={{ top: "60%", right: "5%", backgroundColor: "#0A1218" }}
        />
      </div>

      {/* Map markers */}
      {markers.map((marker, i) => {
        let markerElement;

        if (marker.type === "college") {
          markerElement = (
            <div className="relative">
              <motion.div
                className="absolute w-[52px] h-[52px] rounded-full"
                style={{
                  backgroundColor: "rgba(124, 92, 232, 0.3)",
                  left: "-6px",
                  top: "-6px",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
              <div
                className="relative w-[40px] h-[40px] rounded-full flex items-center justify-center border-2 border-white/20"
                style={{ backgroundColor: "rgba(124, 92, 232, 0.9)" }}
              >
                <span className="text-white font-bold" style={{ fontSize: "9px" }}>
                  {marker.abbr}
                </span>
              </div>
            </div>
          );
        } else if (marker.type === "cafe") {
          markerElement = (
            <div
              className="w-[32px] h-[32px] rounded-full flex items-center justify-center relative"
              style={{ backgroundColor: "#00CBA4" }}
            >
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
          );
        } else if (marker.type === "heritage") {
          markerElement = (
            <div
              className="w-[28px] h-[28px] rounded-full"
              style={{ backgroundColor: "#F0A500" }}
            />
          );
        } else if (marker.type === "adventure") {
          markerElement = (
            <div
              className="w-[28px] h-[28px] rounded-full"
              style={{ backgroundColor: "#E85D30" }}
            />
          );
        } else if (marker.type === "culture") {
          markerElement = (
            <div
              className="w-[28px] h-[28px] rounded-full"
              style={{ backgroundColor: "#3B8ADD" }}
            />
          );
        } else if (marker.type === "club") {
          markerElement = (
            <div
              className="w-[24px] h-[24px] rounded-full"
              style={{ backgroundColor: "#E84393" }}
            />
          );
        }

        return (
          <motion.div
            key={i}
            className="absolute cursor-pointer"
            style={{
              left: `${marker.x}%`,
              top: `${marker.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            {markerElement}
          </motion.div>
        );
      })}

      {/* Top search bar */}
      <div className="absolute top-14 left-5 right-5 z-20">
        <div
          className="h-11 rounded-[22px] border-[0.5px] px-4 flex items-center gap-2"
          style={{
            backgroundColor: "rgba(10, 10, 15, 0.9)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
          }}
        >
          <Search size={16} className="text-[#555566]" />
          <input
            type="text"
            placeholder="Search places, interests..."
            className="flex-1 bg-transparent text-[#555566] outline-none"
            style={{ fontSize: "13px" }}
          />
        </div>

        {/* Filter pills */}
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="px-3 h-7 rounded-[14px] flex items-center whitespace-nowrap"
              style={{
                backgroundColor: cat.active ? "#7C5CE8" : "rgba(10, 10, 15, 0.8)",
                color: cat.active ? "#FFFFFF" : "#888899",
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              {cat.name}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div
        className="absolute bottom-[240px] left-4 rounded-xl p-3 border-[0.5px]"
        style={{
          backgroundColor: "rgba(10, 10, 15, 0.9)",
          borderColor: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
          {[
            { color: "#7C5CE8", label: "College" },
            { color: "#00CBA4", label: "Cafe" },
            { color: "#F0A500", label: "Heritage" },
            { color: "#3B8ADD", label: "Culture" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[#888899]" style={{ fontSize: "10px" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Zoom controls */}
      <div className="absolute right-4 top-[180px] flex flex-col gap-2">
        {[Plus, Minus, Locate].map((Icon, i) => (
          <button
            key={i}
            className="w-10 h-10 rounded-full border-[0.5px] flex items-center justify-center"
            style={{
              backgroundColor: "rgba(10, 10, 15, 0.8)",
              borderColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <Icon size={16} className="text-white" />
          </button>
        ))}
      </div>

      {/* Bottom sheet */}
      <motion.div
        className="absolute left-0 right-0 rounded-t-[24px] border-t-[0.5px] pb-8"
        style={{
          backgroundColor: "#12121A",
          borderColor: "rgba(255, 255, 255, 0.08)",
          bottom: "82px",
        }}
        initial={{ y: 200 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-4">
          <div className="w-10 h-1 rounded-full bg-[#333344]" />
        </div>

        <div className="px-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-[#00CBA4] mt-1.5" />
            <div className="flex-1">
              <h3 className="text-white font-bold mb-1" style={{ fontSize: "16px" }}>
                Counter 7
              </h3>
              <div
                className="inline-block px-2 py-1 rounded-full mb-2"
                style={{
                  backgroundColor: "rgba(0, 203, 164, 0.15)",
                  fontSize: "10px",
                  fontWeight: 500,
                  color: "#00CBA4",
                }}
              >
                Cafe
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4 text-[#888899]" style={{ fontSize: "12px" }}>
            <span>0.3 km away</span>
            <span>•</span>
            <span className="text-[#7C5CE8]">91% bubble-match</span>
          </div>

          <button
            className="w-full h-12 rounded-xl bg-[#7C5CE8] text-white font-medium"
            style={{ fontSize: "14px" }}
          >
            Add to my drift?
          </button>
        </div>
      </motion.div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 left-0 right-0">
        <BottomNav activeScreen="map" onNavigate={onNavigate} />
      </div>
    </div>
  );
}

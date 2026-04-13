import { motion } from "motion/react";
import { Coffee, Music, Theater } from "lucide-react";

interface DriftDestinationsRowProps {
  onCardClick?: (venue: any) => void;
}

export default function DriftDestinationsRow({ onCardClick }: DriftDestinationsRowProps) {
  const venues = [
    {
      id: 1,
      name: "Brew Lab Cafe",
      icon: Coffee,
      subtext: "18 students visited this week",
      tag: "☕ 12% off for drifters",
      borderColor: "#0D9488", // teal
      bgColor: "#111118",
    },
    {
      id: 2,
      name: "Black Box Theatre",
      icon: Theater,
      subtext: "Open Mic tonight — 3 seats left",
      tag: "🎭 Free entry via drift",
      borderColor: "#7C3AED", // purple
      bgColor: "#111118",
    },
    {
      id: 3,
      name: "The Jazz Club",
      icon: Music,
      subtext: "Live session 8PM",
      tag: "🎵 Priority seating for drifters",
      borderColor: "#D97706", // gold
      bgColor: "#111118",
    },
  ];

  return (
    <div className="mx-5 mb-4">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-white font-medium" style={{ fontSize: "14px" }}>
          Drift Destinations Near You
        </span>
        <div
          className="px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: "rgba(217, 119, 6, 0.15)",
            border: "1px solid rgba(217, 119, 6, 0.3)",
          }}
        >
          <span
            className="text-[#D97706] font-semibold"
            style={{ fontSize: "9px", letterSpacing: "0.05em" }}
          >
            SPONSORED
          </span>
        </div>
      </div>

      {/* Horizontal Scroll Cards */}
      <div className="overflow-x-auto -mx-5 px-5">
        <div className="flex gap-3">
          {venues.map((venue, i) => {
            const Icon = venue.icon;
            return (
              <motion.div
                key={venue.id}
                onClick={() => onCardClick?.(venue)}
                className="flex-shrink-0 rounded-[16px] overflow-hidden cursor-pointer"
                style={{
                  width: "160px",
                  height: "200px",
                  backgroundColor: venue.bgColor,
                  borderTop: `3px solid ${venue.borderColor}`,
                  boxShadow: `0 0 20px ${venue.borderColor}30, 0 4px 12px rgba(0,0,0,0.3)`,
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Partner Badge */}
                <div className="absolute top-2 right-2 z-10">
                  <div
                    className="px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${venue.borderColor}25`,
                      border: `1px solid ${venue.borderColor}`,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "8px",
                        fontWeight: 700,
                        color: venue.borderColor,
                        letterSpacing: "0.05em",
                      }}
                    >
                      PARTNER
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 h-full flex flex-col">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                    style={{
                      backgroundColor: `${venue.borderColor}20`,
                    }}
                  >
                    <Icon size={24} style={{ color: venue.borderColor }} />
                  </div>

                  {/* Name */}
                  <h4
                    className="text-white font-bold mb-2"
                    style={{
                      fontSize: "13px",
                      lineHeight: "1.3",
                    }}
                  >
                    {venue.name}
                  </h4>

                  {/* Subtext */}
                  <p
                    className="text-[#888899] mb-auto"
                    style={{
                      fontSize: "10px",
                      lineHeight: "1.4",
                    }}
                  >
                    {venue.subtext}
                  </p>

                  {/* Tag */}
                  <div
                    className="mt-2 px-2 py-1.5 rounded-lg"
                    style={{
                      backgroundColor: `${venue.borderColor}15`,
                      border: `1px solid ${venue.borderColor}40`,
                    }}
                  >
                    <p
                      style={{
                        fontSize: "9px",
                        fontWeight: 600,
                        color: venue.borderColor,
                        lineHeight: "1.2",
                      }}
                    >
                      {venue.tag}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

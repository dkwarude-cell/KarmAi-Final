import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface Marker {
  id: string;
  type: "college" | "cafe" | "heritage" | "adventure" | "culture" | "club" | "user";
  name: string;
  x: number;
  y: number;
  abbr?: string;
  matchScore?: number;
}

interface MapCoreProps {
  zoomLevel: "personal" | "campus" | "city" | "global";
  onMarkerClick?: (marker: Marker) => void;
  filterType?: string;
  userBubbleRadius?: number;
  showHeatZones?: boolean;
}

export default function MapCore({
  zoomLevel,
  onMarkerClick,
  filterType = "all",
  userBubbleRadius = 23,
  showHeatZones = false,
}: MapCoreProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 0.1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Generate markers based on zoom level
  const getMarkers = (): Marker[] => {
    const baseMarkers: Marker[] = [
      { id: "user", type: "user", name: "You", x: 50, y: 50 },
    ];

    if (zoomLevel === "personal") {
      return [
        ...baseMarkers,
        { id: "c7", type: "cafe", name: "Counter 7", x: 52, y: 48, matchScore: 91 },
        { id: "c2", type: "cafe", name: "Counter 2", x: 48, y: 52 },
        { id: "dept1", type: "college", name: "Phil Dept", x: 54, y: 46, abbr: "PH" },
      ];
    }

    if (zoomLevel === "campus") {
      return [
        ...baseMarkers,
        { id: "ict", type: "college", name: "ICT Mumbai", x: 45, y: 35, abbr: "ICT" },
        { id: "vjti", type: "college", name: "VJTI", x: 60, y: 50, abbr: "VJTI" },
        { id: "sp", type: "college", name: "SP College", x: 30, y: 60, abbr: "SP" },
        { id: "c7", type: "cafe", name: "Counter 7", x: 52, y: 48 },
        { id: "c2", type: "cafe", name: "Counter 2", x: 48, y: 52 },
      ];
    }

    if (zoomLevel === "city") {
      const markers = [...baseMarkers];
      // Colleges
      [
        { x: 45, y: 35, name: "ICT", abbr: "ICT" },
        { x: 60, y: 50, name: "VJTI", abbr: "VJTI" },
        { x: 30, y: 60, name: "SP", abbr: "SP" },
        { x: 70, y: 30, name: "SIES", abbr: "SIES" },
        { x: 25, y: 45, name: "KJ", abbr: "KJ" },
      ].forEach((c, i) =>
        markers.push({
          id: `college-${i}`,
          type: "college",
          name: c.name,
          x: c.x,
          y: c.y,
          abbr: c.abbr,
        })
      );

      // Cafes
      [
        { x: 50, y: 45, name: "Counter 7" },
        { x: 40, y: 55, name: "Cafe M" },
        { x: 55, y: 40, name: "Kala Ghoda" },
        { x: 65, y: 48, name: "Mondegar" },
        { x: 35, y: 42, name: "Leopold" },
        { x: 58, y: 62, name: "Cafe Zoe" },
      ].forEach((c, i) =>
        markers.push({ id: `cafe-${i}`, type: "cafe", name: c.name, x: c.x, y: c.y })
      );

      // Heritage
      [
        { x: 65, y: 65, name: "Gateway" },
        { x: 35, y: 45, name: "Museum" },
        { x: 72, y: 38, name: "Elephanta" },
        { x: 28, y: 68, name: "Fort" },
      ].forEach((h, i) =>
        markers.push({ id: `heritage-${i}`, type: "heritage", name: h.name, x: h.x, y: h.y })
      );

      // Adventure
      [
        { x: 70, y: 35, name: "Trek Point" },
        { x: 22, y: 52, name: "Rock Climb" },
        { x: 78, y: 58, name: "Kayak" },
      ].forEach((a, i) =>
        markers.push({ id: `adventure-${i}`, type: "adventure", name: a.name, x: a.x, y: a.y })
      );

      // Culture
      [
        { x: 48, y: 58, name: "Art Gallery" },
        { x: 38, y: 68, name: "Theatre" },
        { x: 68, y: 42, name: "NCPA" },
        { x: 32, y: 38, name: "Prithvi" },
      ].forEach((c, i) =>
        markers.push({ id: `culture-${i}`, type: "culture", name: c.name, x: c.x, y: c.y })
      );

      // Clubs
      [
        { x: 62, y: 42, name: "Cowork" },
        { x: 42, y: 48, name: "Social" },
        { x: 55, y: 55, name: "Hub" },
      ].forEach((c, i) =>
        markers.push({ id: `club-${i}`, type: "club", name: c.name, x: c.x, y: c.y })
      );

      return markers;
    }

    if (zoomLevel === "global") {
      return [
        { id: "user", type: "user", name: "You", x: 50, y: 50 },
        { id: "india", type: "college", name: "India", x: 62, y: 48, abbr: "IN" },
        { id: "us", type: "college", name: "USA", x: 25, y: 35, abbr: "US" },
        { id: "uk", type: "college", name: "UK", x: 48, y: 28, abbr: "UK" },
        { id: "japan", type: "college", name: "Japan", x: 78, y: 40, abbr: "JP" },
        { id: "brazil", type: "college", name: "Brazil", x: 32, y: 68, abbr: "BR" },
        { id: "germany", type: "college", name: "Germany", x: 52, y: 30, abbr: "DE" },
      ];
    }

    return baseMarkers;
  };

  const markers = getMarkers();

  // Filter markers based on filterType
  const filteredMarkers = markers.filter((m) => {
    if (filterType === "all") return true;
    if (filterType === "colleges") return m.type === "college" || m.type === "user";
    if (filterType === "cafes") return m.type === "cafe" || m.type === "user";
    if (filterType === "heritage") return m.type === "heritage" || m.type === "user";
    if (filterType === "adventure") return m.type === "adventure" || m.type === "user";
    if (filterType === "culture") return m.type === "culture" || m.type === "user";
    return true;
  });

  const getMarkerColor = (type: string) => {
    switch (type) {
      case "user":
        return "#7C5CE8";
      case "college":
        return "#7C5CE8";
      case "cafe":
        return "#00CBA4";
      case "heritage":
        return "#F0A500";
      case "adventure":
        return "#E85D30";
      case "culture":
        return "#3B8ADD";
      case "club":
        return "#E84393";
      default:
        return "#7C5CE8";
    }
  };

  const getMarkerSize = (type: string, zoom: string) => {
    if (type === "user") {
      if (zoom === "personal") return 16;
      if (zoom === "campus") return 14;
      if (zoom === "city") return 12;
      return 10;
    }
    if (type === "college") {
      if (zoom === "global") return 32;
      if (zoom === "city") return 40;
      if (zoom === "campus") return 44;
      return 36;
    }
    if (zoom === "personal") return 28;
    if (zoom === "campus") return 32;
    if (zoom === "city") return 28;
    return 24;
  };

  return (
    <div className="absolute inset-0 bg-[#0D1520]">
      {/* Grid lines - street simulation */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-[1px]"
            style={{
              top: `${i * 8.33}%`,
              backgroundColor:
                i % 2 === 0 ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.06)",
            }}
          />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-[1px]"
            style={{
              left: `${i * 8.33}%`,
              backgroundColor:
                i % 2 === 0 ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.06)",
            }}
          />
        ))}
      </div>

      {/* Water bodies */}
      {zoomLevel !== "global" && (
        <>
          <motion.div
            className="absolute rounded-lg"
            style={{
              backgroundColor: "#0A1218",
              top: "20%",
              left: "10%",
              width: zoomLevel === "personal" ? "60px" : "120px",
              height: zoomLevel === "personal" ? "40px" : "80px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute rounded-lg"
            style={{
              backgroundColor: "#0A1218",
              top: "60%",
              right: "5%",
              width: zoomLevel === "personal" ? "80px" : "140px",
              height: zoomLevel === "personal" ? "60px" : "110px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </>
      )}

      {/* Continents for global view */}
      {zoomLevel === "global" && (
        <div className="absolute inset-0">
          {/* Simplified continent shapes */}
          <div
            className="absolute rounded-xl"
            style={{
              backgroundColor: "#1A2435",
              top: "25%",
              left: "15%",
              width: "25%",
              height: "35%",
            }}
          />
          <div
            className="absolute rounded-xl"
            style={{
              backgroundColor: "#1A2435",
              top: "35%",
              left: "55%",
              width: "30%",
              height: "40%",
            }}
          />
          <div
            className="absolute rounded-xl"
            style={{
              backgroundColor: "#1A2435",
              top: "55%",
              left: "25%",
              width: "20%",
              height: "25%",
            }}
          />
        </div>
      )}

      {/* User Bubble Radius - Personal exploration zone */}
      {zoomLevel === "personal" && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            left: "50%",
            top: "50%",
            width: `${userBubbleRadius * 8}px`,
            height: `${userBubbleRadius * 8}px`,
            transform: "translate(-50%, -50%)",
            border: "1px dashed rgba(124, 92, 232, 0.3)",
            backgroundColor: "rgba(124, 92, 232, 0.05)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
      )}

      {/* Heat zones - show activity levels */}
      {showHeatZones && zoomLevel !== "personal" && (
        <>
          {/* Cafe heat zone - active during lunch */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              left: "50%",
              top: "45%",
              width: "120px",
              height: "120px",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(0, 203, 164, 0.15) 0%, transparent 70%)",
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />

          {/* Campus heat zone */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              left: "45%",
              top: "35%",
              width: "100px",
              height: "100px",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(124, 92, 232, 0.15) 0%, transparent 70%)",
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 1,
            }}
          />
        </>
      )}

      {/* Markers */}
      <AnimatePresence>
        {filteredMarkers.map((marker, i) => {
          const size = getMarkerSize(marker.type, zoomLevel);
          const color = getMarkerColor(marker.type);
          const isUser = marker.type === "user";

          return (
            <motion.div
              key={marker.id}
              className="absolute cursor-pointer"
              style={{
                left: `${marker.x}%`,
                top: `${marker.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: i * 0.02, duration: 0.3 }}
              onClick={() => onMarkerClick?.(marker)}
            >
              {/* Pulse animation for user */}
              {isUser && (
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: size * 3,
                    height: size * 3,
                    backgroundColor: color,
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              )}

              {/* Glow ring for high match markers */}
              {marker.matchScore && marker.matchScore > 80 && (
                <motion.div
                  className="absolute rounded-full border-2"
                  style={{
                    width: size * 1.8,
                    height: size * 1.8,
                    borderColor: color,
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.2, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              )}

              {/* Main marker */}
              {marker.type === "college" || marker.type === "user" ? (
                <div
                  className="rounded-full flex items-center justify-center border-2 border-white/20 relative z-10"
                  style={{
                    width: size,
                    height: size,
                    backgroundColor: isUser ? color : `${color}E6`,
                  }}
                >
                  {marker.abbr && (
                    <span
                      className="text-white font-bold"
                      style={{ fontSize: Math.max(8, size / 4) }}
                    >
                      {marker.abbr}
                    </span>
                  )}
                </div>
              ) : (
                <div
                  className="rounded-full flex items-center justify-center relative z-10"
                  style={{
                    width: size,
                    height: size,
                    backgroundColor: color,
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              )}

              {/* Label for user marker */}
              {isUser && zoomLevel === "personal" && (
                <div
                  className="absolute top-full mt-2 whitespace-nowrap text-center"
                  style={{ left: "50%", transform: "translateX(-50%)" }}
                >
                  <div
                    className="px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: "rgba(124, 92, 232, 0.2)",
                      border: "1px solid rgba(124, 92, 232, 0.4)",
                    }}
                  >
                    <span className="text-[#A890F0] font-medium" style={{ fontSize: "11px" }}>
                      Your Bubble — {userBubbleRadius}% explored
                    </span>
                  </div>
                  <div className="mt-1">
                    <span
                      className="text-[#666677]"
                      style={{ fontSize: "9px", letterSpacing: "0.05em" }}
                    >
                      PERSONALIZED RADIUS
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Connection lines for campus view */}
      {zoomLevel === "campus" && (
        <svg className="absolute inset-0 pointer-events-none">
          {markers.slice(1, 4).map((marker, i) => {
            const userMarker = markers[0];
            return (
              <motion.line
                key={i}
                x1={`${userMarker.x}%`}
                y1={`${userMarker.y}%`}
                x2={`${marker.x}%`}
                y2={`${marker.y}%`}
                stroke="rgba(124, 92, 232, 0.2)"
                strokeWidth="1"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
              />
            );
          })}
        </svg>
      )}

      {/* Global connection lines */}
      {zoomLevel === "global" && (
        <svg className="absolute inset-0 pointer-events-none">
          {markers.slice(1).map((marker, i) => {
            const userMarker = markers[0];
            return (
              <motion.path
                key={i}
                d={`M ${userMarker.x} ${userMarker.y} Q ${(userMarker.x + marker.x) / 2} ${
                  Math.min(userMarker.y, marker.y) - 10
                } ${marker.x} ${marker.y}`}
                stroke="rgba(0, 203, 164, 0.3)"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: i * 0.3 }}
              />
            );
          })}
        </svg>
      )}
    </div>
  );
}

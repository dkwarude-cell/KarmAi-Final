import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HorizontalZoomSliderProps {
  zoomLevel: "personal" | "campus" | "city" | "global";
  onZoomChange: (level: "personal" | "campus" | "city" | "global") => void;
}

export default function HorizontalZoomSlider({ zoomLevel, onZoomChange }: HorizontalZoomSliderProps) {
  const zoomLevels = ["personal", "campus", "city", "global"] as const;
  const currentIndex = zoomLevels.indexOf(zoomLevel);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onZoomChange(zoomLevels[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < zoomLevels.length - 1) {
      onZoomChange(zoomLevels[currentIndex + 1]);
    }
  };

  const getPosition = () => {
    return (currentIndex / (zoomLevels.length - 1)) * 100;
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handlePrevious}
        disabled={currentIndex === 0}
        className="w-6 h-6 rounded-full flex items-center justify-center transition-all"
        style={{
          backgroundColor: currentIndex === 0 ? "rgba(255, 255, 255, 0.05)" : "rgba(124, 92, 232, 0.2)",
          opacity: currentIndex === 0 ? 0.3 : 1,
        }}
      >
        <ChevronLeft size={14} className={currentIndex === 0 ? "text-[#444455]" : "text-[#7C5CE8]"} />
      </button>

      <div className="flex-1 h-2 rounded-full bg-[#1A1A2E] relative">
        {/* Track markers */}
        <div className="absolute inset-0 flex justify-between px-1">
          {zoomLevels.map((level, i) => (
            <button
              key={level}
              onClick={() => onZoomChange(level)}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                backgroundColor: i <= currentIndex ? "#7C5CE8" : "#2A2A3E",
                transform: i === currentIndex ? "scale(1.5)" : "scale(1)",
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #7C5CE8, #A890F0)",
            width: `${getPosition()}%`,
          }}
          initial={false}
          animate={{ width: `${getPosition()}%` }}
          transition={{ duration: 0.3 }}
        />

        {/* Thumb */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2"
          style={{
            backgroundColor: "#7C5CE8",
            borderColor: "#FFFFFF",
            left: `${getPosition()}%`,
            transform: "translate(-50%, -50%)",
            boxShadow: "0 2px 8px rgba(124, 92, 232, 0.4)",
          }}
          initial={false}
          animate={{ left: `${getPosition()}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <button
        onClick={handleNext}
        disabled={currentIndex === zoomLevels.length - 1}
        className="w-6 h-6 rounded-full flex items-center justify-center transition-all"
        style={{
          backgroundColor: currentIndex === zoomLevels.length - 1 ? "rgba(255, 255, 255, 0.05)" : "rgba(124, 92, 232, 0.2)",
          opacity: currentIndex === zoomLevels.length - 1 ? 0.3 : 1,
        }}
      >
        <ChevronRight size={14} className={currentIndex === zoomLevels.length - 1 ? "text-[#444455]" : "text-[#7C5CE8]"} />
      </button>
    </div>
  );
}

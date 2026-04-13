import { useState } from "react";

const interests = [
  "Photography",
  "Music",
  "Tech",
  "Travel",
  "Art",
  "Sports",
  "Writing",
  "Design",
  "History",
  "Science",
  "Cooking",
  "Film",
  "Dance",
  "Gaming",
  "Nature",
  "Fitness",
  "Reading",
  "Theatre",
];

interface InterestSelectionScreenProps {
  onContinue: () => void;
}

export default function InterestSelectionScreen({ onContinue }: InterestSelectionScreenProps) {
  const [selected, setSelected] = useState<string[]>([
    "Photography",
    "Music",
    "Tech",
    "Design",
    "Film",
    "Reading",
  ]);

  const toggleInterest = (interest: string) => {
    setSelected((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="w-[390px] h-[844px] bg-white overflow-y-auto">
      {/* Status bar */}
      <div className="h-[44px]" />

      {/* Progress bar */}
      <div className="w-full h-[4px] bg-gray-200">
        <div className="h-full w-[40%] bg-[#7C5CE8]" />
      </div>

      {/* Heading area */}
      <div className="px-6 mt-8 mb-6">
        <h1 className="text-[#1A1A1A] font-bold mb-2" style={{ fontSize: "24px" }}>
          Tell us about yourself
        </h1>
        <p className="text-[#6B7280]" style={{ fontSize: "14px" }}>
          We'll find what you're missing
        </p>
      </div>

      {/* Instruction text */}
      <div className="px-6 mb-4">
        <p className="text-[#6B7280] italic" style={{ fontSize: "13px" }}>
          Select your current interests (we'll push you beyond them)
        </p>
      </div>

      {/* Selected count badge */}
      <div className="px-6 mb-4 flex justify-end">
        <div
          className="px-4 py-1.5 rounded-full border"
          style={{
            backgroundColor: "rgba(0, 203, 164, 0.15)",
            borderColor: "#00CBA4",
          }}
        >
          <span className="text-[#00CBA4] font-medium" style={{ fontSize: "12px" }}>
            {selected.length} selected
          </span>
        </div>
      </div>

      {/* Interest chip grid */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-3 gap-2">
          {interests.map((interest) => {
            const isSelected = selected.includes(interest);
            return (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className="h-[40px] rounded-[20px] transition-all duration-200"
                style={{
                  backgroundColor: isSelected
                    ? "rgba(124, 92, 232, 0.1)"
                    : "rgba(255, 255, 255, 0.6)",
                  border: isSelected
                    ? "1px solid #7C5CE8"
                    : "1px solid rgba(200, 200, 200, 0.5)",
                  color: isSelected ? "#7C5CE8" : "#6B7280",
                  fontSize: "13px",
                  fontWeight: isSelected ? 600 : 500,
                }}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA button */}
      <div className="px-6 pb-10">
        <button
          onClick={onContinue}
          className="w-full h-[56px] rounded-[16px] bg-[#7C5CE8] text-white font-semibold"
          style={{ fontSize: "16px" }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

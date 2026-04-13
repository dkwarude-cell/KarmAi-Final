import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, TrendingUp } from "lucide-react";
import { useState } from "react";

interface TasteProfileScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TasteProfileScreen({ isOpen, onClose }: TasteProfileScreenProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Philosophy",
    "Indie Music",
    "Street Food",
    "Heritage Sites",
  ]);

  const categories = [
    { name: "Philosophy", color: "#7C5CE8", emoji: "📚" },
    { name: "Indie Music", color: "#A890F0", emoji: "🎵" },
    { name: "Street Food", color: "#F0A500", emoji: "🍜" },
    { name: "Heritage Sites", color: "#3B8ADD", emoji: "🏛️" },
    { name: "Art Galleries", color: "#E85D30", emoji: "🎨" },
    { name: "Tech Events", color: "#00CBA4", emoji: "💻" },
    { name: "Yoga & Wellness", color: "#9B59B6", emoji: "🧘" },
    { name: "Photography", color: "#1ABC9C", emoji: "📸" },
    { name: "Theatre", color: "#E74C3C", emoji: "🎭" },
    { name: "Startups", color: "#F39C12", emoji: "🚀" },
    { name: "Poetry", color: "#8E44AD", emoji: "✍️" },
    { name: "Adventure Sports", color: "#E67E22", emoji: "🏔️" },
  ];

  const toggleCategory = (name: string) => {
    if (selectedCategories.includes(name)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== name));
    } else {
      setSelectedCategories([...selectedCategories, name]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute inset-0 z-50 bg-[#0A0A0F]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
        <div className="h-full overflow-y-auto">
          <div className="px-5 pt-14 pb-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={20} className="text-[#7C5CE8]" />
                  <h1 className="text-white font-bold" style={{ fontSize: "24px" }}>
                    Your Taste Graph
                  </h1>
                </div>
                <p className="text-[#888899]" style={{ fontSize: "13px" }}>
                  What makes you curious? Select your interests.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* AI Insight Badge */}
            <motion.div
              className="rounded-xl p-3 mb-6 border-l-[3px]"
              style={{
                backgroundColor: "rgba(124, 92, 232, 0.1)",
                borderLeftColor: "#7C5CE8",
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start gap-2">
                <TrendingUp size={16} className="text-[#7C5CE8] mt-0.5" />
                <div className="flex-1">
                  <p className="text-white font-semibold mb-1" style={{ fontSize: "12px" }}>
                    Your taste is evolving
                  </p>
                  <p className="text-[#888899]" style={{ fontSize: "11px" }}>
                    Based on {selectedCategories.length} interests, we'll suggest experiences that expand your world
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Categories Grid */}
            <div className="mb-6">
              <h2 className="text-white font-bold mb-3" style={{ fontSize: "15px" }}>
                Select your interests
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category, i) => {
                  const isSelected = selectedCategories.includes(category.name);
                  return (
                    <motion.button
                      key={category.name}
                      onClick={() => toggleCategory(category.name)}
                      className="rounded-2xl p-4 border transition-all duration-200 text-left relative overflow-hidden"
                      style={{
                        backgroundColor: isSelected
                          ? `${category.color}15`
                          : "rgba(255, 255, 255, 0.03)",
                        borderColor: isSelected ? category.color : "rgba(255, 255, 255, 0.08)",
                        borderWidth: isSelected ? "2px" : "1px",
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {/* Glow effect for selected */}
                      {isSelected && (
                        <div
                          className="absolute -top-8 -right-8 w-20 h-20 rounded-full blur-2xl"
                          style={{ background: `${category.color}40` }}
                        />
                      )}

                      <div className="relative z-10">
                        <div className="text-2xl mb-2">{category.emoji}</div>
                        <h3
                          className="font-semibold mb-1"
                          style={{
                            fontSize: "13px",
                            color: isSelected ? category.color : "#FFFFFF",
                          }}
                        >
                          {category.name}
                        </h3>

                        {/* Checkmark for selected */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: category.color }}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <span className="text-white text-xs">✓</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Diversity Score */}
            <motion.div
              className="rounded-2xl p-5 border"
              style={{
                background: "linear-gradient(135deg, rgba(0, 203, 164, 0.15), rgba(0, 203, 164, 0.05))",
                borderColor: "rgba(0, 203, 164, 0.3)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[#888899] mb-1" style={{ fontSize: "11px" }}>
                    TASTE DIVERSITY SCORE
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[#00CBA4] font-bold" style={{ fontSize: "32px" }}>
                      {Math.min(selectedCategories.length * 8, 96)}
                    </span>
                    <span className="text-[#888899]" style={{ fontSize: "14px" }}>
                      /100
                    </span>
                  </div>
                </div>
                <div className="text-4xl">
                  {selectedCategories.length < 4 ? "🌱" : selectedCategories.length < 7 ? "🌿" : "🌳"}
                </div>
              </div>

              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #00CBA4, #7C5CE8)" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(selectedCategories.length * 8, 96)}%` }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              </div>

              <p className="text-[#888899] mt-3" style={{ fontSize: "10px" }}>
                {selectedCategories.length < 4
                  ? "Add more interests to unlock better recommendations"
                  : selectedCategories.length < 7
                  ? "Great diversity! Your bubble is expanding nicely"
                  : "Excellent! You have a rich taste graph for AI matching"}
              </p>
            </motion.div>

            {/* Save Button */}
            <motion.button
              onClick={onClose}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#7C5CE8] to-[#A890F0] text-white font-semibold mt-6"
              style={{ fontSize: "15px" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileTap={{ scale: 0.98 }}
            >
              Save Taste Profile
            </motion.button>
          </div>
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}

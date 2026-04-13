import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  TrendingUp,
  Check,
  DollarSign,
  Clock,
  Heart,
  MapPin,
  Zap,
  ThumbsUp,
  ThumbsDown,
  Sparkles
} from "lucide-react";
import GlassCard, { GlassBadge } from "./GlassCard";

interface DiscoveryFeedbackLoopProps {
  isOpen: boolean;
  onClose: () => void;
  context: "completed_drift" | "dismissed_suggestion";
  placeName: string;
  placeCategory: string;
  onSubmit: (feedback: FeedbackData) => void;
}

export interface FeedbackData {
  boundaryPushLevel: number; // 0-100 slider value
  dismissalReasons?: string[]; // Only for dismissed suggestions
  wouldRecommend: boolean;
  serendipityScore: number; // How unexpected/delightful was this?
  timestamp: Date;
}

type DismissalReason = {
  id: string;
  label: string;
  icon: any;
  category: "practical" | "preference" | "timing";
};

const dismissalReasons: DismissalReason[] = [
  { id: "budget", label: "Budget", icon: DollarSign, category: "practical" },
  { id: "timing", label: "Bad Timing", icon: Clock, category: "timing" },
  { id: "vibe", label: "Not My Vibe", icon: Heart, category: "preference" },
  { id: "too-far", label: "Too Far", icon: MapPin, category: "practical" },
  { id: "crowded", label: "Too Crowded", icon: TrendingUp, category: "preference" },
  { id: "too-easy", label: "Too Easy", icon: ThumbsDown, category: "preference" },
];

export default function DiscoveryFeedbackLoop({
  isOpen,
  onClose,
  context,
  placeName,
  placeCategory,
  onSubmit,
}: DiscoveryFeedbackLoopProps) {
  const [boundaryPushLevel, setBoundaryPushLevel] = useState(50);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCompletedDrift = context === "completed_drift";

  const handleSubmit = () => {
    const feedback: FeedbackData = {
      boundaryPushLevel,
      dismissalReasons: isCompletedDrift ? undefined : selectedReasons,
      wouldRecommend: wouldRecommend ?? false,
      serendipityScore: calculateSerendipityScore(),
      timestamp: new Date(),
    };

    setSubmitted(true);

    // Satisfying animation sequence
    setTimeout(() => {
      onSubmit(feedback);

      // Close after animation
      setTimeout(() => {
        onClose();
        resetState();
      }, 1000);
    }, 600);
  };

  const calculateSerendipityScore = (): number => {
    // Higher boundary push + would recommend = higher serendipity
    const boundaryScore = boundaryPushLevel;
    const recommendBonus = wouldRecommend ? 30 : -10;
    return Math.min(100, Math.max(0, boundaryScore + recommendBonus));
  };

  const resetState = () => {
    setBoundaryPushLevel(50);
    setSelectedReasons([]);
    setWouldRecommend(null);
    setSubmitted(false);
  };

  const toggleReason = (reasonId: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reasonId)
        ? prev.filter((id) => id !== reasonId)
        : [...prev, reasonId]
    );
  };

  const getBoundaryLabel = (value: number): string => {
    if (value < 30) return "Too Easy";
    if (value < 50) return "Comfortable";
    if (value < 70) return "Perfect Stretch";
    if (value < 85) return "Challenging";
    return "Too Intense";
  };

  const getBoundaryColor = (value: number): string => {
    if (value < 30) return "#94A3B8"; // Gray
    if (value < 50) return "#0D9488"; // Teal
    if (value < 70) return "#7C5CE8"; // Purple (optimal)
    if (value < 85) return "#F59E0B"; // Orange
    return "#EF4444"; // Red
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 z-50 glass-overlay flex items-end justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="w-full max-w-lg mb-20"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          <GlassCard variant="strong" className="relative overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-white/40">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: isCompletedDrift
                        ? "linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)"
                        : "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
                    }}
                  >
                    {isCompletedDrift ? (
                      <ThumbsUp size={20} className="text-white" />
                    ) : (
                      <ThumbsDown size={20} className="text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                      {isCompletedDrift ? "How Was Your Drift?" : "Help Us Learn"}
                    </h3>
                    <p className="text-xs text-gray-600">
                      <strong>{placeName}</strong> • {placeCategory}
                    </p>
                  </div>
                </div>

                <motion.button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={16} className="text-gray-600" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-6">
              {/* Question 1: Boundary Push Level (Always shown) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  {isCompletedDrift
                    ? "Did this push your boundaries?"
                    : "Why didn't this feel right?"}
                </label>

                <div className="space-y-3">
                  {/* Slider */}
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={boundaryPushLevel}
                      onChange={(e) => setBoundaryPushLevel(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right,
                          #94A3B8 0%,
                          #0D9488 25%,
                          #7C5CE8 50%,
                          #F59E0B 75%,
                          #EF4444 100%)`,
                      }}
                    />

                    {/* Slider Thumb Indicator */}
                    <motion.div
                      className="absolute -top-12 left-0 flex flex-col items-center"
                      style={{ left: `calc(${boundaryPushLevel}% - 24px)` }}
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div
                        className="px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg"
                        style={{ backgroundColor: getBoundaryColor(boundaryPushLevel) }}
                      >
                        {getBoundaryLabel(boundaryPushLevel)}
                      </div>
                      <div
                        className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
                        style={{ borderTopColor: getBoundaryColor(boundaryPushLevel) }}
                      />
                    </motion.div>
                  </div>

                  {/* Labels */}
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Too Easy</span>
                    <span className="font-bold text-purple-600">Perfect</span>
                    <span>Too Intense</span>
                  </div>
                </div>
              </motion.div>

              {/* Question 2: Dismissal Reasons (Only for dismissed suggestions) */}
              {!isCompletedDrift && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    What made you pass on this?
                  </label>

                  <div className="grid grid-cols-3 gap-2">
                    {dismissalReasons.map((reason) => {
                      const Icon = reason.icon;
                      const isSelected = selectedReasons.includes(reason.id);

                      return (
                        <motion.button
                          key={reason.id}
                          onClick={() => toggleReason(reason.id)}
                          className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                            isSelected
                              ? "border-purple-500 bg-purple-50"
                              : "border-gray-200 bg-white/40 hover:border-purple-300"
                          }`}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              isSelected ? "bg-purple-500" : "bg-gray-200"
                            }`}
                          >
                            <Icon size={18} className={isSelected ? "text-white" : "text-gray-600"} />
                          </div>
                          <span
                            className={`text-xs font-semibold ${
                              isSelected ? "text-purple-900" : "text-gray-700"
                            }`}
                          >
                            {reason.label}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Question 3: Would Recommend? (Only for completed drifts) */}
              {isCompletedDrift && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Would you recommend this to other students?
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      onClick={() => setWouldRecommend(true)}
                      className={`flex items-center justify-center gap-2 h-14 rounded-xl border-2 transition-all ${
                        wouldRecommend === true
                          ? "border-teal-500 bg-teal-50"
                          : "border-gray-200 bg-white/40 hover:border-teal-300"
                      }`}
                      whileTap={{ scale: 0.97 }}
                    >
                      <ThumbsUp
                        size={20}
                        className={wouldRecommend === true ? "text-teal-600" : "text-gray-500"}
                      />
                      <span
                        className={`font-semibold ${
                          wouldRecommend === true ? "text-teal-900" : "text-gray-700"
                        }`}
                      >
                        Yes, Recommend
                      </span>
                    </motion.button>

                    <motion.button
                      onClick={() => setWouldRecommend(false)}
                      className={`flex items-center justify-center gap-2 h-14 rounded-xl border-2 transition-all ${
                        wouldRecommend === false
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 bg-white/40 hover:border-orange-300"
                      }`}
                      whileTap={{ scale: 0.97 }}
                    >
                      <ThumbsDown
                        size={20}
                        className={wouldRecommend === false ? "text-orange-600" : "text-gray-500"}
                      />
                      <span
                        className={`font-semibold ${
                          wouldRecommend === false ? "text-orange-900" : "text-gray-700"
                        }`}
                      >
                        Not Really
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Serendipity Score Preview */}
              {wouldRecommend !== null && isCompletedDrift && (
                <motion.div
                  className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                      <Sparkles size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-purple-900">
                        Serendipity Score: {calculateSerendipityScore()}%
                      </p>
                      <p className="text-xs text-purple-700">
                        This helps us find perfect "just-right" challenges for you
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-white/40 bg-white/30">
              <motion.button
                onClick={handleSubmit}
                disabled={
                  (isCompletedDrift && wouldRecommend === null) ||
                  (!isCompletedDrift && selectedReasons.length === 0) ||
                  submitted
                }
                className={`w-full h-12 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                  submitted
                    ? "bg-gradient-to-br from-teal-500 to-teal-600 text-white"
                    : "bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                }`}
                whileHover={!submitted ? { scale: 1.02 } : {}}
                whileTap={!submitted ? { scale: 0.98 } : {}}
              >
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="submitted"
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: 360 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      >
                        <Check size={20} strokeWidth={3} />
                      </motion.div>
                      <span>Thanks for the feedback!</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="submit"
                      className="flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Zap size={18} />
                      <span>Submit Feedback</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <p className="text-xs text-gray-600 text-center mt-3">
                Your feedback trains our AI to find your perfect exploration zone
              </p>
            </div>

            {/* Success Burst Animation */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  className="absolute inset-0 pointer-events-none flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-purple-400"
                      initial={{ scale: 0, x: 0, y: 0 }}
                      animate={{
                        scale: [0, 1, 0],
                        x: Math.cos((i * Math.PI * 2) / 8) * 100,
                        y: Math.sin((i * Math.PI * 2) / 8) * 100,
                        opacity: [1, 1, 0],
                      }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

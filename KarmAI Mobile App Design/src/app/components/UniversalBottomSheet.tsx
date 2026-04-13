import { motion, AnimatePresence } from "motion/react";
import { ReactNode, useState } from "react";
import { Info, Star, MessageSquare } from "lucide-react";

interface UniversalBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  height?: "small" | "medium" | "large" | "full";
  showReviews?: boolean;
  reviewsContent?: ReactNode; // Reviews tab content
  placeData?: {
    name: string;
    averageRating: number;
    totalReviews: number;
  };
}

type TabType = "details" | "reviews";

export default function UniversalBottomSheet({
  isOpen,
  onClose,
  children,
  height = "medium",
  showReviews = false,
  reviewsContent,
  placeData,
}: UniversalBottomSheetProps) {
  const [activeTab, setActiveTab] = useState<TabType>("details");
  const heightMap = {
    small: "30%",
    medium: "50%",
    large: "70%",
    full: "90%",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div>
          {/* Glass Overlay Backdrop */}
          <motion.div
            className="absolute inset-0 z-40 glass-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Premium Glass Bottom Sheet */}
          <motion.div
            className="absolute left-0 right-0 z-50 rounded-t-[32px]"
            style={{
              bottom: 0,
              height: heightMap[height],
              maxHeight: "90%",
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(32px) saturate(180%)",
              WebkitBackdropFilter: "blur(32px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.9)",
              borderBottom: "none",
              boxShadow: `
                0 -12px 48px rgba(0, 0, 0, 0.08),
                inset 0 1px 0 0 rgba(255, 255, 255, 0.6)
              `,
            }}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glossy Top Highlight */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[32px] opacity-60"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent)",
              }}
            />

            {/* Premium Drag Handle */}
            <div className="flex justify-center pt-4 pb-5">
              <motion.div
                className="w-12 h-1.5 rounded-full cursor-grab"
                style={{
                  background: "linear-gradient(90deg, rgba(124, 92, 232, 0.3), rgba(124, 92, 232, 0.5), rgba(124, 92, 232, 0.3))",
                  boxShadow: "0 1px 3px rgba(124, 92, 232, 0.2)",
                }}
                whileHover={{ scaleX: 1.1 }}
                whileTap={{ scaleY: 1.5 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              />
            </div>

            {/* Tab Navigation - Only show if reviews are enabled */}
            {showReviews && (
              <div className="px-6 mb-4">
                <div
                  className="relative flex gap-1 p-1 rounded-2xl"
                  style={{
                    background: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.6)",
                  }}
                >
                  {[
                    { id: "details" as TabType, label: "Details", icon: Info },
                    { id: "reviews" as TabType, label: "Reviews", icon: MessageSquare },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className="relative flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl"
                        style={{
                          color: isActive ? "#7C5CE8" : "#6B7280",
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeSheetTab"
                            className="absolute inset-0 rounded-xl"
                            style={{
                              background: "rgba(255, 255, 255, 0.9)",
                              boxShadow: "0 2px 8px rgba(124, 92, 232, 0.12)",
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 28,
                            }}
                          />
                        )}
                        <Icon size={14} className="relative z-10" strokeWidth={isActive ? 2.5 : 2} />
                        <span
                          className="relative z-10 font-semibold"
                          style={{ fontSize: "13px", fontWeight: isActive ? 600 : 500 }}
                        >
                          {tab.label}
                        </span>
                        {tab.id === "reviews" && placeData && (
                          <span
                            className="relative z-10 flex items-center gap-0.5"
                            style={{ fontSize: "11px" }}
                          >
                            <Star
                              size={10}
                              className={isActive ? "text-amber-500 fill-amber-500" : "text-gray-400"}
                            />
                            <span className={isActive ? "text-amber-600" : "text-gray-500"}>
                              {placeData.averageRating.toFixed(1)}
                            </span>
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="px-6 pb-8 overflow-y-auto" style={{ maxHeight: "calc(100% - 48px)" }}>
              <AnimatePresence mode="wait">
                {!showReviews || activeTab === "details" ? (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {children}
                  </motion.div>
                ) : (
                  <motion.div
                    key="reviews"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {reviewsContent}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
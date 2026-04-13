import { motion, AnimatePresence } from "motion/react";
import { Eye, Ear, Accessibility, Brain, Clock, Users, Type, Contrast, Zap } from "lucide-react";
import { useState } from "react";

interface AccessibilitySettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccessibilitySettings({ isOpen, onClose }: AccessibilitySettingsProps) {
  const [wheelchairMode, setWheelchairMode] = useState(true);
  const [visualAssist, setVisualAssist] = useState(false);
  const [hearingSupport, setHearingSupport] = useState(false);
  const [lowStimulation, setLowStimulation] = useState(false);
  const [extraTime, setExtraTime] = useState(false);
  const [introvertMode, setIntrovertMode] = useState(true);
  const [textSize, setTextSize] = useState("medium");
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const ToggleSwitch = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className="relative w-11 h-6 rounded-full transition-all"
      style={{
        backgroundColor: enabled ? "#0D9488" : "#2A2A3A",
      }}
    >
      <motion.div
        className="absolute w-5 h-5 rounded-full bg-white top-0.5"
        animate={{
          left: enabled ? "22px" : "2px",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div>
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 z-40"
            style={{
              backgroundColor: "rgba(10, 10, 15, 0.6)",
              backdropFilter: "blur(8px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            className="absolute left-0 right-0 z-50 rounded-t-[28px] border-t-[0.5px]"
            style={{
              bottom: 0,
              height: "75%",
              backgroundColor: "#12121A",
              borderColor: "rgba(255, 255, 255, 0.08)",
              maxHeight: "90%",
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-4">
              <div className="w-10 h-1 rounded-full bg-[#2A2A3A] cursor-grab" />
            </div>

            {/* Header */}
            <div className="px-6 pb-4">
              <h2 className="text-white font-bold mb-1" style={{ fontSize: "18px" }}>
                Accessibility & Comfort
              </h2>
              <p className="text-[#0D9488]" style={{ fontSize: "12px" }}>
                Karm AI adapts to you
              </p>
            </div>

            {/* Content */}
            <div className="px-6 pb-8 overflow-y-auto" style={{ maxHeight: "calc(100% - 140px)" }}>
              {/* SECTION 1: Mobility & Physical */}
              <div className="mb-6">
                <p
                  className="text-[#666677] font-semibold mb-3"
                  style={{ fontSize: "10px", letterSpacing: "0.05em" }}
                >
                  MOBILITY & PHYSICAL
                </p>

                <div className="space-y-3">
                  {/* Wheelchair Mode */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: wheelchairMode ? "rgba(13, 148, 136, 0.15)" : "#1A1A22",
                        }}
                      >
                        <Accessibility size={18} className={wheelchairMode ? "text-[#0D9488]" : "text-[#666677]"} />
                      </div>
                      <span className="text-white" style={{ fontSize: "13px" }}>
                        Wheelchair Accessible Routes Only
                      </span>
                    </div>
                    <ToggleSwitch enabled={wheelchairMode} onToggle={() => setWheelchairMode(!wheelchairMode)} />
                  </div>

                  {/* Visual Assistance */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: visualAssist ? "rgba(13, 148, 136, 0.15)" : "#1A1A22",
                        }}
                      >
                        <Eye size={18} className={visualAssist ? "text-[#0D9488]" : "text-[#666677]"} />
                      </div>
                      <div className="flex-1">
                        <p className="text-white" style={{ fontSize: "13px" }}>
                          Visual Assistance Mode
                        </p>
                        <p className="text-[#666677]" style={{ fontSize: "10px" }}>
                          Larger text, high contrast, screen reader hints
                        </p>
                      </div>
                    </div>
                    <ToggleSwitch enabled={visualAssist} onToggle={() => setVisualAssist(!visualAssist)} />
                  </div>

                  {/* Hearing Support */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: hearingSupport ? "rgba(13, 148, 136, 0.15)" : "#1A1A22",
                        }}
                      >
                        <Ear size={18} className={hearingSupport ? "text-[#0D9488]" : "text-[#666677]"} />
                      </div>
                      <div className="flex-1">
                        <p className="text-white" style={{ fontSize: "13px" }}>
                          Hearing Support
                        </p>
                        <p className="text-[#666677]" style={{ fontSize: "10px" }}>
                          Visual alerts, no audio-only info
                        </p>
                      </div>
                    </div>
                    <ToggleSwitch enabled={hearingSupport} onToggle={() => setHearingSupport(!hearingSupport)} />
                  </div>
                </div>
              </div>

              {/* SECTION 2: Cognitive & Sensory */}
              <div className="mb-6">
                <p
                  className="text-[#666677] font-semibold mb-3"
                  style={{ fontSize: "10px", letterSpacing: "0.05em" }}
                >
                  SENSORY PREFERENCES
                </p>

                <div className="space-y-3">
                  {/* Low Stimulation */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: lowStimulation ? "rgba(13, 148, 136, 0.15)" : "#1A1A22",
                        }}
                      >
                        <Brain size={18} className={lowStimulation ? "text-[#0D9488]" : "text-[#666677]"} />
                      </div>
                      <div className="flex-1">
                        <p className="text-white" style={{ fontSize: "13px" }}>
                          Low Stimulation Mode
                        </p>
                        <p className="text-[#666677]" style={{ fontSize: "10px" }}>
                          Quieter venues, smaller groups, calmer spaces
                        </p>
                      </div>
                    </div>
                    <ToggleSwitch enabled={lowStimulation} onToggle={() => setLowStimulation(!lowStimulation)} />
                  </div>

                  {/* Extra Decision Time */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: extraTime ? "rgba(13, 148, 136, 0.15)" : "#1A1A22",
                        }}
                      >
                        <Clock size={18} className={extraTime ? "text-[#0D9488]" : "text-[#666677]"} />
                      </div>
                      <div className="flex-1">
                        <p className="text-white" style={{ fontSize: "13px" }}>
                          Extra Decision Time
                        </p>
                        <p className="text-[#666677]" style={{ fontSize: "10px" }}>
                          Longer to accept/skip drifts, no expiry pressure
                        </p>
                      </div>
                    </div>
                    <ToggleSwitch enabled={extraTime} onToggle={() => setExtraTime(!extraTime)} />
                  </div>

                  {/* Introvert Mode */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: introvertMode ? "rgba(13, 148, 136, 0.15)" : "#1A1A22",
                        }}
                      >
                        <Users size={18} className={introvertMode ? "text-[#0D9488]" : "text-[#666677]"} />
                      </div>
                      <div className="flex-1">
                        <p className="text-white" style={{ fontSize: "13px" }}>
                          Introvert Mode
                        </p>
                        <p className="text-[#666677]" style={{ fontSize: "10px" }}>
                          Max 4 people, seated events, no cold-crowd venues
                        </p>
                      </div>
                    </div>
                    <ToggleSwitch enabled={introvertMode} onToggle={() => setIntrovertMode(!introvertMode)} />
                  </div>
                </div>
              </div>

              {/* SECTION 3: Display */}
              <div className="mb-6">
                <p
                  className="text-[#666677] font-semibold mb-3"
                  style={{ fontSize: "10px", letterSpacing: "0.05em" }}
                >
                  DISPLAY & READING
                </p>

                <div className="space-y-4">
                  {/* Text Size */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: "#1A1A22" }}
                      >
                        <Type size={18} className="text-[#666677]" />
                      </div>
                      <span className="text-white" style={{ fontSize: "13px" }}>
                        Text Size
                      </span>
                    </div>
                    <div className="flex gap-2 ml-12">
                      {["small", "medium", "large", "xl"].map((size) => (
                        <button
                          key={size}
                          onClick={() => setTextSize(size)}
                          className="px-3 py-1.5 rounded-lg capitalize"
                          style={{
                            backgroundColor: textSize === size ? "#7C3AED" : "#1A1A22",
                            color: textSize === size ? "#FFFFFF" : "#888899",
                            fontSize: "11px",
                            border: `1px solid ${textSize === size ? "#7C3AED" : "#2A2A3A"}`,
                          }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* High Contrast */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: highContrast ? "rgba(13, 148, 136, 0.15)" : "#1A1A22",
                        }}
                      >
                        <Contrast size={18} className={highContrast ? "text-[#0D9488]" : "text-[#666677]"} />
                      </div>
                      <span className="text-white" style={{ fontSize: "13px" }}>
                        High Contrast Mode
                      </span>
                    </div>
                    <ToggleSwitch enabled={highContrast} onToggle={() => setHighContrast(!highContrast)} />
                  </div>

                  {/* Reduce Motion */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: reduceMotion ? "rgba(13, 148, 136, 0.15)" : "#1A1A22",
                        }}
                      >
                        <Zap size={18} className={reduceMotion ? "text-[#0D9488]" : "text-[#666677]"} />
                      </div>
                      <div className="flex-1">
                        <p className="text-white" style={{ fontSize: "13px" }}>
                          Reduce Animations
                        </p>
                        <p className="text-[#666677]" style={{ fontSize: "10px" }}>
                          Fewer transitions, no pulsing effects
                        </p>
                      </div>
                    </div>
                    <ToggleSwitch enabled={reduceMotion} onToggle={() => setReduceMotion(!reduceMotion)} />
                  </div>
                </div>
              </div>

              {/* Active Filters Summary */}
              <div
                className="rounded-xl p-4 mb-4"
                style={{
                  backgroundColor: "rgba(13, 148, 136, 0.1)",
                  border: "1px solid rgba(13, 148, 136, 0.2)",
                }}
              >
                <p className="text-white font-semibold mb-2" style={{ fontSize: "12px" }}>
                  Currently filtering:
                </p>
                <p className="text-[#0D9488]" style={{ fontSize: "11px" }}>
                  {wheelchairMode && "Wheelchair routes · "}
                  {introvertMode && "Introvert mode · "}
                  {textSize.charAt(0).toUpperCase() + textSize.slice(1)} text
                </p>
                <p className="text-[#0D9488] mt-2" style={{ fontSize: "10px" }}>
                  These apply to ALL recommendations automatically
                </p>
              </div>

              {/* Save Button */}
              <button
                onClick={onClose}
                className="w-full h-12 rounded-xl text-white font-bold"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #9F7AEA)",
                  fontSize: "14px",
                }}
              >
                Save Preferences
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

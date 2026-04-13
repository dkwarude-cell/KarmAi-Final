import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { UserProfile } from "../types/profile";

interface ProfileSetupProps {
  isOpen: boolean;
  onClose: () => void;
  initialProfile: UserProfile;
  onSave: (profile: UserProfile) => void;
}

export default function ProfileSetup({ isOpen, onClose, initialProfile, onSave }: ProfileSetupProps) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>(initialProfile);

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onSave(profile);
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div>
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 z-50"
            style={{
              backgroundColor: "rgba(10, 10, 15, 0.95)",
              backdropFilter: "blur(20px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Setup Panel */}
          <motion.div
            className="absolute inset-0 z-50 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Progress Bar */}
            <div className="px-6 pt-14 pb-4">
              <div className="flex gap-1">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full"
                    style={{
                      backgroundColor: i < step ? "#7C5CE8" : "rgba(255, 255, 255, 0.1)",
                    }}
                  />
                ))}
              </div>
              <div className="mt-2 text-[#666677] text-right" style={{ fontSize: "11px" }}>
                Step {step} of {totalSteps}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6">
              <AnimatePresence>
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-white font-bold mb-2" style={{ fontSize: "24px" }}>
                      What do you want more of?
                    </h2>
                    <p className="text-[#888899] mb-6" style={{ fontSize: "13px" }}>
                      This helps us understand your current focus
                    </p>

                    <div className="space-y-3">
                      {[
                        { value: "meet-people", label: "Meet new people", emoji: "👥" },
                        { value: "explore-places", label: "Explore new places", emoji: "🗺️" },
                        { value: "build-skills", label: "Build new skills", emoji: "🎯" },
                        { value: "find-opportunities", label: "Find opportunities", emoji: "✨" },
                        { value: "break-routine", label: "Break my routine", emoji: "🔄" },
                      ].map((intent) => (
                        <button
                          key={intent.value}
                          onClick={() => setProfile({ ...profile, currentIntent: intent.value as any })}
                          className="w-full p-4 rounded-2xl border-[0.5px] text-left transition-all duration-200"
                          style={{
                            backgroundColor:
                              profile.currentIntent === intent.value
                                ? "rgba(124, 92, 232, 0.2)"
                                : "rgba(255, 255, 255, 0.03)",
                            borderColor:
                              profile.currentIntent === intent.value
                                ? "#7C5CE8"
                                : "rgba(255, 255, 255, 0.08)",
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <span style={{ fontSize: "24px" }}>{intent.emoji}</span>
                            <div>
                              <div
                                className="font-semibold mb-0.5"
                                style={{
                                  fontSize: "15px",
                                  color: profile.currentIntent === intent.value ? "#A890F0" : "#FFFFFF",
                                }}
                              >
                                {intent.label}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-white font-bold mb-2" style={{ fontSize: "24px" }}>
                      Your preferences
                    </h2>
                    <p className="text-[#888899] mb-6" style={{ fontSize: "13px" }}>
                      Help us personalize your experience
                    </p>

                    <div className="space-y-6">
                      {/* Active Hours */}
                      <div>
                        <label className="text-white font-medium mb-3 block" style={{ fontSize: "13px" }}>
                          When are you most active?
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { value: "morning", label: "Morning" },
                            { value: "afternoon", label: "Afternoon" },
                            { value: "evening", label: "Evening" },
                            { value: "night", label: "Night" },
                          ].map((time) => (
                            <button
                              key={time.value}
                              onClick={() => setProfile({ ...profile, activeHours: time.value as any })}
                              className="p-3 rounded-xl transition-all duration-200"
                              style={{
                                backgroundColor:
                                  profile.activeHours === time.value
                                    ? "rgba(124, 92, 232, 0.2)"
                                    : "#1A1A26",
                                color: profile.activeHours === time.value ? "#A890F0" : "#888899",
                                fontSize: "13px",
                                fontWeight: 500,
                              }}
                            >
                              {time.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Activity Preference */}
                      <div>
                        <label className="text-white font-medium mb-3 block" style={{ fontSize: "13px" }}>
                          Do you prefer solo or social activities?
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { value: "solo", label: "Solo" },
                            { value: "both", label: "Both" },
                            { value: "social", label: "Social" },
                          ].map((pref) => (
                            <button
                              key={pref.value}
                              onClick={() => setProfile({ ...profile, activityPreference: pref.value as any })}
                              className="p-3 rounded-xl transition-all duration-200"
                              style={{
                                backgroundColor:
                                  profile.activityPreference === pref.value
                                    ? "rgba(124, 92, 232, 0.2)"
                                    : "#1A1A26",
                                color: profile.activityPreference === pref.value ? "#A890F0" : "#888899",
                                fontSize: "13px",
                                fontWeight: 500,
                              }}
                            >
                              {pref.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Environment Preference */}
                      <div>
                        <label className="text-white font-medium mb-3 block" style={{ fontSize: "13px" }}>
                          Indoor or outdoor activities?
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { value: "indoor", label: "Indoor" },
                            { value: "both", label: "Both" },
                            { value: "outdoor", label: "Outdoor" },
                          ].map((env) => (
                            <button
                              key={env.value}
                              onClick={() => setProfile({ ...profile, environmentPreference: env.value as any })}
                              className="p-3 rounded-xl transition-all duration-200"
                              style={{
                                backgroundColor:
                                  profile.environmentPreference === env.value
                                    ? "rgba(124, 92, 232, 0.2)"
                                    : "#1A1A26",
                                color: profile.environmentPreference === env.value ? "#A890F0" : "#888899",
                                fontSize: "13px",
                                fontWeight: 500,
                              }}
                            >
                              {env.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-white font-bold mb-2" style={{ fontSize: "24px" }}>
                      Budget & distance
                    </h2>
                    <p className="text-[#888899] mb-6" style={{ fontSize: "13px" }}>
                      Set your comfort zones
                    </p>

                    <div className="space-y-6">
                      {/* Budget Level */}
                      <div>
                        <label className="text-white font-medium mb-3 block" style={{ fontSize: "13px" }}>
                          What's your typical budget?
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { value: "free", label: "Free", sublabel: "₹0" },
                            { value: "low", label: "Low", sublabel: "₹0-200" },
                            { value: "medium", label: "Medium", sublabel: "₹200-500" },
                            { value: "high", label: "High", sublabel: "₹500+" },
                          ].map((budget) => (
                            <button
                              key={budget.value}
                              onClick={() => setProfile({ ...profile, budgetLevel: budget.value as any })}
                              className="p-3 rounded-xl transition-all duration-200 text-left"
                              style={{
                                backgroundColor:
                                  profile.budgetLevel === budget.value
                                    ? "rgba(124, 92, 232, 0.2)"
                                    : "#1A1A26",
                              }}
                            >
                              <div
                                className="font-semibold mb-0.5"
                                style={{
                                  fontSize: "13px",
                                  color: profile.budgetLevel === budget.value ? "#A890F0" : "#FFFFFF",
                                }}
                              >
                                {budget.label}
                              </div>
                              <div className="text-[#666677]" style={{ fontSize: "11px" }}>
                                {budget.sublabel}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Distance Willingness */}
                      <div>
                        <label className="text-white font-medium mb-3 block" style={{ fontSize: "13px" }}>
                          How far are you willing to explore?
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { value: "1km", label: "1 km", sublabel: "Very local" },
                            { value: "5km", label: "5 km", sublabel: "Nearby" },
                            { value: "citywide", label: "Citywide", sublabel: "Anywhere" },
                            { value: "anywhere", label: "No limits", sublabel: "Explorer" },
                          ].map((distance) => (
                            <button
                              key={distance.value}
                              onClick={() => setProfile({ ...profile, distanceWillingness: distance.value as any })}
                              className="p-3 rounded-xl transition-all duration-200 text-left"
                              style={{
                                backgroundColor:
                                  profile.distanceWillingness === distance.value
                                    ? "rgba(124, 92, 232, 0.2)"
                                    : "#1A1A26",
                              }}
                            >
                              <div
                                className="font-semibold mb-0.5"
                                style={{
                                  fontSize: "13px",
                                  color: profile.distanceWillingness === distance.value ? "#A890F0" : "#FFFFFF",
                                }}
                              >
                                {distance.label}
                              </div>
                              <div className="text-[#666677]" style={{ fontSize: "11px" }}>
                                {distance.sublabel}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-white font-bold mb-2" style={{ fontSize: "24px" }}>
                      You're all set! 🎉
                    </h2>
                    <p className="text-[#888899] mb-6" style={{ fontSize: "13px" }}>
                      Your personalized KarmAI experience is ready
                    </p>

                    <div
                      className="rounded-2xl p-5 mb-6 border-[0.5px]"
                      style={{
                        backgroundColor: "rgba(124, 92, 232, 0.1)",
                        borderColor: "rgba(124, 92, 232, 0.3)",
                      }}
                    >
                      <div className="text-center mb-4">
                        <div className="text-white font-bold mb-2" style={{ fontSize: "18px" }}>
                          Your AI Profile
                        </div>
                        <div className="text-[#888899]" style={{ fontSize: "12px" }}>
                          Based on your answers, we've configured your experience
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-black/20">
                          <span className="text-[#888899]" style={{ fontSize: "12px" }}>
                            Current Focus
                          </span>
                          <span className="text-[#A890F0] font-medium" style={{ fontSize: "12px" }}>
                            {profile.currentIntent.split("-").join(" ")}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-black/20">
                          <span className="text-[#888899]" style={{ fontSize: "12px" }}>
                            Active Time
                          </span>
                          <span className="text-[#A890F0] font-medium" style={{ fontSize: "12px" }}>
                            {profile.activeHours}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-black/20">
                          <span className="text-[#888899]" style={{ fontSize: "12px" }}>
                            Budget
                          </span>
                          <span className="text-[#A890F0] font-medium" style={{ fontSize: "12px" }}>
                            {profile.budgetLevel}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-black/20">
                          <span className="text-[#888899]" style={{ fontSize: "12px" }}>
                            Distance
                          </span>
                          <span className="text-[#A890F0] font-medium" style={{ fontSize: "12px" }}>
                            {profile.distanceWillingness}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className="rounded-xl p-4 border-l-[3px]"
                      style={{
                        backgroundColor: "#1A1A26",
                        borderLeftColor: "#00CBA4",
                      }}
                    >
                      <div className="text-white font-medium mb-1" style={{ fontSize: "12px" }}>
                        💡 Smart suggestions enabled
                      </div>
                      <div className="text-[#888899]" style={{ fontSize: "11px" }}>
                        Your map will now show personalized recommendations based on your preferences
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="p-6 border-t border-white/5">
              <div className="flex gap-3">
                {step > 1 && (
                  <button
                    onClick={handleBack}
                    className="h-12 px-6 rounded-xl border-[0.5px] flex items-center gap-2"
                    style={{
                      borderColor: "rgba(255, 255, 255, 0.1)",
                      color: "#888899",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    <ChevronLeft size={18} />
                    Back
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="flex-1 h-12 rounded-xl bg-[#7C5CE8] text-white font-semibold flex items-center justify-center gap-2"
                  style={{ fontSize: "15px" }}
                >
                  {step === totalSteps ? "Start Exploring" : "Continue"}
                  {step < totalSteps && <ChevronRight size={18} />}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

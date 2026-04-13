import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Sparkles,
  Image as ImageIcon,
  Tag,
  Calendar,
  MapPin,
  Users,
  TrendingUp,
  Wand2,
  Send,
  Check
} from "lucide-react";
import GlassCard, { GlassBadge, GlassButton, GlassInput } from "./GlassCard";

interface ClubCreatorStudioProps {
  isOpen: boolean;
  onClose: () => void;
  clubName: string;
  onPublish: (campaign: GeneratedCampaign) => void;
}

interface GeneratedCampaign {
  title: string;
  description: string;
  suggestedTags: string[];
  posterPreviewUrl: string;
  bubbleBurstScore: number; // How much this pushes students out of comfort zone
}

interface AIGenerationStep {
  id: string;
  label: string;
  status: "idle" | "generating" | "complete";
  icon: any;
}

export default function ClubCreatorStudio({
  isOpen,
  onClose,
  clubName,
  onPublish,
}: ClubCreatorStudioProps) {
  const [eventIdea, setEventIdea] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCampaign, setGeneratedCampaign] = useState<GeneratedCampaign | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [published, setPublished] = useState(false);

  const generationSteps: AIGenerationStep[] = [
    { id: "title", label: "Crafting catchy title", status: "idle", icon: Sparkles },
    { id: "description", label: "Writing description", status: "idle", icon: TrendingUp },
    { id: "tags", label: "Finding bubble-burst tags", status: "idle", icon: Tag },
    { id: "poster", label: "Generating poster", status: "idle", icon: ImageIcon },
  ];

  const handleGenerate = async () => {
    if (!eventIdea.trim()) return;

    setIsGenerating(true);
    setGeneratedCampaign(null);

    // Simulate AI generation with realistic timing
    for (let i = 0; i < generationSteps.length; i++) {
      setCurrentStep(i);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    // Mock AI-generated content (replace with real API)
    const mockCampaign: GeneratedCampaign = {
      title: "Robotics Revolution: Build Your First AI Bot",
      description: `Join us for an immersive hands-on workshop where you'll construct your first autonomous robot! No prior experience needed - just bring curiosity. We'll cover servo motors, sensors, and basic Arduino programming. Perfect for beginners and enthusiasts alike.

🎯 What You'll Learn:
• Fundamentals of robotics engineering
• Arduino programming basics
• Sensor integration & motor control
• Real-world AI applications

🎁 Bonus: Top 3 projects win Arduino starter kits!`,
      suggestedTags: [
        "Tech", // Their bubble
        "Hands-On Learning", // Comfort zone stretch
        "Arts & Robotics Fusion", // Cross-disciplinary (ANTI-BUBBLE)
        "First-Timers Welcome", // Inclusivity tag
        "Career Workshop", // Unexpected benefit
      ],
      posterPreviewUrl: "/src/imports/image-1.png", // Mock poster
      bubbleBurstScore: 78, // 78% likely to attract students outside typical tech circles
    };

    setGeneratedCampaign(mockCampaign);
    setIsGenerating(false);
    setCurrentStep(0);
  };

  const handlePublish = () => {
    if (!generatedCampaign) return;

    setPublished(true);

    setTimeout(() => {
      onPublish(generatedCampaign);

      // Reset after animation
      setTimeout(() => {
        setEventIdea("");
        setGeneratedCampaign(null);
        setPublished(false);
        onClose();
      }, 1500);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="absolute inset-0 z-50 glass-overlay flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-5xl max-h-[90vh] overflow-hidden"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <GlassCard variant="strong" className="relative overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-white/40">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                    <Wand2 size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
                      Club Creator Studio
                    </h2>
                    <p className="text-sm text-gray-600">
                      AI-powered event creation for <span className="font-semibold text-purple-600">{clubName}</span>
                    </p>
                  </div>
                </div>

                <motion.button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <X size={20} className="text-gray-600" />
                </motion.button>
              </div>

              {/* Info Banner */}
              <motion.div
                className="mt-4 p-3 rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-purple-100/50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-start gap-2">
                  <Sparkles size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-purple-900 leading-relaxed">
                    <strong>Anti-Bubble AI:</strong> Our AI suggests tags that reach students <em>outside</em> your typical audience,
                    maximizing serendipitous discovery and cross-community engagement.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Content Area */}
            <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Input Section */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Describe Your Event Idea
                    </label>
                    <textarea
                      value={eventIdea}
                      onChange={(e) => setEventIdea(e.target.value)}
                      placeholder="E.g., 'Robotics workshop next Friday where beginners can build their first AI bot'"
                      className="glass-input w-full h-32 resize-none text-sm text-gray-900 placeholder:text-gray-500"
                      disabled={isGenerating}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Include: What, When, Who it's for, and any special details
                    </p>
                  </div>

                  <GlassButton
                    variant="primary"
                    onClick={handleGenerate}
                    disabled={!eventIdea.trim() || isGenerating}
                    className="w-full h-12"
                  >
                    {isGenerating ? (
                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Wand2 size={18} />
                        </motion.div>
                        <span>Generating Magic...</span>
                      </motion.div>
                    ) : (
                      <>
                        <Sparkles size={18} className="mr-2" />
                        Generate Campaign with AI
                      </>
                    )}
                  </GlassButton>

                  {/* Generation Progress */}
                  {isGenerating && (
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {generationSteps.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = index === currentStep;
                        const isComplete = index < currentStep;

                        return (
                          <motion.div
                            key={step.id}
                            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                              isActive
                                ? "bg-purple-100 border border-purple-300"
                                : isComplete
                                ? "bg-teal-50 border border-teal-200"
                                : "bg-white/30 border border-gray-200"
                            }`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <motion.div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                isActive
                                  ? "bg-purple-500"
                                  : isComplete
                                  ? "bg-teal-500"
                                  : "bg-gray-300"
                              }`}
                              animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              {isComplete ? (
                                <Check size={16} className="text-white" />
                              ) : (
                                <Icon size={16} className="text-white" />
                              )}
                            </motion.div>
                            <span
                              className={`text-sm font-medium ${
                                isActive
                                  ? "text-purple-900"
                                  : isComplete
                                  ? "text-teal-900"
                                  : "text-gray-500"
                              }`}
                            >
                              {step.label}
                            </span>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </div>

                {/* Right: Generated Content Preview */}
                <div className="space-y-5">
                  <AnimatePresence mode="wait">
                    {!generatedCampaign ? (
                      <motion.div
                        key="placeholder"
                        className="h-full flex items-center justify-center p-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="text-center">
                          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                            <Sparkles size={32} className="text-gray-400" />
                          </div>
                          <p className="text-sm text-gray-500">
                            Your AI-generated campaign will appear here
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="content"
                        className="space-y-4"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      >
                        {/* Title */}
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                            Generated Title
                          </label>
                          <GlassCard variant="subtle" className="p-4">
                            <h3 className="text-lg font-bold text-gray-900 leading-tight">
                              {generatedCampaign.title}
                            </h3>
                          </GlassCard>
                        </div>

                        {/* Description */}
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                            Description
                          </label>
                          <GlassCard variant="subtle" className="p-4">
                            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                              {generatedCampaign.description}
                            </p>
                          </GlassCard>
                        </div>

                        {/* Bubble-Burst Tags */}
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                            Discovery Tags
                          </label>
                          <GlassCard variant="subtle" className="p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center">
                                <TrendingUp size={16} className="text-white" />
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-bold text-orange-900">
                                  Bubble-Burst Score: {generatedCampaign.bubbleBurstScore}%
                                </p>
                                <p className="text-xs text-orange-700">
                                  Reaches students outside typical tech circles
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {generatedCampaign.suggestedTags.map((tag, index) => (
                                <motion.div
                                  key={tag}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <GlassBadge
                                    variant={
                                      tag.includes("Fusion") || tag.includes("First-Timers")
                                        ? "gold"
                                        : index % 2 === 0
                                        ? "purple"
                                        : "teal"
                                    }
                                  >
                                    {tag}
                                  </GlassBadge>
                                </motion.div>
                              ))}
                            </div>
                          </GlassCard>
                        </div>

                        {/* Poster Preview */}
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                            Poster Preview
                          </label>
                          <GlassCard variant="subtle" className="p-4">
                            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                              <div className="text-center p-6">
                                <ImageIcon size={48} className="text-purple-400 mx-auto mb-3" />
                                <p className="text-sm text-purple-700 font-medium">
                                  AI-Generated Poster
                                </p>
                                <p className="text-xs text-purple-600 mt-1">
                                  Full poster generation in Phase 2
                                </p>
                              </div>
                            </div>
                          </GlassCard>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-white/40 bg-white/30">
              <div className="flex items-center gap-4">
                <div className="flex-1 text-sm text-gray-600">
                  {generatedCampaign && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                      <span>Campaign ready to publish</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <GlassButton variant="secondary" onClick={onClose}>
                    Cancel
                  </GlassButton>

                  <motion.div
                    animate={published ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <GlassButton
                      variant="primary"
                      onClick={handlePublish}
                      disabled={!generatedCampaign || published}
                      className="min-w-[160px]"
                    >
                      {published ? (
                        <motion.div
                          className="flex items-center gap-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <Check size={18} />
                          <span>Published!</span>
                        </motion.div>
                      ) : (
                        <>
                          <Send size={18} className="mr-2" />
                          Publish Campaign
                        </>
                      )}
                    </GlassButton>
                  </motion.div>
                </div>
              </div>

              {generatedCampaign && !published && (
                <motion.div
                  className="mt-3 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start gap-2">
                    <Users size={14} className="text-purple-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-purple-900">
                      <strong>Karma Reward:</strong> Students who attend earn <strong>+100 karma</strong> for breaking their bubble.
                      Your club earns <strong>+500 karma</strong> when 10+ students check in.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Success Confetti Overlay */}
            <AnimatePresence>
              {published && (
                <motion.div
                  className="absolute inset-0 pointer-events-none flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <Check size={64} className="text-white" strokeWidth={3} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

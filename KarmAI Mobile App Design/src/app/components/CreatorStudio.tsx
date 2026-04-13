import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Image as ImageIcon, Type, Film, Download, Wand2, Copy, CheckCircle2 } from "lucide-react";

interface CreatorStudioProps {
  isOpen: boolean;
  onClose: () => void;
  clubName?: string;
}

type TabType = "poster" | "caption" | "story";

interface GeneratedContent {
  poster?: {
    imageUrl: string;
    style: string;
  };
  caption?: {
    text: string;
    suggestedHashtags: string[];
  };
  story?: {
    frames: { text: string; background: string }[];
  };
}

const springTransition = {
  type: "spring" as const,
  stiffness: 350,
  damping: 25,
  mass: 0.8,
};

export default function CreatorStudio({ isOpen, onClose, clubName = "Photography Club" }: CreatorStudioProps) {
  const [activeTab, setActiveTab] = useState<TabType>("poster");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [copied, setCopied] = useState(false);

  const tabs = [
    { id: "poster" as TabType, label: "Poster", icon: ImageIcon },
    { id: "caption" as TabType, label: "Caption", icon: Type },
    { id: "story" as TabType, label: "Story", icon: Film },
  ];

  const handleGenerate = async () => {
    if (!eventTitle.trim()) return;

    setIsGenerating(true);

    // Simulate AI generation with delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    const mockContent: GeneratedContent = {
      poster: {
        imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=1200&fit=crop",
        style: "Modern minimalist with geometric shapes",
      },
      caption: {
        text: `🎨 Join us for "${eventTitle}"! Experience the art of photography through a fresh lens. Perfect for beginners and enthusiasts alike. Limited spots available!`,
        suggestedHashtags: ["#PhotoWalk", "#CampusArt", "#CreativeCollision", "#KarmAI"],
      },
      story: {
        frames: [
          { text: "Swipe to discover →", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
          { text: `${eventTitle}`, background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
          { text: "Join us! 📸", background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
        ],
      },
    };

    setGeneratedContent(mockContent);
    setIsGenerating(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Main Modal */}
          <motion.div
            className="relative w-full max-w-[360px] rounded-[28px] overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(40px) saturate(180%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.8)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.6)",
              maxHeight: "680px",
            }}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={springTransition}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(124, 92, 232, 0.15), rgba(124, 92, 232, 0.08))",
                      border: "1px solid rgba(124, 92, 232, 0.2)",
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Wand2 size={18} className="text-[#7C5CE8]" />
                  </motion.div>
                  <div>
                    <h2 className="font-bold text-[#1A1A1A]" style={{ fontSize: "18px" }}>
                      Creator Studio
                    </h2>
                    <p className="text-[#6B7280]" style={{ fontSize: "11px" }}>
                      {clubName}
                    </p>
                  </div>
                </div>

                <motion.button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(0, 0, 0, 0.04)",
                  }}
                  whileHover={{ scale: 1.05, background: "rgba(0, 0, 0, 0.08)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={springTransition}
                >
                  <X size={16} className="text-[#6B7280]" />
                </motion.button>
              </div>

              {/* AI Badge */}
              <motion.div
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(124, 92, 232, 0.08)",
                  border: "1px solid rgba(124, 92, 232, 0.15)",
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Sparkles size={12} className="text-[#7C5CE8]" />
                <span className="text-[#7C5CE8] font-semibold" style={{ fontSize: "10px", letterSpacing: "0.5px" }}>
                  AI-POWERED CONTENT
                </span>
              </motion.div>
            </div>

            {/* Tab Navigation */}
            <div className="px-6 mb-4">
              <div
                className="relative flex gap-1 p-1 rounded-2xl"
                style={{
                  background: "rgba(255, 255, 255, 0.4)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.6)",
                }}
              >
                {tabs.map((tab, index) => {
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
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, ...springTransition }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTabBackground"
                          className="absolute inset-0 rounded-xl"
                          style={{
                            background: "rgba(255, 255, 255, 0.9)",
                            boxShadow: "0 2px 8px rgba(124, 92, 232, 0.12)",
                          }}
                          transition={springTransition}
                        />
                      )}
                      <Icon size={14} className="relative z-10" strokeWidth={isActive ? 2.5 : 2} />
                      <span
                        className="relative z-10 font-semibold"
                        style={{ fontSize: "12px", fontWeight: isActive ? 600 : 500 }}
                      >
                        {tab.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Input Section */}
            <div className="px-6 mb-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-[#1A1A1A] font-semibold mb-2" style={{ fontSize: "13px" }}>
                  Event Title
                </label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="e.g., Sunset Photo Walk"
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                  style={{
                    background: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(200, 200, 200, 0.5)",
                    fontSize: "14px",
                    color: "#1A1A1A",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(124, 92, 232, 0.5)";
                    e.target.style.boxShadow = "0 0 0 4px rgba(124, 92, 232, 0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(200, 200, 200, 0.5)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </motion.div>

              <motion.div
                className="mt-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <label className="block text-[#1A1A1A] font-semibold mb-2" style={{ fontSize: "13px" }}>
                  Description (Optional)
                </label>
                <textarea
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  placeholder="Brief event details..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl outline-none resize-none transition-all"
                  style={{
                    background: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(200, 200, 200, 0.5)",
                    fontSize: "13px",
                    color: "#1A1A1A",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(124, 92, 232, 0.5)";
                    e.target.style.boxShadow = "0 0 0 4px rgba(124, 92, 232, 0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(200, 200, 200, 0.5)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </motion.div>

              <motion.button
                onClick={handleGenerate}
                disabled={!eventTitle.trim() || isGenerating}
                className="w-full mt-4 h-12 rounded-xl font-semibold flex items-center justify-center gap-2"
                style={{
                  background: eventTitle.trim()
                    ? "linear-gradient(135deg, #7C5CE8 0%, #9F7AEA 100%)"
                    : "rgba(200, 200, 200, 0.3)",
                  color: eventTitle.trim() ? "#FFFFFF" : "#9CA3AF",
                  boxShadow: eventTitle.trim() ? "0 4px 16px rgba(124, 92, 232, 0.25)" : "none",
                  fontSize: "14px",
                }}
                whileHover={eventTitle.trim() ? { scale: 1.02 } : {}}
                whileTap={eventTitle.trim() ? { scale: 0.98 } : {}}
                transition={springTransition}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {isGenerating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles size={16} />
                    </motion.div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Wand2 size={16} />
                    <span>Generate {tabs.find(t => t.id === activeTab)?.label}</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Generated Content Preview */}
            <AnimatePresence mode="wait">
              {generatedContent && (
                <motion.div
                  className="px-6 pb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={springTransition}
                  key={activeTab}
                >
                  <div
                    className="rounded-2xl p-4 overflow-hidden"
                    style={{
                      background: "rgba(255, 255, 255, 0.5)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.7)",
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    {activeTab === "poster" && generatedContent.poster && (
                      <div>
                        <div
                          className="w-full h-48 rounded-xl mb-3 bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${generatedContent.poster.imageUrl})`,
                            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
                          }}
                        />
                        <p className="text-[#6B7280] mb-3" style={{ fontSize: "11px" }}>
                          Style: {generatedContent.poster.style}
                        </p>
                        <button
                          className="w-full h-11 rounded-xl font-semibold flex items-center justify-center gap-2"
                          style={{
                            background: "rgba(124, 92, 232, 0.1)",
                            color: "#7C5CE8",
                            fontSize: "13px",
                          }}
                        >
                          <Download size={14} />
                          Download Poster
                        </button>
                      </div>
                    )}

                    {activeTab === "caption" && generatedContent.caption && (
                      <div>
                        <div className="relative">
                          <p className="text-[#1A1A1A] mb-3 leading-relaxed" style={{ fontSize: "13px" }}>
                            {generatedContent.caption.text}
                          </p>
                          <motion.button
                            onClick={() => handleCopy(generatedContent.caption!.text)}
                            className="absolute top-0 right-0 w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{
                              background: copied ? "rgba(16, 185, 129, 0.1)" : "rgba(124, 92, 232, 0.1)",
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {copied ? (
                              <CheckCircle2 size={14} className="text-green-600" />
                            ) : (
                              <Copy size={14} className="text-[#7C5CE8]" />
                            )}
                          </motion.button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {generatedContent.caption.suggestedHashtags.map((tag, i) => (
                            <motion.span
                              key={tag}
                              className="px-3 py-1.5 rounded-full text-[#7C5CE8] font-medium"
                              style={{
                                background: "rgba(124, 92, 232, 0.08)",
                                fontSize: "11px",
                              }}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === "story" && generatedContent.story && (
                      <div>
                        <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
                          {generatedContent.story.frames.map((frame, i) => (
                            <motion.div
                              key={i}
                              className="flex-shrink-0 w-24 h-40 rounded-xl flex items-center justify-center p-3 text-white font-bold text-center"
                              style={{
                                background: frame.background,
                                fontSize: "11px",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                              }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              {frame.text}
                            </motion.div>
                          ))}
                        </div>
                        <button
                          className="w-full h-11 rounded-xl font-semibold flex items-center justify-center gap-2"
                          style={{
                            background: "rgba(124, 92, 232, 0.1)",
                            color: "#7C5CE8",
                            fontSize: "13px",
                          }}
                        >
                          <Download size={14} />
                          Export Story Frames
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

import { motion, AnimatePresence } from "motion/react";
import { 
  Coffee, 
  Calendar, 
  Users, 
  Wand2, 
  MapPin, 
  Star, 
  ChevronRight, 
  TrendingUp, 
  Sparkles, 
  HelpCircle, 
  MessageCircle, 
  DollarSign,
  Shield,
  Clock,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  BarChart3,
  Theater,
  Music,
  Target
} from "lucide-react";
import { useState } from "react";
import PredictivePlanningCard from "./PredictivePlanningCard";

interface WithinCampusViewProps {
  onPlaceClick: (place: any) => void;
  onShowPartnerDashboard: () => void;
}

export default function WithinCampusView({ onPlaceClick, onShowPartnerDashboard }: WithinCampusViewProps) {
  const [activeTab, setActiveTab] = useState<"canteen" | "events" | "groups" | "creator">("canteen");
  const [budget, setBudget] = useState(100);

  const canteenMenu = [
    {
      id: 1,
      name: "South Indian Breakfast",
      counter: "South Canteen",
      price: 50,
      image: "🥘",
      available: true,
      rating: 4.3,
      studentsEating: 8,
      reason: "BUDGET OPTIMIZER: Under your ₹100 daily limit. You've tried this only once (low repetition score). 23 students with similar tastes rated it 4.3+",
      match: 67,
      waitTime: "3 min",
      diversityScore: 89,
      budgetImpact: "Low",
      tags: ["New to you", "Budget-friendly", "Quick"]
    },
    {
      id: 2,
      name: "Protein Bowl",
      counter: "Health Counter",
      price: 95,
      image: "🥗",
      available: true,
      rating: 4.7,
      studentsEating: 6,
      reason: "DIVERSITY PUSH: You eat carb-heavy meals 78% of the time. This balances your nutrition profile. Fits your gym schedule (you checked-in at 6 AM today)",
      match: 71,
      waitTime: "5 min",
      diversityScore: 94,
      budgetImpact: "Medium",
      tags: ["Expands palette", "Health-focused", "Personalized"]
    },
    {
      id: 3,
      name: "Chole Bhature",
      counter: "Counter 3",
      price: 60,
      image: "🍛",
      available: true,
      rating: 4.5,
      studentsEating: 15,
      reason: "COMFORT ZONE ALERT: You ordered this 8 times this month. We're showing it for transparency, but trying something new earns +15 Karma points",
      match: 94,
      waitTime: "10 min",
      diversityScore: 23,
      budgetImpact: "Low",
      tags: ["Familiar", "Popular", "Comfort zone"]
    },
  ];

  const campusEvents = [
    {
      id: 1,
      title: "Improv Comedy Workshop",
      venue: "Drama Room",
      time: "5:30 PM Today",
      duration: "90 min",
      image: "🎭",
      attendees: 8,
      capacity: 15,
      free: true,
      reason: "BUBBLE BREAKER: You attend 0 creative events (100% tech focus). 4 engineers who tried this now attend monthly. Low crowd = high interaction potential",
      match: 34,
      category: "Creative",
      diversityScore: 96,
      socialMix: "Mix of majors",
      barrier: "Public speaking fear? Workshop is beginner-friendly with no performance pressure"
    },
    {
      id: 2,
      title: "ML Paper Reading Group",
      venue: "CS Lab 2",
      time: "6:00 PM Today",
      duration: "1 hr",
      image: "📚",
      attendees: 12,
      capacity: 20,
      free: true,
      reason: "INTEREST MATCH: Your searches show ML curiosity, but you haven't attended ML events. Your friend Priya is a regular. Discussion-based (no prior knowledge needed)",
      match: 78,
      category: "Learning",
      diversityScore: 52,
      socialMix: "CS-heavy",
      barrier: "None - beginner-friendly discussion format"
    },
    {
      id: 3,
      title: "Campus Photography Walk",
      venue: "Main Gate",
      time: "6:30 AM Tomorrow",
      duration: "2 hrs",
      image: "📸",
      attendees: 5,
      capacity: 12,
      free: true,
      reason: "TIME DIVERSITY: You've never tried a morning event. Golden hour lighting + small group + your stated photography interest. Overlaps with your usual gym time - trying new routines unlocks exploration badges",
      match: 61,
      category: "Creative",
      diversityScore: 88,
      socialMix: "All years/majors",
      barrier: "Early timing - but aligns with your existing wake-up schedule"
    },
  ];

  const studyGroups = [
    {
      id: 1,
      subject: "Startup Idea Validation",
      location: "Innovation Lab",
      time: "7:00 PM",
      members: 6,
      friends: [],
      level: "All Levels",
      reason: "CROSS-POLLINATION: Mix of business, design & CS students. You're tech-heavy - this adds business thinking to your profile. Group needs a tech person (you'd add value)",
      match: 58,
      diversityScore: 91,
      skillGap: "Business strategy, pitching",
      contribution: "Tech perspective (high value)"
    },
    {
      id: 2,
      subject: "Competitive Programming",
      location: "Library Room 201",
      time: "6:30 PM",
      members: 10,
      friends: ["Rahul", "Amit"],
      level: "Intermediate",
      reason: "FRIEND MATCH: 2 of your friends attend. But - you're already in 2 coding groups. Diminishing returns on similar activities. Consider this after trying a new domain",
      match: 82,
      diversityScore: 31,
      skillGap: "None (redundant with your profile)",
      contribution: "Medium (you already excel here)"
    },
  ];

  const creatorTools = [
    {
      icon: "🎨",
      title: "Smart Poster Designer",
      subtitle: "Brand-consistent posters in 30 sec",
      description: "Upload your club logo → AI generates on-brand event posters with your colors, fonts, and style guide",
      color: "#EC4899",
      used: "234 clubs using this",
    },
    {
      icon: "✍️",
      title: "Caption Assistant",
      subtitle: "Engaging social copy",
      description: "Describe your event → Get 5 caption variants (formal, casual, humorous, urgency-driven, inclusive)",
      color: "#F59E0B",
      used: "1.2k posts created",
    },
    {
      icon: "🎬",
      title: "Event Video Clipper",
      subtitle: "Highlights from long videos",
      description: "Upload raw footage → AI extracts key moments, adds subtitles, and creates shareable reels",
      color: "#8B5CF6",
      used: "89 events covered",
    },
    {
      icon: "📊",
      title: "Engagement Analyzer",
      subtitle: "Optimize your reach",
      description: "Track which posts work → See best posting times, content types, and audience preferences for your club",
      color: "#10B981",
      used: "156 clubs analyzing",
    },
    {
      icon: "🎯",
      title: "Audience Finder",
      subtitle: "Target the right students",
      description: "Define your event → AI suggests which students to notify based on interests, past behavior, and diversity goals",
      color: "#3B82F6",
      used: "2.1k events promoted",
    },
    {
      icon: "🖼️",
      title: "Brand Kit Generator",
      subtitle: "Consistent club identity",
      description: "Answer 5 questions → Get logo variations, color palette, font pairings, and usage guidelines",
      color: "#EF4444",
      used: "67 clubs branded",
    },
  ];

  return (
    <div className="absolute top-[140px] left-0 right-0 bottom-[80px] z-20 flex flex-col bg-[#F8F9FA]">
      {/* Tab Navigation */}
      <div className="px-5 pt-4 pb-2 bg-white border-b border-[#E5E7EB]">
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {[
            { id: "canteen", label: "🍱 Smart Menu", icon: Coffee },
            { id: "events", label: "🎉 Events", icon: Calendar },
            { id: "groups", label: "👥 Groups", icon: Users },
            { id: "creator", label: "🎨 Creator Tools", icon: Wand2 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="px-4 py-2.5 rounded-xl whitespace-nowrap transition-all"
              style={{
                backgroundColor: activeTab === tab.id ? "#FF6B35" : "#FFFFFF",
                color: activeTab === tab.id ? "#FFFFFF" : "#6B7280",
                border: `2px solid ${activeTab === tab.id ? "#FF6B35" : "#E5E7EB"}`,
                fontSize: "13px",
                fontWeight: activeTab === tab.id ? 600 : 500,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* Canteen Tab */}
        {activeTab === "canteen" && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Budget Tracker */}
            <div
              className="rounded-2xl p-4"
              style={{
                background: "linear-gradient(135deg, #FFF5F0 0%, #FFE8DC 100%)",
                border: "2px solid #FF6B35",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <DollarSign size={18} className="text-[#FF6B35]" />
                  <span className="text-[#FF6B35] font-bold" style={{ fontSize: "13px" }}>
                    TODAY'S BUDGET
                  </span>
                </div>
                <span className="text-[#FF6B35] font-bold" style={{ fontSize: "16px" }}>
                  ₹{budget - 45}/₹{budget}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white overflow-hidden">
                <div
                  className="h-full bg-[#FF6B35] transition-all"
                  style={{ width: `${((budget - 45) / budget) * 100}%` }}
                />
              </div>
              <p className="text-[#6B7280] mt-2" style={{ fontSize: "11px" }}>
                ₹45 spent on breakfast • ₹55 remaining • AI optimizing for budget & nutrition
              </p>
            </div>

            {/* Conversational Assistant */}
            <div className="rounded-2xl p-4 bg-white border-2 border-[#FF6B35]">
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#FFF5F0" }}
                >
                  <MessageCircle size={20} className="text-[#FF6B35]" />
                </div>
                <div className="flex-1">
                  <p className="text-[#1A1A1A] font-semibold mb-1" style={{ fontSize: "13px" }}>
                    Ask me anything
                  </p>
                  <p className="text-[#6B7280] mb-2" style={{ fontSize: "11px" }}>
                    "What's healthy under ₹80?" • "No crowd options?" • "Quick meals?"
                  </p>
                  <button
                    className="px-3 py-1.5 rounded-lg"
                    style={{
                      backgroundColor: "#FFF5F0",
                      color: "#FF6B35",
                      fontSize: "11px",
                      fontWeight: 600,
                    }}
                  >
                    Start Conversation
                  </button>
                </div>
              </div>
            </div>

            {/* Transparent Recommender Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-[#1A1A1A] font-bold" style={{ fontSize: "16px" }}>
                Transparent Recommendations
              </h3>
              <div className="flex items-center gap-1">
                <Shield size={14} className="text-[#10B981]" />
                <span className="text-[#10B981] font-semibold" style={{ fontSize: "11px" }}>
                  AI Reasoning Visible
                </span>
              </div>
            </div>

            {/* Canteen Menu Items */}
            <div className="space-y-3">
              {canteenMenu.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl overflow-hidden border bg-white"
                  style={{ borderColor: "#F0F0F0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                >
                  {/* Header with Image */}
                  <div className="flex gap-3 p-4">
                    <div
                      className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#FFF5F0", fontSize: "40px" }}
                    >
                      {item.image}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-[#1A1A1A] font-bold" style={{ fontSize: "15px" }}>
                          {item.name}
                        </h4>
                        <div className="flex flex-col items-end gap-1">
                          <div
                            className="px-2.5 py-1 rounded-full"
                            style={{
                              backgroundColor: item.diversityScore > 70 ? "#D1FAE5" : "#FEF3C7",
                              color: item.diversityScore > 70 ? "#10B981" : "#D97706",
                              fontSize: "10px",
                              fontWeight: 700,
                            }}
                          >
                            {item.diversityScore > 70 ? "🌟 Expands" : "⚠️ Familiar"}
                          </div>
                        </div>
                      </div>
                      <p className="text-[#6B7280] mb-2" style={{ fontSize: "12px" }}>
                        {item.counter}
                      </p>
                      <div className="flex items-center gap-3 text-[#6B7280]" style={{ fontSize: "11px" }}>
                        <span className="flex items-center gap-1">
                          <Star size={12} className="text-[#F59E0B] fill-[#F59E0B]" />
                          {item.rating}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {item.waitTime}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <DollarSign size={12} />
                          {item.budgetImpact}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* AI Reasoning - EXPANDED */}
                  <div
                    className="mx-4 mb-3 p-3 rounded-xl"
                    style={{
                      backgroundColor: "#FFF5F0",
                      border: "2px solid #FF6B35",
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <Lightbulb size={14} className="text-[#FF6B35] mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-[#FF6B35] font-bold mb-1" style={{ fontSize: "11px" }}>
                          WHY WE'RE SHOWING THIS
                        </p>
                        <p className="text-[#1A1A1A] leading-relaxed" style={{ fontSize: "11px" }}>
                          {item.reason}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="px-4 pb-3 flex gap-2 flex-wrap">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: "#F3F4F6",
                          color: "#6B7280",
                          fontSize: "10px",
                          fontWeight: 500,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 px-4 pb-4">
                    <button
                      className="flex-1 h-10 rounded-xl font-semibold"
                      style={{
                        backgroundColor: "#FF6B35",
                        color: "#FFFFFF",
                        fontSize: "13px",
                      }}
                    >
                      Order • ₹{item.price}
                    </button>
                    <button
                      className="w-10 h-10 rounded-xl flex items-center justify-center border"
                      style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
                    >
                      <ThumbsUp size={16} className="text-[#6B7280]" />
                    </button>
                    <button
                      className="w-10 h-10 rounded-xl flex items-center justify-center border"
                      style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
                    >
                      <ThumbsDown size={16} className="text-[#6B7280]" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Feedback Loop */}
            <div className="rounded-2xl p-4 bg-white border-2 border-dashed border-[#FF6B35]">
              <div className="flex items-start gap-3">
                <BarChart3 size={20} className="text-[#FF6B35]" />
                <div>
                  <p className="text-[#1A1A1A] font-semibold mb-1" style={{ fontSize: "13px" }}>
                    Your Food Diversity Score: 62/100
                  </p>
                  <p className="text-[#6B7280] mb-2" style={{ fontSize: "11px" }}>
                    You eat at 3/12 canteens regularly. Trying 2 new counters this week unlocks "Explorer" badge (+50 Karma)
                  </p>
                  <button
                    className="text-[#FF6B35] font-semibold"
                    style={{ fontSize: "11px" }}
                  >
                    See Full Analysis →
                  </button>
                </div>
              </div>
            </div>

            {/* Drift Destinations Near You - BUSINESS PARTNER LAYER */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[#1A1A1A] font-bold" style={{ fontSize: "16px" }}>
                  Drift Destinations Near Campus
                </h3>
                <div
                  className="px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(217, 119, 6, 0.15)",
                    border: "1px solid rgba(217, 119, 6, 0.3)",
                  }}
                >
                  <span
                    className="text-[#D97706] font-semibold"
                    style={{ fontSize: "9px", letterSpacing: "0.05em" }}
                  >
                    SPONSORED
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto -mx-5 px-5">
                <div className="flex gap-3">
                  {[
                    {
                      id: 1,
                      name: "Brew Lab Cafe",
                      icon: Coffee,
                      subtext: "18 students visited this week",
                      tag: "☕ 12% off for drifters",
                      borderColor: "#0D9488", // teal
                    },
                    {
                      id: 2,
                      name: "Black Box Theatre",
                      icon: Theater,
                      subtext: "Open Mic tonight — 3 seats left",
                      tag: "🎭 Free entry via drift",
                      borderColor: "#7C3AED", // purple
                    },
                    {
                      id: 3,
                      name: "The Jazz Club",
                      icon: Music,
                      subtext: "Live session 8PM",
                      tag: "🎵 Priority seating",
                      borderColor: "#D97706", // gold
                    },
                  ].map((venue, i) => {
                    const Icon = venue.icon;
                    return (
                      <motion.div
                        key={venue.id}
                        onClick={() => onPlaceClick?.(venue)}
                        className="flex-shrink-0 rounded-[16px] overflow-hidden cursor-pointer relative"
                        style={{
                          width: "160px",
                          height: "200px",
                          backgroundColor: "#FFFFFF",
                          borderTop: `3px solid ${venue.borderColor}`,
                          boxShadow: `0 0 20px ${venue.borderColor}30, 0 4px 12px rgba(0,0,0,0.08)`,
                        }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Partner Badge */}
                        <div className="absolute top-2 right-2 z-10">
                          <div
                            className="px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: `${venue.borderColor}25`,
                              border: `1px solid ${venue.borderColor}`,
                            }}
                          >
                            <span
                              style={{
                                fontSize: "8px",
                                fontWeight: 700,
                                color: venue.borderColor,
                                letterSpacing: "0.05em",
                              }}
                            >
                              PARTNER
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-3 h-full flex flex-col">
                          {/* Icon */}
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                            style={{
                              backgroundColor: `${venue.borderColor}20`,
                            }}
                          >
                            <Icon size={24} style={{ color: venue.borderColor }} />
                          </div>

                          {/* Name */}
                          <h4
                            className="text-[#1A1A1A] font-bold mb-2"
                            style={{
                              fontSize: "13px",
                              lineHeight: "1.3",
                            }}
                          >
                            {venue.name}
                          </h4>

                          {/* Subtext */}
                          <p
                            className="text-[#6B7280] mb-auto"
                            style={{
                              fontSize: "10px",
                              lineHeight: "1.4",
                            }}
                          >
                            {venue.subtext}
                          </p>

                          {/* Tag */}
                          <div
                            className="mt-2 px-2 py-1.5 rounded-lg"
                            style={{
                              backgroundColor: `${venue.borderColor}15`,
                              border: `1px solid ${venue.borderColor}40`,
                            }}
                          >
                            <p
                              style={{
                                fontSize: "9px",
                                fontWeight: 600,
                                color: venue.borderColor,
                                lineHeight: "1.2",
                              }}
                            >
                              {venue.tag}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Partner Banner */}
              <motion.div
                className="mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={onShowPartnerDashboard}
                  className="w-full h-[56px] rounded-[12px] px-4 flex items-center gap-3 border-[1px] text-left"
                  style={{
                    background: "linear-gradient(90deg, #FFF5F0 0%, #FFE8DC 100%)",
                    borderColor: "#FF6B35",
                    boxShadow: "0 2px 8px rgba(255, 107, 53, 0.2)",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: "rgba(255, 107, 53, 0.15)",
                    }}
                  >
                    <span style={{ fontSize: "20px" }}>🏪</span>
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <p className="text-[#1A1A1A] font-bold mb-0.5" style={{ fontSize: "13px" }}>
                      Own a cafe, club or venue?
                    </p>
                    <p className="text-[#FF6B35]" style={{ fontSize: "11px" }}>
                      Get discovered by students →
                    </p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight size={20} className="text-[#FF6B35] flex-shrink-0" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Anti-Algorithm Header */}
            <div
              className="rounded-2xl p-4"
              style={{
                background: "linear-gradient(135deg, #FFF5F0 0%, #FFE8DC 100%)",
                border: "2px solid #FF6B35",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Target size={18} className="text-[#FF6B35]" />
                <span className="text-[#FF6B35] font-bold" style={{ fontSize: "13px" }}>
                  BUBBLE BREAKER MODE
                </span>
              </div>
              <p className="text-[#1A1A1A]" style={{ fontSize: "12px" }}>
                We're showing events OUTSIDE your comfort zone. Lower match % = higher growth potential.
              </p>
            </div>

            <h3 className="text-[#1A1A1A] font-bold" style={{ fontSize: "16px" }}>
              Happening Today
            </h3>
            <div className="space-y-3">
              {campusEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl p-4 border bg-white"
                  style={{ borderColor: "#F0F0F0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                >
                  <div className="flex gap-3 mb-3">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#FFF5F0", fontSize: "32px" }}
                    >
                      {event.image}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-[#1A1A1A] font-bold" style={{ fontSize: "14px" }}>
                          {event.title}
                        </h4>
                        <div className="flex flex-col items-end gap-1">
                          <span
                            className="px-2 py-0.5 rounded-full font-semibold"
                            style={{
                              backgroundColor: event.diversityScore > 80 ? "#D1FAE5" : "#FFF5F0",
                              color: event.diversityScore > 80 ? "#10B981" : "#FF6B35",
                              fontSize: "10px",
                            }}
                          >
                            {event.diversityScore > 80 ? `+${event.diversityScore} Growth` : `${event.match}% Match`}
                          </span>
                        </div>
                      </div>
                      <p className="text-[#6B7280] mb-2" style={{ fontSize: "12px" }}>
                        {event.venue} • {event.time}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: event.free ? "#D1FAE5" : "#FEF3C7",
                            color: event.free ? "#10B981" : "#D97706",
                            fontSize: "10px",
                            fontWeight: 600,
                          }}
                        >
                          {event.free ? "FREE" : "PAID"}
                        </span>
                        <span className="text-[#6B7280]" style={{ fontSize: "10px" }}>
                          {event.attendees}/{event.capacity} registered
                        </span>
                        <span className="text-[#6B7280]" style={{ fontSize: "10px" }}>
                          • {event.socialMix}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Why This - DETAILED */}
                  <div
                    className="p-3 rounded-xl mb-3"
                    style={{ backgroundColor: "#FFF5F0", border: "2px solid #FF6B35" }}
                  >
                    <p className="text-[#FF6B35] font-bold mb-1" style={{ fontSize: "11px" }}>
                      🎯 TRANSPARENT REASONING
                    </p>
                    <p className="text-[#1A1A1A] mb-2 leading-relaxed" style={{ fontSize: "11px" }}>
                      {event.reason}
                    </p>
                    {event.barrier && (
                      <div className="pt-2 border-t border-[#FF6B35]/20">
                        <p className="text-[#FF6B35] font-semibold mb-0.5" style={{ fontSize: "10px" }}>
                          BARRIER DETECTION:
                        </p>
                        <p className="text-[#1A1A1A]" style={{ fontSize: "10px" }}>
                          {event.barrier}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Conversational Booking */}
                  <div className="flex gap-2">
                    <button
                      className="flex-1 h-10 rounded-xl font-semibold"
                      style={{ backgroundColor: "#FF6B35", color: "#FFFFFF", fontSize: "13px" }}
                    >
                      Register Now
                    </button>
                    <button
                      className="px-4 h-10 rounded-xl font-semibold border-2 flex items-center gap-1"
                      style={{ borderColor: "#FF6B35", color: "#FF6B35", fontSize: "12px" }}
                    >
                      <MessageCircle size={14} />
                      Ask AI
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Diversity Tracker */}
            <div className="rounded-2xl p-4 bg-white border-2 border-dashed border-[#FF6B35]">
              <div className="flex items-start gap-3">
                <TrendingUp size={20} className="text-[#10B981]" />
                <div>
                  <p className="text-[#1A1A1A] font-semibold mb-1" style={{ fontSize: "13px" }}>
                    Event Diversity This Month
                  </p>
                  <p className="text-[#6B7280] mb-2" style={{ fontSize: "11px" }}>
                    5 Tech events • 0 Creative • 0 Social • 1 Sports
                  </p>
                  <p className="text-[#FF6B35] font-semibold" style={{ fontSize: "11px" }}>
                    Try 1 creative event this week to unlock "Renaissance Student" badge
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Study Groups Tab */}
        {activeTab === "groups" && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Cross-Pollination Header */}
            <div
              className="rounded-2xl p-4"
              style={{
                background: "linear-gradient(135deg, #FFF5F0 0%, #FFE8DC 100%)",
                border: "2px solid #FF6B35",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Users size={18} className="text-[#FF6B35]" />
                <span className="text-[#FF6B35] font-bold" style={{ fontSize: "13px" }}>
                  SKILL CROSS-POLLINATION
                </span>
              </div>
              <p className="text-[#1A1A1A]" style={{ fontSize: "12px" }}>
                Groups where you learn NEW skills, not just reinforce existing ones
              </p>
            </div>

            <h3 className="text-[#1A1A1A] font-bold" style={{ fontSize: "16px" }}>
              Matched Study Groups
            </h3>
            <div className="space-y-3">
              {studyGroups.map((group, index) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl p-4 border bg-white"
                  style={{ borderColor: "#F0F0F0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-[#1A1A1A] font-bold mb-1" style={{ fontSize: "14px" }}>
                        {group.subject}
                      </h4>
                      <p className="text-[#6B7280]" style={{ fontSize: "12px" }}>
                        {group.location} • {group.time}
                      </p>
                    </div>
                    <span
                      className="px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: group.diversityScore > 80 ? "#D1FAE5" : "#FEF3C7",
                        color: group.diversityScore > 80 ? "#10B981" : "#D97706",
                        fontSize: "10px",
                        fontWeight: 700,
                      }}
                    >
                      {group.diversityScore > 80 ? `+${group.diversityScore} Diversity` : `${group.match}% Match`}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3 text-[#6B7280]" style={{ fontSize: "11px" }}>
                    <span className="flex items-center gap-1">
                      <Users size={12} />
                      {group.members} members
                    </span>
                    <span>•</span>
                    <span
                      className="px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "#F3F4F6", fontSize: "10px" }}
                    >
                      {group.level}
                    </span>
                    {group.friends.length > 0 && (
                      <>
                        <span>•</span>
                        <span className="text-[#FF6B35]">
                          {group.friends.join(", ")} joined
                        </span>
                      </>
                    )}
                  </div>

                  {/* Transparent Reasoning */}
                  <div
                    className="p-3 rounded-xl mb-3"
                    style={{ backgroundColor: "#FFF5F0", border: "2px solid #FF6B35" }}
                  >
                    <p className="text-[#FF6B35] font-bold mb-1" style={{ fontSize: "11px" }}>
                      💡 AI ANALYSIS
                    </p>
                    <p className="text-[#1A1A1A] mb-2 leading-relaxed" style={{ fontSize: "11px" }}>
                      {group.reason}
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#FF6B35]/20">
                      <div>
                        <p className="text-[#6B7280] font-semibold mb-0.5" style={{ fontSize: "10px" }}>
                          You'll Learn:
                        </p>
                        <p className="text-[#1A1A1A]" style={{ fontSize: "10px" }}>
                          {group.skillGap}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#6B7280] font-semibold mb-0.5" style={{ fontSize: "10px" }}>
                          You'll Contribute:
                        </p>
                        <p className="text-[#1A1A1A]" style={{ fontSize: "10px" }}>
                          {group.contribution}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    className="w-full h-10 rounded-xl font-semibold"
                    style={{ backgroundColor: "#FF6B35", color: "#FFFFFF", fontSize: "13px" }}
                  >
                    Join Group
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Create New Group */}
            <button
              className="w-full h-12 rounded-2xl border-2 border-dashed flex items-center justify-center gap-2"
              style={{ borderColor: "#FF6B35", color: "#FF6B35" }}
            >
              <Users size={18} />
              <span className="font-semibold" style={{ fontSize: "13px" }}>
                Create New Study Group
              </span>
            </button>
          </motion.div>
        )}

        {/* Creator Tools Tab */}
        {activeTab === "creator" && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Header */}
            <div
              className="rounded-2xl p-4"
              style={{
                background: "linear-gradient(135deg, #FFF5F0 0%, #FFE8DC 100%)",
                border: "2px solid #FF6B35",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Wand2 size={18} className="text-[#FF6B35]" />
                <span className="text-[#FF6B35] font-bold" style={{ fontSize: "13px" }}>
                  AI-POWERED CREATOR TOOLS
                </span>
              </div>
              <p className="text-[#1A1A1A]" style={{ fontSize: "12px" }}>
                Professional media creation for clubs, events, and student teams - no design skills needed
              </p>
            </div>

            <h3 className="text-[#1A1A1A] font-bold" style={{ fontSize: "16px" }}>
              Available Tools
            </h3>

            {/* Creator Tools Grid */}
            <div className="space-y-3">
              {creatorTools.map((tool, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl p-4 border bg-white"
                  style={{ borderColor: "#F0F0F0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                >
                  <div className="flex gap-4">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${tool.color}15` }}
                    >
                      <span style={{ fontSize: "32px" }}>{tool.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[#1A1A1A] font-bold mb-1" style={{ fontSize: "14px" }}>
                        {tool.title}
                      </h4>
                      <p className="text-[#6B7280] mb-2" style={{ fontSize: "11px" }}>
                        {tool.subtitle}
                      </p>
                      <p className="text-[#1A1A1A] mb-3 leading-relaxed" style={{ fontSize: "12px" }}>
                        {tool.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[#6B7280]" style={{ fontSize: "10px" }}>
                          {tool.used}
                        </span>
                        <button
                          className="px-4 py-2 rounded-lg font-semibold"
                          style={{
                            backgroundColor: tool.color,
                            color: "#FFFFFF",
                            fontSize: "12px",
                          }}
                        >
                          Try Now
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Success Stories */}
            <div className="rounded-2xl p-4 bg-white border-2 border-dashed border-[#FF6B35]">
              <div className="flex items-start gap-3">
                <Star size={20} className="text-[#F59E0B] fill-[#F59E0B]" />
                <div>
                  <p className="text-[#1A1A1A] font-semibold mb-1" style={{ fontSize: "13px" }}>
                    Success Story
                  </p>
                  <p className="text-[#6B7280] mb-2" style={{ fontSize: "11px" }}>
                    "Drama Club used Smart Poster Designer for our musical. Event sold out 2 days early - first time in 3 years!" - @theatrekid2024
                  </p>
                  <button className="text-[#FF6B35] font-semibold" style={{ fontSize: "11px" }}>
                    See More Stories →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
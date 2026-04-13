import { motion } from "motion/react";
import {
  Coffee,
  ShoppingBag,
  Film,
  UtensilsCrossed,
  MapPin,
  Star,
  Clock,
  DollarSign,
  Sparkles,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  Heart,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

interface OutsideCampusViewProps {
  onPlaceClick?: (place: any) => void;
}

export default function OutsideCampusView({ onPlaceClick }: OutsideCampusViewProps) {
  const [activeTab, setActiveTab] = useState<"explore" | "budget" | "travel" | "discover">("explore");
  const [budgetFilter, setBudgetFilter] = useState("all");

  const cityPlaces = [
    {
      id: 1,
      name: "Blue Tokai Coffee Roasters",
      category: "Specialty Coffee",
      image: "☕",
      rating: 4.6,
      reviews: 234,
      distance: "1.2 km",
      price: 250,
      match: 72,
      serendipity: "breakthrough",
      reason: "You drink coffee 3x/week but never tried specialty roasts",
      time: "Open till 10 PM",
      tags: ["Coffee", "Work-friendly", "Instagram-worthy"],
    },
    {
      id: 2,
      name: "The Bohemian",
      category: "Mediterranean Cuisine",
      image: "🍽️",
      rating: 4.5,
      reviews: 189,
      distance: "1.8 km",
      price: 600,
      match: 69,
      serendipity: "high",
      reason: "Never tried Mediterranean - expands food diversity",
      time: "Open till 11 PM",
      tags: ["Fine Dining", "Date Spot", "Vegetarian"],
    },
    {
      id: 3,
      name: "Leopold Cafe",
      category: "Historic Cafe",
      image: "🏛️",
      rating: 4.5,
      reviews: 456,
      distance: "0.8 km",
      price: 300,
      match: 88,
      serendipity: "medium",
      reason: "Popular with students - great ambiance for groups",
      time: "Open till 12 AM",
      tags: ["Historic", "Ambiance", "Popular"],
    },
  ];

  const travelPlans = [
    {
      id: 1,
      title: "Heritage Walk",
      image: "🏛️",
      duration: "3 hours",
      stops: ["Gateway of India", "CST Station", "Marine Drive"],
      price: 200,
      bestTime: "4 PM - 7 PM",
      reason: "You love photography - golden hour lighting perfect",
      match: 85,
    },
    {
      id: 2,
      title: "Food Trail",
      image: "🍛",
      duration: "2 hours",
      stops: ["Mohammed Ali Road", "Bademiya", "Sarvi"],
      price: 400,
      bestTime: "8 PM - 10 PM",
      reason: "Expands your food diversity - authentic street food",
      match: 73,
    },
  ];

  const discoveryFeed = [
    {
      id: 1,
      user: "Ananya Singh",
      college: "VJTI",
      place: "Prithvi Theatre",
      image: "🎭",
      likes: 67,
      comments: 18,
      caption: "Open Mic night was amazing! Hidden gem in Juhu.",
      timeAgo: "2h ago",
      category: "Culture",
    },
    {
      id: 2,
      user: "Rahul Mehta",
      college: "IIT Bombay",
      place: "Kala Ghoda Art District",
      image: "🎨",
      likes: 89,
      comments: 24,
      caption: "Street art festival - so many talented artists!",
      timeAgo: "5h ago",
      category: "Art",
    },
  ];

  const bookingAssistant = [
    {
      id: 1,
      type: "movie",
      title: "Dune: Part Two",
      venue: "PVR Cinemas",
      time: "7:30 PM",
      price: 220,
      image: "🎬",
      rating: 4.7,
      reason: "Sci-fi matches your interests - IMAX experience",
      match: 92,
    },
    {
      id: 2,
      type: "event",
      title: "Indie Music Concert",
      venue: "Blue Frog",
      time: "9:00 PM Saturday",
      price: 500,
      image: "🎵",
      rating: 4.6,
      reason: "New genre for you - live music discovery",
      match: 68,
    },
  ];

  const getSerendipityBadge = (level: string) => {
    switch (level) {
      case "breakthrough":
        return { label: "🚀 BREAKTHROUGH", color: "#EC4899", bg: "#FCE7F3" };
      case "high":
        return { label: "✨ HIGH SERENDIPITY", color: "#8B5CF6", bg: "#F3E8FF" };
      case "medium":
        return { label: "🎯 SMART MATCH", color: "#10B981", bg: "#D1FAE5" };
      default:
        return { label: "RECOMMENDED", color: "#6B7280", bg: "#F3F4F6" };
    }
  };

  return (
    <div className="absolute top-[140px] left-0 right-0 bottom-[80px] z-20 flex flex-col bg-[#F8F9FA]">
      {/* Tab Navigation */}
      <div className="px-5 pt-4 pb-2 bg-white border-b border-[#E5E7EB]">
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {[
            { id: "explore", label: "🗺️ Explore", icon: MapPin },
            { id: "budget", label: "💰 Budget", icon: DollarSign },
            { id: "travel", label: "✈️ Plan Trip", icon: TrendingUp },
            { id: "discover", label: "🔥 Discover", icon: Sparkles },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="px-4 py-2.5 rounded-xl whitespace-nowrap transition-all"
              style={{
                backgroundColor: activeTab === tab.id ? "#4A90E2" : "#FFFFFF",
                color: activeTab === tab.id ? "#FFFFFF" : "#6B7280",
                border: `2px solid ${activeTab === tab.id ? "#4A90E2" : "#E5E7EB"}`,
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
        {/* Explore Tab */}
        {activeTab === "explore" && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
              {[
                { label: "All", icon: "🎯", value: "all" },
                { label: "Cafes", icon: "☕", value: "cafe" },
                { label: "Dining", icon: "🍽️", value: "dining" },
                { label: "Shopping", icon: "🛍️", value: "shopping" },
                { label: "Culture", icon: "🎭", value: "culture" },
              ].map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setBudgetFilter(cat.value)}
                  className="px-3 py-2 rounded-full border whitespace-nowrap flex items-center gap-2"
                  style={{
                    backgroundColor: budgetFilter === cat.value ? "#4A90E2" : "#FFFFFF",
                    color: budgetFilter === cat.value ? "#FFFFFF" : "#6B7280",
                    borderColor: budgetFilter === cat.value ? "#4A90E2" : "#E5E7EB",
                    fontSize: "12px",
                    fontWeight: budgetFilter === cat.value ? 600 : 500,
                  }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Places */}
            <div className="space-y-3">
              {cityPlaces.map((place, index) => {
                const serendipityInfo = getSerendipityBadge(place.serendipity);
                return (
                  <motion.div
                    key={place.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-2xl overflow-hidden border bg-white"
                    style={{ borderColor: "#F0F0F0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                  >
                    {/* Header */}
                    <div className="flex gap-3 p-4">
                      <div
                        className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "#F0F7FF", fontSize: "40px" }}
                      >
                        {place.image}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="text-[#1A1A1A] font-bold" style={{ fontSize: "15px" }}>
                            {place.name}
                          </h4>
                          <div
                            className="px-2.5 py-1 rounded-full"
                            style={{
                              backgroundColor: "#F0F7FF",
                              color: "#4A90E2",
                              fontSize: "11px",
                              fontWeight: 700,
                            }}
                          >
                            {place.match}%
                          </div>
                        </div>
                        <p className="text-[#6B7280] mb-2" style={{ fontSize: "12px" }}>
                          {place.category}
                        </p>
                        <div className="flex items-center gap-3 text-[#6B7280]" style={{ fontSize: "11px" }}>
                          <span className="flex items-center gap-1">
                            <Star size={12} className="text-[#F59E0B] fill-[#F59E0B]" />
                            {place.rating}
                          </span>
                          <span>•</span>
                          <span>{place.reviews} reviews</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} />
                            {place.distance}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Serendipity Badge */}
                    <div className="px-4 pb-3">
                      <div
                        className="inline-block px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: serendipityInfo.bg,
                          border: `1px solid ${serendipityInfo.color}`,
                        }}
                      >
                        <span
                          className="font-bold"
                          style={{
                            color: serendipityInfo.color,
                            fontSize: "9px",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {serendipityInfo.label}
                        </span>
                      </div>
                    </div>

                    {/* AI Reasoning */}
                    <div
                      className="mx-4 mb-3 p-3 rounded-xl"
                      style={{
                        backgroundColor: serendipityInfo.bg,
                        border: `1px solid ${serendipityInfo.color}`,
                      }}
                    >
                      <div className="flex items-start gap-2">
                        <Sparkles
                          size={12}
                          className="mt-0.5 flex-shrink-0"
                          style={{ color: serendipityInfo.color }}
                        />
                        <div>
                          <p
                            className="font-semibold mb-0.5"
                            style={{ color: serendipityInfo.color, fontSize: "10px" }}
                          >
                            WHY THIS?
                          </p>
                          <p className="text-[#1A1A1A]" style={{ fontSize: "11px" }}>
                            {place.reason}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="px-4 pb-3 flex gap-1">
                      {place.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: "#F3F4F6",
                            color: "#6B7280",
                            fontSize: "9px",
                            fontWeight: 500,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta Info */}
                    <div className="px-4 pb-3 flex items-center gap-3 text-[#6B7280]" style={{ fontSize: "11px" }}>
                      <span className="flex items-center gap-1">
                        <DollarSign size={12} />₹{place.price}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {place.time}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 px-4 pb-4">
                      <button
                        className="flex-1 h-10 rounded-xl font-semibold"
                        style={{
                          backgroundColor: "#4A90E2",
                          color: "#FFFFFF",
                          fontSize: "13px",
                        }}
                      >
                        Visit • Book Table
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
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Budget Tab */}
        {activeTab === "budget" && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Budget Overview */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: "linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)",
                boxShadow: "0 8px 24px rgba(74, 144, 226, 0.2)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-semibold" style={{ fontSize: "15px" }}>
                  Monthly Budget
                </span>
                <span className="text-white/80" style={{ fontSize: "13px" }}>
                  ₹320 left
                </span>
              </div>
              <div className="h-3 rounded-full bg-white/20 overflow-hidden mb-2">
                <div
                  className="h-full rounded-full bg-white"
                  style={{ width: "36%" }}
                />
              </div>
              <div className="flex items-center justify-between text-white/70" style={{ fontSize: "12px" }}>
                <span>Used: ₹180</span>
                <span>Total: ₹500</span>
              </div>
            </div>

            {/* Budget Filters */}
            <div>
              <h3 className="text-[#1A1A1A] font-bold mb-3" style={{ fontSize: "16px" }}>
                Filter by Budget
              </h3>
              <div className="flex gap-2">
                {["Under ₹100", "₹100-300", "₹300-500", "₹500+"].map((range, i) => (
                  <button
                    key={i}
                    className="flex-1 h-10 rounded-xl border"
                    style={{
                      backgroundColor: i === 1 ? "#4A90E2" : "#FFFFFF",
                      color: i === 1 ? "#FFFFFF" : "#6B7280",
                      borderColor: i === 1 ? "#4A90E2" : "#E5E7EB",
                      fontSize: "12px",
                      fontWeight: i === 1 ? 600 : 400,
                    }}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget-Aware Suggestions */}
            <div>
              <h3 className="text-[#1A1A1A] font-bold mb-3" style={{ fontSize: "16px" }}>
                Within Your Budget
              </h3>
              {cityPlaces
                .filter((p) => p.price <= 300)
                .map((place) => (
                  <div
                    key={place.id}
                    className="rounded-2xl p-4 border bg-white mb-3"
                    style={{ borderColor: "#F0F0F0" }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-[#1A1A1A] font-semibold mb-1" style={{ fontSize: "14px" }}>
                          {place.name}
                        </h4>
                        <p className="text-[#6B7280]" style={{ fontSize: "12px" }}>
                          {place.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-[#4A90E2] font-bold" style={{ fontSize: "16px" }}>
                          ₹{place.price}
                        </div>
                        <div className="text-[#10B981]" style={{ fontSize: "10px" }}>
                          In budget
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="flex-1 h-9 rounded-xl"
                        style={{
                          backgroundColor: "#4A90E2",
                          color: "#FFFFFF",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        )}

        {/* Travel Planning Tab */}
        {activeTab === "travel" && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h3 className="text-[#1A1A1A] font-bold" style={{ fontSize: "16px" }}>
              Curated Travel Plans
            </h3>
            {travelPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl p-4 border bg-white"
                style={{ borderColor: "#F0F0F0" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "#F0F7FF", fontSize: "32px" }}
                    >
                      {plan.image}
                    </div>
                    <div>
                      <h4 className="text-[#1A1A1A] font-bold mb-1" style={{ fontSize: "15px" }}>
                        {plan.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[#6B7280]" style={{ fontSize: "11px" }}>
                        <Clock size={12} />
                        <span>{plan.duration}</span>
                        <span>•</span>
                        <span>₹{plan.price}</span>
                      </div>
                    </div>
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: "#F0F7FF",
                      color: "#4A90E2",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}
                  >
                    {plan.match}%
                  </span>
                </div>

                {/* Stops */}
                <div className="mb-3">
                  <p className="text-[#6B7280] mb-2" style={{ fontSize: "11px" }}>
                    STOPS:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {plan.stops.map((stop, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: "#F3F4F6",
                          color: "#1A1A1A",
                          fontSize: "10px",
                          fontWeight: 500,
                        }}
                      >
                        {stop}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Why This */}
                <div
                  className="p-2.5 rounded-xl mb-3"
                  style={{ backgroundColor: "#F0F7FF", border: "1px solid #4A90E2" }}
                >
                  <p className="text-[#4A90E2] font-semibold mb-0.5" style={{ fontSize: "10px" }}>
                    WHY THIS?
                  </p>
                  <p className="text-[#1A1A1A]" style={{ fontSize: "11px" }}>
                    {plan.reason}
                  </p>
                </div>

                <button
                  className="w-full h-10 rounded-xl font-semibold"
                  style={{ backgroundColor: "#4A90E2", color: "#FFFFFF", fontSize: "13px" }}
                >
                  Start This Journey
                </button>
              </motion.div>
            ))}

            {/* Booking Assistant */}
            <div className="mt-6">
              <h3 className="text-[#1A1A1A] font-bold mb-3" style={{ fontSize: "16px" }}>
                Quick Bookings
              </h3>
              {bookingAssistant.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl p-4 border bg-white mb-3"
                  style={{ borderColor: "#F0F0F0" }}
                >
                  <div className="flex gap-3 mb-3">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "#F0F7FF", fontSize: "32px" }}
                    >
                      {item.image}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[#1A1A1A] font-semibold mb-1" style={{ fontSize: "14px" }}>
                        {item.title}
                      </h4>
                      <p className="text-[#6B7280] mb-1" style={{ fontSize: "12px" }}>
                        {item.venue} • {item.time}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[#4A90E2] font-bold" style={{ fontSize: "14px" }}>
                          ₹{item.price}
                        </span>
                        <span className="flex items-center gap-1 text-[#6B7280]" style={{ fontSize: "11px" }}>
                          <Star size={12} className="text-[#F59E0B] fill-[#F59E0B]" />
                          {item.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="w-full h-9 rounded-xl font-semibold"
                    style={{ backgroundColor: "#4A90E2", color: "#FFFFFF", fontSize: "12px" }}
                  >
                    Book Ticket
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Discovery Feed Tab */}
        {activeTab === "discover" && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[#1A1A1A] font-bold" style={{ fontSize: "16px" }}>
                What Others Discovered
              </h3>
              <TrendingUp size={20} className="text-[#4A90E2]" />
            </div>

            {discoveryFeed.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl overflow-hidden border bg-white"
                style={{ borderColor: "#F0F0F0" }}
              >
                {/* User Info */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#F0F7FF" }}
                    >
                      <span className="text-[#4A90E2] font-bold" style={{ fontSize: "12px" }}>
                        {post.user.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-[#1A1A1A] font-semibold" style={{ fontSize: "13px" }}>
                        {post.user}
                      </p>
                      <p className="text-[#6B7280]" style={{ fontSize: "11px" }}>
                        {post.college} • {post.timeAgo}
                      </p>
                    </div>
                  </div>
                  <span
                    className="px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "#F0F7FF",
                      color: "#4A90E2",
                      fontSize: "10px",
                      fontWeight: 600,
                    }}
                  >
                    {post.category}
                  </span>
                </div>

                {/* Place Image */}
                <div
                  className="h-48 flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #F0F7FF 0%, #E3EFFF 100%)",
                    fontSize: "80px",
                  }}
                >
                  {post.image}
                </div>

                {/* Caption & Engagement */}
                <div className="p-4">
                  <p className="text-[#1A1A1A] mb-3" style={{ fontSize: "13px", lineHeight: "1.5" }}>
                    <span className="font-semibold">{post.place}</span> - {post.caption}
                  </p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5">
                      <Heart size={18} className="text-[#6B7280]" />
                      <span className="text-[#6B7280]" style={{ fontSize: "12px" }}>
                        {post.likes}
                      </span>
                    </button>
                    <button className="flex items-center gap-1.5">
                      <MessageCircle size={18} className="text-[#6B7280]" />
                      <span className="text-[#6B7280]" style={{ fontSize: "12px" }}>
                        {post.comments}
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

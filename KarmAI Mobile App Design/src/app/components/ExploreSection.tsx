import { motion } from "motion/react";
import { MapPin, Users, Star, Heart, MessageCircle, Bookmark, Sparkles } from "lucide-react";

interface ExploreSectionProps {
  onPlaceClick?: (place: any) => void;
  onPersonClick?: (person: any) => void;
  campusMode?: "within" | "outside";
}

export default function ExploreSection({ onPlaceClick, onPersonClick, campusMode = "outside" }: ExploreSectionProps) {
  const withinCampusPlaces = [
    {
      id: 1,
      name: "Main Canteen - Counter 7",
      category: "Food",
      image: "🍱",
      rating: 4.6,
      reviews: 89,
      distance: "2 min walk",
      match: 94,
      description: "Your favorite paneer tikka combo",
      tags: ["Lunch", "Quick", "Affordable"],
      serendipity: "high",
      reason: "3 friends eating here now",
    },
    {
      id: 2,
      name: "Philosophy Corner",
      category: "Hangout",
      image: "☕",
      rating: 4.3,
      reviews: 45,
      distance: "3 min walk",
      match: 67,
      description: "Quiet spot for deep conversations",
      tags: ["Coffee", "Discussion", "Chill"],
      serendipity: "breakthrough",
      reason: "Never explored - expands your interests",
    },
    {
      id: 3,
      name: "Tech Talk - Auditorium A",
      category: "Events",
      image: "🎉",
      rating: 4.7,
      reviews: 124,
      distance: "5 min walk",
      match: 82,
      description: "AI & Ethics discussion today 4 PM",
      tags: ["Learning", "Networking", "Free"],
      serendipity: "medium",
      reason: "Outside your usual interests",
    },
  ];

  const outsideCampusPlaces = [
    {
      id: 1,
      name: "Leopold Cafe",
      category: "Cafes",
      image: "☕",
      rating: 4.5,
      reviews: 234,
      distance: "0.8 km",
      match: 92,
      description: "Historic cafe with great ambiance",
      tags: ["Coffee", "Hangout", "Study"],
      serendipity: "medium",
      reason: "Popular with students",
    },
    {
      id: 2,
      name: "Gateway of India",
      category: "Heritage",
      image: "🏛️",
      rating: 4.8,
      reviews: 1205,
      distance: "1.2 km",
      match: 85,
      description: "Iconic monument and tourist spot",
      tags: ["Heritage", "Photography", "History"],
      serendipity: "high",
      reason: "You love photography but never visited",
    },
    {
      id: 3,
      name: "Prithvi Theatre",
      category: "Culture",
      image: "🎭",
      rating: 4.6,
      reviews: 456,
      distance: "2.1 km",
      match: 78,
      description: "Famous theatre with cultural events",
      tags: ["Theatre", "Arts", "Culture"],
      serendipity: "breakthrough",
      reason: "Outside your comfort zone - live performance",
    },
  ];

  const suggestedPlaces = campusMode === "within" ? withinCampusPlaces : outsideCampusPlaces;

  const suggestedPeople = [
    {
      id: 1,
      name: "Priya Sharma",
      college: "VJTI Mumbai",
      interests: ["Photography", "Travel", "Music"],
      match: 87,
      mutualFriends: 3,
      recentActivity: "Visited Leopold Cafe",
    },
    {
      id: 2,
      name: "Rahul Mehta",
      college: "IIT Bombay",
      interests: ["Technology", "Sports", "Photography"],
      match: 82,
      mutualFriends: 5,
      recentActivity: "Explored Gateway of India",
    },
  ];

  const recentPosts = [
    {
      id: 1,
      user: "Ananya Singh",
      college: "VJTI",
      place: "Marine Drive",
      image: "🌊",
      likes: 45,
      comments: 12,
      caption: "Amazing sunset views! Perfect spot for evening walks.",
      timeAgo: "2h ago",
    },
    {
      id: 2,
      user: "Vikram Shah",
      college: "SPIT",
      place: "Chhatrapati Shivaji Terminus",
      image: "🚂",
      likes: 67,
      comments: 18,
      caption: "Architecture at its finest. A must-visit heritage site!",
      timeAgo: "5h ago",
    },
  ];

  return (
    <div className="absolute top-[180px] left-0 right-0 bottom-[80px] z-20 overflow-y-auto px-5 pb-4">
      <div className="space-y-4">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-[#1A1A1A] font-bold mb-1" style={{ fontSize: "24px" }}>
            Explore
          </h2>
          <p className="text-[#6B7280]" style={{ fontSize: "13px" }}>
            Discover new places, people, and experiences
          </p>
        </div>

        {/* Suggested Places */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[#1A1A1A] font-bold" style={{ fontSize: "16px" }}>
              🗺️ Suggested Places
            </h3>
            <button className="text-[#7C5CE8]" style={{ fontSize: "12px", fontWeight: 500 }}>
              See all
            </button>
          </div>

          <div className="space-y-3">
            {suggestedPlaces.map((place, index) => {
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

              const serendipityInfo = getSerendipityBadge(place.serendipity || "medium");

              return (
                <motion.div
                  key={place.id}
                  className="rounded-2xl p-4 border"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E5E7EB",
                    boxShadow: "var(--shadow-sm)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => onPlaceClick?.(place)}
                >
                  {/* Serendipity Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="px-2.5 py-1 rounded-full"
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
                    <div
                      className="px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: "#EDE9FE",
                        color: "#7C5CE8",
                        fontSize: "10px",
                        fontWeight: 600,
                      }}
                    >
                      {place.match}% match
                    </div>
                  </div>

                  <div className="flex gap-3 mb-3">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "#F3F4F6", fontSize: "32px" }}
                    >
                      {place.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[#1A1A1A] font-semibold mb-1" style={{ fontSize: "14px" }}>
                        {place.name}
                      </h4>
                      <p className="text-[#6B7280] mb-2" style={{ fontSize: "11px" }}>
                        {place.description}
                      </p>
                      <div className="flex items-center gap-3 text-[#9CA3AF]" style={{ fontSize: "10px" }}>
                        <span className="flex items-center gap-1">
                          <Star size={12} className="text-[#F59E0B]" />
                          {place.rating}
                        </span>
                        <span>•</span>
                        <span>{place.reviews} reviews</span>
                        <span>•</span>
                        <span>{place.distance}</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Reasoning */}
                  <div
                    className="p-2.5 rounded-xl mb-2"
                    style={{
                      backgroundColor: serendipityInfo.bg,
                      border: `1px solid ${serendipityInfo.color}`,
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <Sparkles size={12} className="mt-0.5 flex-shrink-0" style={{ color: serendipityInfo.color }} />
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
                  <div className="flex gap-1">
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
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Suggested People */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[#1A1A1A] font-bold" style={{ fontSize: "16px" }}>
              👥 People You Might Like
            </h3>
            <button className="text-[#7C5CE8]" style={{ fontSize: "12px", fontWeight: 500 }}>
              See all
            </button>
          </div>

          <div className="space-y-3">
            {suggestedPeople.map((person, index) => (
              <motion.div
                key={person.id}
                className="rounded-2xl p-4 border"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E5E7EB",
                  boxShadow: "var(--shadow-sm)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => onPersonClick?.(person)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #7C5CE8, #0D9488)" }}
                  >
                    {person.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#1A1A1A] font-semibold" style={{ fontSize: "14px" }}>
                      {person.name}
                    </h4>
                    <p className="text-[#6B7280]" style={{ fontSize: "11px" }}>
                      {person.college}
                    </p>
                  </div>
                  <div
                    className="px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: "#CCFBF1",
                      color: "#0D9488",
                      fontSize: "11px",
                      fontWeight: 600,
                    }}
                  >
                    {person.match}%
                  </div>
                </div>
                <div className="flex gap-1 mb-2">
                  {person.interests.map((interest, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: "#EDE9FE",
                        color: "#7C5CE8",
                        fontSize: "9px",
                        fontWeight: 500,
                      }}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#9CA3AF]" style={{ fontSize: "10px" }}>
                    {person.mutualFriends} mutual friends
                  </span>
                  <button
                    className="px-4 py-1.5 rounded-lg font-medium"
                    style={{
                      backgroundColor: "#7C5CE8",
                      color: "#FFFFFF",
                      fontSize: "11px",
                    }}
                  >
                    Connect
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Posts & Reviews */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[#1A1A1A] font-bold" style={{ fontSize: "16px" }}>
              📸 Recent Experiences
            </h3>
            <button className="text-[#7C5CE8]" style={{ fontSize: "12px", fontWeight: 500 }}>
              See all
            </button>
          </div>

          <div className="space-y-3">
            {recentPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="rounded-2xl p-4 border"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E5E7EB",
                  boxShadow: "var(--shadow-sm)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-white"
                    style={{ background: "linear-gradient(135deg, #7C5CE8, #0D9488)", fontSize: "12px" }}
                  >
                    {post.user.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#1A1A1A] font-semibold" style={{ fontSize: "13px" }}>
                      {post.user}
                    </h4>
                    <p className="text-[#9CA3AF]" style={{ fontSize: "10px" }}>
                      {post.college} • {post.timeAgo}
                    </p>
                  </div>
                  <Bookmark size={16} className="text-[#9CA3AF]" />
                </div>

                <div
                  className="w-full h-32 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: "#F3F4F6", fontSize: "48px" }}
                >
                  {post.image}
                </div>

                <div className="mb-3">
                  <div className="flex items-center gap-1 mb-2">
                    <MapPin size={12} className="text-[#7C5CE8]" />
                    <span className="text-[#7C5CE8] font-medium" style={{ fontSize: "11px" }}>
                      {post.place}
                    </span>
                  </div>
                  <p className="text-[#1A1A1A]" style={{ fontSize: "12px" }}>
                    {post.caption}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-[#6B7280]">
                  <button className="flex items-center gap-1">
                    <Heart size={16} />
                    <span style={{ fontSize: "12px" }}>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1">
                    <MessageCircle size={16} />
                    <span style={{ fontSize: "12px" }}>{post.comments}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import os

filepath = r"KarmAI Mobile App Design\src\app\components\ExploreSection.tsx"

new_explore = """import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, MessageCircle, Send, Bookmark, MapPin, Camera, Plus, Star, CheckCircle, X } from "lucide-react";

interface ExploreSectionProps {
  onPlaceClick?: (place: any) => void;
  onPersonClick?: (person: any) => void;
  campusMode?: "within" | "outside";
}

export default function ExploreSection({ onPlaceClick, onPersonClick, campusMode = "outside" }: ExploreSectionProps) {
  const [showUpload, setShowUpload] = useState(false);
  const [feed, setFeed] = useState([
    {
      id: 1,
      user: { name: "Aman Gupta", avatar: "AS", role: "Food Critic Level 4" },
      location: "Aahar Canteen, Powai",
      time: "2 hours ago",
      image: "🍛",
      bgColor: "from-orange-100 to-red-100",
      caption: "You have to try this new Paneer Tikka Combo! Only ₹80 and it's super fresh.",
      tags: ["#CampusEats", "#BudgetBites"],
      likes: 124,
      comments: 18,
      recommended: true,
      hasFeedback: false
    },
    {
      id: 2,
      user: { name: "Neha Sharma", avatar: "NS", role: "Explorer Level 2" },
      location: "Marine Drive Walk",
      time: "5 hours ago",
      image: "🌊",
      bgColor: "from-cyan-100 to-blue-100",
      caption: "The start of this journey was totally worth it. Such a vibe at sunset.",
      tags: ["#MumbaiDiaries", "#Sunset"],
      likes: 342,
      comments: 45,
      recommended: false,
      hasFeedback: false
    },
    {
      id: 3,
      user: { name: "Rahul V", avatar: "RV", role: "Tech Club Admin" },
      location: "Auditorium A",
      time: "1 day ago",
      image: "🤖",
      bgColor: "from-purple-100 to-indigo-100",
      caption: "Our AI Robotics workshop was packed! Thanks everyone who registered.",
      tags: ["#TechFest", "#AI"],
      likes: 89,
      comments: 5,
      recommended: true,
      hasFeedback: false
    }
  ]);

  const [postIdea, setPostIdea] = useState("");

  const handleLike = (id: number) => {
    setFeed(feed.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleFeedback = (id: number, rating: 'good' | 'bad') => {
    setFeed(feed.map(p => p.id === id ? { ...p, hasFeedback: true } : p));
  };

  const handlePost = () => {
    if (!postIdea) return;
    const newPost = {
      id: Date.now(),
      user: { name: "Priya Raut", avatar: "PR", role: "Creator Level 3" },
      location: "Campus Library",
      time: "Just now",
      image: "📸",
      bgColor: "from-green-100 to-emerald-100",
      caption: postIdea,
      tags: ["#NewDiscovery"],
      likes: 0,
      comments: 0,
      recommended: false,
      hasFeedback: false
    };
    setFeed([newPost, ...feed]);
    setShowUpload(false);
    setPostIdea("");
  };

  return (
    <div className="h-full w-full bg-[#0A0A0F] pt-[90px] pb-24 overflow-y-auto px-4 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-bold" style={{ fontSize: "20px" }}>Discovery Feed</h2>
        <div className="flex gap-2">
          <span className="text-[#00CBA4] text-xs font-bold px-3 py-1 bg-[#00CBA4]/10 rounded-full border border-[#00CBA4]/20">
            {campusMode === "within" ? "Campus Live" : "City Explorers"}
          </span>
        </div>
      </div>

      {/* Floating Upload/Post Button */}
      <motion.button
        onClick={() => setShowUpload(true)}
        className="fixed right-4 bottom-24 z-[100] w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: "linear-gradient(135deg, #FF6B35, #FF8E53)" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus size={24} className="text-white" strokeWidth={3} />
      </motion.button>

      {/* Instagram-style Feed */}
      <div className="space-y-6">
        {feed.map((post) => (
          <div key={post.id} className="rounded-2xl overflow-hidden bg-[#1A1A22] border border-[#2A2A35]">
            {/* Post Header */}
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7C5CE8] to-[#9F7AEA] flex items-center justify-center border-2 border-[#1A1A22]">
                  <span className="text-white text-xs font-bold">{post.user.avatar}</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm leading-none">{post.user.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={10} className="text-[#666677]" />
                    <span className="text-[#666677] text-[10px]">{post.location}</span>
                    <span className="text-[#333344] mx-1">•</span>
                    <span className="text-[#666677] text-[10px]">{post.time}</span>
                  </div>
                </div>
              </div>
              {post.recommended && (
                <div className="flex items-center gap-1 bg-[#00CBA4]/10 px-2 py-1 rounded border border-[#00CBA4]/20">
                  <Star size={10} className="text-[#00CBA4]" fill="#00CBA4" />
                  <span className="text-[#00CBA4] text-[9px] font-bold">TOP REC</span>
                </div>
              )}
            </div>

            {/* Post Image/Media area (Mocked) */}
            <div className={`w-full aspect-square bg-gradient-to-br ${post.bgColor} flex items-center justify-center relative`}>
               <span className="text-8xl drop-shadow-lg">{post.image}</span>
               
               {/* Transparent Overlay to start journey */}
               <div className="absolute inset-0 bg-black/10 flex items-end justify-center pb-4 opacity-0 hover:opacity-100 transition-opacity">
                  <button className="px-4 py-2 bg-white text-black font-bold text-xs rounded-full shadow-xl">
                    Explore this {campusMode === "within" ? "Campus" : "City"} Spot
                  </button>
               </div>
            </div>

            {/* Actions */}
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                  <button onClick={() => handleLike(post.id)} className="flex items-center gap-1.5 transition-transform active:scale-95">
                    <Heart size={20} className={post.likes > 100 ? "text-[#FF4B4B]" : "text-white"} fill={post.likes > 100 ? "#FF4B4B" : "none"} />
                    <span className="text-white text-xs font-semibold">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5">
                    <MessageCircle size={20} className="text-white" />
                    <span className="text-white text-xs font-semibold">{post.comments}</span>
                  </button>
                  <button>
                    <Send size={20} className="text-white" />
                  </button>
                </div>
                <button>
                  <Bookmark size={20} className="text-white" />
                </button>
              </div>

              {/* Caption */}
              <p className="text-white text-sm mb-1 leading-snug">
                <span className="font-bold mr-2">{post.user.name}</span>
                {post.caption}
              </p>
              
              <div className="flex gap-1 mb-2">
                {post.tags.map(tag => (
                  <span key={tag} className="text-[#7C5CE8] text-xs font-medium">{tag}</span>
                ))}
              </div>

              {/* User Feedback System */}
              {post.recommended && !post.hasFeedback && (
                <div className="mt-3 bg-[#7C5CE8]/10 border border-[#7C5CE8]/30 rounded-lg p-3">
                  <p className="text-[#AAAACC] text-xs mb-2">Did you go here based on this rec?</p>
                  <div className="flex gap-2">
                    <button onClick={() => handleFeedback(post.id, 'good')} className="flex-1 py-1.5 bg-[#00CBA4]/20 text-[#00CBA4] rounded text-xs font-bold border border-[#00CBA4]/30">Yes, it was great</button>
                    <button onClick={() => handleFeedback(post.id, 'bad')} className="flex-1 py-1.5 bg-[#FF4B4B]/20 text-[#FF4B4B] rounded text-xs font-bold border border-[#FF4B4B]/30">No, wasn't for me</button>
                  </div>
                </div>
              )}
              {post.hasFeedback && (
                <div className="mt-2 flex items-center gap-1 text-[#00CBA4] text-xs font-bold">
                  <CheckCircle size={12} /> Feedback sent to KarmaAI!
                </div>
              )}

            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 z-50 bg-[#0A0A0F] pt-14 px-4 pb-4"
          >
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => setShowUpload(false)} className="w-10 h-10 flex items-center justify-center bg-[#1A1A22] rounded-full text-white">
                <X size={20} />
              </button>
              <h2 className="text-white font-bold text-lg">New Discovery</h2>
              <button onClick={handlePost} className="px-4 py-2 bg-[#7C5CE8] rounded-full text-white font-bold text-sm">
                Post
              </button>
            </div>

            <div className="w-full aspect-square bg-[#1A1A22] rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-[#333344] mb-4">
               <Camera size={40} className="text-[#666677] mb-2" />
               <span className="text-[#666677] font-semibold">Upload Photo/Video</span>
            </div>

            <textarea 
              value={postIdea}
              onChange={(e) => setPostIdea(e.target.value)}
              placeholder="What makes this place special? Add your dish reco or experience..."
              className="w-full h-32 bg-[#1A1A22] rounded-xl border border-[#2A2A35] p-4 text-white outline-none placeholder:text-[#666677] text-sm resize-none"
            />
            
            <div className="flex gap-2 mt-3">
               <span className="text-xs text-[#AAAACC] bg-[#2A2A35] px-3 py-1 rounded-full">+ Tag Location</span>
               <span className="text-xs text-[#AAAACC] bg-[#2A2A35] px-3 py-1 rounded-full">+ Tag People</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
"""

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_explore)

print("Updated ExploreSection with fully working Instagram Feed!")

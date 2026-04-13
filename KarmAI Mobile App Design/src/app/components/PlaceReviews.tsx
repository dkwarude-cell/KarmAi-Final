import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ThumbsUp, MessageCircle, User, Plus } from "lucide-react";

interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  text: string;
  helpful: number;
  photos?: string[];
}

interface PlaceReviewsProps {
  placeName: string;
  averageRating: number;
  totalReviews: number;
  onWriteReview: () => void;
}

const springTransition = {
  type: "spring" as const,
  stiffness: 350,
  damping: 25,
  mass: 0.8,
};

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: "1",
    userName: "Priya Sharma",
    rating: 5,
    date: "2 days ago",
    text: "Amazing spot for photography! The lighting during golden hour is perfect. Met some fellow students from VJTI here.",
    helpful: 12,
    photos: ["https://images.unsplash.com/photo-1452457807411-4979b707c5be?w=300&h=200&fit=crop"],
  },
  {
    id: "2",
    userName: "Arjun Mehta",
    rating: 4,
    date: "1 week ago",
    text: "Great vibes and affordable. Perfect for study sessions with friends. Can get crowded during lunch hours.",
    helpful: 8,
  },
  {
    id: "3",
    userName: "Sneha Patel",
    rating: 5,
    date: "2 weeks ago",
    text: "Love the ambiance! The staff is super friendly and the music selection is on point. Highly recommend for first dates 😊",
    helpful: 15,
  },
];

export default function PlaceReviews({
  placeName,
  averageRating,
  totalReviews,
  onWriteReview,
}: PlaceReviewsProps) {
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  const [helpfulClicked, setHelpfulClicked] = useState<Set<string>>(new Set());

  const handleHelpful = (reviewId: string) => {
    setHelpfulClicked(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  return (
    <div>
      {/* Header with Ratings Overview */}
      <motion.div
        className="mb-5 p-5 rounded-2xl"
        style={{
          background: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.8)",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springTransition}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-[#1A1A1A] font-bold mb-1" style={{ fontSize: "18px" }}>
              Student Reviews
            </h3>
            <p className="text-[#6B7280]" style={{ fontSize: "12px" }}>
              {totalReviews} verified check-ins
            </p>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              <Star size={20} className="text-amber-500 fill-amber-500" />
              <span className="text-[#1A1A1A] font-bold" style={{ fontSize: "24px" }}>
                {averageRating.toFixed(1)}
              </span>
            </div>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={12}
                  className={
                    star <= Math.round(averageRating)
                      ? "text-amber-500 fill-amber-500"
                      : "text-gray-300 fill-gray-300"
                  }
                />
              ))}
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating, index) => {
            const percentage = rating === 5 ? 65 : rating === 4 ? 25 : rating === 3 ? 8 : 2;
            return (
              <motion.div
                key={rating}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <span className="text-[#6B7280] w-3 text-right" style={{ fontSize: "11px" }}>
                  {rating}
                </span>
                <Star size={10} className="text-amber-500 fill-amber-500" />
                <div
                  className="flex-1 h-1.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(0, 0, 0, 0.05)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%)",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: 0.3 + index * 0.05, duration: 0.6 }}
                  />
                </div>
                <span className="text-[#6B7280] w-8 text-right" style={{ fontSize: "11px" }}>
                  {percentage}%
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Reviews List */}
      <div className="space-y-3 mb-4">
        {mockReviews.map((review, index) => (
          <motion.div
            key={review.id}
            className="p-4 rounded-2xl"
            style={{
              background: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.7)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.08, ...springTransition }}
            whileHover={{ scale: 1.01 }}
          >
            {/* User Info */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(124, 92, 232, 0.15), rgba(124, 92, 232, 0.08))",
                  }}
                >
                  {review.userAvatar ? (
                    <img src={review.userAvatar} alt={review.userName} className="w-full h-full rounded-full" />
                  ) : (
                    <User size={18} className="text-[#7C5CE8]" />
                  )}
                </div>
                <div>
                  <p className="text-[#1A1A1A] font-semibold" style={{ fontSize: "13px" }}>
                    {review.userName}
                  </p>
                  <p className="text-[#6B7280]" style={{ fontSize: "11px" }}>
                    {review.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={
                      i < review.rating ? "text-amber-500 fill-amber-500" : "text-gray-300 fill-gray-300"
                    }
                  />
                ))}
              </div>
            </div>

            {/* Review Text */}
            <p
              className="text-[#1A1A1A] mb-3 leading-relaxed"
              style={{
                fontSize: "13px",
                lineHeight: "1.6",
              }}
            >
              {review.text}
            </p>

            {/* Review Photos */}
            {review.photos && review.photos.length > 0 && (
              <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
                {review.photos.map((photo, i) => (
                  <motion.div
                    key={i}
                    className="flex-shrink-0 w-24 h-24 rounded-xl bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${photo})`,
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={springTransition}
                  />
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => handleHelpful(review.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{
                  background: helpfulClicked.has(review.id)
                    ? "rgba(124, 92, 232, 0.1)"
                    : "rgba(0, 0, 0, 0.04)",
                  color: helpfulClicked.has(review.id) ? "#7C5CE8" : "#6B7280",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={springTransition}
              >
                <ThumbsUp
                  size={12}
                  className={helpfulClicked.has(review.id) ? "fill-current" : ""}
                  strokeWidth={2}
                />
                <span className="font-semibold" style={{ fontSize: "11px" }}>
                  Helpful ({review.helpful + (helpfulClicked.has(review.id) ? 1 : 0)})
                </span>
              </motion.button>

              <motion.button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(0, 0, 0, 0.04)",
                  color: "#6B7280",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={springTransition}
              >
                <MessageCircle size={12} strokeWidth={2} />
                <span className="font-semibold" style={{ fontSize: "11px" }}>
                  Reply
                </span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Write Review Button - Sticky at bottom */}
      <motion.div
        className="sticky bottom-0 left-0 right-0 pt-4 pb-2 -mx-6 px-6"
        style={{
          background: "linear-gradient(to top, rgba(255, 255, 255, 0.95) 70%, transparent)",
          backdropFilter: "blur(8px)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.button
          onClick={onWriteReview}
          className="w-full h-14 rounded-2xl font-semibold flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #7C5CE8 0%, #9F7AEA 100%)",
            color: "#FFFFFF",
            boxShadow: "0 4px 16px rgba(124, 92, 232, 0.25)",
            fontSize: "15px",
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={springTransition}
        >
          <Plus size={18} strokeWidth={2.5} />
          <span>Write a Review</span>
        </motion.button>
      </motion.div>
    </div>
  );
}

import { motion } from "motion/react";
import { useState } from "react";
import { Reward, REWARD_CATALOG, TIER_COLORS, TIER_LABELS, RewardTier } from "../types/rewards";
import { Sparkles, Clock, Users, Gift, ChevronRight } from "lucide-react";

interface RewardsMarketplaceProps {
  userKarma: number;
  onClose: () => void;
  onRedeem: (reward: Reward) => void;
}

export default function RewardsMarketplace({ userKarma, onClose, onRedeem }: RewardsMarketplaceProps) {
  const [selectedTier, setSelectedTier] = useState<RewardTier | "all">("all");
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const filteredRewards = selectedTier === "all"
    ? REWARD_CATALOG
    : REWARD_CATALOG.filter(r => r.tier === selectedTier);

  const tierTabs: { id: RewardTier | "all"; label: string; emoji: string }[] = [
    { id: "all", label: "All", emoji: "🎁" },
    { id: "instant", label: "Instant", emoji: "⚡" },
    { id: "experience", label: "Experience", emoji: "🎭" },
    { id: "premium", label: "Premium", emoji: "💎" },
    { id: "limited", label: "Limited", emoji: "⭐" },
  ];

  // Flash deals - rewards with temporary discounts
  const flashDeals = REWARD_CATALOG
    .filter(r => r.isFlashDeal)
    .slice(0, 3);

  return (
    <div className="absolute inset-0 z-50 bg-[#F8F9FA] overflow-hidden">
      {/* Header */}
      <div
        className="px-5 pt-12 pb-4 border-b"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#E5E7EB",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#FEF3C7" }}
            >
              <Gift size={20} className="text-[#D97706]" />
            </div>
            <div>
              <h2 className="text-[#1A1A1A] font-bold" style={{ fontSize: "20px" }}>
                Rewards Marketplace
              </h2>
              <p className="text-[#0D9488] font-semibold" style={{ fontSize: "12px" }}>
                {userKarma.toLocaleString()} Karma Available
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#F3F4F6" }}
          >
            <span className="text-[#6B7280]">×</span>
          </button>
        </div>

        {/* Tier Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {tierTabs.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className="px-4 py-2 rounded-full whitespace-nowrap border transition-all"
              style={{
                backgroundColor: selectedTier === tier.id ? "#EDE9FE" : "#FFFFFF",
                borderColor: selectedTier === tier.id ? "#7C5CE8" : "#E5E7EB",
                color: selectedTier === tier.id ? "#7C5CE8" : "#6B7280",
                fontSize: "12px",
                fontWeight: selectedTier === tier.id ? 600 : 500,
              }}
            >
              {tier.emoji} {tier.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="overflow-y-auto" style={{ height: "calc(100vh - 180px)" }}>
        <div className="p-5 space-y-4">
          {/* Flash Deals Section */}
          {flashDeals.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-[#EF4444]" />
                <h3 className="text-[#1A1A1A] font-bold" style={{ fontSize: "16px" }}>
                  Flash Deals
                </h3>
                <div
                  className="px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: "#FEE2E2",
                    color: "#EF4444",
                    fontSize: "9px",
                    fontWeight: 600,
                  }}
                >
                  24H ONLY
                </div>
              </div>
              <div className="space-y-2">
                {flashDeals.map((reward) => (
                  <FlashDealCard
                    key={reward.id}
                    reward={reward}
                    userKarma={userKarma}
                    onClick={() => setSelectedReward(reward)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Rewards by Tier */}
          {Object.entries(TIER_LABELS).map(([tier, label]) => {
            const tierRewards = filteredRewards.filter(r => r.tier === tier);
            if (tierRewards.length === 0 && selectedTier !== "all") return null;

            return (
              <div key={tier}>
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: TIER_COLORS[tier as RewardTier] }}
                  />
                  <h3 className="text-[#1A1A1A] font-bold" style={{ fontSize: "16px" }}>
                    {label}
                  </h3>
                  <span className="text-[#6B7280]" style={{ fontSize: "12px" }}>
                    ({tierRewards.length})
                  </span>
                </div>
                <div className="space-y-2">
                  {tierRewards.map((reward) => (
                    <RewardCard
                      key={reward.id}
                      reward={reward}
                      userKarma={userKarma}
                      onClick={() => setSelectedReward(reward)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reward Detail Modal */}
      {selectedReward && (
        <RewardDetailModal
          reward={selectedReward}
          userKarma={userKarma}
          onClose={() => setSelectedReward(null)}
          onRedeem={() => {
            onRedeem(selectedReward);
            setSelectedReward(null);
          }}
        />
      )}
    </div>
  );
}

function FlashDealCard({ reward, userKarma, onClick }: { reward: Reward; userKarma: number; onClick: () => void }) {
  const canAfford = userKarma >= reward.karmaCost;
  const discountedCost = reward.flashDiscount
    ? Math.floor(reward.karmaCost * (1 - reward.flashDiscount / 100))
    : reward.karmaCost;

  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl p-4 border text-left relative overflow-hidden"
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: "#FEE2E2",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Flash indicator */}
      <div
        className="absolute top-2 right-2 px-2 py-1 rounded-full flex items-center gap-1"
        style={{
          backgroundColor: "#FEE2E2",
          fontSize: "9px",
          fontWeight: 600,
          color: "#EF4444",
        }}
      >
        <Clock size={10} />
        <span>23:45:12</span>
      </div>

      <div className="flex items-start gap-3">
        <div
          className="text-3xl w-12 h-12 flex items-center justify-center rounded-xl"
          style={{ backgroundColor: "#FEF3C7" }}
        >
          {reward.emoji}
        </div>
        <div className="flex-1">
          <h4 className="text-[#1A1A1A] font-semibold mb-1" style={{ fontSize: "14px" }}>
            {reward.name}
          </h4>
          <p className="text-[#6B7280] mb-2" style={{ fontSize: "11px" }}>
            {reward.description}
          </p>
          <div className="flex items-center gap-2">
            {reward.flashDiscount && (
              <span
                className="text-[#9CA3AF] line-through"
                style={{ fontSize: "12px" }}
              >
                {reward.karmaCost}
              </span>
            )}
            <span
              className="font-bold"
              style={{
                fontSize: "16px",
                color: canAfford ? "#EF4444" : "#9CA3AF",
              }}
            >
              {discountedCost} Karma
            </span>
            {reward.flashDiscount && (
              <span
                className="px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: "#FEE2E2",
                  color: "#EF4444",
                  fontSize: "10px",
                  fontWeight: 600,
                }}
              >
                -{reward.flashDiscount}%
              </span>
            )}
          </div>
        </div>
        <ChevronRight size={16} className="text-[#9CA3AF]" />
      </div>
    </button>
  );
}

function RewardCard({ reward, userKarma, onClick }: { reward: Reward; userKarma: number; onClick: () => void }) {
  const canAfford = userKarma >= reward.karmaCost;

  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl p-4 border text-left relative overflow-hidden transition-all"
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: "#E5E7EB",
        opacity: canAfford ? 1 : 0.7,
        boxShadow: canAfford ? "var(--shadow-sm)" : "none",
      }}
    >
      {/* Stock indicator for limited rewards */}
      {reward.stock !== undefined && (
        <div
          className="absolute top-2 right-2 px-2 py-1 rounded-full flex items-center gap-1"
          style={{
            backgroundColor: reward.stock < 5 ? "#FEE2E2" : "#F3F4F6",
            fontSize: "9px",
            fontWeight: 600,
            color: reward.stock < 5 ? "#EF4444" : "#6B7280",
          }}
        >
          <Users size={10} />
          <span>{reward.stock} left</span>
        </div>
      )}

      {/* Popularity indicator */}
      {reward.popularity && reward.popularity > 85 && (
        <div
          className="absolute top-2 right-2 px-2 py-1 rounded-full"
          style={{
            backgroundColor: "#FEF3C7",
            fontSize: "9px",
            fontWeight: 600,
            color: "#D97706",
          }}
        >
          🔥 Popular
        </div>
      )}

      <div className="flex items-start gap-3">
        <div
          className="text-3xl w-12 h-12 flex items-center justify-center rounded-xl"
          style={{ backgroundColor: `${TIER_COLORS[reward.tier]}15` }}
        >
          {reward.emoji}
        </div>
        <div className="flex-1">
          <h4 className="text-[#1A1A1A] font-semibold mb-1" style={{ fontSize: "14px" }}>
            {reward.name}
          </h4>
          <p className="text-[#6B7280] mb-2" style={{ fontSize: "11px" }}>
            {reward.description}
          </p>
          {reward.partnerName && (
            <p className="text-[#9CA3AF] mb-2" style={{ fontSize: "10px" }}>
              📍 {reward.partnerName}
            </p>
          )}
          <div className="flex items-center gap-2">
            <span
              className="font-bold"
              style={{
                fontSize: "16px",
                color: canAfford ? TIER_COLORS[reward.tier] : "#9CA3AF",
              }}
            >
              {reward.karmaCost.toLocaleString()} Karma
            </span>
            {!canAfford && (
              <span className="text-[#9CA3AF]" style={{ fontSize: "10px" }}>
                (Need {(reward.karmaCost - userKarma).toLocaleString()} more)
              </span>
            )}
          </div>
        </div>
        <ChevronRight size={16} className="text-[#9CA3AF]" />
      </div>
    </button>
  );
}

function RewardDetailModal({ reward, userKarma, onClose, onRedeem }: {
  reward: Reward;
  userKarma: number;
  onClose: () => void;
  onRedeem: () => void;
}) {
  const canAfford = userKarma >= reward.karmaCost;

  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-end justify-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(8px)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-t-[28px] w-full max-h-[85vh] overflow-y-auto border-t"
        style={{ borderColor: TIER_COLORS[reward.tier], boxShadow: "var(--shadow-lg)" }}
        initial={{ y: 600 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-4">
          <div className="w-10 h-1 rounded-full bg-[#E5E7EB]" />
        </div>

        <div className="px-6 pb-8">
          {/* Reward Icon */}
          <div className="text-center mb-4">
            <div
              className="text-6xl inline-block p-6 rounded-3xl"
              style={{ backgroundColor: `${TIER_COLORS[reward.tier]}15` }}
            >
              {reward.emoji}
            </div>
          </div>

          {/* Reward Info */}
          <div className="text-center mb-6">
            <div
              className="inline-block px-3 py-1 rounded-full mb-2"
              style={{
                backgroundColor: `${TIER_COLORS[reward.tier]}20`,
                color: TIER_COLORS[reward.tier],
                fontSize: "10px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {TIER_LABELS[reward.tier]}
            </div>
            <h3 className="text-[#1A1A1A] font-bold mb-2" style={{ fontSize: "22px" }}>
              {reward.name}
            </h3>
            <p className="text-[#6B7280] mb-4" style={{ fontSize: "14px" }}>
              {reward.description}
            </p>
            {reward.partnerName && (
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl"
                style={{ backgroundColor: "#F3F4F6" }}
              >
                <span style={{ fontSize: "12px", color: "#6B7280" }}>Partner:</span>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#1A1A1A" }}>
                  {reward.partnerName}
                </span>
              </div>
            )}
          </div>

          {/* Cost */}
          <div
            className="rounded-2xl p-4 mb-4 text-center"
            style={{ backgroundColor: canAfford ? "#CCFBF1" : "#FEE2E2" }}
          >
            <p className="text-[#6B7280] mb-1" style={{ fontSize: "11px" }}>
              {canAfford ? "Cost" : "You need"}
            </p>
            <p
              className="font-bold"
              style={{
                fontSize: "28px",
                color: canAfford ? "#0D9488" : "#EF4444",
              }}
            >
              {canAfford ? reward.karmaCost.toLocaleString() : (reward.karmaCost - userKarma).toLocaleString()} Karma
            </p>
            {canAfford && (
              <p className="text-[#6B7280] mt-1" style={{ fontSize: "11px" }}>
                You'll have {(userKarma - reward.karmaCost).toLocaleString()} Karma remaining
              </p>
            )}
          </div>

          {/* Terms */}
          {reward.terms && reward.terms.length > 0 && (
            <div className="mb-6">
              <h4 className="text-[#1A1A1A] font-semibold mb-2" style={{ fontSize: "14px" }}>
                Terms & Conditions
              </h4>
              <ul className="space-y-1">
                {reward.terms.map((term, i) => (
                  <li key={i} className="text-[#6B7280] flex items-start gap-2" style={{ fontSize: "12px" }}>
                    <span className="text-[#0D9488]">•</span>
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-2">
            <button
              onClick={canAfford ? onRedeem : undefined}
              disabled={!canAfford}
              className="w-full h-14 rounded-xl text-white font-semibold transition-all"
              style={{
                background: canAfford
                  ? `linear-gradient(135deg, ${TIER_COLORS[reward.tier]}, ${TIER_COLORS[reward.tier]}CC)`
                  : "#E5E7EB",
                fontSize: "16px",
                opacity: canAfford ? 1 : 0.6,
                cursor: canAfford ? "pointer" : "not-allowed",
              }}
            >
              {canAfford ? "Redeem Now" : "Not Enough Karma"}
            </button>
            <button
              onClick={onClose}
              className="w-full h-12 rounded-xl font-medium border"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E5E7EB",
                color: "#6B7280",
                fontSize: "14px",
              }}
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

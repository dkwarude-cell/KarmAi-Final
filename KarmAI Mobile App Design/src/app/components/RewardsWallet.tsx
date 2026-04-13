import { motion } from "motion/react";
import { ArrowLeft, Gift, TrendingUp, Award, Zap, ChevronRight } from "lucide-react";
import { GamificationState } from "../types/gamification";

interface RewardsWalletProps {
  onClose: () => void;
  gamification: GamificationState;
}

export default function RewardsWallet({ onClose, gamification }: RewardsWalletProps) {
  return (
    <div className="w-[390px] h-[844px] bg-[#0A0A0F] relative flex flex-col">
      {/* Header */}
      <div className="px-5 pt-14 pb-4 border-b border-white/5">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <div>
            <h1 className="text-white font-bold" style={{ fontSize: "22px" }}>
              Rewards Wallet
            </h1>
            <p className="text-[#00CBA4]" style={{ fontSize: "11px", fontWeight: 600 }}>
              ✓ Real actions only • No fake points
            </p>
          </div>
        </div>

        {/* Points Summary */}
        <div className="grid grid-cols-3 gap-2">
          <div
            className="rounded-xl p-3 text-center"
            style={{ backgroundColor: "rgba(124, 92, 232, 0.15)" }}
          >
            <div className="text-[#7C5CE8] font-bold mb-0.5" style={{ fontSize: "20px" }}>
              {gamification.karmaPoints}
            </div>
            <div className="text-[#888899]" style={{ fontSize: "9px" }}>
              KARMA PTS
            </div>
          </div>
          <div
            className="rounded-xl p-3 text-center"
            style={{ backgroundColor: "rgba(0, 203, 164, 0.15)" }}
          >
            <div className="text-[#00CBA4] font-bold mb-0.5" style={{ fontSize: "20px" }}>
              {gamification.xp}
            </div>
            <div className="text-[#888899]" style={{ fontSize: "9px" }}>
              TOTAL XP
            </div>
          </div>
          <div
            className="rounded-xl p-3 text-center"
            style={{ backgroundColor: "rgba(240, 165, 0, 0.15)" }}
          >
            <div className="text-[#F0A500] font-bold mb-0.5" style={{ fontSize: "20px" }}>
              L{gamification.level}
            </div>
            <div className="text-[#888899]" style={{ fontSize: "9px" }}>
              LEVEL
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* Level Progress */}
        <div
          className="rounded-2xl p-4 mb-4 border-[0.5px]"
          style={{
            backgroundColor: "rgba(124, 92, 232, 0.1)",
            borderColor: "rgba(124, 92, 232, 0.3)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-white font-bold mb-0.5" style={{ fontSize: "16px" }}>
                {gamification.levelName}
              </div>
              <div className="text-[#888899]" style={{ fontSize: "11px" }}>
                250 XP to Connector
              </div>
            </div>
            <div className="text-4xl">🧭</div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-black/30 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#7C5CE8] to-[#00CBA4]"
              initial={{ width: 0 }}
              animate={{ width: "70%" }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[#666677]" style={{ fontSize: "9px" }}>
              1000 XP
            </span>
            <span className="text-[#666677]" style={{ fontSize: "9px" }}>
              1500 XP
            </span>
          </div>
        </div>

        {/* Earning Summary */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold" style={{ fontSize: "14px" }}>
              This Week's Earnings
            </h3>
            <div className="flex items-center gap-1">
              <TrendingUp size={12} className="text-[#00CBA4]" />
              <span className="text-[#00CBA4]" style={{ fontSize: "11px" }}>
                +28%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Places Visited", value: "7", icon: "📍", color: "#7C5CE8" },
              { label: "Karma Earned", value: "+180", icon: "⭐", color: "#F0A500" },
              { label: "Connections", value: "3", icon: "🤝", color: "#00CBA4" },
              { label: "Streak Days", value: "5", icon: "🔥", color: "#E85D30" },
            ].map((item, i) => (
              <div key={i} className="rounded-xl p-3" style={{ backgroundColor: "#1A1A26" }}>
                <div className="text-xl mb-1">{item.icon}</div>
                <div className="font-bold mb-0.5" style={{ fontSize: "16px", color: item.color }}>
                  {item.value}
                </div>
                <div className="text-[#666677]" style={{ fontSize: "10px" }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Rewards */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold" style={{ fontSize: "14px" }}>
              Available Rewards
            </h3>
            <span className="text-[#7C5CE8]" style={{ fontSize: "12px" }}>
              {gamification.rewards.filter((r) => !r.redeemed).length} offers
            </span>
          </div>

          <div className="space-y-2">
            {gamification.rewards
              .filter((r) => !r.redeemed)
              .map((reward) => (
                <div
                  key={reward.id}
                  className="rounded-xl p-4 border-[0.5px]"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    borderColor: "rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor:
                          reward.type === "discount"
                            ? "rgba(124, 92, 232, 0.2)"
                            : reward.type === "free-item"
                            ? "rgba(0, 203, 164, 0.2)"
                            : "rgba(240, 165, 0, 0.2)",
                      }}
                    >
                      {reward.type === "discount" && <Gift size={18} className="text-[#7C5CE8]" />}
                      {reward.type === "free-item" && <Award size={18} className="text-[#00CBA4]" />}
                      {reward.type === "event-pass" && <Zap size={18} className="text-[#F0A500]" />}
                    </div>

                    <div className="flex-1">
                      <div className="text-white font-bold mb-0.5" style={{ fontSize: "13px" }}>
                        {reward.title}
                      </div>
                      <div className="text-[#888899] mb-2" style={{ fontSize: "11px" }}>
                        {reward.description}
                      </div>
                      <div className="flex items-center justify-between">
                        <div
                          className="px-2.5 py-1 rounded-full"
                          style={{
                            backgroundColor: "rgba(124, 92, 232, 0.15)",
                            color: "#A890F0",
                            fontSize: "10px",
                            fontWeight: 600,
                          }}
                        >
                          {reward.pointsCost} Karma
                        </div>
                        <button
                          disabled={gamification.karmaPoints < reward.pointsCost}
                          className="px-4 py-1.5 rounded-lg font-medium transition-all"
                          style={{
                            backgroundColor:
                              gamification.karmaPoints >= reward.pointsCost
                                ? "#7C5CE8"
                                : "#2A2A3A",
                            color:
                              gamification.karmaPoints >= reward.pointsCost
                                ? "#FFFFFF"
                                : "#666677",
                            fontSize: "11px",
                          }}
                        >
                          {gamification.karmaPoints >= reward.pointsCost ? "Redeem" : "Locked"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Badges */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold" style={{ fontSize: "14px" }}>
              Earned Badges
            </h3>
            <span className="text-[#888899]" style={{ fontSize: "12px" }}>
              {gamification.badges.filter((b) => b.earnedAt).length} of{" "}
              {gamification.badges.length + 5}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {gamification.badges.map((badge) => (
              <div
                key={badge.id}
                className="rounded-xl p-3 text-center"
                style={{
                  backgroundColor: badge.earnedAt
                    ? "rgba(124, 92, 232, 0.15)"
                    : "rgba(255, 255, 255, 0.03)",
                  opacity: badge.earnedAt ? 1 : 0.5,
                }}
              >
                <div className="text-2xl mb-1">{badge.icon}</div>
                <div
                  className="font-medium"
                  style={{
                    fontSize: "9px",
                    color: badge.earnedAt ? "#A890F0" : "#666677",
                  }}
                >
                  {badge.name.split(" ")[0]}
                </div>
              </div>
            ))}
            {/* Locked badges */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={`locked-${i}`}
                className="rounded-xl p-3 text-center"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", opacity: 0.3 }}
              >
                <div className="text-2xl mb-1">🔒</div>
                <div className="text-[#666677] font-medium" style={{ fontSize: "9px" }}>
                  Locked
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Earn More */}
        <div
          className="mt-4 rounded-xl p-4 border-l-[3px]"
          style={{
            backgroundColor: "#1A1A26",
            borderLeftColor: "#00CBA4",
          }}
        >
          <div className="text-white font-semibold mb-2" style={{ fontSize: "12px" }}>
            💡 Real-world actions = Rewards
          </div>
          <div className="space-y-1.5">
            {[
              "Visit new places (GPS): +50 Karma",
              "Meet new people (verified): +30 Karma",
              "Complete drift mission: +100 Karma",
              "Weekly streak bonus: +20 Karma/day",
            ].map((tip, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-[#00CBA4]" />
                <span className="text-[#888899]" style={{ fontSize: "11px" }}>
                  {tip}
                </span>
              </div>
            ))}
          </div>
          <div
            className="mt-3 pt-3 border-t text-center"
            style={{ borderColor: "rgba(255, 255, 255, 0.05)" }}
          >
            <p className="text-[#7C5CE8] font-medium" style={{ fontSize: "10px" }}>
              🎯 No clicks tracked. Only real-world actions count.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { motion } from "motion/react";
import { CheckCircle2, Users, MapPin, TrendingUp } from "lucide-react";

interface SocialProofBannerProps {
  variant?: "compact" | "detailed";
}

export default function SocialProofBanner({ variant = "compact" }: SocialProofBannerProps) {
  if (variant === "compact") {
    return (
      <motion.div
        className="rounded-2xl p-4 border border-[#00CBA4]/30"
        style={{
          background: "linear-gradient(135deg, rgba(0, 203, 164, 0.1), rgba(0, 203, 164, 0.05))",
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <CheckCircle2 size={20} className="text-[#00CBA4]" />
          <div className="flex-1">
            <p className="text-white font-semibold" style={{ fontSize: "13px" }}>
              2,450+ verified students
            </p>
            <p className="text-[#888899]" style={{ fontSize: "11px" }}>
              Already exploring real-world connections
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Detailed variant
  return (
    <motion.div
      className="rounded-3xl p-5 border border-white/10"
      style={{
        background: "linear-gradient(135deg, rgba(124, 92, 232, 0.1), rgba(0, 0, 0, 0.3))",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle2 size={18} className="text-[#00CBA4]" />
        <h3 className="text-white font-bold" style={{ fontSize: "15px" }}>
          Trusted by students across India
        </h3>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Users size={14} className="text-[#7C5CE8]" />
            <p className="text-white font-bold" style={{ fontSize: "16px" }}>
              2.4k+
            </p>
          </div>
          <p className="text-[#888899]" style={{ fontSize: "9px" }}>
            Active Students
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <MapPin size={14} className="text-[#00CBA4]" />
            <p className="text-white font-bold" style={{ fontSize: "16px" }}>
              850+
            </p>
          </div>
          <p className="text-[#888899]" style={{ fontSize: "9px" }}>
            Places Verified
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp size={14} className="text-[#F0A500]" />
            <p className="text-white font-bold" style={{ fontSize: "16px" }}>
              98%
            </p>
          </div>
          <p className="text-[#888899]" style={{ fontSize: "9px" }}>
            Success Rate
          </p>
        </div>
      </div>

      {/* Testimonial Carousel */}
      <div
        className="rounded-xl p-3 border-l-[3px]"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderLeftColor: "#7C5CE8",
        }}
      >
        <div className="flex items-start gap-2 mb-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background: "linear-gradient(135deg, #7C5CE8, #A890F0)" }}
          >
            AK
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold" style={{ fontSize: "12px" }}>
              Arjun Kumar
            </p>
            <p className="text-[#888899]" style={{ fontSize: "10px" }}>
              IIT Bombay • Level 5 Explorer
            </p>
          </div>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-[#F0A500]" style={{ fontSize: "10px" }}>
                ★
              </span>
            ))}
          </div>
        </div>
        <p className="text-[#CCCCDD]" style={{ fontSize: "11px", lineHeight: "1.5" }}>
          "Finally an app that gets me <span className="text-white font-semibold">off my phone</span> and into real experiences. Met 3 amazing people this month!"
        </p>
      </div>

      {/* Verification Badge */}
      <div className="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-white/10">
        <div className="flex items-center gap-1">
          <CheckCircle2 size={12} className="text-[#00CBA4]" />
          <span className="text-[#888899]" style={{ fontSize: "9px" }}>
            GPS Verified
          </span>
        </div>
        <span className="text-[#444455]">•</span>
        <div className="flex items-center gap-1">
          <CheckCircle2 size={12} className="text-[#00CBA4]" />
          <span className="text-[#888899]" style={{ fontSize: "9px" }}>
            Real Actions Only
          </span>
        </div>
        <span className="text-[#444455]">•</span>
        <div className="flex items-center gap-1">
          <CheckCircle2 size={12} className="text-[#00CBA4]" />
          <span className="text-[#888899]" style={{ fontSize: "9px" }}>
            Privacy Protected
          </span>
        </div>
      </div>
    </motion.div>
  );
}

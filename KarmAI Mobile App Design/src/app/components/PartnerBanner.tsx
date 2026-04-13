import { motion } from "motion/react";
import { Building2, ChevronRight } from "lucide-react";

interface PartnerBannerProps {
  onClick: () => void;
}

export default function PartnerBanner({ onClick }: PartnerBannerProps) {
  return (
    <motion.div
      className="mx-5 mb-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <button
        onClick={onClick}
        className="w-full h-[56px] rounded-[12px] px-4 flex items-center gap-3 border-[1px] text-left"
        style={{
          background: "linear-gradient(90deg, #1A1028 0%, #0D1A18 100%)",
          borderColor: "#D97706",
          boxShadow: "0 2px 8px rgba(217, 119, 6, 0.2)",
        }}
      >
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: "rgba(217, 119, 6, 0.15)",
          }}
        >
          <Building2 size={20} className="text-[#D97706]" />
        </div>

        {/* Text */}
        <div className="flex-1">
          <p className="text-white font-bold mb-0.5" style={{ fontSize: "13px" }}>
            Own a cafe, club or venue?
          </p>
          <p className="text-[#0D9488]" style={{ fontSize: "11px" }}>
            Get discovered by students →
          </p>
        </div>

        {/* Arrow */}
        <ChevronRight size={20} className="text-[#D97706] flex-shrink-0" />
      </button>
    </motion.div>
  );
}

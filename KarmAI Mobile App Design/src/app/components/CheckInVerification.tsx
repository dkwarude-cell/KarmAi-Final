import { motion, AnimatePresence } from "motion/react";
import { MapPin, Navigation, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface CheckInVerificationProps {
  isOpen: boolean;
  onClose: () => void;
  placeName: string;
  distance: number;
  onVerify: () => void;
}

export default function CheckInVerification({
  isOpen,
  onClose,
  placeName,
  distance,
  onVerify,
}: CheckInVerificationProps) {
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVerifying(false);
      setVerified(false);
    }
  }, [isOpen]);

  const handleVerify = () => {
    setVerifying(true);
    // Simulate GPS verification
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
      setTimeout(() => {
        onVerify();
      }, 1500);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div>
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 z-40"
            style={{
              backgroundColor: "rgba(10, 10, 15, 0.8)",
              backdropFilter: "blur(12px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-50 rounded-t-[28px] border-t-[0.5px]"
            style={{
              backgroundColor: "#12121A",
              borderColor: "rgba(255, 255, 255, 0.08)",
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-4">
              <div className="w-10 h-1 rounded-full bg-[#2A2A3A]" />
            </div>

            <div className="px-6 pb-8">
              {!verified ? (
                <>
                  <div className="text-center mb-6">
                    <motion.div
                      className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center relative"
                      style={{ backgroundColor: "rgba(124, 92, 232, 0.15)" }}
                      animate={verifying ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {verifying ? (
                        <>
                          <Navigation size={32} className="text-[#7C5CE8]" />
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-[#7C5CE8]"
                            animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        </>
                      ) : (
                        <MapPin size={32} className="text-[#7C5CE8]" />
                      )}
                    </motion.div>

                    <h2 className="text-white font-bold mb-2" style={{ fontSize: "20px" }}>
                      {verifying ? "Verifying Location..." : "Check-in to Confirm Visit"}
                    </h2>

                    <p className="text-[#888899] mb-1" style={{ fontSize: "13px" }}>
                      {placeName}
                    </p>

                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor:
                            distance <= 100 ? "#00CBA4" : distance <= 200 ? "#F0A500" : "#E85D30",
                        }}
                      />
                      <span
                        className="font-medium"
                        style={{
                          fontSize: "12px",
                          color:
                            distance <= 100 ? "#00CBA4" : distance <= 200 ? "#F0A500" : "#E85D30",
                        }}
                      >
                        {distance}m away
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div
                    className="rounded-xl p-4 mb-6 border-l-[3px]"
                    style={{
                      backgroundColor: "#1A1A26",
                      borderLeftColor: "#7C5CE8",
                    }}
                  >
                    <div className="text-white font-medium mb-2" style={{ fontSize: "12px" }}>
                      📍 GPS Verification
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-1 h-1 rounded-full"
                          style={{ backgroundColor: distance <= 100 ? "#00CBA4" : "#666677" }}
                        />
                        <span className="text-[#888899]" style={{ fontSize: "11px" }}>
                          Must be within 100m of location
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-1 h-1 rounded-full"
                          style={{ backgroundColor: "#00CBA4" }}
                        />
                        <span className="text-[#888899]" style={{ fontSize: "11px" }}>
                          Earns Karma + XP rewards
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-1 h-1 rounded-full"
                          style={{ backgroundColor: "#00CBA4" }}
                        />
                        <span className="text-[#888899]" style={{ fontSize: "11px" }}>
                          Tracks bubble expansion
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={handleVerify}
                      disabled={verifying || distance > 100}
                      className="w-full h-12 rounded-xl font-semibold transition-all"
                      style={{
                        backgroundColor:
                          distance <= 100 && !verifying ? "#7C5CE8" : "#2A2A3A",
                        color: distance <= 100 && !verifying ? "#FFFFFF" : "#666677",
                        fontSize: "14px",
                      }}
                    >
                      {verifying ? "Verifying GPS..." : "Verify Check-in"}
                    </button>

                    {distance > 100 && (
                      <p className="text-center text-[#E85D30]" style={{ fontSize: "11px" }}>
                        Move closer to location to check-in
                      </p>
                    )}

                    <button
                      onClick={onClose}
                      className="w-full h-10 rounded-xl text-[#888899] font-medium"
                      style={{ fontSize: "13px" }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: "rgba(0, 203, 164, 0.15)" }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <CheckCircle size={40} className="text-[#00CBA4]" />
                  </motion.div>

                  <h2 className="text-white font-bold mb-2" style={{ fontSize: "22px" }}>
                    Check-in Verified! ✓
                  </h2>

                  <p className="text-[#888899]" style={{ fontSize: "13px" }}>
                    Unlocking rewards...
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

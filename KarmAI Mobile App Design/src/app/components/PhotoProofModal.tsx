import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Camera, MapPin, AlertCircle, CheckCircle2, Upload } from "lucide-react";

interface PhotoProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  placeName: string;
  distance: number; // in meters
  onVerify: (photoUrl: string) => void;
}

const springTransition = {
  type: "spring" as const,
  stiffness: 350,
  damping: 25,
  mass: 0.8,
};

export default function PhotoProofModal({ isOpen, onClose, placeName, distance, onVerify }: PhotoProofModalProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "checking" | "success" | "failed">("idle");
  const [gpsMatch, setGpsMatch] = useState<boolean | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setVerificationStatus("idle");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerify = async () => {
    if (!photoPreview) return;

    setIsVerifying(true);
    setVerificationStatus("checking");

    // Simulate GPS verification
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock GPS check (in production, this would verify EXIF data)
    const isGpsValid = distance < 100; // Within 100m
    setGpsMatch(isGpsValid);
    setVerificationStatus(isGpsValid ? "success" : "failed");
    setIsVerifying(false);

    if (isGpsValid) {
      setTimeout(() => {
        onVerify(photoPreview);
        onClose();
      }, 1500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-[100] flex items-end justify-center">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Bottom Sheet Modal */}
          <motion.div
            className="relative w-full rounded-t-[32px] overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(40px) saturate(180%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.8)",
              borderBottom: "none",
              boxShadow: "0 -8px 32px rgba(0, 0, 0, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.6)",
              maxHeight: "85vh",
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={springTransition}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Highlight Bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent)",
              }}
            />

            {/* Drag Handle */}
            <div className="flex justify-center pt-4 pb-3">
              <motion.div
                className="w-12 h-1.5 rounded-full"
                style={{
                  background: "linear-gradient(90deg, rgba(124, 92, 232, 0.3), rgba(124, 92, 232, 0.5), rgba(124, 92, 232, 0.3))",
                }}
                whileHover={{ scaleX: 1.1 }}
              />
            </div>

            {/* Content */}
            <div className="px-6 pb-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h2 className="text-[#1A1A1A] font-bold mb-1" style={{ fontSize: "20px" }}>
                    Photo Proof
                  </h2>
                  <p className="text-[#6B7280]" style={{ fontSize: "13px" }}>
                    Upload a photo from {placeName}
                  </p>
                </div>

                <motion.button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(0, 0, 0, 0.04)",
                  }}
                  whileHover={{ scale: 1.05, background: "rgba(0, 0, 0, 0.08)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={springTransition}
                >
                  <X size={18} className="text-[#6B7280]" />
                </motion.button>
              </div>

              {/* GPS Status */}
              <motion.div
                className="mb-5 p-4 rounded-2xl flex items-start gap-3"
                style={{
                  background: distance < 100 ? "rgba(16, 185, 129, 0.08)" : "rgba(239, 68, 68, 0.08)",
                  border: `1px solid ${distance < 100 ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)"}`,
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <MapPin size={18} className={distance < 100 ? "text-green-600" : "text-red-500"} />
                <div className="flex-1">
                  <p className="text-[#1A1A1A] font-semibold mb-0.5" style={{ fontSize: "13px" }}>
                    {distance < 100 ? "Within Range" : "Too Far Away"}
                  </p>
                  <p className="text-[#6B7280]" style={{ fontSize: "11px" }}>
                    You are {distance}m from {placeName}
                    {distance >= 100 && " • Move closer to verify"}
                  </p>
                </div>
              </motion.div>

              {/* Photo Upload Area */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {!photoPreview ? (
                  <motion.button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full aspect-[4/3] rounded-2xl flex flex-col items-center justify-center gap-3 border-2 border-dashed transition-all"
                    style={{
                      background: "rgba(255, 255, 255, 0.4)",
                      borderColor: "rgba(124, 92, 232, 0.3)",
                    }}
                    whileHover={{
                      scale: 1.01,
                      borderColor: "rgba(124, 92, 232, 0.5)",
                      background: "rgba(255, 255, 255, 0.5)",
                    }}
                    whileTap={{ scale: 0.99 }}
                    transition={springTransition}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, rgba(124, 92, 232, 0.15), rgba(124, 92, 232, 0.08))",
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Camera size={28} className="text-[#7C5CE8]" />
                    </motion.div>
                    <div className="text-center">
                      <p className="text-[#1A1A1A] font-semibold mb-1" style={{ fontSize: "14px" }}>
                        Take a Photo
                      </p>
                      <p className="text-[#6B7280]" style={{ fontSize: "12px" }}>
                        GPS data will be verified automatically
                      </p>
                    </div>
                  </motion.button>
                ) : (
                  <div className="relative">
                    <motion.div
                      className="w-full aspect-[4/3] rounded-2xl bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${photoPreview})`,
                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                      }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={springTransition}
                    />

                    {/* Verification Overlay */}
                    <AnimatePresence>
                      {verificationStatus !== "idle" && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl flex items-center justify-center"
                          style={{
                            background: "rgba(0, 0, 0, 0.6)",
                            backdropFilter: "blur(8px)",
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {verificationStatus === "checking" && (
                            <motion.div
                              className="flex flex-col items-center gap-3"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                            >
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                              >
                                <MapPin size={32} className="text-white" />
                              </motion.div>
                              <p className="text-white font-semibold" style={{ fontSize: "14px" }}>
                                Verifying GPS data...
                              </p>
                            </motion.div>
                          )}

                          {verificationStatus === "success" && (
                            <motion.div
                              className="flex flex-col items-center gap-3"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                            >
                              <motion.div
                                className="w-16 h-16 rounded-full flex items-center justify-center"
                                style={{
                                  background: "rgba(16, 185, 129, 0.2)",
                                }}
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 0.5 }}
                              >
                                <CheckCircle2 size={32} className="text-green-400" />
                              </motion.div>
                              <p className="text-white font-semibold" style={{ fontSize: "14px" }}>
                                Verified! ✓
                              </p>
                            </motion.div>
                          )}

                          {verificationStatus === "failed" && (
                            <motion.div
                              className="flex flex-col items-center gap-3 px-8"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                            >
                              <motion.div
                                className="w-16 h-16 rounded-full flex items-center justify-center"
                                style={{
                                  background: "rgba(239, 68, 68, 0.2)",
                                }}
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 0.5 }}
                              >
                                <AlertCircle size={32} className="text-red-400" />
                              </motion.div>
                              <p className="text-white font-semibold text-center" style={{ fontSize: "14px" }}>
                                GPS doesn't match location
                              </p>
                              <p className="text-white/80 text-center" style={{ fontSize: "11px" }}>
                                Please move closer to {placeName}
                              </p>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Change Photo Button */}
                    {verificationStatus === "idle" && (
                      <motion.button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute top-3 right-3 px-3 py-2 rounded-xl font-semibold flex items-center gap-2"
                        style={{
                          background: "rgba(0, 0, 0, 0.6)",
                          backdropFilter: "blur(8px)",
                          color: "#FFFFFF",
                          fontSize: "12px",
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Upload size={14} />
                        Change
                      </motion.button>
                    )}
                  </div>
                )}
              </motion.div>

              {/* Info Card */}
              <motion.div
                className="mt-4 p-3 rounded-xl flex items-start gap-2"
                style={{
                  background: "rgba(124, 92, 232, 0.06)",
                  border: "1px solid rgba(124, 92, 232, 0.12)",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <AlertCircle size={16} className="text-[#7C5CE8] mt-0.5" />
                <div>
                  <p className="text-[#1A1A1A] font-semibold mb-0.5" style={{ fontSize: "12px" }}>
                    Anti-Gaming Protection
                  </p>
                  <p className="text-[#6B7280]" style={{ fontSize: "11px", lineHeight: "1.5" }}>
                    We verify GPS metadata in your photo to ensure authentic check-ins
                  </p>
                </div>
              </motion.div>

              {/* Verify Button */}
              <motion.button
                onClick={handleVerify}
                disabled={!photoPreview || isVerifying || distance >= 100 || verificationStatus !== "idle"}
                className="w-full mt-5 h-14 rounded-2xl font-semibold flex items-center justify-center gap-2"
                style={{
                  background:
                    photoPreview && distance < 100 && verificationStatus === "idle"
                      ? "linear-gradient(135deg, #7C5CE8 0%, #9F7AEA 100%)"
                      : "rgba(200, 200, 200, 0.3)",
                  color:
                    photoPreview && distance < 100 && verificationStatus === "idle" ? "#FFFFFF" : "#9CA3AF",
                  boxShadow:
                    photoPreview && distance < 100 && verificationStatus === "idle"
                      ? "0 4px 16px rgba(124, 92, 232, 0.25)"
                      : "none",
                  fontSize: "15px",
                }}
                whileHover={
                  photoPreview && distance < 100 && verificationStatus === "idle" ? { scale: 1.02 } : {}
                }
                whileTap={
                  photoPreview && distance < 100 && verificationStatus === "idle" ? { scale: 0.98 } : {}
                }
                transition={springTransition}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {isVerifying ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <MapPin size={18} />
                    </motion.div>
                    <span>Verifying GPS...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    <span>Verify & Check In</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

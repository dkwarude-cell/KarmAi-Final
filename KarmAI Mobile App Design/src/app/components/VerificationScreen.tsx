import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Mail, Phone, ArrowRight, Check } from "lucide-react";

interface VerificationScreenProps {
  method: "email" | "phone";
  destination: string; // email address or phone number
  onVerify: () => void;
  onResend: () => void;
}

export default function VerificationScreen({
  method,
  destination,
  onVerify,
  onResend,
}: VerificationScreenProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }

    // Auto-verify when all filled
    if (newCode.every((digit) => digit !== "") && !isVerified) {
      setTimeout(() => {
        setIsVerifying(true);
        setTimeout(() => {
          setIsVerifying(false);
          setIsVerified(true);
          setTimeout(() => {
            onVerify();
          }, 1500);
        }, 1500);
      }, 300);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setCanResend(false);
    setCountdown(60);
    setCode(["", "", "", "", "", ""]);
    onResend();
  };

  return (
    <div className="w-[390px] h-[844px] bg-[#0A0A0F] overflow-hidden">
      <div className="px-6 pt-20 pb-8 h-full flex flex-col items-center">
        {/* Icon */}
        <motion.div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
          style={{
            background: isVerified
              ? "linear-gradient(135deg, #00CBA4, #00A385)"
              : "linear-gradient(135deg, #7C5CE8, #A890F0)",
            boxShadow: isVerified
              ? "0 20px 60px rgba(0, 203, 164, 0.4)"
              : "0 20px 60px rgba(124, 92, 232, 0.4)",
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          {isVerified ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Check size={36} className="text-white" />
            </motion.div>
          ) : method === "email" ? (
            <Mail size={32} className="text-white" />
          ) : (
            <Phone size={32} className="text-white" />
          )}
        </motion.div>

        {/* Title & Description */}
        <motion.h1
          className="text-white font-bold text-center mb-2"
          style={{ fontSize: "24px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {isVerified ? "Verified!" : "Enter verification code"}
        </motion.h1>

        <motion.p
          className="text-[#888899] text-center mb-8"
          style={{ fontSize: "14px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {isVerified
            ? "Your account has been verified successfully"
            : `We sent a 6-digit code to ${destination}`}
        </motion.p>

        {!isVerified && (
          <>
            {/* Code Input */}
            <motion.div
              className="flex gap-2 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {code.map((digit, i) => (
                <input
                  key={i}
                  id={`code-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-12 h-14 rounded-xl bg-[#1A1A26] text-white text-center border-2 outline-none transition-all"
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    borderColor: digit
                      ? isVerifying
                        ? "#00CBA4"
                        : "#7C5CE8"
                      : "rgba(255, 255, 255, 0.1)",
                  }}
                />
              ))}
            </motion.div>

            {/* Verifying Loader */}
            {isVerifying && (
              <motion.div
                className="flex items-center gap-2 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-[#7C5CE8]"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
                <p className="text-[#888899]" style={{ fontSize: "13px" }}>
                  Verifying...
                </p>
              </motion.div>
            )}

            {/* Resend Code */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-[#888899] mb-2" style={{ fontSize: "13px" }}>
                Didn't receive the code?
              </p>
              <button
                onClick={handleResend}
                disabled={!canResend}
                className="font-semibold transition-opacity"
                style={{
                  fontSize: "14px",
                  color: canResend ? "#7C5CE8" : "#444455",
                  opacity: canResend ? 1 : 0.5,
                }}
              >
                {canResend ? "Resend code" : `Resend in ${countdown}s`}
              </button>
            </motion.div>
          </>
        )}

        {/* Success Message */}
        {isVerified && (
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-5xl mb-4">🎉</div>
            <p className="text-[#00CBA4] font-semibold mb-2" style={{ fontSize: "15px" }}>
              Account verified successfully!
            </p>
            <p className="text-[#888899] text-center" style={{ fontSize: "13px" }}>
              Taking you to your personalized experience...
            </p>
          </motion.div>
        )}

        <div className="flex-1" />

        {/* Change Method */}
        {!isVerified && (
          <motion.p
            className="text-[#666677] text-center"
            style={{ fontSize: "12px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Wrong {method === "email" ? "email" : "number"}?{" "}
            <span className="text-[#7C5CE8]">Go back</span>
          </motion.p>
        )}
      </div>
    </div>
  );
}

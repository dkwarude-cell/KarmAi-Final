import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, ArrowRight, Eye, EyeOff, User, Loader2 } from "lucide-react";
import { supabase } from "../../../src/utils/supabase";

interface SignUpScreenProps {
  onSignUp: () => void;
  onLogin: () => void;
}

export default function SignUpScreen({ onSignUp, onLogin }: SignUpScreenProps) {
  const [signUpMethod, setSignUpMethod] = useState<"email" | "phone">("email");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignUp = async () => {
    if (!name || !password) {
      setErrorMsg("Name and Password are required");
      return;
    }
    
    setIsLoading(true);
    setErrorMsg("");
    try {
      if (signUpMethod === "email") {
        if (!email) throw new Error("Email is required");
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            }
          }
        });
        if (error) throw error;
      } else {
        if (!phone) throw new Error("Phone is required");
        const { data, error } = await supabase.auth.signUp({
          phone: `+91${phone}`,
          password,
          options: {
            data: {
              full_name: name,
            }
          }
        });
        if (error) throw error;
      }
      
      // Success! Proceed to next screen
      onSignUp();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[390px] h-[844px] bg-[#0A0A0F] overflow-y-auto">
      <div className="px-6 pt-16 pb-8 min-h-full flex flex-col">
        {/* Logo & Tagline */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #7C5CE8, #A890F0)",
              }}
            >
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <h1 className="text-white font-bold text-2xl">KarmAI</h1>
          </div>
          <p className="text-white text-xl font-semibold mb-2">
            Create your account
          </p>
          <p className="text-[#888899] text-sm">
            Break your bubble. Explore the real world.
          </p>
        </motion.div>

        {/* Social Proof Badge */}
        <motion.div
          className="flex items-center gap-2 mb-6 px-3 py-2 rounded-xl border border-[#00CBA4]/30 bg-[#00CBA4]/5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="text-[#00CBA4] text-lg">✓</div>
          <p className="text-[#00CBA4] text-xs flex-1">
            <span className="font-bold">2,450+ students</span> already exploring with KarmAI
          </p>
        </motion.div>

        {/* Sign Up Method Toggle */}
        <motion.div
          className="flex gap-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            onClick={() => setSignUpMethod("email")}
            className="flex-1 h-11 rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
            style={{
              backgroundColor: signUpMethod === "email" ? "rgba(124, 92, 232, 0.2)" : "rgba(255, 255, 255, 0.05)",
              borderWidth: "1px",
              borderColor: signUpMethod === "email" ? "#7C5CE8" : "rgba(255, 255, 255, 0.1)",
            }}
          >
            <Mail size={16} className={signUpMethod === "email" ? "text-[#7C5CE8]" : "text-[#666677]"} />
            <span className={signUpMethod === "email" ? "text-[#7C5CE8]" : "text-[#666677]"} style={{ fontSize: "13px", fontWeight: 500 }}>
              Email
            </span>
          </button>
          <button
            onClick={() => setSignUpMethod("phone")}
            className="flex-1 h-11 rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
            style={{
              backgroundColor: signUpMethod === "phone" ? "rgba(124, 92, 232, 0.2)" : "rgba(255, 255, 255, 0.05)",
              borderWidth: "1px",
              borderColor: signUpMethod === "phone" ? "#7C5CE8" : "rgba(255, 255, 255, 0.1)",
            }}
          >
            <Phone size={16} className={signUpMethod === "phone" ? "text-[#7C5CE8]" : "text-[#666677]"} />
            <span className={signUpMethod === "phone" ? "text-[#7C5CE8]" : "text-[#666677]"} style={{ fontSize: "13px", fontWeight: 500 }}>
              Phone
            </span>
          </button>
        </motion.div>

        {/* Input Fields */}
        <motion.div
          className="space-y-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div>
            <label className="text-[#888899] text-xs mb-2 block">Full Name</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full h-12 px-4 pl-11 rounded-xl bg-[#1A1A26] text-white border border-white/10 outline-none focus:border-[#7C5CE8] transition-all"
                style={{ fontSize: "14px" }}
              />
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666677]" />
            </div>
          </div>

          {signUpMethod === "email" ? (
            <div>
              <label className="text-[#888899] text-xs mb-2 block">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full h-12 px-4 pl-11 rounded-xl bg-[#1A1A26] text-white border border-white/10 outline-none focus:border-[#7C5CE8] transition-all"
                  style={{ fontSize: "14px" }}
                />
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666677]" />
              </div>
            </div>
          ) : (
            <div>
              <label className="text-[#888899] text-xs mb-2 block">Phone Number</label>
              <div className="flex gap-2">
                <div className="w-16 h-12 rounded-xl bg-[#1A1A26] border border-white/10 flex items-center justify-center">
                  <span className="text-white text-sm">+91</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98765 43210"
                  className="flex-1 h-12 px-4 rounded-xl bg-[#1A1A26] text-white border border-white/10 outline-none focus:border-[#7C5CE8] transition-all"
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[#888899] text-xs mb-2 block">Create Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="w-full h-12 px-4 pr-12 rounded-xl bg-[#1A1A26] text-white border border-white/10 outline-none focus:border-[#7C5CE8] transition-all"
                style={{ fontSize: "14px" }}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-[#666677]" />
                ) : (
                  <Eye size={18} className="text-[#666677]" />
                )}
              </button>
            </div>
            <p className="text-[#666677] text-xs mt-1">
              Use 8+ characters with letters & numbers
            </p>
          </div>
        </motion.div>

        {/* Error Message */}
        {errorMsg && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-xs text-center mb-4"
          >
            {errorMsg}
          </motion.p>
        )}

        {/* Sign Up Button */}
        <motion.button
          onClick={handleSignUp}
          disabled={isLoading}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#7C5CE8] to-[#A890F0] text-white font-semibold text-base flex items-center justify-center gap-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
             <Loader2 size={20} className="animate-spin" />
          ) : (
            <>
              Create Account
              <ArrowRight size={20} />
            </>
          )}
        </motion.button>

        {/* Divider */}
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex-1 h-[1px] bg-white/10" />
          <span className="text-[#666677] text-xs">OR</span>
          <div className="flex-1 h-[1px] bg-white/10" />
        </motion.div>

        {/* Social Sign Up */}
        <motion.button
          className="w-full h-12 rounded-xl bg-white text-[#0A0A0F] font-medium text-sm flex items-center justify-center gap-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign up with Google
        </motion.button>

        {/* Login Link */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <span className="text-[#888899] text-sm">Already have an account? </span>
          <button
            onClick={onLogin}
            className="text-[#7C5CE8] text-sm font-semibold"
          >
            Log in
          </button>
        </motion.div>

        {/* Terms */}
        <motion.p
          className="text-[#666677] text-xs text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          By signing up, you agree to our{" "}
          <span className="text-[#7C5CE8]">Terms of Service</span> and{" "}
          <span className="text-[#7C5CE8]">Privacy Policy</span>
        </motion.p>
      </div>
    </div>
  );
}

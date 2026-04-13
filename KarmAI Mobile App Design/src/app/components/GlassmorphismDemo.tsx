import { motion } from "motion/react";
import { Sparkles, Heart, TrendingUp, Award, Users, MapPin } from "lucide-react";
import GlassCard, { GlassBadge, GlassButton, GlassInput } from "./GlassCard";

/**
 * Glassmorphism Design System Demo
 * Showcases all premium glass UI components in KarmAI
 */
export default function GlassmorphismDemo() {
  return (
    <div className="mesh-gradient-bg min-h-screen p-6 overflow-y-auto">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
            Glassmorphism UI
          </h1>
          <p className="text-gray-600 text-sm">
            Premium iOS/Spatial Design System
          </p>
        </motion.div>

        {/* Glass Cards with Different Variants */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
            Glass Cards
          </h2>

          {/* Standard Glass Card */}
          <GlassCard variant="standard" hover>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">Standard Glass</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Default 60% opacity with 24px blur. Perfect for main content cards.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Strong Glass Card */}
          <GlassCard variant="strong" glow="purple">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                <TrendingUp size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">Strong Glass + Purple Glow</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  80% opacity, 32px blur with accent glow. Use for key features.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Subtle Glass Card */}
          <GlassCard variant="subtle" glow="teal">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <Heart size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">Subtle Glass + Teal Glow</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  40% opacity, 16px blur. Great for secondary elements and overlays.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Premium Badges */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
            Premium Badges
          </h2>

          <GlassCard variant="standard">
            <div className="flex flex-wrap gap-2">
              <GlassBadge variant="purple">
                AI POWERED
              </GlassBadge>
              <GlassBadge variant="teal">
                ✓ VERIFIED
              </GlassBadge>
              <GlassBadge variant="gold">
                NEW REWARD
              </GlassBadge>
              <GlassBadge variant="purple">
                WHY THIS?
              </GlassBadge>
            </div>
          </GlassCard>
        </div>

        {/* Glass Buttons */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
            Glass Buttons
          </h2>

          <GlassCard variant="standard">
            <div className="space-y-3">
              <GlassButton variant="primary" fullWidth>
                Primary Action
              </GlassButton>
              <GlassButton variant="accent" fullWidth>
                Secondary Action
              </GlassButton>
              <GlassButton variant="secondary" fullWidth>
                Tertiary Action
              </GlassButton>
            </div>
          </GlassCard>
        </div>

        {/* Glass Input */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
            Frosted Input
          </h2>

          <GlassCard variant="standard">
            <GlassInput
              placeholder="Search experiences..."
              type="text"
            />
          </GlassCard>
        </div>

        {/* Stats Grid with Stagger Animation */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
            Staggered Animations
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Award, label: "Karma", value: "450", color: "from-gold-500 to-gold-600" },
              { icon: Users, label: "Friends", value: "23", color: "from-teal-500 to-teal-600" },
              { icon: MapPin, label: "Places", value: "12", color: "from-purple-500 to-purple-600" },
              { icon: TrendingUp, label: "Streak", value: "5", color: "from-orange-500 to-orange-600" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  <GlassCard variant="standard" hover>
                    <div className="text-center p-2">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-2`}>
                        <Icon size={18} className="text-white" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-0.5">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-600 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Complex Card Example */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
            Complex Card Layout
          </h2>

          <GlassCard variant="strong" glow="purple" hover>
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <GlassBadge variant="purple" className="mb-2">
                    AI SUGGESTION
                  </GlassBadge>
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                    Philosophy Department
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Fills your top interest gap • 0.3km away
                  </p>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="flex items-center gap-4 py-3 px-4 rounded-2xl bg-white/40">
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-600">91%</div>
                  <div className="text-[10px] text-gray-600 font-medium">Match</div>
                </div>
                <div className="h-8 w-px bg-gray-300" />
                <div className="text-center">
                  <div className="text-xl font-bold text-teal-600">Free</div>
                  <div className="text-[10px] text-gray-600 font-medium">Cost</div>
                </div>
                <div className="h-8 w-px bg-gray-300" />
                <div className="text-center">
                  <div className="text-xl font-bold text-orange-600">3</div>
                  <div className="text-[10px] text-gray-600 font-medium">Active</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <GlassButton variant="secondary" className="flex-1">
                  Why This?
                </GlassButton>
                <GlassButton variant="primary" className="flex-1">
                  Add to Drift
                </GlassButton>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Footer Note */}
        <motion.div
          className="text-center text-xs text-gray-500 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          KarmAI Premium Glassmorphism Design System
        </motion.div>
      </div>
    </div>
  );
}

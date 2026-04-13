# KarmAI Glassmorphism Design System

## 🎨 Overview

This guide explains the premium glassmorphism UI design system implemented in KarmAI. The system features iOS/Spatial UI aesthetics with advanced micro-interactions, dynamic mesh gradients, and fluid spring physics animations.

---

## 🏗️ Architecture

### CSS Files
- **`/src/styles/glassmorphism.css`** - Core glass effects, mesh gradient, animations
- Automatically imported in `/src/styles/index.css`

### React Components
- **`GlassCard.tsx`** - Reusable glass card component
- **`GlassBottomNav.tsx`** - Floating glass dock navigation
- **`FloatingAICardGlass.tsx`** - Premium AI suggestion cards
- **`GlassmorphismDemo.tsx`** - Visual showcase of all elements

---

## 🎯 Design Principles

### 1. **Dynamic Mesh Gradient Background**
- Subtle, animated radial gradients using accent colors
- Auto-animates with `meshMove` keyframe (20s loop)
- Light, desaturated tones maintain readability

**Usage:**
```tsx
<div className="mesh-gradient-bg min-h-screen">
  {/* Your content */}
</div>
```

### 2. **Glass Card Variants**

#### **Standard Glass** (60% opacity)
Default for most content cards
```tsx
<GlassCard variant="standard">
  <p>Card content</p>
</GlassCard>
```

#### **Strong Glass** (80% opacity)
For primary/featured content
```tsx
<GlassCard variant="strong" glow="purple">
  <p>Important content</p>
</GlassCard>
```

#### **Subtle Glass** (40% opacity)
For secondary elements and backgrounds
```tsx
<GlassCard variant="subtle">
  <p>Background element</p>
</GlassCard>
```

### 3. **Glow Effects**
Add colored shadows to emphasize cards:
- `glow="purple"` - Primary actions
- `glow="teal"` - Success states
- `glow="orange"` - Attention items
- `glow="gold"` - Rewards

```tsx
<GlassCard variant="standard" glow="purple">
  {/* Glowing card */}
</GlassCard>
```

---

## 🧩 Component API

### **GlassCard**

```tsx
interface GlassCardProps {
  children: ReactNode;
  variant?: "standard" | "strong" | "subtle";
  hover?: boolean;              // Enable hover scale effect
  glow?: "purple" | "teal" | "orange" | "gold" | "none";
  innerGlow?: boolean;          // Add inner white reflection
  className?: string;           // Additional Tailwind classes
}
```

**Example:**
```tsx
<GlassCard
  variant="strong"
  glow="purple"
  hover={true}
  className="p-6"
>
  <h3>Premium Feature</h3>
  <p>With purple glow and hover effect</p>
</GlassCard>
```

---

### **GlassBadge**

Premium badge for AI labels, status indicators, and tags.

```tsx
interface GlassBadgeProps {
  children: ReactNode;
  variant?: "purple" | "teal" | "gold";
  className?: string;
}
```

**Example:**
```tsx
<GlassBadge variant="purple">
  AI POWERED
</GlassBadge>

<GlassBadge variant="teal">
  ✓ VERIFIED
</GlassBadge>

<GlassBadge variant="gold">
  NEW REWARD
</GlassBadge>
```

**Visual Style:**
- Uppercase text with wide tracking
- Semi-transparent background with backdrop blur
- Colored border and subtle glow shadow
- Auto-animates on mount with spring physics

---

### **GlassButton**

```tsx
interface GlassButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent";
  fullWidth?: boolean;
  className?: string;
}
```

**Example:**
```tsx
<GlassButton variant="primary" fullWidth>
  Take Action
</GlassButton>

<GlassButton variant="accent">
  Secondary
</GlassButton>
```

---

### **GlassInput**

Frosted glass text input field.

```tsx
<GlassInput
  placeholder="Search experiences..."
  type="text"
/>
```

**Features:**
- Blur background on focus
- Purple accent border on focus
- Soft purple glow shadow on focus
- Smooth transitions

---

### **GlassBottomNav**

Floating glass dock navigation (replaces standard bottom nav).

```tsx
<GlassBottomNav
  activeNav={navMode}
  onNavClick={(nav) => setNavMode(nav)}
/>
```

**Features:**
- Pill-shaped floating dock with strong blur
- Animated active state with `layoutId` transitions
- Glowing purple background for active tab
- Pulsing dot indicator below active tab
- Staggered mount animation
- Subtle ambient glow beneath dock

---

### **FloatingAICardGlass**

Premium AI suggestion card with advanced animations.

```tsx
<FloatingAICardGlass
  title="Philosophy Department"
  subtitle="Fills your top interest gap • Free"
  badge="AI SUGGESTION"
  x={30}
  y={40}
  onClick={handleClick}
  onDismiss={handleDismiss}
/>
```

**Features:**
- Strong glass effect with purple glow
- Floating animation (vertical bob)
- Draggable with elastic bounce
- Animated connecting line to map marker
- Pulsing dot at connection point
- Sparkles icon next to badge
- Glossy highlight strip at top
- Spring physics on all interactions

---

## 🎨 CSS Utility Classes

### Glass Effects
```css
.glass-card            /* Standard 60% opacity */
.glass-card-strong     /* Strong 80% opacity */
.glass-card-subtle     /* Subtle 40% opacity */
.glass-dock            /* Floating dock style */
.glass-badge           /* Purple badge */
.glass-badge-teal      /* Teal badge */
.glass-badge-gold      /* Gold badge */
.glass-overlay         /* Blur backdrop for modals */
.glass-button          /* Glossy button */
.glass-input           /* Frosted input field */
```

### Glow Shadows
```css
.glass-glow-purple     /* Purple accent shadow */
.glass-glow-teal       /* Teal accent shadow */
```

### Animations
```css
.glass-float           /* Floating bob animation */
```

---

## 🎬 Animation Patterns

### Spring Physics Transitions
All components use spring physics for natural motion:

```tsx
transition={{
  type: "spring",
  stiffness: 300,
  damping: 20,
  mass: 0.8,
}}
```

**Parameters:**
- `stiffness: 300-400` - Fast, responsive
- `damping: 20-30` - Smooth settling
- `mass: 0.8-1.0` - Weight feel

### Staggered List Animations
For cards in a list (leaderboards, matches, etc.):

```tsx
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{
      delay: index * 0.1,  // Stagger by 100ms
      type: "spring",
      stiffness: 300,
      damping: 20,
    }}
  >
    {/* Item content */}
  </motion.div>
))}
```

### Page Transitions
Standard entry animation for views:

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.98, y: 10 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{
    type: "spring",
    stiffness: 300,
    damping: 30,
  }}
>
  {/* Page content */}
</motion.div>
```

### Button Press Effect
Consistent across all interactive elements:

```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.97 }}
  transition={{
    type: "spring",
    stiffness: 400,
    damping: 25,
  }}
>
  Click Me
</motion.button>
```

---

## 🎯 When to Use Each Variant

### **Standard Glass**
- Profile cards
- Place suggestions
- Daily drift cards
- Stats dashboards

### **Strong Glass**
- Featured recommendations
- AI insights
- Active goals
- Premium rewards

### **Subtle Glass**
- Background overlays
- Secondary info panels
- Supporting content
- Disabled states

### **Purple Glow**
- AI-powered features
- Primary actions
- Active selections

### **Teal Glow**
- Success states
- Verified content
- Completed items

### **Gold Glow**
- Rewards
- Achievements
- Special offers

---

## 📐 Layout Best Practices

### Card Padding
```tsx
<GlassCard className="p-5">      {/* Standard */}
<GlassCard className="p-6">      {/* Comfortable */}
<GlassCard className="p-4">      {/* Compact */}
```

### Border Radius
```tsx
<GlassCard className="rounded-2xl">  {/* Standard - 16px */}
<GlassCard className="rounded-3xl">  {/* Friendly - 24px */}
<GlassCard className="rounded-xl">   {/* Subtle - 12px */}
```

### Spacing Between Cards
```tsx
<div className="space-y-4">    {/* 16px gap */}
<div className="space-y-3">    {/* 12px gap */}
<div className="space-y-6">    {/* 24px gap for sections */}
```

---

## 🎨 Color System

### Text Colors
```tsx
className="text-gray-900"    // Primary headings (#0F172A)
className="text-gray-600"    // Body text (#475569)
className="text-gray-500"    // Secondary text (#64748B)
className="text-gray-400"    // Tertiary/placeholder (#94A3B8)
```

### Accent Gradients
```tsx
// Purple (Primary)
className="bg-gradient-to-br from-purple-500 to-purple-600"

// Teal (Success)
className="bg-gradient-to-br from-teal-500 to-teal-600"

// Orange (Attention)
className="bg-gradient-to-br from-orange-500 to-orange-600"

// Gold (Rewards)
className="bg-gradient-to-br from-gold-500 to-gold-600"
```

---

## ♿ Accessibility

### High Contrast Mode
Automatically increases glass opacity for better readability:

```css
@media (prefers-contrast: high) {
  .glass-card {
    background: rgba(255, 255, 255, 0.95);
    border-color: rgba(0, 0, 0, 0.2);
  }
}
```

### Reduced Motion
Disables animations for users who prefer reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  .mesh-gradient-bg::before,
  .glass-float {
    animation: none;
  }
}
```

### Touch Targets
Minimum 44px height for all interactive elements:

```tsx
<GlassButton className="h-11">    {/* 44px */}
<GlassButton className="h-12">    {/* 48px */}
```

### Text Contrast
All text maintains WCAG AA contrast ratios:
- Gray-900 on white glass: 15.5:1 (AAA)
- Gray-600 on white glass: 7.2:1 (AA)

---

## 🚀 Performance Tips

### Backdrop Filter Optimization
- Use sparingly (max 3-4 layers stacked)
- Avoid on frequently updating elements
- Test on lower-end devices

### Animation Performance
- Use `will-change` only when necessary
- Prefer `transform` and `opacity` properties
- Avoid animating `backdrop-filter` directly

### Mesh Gradient
- CSS-only animation, no JS overhead
- Pauses when page not visible
- Can be disabled via `prefers-reduced-motion`

---

## 📱 Mobile Optimization

### iOS Safari Compatibility
- Uses `-webkit-backdrop-filter` prefix
- Tested on iOS 15+ and Safari 15+
- Fallback for older browsers maintains readability

### Touch Interactions
- Larger tap targets (min 44px)
- Visual feedback on `whileTap`
- Disabled hover effects on touch devices (can add via media query)

---

## 🎓 Migration Guide

### Converting Existing Components

#### Before (Old Light Theme):
```tsx
<div className="rounded-2xl p-4 border bg-white"
     style={{ borderColor: "#E5E7EB", boxShadow: "var(--shadow-md)" }}>
  <h3>Card Title</h3>
</div>
```

#### After (Glassmorphism):
```tsx
<GlassCard variant="standard" className="p-4">
  <h3>Card Title</h3>
</GlassCard>
```

### Converting Badges

#### Before:
```tsx
<div className="px-2 py-1 rounded-full"
     style={{ backgroundColor: "rgba(124, 92, 232, 0.1)", color: "#7C5CE8" }}>
  AI POWERED
</div>
```

#### After:
```tsx
<GlassBadge variant="purple">
  AI POWERED
</GlassBadge>
```

---

## 🎨 Complete Example

```tsx
import { motion } from "motion/react";
import GlassCard, { GlassBadge, GlassButton } from "./components/GlassCard";
import { Sparkles } from "lucide-react";

function FeatureCard() {
  return (
    <div className="mesh-gradient-bg min-h-screen p-6">
      <GlassCard
        variant="strong"
        glow="purple"
        hover={true}
        className="p-6 max-w-md mx-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <GlassBadge variant="purple">
            <Sparkles size={12} className="inline mr-1" />
            AI SUGGESTION
          </GlassBadge>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-2">
          Philosophy Department
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          Fills your top interest gap and it's free • 0.3km away
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "Match", value: "91%", color: "purple" },
            { label: "Cost", value: "Free", color: "teal" },
            { label: "Active", value: "3", color: "orange" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center p-3 rounded-2xl bg-white/40"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`text-lg font-bold text-${stat.color}-600`}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
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
      </GlassCard>
    </div>
  );
}
```

---

## 🎯 Testing Checklist

- [ ] Mesh gradient animates smoothly
- [ ] Glass cards maintain readability over gradient
- [ ] Buttons respond with spring physics
- [ ] Badges animate on mount
- [ ] Navigation dock floats properly
- [ ] Text contrast meets WCAG AA
- [ ] Touch targets ≥ 44px
- [ ] Works in iOS Safari
- [ ] Reduced motion respected
- [ ] High contrast mode supported

---

## 📚 Resources

- **Design Inspiration**: iOS 18, visionOS, Spatial UI
- **Animation Library**: Framer Motion 12.23.24
- **CSS Specs**: Backdrop Filter (CSS Filter Effects Module)
- **Accessibility**: WCAG 2.1 Level AA

---

**Created for KarmAI** • Premium Glassmorphism Design System

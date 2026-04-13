# KarmAI Professional Light Theme Guide

## Overview
This guide defines the professional light theme for KarmAI app, ensuring consistency across all screens and ready for Play Store deployment.

## Color Palette

### Primary Colors
- **Background Primary**: `#FFFFFF` (white) - Main app background
- **Background Secondary**: `#F8F9FA` - Sections, secondary backgrounds
- **Background Tertiary**: `#F5F6F7` - Subtle differentiation

### Text Colors
- **Text Primary**: `#1A1A1A`, `#2D3748` - Main text, headings
- **Text Secondary**: `#6B7280`, `#718096` - Secondary text, descriptions
- **Text Tertiary**: `#9CA3AF`, `#A0AEC0` - Placeholders, disabled text

### Border & Divider Colors
- **Border Light**: `#F3F4F6` - Very subtle borders
- **Border Default**: `#E5E7EB` - Standard borders
- **Border Medium**: `#CBD5E0` - Emphasized borders

### Accent Colors (Keep from original)
- **Purple**: `#7C3AED` - Primary actions, active states
- **Teal**: `#0D9488` - Success, positive actions
- **Orange**: `#FF6B35` - Campus mode indicator
- **Blue**: `#4A90E2` - City mode indicator
- **Gold**: `#D97706` - Rewards, premium features
- **Green**: `#10B981` - Success states
- **Red**: `#EF4444` - Errors, warnings

### Shadow Tokens
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-md: 0 2px 8px rgba(0, 0, 0, 0.05)
--shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.08)
--shadow-xl: 0 8px 32px rgba(0, 0, 0, 0.1)
```

## Component Patterns

### Cards
```tsx
// Light theme card
<div className="rounded-[20px] p-4 bg-white border" style={{
  borderColor: "#E5E7EB",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
}}>
  <h3 className="text-[#1A1A1A] font-bold mb-2" style={{ fontSize: "15px" }}>
    Card Title
  </h3>
  <p className="text-[#6B7280]" style={{ fontSize: "13px" }}>
    Card description text
  </p>
</div>
```

### Buttons

#### Primary Button
```tsx
<button className="px-6 py-3 rounded-xl bg-[#7C3AED] text-white font-semibold" style={{
  fontSize: "14px",
  boxShadow: "0 4px 12px rgba(124, 58, 237, 0.3)"
}}>
  Primary Action
</button>
```

#### Secondary Button
```tsx
<button className="px-6 py-3 rounded-xl bg-white border text-[#6B7280] font-semibold" style={{
  fontSize: "14px",
  borderColor: "#E5E7EB",
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)"
}}>
  Secondary Action
</button>
```

### Input Fields
```tsx
<input 
  className="w-full h-11 px-4 rounded-xl border bg-white text-[#1A1A1A] placeholder:text-[#9CA3AF]" 
  style={{
    borderColor: "#E5E7EB",
    fontSize: "14px"
  }}
  placeholder="Enter text..."
/>
```

### Badges/Pills
```tsx
<div className="inline-flex px-3 py-1 rounded-full" style={{
  backgroundColor: "rgba(124, 58, 237, 0.1)",
  border: "1px solid rgba(124, 58, 237, 0.2)"
}}>
  <span className="text-[#7C3AED] font-semibold" style={{ fontSize: "11px" }}>
    BADGE TEXT
  </span>
</div>
```

## Screen Backgrounds

### Authentication Screens
```tsx
<div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF]">
  {/* Content */}
</div>
```

### Main App Container
```tsx
<div className="w-[390px] h-[844px] bg-white rounded-[32px]" style={{
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)"
}}>
  {/* Content */}
</div>
```

### Content Area
```tsx
<div className="bg-[#F8F9FA]">
  {/* Scrollable content */}
</div>
```

## Navigation

### Top Bar
```tsx
<div className="h-[56px] px-5 flex items-center justify-between bg-white border-b" style={{
  borderColor: "#E5E7EB"
}}>
  {/* Nav items */}
</div>
```

### Bottom Navigation
```tsx
<div className="h-[80px] border-t bg-white" style={{
  borderColor: "#E5E7EB",
  boxShadow: "0 -1px 3px rgba(0, 0, 0, 0.05)"
}}>
  {/* Nav items */}
</div>
```

## Conversion Checklist

### Replace Dark Backgrounds
- `#0A0A0F` → `#FFFFFF` or `#F8F9FA`
- `#111118` → `#FFFFFF`
- `#1A1A1A` (when used as bg) → `#F8F9FA`
- `rgba(255, 255, 255, 0.03)` → `#FFFFFF` with border

### Replace Dark Text
- `#FFFFFF` (text) → `#1A1A1A`
- `#AAAACC` → `#6B7280`
- `#888899` → `#9CA3AF`
- `#666677` → `#A0AEC0`

### Replace Dark Borders
- `#222233` → `#E5E7EB`
- `#333344` → `#CBD5E0`
- `rgba(255, 255, 255, 0.08)` → `#E5E7EB`
- `rgba(255, 255, 255, 0.1)` → `#CBD5E0`

### Update Shadows
- Dark glows (0 0 20px color) → Subtle shadows (0 2px 8px rgba(0,0,0,0.05))
- Remove backdrop-filter blur effects or reduce opacity
- Use elevation shadows instead of glows

## Accessibility

### Contrast Ratios
- Ensure minimum 4.5:1 for normal text
- Ensure minimum 3:1 for large text (18px+)
- Ensure minimum 3:1 for UI components

### Focus States
```tsx
// Add visible focus rings
focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2
```

## Special Cases

### Partner Dashboard
- Background: `#F8F9FA`
- Cards: White with `#E5E7EB` borders
- Metrics: Use accent colors (purple, teal, gold)
- Heatmap: Keep color intensity but on white background

### Campus vs City Mode
- Campus: Orange accent `#FF6B35`
- City: Blue accent `#4A90E2`
- Both use same light background

### Drift Destinations
- White cards with colored top borders (3px)
- Partner badge: Accent color background with 10% opacity
- Subtle shadows instead of glows

## Implementation Priority

1. ✅ App.tsx (main container)
2. ✅ PartnerDashboard.tsx
3. ✅ WithinCampusView.tsx (partially done)
4. OutsideCampusView.tsx
5. Bottom sheets (UniversalBottomSheet.tsx)
6. All overlay screens
7. Auth screens (LoginScreen, SignUpScreen, etc.)
8. Settings and Profile screens
9. Rewards and Leaderboard
10. Map components

## Testing Checklist

- [ ] All text is readable (good contrast)
- [ ] All interactive elements have clear hover/active states
- [ ] Borders are visible but not overwhelming
- [ ] Shadows provide subtle depth
- [ ] Accent colors pop against light backgrounds
- [ ] No dark backgrounds remaining
- [ ] Consistent spacing and padding
- [ ] Professional appearance for Play Store screenshots

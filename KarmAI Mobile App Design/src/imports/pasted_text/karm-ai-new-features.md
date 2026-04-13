I have an existing dark-themed mobile app called Karm AI (KarmAI).
Do NOT change any existing screens, colors, fonts, navigation, or components.
Only ADD the following new screens and micro-components described below.
Maintain exact design language: background #0A0A0F, cards #111118, 
purple #7C3AED, teal #0D9488, gold #D97706, font Inter, 
card radius 16px, glow effects on active elements.

═══════════════════════════════════════════════
GAP 1 FIX — CONVERSATIONAL BOOKING UI (8.5 → 10)
═══════════════════════════════════════════════

ADD: "AI Concierge" chat screen accessible by tapping the search bar 
on the home screen.

Screen layout (375x812px):

TOP BAR:
- Back arrow, "KarmBot Concierge" bold white center
- Subtitle: "Understands time, budget & your bubble" in teal small text
- Top right: small purple pill showing "GPT-4 powered"

CHAT AREA (scrollable, takes 75% of screen height):
Background #0A0A0F with subtle grid pattern.

Show 4 pre-built conversation bubbles as examples already in the chat:

BUBBLE 1 — User message (right aligned):
Dark purple bubble #2D1B69, white text, rounded 18px:
"Book me a study room for 3 people, 2 hours, quiet, under ₹100"

BUBBLE 2 — AI response (left aligned):
Dark card #111118, teal left border 3px, rounded 18px:
Show structured response card INSIDE the bubble containing:
  - Header: "Found 3 options for you" in white bold
  - 3 mini result cards stacked, each showing:
    Room name | Capacity icon | Price | Noise level dot (green=quiet)
    Bottom of each card: teal "Book Now" micro-button
  - Small footnote: "All within ₹100 · Quiet zones · 2hr slots available"

BUBBLE 3 — User message:
"What's for lunch today? I have ₹150 and I'm vegetarian"

BUBBLE 4 — AI response card:
Inside bubble, show:
  - "Best combo for ₹150 🌱" header
  - 3 food items in a horizontal scroll (item name, price, counter location)
  - Total: ₹142 shown in teal
  - "Usually ₹165 · Saving ₹23 today" in gold small text (price prediction)
  - Green pill: "✓ Matches your diet"

BOTTOM INPUT BAR (fixed):
- Dark input field #1A1A2E, placeholder: 
  "Ask anything... time, budget, food, rooms, events"
- Left: microphone icon in teal circle
- Right: send button in purple gradient circle
- Above input: 4 quick-prompt chips in scrollable row:
  "Best combo under ₹100" | "Free events today" | 
  "Study room now" | "Break my bubble"
  (pill chips, outlined #2A2A3E, teal text)

═══════════════════════════════════════════════
GAP 2 FIX — COLLABORATIVE DRIFTS (missing → 10)
═══════════════════════════════════════════════

ADD: "Squad Drift" screen accessible from the People tab in bottom nav.

Screen layout:

TOP BAR:
- "Squad Drift" bold white, subtitle "Drift together, grow together" gray
- Top right: "+ Invite" button in teal outlined pill

SECTION 1 — Active Squad Card (full width, 120px height):
Background gradient #1A1028 to #0D1828, rounded 16px, purple glow border:
- Left: 4 overlapping circular avatars (colored initials: A, R, P, M)
- Center: "Team AMD · 4 members" white bold, "All online now" teal small dot + text
- Right: "Start Drift →" filled purple button

SECTION 2 — "Find Your Overlap" card:
Title "Where your interests collide" white bold.
Show a Venn-diagram-style visual using 3 overlapping colored circles:
  - Circle 1 (purple, labeled "You"): tags — AI, Coffee, Music
  - Circle 2 (teal, labeled "Aryan"): tags — Design, Coffee, Photography  
  - Circle 3 (gold, labeled "Priya"): tags — Theatre, Music, Art
  - OVERLAP CENTER (white glow): "Coffee + Music" — this is highlighted
    with a bright intersection and text "Best Squad Drift Zone"

SECTION 3 — AI Suggested Squad Drifts (3 cards, full width each):

Card 1 (purple left border):
- "Jazz & Espresso Evening" title white bold
- Venue: "The Jazz Club · 0.3km" with map pin icon
- Tags row: "Music ✓" "Coffee ✓" "All 4 interested"
- Bottom row: "Free · 2hrs · Tonight 7PM" + 
  "91% Squad Compatibility" in teal pill
- Two buttons side by side: "Why This?" outlined | "Squad Up" filled purple

Card 2 (teal left border):
- "Photography Walk + Chai" 
- "Heritage District · 15min walk"
- Tags: "Photography ✓" "Outdoor ✓" "3/4 interested"
- "Free · 1.5hrs · Tomorrow 5PM" + "84% Squad Compatibility"

Card 3 (gold left border):
- "Open Mic Night"
- "Black Box Theatre · On campus"
- Tags: "Theatre ✓" "Music ✓" "Art ✓" "All 4 interested"
- "Free · 3hrs · Saturday" + "96% Squad Compatibility"

SECTION 4 — Squad Bubble Impact mini card:
Dark card, full width, shows:
- Title "Your Squad's Combined Bubble" small white
- A mini horizontal bar showing:
  "Solo: 23% explored" (short purple bar)
  "Squad: 41% explored" (longer teal bar, glowing)
- Small text: "Drifting together expands your world 2x faster"

═══════════════════════════════════════════════
GAP 3 FIX — ACCESSIBILITY LAYER (missing → 10)
═══════════════════════════════════════════════

ADD: Accessibility settings panel — accessible via Profile tab → 
"Accessibility" row.

Screen layout (bottom sheet modal, 75% screen height, slides up):

HEADER:
- Drag handle pill top center (gray)
- "Accessibility & Comfort" bold white, 
  subtitle "Karm AI adapts to you" teal small

SECTION 1 — "How You Experience Campus":
Title in gray caps small "MOBILITY & PHYSICAL"
3 toggle rows, each with icon + label left, toggle right:
  - Wheelchair icon: "Wheelchair Accessible Routes Only" 
    (toggle ON, teal active)
  - Eye icon: "Visual Assistance Mode" 
    (larger text, high contrast, screen reader hints)
  - Ear icon: "Hearing Support" 
    (show visual alerts, no audio-only info)

SECTION 2 — "Cognitive & Sensory":
Title in gray caps "SENSORY PREFERENCES"
  - Brain icon: "Low Stimulation Mode" toggle
    Subtext: "Quieter venues, smaller groups, calmer spaces"
  - Clock icon: "Extra Decision Time" toggle
    Subtext: "Longer to accept/skip drifts, no expiry pressure"
  - Group icon: "Introvert Mode" toggle — already ON shown
    Subtext: "Max 4 people, seated events, no cold-crowd venues"

SECTION 3 — "Display":
Title "DISPLAY & READING"
  - Text size slider: Small → Medium (active) → Large → XL
  - Contrast toggle: "High Contrast Mode"
  - Motion toggle: "Reduce Animations" 
    Subtext: "Fewer transitions, no pulsing effects"

SECTION 4 — Active Filters Summary card:
Dark teal background card, rounded 12px:
"Currently filtering: Wheelchair routes · Introvert mode · Medium text"
Small teal text: "These apply to ALL recommendations automatically"

SAVE button: Full width, purple gradient, "Save Preferences" bold white.

═══════════════════════════════════════════════
GAP 4 FIX — PREDICTIVE PLANNING CARD (bonus +0.3)
═══════════════════════════════════════════════

ADD: On the existing Today/Overview tab, insert ONE new card between 
the bubble map and the existing daily drift cards.

Card design (full width, 130px, rounded 16px, background #0F0F1A):
Left border 3px gold. 

HEADER ROW:
- Hourglass/predict icon in gold circle (24px)  
- "Your Usual Tuesday" bold white
- "Predicted" pill in gold outline top right

CONTENT:
Show a mini horizontal timeline with 4 stops connected by dotted line:
  Stop 1: "9AM · Counter 2" (gray, crossed out subtly)
  Stop 2: "11AM · Library" (gray)
  Stop 3: "2PM · Coding Club" (gray)
  Stop 4: "?" (gold pulsing dot)

Below timeline, an AI suggestion box (dark #1A1A14, gold left border):
"Instead of Coding Club → Philosophy talk at 2PM 
 Same time slot · Same building · 0 extra effort"
Small: "3 students from your network attending"

Two buttons: "Keep My Routine" gray outlined | "Take the Drift" gold filled

═══════════════════════════════════════════════
GAP 5 FIX — CARBON & WELLNESS MICRO-LAYER (bonus)
═══════════════════════════════════════════════

ADD: Inside the existing Daily Drift card (do not resize it), 
add a slim 28px info strip at the very bottom of the card 
with 3 micro-stats separated by dividers:

  🌱 "Low carbon drift"  |  🚶 "8 min walk"  |  ☀️ "Outdoor zone"

Use icon + tiny text in gray. Strip background slightly darker 
than the card (#0D0D14). Top border of strip: 1px #1E1E2E.
This adds environmental and wellness context without adding a new screen.

═══════════════════════════════════════════════
FINAL CHECK — DO NOT CHANGE:
═══════════════════════════════════════════════
- Existing home screen layout
- Existing bubble map visualization  
- Existing bottom navigation bar
- Existing color palette
- Existing partner dashboard screens
- Existing creator studio screens
- Existing drift history / fingerprint radar
- Any existing typography or spacing

Only ADD. Never replace. Never resize existing elements.
The 5 additions above should feel like they were always part of 
the original design — native, not bolted on.
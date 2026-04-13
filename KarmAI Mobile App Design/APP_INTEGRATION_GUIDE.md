# App.tsx Integration Guide - Creator Studio & Feedback Loop

## Step 1: Import New Components and Types

Add these imports at the top of `App.tsx`:

```typescript
// NEW: Creator Studio & Feedback Loop
import ClubCreatorStudio from "./components/ClubCreatorStudio";
import DiscoveryFeedbackLoop from "./components/DiscoveryFeedbackLoop";
import type { GeneratedCampaign } from "./types/creator";
import type { FeedbackData } from "./types/feedback";
```

---

## Step 2: Add New State Variables

Add these state hooks after the existing state declarations in `App.tsx`:

```typescript
// NEW: Club Creator Studio State
const [showCreatorStudio, setShowCreatorStudio] = useState(false);
const [publishedCampaigns, setPublishedCampaigns] = useState<GeneratedCampaign[]>([]);

// NEW: Discovery Feedback Loop State
const [showFeedbackLoop, setShowFeedbackLoop] = useState(false);
const [feedbackContext, setFeedbackContext] = useState<{
  type: "completed_drift" | "dismissed_suggestion";
  placeName: string;
  placeCategory: string;
}>({
  type: "completed_drift",
  placeName: "",
  placeCategory: "",
});
const [userFeedbackHistory, setUserFeedbackHistory] = useState<FeedbackData[]>([]);
```

---

## Step 3: Add Handler Functions

Add these handler functions before the return statement in `App.tsx`:

```typescript
// Handler: Publish Club Campaign
const handlePublishCampaign = (campaign: GeneratedCampaign) => {
  const fullCampaign: GeneratedCampaign = {
    ...campaign,
    id: `campaign-${Date.now()}`,
    clubId: userProfile.clubAdminFor?.[0] || "photography-club",
    clubName: "Photography Club",
    createdAt: new Date(),
    published: true,
    karmaReward: {
      studentAttendance: 100, // Students earn 100 karma for attending
      clubMilestone: 500, // Club earns 500 karma at 10+ attendees
    },
  };

  setPublishedCampaigns((prev) => [...prev, fullCampaign]);

  // Award karma to club admin for creating campaign
  setGamification((prev) => ({
    ...prev,
    karmaPoints: prev.karmaPoints + 50,
    xp: prev.xp + 100,
  }));

  console.log("✅ Campaign published:", fullCampaign);
};

// Handler: Submit Discovery Feedback
const handleSubmitFeedback = (feedback: FeedbackData) => {
  const fullFeedback: FeedbackData = {
    ...feedback,
    id: `feedback-${Date.now()}`,
    userId: userProfile.name,
    placeId: checkInPlace?.id || "unknown",
    placeName: feedbackContext.placeName,
    placeCategory: feedbackContext.placeCategory,
    context: feedbackContext.type,
    sessionId: `session-${Date.now()}`,
  };

  setUserFeedbackHistory((prev) => [...prev, fullFeedback]);

  // Update user's serendipity profile based on feedback
  const updatedProfile = { ...userProfile };
  if (updatedProfile.serendipityProfile) {
    const currentAvg = updatedProfile.serendipityProfile.averageSerendipityScore;
    const totalSubmitted = updatedProfile.serendipityProfile.totalFeedbackSubmitted;

    updatedProfile.serendipityProfile = {
      ...updatedProfile.serendipityProfile,
      averageSerendipityScore:
        (currentAvg * totalSubmitted + feedback.serendipityScore) / (totalSubmitted + 1),
      totalFeedbackSubmitted: totalSubmitted + 1,
      optimalBoundaryPushLevel: feedback.boundaryPushLevel, // Update sweet spot
    };
  }

  setUserProfile(updatedProfile);

  // Award karma for submitting feedback
  setGamification((prev) => ({
    ...prev,
    karmaPoints: prev.karmaPoints + 10,
    xp: prev.xp + 20,
  }));

  console.log("✅ Feedback submitted:", fullFeedback);
};

// Handler: Trigger Feedback After Check-In
const handleCheckInComplete = () => {
  setShowCheckIn(false);
  setShowRewardPopup(true);

  // Update gamification
  setGamification({
    ...gamification,
    karmaPoints: gamification.karmaPoints + 50,
    xp: gamification.xp + 100,
  });

  // NEW: Trigger feedback loop after check-in
  setTimeout(() => {
    setShowRewardPopup(false);
    setFeedbackContext({
      type: "completed_drift",
      placeName: checkInPlace?.name || "this place",
      placeCategory: checkInPlace?.type || "venue",
    });
    setShowFeedbackLoop(true);
  }, 2000);
};
```

---

## Step 4: Add Entry Points for Creator Studio

### Option A: Add to Profile Screen (if user is club admin)

Add this button to `ProfileOverlay.tsx` when rendering:

```typescript
{userProfile.isClubAdmin && (
  <motion.button
    onClick={() => {
      onClose();
      // This will be passed from App.tsx
      onOpenCreatorStudio();
    }}
    className="w-full h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white font-semibold flex items-center justify-center gap-2"
    whileTap={{ scale: 0.97 }}
  >
    <Wand2 size={18} />
    Open Creator Studio
  </motion.button>
)}
```

Then update the ProfileOverlay props:

```typescript
interface ProfileOverlayProps {
  // ... existing props
  onOpenCreatorStudio: () => void; // NEW
}
```

And in App.tsx:

```typescript
<ProfileOverlay
  isOpen={showProfile}
  onClose={() => setShowProfile(false)}
  profile={userProfile}
  gamification={gamification}
  onEditProfile={() => {
    setShowProfile(false);
    setShowProfileSetup(true);
  }}
  onViewRewards={() => {
    setShowProfile(false);
    setShowRewardsWallet(true);
  }}
  onEditTasteProfile={() => {
    setShowProfile(false);
    setShowTasteProfile(true);
  }}
  onOpenCreatorStudio={() => {
    setShowProfile(false);
    setShowCreatorStudio(true);
  }}
/>
```

### Option B: Add Floating Action Button (Within Campus View)

In `WithinCampusView.tsx`, add a floating FAB:

```typescript
{userProfile.isClubAdmin && (
  <motion.button
    onClick={() => onOpenCreatorStudio()}
    className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-2xl flex items-center justify-center z-20"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 0.5, type: "spring" }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <Wand2 size={24} />
  </motion.button>
)}
```

Update WithinCampusView props:

```typescript
interface WithinCampusViewProps {
  onPlaceClick: (place: any) => void;
  onShowPartnerDashboard: () => void;
  onOpenCreatorStudio: () => void; // NEW
}
```

And in App.tsx:

```typescript
<WithinCampusView
  onPlaceClick={(place) => {
    setSelectedMarker(place);
  }}
  onShowPartnerDashboard={() => setShowPartnerDashboard(true)}
  onOpenCreatorStudio={() => setShowCreatorStudio(true)}
/>
```

---

## Step 5: Add Entry Points for Feedback Loop

### Trigger After Dismissing AI Suggestion

When user dismisses a suggestion (e.g., from FloatingAICardGlass):

```typescript
// In FloatingAICardGlass.tsx or wherever suggestions are dismissed
const handleDismiss = () => {
  onDismiss?.();

  // Trigger feedback loop
  onRequestFeedback?.({
    type: "dismissed_suggestion",
    placeName: title,
    placeCategory: "AI Suggestion",
  });
};
```

Update FloatingAICardGlass props:

```typescript
interface FloatingAICardGlassProps {
  // ... existing props
  onRequestFeedback?: (context: {
    type: "completed_drift" | "dismissed_suggestion";
    placeName: string;
    placeCategory: string;
  }) => void;
}
```

And in App.tsx when rendering FloatingAICardGlass:

```typescript
<FloatingAICardGlass
  title={/* ... */}
  subtitle={/* ... */}
  badge={/* ... */}
  x={30}
  y={40}
  onClick={handleClick}
  onDismiss={handleDismiss}
  onRequestFeedback={(context) => {
    setFeedbackContext(context);
    setShowFeedbackLoop(true);
  }}
/>
```

---

## Step 6: Render Components in App.tsx

Add these render blocks at the end of the main return statement, before the closing `</motion.div>`:

```typescript
{/* Club Creator Studio */}
{showCreatorStudio && userProfile.isClubAdmin && (
  <ClubCreatorStudio
    isOpen={showCreatorStudio}
    onClose={() => setShowCreatorStudio(false)}
    clubName={userProfile.clubAdminFor?.[0] || "Photography Club"}
    onPublish={handlePublishCampaign}
  />
)}

{/* Discovery Feedback Loop */}
{showFeedbackLoop && (
  <DiscoveryFeedbackLoop
    isOpen={showFeedbackLoop}
    onClose={() => setShowFeedbackLoop(false)}
    context={feedbackContext.type}
    placeName={feedbackContext.placeName}
    placeCategory={feedbackContext.placeCategory}
    onSubmit={handleSubmitFeedback}
  />
)}
```

---

## Step 7: Update Check-In Flow

Replace the existing `handleCheckInComplete` function with the updated version from Step 3 that triggers the feedback loop.

---

## Complete Integration Example

Here's a minimal complete integration for App.tsx:

```typescript
// At the top with other imports
import ClubCreatorStudio from "./components/ClubCreatorStudio";
import DiscoveryFeedbackLoop from "./components/DiscoveryFeedbackLoop";
import type { GeneratedCampaign } from "./types/creator";
import type { FeedbackData } from "./types/feedback";

export default function App() {
  // ... existing state

  // NEW: Creator Studio State
  const [showCreatorStudio, setShowCreatorStudio] = useState(false);
  const [publishedCampaigns, setPublishedCampaigns] = useState<GeneratedCampaign[]>([]);

  // NEW: Feedback Loop State
  const [showFeedbackLoop, setShowFeedbackLoop] = useState(false);
  const [feedbackContext, setFeedbackContext] = useState<{
    type: "completed_drift" | "dismissed_suggestion";
    placeName: string;
    placeCategory: string;
  }>({
    type: "completed_drift",
    placeName: "",
    placeCategory: "",
  });

  // NEW: Handlers
  const handlePublishCampaign = (campaign: GeneratedCampaign) => {
    // ... (code from Step 3)
  };

  const handleSubmitFeedback = (feedback: FeedbackData) => {
    // ... (code from Step 3)
  };

  // ... existing code

  return (
    <div className="min-h-screen mesh-gradient-bg flex items-center justify-center p-4">
      <motion.div className="relative w-[390px] h-[844px] rounded-[32px] overflow-hidden shadow-2xl">
        {/* ... existing UI */}

        {/* NEW: Club Creator Studio */}
        {showCreatorStudio && userProfile.isClubAdmin && (
          <ClubCreatorStudio
            isOpen={showCreatorStudio}
            onClose={() => setShowCreatorStudio(false)}
            clubName="Photography Club"
            onPublish={handlePublishCampaign}
          />
        )}

        {/* NEW: Discovery Feedback Loop */}
        {showFeedbackLoop && (
          <DiscoveryFeedbackLoop
            isOpen={showFeedbackLoop}
            onClose={() => setShowFeedbackLoop(false)}
            context={feedbackContext.type}
            placeName={feedbackContext.placeName}
            placeCategory={feedbackContext.placeCategory}
            onSubmit={handleSubmitFeedback}
          />
        )}
      </motion.div>
    </div>
  );
}
```

---

## Testing Checklist

- [ ] Creator Studio opens when club admin clicks button
- [ ] AI generation animation plays smoothly
- [ ] Campaign publishes and awards karma
- [ ] Feedback loop appears after check-in
- [ ] Feedback loop appears when dismissing suggestion
- [ ] Boundary push slider works smoothly
- [ ] Dismissal reason chips toggle correctly
- [ ] Serendipity score updates in real-time
- [ ] Submit animation plays and closes modal
- [ ] User profile serendipityProfile updates after feedback

---

## Performance Considerations

1. **Lazy Loading:** Consider code-splitting these components if bundle size grows:
   ```typescript
   const ClubCreatorStudio = lazy(() => import("./components/ClubCreatorStudio"));
   const DiscoveryFeedbackLoop = lazy(() => import("./components/DiscoveryFeedbackLoop"));
   ```

2. **Memoization:** Memoize heavy callbacks:
   ```typescript
   const handlePublishCampaign = useCallback((campaign: GeneratedCampaign) => {
     // ... handler code
   }, [userProfile, gamification]);
   ```

3. **State Persistence:** Save feedback to localStorage for offline support:
   ```typescript
   useEffect(() => {
     localStorage.setItem("feedbackHistory", JSON.stringify(userFeedbackHistory));
   }, [userFeedbackHistory]);
   ```

---

## Next Steps

1. **Backend Integration:** Connect to real AI API for campaign generation
2. **Analytics:** Track which campaigns get most engagement
3. **A/B Testing:** Test different feedback questions
4. **ML Training:** Use feedback data to improve serendipity engine
5. **Social Sharing:** Allow exporting generated posters to Instagram

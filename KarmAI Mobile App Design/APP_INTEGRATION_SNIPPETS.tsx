/**
 * READY-TO-USE CODE SNIPPETS FOR APP.TSX
 * Copy-paste these snippets directly into your App.tsx file
 */

// ============================================
// SECTION 1: IMPORTS (Add to top of App.tsx)
// ============================================

import ClubCreatorStudio from "./components/ClubCreatorStudio";
import DiscoveryFeedbackLoop from "./components/DiscoveryFeedbackLoop";
import type { GeneratedCampaign } from "./types/creator";
import type { FeedbackData } from "./types/feedback";


// ============================================
// SECTION 2: STATE DECLARATIONS (Add after existing useState calls)
// ============================================

// Club Creator Studio State
const [showCreatorStudio, setShowCreatorStudio] = useState(false);
const [publishedCampaigns, setPublishedCampaigns] = useState<GeneratedCampaign[]>([]);

// Discovery Feedback Loop State
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


// ============================================
// SECTION 3: HANDLER FUNCTIONS (Add before return statement)
// ============================================

/**
 * Handler: Publish Club Campaign
 * Called when a club admin publishes an AI-generated campaign
 */
const handlePublishCampaign = (campaign: GeneratedCampaign) => {
  const fullCampaign: GeneratedCampaign = {
    ...campaign,
    id: `campaign-${Date.now()}`,
    clubId: userProfile.clubAdminFor?.[0] || "photography-club",
    clubName: "Photography Club",
    createdAt: new Date(),
    published: true,
    karmaReward: {
      studentAttendance: 100,
      clubMilestone: 500,
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

/**
 * Handler: Submit Discovery Feedback
 * Called when user submits feedback after completing/dismissing a drift
 */
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
      optimalBoundaryPushLevel: feedback.boundaryPushLevel,
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

/**
 * UPDATED: handleCheckInComplete
 * Replace existing function with this version that triggers feedback loop
 */
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


// ============================================
// SECTION 4: RENDER COMPONENTS (Add before closing </motion.div>)
// ============================================

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


// ============================================
// SECTION 5: ENTRY POINT - PROFILE OVERLAY
// ============================================

/**
 * Add this to ProfileOverlay.tsx props interface
 */
interface ProfileOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  gamification: GamificationState;
  onEditProfile: () => void;
  onViewRewards: () => void;
  onEditTasteProfile: () => void;
  onOpenCreatorStudio: () => void; // NEW
}

/**
 * Add this button in ProfileOverlay.tsx render (inside the component)
 */
{userProfile.isClubAdmin && (
  <motion.button
    onClick={() => {
      onClose();
      onOpenCreatorStudio();
    }}
    className="w-full h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white font-semibold flex items-center justify-center gap-2 mt-3"
    whileTap={{ scale: 0.97 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <Wand2 size={18} />
    Open Creator Studio
  </motion.button>
)}

/**
 * Update ProfileOverlay call in App.tsx
 */
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
  onOpenCreatorStudio={() => {  // NEW
    setShowProfile(false);
    setShowCreatorStudio(true);
  }}
/>


// ============================================
// SECTION 6: ENTRY POINT - FLOATING ACTION BUTTON
// ============================================

/**
 * Alternative: Add floating FAB to WithinCampusView.tsx
 * Add this prop to WithinCampusViewProps interface
 */
interface WithinCampusViewProps {
  onPlaceClick: (place: any) => void;
  onShowPartnerDashboard: () => void;
  onOpenCreatorStudio: () => void; // NEW
}

/**
 * Add this FAB in WithinCampusView.tsx render
 */
{userProfile.isClubAdmin && (
  <motion.button
    onClick={onOpenCreatorStudio}
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

/**
 * Update WithinCampusView call in App.tsx
 */
<WithinCampusView
  onPlaceClick={(place) => {
    setSelectedMarker(place);
  }}
  onShowPartnerDashboard={() => setShowPartnerDashboard(true)}
  onOpenCreatorStudio={() => setShowCreatorStudio(true)}  // NEW
/>


// ============================================
// SECTION 7: TRIGGER FEEDBACK ON DISMISS
// ============================================

/**
 * Add this to FloatingAICardGlass.tsx props interface
 */
interface FloatingAICardGlassProps {
  title: string;
  subtitle: string;
  badge?: string;
  x: number;
  y: number;
  onClick?: () => void;
  onDismiss?: () => void;
  onRequestFeedback?: (context: {  // NEW
    type: "completed_drift" | "dismissed_suggestion";
    placeName: string;
    placeCategory: string;
  }) => void;
}

/**
 * Update dismiss handler in FloatingAICardGlass.tsx
 */
const handleDismiss = (e: React.MouseEvent) => {
  e.stopPropagation();
  onDismiss?.();

  // NEW: Trigger feedback loop
  onRequestFeedback?.({
    type: "dismissed_suggestion",
    placeName: title,
    placeCategory: "AI Suggestion",
  });
};

/**
 * Update FloatingAICardGlass call in App.tsx (wherever it's used)
 */
<FloatingAICardGlass
  title="Philosophy Department"
  subtitle="Fills your top interest gap"
  badge="AI SUGGESTION"
  x={30}
  y={40}
  onClick={handleClick}
  onDismiss={handleDismiss}
  onRequestFeedback={(context) => {  // NEW
    setFeedbackContext(context);
    setShowFeedbackLoop(true);
  }}
/>


// ============================================
// SECTION 8: OPTIONAL - PERSISTENT STORAGE
// ============================================

/**
 * Add this useEffect to persist feedback history to localStorage
 */
useEffect(() => {
  localStorage.setItem("feedbackHistory", JSON.stringify(userFeedbackHistory));
}, [userFeedbackHistory]);

/**
 * Load feedback history on mount
 */
useEffect(() => {
  const savedFeedback = localStorage.getItem("feedbackHistory");
  if (savedFeedback) {
    setUserFeedbackHistory(JSON.parse(savedFeedback));
  }
}, []);


// ============================================
// SECTION 9: TESTING SHORTCUTS
// ============================================

/**
 * Add these buttons to your UI for quick testing (remove in production)
 */
<div className="fixed top-4 left-4 z-50 flex gap-2">
  <button
    onClick={() => setShowCreatorStudio(true)}
    className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm"
  >
    Test Creator Studio
  </button>

  <button
    onClick={() => {
      setFeedbackContext({
        type: "completed_drift",
        placeName: "Counter 7 Cafe",
        placeCategory: "Cafe",
      });
      setShowFeedbackLoop(true);
    }}
    className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm"
  >
    Test Feedback Loop
  </button>
</div>


// ============================================
// SECTION 10: ANALYTICS TRACKING (Optional)
// ============================================

/**
 * Track events for analytics (replace console.log with your analytics service)
 */
const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  console.log(`📊 Analytics: ${eventName}`, properties);
  // Replace with: mixpanel.track(eventName, properties);
  // Or: analytics.track(eventName, properties);
};

// In handlePublishCampaign:
trackEvent("campaign_published", {
  clubName: fullCampaign.clubName,
  bubbleBurstScore: fullCampaign.bubbleBurstScore,
  tagCount: fullCampaign.suggestedTags.length,
});

// In handleSubmitFeedback:
trackEvent("feedback_submitted", {
  context: feedback.context,
  boundaryPushLevel: feedback.boundaryPushLevel,
  serendipityScore: feedback.serendipityScore,
  wouldRecommend: feedback.wouldRecommend,
});

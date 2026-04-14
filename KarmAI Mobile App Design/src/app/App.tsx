import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Plus, Minus, MapPin, Compass, Users, User, Home, Award, Trophy, Info, TrendingUp, Brain, X, Settings, ArrowLeft, Wand2 } from "lucide-react";
import SplashScreen from "./components/SplashScreen";
import InterestSelectionScreen from "./components/InterestSelectionScreen";
import LoginScreen from "./components/LoginScreen";
import SignUpScreen from "./components/SignUpScreen";
import MapCore from "./components/MapCore";
import RealMapCore from "./components/RealMapCore";
import FloatingAICard from "./components/FloatingAICard";
import FloatingAICardGlass from "./components/FloatingAICardGlass";
import GlassBottomNav from "./components/GlassBottomNav";
import UniversalBottomSheet from "./components/UniversalBottomSheet";
import AnalyticsOverlay from "./components/AnalyticsOverlay";
import SmartDriftDetail from "./components/SmartDriftDetail";
import ProfileOverlay from "./components/ProfileOverlay";
import ProfileSetup from "./components/ProfileSetup";
import PersonalInsightBanner from "./components/PersonalInsightBanner";
import RewardsWallet from "./components/RewardsWallet";
import RewardUnlockPopup from "./components/RewardUnlockPopup";
import CheckInVerification from "./components/CheckInVerification";
import PhotoProofModal from "./components/PhotoProofModal";
import PlaceReviews from "./components/PlaceReviews";
import CreatorStudio from "./components/CreatorStudio";
import LeaderboardScreen from "./components/LeaderboardScreen";
import MultiLeaderboard from "./components/MultiLeaderboard";
import ImpactDashboard from "./components/ImpactDashboard";
import BehavioralGraphEngine from "./components/BehavioralGraphEngine";
import MVPExplainer from "./components/MVPExplainer";
import UserFlowDiagram from "./components/UserFlowDiagram";
import BusinessDashboardPreview from "./components/BusinessDashboardPreview";
import CompassBoxes from "./components/CompassBoxes";
import TasteProfileScreen from "./components/TasteProfileScreen";
import SettingsScreen from "./components/SettingsScreen";
import NotificationPermissionScreen from "./components/NotificationPermissionScreen";
import HomeTabsView from "./components/HomeTabsView";
import HorizontalZoomSlider from "./components/HorizontalZoomSlider";
import ExploreSection from "./components/ExploreSection";
import ConnectSection from "./components/ConnectSection";
import CampusSelectionScreen from "./components/CampusSelectionScreen";
import WithinCampusView from "./components/WithinCampusView";
import OutsideCampusView from "./components/OutsideCampusView";
import PartnerDashboard from "./components/PartnerDashboard";
import AIConcierge from "./components/AIConcierge";
import SquadDrift from "./components/SquadDrift";
import AccessibilitySettings from "./components/AccessibilitySettings";
import { supabase } from "../utils/supabase";
import { UserProfile, defaultProfile } from "./types/profile";
import { GamificationState, defaultGamification } from "./types/gamification";

type AppState = "login" | "signup" | "splash" | "interests" | "notification_permission" | "campus_selection" | "map";
type ZoomLevel = "personal" | "campus" | "city" | "global";
type NavMode = "home" | "map" | "explore" | "connect" | "profile" | "leaderboard" | "rewards";
type CampusMode = "within" | "outside";

export default function App() {
  const [appState, setAppState] = useState<AppState>("login");
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>("personal");
  const [navMode, setNavMode] = useState<NavMode>("home");
  const [filterType, setFilterType] = useState("all");
  const [campusMode, setCampusMode] = useState<CampusMode>("within");
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultProfile);
  const [gamification, setGamification] = useState<GamificationState>(defaultGamification);

  // UI states
  const [showAICards, setShowAICards] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [showDriftDetail, setShowDriftDetail] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showConnections, setShowConnections] = useState(false);
  const [showExplore, setShowExplore] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [showInsightBanner, setShowInsightBanner] = useState(false);
  const [showRewardsWallet, setShowRewardsWallet] = useState(false);
  const [showRewardPopup, setShowRewardPopup] = useState(false);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [checkInPlace, setCheckInPlace] = useState<any>(null);
  const [showMVPExplainer, setShowMVPExplainer] = useState(false);
  const [showUserFlow, setShowUserFlow] = useState(false);
  const [showBusinessDashboard, setShowBusinessDashboard] = useState(false);
  const [showBehavioralEngine, setShowBehavioralEngine] = useState(false);
  const [showTasteProfile, setShowTasteProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPartnerDashboard, setShowPartnerDashboard] = useState(false);
  const [showAIConcierge, setShowAIConcierge] = useState(false);
  const [showSquadDrift, setShowSquadDrift] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showCreatorStudio, setShowCreatorStudio] = useState(false);
  const [hideMap, setHideMap] = useState(true); // Start with map hidden since we default to home view
  // Global Auth Sync
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setAppState("login");
        setUserProfile(defaultProfile);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      
      if (!error && data) {
        setUserProfile(prev => ({
          ...prev,
          name: data.full_name || prev.name,
          college: data.college || prev.college,
          level: data.level || prev.level,
          karmaPoints: data.karma_score || prev.karmaPoints
        }));
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };


  // Auto-progress from splash to interests
  useEffect(() => {
    if (appState === "splash") {
      const timer = setTimeout(() => {
        setAppState("interests");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  useEffect(() => {
    if (appState === "map") {
      // Show AI cards after map loads
      const timer = setTimeout(() => {
        setShowAICards(true);
      }, 1000);

      // Show insight banner after a delay
      const insightTimer = setTimeout(() => {
        setShowInsightBanner(true);
      }, 3000);

      return () => {
        clearTimeout(timer);
        clearTimeout(insightTimer);
      };
    }
  }, [appState]);

  const handleNavClick = (mode: NavMode) => {
    setNavMode(mode);

    // Reset all overlays
    setShowAnalytics(false);
    setShowConnections(false);
    setShowExplore(false);
    setShowProfile(false);
    setShowRewardsWallet(false);
    setShowLeaderboard(false);
    setSelectedMarker(null);

    // Apply mode-specific actions
    if (mode === "home") {
      setZoomLevel("personal");
      setFilterType("all");
      setShowAICards(true);
      setHideMap(true); // Hide background map on home, use BubbleMapView instead
    } else if (mode === "map") {
      setHideMap(false); // Show map on map tab
      setZoomLevel("city");
      setFilterType("all");
      setShowAICards(false);
    } else if (mode === "explore") {
      setHideMap(true); // Hide map on explore - show custom explore content
      setShowExplore(true);
    } else if (mode === "connect") {
      setHideMap(true); // Hide map on connect - show custom connect content
      setShowConnections(true);
    } else if (mode === "profile") {
      setHideMap(true); // Hide map on profile
      setShowProfile(true);
    } else if (mode === "leaderboard") {
      setHideMap(true); // Hide map on leaderboard
      setShowLeaderboard(true);
    } else if (mode === "rewards") {
      setHideMap(true); // Hide map on rewards
      setShowRewardsWallet(true);
    }
  };

  const getSmartAICardMessage = () => {
    const intent = userProfile.currentIntent;
    const budget = userProfile.budgetLevel;
    const time = userProfile.activeHours;

    if (intent === "meet-people") {
      return {
        title: "Try Counter 7 instead of Counter 2",
        subtitle: `You want to meet people → 3 students active here now (${time})`,
      };
    } else if (intent === "explore-places") {
      return {
        title: "Philosophy Department unexplored",
        subtitle: "This fills your top interest gap and it's free",
      };
    } else if (budget === "free") {
      return {
        title: "Try Counter 7 — it's free today",
        subtitle: "91% match potential with Philosophy student",
      };
    }

    return {
      title: "Try Counter 7 instead of Counter 2",
      subtitle: "91% creative collision potential with Philosophy student",
    };
  };

  const handleZoomIn = () => {
    if (zoomLevel === "global") setZoomLevel("city");
    else if (zoomLevel === "city") setZoomLevel("campus");
    else if (zoomLevel === "campus") setZoomLevel("personal");
  };

  const handleZoomOut = () => {
    if (zoomLevel === "personal") setZoomLevel("campus");
    else if (zoomLevel === "campus") setZoomLevel("city");
    else if (zoomLevel === "city") setZoomLevel("global");
  };

  const handleMarkerClick = (marker: any) => {
    setSelectedMarker(marker);
    if (marker.type === "user") {
      setShowAnalytics(true);
    }
  };

  const handleCheckInComplete = () => {
    setShowCheckIn(false);
    setShowRewardPopup(true);
    // Update gamification
    setGamification({
      ...gamification,
      karmaPoints: gamification.karmaPoints + 50,
      xp: gamification.xp + 100,
    });
  };

  // Render authentication flow
  if (appState === "login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] flex items-center justify-center p-4">
        <div className="rounded-[32px] overflow-hidden shadow-2xl">
          <LoginScreen
            onLogin={() => setAppState("splash")}
            onSignUp={() => setAppState("signup")}
          />
        </div>
      </div>
    );
  }

  if (appState === "signup") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] flex items-center justify-center p-4">
        <div className="rounded-[32px] overflow-hidden shadow-2xl">
          <SignUpScreen
            onSignUp={() => setAppState("splash")}
            onLogin={() => setAppState("login")}
          />
        </div>
      </div>
    );
  }

  // Render onboarding flow
  if (appState === "splash") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] flex items-center justify-center p-4">
        <div className="rounded-[32px] overflow-hidden shadow-2xl">
          <SplashScreen />
        </div>
      </div>
    );
  }

  if (appState === "interests") {
    return (
      <div className="min-h-screen mesh-gradient-bg flex items-center justify-center p-4">
        <motion.div
          className="rounded-[32px] overflow-hidden shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <InterestSelectionScreen
            onContinue={() => {
              // Show notification permission after interests
              setAppState("notification_permission");
            }}
          />
        </motion.div>
      </div>
    );
  }

  if (appState === "notification_permission") {
    return (
      <div className="min-h-screen mesh-gradient-bg flex items-center justify-center p-4">
        <div className="rounded-[32px] overflow-hidden shadow-2xl">
          <NotificationPermissionScreen
            isOpen={true}
            onAllow={() => {
              setAppState("campus_selection");
            }}
            onSkip={() => {
              setAppState("campus_selection");
            }}
          />
        </div>
      </div>
    );
  }

  if (appState === "campus_selection") {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4">
        <motion.div
          className="w-[390px] h-[844px] rounded-[32px] overflow-hidden shadow-2xl"
          style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)" }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CampusSelectionScreen
            onSelect={(mode) => {
              setCampusMode(mode);
              setAppState("map");
              setZoomLevel(mode === "within" ? "campus" : "city");
              setShowProfileSetup(true);
            }}
            userLocation="Mumbai"
          />
        </motion.div>
      </div>
    );
  }

  // Main map experience
  return (
    <div className="min-h-screen mesh-gradient-bg flex items-center justify-center p-4">
      <motion.div
        className="relative w-[390px] h-[844px] rounded-[32px] overflow-hidden shadow-2xl"
        style={{
          boxShadow: "0 20px 80px rgba(0, 0, 0, 0.12)",
          background: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(40px)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
        }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Real Interactive Map - Show only when not hidden */}
        {!hideMap && (
          <>
            <RealMapCore
              zoomLevel={zoomLevel}
              onMarkerClick={handleMarkerClick}
              filterType={filterType}
            />

            {/* Map-specific Back Button */}
            {navMode === "map" && (
              <motion.button
                onClick={() => handleNavClick("home")}
                className="absolute right-4 top-[120px] z-20 w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.9)",
                  boxShadow: "0 4px 16px rgba(124, 92, 232, 0.15)",
                }}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft size={20} className="text-[#7C5CE8]" strokeWidth={2.5} />
              </motion.button>
            )}
          </>
        )}

        {/* Large Back to Home Button - Show prominently when not on home */}
        {navMode !== "home" && (
          <motion.button
            onClick={() => handleNavClick("home")}
            className="absolute left-5 z-[200] px-6 py-3.5 rounded-2xl flex items-center gap-2.5"
            style={{
              top: "90px",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(24px)",
              border: "2px solid rgba(255, 255, 255, 1)",
              boxShadow: "0 8px 32px rgba(124, 92, 232, 0.25), 0 0 0 4px rgba(124, 92, 232, 0.12), 0 0 20px rgba(124, 92, 232, 0.1)",
            }}
            initial={{ x: -200, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              boxShadow: [
                "0 8px 32px rgba(124, 92, 232, 0.25), 0 0 0 4px rgba(124, 92, 232, 0.12), 0 0 20px rgba(124, 92, 232, 0.1)",
                "0 8px 32px rgba(124, 92, 232, 0.4), 0 0 0 6px rgba(124, 92, 232, 0.2), 0 0 30px rgba(124, 92, 232, 0.2)",
                "0 8px 32px rgba(124, 92, 232, 0.25), 0 0 0 4px rgba(124, 92, 232, 0.12), 0 0 20px rgba(124, 92, 232, 0.1)",
              ]
            }}
            transition={{
              x: { delay: 0.1, type: "spring", stiffness: 150 },
              opacity: { delay: 0.1 },
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center" style={{ boxShadow: "0 2px 8px rgba(124, 92, 232, 0.15)" }}>
              <ArrowLeft size={20} className="text-[#7C5CE8]" strokeWidth={3} />
            </div>
            <span className="text-[#1A1A1A] font-bold" style={{ fontSize: "17px", letterSpacing: "0.5px" }}>
              Back
            </span>
          </motion.button>
        )}

        {/* Top UI - Search and filters */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-14 px-5">
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              className="flex-1 rounded-[22px] border px-4 h-11 flex items-center gap-2"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E5E7EB",
              }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Search size={16} className="text-[#9CA3AF]" />
              <input
                type="text"
                placeholder={campusMode === "within" ? "Search campus..." : "Search places..."}
                className="flex-1 bg-transparent text-[#1A1A1A] outline-none placeholder:text-[#9CA3AF]"
                style={{ fontSize: "13px" }}
              />
            </motion.div>

            {/* Campus Mode Indicator */}
            <motion.button
              onClick={() => setCampusMode(campusMode === "within" ? "outside" : "within")}
              className="h-11 px-3 rounded-full border flex items-center gap-2 bg-white"
              style={{
                borderColor: campusMode === "within" ? "#FF6B35" : "#4A90E2",
                boxShadow: `0 1px 3px ${campusMode === "within" ? "rgba(255, 107, 53, 0.2)" : "rgba(74, 144, 226, 0.2)"}`,
              }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.32 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: campusMode === "within" ? "#FF6B35" : "#4A90E2",
                }}
              />
              <span
                className="font-semibold whitespace-nowrap"
                style={{
                  fontSize: "11px",
                  color: campusMode === "within" ? "#FF6B35" : "#4A90E2",
                }}
              >
                {campusMode === "within" ? "Campus" : "City"}
              </span>
            </motion.button>

            {navMode === "home" && (
              <>
                {/* Rewards Wallet Quick Access */}
                <motion.button
                  onClick={() => setShowRewardsWallet(true)}
                  className="w-11 h-11 rounded-full flex items-center justify-center border-[1.5px] relative bg-white"
                  style={{
                    borderColor: "#D97706",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Award size={18} className="text-[#D97706]" />
                  <div
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#7C5CE8] flex items-center justify-center"
                    style={{ fontSize: "9px", fontWeight: 700, color: "#FFFFFF" }}
                  >
                    {gamification.karmaPoints > 999 ? "1k" : gamification.karmaPoints}
                  </div>
                </motion.button>

                {/* Settings Quick Access */}
                <motion.button
                  onClick={() => setShowSettings(true)}
                  className="w-11 h-11 rounded-full flex items-center justify-center border bg-white"
                  style={{
                    borderColor: "#E5E7EB",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Settings size={18} className="text-[#6B7280]" />
                </motion.button>

                {/* Creator Studio (Club Admins Only) */}
                {userProfile.isClubAdmin && (
                  <motion.button
                    onClick={() => setShowCreatorStudio(true)}
                    className="w-11 h-11 rounded-full flex items-center justify-center border-[1.5px] bg-white"
                    style={{
                      borderColor: "#7C5CE8",
                      boxShadow: "0 1px 3px rgba(124,92,232,0.2)",
                    }}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.47 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Wand2 size={18} className="text-[#7C5CE8]" />
                  </motion.button>
                )}

                {/* Profile Quick Access */}
                <motion.button
                  onClick={() => setShowProfile(true)}
                  className="w-11 h-11 rounded-full flex items-center justify-center border-[1.5px] relative bg-white"
                  style={{
                    borderColor: "#7C5CE8",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-[#7C5CE8] font-bold" style={{ fontSize: "13px" }}>
                    {userProfile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  {/* Pulse indicator for personalization */}
                  <motion.div
                    className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#0D9488]"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </motion.button>
              </>
            )}

            {/* Close button when not on home - top right corner */}
            {navMode !== "home" && (
              <motion.button
                onClick={() => handleNavClick("home")}
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  backgroundColor: "#EF4444",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} className="text-white" strokeWidth={3} />
              </motion.button>
            )}
          </div>

          {/* Filter pills - Only show when map is visible */}
          {!hideMap && (
            <motion.div
              className="flex gap-2 overflow-x-auto pb-2"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {(campusMode === "within"
                ? [
                    { name: "All", value: "all" },
                    { name: "Canteens", value: "canteens" },
                    { name: "Events", value: "events" },
                    { name: "Study", value: "study" },
                    { name: "Sports", value: "sports" },
                    { name: "Clubs", value: "clubs" },
                  ]
                : [
                    { name: "All", value: "all" },
                    { name: "Colleges", value: "colleges" },
                    { name: "Cafes", value: "cafes" },
                    { name: "Heritage", value: "heritage" },
                    { name: "Adventure", value: "adventure" },
                    { name: "Culture", value: "culture" },
                  ]
              ).map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setFilterType(filter.value)}
                  className="px-4 h-8 rounded-full whitespace-nowrap transition-all duration-200 border"
                  style={{
                    backgroundColor:
                      filterType === filter.value ? "#7C5CE8" : "#FFFFFF",
                    color: filterType === filter.value ? "#FFFFFF" : "#6B7280",
                    fontSize: "12px",
                    fontWeight: filterType === filter.value ? 600 : 500,
                    borderColor: filterType === filter.value ? "#7C5CE8" : "#E5E7EB",
                    boxShadow: filterType === filter.value ? "0 1px 3px rgba(124,92,232,0.2)" : "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  {filter.name}
                </button>
              ))}
            </motion.div>
          )}

          {/* Horizontal Zoom Slider - Show when map is visible */}
          {!hideMap && (
            <motion.div
              className="px-5 pb-3"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <HorizontalZoomSlider
                zoomLevel={zoomLevel}
                onZoomChange={(level) => setZoomLevel(level)}
              />
            </motion.div>
          )}
        </div>

        {/* Campus-Specific Views */}
        {navMode === "home" && campusMode === "within" && (
          <WithinCampusView
            onPlaceClick={(place) => {
              setSelectedMarker(place);
            }}
            onShowPartnerDashboard={() => setShowPartnerDashboard(true)}
          />
        )}

        {navMode === "home" && campusMode === "outside" && (
          <OutsideCampusView
            onPlaceClick={(place) => {
              setSelectedMarker(place);
            }}
          />
        )}

        {/* Explore Section */}
        {navMode === "explore" && (
          <ExploreSection
            campusMode={campusMode}
            onPlaceClick={(place) => {
              setSelectedMarker(place);
            }}
            onPersonClick={(person) => {
              // Handle person click
            }}
          />
        )}

        {/* Connect Section */}
        {navMode === "connect" && (
          <ConnectSection
            currentStreak={gamification.streak}
            karmaPoints={gamification.karmaPoints}
            bubbleExplored={23}
          />
        )}

        {/* Map View - Instruction overlay (map is visible in background) */}
        {navMode === "map" && (
          <motion.div
            className="absolute top-[230px] left-5 right-5 z-20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div
              className="rounded-2xl p-4 border text-center"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderColor: "#EDE9FE",
                backdropFilter: "blur(20px)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <p className="text-[#1A1A1A] font-semibold mb-1" style={{ fontSize: "13px" }}>
                🗺️ Interactive Map
              </p>
              <p className="text-[#6B7280]" style={{ fontSize: "11px" }}>
                Use filters above and zoom controls to explore
              </p>
            </div>
          </motion.div>
        )}

        {/* Left-side Action Buttons - Only show when map is visible */}
        {!hideMap && (
          <div className="absolute left-4 top-[180px] z-20 flex flex-col gap-2">
          {/* MVP Explainer */}
          <motion.button
            onClick={() => setShowMVPExplainer(true)}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 relative bg-white border"
            style={{
              borderColor: "#7C5CE8",
              boxShadow: "0 4px 12px rgba(124, 92, 232, 0.15)",
            }}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileTap={{ scale: 0.95 }}
          >
            <Info size={20} className="text-white" />
            <motion.div
              className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#00CBA4]"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>

          {/* User Flow */}
          <motion.button
            onClick={() => setShowUserFlow(true)}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              backgroundColor: "rgba(0, 203, 164, 0.9)",
              boxShadow: "0 8px 24px rgba(0, 203, 164, 0.3)",
            }}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileTap={{ scale: 0.95 }}
          >
            <TrendingUp size={20} className="text-white" />
          </motion.button>

          {/* Behavioral Graph Engine */}
          <motion.button
            onClick={() => setShowBehavioralEngine(true)}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              backgroundColor: "rgba(240, 165, 0, 0.9)",
              boxShadow: "0 8px 24px rgba(240, 165, 0, 0.3)",
            }}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            whileTap={{ scale: 0.95 }}
          >
            <Brain size={20} className="text-white" />
          </motion.button>
        </div>
        )}

        {/* Leaderboard FAB - Only show when map is visible */}
        {!hideMap && (
        <motion.button
          onClick={() => setShowLeaderboard(true)}
          className="absolute right-4 top-[340px] z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{
            background: "linear-gradient(135deg, #FFD700, #FFA500)",
            boxShadow: "0 8px 24px rgba(255, 215, 0, 0.3)",
          }}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          whileTap={{ scale: 0.95 }}
        >
          <Trophy size={22} className="text-white" />
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E85D30] flex items-center justify-center"
            style={{ fontSize: "9px", fontWeight: 700, color: "#FFFFFF" }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            #5
          </motion.div>
        </motion.button>
        )}

        {/* Zoom controls - Only show when map is visible */}
        {!hideMap && (
          <div className="absolute right-4 top-[180px] z-20 flex flex-col gap-2">
          {[
            { icon: Plus, action: handleZoomIn },
            { icon: Minus, action: handleZoomOut },
            { icon: MapPin, action: () => setZoomLevel("personal") },
          ].map((control, i) => (
            <motion.button
              key={i}
              onClick={control.action}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 hover:scale-110 bg-white"
              style={{
                borderColor: "#E5E7EB",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <control.icon size={16} className="text-[#1A1A1A]" />
            </motion.button>
          ))}
        </div>
        )}

        {/* Zoom level indicator - Only show when map is visible */}
        {!hideMap && (
          <motion.div
          className="absolute top-[280px] right-4 z-20 px-3 py-1.5 rounded-full bg-white border"
          style={{
            borderColor: "#E5E7EB",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="text-[#7C5CE8] font-medium" style={{ fontSize: "10px" }}>
            {zoomLevel.toUpperCase()}
          </span>
        </motion.div>
        )}

        {/* Floating Glass Dock Bottom Navigation */}
        <GlassBottomNav
          activeNav={navMode}
          onNavClick={(nav) => handleNavClick(nav as NavMode)}
        />

        {/* Marker Details Bottom Sheet with Reviews */}
        <UniversalBottomSheet
          isOpen={selectedMarker !== null && !showAnalytics}
          onClose={() => setSelectedMarker(null)}
          height="large"
          showReviews={true}
          placeData={selectedMarker ? {
            name: selectedMarker.name,
            averageRating: 4.6,
            totalReviews: 127,
          } : undefined}
          reviewsContent={selectedMarker && (
            <PlaceReviews
              placeName={selectedMarker.name}
              averageRating={4.6}
              totalReviews={127}
              onWriteReview={() => {
                console.log("Open review writing modal");
                // Future: Open review form modal
              }}
            />
          )}
        >
          {selectedMarker && (
            <div>
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-2 h-2 rounded-full mt-1.5"
                  style={{
                    backgroundColor:
                      selectedMarker.type === "cafe"
                        ? "#00CBA4"
                        : selectedMarker.type === "college"
                        ? "#7C5CE8"
                        : "#F0A500",
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-[#1A1A1A] font-bold mb-1" style={{ fontSize: "16px" }}>
                    {selectedMarker.name}
                  </h3>
                  <div
                    className="inline-block px-2 py-1 rounded-full mb-2"
                    style={{
                      backgroundColor:
                        selectedMarker.type === "cafe"
                          ? "rgba(0, 203, 164, 0.1)"
                          : "rgba(124, 92, 232, 0.1)",
                      fontSize: "10px",
                      fontWeight: 500,
                      color: selectedMarker.type === "cafe" ? "#00CBA4" : "#7C5CE8",
                    }}
                  >
                    {selectedMarker.type}
                  </div>
                </div>
              </div>

              {selectedMarker.matchScore && (
                <div className="flex items-center gap-4 mb-4 text-[#6B7280]" style={{ fontSize: "12px" }}>
                  <span>0.3 km away</span>
                  <span>•</span>
                  <span className="text-[#7C5CE8]">{selectedMarker.matchScore}% bubble-match</span>
                </div>
              )}

              {/* AI WHY THIS? Section */}
              <div
                className="mb-4 p-4 rounded-xl"
                style={{
                  background: "rgba(124, 92, 232, 0.06)",
                  border: "1px solid rgba(124, 92, 232, 0.12)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#7C5CE8] font-bold" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>
                    🎯 WHY THIS?
                  </span>
                </div>
                <p className="text-[#1A1A1A]" style={{ fontSize: "13px", lineHeight: "1.6" }}>
                  This {selectedMarker.type} bridges your Photography and Philosophy interests. 3 students from Fine Arts are here now.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setCheckInPlace(selectedMarker);
                    setShowCheckIn(true);
                  }}
                  className="flex-1 h-12 rounded-xl border text-[#00CBA4] font-medium flex items-center justify-center gap-2"
                  style={{
                    borderColor: "#00CBA4",
                    backgroundColor: "rgba(0, 203, 164, 0.05)",
                    fontSize: "14px",
                  }}
                >
                  <MapPin size={16} className="text-[#00CBA4]" />
                  Check-in
                </button>
                <button
                  onClick={() => {
                    setShowDriftDetail(true);
                    setSelectedMarker(null);
                  }}
                  className="flex-1 h-12 rounded-xl bg-[#7C5CE8] text-white font-medium"
                  style={{ fontSize: "14px" }}
                >
                  Add to drift
                </button>
              </div>
            </div>
          )}
        </UniversalBottomSheet>

        {/* Connections Bottom Sheet */}
        <UniversalBottomSheet
          isOpen={showConnections}
          onClose={() => setShowConnections(false)}
          height="large"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-[#1A1A1A] font-bold mb-1" style={{ fontSize: "20px" }}>
                  Potential Collisions
                </h2>
                <p className="text-[#6B7280]" style={{ fontSize: "13px" }}>
                  People who expand your world
                </p>
              </div>
              <div
                className="px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: "rgba(124, 92, 232, 0.1)",
                  fontSize: "9px",
                  fontWeight: 500,
                  color: "#7C3AED",
                  letterSpacing: "0.05em",
                }}
              >
                AI MATCHED
              </div>
            </div>

            {/* Match explanation based on profile */}
            <div
              className="mb-4 p-3 rounded-xl border-l-4 bg-white"
              style={{
                borderLeftColor: "#00CBA4",
                borderTop: "1px solid #E5E7EB",
                borderRight: "1px solid #E5E7EB",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <p className="text-[#1A1A1A] font-medium mb-1" style={{ fontSize: "11px" }}>
                Smart Connection Engine
              </p>
              <p className="text-[#6B7280]" style={{ fontSize: "10px" }}>
                {userProfile.personality === "introvert"
                  ? "Showing quality 1-on-1 matches for introverts"
                  : "Showing social matches based on your extrovert profile"}
                {userProfile.currentIntent === "meet-people" && " • Prioritized because you want to meet people"}
              </p>
            </div>

            <div
              className="rounded-2xl p-4 mb-4 border bg-white"
              style={{
                borderColor: "rgba(124, 92, 232, 0.2)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center border-2"
                  style={{
                    backgroundColor: "rgba(124, 92, 232, 0.1)",
                    borderColor: "#7C5CE8",
                  }}
                >
                  <span className="text-[#7C5CE8] font-bold">PR</span>
                </div>
                <div>
                  <h3 className="text-[#1A1A1A] font-bold" style={{ fontSize: "15px" }}>
                    Priya Raut
                  </h3>
                  <p className="text-[#6B7280]" style={{ fontSize: "11px" }}>
                    ICT Mumbai
                  </p>
                </div>
              </div>

              <div className="text-center mb-3">
                <div className="text-[#7C3AED] font-extrabold" style={{ fontSize: "32px" }}>
                  91%
                </div>
                <p className="text-[#6B7280]" style={{ fontSize: "10px" }}>
                  Creative Collision Potential
                </p>
              </div>

              <button
                className="w-full h-10 rounded-xl bg-[#7C5CE8] text-white font-medium"
                style={{ fontSize: "13px" }}
              >
                Connect at Counter 7, 1PM
              </button>
            </div>

            <p className="text-[#6B7280] mb-2" style={{ fontSize: "12px" }}>
              More nearby
            </p>

            {["Aryan Shah • VJTI • 78%", "Meera Joshi • Symbiosis • 65%"].map((person, i) => (
              <div
                key={i}
                className="py-3 border-b border-[#E5E7EB] flex items-center justify-between"
              >
                <span className="text-[#1A1A1A]" style={{ fontSize: "13px" }}>
                  {person.split("•")[0]}
                </span>
                <span className="text-[#00CBA4]" style={{ fontSize: "12px" }}>
                  {person.split("•")[2]}
                </span>
              </div>
            ))}
          </div>
        </UniversalBottomSheet>

        {/* Explore Bottom Sheet */}
        <UniversalBottomSheet
          isOpen={showExplore}
          onClose={() => setShowExplore(false)}
          height="large"
        >
          <div>
            <h2 className="text-[#1A1A1A] font-bold mb-2" style={{ fontSize: "20px" }}>
              Explore Experiences
            </h2>
            <p className="text-[#6B7280] mb-4" style={{ fontSize: "13px" }}>
              Places you've never tried
            </p>

            {[
              { name: "Ajanta Caves", tag: "Heritage", color: "#F0A500" },
              { name: "Marine Drive Walk", tag: "Nature", color: "#00CBA4" },
              { name: "Prithvi Theatre", tag: "Culture", color: "#3B8ADD" },
            ].map((exp, i) => (
              <div
                key={i}
                className="rounded-xl p-4 mb-3 border bg-white"
                style={{
                  borderColor: "#E5E7EB",
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-[#1A1A1A] font-bold" style={{ fontSize: "14px" }}>
                    {exp.name}
                  </h3>
                  <div
                    className="px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: `${exp.color}20`,
                      color: exp.color,
                      fontSize: "9px",
                      fontWeight: 500,
                    }}
                  >
                    {exp.tag}
                  </div>
                </div>
                <p className="text-[#6B7280] mb-2" style={{ fontSize: "11px" }}>
                  Uploaded by students from VJTI
                </p>
                <button
                  className="w-full h-8 rounded-lg bg-[#7C5CE8] text-white font-medium"
                  style={{ fontSize: "12px" }}
                >
                  Add to drift
                </button>
              </div>
            ))}
          </div>
        </UniversalBottomSheet>

        {/* Analytics Overlay */}
        <AnalyticsOverlay
          isOpen={showAnalytics}
          onClose={() => setShowAnalytics(false)}
          profile={userProfile}
        />

        {/* Profile Overlay */}
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
        />

        {/* Profile Setup */}
        <ProfileSetup
          isOpen={showProfileSetup}
          onClose={() => setShowProfileSetup(false)}
          initialProfile={userProfile}
          onSave={(newProfile) => {
            setUserProfile(newProfile);
            setShowProfileSetup(false);
          }}
        />

        {/* Drift Detail Modal */}
        {showDriftDetail && (
          <SmartDriftDetail onClose={() => setShowDriftDetail(false)} profile={userProfile} />
        )}

        {/* Rewards Wallet */}
        {showRewardsWallet && (
          <div className="absolute inset-0 z-50">
            <RewardsWallet onClose={() => setShowRewardsWallet(false)} gamification={gamification} />
          </div>
        )}

        {/* Leaderboard */}
        {showLeaderboard && (
          <div className="absolute inset-0 z-50">
            <LeaderboardScreen onClose={() => setShowLeaderboard(false)} currentUserRank={5} />
          </div>
        )}

        {/* Photo Proof Check-in with GPS Verification */}
        <PhotoProofModal
          isOpen={showCheckIn}
          onClose={() => setShowCheckIn(false)}
          placeName={checkInPlace?.name || ""}
          distance={75}
          onVerify={(photoUrl) => {
            console.log("Verified with photo:", photoUrl);
            handleCheckInComplete();
          }}
        />

        {/* Reward Unlock Popup */}
        <RewardUnlockPopup
          isOpen={showRewardPopup}
          onClose={() => setShowRewardPopup(false)}
          reward={{
            karmaPoints: 50,
            xp: 100,
            badge: "🏛️",
            placeName: checkInPlace?.name || "this place",
          }}
        />

        {/* MVP Explainer */}
        <MVPExplainer isOpen={showMVPExplainer} onClose={() => setShowMVPExplainer(false)} />

        {/* User Flow Diagram */}
        <UserFlowDiagram isOpen={showUserFlow} onClose={() => setShowUserFlow(false)} />

        {/* Business Dashboard Preview */}
        <BusinessDashboardPreview
          isOpen={showBusinessDashboard}
          onClose={() => setShowBusinessDashboard(false)}
        />

        {/* Behavioral Graph Engine Overlay */}
        {showBehavioralEngine && (
          <div className="absolute inset-0 z-50 bg-[#F8F9FA] overflow-y-auto">
            <div className="px-5 pt-14 pb-8">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-[#1A1A1A] font-bold" style={{ fontSize: "22px" }}>
                  AI Metrics
                </h1>
                <button
                  onClick={() => setShowBehavioralEngine(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center border"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E5E7EB",
                  }}
                >
                  <X size={20} className="text-[#1A1A1A]" />
                </button>
              </div>
              <BehavioralGraphEngine />
            </div>
          </div>
        )}

        {/* Taste Profile Screen */}
        <TasteProfileScreen
          isOpen={showTasteProfile}
          onClose={() => setShowTasteProfile(false)}
        />

        {/* Settings Screen */}
        <SettingsScreen
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          onLogout={() => {
            setShowSettings(false);
            setAppState("login");
          }}
        />

        {/* Partner Dashboard */}
        {showPartnerDashboard && (
          <div className="absolute inset-0 z-50">
            <PartnerDashboard onClose={() => setShowPartnerDashboard(false)} />
          </div>
        )}

        {/* AI Concierge */}
        {showAIConcierge && (
          <div className="absolute inset-0 z-50">
            <AIConcierge onClose={() => setShowAIConcierge(false)} />
          </div>
        )}

        {/* Squad Drift */}
        {showSquadDrift && (
          <div className="absolute inset-0 z-50">
            <SquadDrift onClose={() => setShowSquadDrift(false)} />
          </div>
        )}

        {/* Accessibility Settings */}
        {showAccessibility && (
          <div className="absolute inset-0 z-50">
            <AccessibilitySettings onClose={() => setShowAccessibility(false)} />
          </div>
        )}

        {/* Creator Studio - AI Content Generation for Club Admins */}
        <CreatorStudio
          isOpen={showCreatorStudio}
          onClose={() => setShowCreatorStudio(false)}
          clubName={userProfile.isClubAdmin ? "Photography Club" : undefined}
        />
      </motion.div>
    </div>
  );
}
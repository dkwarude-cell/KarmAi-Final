# KarmAI Backend Requirements & Module Mapping

Based on a comprehensive analysis of the mobile app components, the backend infrastructure needs to serve several distinct modules. This document outlines the mapping of frontend components to backend services.

## 1. Authentication & Profile Module (User Service)

**Components:** `LoginScreen.tsx`, `SignUpScreen.tsx`, `ProfileSetup.tsx`, `TasteProfileScreen.tsx`, `SettingsScreen.tsx`, `CampusSelectionScreen.tsx`

- **APIs Required:**
  - `POST /auth/register`
  - `POST /auth/login`
  - `GET /users/me`
  - `PATCH /users/me/profile`
  - `POST /users/me/taste-profile` (Vector embeddings of user interests for AI matching)

## 2. Geo-Spatial & Discovery Module (Map/Location Service)

**Components:** `MapScreen.tsx`, `MapCore.tsx`, `RealMapCore.tsx`, `ExploreScreen.tsx`, `BubbleMapView.tsx`, `WithinCampusView.tsx`, `OutsideCampusView.tsx`, `PlaceReviews.tsx`

- **APIs Required:**
  - `GET /locations/nearby` (PostGIS spatial queries)
  - `GET /locations/{id}`
  - `GET /locations/{id}/reviews`
  - `POST /locations/{id}/reviews`
  - `GET /explore/bubbles` (Clustered venue insights)

## 3. Verified Action & Proof Module (Check-in Service)

**Components:** `CheckInVerification.tsx`, `VerificationScreen.tsx`, `PhotoProofModal.tsx`, `PersonalizedProofCard.tsx`

- **APIs Required:**
  - `POST /checkins/verify-location`
  - `POST /checkins/upload-proof`
  - `GET /checkins/history`

## 4. Gamification, Impact & Rewards Module (Karma Engine)

**Components:** `LeaderboardScreen.tsx`, `RewardsWallet.tsx`, `AchievementDashboard.tsx`, `BadgeCollection.tsx`, `ImpactDashboard.tsx`, `RewardsMarketplace.tsx`, `RewardUnlockPopup.tsx`

- **APIs Required:**
  - `GET /gamification/leaderboard`
  - `GET /gamification/wallet`
  - `GET /gamification/badges`
  - `POST /gamification/redeem-reward`
  - `GET /impact/stats`

## 5. Social & Community Module (Social Service)

**Components:** `ConnectionsScreen.tsx`, `SquadDrift.tsx`, `SocialChallenges.tsx`, `ClubCreatorStudio.tsx`, `ConnectSection.tsx`

- **APIs Required:**
  - `GET /connections/friends`
  - `POST /connections/request`
  - `GET /squads/active`
  - `POST /challenges/join`

## 6. AI Agent & Intelligence Module (AMD ROCm / FastAPI)

**Components:** `AIConcierge.tsx`, `FloatingAICard.tsx`, `PredictivePlanningCard.tsx`, `SmartDriftDetail.tsx`, `BehavioralGraphEngine.tsx`

- **APIs Required:**
  - `POST /ai/chat` (Context-aware RAG based on user location & preferences)
  - `GET /ai/predictive-plans`
  - `GET /ai/behavioral-insights`

## 7. Business & Partner Module (B2B Portal)

**Components:** `BusinessDashboardPreview.tsx`, `PartnerDashboard.tsx`, `AnalyticsOverlay.tsx`

- **APIs Required:**
  - `GET /partners/dashboard/stats`
  - `GET /partners/analytics/footfall`

/**
 * Type definitions for Discovery Feedback Loop
 * Captures behavioral data to train the serendipity engine
 */

export interface FeedbackData {
  id: string;
  userId: string;
  placeId: string;
  placeName: string;
  placeCategory: string;
  context: "completed_drift" | "dismissed_suggestion";

  // Core Metrics
  boundaryPushLevel: number; // 0-100 slider value (how challenging)
  serendipityScore: number; // Calculated from boundary + recommend

  // Contextual Data
  dismissalReasons?: string[]; // Only for dismissed suggestions
  wouldRecommend: boolean;

  // Metadata
  timestamp: Date;
  sessionId: string;
  deviceLocation?: { lat: number; lng: number };
}

export interface SerendipityProfile {
  userId: string;

  // Learning Patterns
  optimalBoundaryPushLevel: number; // AI-learned sweet spot (0-100)
  preferredChallengeRange: { min: number; max: number };

  // Dismissal Patterns
  commonDismissalReasons: {
    reasonId: string;
    frequency: number;
  }[];

  // Success Indicators
  averageSerendipityScore: number;
  totalFeedbackSubmitted: number;
  positiveDriftsCount: number;

  // Temporal Patterns
  bestTimeOfDay: "morning" | "afternoon" | "evening" | "night";
  bestDayOfWeek: number; // 0-6 (Sunday-Saturday)

  // Updated
  lastUpdated: Date;
}

export interface FeedbackInsight {
  userId: string;
  insight: string;
  actionable: boolean;
  suggestion?: string; // What AI should do differently
  confidence: number; // 0-100
}

// Aggregated feedback for the AI engine
export interface GlobalFeedbackMetrics {
  totalSubmissions: number;
  averageBoundaryPushLevel: number;
  averageSerendipityScore: number;

  topDismissalReasons: {
    reasonId: string;
    reasonLabel: string;
    percentage: number;
  }[];

  optimalChallengeDistribution: {
    tooEasy: number; // percentage
    comfortable: number;
    perfectStretch: number;
    challenging: number;
    tooIntense: number;
  };
}

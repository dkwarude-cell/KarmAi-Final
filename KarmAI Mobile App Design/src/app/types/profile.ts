export interface UserProfile {
  // Basic Info
  name: string;
  college: string;
  course: string;
  year: string;
  avatar?: string;

  // Interest Layer
  primaryInterests: string[];
  hiddenInterests: string[];

  // Behavior Inputs
  activeHours: "morning" | "afternoon" | "evening" | "night" | "flexible";
  activityPreference: "solo" | "social" | "both";
  environmentPreference: "indoor" | "outdoor" | "both";
  budgetLevel: "free" | "low" | "medium" | "high";

  // Intent Layer
  currentIntent: "meet-people" | "explore-places" | "build-skills" | "find-opportunities" | "break-routine";

  // Exploration Preferences
  distanceWillingness: "1km" | "5km" | "citywide" | "anywhere";
  travelOpenness: "local" | "intercity" | "national";

  // Behavioral Traits (AI detected)
  personality: "introvert" | "extrovert" | "ambivert";
  explorationStyle: "cautious" | "balanced" | "adventurous";

  // Stats
  bubblePercentage: number;
  placesVisited: number;
  connectionsMode: number;
  daysSinceStart: number;

  // NEW: Serendipity Learning Profile
  serendipityProfile?: {
    optimalBoundaryPushLevel: number; // AI-learned sweet spot (0-100)
    averageSerendipityScore: number;
    totalFeedbackSubmitted: number;
    preferredChallengeRange: { min: number; max: number };
  };

  // NEW: Club Admin Role
  isClubAdmin?: boolean;
  clubAdminFor?: string[]; // Array of club IDs
}

export const defaultProfile: UserProfile = {
  name: "Priya Raut",
  college: "ICT Mumbai",
  course: "Design + Tech",
  year: "3rd Year",
  primaryInterests: ["Photography", "Music", "Tech", "Design", "Film", "Reading"],
  hiddenInterests: ["Philosophy", "Fine Arts"],
  activeHours: "afternoon",
  activityPreference: "both",
  environmentPreference: "both",
  budgetLevel: "low",
  currentIntent: "meet-people",
  distanceWillingness: "5km",
  travelOpenness: "local",
  personality: "introvert",
  explorationStyle: "cautious",
  bubblePercentage: 23,
  placesVisited: 12,
  connectionsMode: 0,
  daysSinceStart: 90,
  serendipityProfile: {
    optimalBoundaryPushLevel: 55, // Slightly challenging
    averageSerendipityScore: 62,
    totalFeedbackSubmitted: 8,
    preferredChallengeRange: { min: 40, max: 70 },
  },
  isClubAdmin: true,
  clubAdminFor: ["photography-club"],
};

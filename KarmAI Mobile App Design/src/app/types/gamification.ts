export interface GamificationState {
  karmaPoints: number;
  xp: number;
  level: number;
  levelName: "Explorer" | "Connector" | "Challenger" | "Pioneer" | "Legend";
  weeklyStreak: number;
  badges: Badge[];
  rewards: Reward[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt?: Date;
  category: "exploration" | "connection" | "challenge" | "special" | "creator";
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface Reward {
  id: string;
  type: "discount" | "free-item" | "event-pass" | "cash";
  title: string;
  description: string;
  value: number;
  pointsCost: number;
  businessName: string;
  expiresAt?: Date;
  redeemed: boolean;
}

export interface Visit {
  id: string;
  placeId: string;
  placeName: string;
  category: string;
  timestamp: Date;
  verified: boolean;
  karmaEarned: number;
  xpEarned: number;
  businessCommission?: number;

  // NEW: Club event tracking
  relatedCampaignId?: string; // If this check-in was for a club event
  bubbleBurstBonus?: number; // Extra karma for attending outside-bubble events
}

// NEW: Club karma tracking
export interface ClubKarma {
  clubId: string;
  clubName: string;
  totalKarmaEarned: number;
  totalEventsCreated: number;
  totalStudentAttendance: number;
  averageBubbleBurstScore: number;
  milestones: {
    id: string;
    threshold: number;
    karmaReward: number;
    achieved: boolean;
    achievedAt?: Date;
  }[];
}

export const defaultGamification: GamificationState = {
  karmaPoints: 450,
  xp: 1250,
  level: 3,
  levelName: "Explorer",
  weeklyStreak: 5,
  badges: [
    {
      id: "first-drift",
      name: "First Drift",
      icon: "🚀",
      description: "Completed your first drift mission",
      earnedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      category: "exploration",
      rarity: "common",
    },
    {
      id: "heritage-explorer",
      name: "Heritage Explorer",
      icon: "🏛️",
      description: "Visited 3 heritage sites",
      earnedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      category: "exploration",
      rarity: "rare",
    },
    {
      id: "connector",
      name: "People Connector",
      icon: "🤝",
      description: "Made 5 real-world connections",
      category: "connection",
      rarity: "rare",
    },
  ],
  rewards: [
    {
      id: "cafe-50",
      type: "discount",
      title: "50% off at Counter 7",
      description: "Valid on any order above ₹200",
      value: 50,
      pointsCost: 200,
      businessName: "Counter 7 Cafe",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      redeemed: false,
    },
    {
      id: "museum-free",
      type: "free-item",
      title: "Free Museum Entry",
      description: "Dr. Bhau Daji Lad Museum",
      value: 100,
      pointsCost: 300,
      businessName: "BDLM",
      expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      redeemed: false,
    },
    {
      id: "workshop-pass",
      type: "event-pass",
      title: "Photography Workshop Pass",
      description: "2-day workshop at Prithvi Theatre",
      value: 500,
      pointsCost: 800,
      businessName: "Prithvi Theatre",
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      redeemed: false,
    },
  ],
};

export const getLevelName = (xp: number): string => {
  if (xp < 500) return "Explorer";
  if (xp < 1500) return "Connector";
  if (xp < 3000) return "Challenger";
  if (xp < 5000) return "Pioneer";
  return "Legend";
};

export const getXPForNextLevel = (currentXP: number): number => {
  if (currentXP < 500) return 500;
  if (currentXP < 1500) return 1500;
  if (currentXP < 3000) return 3000;
  if (currentXP < 5000) return 5000;
  return 10000;
};

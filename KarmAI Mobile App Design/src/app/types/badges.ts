export type BadgeRarity = "bronze" | "silver" | "gold" | "platinum" | "diamond";
export type BadgeCategory =
  | "distance"
  | "social"
  | "time"
  | "category"
  | "combo"
  | "seasonal"
  | "rare"
  | "streak";

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: BadgeCategory;
  rarity: BadgeRarity;
  level: number; // 1-5 (Bronze to Diamond)
  requirement: string;
  earned: boolean;
  earnedAt?: Date;
  progress?: number; // 0-100
  color: string;
}

export interface BadgeProgress {
  badgeId: string;
  current: number;
  total: number;
  percentage: number;
}

// Badge definitions
export const BADGE_DEFINITIONS: Omit<Badge, "earned" | "earnedAt" | "progress">[] = [
  // DISTANCE BADGES
  {
    id: "local-hero-bronze",
    name: "Local Hero",
    description: "Travel 1km total",
    emoji: "🚶",
    category: "distance",
    rarity: "bronze",
    level: 1,
    requirement: "1km",
    color: "#CD7F32",
  },
  {
    id: "local-hero-silver",
    name: "Local Champion",
    description: "Travel 5km total",
    emoji: "🚶",
    category: "distance",
    rarity: "silver",
    level: 2,
    requirement: "5km",
    color: "#C0C0C0",
  },
  {
    id: "city-explorer-gold",
    name: "City Explorer",
    description: "Travel 10km total",
    emoji: "🏃",
    category: "distance",
    rarity: "gold",
    level: 3,
    requirement: "10km",
    color: "#FFD700",
  },
  {
    id: "city-explorer-platinum",
    name: "Urban Adventurer",
    description: "Travel 25km total",
    emoji: "🏃",
    category: "distance",
    rarity: "platinum",
    level: 4,
    requirement: "25km",
    color: "#E5E4E2",
  },
  {
    id: "road-tripper-diamond",
    name: "Road Tripper",
    description: "Travel 50km+ total",
    emoji: "🚀",
    category: "distance",
    rarity: "diamond",
    level: 5,
    requirement: "50km",
    color: "#B9F2FF",
  },

  // SOCIAL BADGES
  {
    id: "connector-bronze",
    name: "Connector",
    description: "Make 5 connections",
    emoji: "🤝",
    category: "social",
    rarity: "bronze",
    level: 1,
    requirement: "5 connections",
    color: "#CD7F32",
  },
  {
    id: "network-builder-silver",
    name: "Network Builder",
    description: "Make 20 connections",
    emoji: "🌐",
    category: "social",
    rarity: "silver",
    level: 2,
    requirement: "20 connections",
    color: "#C0C0C0",
  },
  {
    id: "community-leader-gold",
    name: "Community Leader",
    description: "Make 50 connections",
    emoji: "👥",
    category: "social",
    rarity: "gold",
    level: 3,
    requirement: "50 connections",
    color: "#FFD700",
  },
  {
    id: "social-butterfly-platinum",
    name: "Social Butterfly",
    description: "Make 100 connections",
    emoji: "🦋",
    category: "social",
    rarity: "platinum",
    level: 4,
    requirement: "100 connections",
    color: "#E5E4E2",
  },

  // TIME-BASED BADGES
  {
    id: "night-owl",
    name: "Night Owl",
    description: "Visit 5 places between 9pm-12am",
    emoji: "🦉",
    category: "time",
    rarity: "silver",
    level: 2,
    requirement: "5 night visits",
    color: "#C0C0C0",
  },
  {
    id: "early-bird",
    name: "Early Bird",
    description: "Visit 5 places between 6-9am",
    emoji: "🌅",
    category: "time",
    rarity: "silver",
    level: 2,
    requirement: "5 morning visits",
    color: "#C0C0C0",
  },
  {
    id: "weekend-warrior",
    name: "Weekend Warrior",
    description: "Visit 10 places on weekends",
    emoji: "⚔️",
    category: "time",
    rarity: "gold",
    level: 3,
    requirement: "10 weekend visits",
    color: "#FFD700",
  },

  // CATEGORY MASTER BADGES
  {
    id: "heritage-master",
    name: "Heritage Master",
    description: "Complete all heritage locations",
    emoji: "🏛️",
    category: "category",
    rarity: "gold",
    level: 3,
    requirement: "All heritage",
    color: "#FFD700",
  },
  {
    id: "foodie-king",
    name: "Foodie King",
    description: "Complete all cafe & restaurant locations",
    emoji: "🍔",
    category: "category",
    rarity: "gold",
    level: 3,
    requirement: "All food",
    color: "#FFD700",
  },
  {
    id: "culture-connoisseur",
    name: "Culture Connoisseur",
    description: "Complete all culture locations",
    emoji: "🎭",
    category: "category",
    rarity: "gold",
    level: 3,
    requirement: "All culture",
    color: "#FFD700",
  },
  {
    id: "adventure-seeker",
    name: "Adventure Seeker",
    description: "Complete all adventure locations",
    emoji: "⛰️",
    category: "category",
    rarity: "gold",
    level: 3,
    requirement: "All adventure",
    color: "#FFD700",
  },

  // COMBO BADGES
  {
    id: "variety-explorer",
    name: "Variety Explorer",
    description: "Visit 3 different categories in one day",
    emoji: "🎯",
    category: "combo",
    rarity: "silver",
    level: 2,
    requirement: "3 categories/day",
    color: "#C0C0C0",
  },
  {
    id: "omni-explorer",
    name: "Omni Explorer",
    description: "Visit all 5 categories in one week",
    emoji: "🌟",
    category: "combo",
    rarity: "platinum",
    level: 4,
    requirement: "5 categories/week",
    color: "#E5E4E2",
  },

  // SEASONAL BADGES
  {
    id: "monsoon-explorer",
    name: "Monsoon Explorer",
    description: "Visit 10 places during monsoon season",
    emoji: "🌧️",
    category: "seasonal",
    rarity: "silver",
    level: 2,
    requirement: "10 monsoon visits",
    color: "#C0C0C0",
  },
  {
    id: "summer-adventurer",
    name: "Summer Adventurer",
    description: "Visit 10 places during summer",
    emoji: "☀️",
    category: "seasonal",
    rarity: "silver",
    level: 2,
    requirement: "10 summer visits",
    color: "#C0C0C0",
  },

  // RARE/SPECIAL BADGES
  {
    id: "lucky-seven",
    name: "Lucky Seven",
    description: "Visit on 7th day of month at 7pm",
    emoji: "🍀",
    category: "rare",
    rarity: "diamond",
    level: 5,
    requirement: "7th @ 7pm",
    color: "#B9F2FF",
  },
  {
    id: "serendipity-master",
    name: "Serendipity Master",
    description: "Complete 10 visits with 100% AI match",
    emoji: "✨",
    category: "rare",
    rarity: "diamond",
    level: 5,
    requirement: "10x 100% match",
    color: "#B9F2FF",
  },
  {
    id: "first-visit-pioneer",
    name: "Pioneer",
    description: "Be the first to visit a new location",
    emoji: "🚩",
    category: "rare",
    rarity: "platinum",
    level: 4,
    requirement: "First visitor",
    color: "#E5E4E2",
  },

  // STREAK BADGES
  {
    id: "consistency-bronze",
    name: "Consistent",
    description: "Maintain a 3-day streak",
    emoji: "🔥",
    category: "streak",
    rarity: "bronze",
    level: 1,
    requirement: "3 days",
    color: "#CD7F32",
  },
  {
    id: "dedicated-silver",
    name: "Dedicated",
    description: "Maintain a 7-day streak",
    emoji: "🔥",
    category: "streak",
    rarity: "silver",
    level: 2,
    requirement: "7 days",
    color: "#C0C0C0",
  },
  {
    id: "committed-gold",
    name: "Committed",
    description: "Maintain a 14-day streak",
    emoji: "🔥",
    category: "streak",
    rarity: "gold",
    level: 3,
    requirement: "14 days",
    color: "#FFD700",
  },
  {
    id: "unstoppable-platinum",
    name: "Unstoppable",
    description: "Maintain a 30-day streak",
    emoji: "🔥",
    category: "streak",
    rarity: "platinum",
    level: 4,
    requirement: "30 days",
    color: "#E5E4E2",
  },
  {
    id: "legendary-streak",
    name: "Legendary Streak",
    description: "Maintain a 100-day streak",
    emoji: "👑",
    category: "streak",
    rarity: "diamond",
    level: 5,
    requirement: "100 days",
    color: "#B9F2FF",
  },
];

export const RARITY_COLORS = {
  bronze: "#CD7F32",
  silver: "#C0C0C0",
  gold: "#FFD700",
  platinum: "#E5E4E2",
  diamond: "#B9F2FF",
};

export const RARITY_GRADIENTS = {
  bronze: "linear-gradient(135deg, #CD7F32, #B87333)",
  silver: "linear-gradient(135deg, #C0C0C0, #AAA9AD)",
  gold: "linear-gradient(135deg, #FFD700, #FFA500)",
  platinum: "linear-gradient(135deg, #E5E4E2, #D4D4D4)",
  diamond: "linear-gradient(135deg, #B9F2FF, #4FC3F7)",
};

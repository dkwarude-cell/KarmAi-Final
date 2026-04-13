export type RewardTier = "instant" | "experience" | "premium" | "limited";
export type RewardStatus = "available" | "redeemed" | "expired";

export interface Reward {
  id: string;
  name: string;
  description: string;
  karmaCost: number;
  tier: RewardTier;
  category: string;
  emoji: string;
  image?: string;
  partnerId?: string;
  partnerName?: string;
  expiryDate?: Date;
  stock?: number;
  isFlashDeal?: boolean;
  flashDiscount?: number; // percentage
  flashExpiresIn?: number; // milliseconds
  redemptionCode?: string;
  terms?: string[];
  popularity?: number; // 0-100
}

export interface RedeemedReward extends Reward {
  redeemedAt: Date;
  qrCode: string;
  expiresAt: Date;
  status: RewardStatus;
}

// Reward catalog
export const REWARD_CATALOG: Reward[] = [
  // INSTANT REWARDS (Low Karma)
  {
    id: "coffee-voucher-1",
    name: "Free Coffee",
    description: "Get a complimentary coffee at any partner cafe",
    karmaCost: 200,
    tier: "instant",
    category: "Food & Beverage",
    emoji: "☕",
    partnerName: "Cafe Coffee Day",
    terms: ["Valid for 7 days", "One per user per week", "Not valid with other offers"],
    popularity: 95,
  },
  {
    id: "tea-voucher-1",
    name: "Free Tea",
    description: "Enjoy a complimentary tea at select cafes",
    karmaCost: 200,
    tier: "instant",
    category: "Food & Beverage",
    emoji: "🍵",
    partnerName: "Chaayos",
    terms: ["Valid for 7 days"],
    popularity: 88,
  },
  {
    id: "food-discount-1",
    name: "20% Food Discount",
    description: "Get 20% off on your total bill",
    karmaCost: 300,
    tier: "instant",
    category: "Food & Beverage",
    emoji: "🍔",
    partnerName: "McDonald's",
    terms: ["Valid for 14 days", "Maximum discount: ₹200"],
    popularity: 92,
  },
  {
    id: "delivery-discount-1",
    name: "Food Delivery Credit",
    description: "₹100 off on your next food order",
    karmaCost: 400,
    tier: "instant",
    category: "Food & Beverage",
    emoji: "🛵",
    partnerName: "Swiggy",
    terms: ["Valid for 30 days", "Minimum order: ₹300"],
    popularity: 96,
  },
  {
    id: "transport-credit-1",
    name: "Ride Credit",
    description: "₹150 off on your next ride",
    karmaCost: 400,
    tier: "instant",
    category: "Transportation",
    emoji: "🚕",
    partnerName: "Uber",
    terms: ["Valid for 14 days", "One-time use"],
    popularity: 90,
  },
  {
    id: "snack-voucher",
    name: "Free Snack",
    description: "Get a free snack item",
    karmaCost: 250,
    tier: "instant",
    category: "Food & Beverage",
    emoji: "🍿",
    partnerName: "PVR Cinemas",
    terms: ["Valid at PVR food counters"],
    popularity: 85,
  },

  // EXPERIENCE REWARDS (Medium Karma)
  {
    id: "museum-pass-1",
    name: "Museum Entry Pass",
    description: "Free entry to select museums",
    karmaCost: 800,
    tier: "experience",
    category: "Culture",
    emoji: "🏛️",
    partnerName: "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya",
    terms: ["Valid for 30 days", "Includes all exhibitions"],
    popularity: 78,
  },
  {
    id: "art-gallery-pass",
    name: "Art Gallery Pass",
    description: "Entry to contemporary art exhibitions",
    karmaCost: 1000,
    tier: "experience",
    category: "Culture",
    emoji: "🎨",
    partnerName: "Jehangir Art Gallery",
    terms: ["Valid for 60 days", "Access to special events"],
    popularity: 72,
  },
  {
    id: "movie-ticket-1",
    name: "Movie Ticket",
    description: "2 movie tickets for weekend shows",
    karmaCost: 600,
    tier: "experience",
    category: "Entertainment",
    emoji: "🎬",
    partnerName: "INOX",
    terms: ["Valid on weekends", "Excludes premium screens"],
    popularity: 94,
  },
  {
    id: "workshop-pass",
    name: "Creative Workshop",
    description: "Photography or art workshop registration",
    karmaCost: 1000,
    tier: "experience",
    category: "Learning",
    emoji: "📸",
    partnerName: "Light & Life Academy",
    terms: ["Subject to availability", "1 workshop session"],
    popularity: 68,
  },
  {
    id: "escape-room",
    name: "Escape Room Entry",
    description: "One escape room game session",
    karmaCost: 1500,
    tier: "experience",
    category: "Entertainment",
    emoji: "🔐",
    partnerName: "Breakout",
    terms: ["Team of 2-6 people", "Advance booking required"],
    popularity: 82,
  },
  {
    id: "yoga-session",
    name: "Yoga Class Pass",
    description: "5 yoga sessions at premium studios",
    karmaCost: 1200,
    tier: "experience",
    category: "Wellness",
    emoji: "🧘",
    partnerName: "The Yoga Institute",
    terms: ["Valid for 60 days", "All levels welcome"],
    popularity: 75,
  },

  // PREMIUM REWARDS (High Karma)
  {
    id: "weekend-getaway-1",
    name: "Weekend Getaway",
    description: "2-day staycation at hill stations",
    karmaCost: 5000,
    tier: "premium",
    category: "Travel",
    emoji: "🏔️",
    partnerName: "OYO Rooms",
    terms: ["Includes accommodation", "Breakfast included", "Subject to availability"],
    popularity: 65,
  },
  {
    id: "concert-vip",
    name: "Concert VIP Pass",
    description: "VIP entry to upcoming concerts",
    karmaCost: 3000,
    tier: "premium",
    category: "Entertainment",
    emoji: "🎵",
    partnerName: "BookMyShow",
    terms: ["Subject to event availability", "Includes backstage access"],
    popularity: 88,
  },
  {
    id: "fine-dining",
    name: "Fine Dining Experience",
    description: "3-course meal for 2 at luxury restaurants",
    karmaCost: 2500,
    tier: "premium",
    category: "Food & Beverage",
    emoji: "🍽️",
    partnerName: "The Table",
    terms: ["Advance reservation required", "Beverage charges extra"],
    popularity: 79,
  },
  {
    id: "adventure-bundle",
    name: "Adventure Activity Bundle",
    description: "Paragliding + Trekking package",
    karmaCost: 4000,
    tier: "premium",
    category: "Adventure",
    emoji: "🪂",
    partnerName: "Adventure Nation",
    terms: ["Valid for 90 days", "Safety equipment provided"],
    popularity: 71,
  },
  {
    id: "spa-package",
    name: "Spa & Wellness Package",
    description: "Full-day spa experience",
    karmaCost: 3500,
    tier: "premium",
    category: "Wellness",
    emoji: "💆",
    partnerName: "Four Fountains De-Stress Spa",
    terms: ["Includes massage, facial & sauna", "Advance booking required"],
    popularity: 74,
  },

  // LIMITED EDITION (Very High Karma)
  {
    id: "celebrity-meetup",
    name: "Meet Local Celebrity",
    description: "Meet & greet with Mumbai influencers",
    karmaCost: 10000,
    tier: "limited",
    category: "Exclusive",
    emoji: "⭐",
    stock: 5,
    terms: ["Limited slots", "30-minute session", "Photo opportunity included"],
    popularity: 92,
  },
  {
    id: "private-tour",
    name: "Private Heritage Tour",
    description: "Exclusive tour of restricted heritage sites",
    karmaCost: 8000,
    tier: "limited",
    category: "Culture",
    emoji: "🏰",
    stock: 10,
    terms: ["Expert guide included", "Small group (max 5)", "Access to restricted areas"],
    popularity: 85,
  },
  {
    id: "lifetime-membership",
    name: "Gym Lifetime Membership",
    description: "Lifetime access to premium gym chain",
    karmaCost: 15000,
    tier: "limited",
    category: "Wellness",
    emoji: "🏋️",
    stock: 3,
    terms: ["One-time offer", "Transferable", "All locations included"],
    popularity: 98,
  },
  {
    id: "masterclass",
    name: "Industry Masterclass",
    description: "Learn from industry leaders",
    karmaCost: 7000,
    tier: "limited",
    category: "Learning",
    emoji: "🎓",
    stock: 20,
    terms: ["Certificate provided", "Networking opportunity", "Recorded session access"],
    popularity: 87,
  },
];

export const TIER_COLORS = {
  instant: "#0D9488",
  experience: "#7C5CE8",
  premium: "#D97706",
  limited: "#EF4444",
};

export const TIER_LABELS = {
  instant: "Instant Rewards",
  experience: "Experience Rewards",
  premium: "Premium Rewards",
  limited: "Limited Edition",
};

export interface KarmaCalculationResult {
  baseKarma: number;
  bonuses: KarmaBonus[];
  totalKarma: number;
  multiplier: number;
}

export interface KarmaBonus {
  type: string;
  name: string;
  amount: number;
  multiplier?: number;
  description: string;
}

export interface VisitContext {
  distance: number; // in km
  isFirstVisit: boolean;
  category: string;
  userPreferredCategories: string[];
  timeOfDay: number; // 0-23
  isWeekend: boolean;
  visitedWithConnections: boolean;
  connectionCount?: number;
  currentStreak: number;
  locationRarity: "common" | "uncommon" | "rare" | "legendary";
  userLevel: number;
}

/**
 * Calculate karma earned from a visit with all bonuses and multipliers
 */
export function calculateKarma(context: VisitContext): KarmaCalculationResult {
  const baseKarma = getBaseKarma(context.locationRarity);
  const bonuses: KarmaBonus[] = [];
  let totalMultiplier = 1.0;

  // FIRST VISIT BONUS (2x)
  if (context.isFirstVisit) {
    totalMultiplier *= 2.0;
    bonuses.push({
      type: "first-visit",
      name: "First Visit Bonus",
      amount: baseKarma,
      multiplier: 2.0,
      description: "First time visiting this location",
    });
  }

  // DISTANCE BONUS (+10% per km beyond 5km)
  if (context.distance > 5) {
    const distanceBonus = Math.floor((context.distance - 5) * 0.1 * 100) / 100;
    const distanceBonusKarma = Math.floor(baseKarma * distanceBonus);
    bonuses.push({
      type: "distance",
      name: "Distance Bonus",
      amount: distanceBonusKarma,
      multiplier: 1 + distanceBonus,
      description: `Traveled ${context.distance.toFixed(1)}km (${distanceBonus * 100}% bonus)`,
    });
    totalMultiplier *= (1 + distanceBonus);
  }

  // COMFORT ZONE BONUS (+50% if outside preferred categories)
  const isOutsideComfortZone = !context.userPreferredCategories.includes(context.category);
  if (isOutsideComfortZone) {
    const comfortZoneBonus = Math.floor(baseKarma * 0.5);
    bonuses.push({
      type: "comfort-zone",
      name: "Comfort Zone Bonus",
      amount: comfortZoneBonus,
      multiplier: 1.5,
      description: "Explored outside your usual categories",
    });
    totalMultiplier *= 1.5;
  }

  // TIME CHALLENGE BONUS (+25% for early morning or late night)
  const isEarlyMorning = context.timeOfDay >= 6 && context.timeOfDay < 9;
  const isLateNight = context.timeOfDay >= 21 && context.timeOfDay < 24;
  if (isEarlyMorning || isLateNight) {
    const timeBonus = Math.floor(baseKarma * 0.25);
    bonuses.push({
      type: "time-challenge",
      name: isEarlyMorning ? "Early Bird Bonus" : "Night Owl Bonus",
      amount: timeBonus,
      multiplier: 1.25,
      description: `Visited during ${isEarlyMorning ? "early morning" : "late night"}`,
    });
    totalMultiplier *= 1.25;
  }

  // GROUP VISIT BONUS (+30% when visiting with connections)
  if (context.visitedWithConnections && context.connectionCount) {
    const groupBonus = Math.floor(baseKarma * 0.3);
    bonuses.push({
      type: "group-visit",
      name: "Group Visit Bonus",
      amount: groupBonus,
      multiplier: 1.3,
      description: `Visited with ${context.connectionCount} connection(s)`,
    });
    totalMultiplier *= 1.3;
  }

  // STREAK MULTIPLIER (1.1x per consecutive day, max 2x at 10 days)
  if (context.currentStreak > 0) {
    const streakMultiplier = Math.min(1 + (context.currentStreak * 0.1), 2.0);
    const streakBonus = Math.floor(baseKarma * (streakMultiplier - 1));
    bonuses.push({
      type: "streak",
      name: "Streak Multiplier",
      amount: streakBonus,
      multiplier: streakMultiplier,
      description: `${context.currentStreak} day streak (${((streakMultiplier - 1) * 100).toFixed(0)}% bonus)`,
    });
    totalMultiplier *= streakMultiplier;
  }

  // RARITY BONUS (multiplier based on location rarity)
  const rarityMultipliers = {
    common: 1.0,
    uncommon: 1.5,
    rare: 3.0,
    legendary: 5.0,
  };
  const rarityMultiplier = rarityMultipliers[context.locationRarity];
  if (rarityMultiplier > 1.0) {
    const rarityBonus = Math.floor(baseKarma * (rarityMultiplier - 1));
    bonuses.push({
      type: "rarity",
      name: "Rarity Bonus",
      amount: rarityBonus,
      multiplier: rarityMultiplier,
      description: `${context.locationRarity.charAt(0).toUpperCase() + context.locationRarity.slice(1)} location`,
    });
    totalMultiplier *= rarityMultiplier;
  }

  // LEVEL BONUS (+2% karma earning rate per level)
  if (context.userLevel > 1) {
    const levelBonusPercent = context.userLevel * 0.02;
    const levelBonus = Math.floor(baseKarma * levelBonusPercent);
    bonuses.push({
      type: "level",
      name: "Level Bonus",
      amount: levelBonus,
      multiplier: 1 + levelBonusPercent,
      description: `Level ${context.userLevel} (${(levelBonusPercent * 100).toFixed(0)}% boost)`,
    });
    totalMultiplier *= (1 + levelBonusPercent);
  }

  // WEEKEND BONUS (+15% on weekends)
  if (context.isWeekend) {
    const weekendBonus = Math.floor(baseKarma * 0.15);
    bonuses.push({
      type: "weekend",
      name: "Weekend Bonus",
      amount: weekendBonus,
      multiplier: 1.15,
      description: "Weekend visit bonus",
    });
    totalMultiplier *= 1.15;
  }

  const totalKarma = Math.floor(baseKarma * totalMultiplier);

  return {
    baseKarma,
    bonuses,
    totalKarma,
    multiplier: totalMultiplier,
  };
}

/**
 * Get base karma for a location based on rarity
 */
function getBaseKarma(rarity: "common" | "uncommon" | "rare" | "legendary"): number {
  const baseKarmaMap = {
    common: 50,
    uncommon: 75,
    rare: 100,
    legendary: 200,
  };
  return baseKarmaMap[rarity];
}

/**
 * Calculate XP needed for a given level
 */
export function calculateXPForLevel(level: number): number {
  if (level === 1) return 0;
  // Exponential growth formula: XP = 100 * (level^2)
  return 100 * Math.pow(level, 2);
}

/**
 * Calculate total XP needed to reach a level from level 1
 */
export function calculateTotalXPToLevel(level: number): number {
  let totalXP = 0;
  for (let i = 2; i <= level; i++) {
    totalXP += calculateXPForLevel(i);
  }
  return totalXP;
}

/**
 * Get level from total XP
 */
export function getLevelFromXP(totalXP: number): number {
  let level = 1;
  let xpForNextLevel = calculateXPForLevel(2);
  let cumulativeXP = 0;

  while (cumulativeXP + xpForNextLevel <= totalXP && level < 100) {
    cumulativeXP += xpForNextLevel;
    level++;
    xpForNextLevel = calculateXPForLevel(level + 1);
  }

  return level;
}

/**
 * Get progress to next level as percentage
 */
export function getProgressToNextLevel(totalXP: number): {
  currentLevel: number;
  nextLevel: number;
  currentLevelXP: number;
  nextLevelXP: number;
  progressXP: number;
  progressPercent: number;
} {
  const currentLevel = getLevelFromXP(totalXP);
  const nextLevel = currentLevel + 1;
  const currentLevelTotalXP = calculateTotalXPToLevel(currentLevel);
  const nextLevelTotalXP = calculateTotalXPToLevel(nextLevel);
  const progressXP = totalXP - currentLevelTotalXP;
  const xpNeededForNext = nextLevelTotalXP - currentLevelTotalXP;
  const progressPercent = (progressXP / xpNeededForNext) * 100;

  return {
    currentLevel,
    nextLevel,
    currentLevelXP: currentLevelTotalXP,
    nextLevelXP: nextLevelTotalXP,
    progressXP,
    progressPercent: Math.min(progressPercent, 100),
  };
}

/**
 * Get level tier name
 */
export function getLevelTierName(level: number): string {
  if (level < 5) return "Novice";
  if (level < 15) return "Explorer";
  if (level < 30) return "Pathfinder";
  if (level < 50) return "Adventurer";
  if (level < 75) return "Trailblazer";
  return "Legend";
}

/**
 * Calculate diminishing returns for repeat visits
 * Same location gives 50% karma on repeat visit within 7 days
 */
export function applyDiminishingReturns(
  karma: number,
  lastVisitDate: Date | null,
  currentDate: Date = new Date()
): number {
  if (!lastVisitDate) return karma;

  const daysSinceLastVisit = Math.floor(
    (currentDate.getTime() - lastVisitDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysSinceLastVisit < 7) {
    return Math.floor(karma * 0.5);
  }

  return karma;
}

/**
 * Type definitions for Club Creator Studio
 * Supports AI-powered event creation and anti-bubble campaign generation
 */

export interface GeneratedCampaign {
  id: string;
  clubId: string;
  clubName: string;
  title: string;
  description: string;
  suggestedTags: string[];
  posterPreviewUrl?: string;
  bubbleBurstScore: number; // 0-100, how much this reaches outside typical audience
  createdAt: Date;
  published: boolean;
  karmaReward: {
    studentAttendance: number; // Karma per student check-in
    clubMilestone: number; // Bonus karma when threshold reached
  };
}

export interface ClubProfile {
  id: string;
  name: string;
  category: "technical" | "cultural" | "sports" | "academic" | "social";
  memberCount: number;
  adminUserIds: string[];
  totalEventsCreated: number;
  totalKarmaEarned: number;
  bubbleBurstAverage: number; // Average bubble-burst score across campaigns
}

export interface EventPoster {
  id: string;
  campaignId: string;
  templateId?: string;
  imageUrl: string;
  width: number;
  height: number;
  generatedByAI: boolean;
}

export interface AIGenerationRequest {
  eventIdea: string;
  clubName: string;
  clubCategory: string;
  targetAudience?: string[];
  preferredStyle?: "modern" | "minimalist" | "vibrant" | "academic";
}

export interface AIGenerationResponse {
  title: string;
  description: string;
  suggestedTags: string[];
  bubbleBurstScore: number;
  reasoning: string; // Why these tags were chosen
  posterUrl?: string;
}

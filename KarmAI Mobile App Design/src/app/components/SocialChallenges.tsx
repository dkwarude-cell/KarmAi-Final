import { motion } from "motion/react";
import { useState } from "react";
import { Swords, Users, Target, Trophy, Clock, ChevronRight } from "lucide-react";

type ChallengeType = "direct" | "team" | "rivalry";

interface Challenge {
  id: string;
  type: ChallengeType;
  title: string;
  description: string;
  participants: Participant[];
  goal: number;
  progress: Record<string, number>;
  reward: number; // karma
  deadline: Date;
  status: "active" | "completed" | "expired";
  category?: string;
}

interface Participant {
  id: string;
  name: string;
  avatar?: string;
  college?: string;
}

interface Rivalry {
  id: string;
  opponent: Participant;
  weeklyScore: { you: number; them: number };
  status: "leading" | "trailing" | "tied";
  endsIn: string;
}

interface TeamQuest {
  id: string;
  name: string;
  members: Participant[];
  goal: number;
  currentProgress: number;
  reward: number;
  deadline: Date;
  status: "active" | "completed";
}

interface SocialChallengesProps {
  currentUserId: string;
  onClose: () => void;
}

export default function SocialChallenges({ currentUserId, onClose }: SocialChallengesProps) {
  const [activeTab, setActiveTab] = useState<"challenges" | "rivalries" | "quests">("challenges");

  // Mock data
  const challenges: Challenge[] = [
    {
      id: "c1",
      type: "direct",
      title: "Heritage Explorer Challenge",
      description: "Visit 3 heritage sites before your friend",
      participants: [
        { id: currentUserId, name: "You" },
        { id: "u2", name: "Priya", college: "VJTI" },
      ],
      goal: 3,
      progress: { [currentUserId]: 2, u2: 1 },
      reward: 500,
      deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      status: "active",
      category: "heritage",
    },
    {
      id: "c2",
      type: "direct",
      title: "Foodie Sprint",
      description: "Discover 5 new cafes this week",
      participants: [
        { id: currentUserId, name: "You" },
        { id: "u5", name: "Arjun", college: "IIT Bombay" },
      ],
      goal: 5,
      progress: { [currentUserId]: 3, u5: 4 },
      reward: 750,
      deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      status: "active",
      category: "cafes",
    },
    {
      id: "c3",
      type: "direct",
      title: "Distance Champion",
      description: "Travel 10km exploring new places",
      participants: [
        { id: currentUserId, name: "You" },
        { id: "u6", name: "Ananya", college: "VJTI" },
      ],
      goal: 10,
      progress: { [currentUserId]: 7.5, u6: 6.2 },
      reward: 1000,
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      status: "active",
    },
  ];

  const rivalries: Rivalry[] = [
    {
      id: "r1",
      opponent: { id: "u6", name: "Ananya Singh", college: "VJTI" },
      weeklyScore: { you: 2450, them: 2280 },
      status: "leading",
      endsIn: "3 days",
    },
    {
      id: "r2",
      opponent: { id: "u9", name: "Kavya Nair", college: "DJ Sanghvi" },
      weeklyScore: { you: 2450, them: 2650 },
      status: "trailing",
      endsIn: "3 days",
    },
  ];

  const teamQuests: TeamQuest[] = [
    {
      id: "q1",
      name: "College Pride Quest",
      members: [
        { id: currentUserId, name: "You", college: "VJTI" },
        { id: "u2", name: "Priya", college: "VJTI" },
        { id: "u6", name: "Ananya", college: "VJTI" },
        { id: "u11", name: "Sameer", college: "VJTI" },
      ],
      goal: 50,
      currentProgress: 32,
      reward: 5000,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: "active",
    },
    {
      id: "q2",
      name: "Heritage Hunters",
      members: [
        { id: currentUserId, name: "You" },
        { id: "u5", name: "Arjun", college: "IIT Bombay" },
        { id: "u7", name: "Rohan", college: "SPIT" },
      ],
      goal: 20,
      currentProgress: 14,
      reward: 3000,
      deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      status: "active",
    },
  ];

  const tabs = [
    { id: "challenges" as const, label: "Challenges", emoji: "⚔️", count: challenges.length },
    { id: "rivalries" as const, label: "Rivalries", emoji: "🎯", count: rivalries.length },
    { id: "quests" as const, label: "Team Quests", emoji: "👥", count: teamQuests.length },
  ];

  return (
    <div className="absolute inset-0 z-50 bg-[#F8F9FA] overflow-hidden">
      {/* Header */}
      <div
        className="px-5 pt-12 pb-4 border-b"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#E5E7EB",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#FEE2E2" }}
            >
              <Swords size={20} className="text-[#EF4444]" />
            </div>
            <div>
              <h2 className="text-[#1A1A1A] font-bold" style={{ fontSize: "20px" }}>
                Social Challenges
              </h2>
              <p className="text-[#6B7280]" style={{ fontSize: "12px" }}>
                Compete and collaborate
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#F3F4F6" }}
          >
            <span className="text-[#6B7280]">×</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 py-2 px-3 rounded-xl border transition-all"
              style={{
                backgroundColor: activeTab === tab.id ? "#EDE9FE" : "#FFFFFF",
                borderColor: activeTab === tab.id ? "#7C5CE8" : "#E5E7EB",
                color: activeTab === tab.id ? "#7C5CE8" : "#6B7280",
              }}
            >
              <div className="text-center">
                <div style={{ fontSize: "18px" }}>{tab.emoji}</div>
                <div style={{ fontSize: "11px", fontWeight: activeTab === tab.id ? 600 : 500 }}>
                  {tab.label}
                </div>
                {tab.count > 0 && (
                  <div
                    className="inline-block px-2 py-0.5 rounded-full mt-1"
                    style={{
                      backgroundColor: activeTab === tab.id ? "#7C5CE8" : "#F3F4F6",
                      color: activeTab === tab.id ? "#FFFFFF" : "#6B7280",
                      fontSize: "9px",
                      fontWeight: 600,
                    }}
                  >
                    {tab.count}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="overflow-y-auto p-5 space-y-3" style={{ height: "calc(100vh - 200px)" }}>
        {activeTab === "challenges" && (
          <>
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ChallengeCard challenge={challenge} currentUserId={currentUserId} />
              </motion.div>
            ))}
            <NewChallengeCard />
          </>
        )}

        {activeTab === "rivalries" && (
          <>
            {rivalries.map((rivalry, index) => (
              <motion.div
                key={rivalry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <RivalryCard rivalry={rivalry} />
              </motion.div>
            ))}
            <NewRivalryCard />
          </>
        )}

        {activeTab === "quests" && (
          <>
            {teamQuests.map((quest, index) => (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TeamQuestCard quest={quest} currentUserId={currentUserId} />
              </motion.div>
            ))}
            <NewQuestCard />
          </>
        )}
      </div>
    </div>
  );
}

function ChallengeCard({ challenge, currentUserId }: { challenge: Challenge; currentUserId: string }) {
  const userProgress = challenge.progress[currentUserId] || 0;
  const opponentId = challenge.participants.find(p => p.id !== currentUserId)?.id || "";
  const opponentProgress = challenge.progress[opponentId] || 0;
  const isWinning = userProgress > opponentProgress;
  const progressPercent = (userProgress / challenge.goal) * 100;

  const timeLeft = Math.ceil((challenge.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div
      className="rounded-2xl p-4 border"
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: isWinning ? "#0D9488" : "#E5E7EB",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-[#1A1A1A] font-bold mb-1" style={{ fontSize: "15px" }}>
            {challenge.title}
          </h4>
          <p className="text-[#6B7280] mb-2" style={{ fontSize: "12px" }}>
            {challenge.description}
          </p>
        </div>
        <div
          className="px-2 py-1 rounded-full whitespace-nowrap"
          style={{
            backgroundColor: isWinning ? "#CCFBF1" : "#FEE2E2",
            color: isWinning ? "#0D9488" : "#EF4444",
            fontSize: "10px",
            fontWeight: 600,
          }}
        >
          {isWinning ? "🏆 Leading" : "🔥 Behind"}
        </div>
      </div>

      {/* Progress comparison */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[#0D9488] font-semibold" style={{ fontSize: "12px" }}>
            You: {userProgress}/{challenge.goal}
          </span>
          <span className="text-[#6B7280]" style={{ fontSize: "12px" }}>
            {challenge.participants.find(p => p.id !== currentUserId)?.name}: {opponentProgress}/{challenge.goal}
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#F3F4F6] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#0D9488] to-[#7C5CE8]"
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>
      </div>

      {/* Reward and deadline */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Trophy size={14} className="text-[#D97706]" />
            <span className="text-[#1A1A1A] font-semibold" style={{ fontSize: "12px" }}>
              {challenge.reward} Karma
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-[#6B7280]" />
            <span className="text-[#6B7280]" style={{ fontSize: "11px" }}>
              {timeLeft}d left
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RivalryCard({ rivalry }: { rivalry: Rivalry }) {
  const diff = Math.abs(rivalry.weeklyScore.you - rivalry.weeklyScore.them);

  return (
    <div
      className="rounded-2xl p-4 border"
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: rivalry.status === "leading" ? "#0D9488" : "#EF4444",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
            style={{ background: "linear-gradient(135deg, #7C5CE8, #0D9488)" }}
          >
            {rivalry.opponent.name.charAt(0)}
          </div>
          <div>
            <h4 className="text-[#1A1A1A] font-bold" style={{ fontSize: "14px" }}>
              {rivalry.opponent.name}
            </h4>
            <p className="text-[#6B7280]" style={{ fontSize: "11px" }}>
              {rivalry.opponent.college}
            </p>
          </div>
        </div>
        <div
          className="px-3 py-1 rounded-full"
          style={{
            backgroundColor: rivalry.status === "leading" ? "#CCFBF1" : "#FEE2E2",
            color: rivalry.status === "leading" ? "#0D9488" : "#EF4444",
            fontSize: "11px",
            fontWeight: 600,
          }}
        >
          {rivalry.status === "leading" ? "↑ Leading" : "↓ Behind"}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div
          className="rounded-xl p-3 text-center"
          style={{ backgroundColor: "#EDE9FE" }}
        >
          <div className="text-[#7C5CE8] font-bold mb-1" style={{ fontSize: "20px" }}>
            {rivalry.weeklyScore.you}
          </div>
          <div className="text-[#6B7280]" style={{ fontSize: "10px" }}>
            Your Score
          </div>
        </div>
        <div
          className="rounded-xl p-3 text-center"
          style={{ backgroundColor: "#F3F4F6" }}
        >
          <div className="text-[#1A1A1A] font-bold mb-1" style={{ fontSize: "20px" }}>
            {rivalry.weeklyScore.them}
          </div>
          <div className="text-[#6B7280]" style={{ fontSize: "10px" }}>
            Their Score
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[#6B7280]" style={{ fontSize: "11px" }}>
          <Clock size={12} className="inline mr-1" />
          Ends in {rivalry.endsIn}
        </span>
        <span className="text-[#1A1A1A] font-semibold" style={{ fontSize: "12px" }}>
          {rivalry.status === "leading" ? "+" : "-"}{diff} Karma
        </span>
      </div>
    </div>
  );
}

function TeamQuestCard({ quest, currentUserId }: { quest: TeamQuest; currentUserId: string }) {
  const progressPercent = (quest.currentProgress / quest.goal) * 100;
  const timeLeft = Math.ceil((quest.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div
      className="rounded-2xl p-4 border"
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: "#E5E7EB",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-[#1A1A1A] font-bold mb-1" style={{ fontSize: "15px" }}>
            {quest.name}
          </h4>
          <div className="flex items-center gap-1 text-[#6B7280]" style={{ fontSize: "11px" }}>
            <Users size={12} />
            <span>{quest.members.length} members</span>
          </div>
        </div>
      </div>

      {/* Team members */}
      <div className="flex -space-x-2 mb-3">
        {quest.members.slice(0, 5).map((member) => (
          <div
            key={member.id}
            className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-white border-2 border-white"
            style={{
              background: member.id === currentUserId
                ? "linear-gradient(135deg, #0D9488, #7C5CE8)"
                : "#9CA3AF",
              fontSize: "11px",
            }}
          >
            {member.name.charAt(0)}
          </div>
        ))}
        {quest.members.length > 5 && (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#6B7280] border-2 border-white"
            style={{ backgroundColor: "#F3F4F6", fontSize: "10px" }}
          >
            +{quest.members.length - 5}
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[#6B7280]" style={{ fontSize: "11px" }}>
            Team Progress
          </span>
          <span className="text-[#1A1A1A] font-semibold" style={{ fontSize: "12px" }}>
            {quest.currentProgress}/{quest.goal}
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#F3F4F6] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#7C5CE8] to-[#0D9488]"
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>
      </div>

      {/* Reward */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Trophy size={14} className="text-[#D97706]" />
            <span className="text-[#1A1A1A] font-semibold" style={{ fontSize: "12px" }}>
              {quest.reward} Karma (shared)
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-[#6B7280]" />
            <span className="text-[#6B7280]" style={{ fontSize: "11px" }}>
              {timeLeft}d left
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewChallengeCard() {
  return (
    <button
      className="w-full rounded-2xl p-4 border-2 border-dashed transition-all hover:border-solid"
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: "#E5E7EB",
      }}
    >
      <div className="flex items-center justify-center gap-2 text-[#6B7280]">
        <Target size={20} />
        <span style={{ fontSize: "13px", fontWeight: 500 }}>
          Create New Challenge
        </span>
        <ChevronRight size={16} />
      </div>
    </button>
  );
}

function NewRivalryCard() {
  return (
    <button
      className="w-full rounded-2xl p-4 border-2 border-dashed transition-all hover:border-solid"
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: "#E5E7EB",
      }}
    >
      <div className="flex items-center justify-center gap-2 text-[#6B7280]">
        <Swords size={20} />
        <span style={{ fontSize: "13px", fontWeight: 500 }}>
          Challenge a Rival
        </span>
        <ChevronRight size={16} />
      </div>
    </button>
  );
}

function NewQuestCard() {
  return (
    <button
      className="w-full rounded-2xl p-4 border-2 border-dashed transition-all hover:border-solid"
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: "#E5E7EB",
      }}
    >
      <div className="flex items-center justify-center gap-2 text-[#6B7280]">
        <Users size={20} />
        <span style={{ fontSize: "13px", fontWeight: 500 }}>
          Start Team Quest
        </span>
        <ChevronRight size={16} />
      </div>
    </button>
  );
}

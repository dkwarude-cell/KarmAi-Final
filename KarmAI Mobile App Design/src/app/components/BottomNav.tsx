import { Home, Map, Compass, Users, User } from "lucide-react";

interface BottomNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export default function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { name: "Home", icon: Home, screen: "home" },
    { name: "Map", icon: Map, screen: "map" },
    { name: "Explore", icon: Compass, screen: "explore" },
    { name: "Connect", icon: Users, screen: "connections" },
    { name: "Profile", icon: User, screen: "bubble" },
  ];

  return (
    <div
      className="h-[82px] border-t-[0.5px] flex items-center justify-around px-8"
      style={{
        backgroundColor: "rgba(10, 10, 15, 0.95)",
        borderColor: "rgba(255, 255, 255, 0.06)",
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeScreen === item.screen;
        return (
          <button
            key={item.name}
            onClick={() => onNavigate(item.screen)}
            className="flex flex-col items-center gap-1"
          >
            <Icon
              size={22}
              className={isActive ? "text-[#7C5CE8]" : "text-[#444455]"}
            />
            {isActive && <div className="w-1 h-1 rounded-full bg-[#7C5CE8]" />}
          </button>
        );
      })}
    </div>
  );
}

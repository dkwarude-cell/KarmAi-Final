import { motion } from "motion/react";
import { X, Bell, Lock, User, MapPin, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { useState } from "react";

interface SettingsScreenProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
}

export default function SettingsScreen({ isOpen, onClose, onLogout }: SettingsScreenProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  if (!isOpen) return null;

  const settingsSections = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Edit Profile", value: null },
        { icon: Lock, label: "Privacy & Security", value: null },
        { icon: MapPin, label: "Location Services", value: locationEnabled, toggle: true },
      ],
    },
    {
      title: "Notifications",
      items: [
        { icon: Bell, label: "Push Notifications", value: notificationsEnabled, toggle: true },
        { icon: Bell, label: "Daily Drift Reminders", value: true, toggle: true },
        { icon: Bell, label: "Reward Alerts", value: true, toggle: true },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help & FAQ", value: null },
        { icon: HelpCircle, label: "Contact Us", value: null },
        { icon: HelpCircle, label: "Terms & Privacy", value: null },
      ],
    },
  ];

  return (
    <motion.div
      className="absolute inset-0 z-50 bg-[#0A0A0F]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="h-full overflow-y-auto">
        <div className="px-5 pt-14 pb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-white font-bold" style={{ fontSize: "24px" }}>
              Settings
            </h1>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
            >
              <X size={20} className="text-white" />
            </button>
          </div>

          {/* App Version */}
          <motion.div
            className="rounded-2xl p-4 mb-6 border"
            style={{
              background: "linear-gradient(135deg, rgba(124, 92, 232, 0.1), rgba(124, 92, 232, 0.05))",
              borderColor: "rgba(124, 92, 232, 0.3)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold mb-1" style={{ fontSize: "14px" }}>
                  KarmAI v1.0.0
                </p>
                <p className="text-[#888899]" style={{ fontSize: "11px" }}>
                  Serendipity Engine • Beta
                </p>
              </div>
              <div
                className="px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: "rgba(0, 203, 164, 0.2)",
                  fontSize: "9px",
                  fontWeight: 600,
                  color: "#00CBA4",
                  letterSpacing: "0.05em",
                }}
              >
                UP TO DATE
              </div>
            </div>
          </motion.div>

          {/* Settings Sections */}
          {settingsSections.map((section, sectionIdx) => (
            <div key={section.title} className="mb-6">
              <h2 className="text-[#888899] font-semibold mb-3" style={{ fontSize: "12px" }}>
                {section.title.toUpperCase()}
              </h2>
              <motion.div
                className="rounded-2xl border overflow-hidden"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  borderColor: "rgba(255, 255, 255, 0.08)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIdx * 0.1 }}
              >
                {section.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        if (item.toggle) {
                          if (item.label === "Push Notifications") {
                            setNotificationsEnabled(!notificationsEnabled);
                          } else if (item.label === "Location Services") {
                            setLocationEnabled(!locationEnabled);
                          }
                        }
                      }}
                      className="w-full flex items-center justify-between p-4 transition-all hover:bg-white/5"
                      style={{
                        borderBottom:
                          itemIdx < section.items.length - 1
                            ? "1px solid rgba(255, 255, 255, 0.05)"
                            : "none",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} className="text-[#7C5CE8]" />
                        <span className="text-white" style={{ fontSize: "14px" }}>
                          {item.label}
                        </span>
                      </div>
                      {item.toggle ? (
                        <div
                          className="w-11 h-6 rounded-full transition-all duration-200"
                          style={{
                            backgroundColor: item.value ? "#7C5CE8" : "rgba(255, 255, 255, 0.2)",
                          }}
                        >
                          <motion.div
                            className="w-5 h-5 rounded-full bg-white mt-0.5"
                            animate={{ x: item.value ? 22 : 2 }}
                            transition={{ duration: 0.2 }}
                          />
                        </div>
                      ) : (
                        <ChevronRight size={18} className="text-[#666677]" />
                      )}
                    </button>
                  );
                })}
              </motion.div>
            </div>
          ))}

          {/* Logout Button */}
          <motion.button
            onClick={onLogout}
            className="w-full h-14 rounded-2xl border flex items-center justify-center gap-2 transition-all hover:bg-red-500/10"
            style={{
              borderColor: "rgba(232, 93, 48, 0.3)",
              backgroundColor: "rgba(232, 93, 48, 0.05)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut size={18} className="text-[#E85D30]" />
            <span className="text-[#E85D30] font-semibold" style={{ fontSize: "15px" }}>
              Log Out
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

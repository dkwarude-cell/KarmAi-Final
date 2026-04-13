import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [loadingDot, setLoadingDot] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingDot((prev) => (prev + 1) % 3);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Generate particle positions
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 60,
    size: Math.random() * 2 + 1.5,
    color: Math.random() > 0.5 ? "#7C5CE8" : "#00CBA4",
    opacity: Math.random() * 0.3 + 0.2,
    delay: Math.random() * 2,
  }));

  return (
    <div className="w-[390px] h-[844px] bg-[#0A0A0F] relative overflow-hidden flex flex-col items-center justify-center">
      {/* Particle field */}
      <div className="absolute inset-0 flex items-start justify-center pt-[120px]">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
            }}
            animate={{
              opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Central glow region */}
      <div className="relative z-10">
        {/* Glow circle with radial dots */}
        <div className="w-[200px] h-[200px] rounded-full relative mb-6">
          {Array.from({ length: 50 }, (_, i) => {
            const angle = (i / 50) * Math.PI * 2;
            const distance = Math.random() * 80 + 10;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            return (
              <motion.div
                key={i}
                className="absolute w-[2.5px] h-[2.5px] rounded-full bg-[#7C5CE8]"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  opacity: Math.max(0, 1 - distance / 100) * 0.4,
                }}
                animate={{
                  opacity: [
                    Math.max(0, 1 - distance / 100) * 0.4,
                    Math.max(0, 1 - distance / 100) * 0.2,
                    Math.max(0, 1 - distance / 100) * 0.4,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.05,
                }}
              />
            );
          })}

          {/* Logo text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-baseline justify-center">
                <span className="text-white font-extrabold" style={{ fontSize: "48px" }}>
                  Karm
                </span>
                <span className="text-[#7C5CE8] font-extrabold" style={{ fontSize: "48px" }}>
                  AI
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center mb-8">
          <p className="text-[#888899]" style={{ fontSize: "14px" }}>
            Break your bubble.
          </p>
        </div>

        {/* Divider line */}
        <div className="flex justify-center mb-6">
          <div
            className="h-[0.5px] w-[120px]"
            style={{ backgroundColor: "rgba(124, 92, 232, 0.4)" }}
          />
        </div>

        {/* Loading indicator */}
        <div className="flex justify-center gap-2 mb-12">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-[6px] h-[6px] rounded-full"
              style={{
                backgroundColor: loadingDot === i ? "#7C5CE8" : "#333344",
              }}
              animate={{
                scale: loadingDot === i ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-10">
        <p className="text-[#444455] text-center" style={{ fontSize: "11px" }}>
          AMD Slingshot 2024
        </p>
      </div>
    </div>
  );
}

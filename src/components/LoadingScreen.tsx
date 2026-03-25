import { useEffect, useState } from "react";
import profile from "../data/profile.json";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"logo" | "bar" | "done">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("bar"), 800);
    const t2 = setTimeout(() => {
      setPhase("done");
      setTimeout(onComplete, 400);
    }, 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${phase === "done" ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <div
        className="font-display text-6xl md:text-8xl text-accent"
        style={{
          animation: "logo-pulse 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          textShadow: "0 0 40px hsl(357 91% 47% / 0.6), 0 0 80px hsl(357 91% 47% / 0.3)",
        }}
      >
        {profile.initials}
      </div>
      {phase !== "logo" && (
        <div className="mt-8 h-1 w-48 rounded-full overflow-hidden bg-secondary">
          <div
            className="h-full bg-accent rounded-full"
            style={{ animation: "loading-bar 1.5s ease-out forwards" }}
          />
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;

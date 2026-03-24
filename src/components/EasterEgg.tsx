import { useEffect, useState } from "react";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

const EasterEgg = () => {
  const [show, setShow] = useState(false);
  const [seq, setSeq] = useState<string[]>([]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      setSeq((prev) => {
        const next = [...prev, e.key].slice(-10);
        if (next.join(",") === KONAMI.join(",")) {
          setShow(true);
          setTimeout(() => setShow(false), 5000);
        }
        return next;
      });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[200] bg-background flex items-center justify-center animate-float-up" onClick={() => setShow(false)}>
      <div className="text-center">
        <p className="font-display text-5xl md:text-7xl text-accent mb-4" style={{ fontFamily: "monospace" }}>🎮 CHEAT CODE UNLOCKED</p>
        <p className="font-body text-muted-foreground text-lg">Fun fact: This developer once debugged a production issue in their sleep. Literally.</p>
        <p className="font-body text-muted-foreground/50 text-sm mt-6">Click anywhere to dismiss</p>
      </div>
    </div>
  );
};

export default EasterEgg;

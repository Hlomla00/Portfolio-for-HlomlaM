import { useEffect, useRef } from "react";

const CursorTrail = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      dot.style.opacity = "1";
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
      fadeTimer.current = setTimeout(() => { dot.style.opacity = "0"; }, 1000);
    };
    window.addEventListener("mousemove", onMove);

    let animId: number;
    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.18;
      current.current.y += (target.current.y - current.current.y) * 0.18;
      dot.style.transform = `translate(${current.current.x - 5}px, ${current.current.y - 5}px)`;
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 z-[200] w-[10px] h-[10px] rounded-full bg-accent/70 pointer-events-none"
      style={{ opacity: 0, transition: "opacity 0.6s ease" }}
    />
  );
};

export default CursorTrail;

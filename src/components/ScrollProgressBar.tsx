import { useEffect, useState } from "react";

const ScrollProgressBar = () => {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-[100] h-[2px] bg-accent"
      style={{ width: `${pct}%`, transition: "width 0.05s linear" }}
    />
  );
};

export default ScrollProgressBar;

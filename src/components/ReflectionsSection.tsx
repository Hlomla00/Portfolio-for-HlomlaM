import { useState } from "react";
import { useInView } from "../hooks/useInView";
import { ChevronDown } from "lucide-react";
import reflections from "../data/reflections.json";

type Reflection = typeof reflections.reflections[0];

const STAR_LABELS: { key: keyof Reflection; label: string }[] = [
  { key: "situation", label: "S — Situation" },
  { key: "task",      label: "T — Task" },
  { key: "action",    label: "A — Action" },
  { key: "result",    label: "R — Result" },
];

const ReflectionsSection = () => {
  const { ref, inView } = useInView();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="reflections" className="min-h-screen py-24 px-6 md:px-12 bg-background" ref={ref}>
      <div className={`max-w-4xl mx-auto transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <h2 className="font-display text-4xl md:text-6xl text-foreground mb-3">REFLECTIONS</h2>
        <p className="font-body text-sm text-muted-foreground tracking-widest uppercase mb-10">
          STAR Method · PRP370S
        </p>

        <div className="space-y-4">
          {reflections.reflections.map((r, i) => {
            const isOpen = openId === r.id;
            return (
              <div
                key={r.id}
                className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-accent/40"
                style={{ animation: inView ? `cascade-in 0.5s ease-out ${i * 0.15}s both` : "none" }}
              >
                {/* Header / toggle */}
                <button
                  onClick={() => setOpenId(isOpen ? null : r.id)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <span className="px-2 py-0.5 bg-accent/20 text-accent text-[10px] font-body tracking-widest uppercase rounded">
                      {r.method}
                    </span>
                    <h3 className="font-display text-lg md:text-xl text-foreground group-hover:text-accent transition-colors">
                      {r.title}
                    </h3>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-muted-foreground flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Expandable STAR content */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-8 space-y-6 border-t border-border pt-6">
                      {STAR_LABELS.map(({ key, label }) => (
                        <div key={key}>
                          <p className="font-body text-xs text-accent tracking-widest uppercase mb-2">{label}</p>
                          <p className="font-body text-sm text-muted-foreground leading-relaxed">
                            {r[key] as string}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReflectionsSection;

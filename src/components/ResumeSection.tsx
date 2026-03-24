import { useState, useEffect, useRef } from "react";
import { useInView } from "../hooks/useInView";
import resume from "../data/resume.json";
import { Download } from "lucide-react";

const tabs = ["Experience", "Skills", "Achievements"];

const ResumeSection = () => {
  const [tab, setTab] = useState("Experience");
  const { ref, inView } = useInView();

  return (
    <section id="resume" className="min-h-screen py-24 px-6 md:px-12 bg-background" ref={ref}>
      <div className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <h2 className="font-display text-4xl md:text-6xl text-foreground mb-8">RESUME</h2>

        <div className="flex gap-1 mb-10 border-b border-border">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-3 font-body text-sm tracking-wider transition-all border-b-2 -mb-px ${tab === t ? "border-accent text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="min-h-[400px]">
          {tab === "Experience" && (
            <div className="space-y-6">
              {resume.experience.map((e) => (
                <div key={e.company} className="bg-card rounded-lg p-6 border border-border hover:border-accent/30 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                    <div>
                      <h3 className="font-display text-xl text-foreground">{e.role}</h3>
                      <p className="font-body text-sm text-muted-foreground">{e.company}</p>
                    </div>
                    <span className="font-body text-xs text-accent tracking-wider mt-2 md:mt-0">{e.season} · {e.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {e.bullets.map((b, i) => (
                      <li key={i} className="font-body text-sm text-muted-foreground pl-4 border-l-2 border-border">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {tab === "Skills" && (
            <div className="space-y-8">
              {Object.entries(resume.skills).map(([cat, skills]) => (
                <div key={cat}>
                  <h3 className="font-body text-sm text-muted-foreground tracking-widest uppercase mb-4">{cat}</h3>
                  <div className="space-y-3">
                    {skills.map((s) => (
                      <SkillBar key={s.name} name={s.name} level={s.level} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "Achievements" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {resume.achievements.map((a) => (
                <CountCard key={a.label} {...a} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <a href="#" className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-accent-foreground font-body text-sm tracking-wider uppercase rounded hover:brightness-110 transition-all">
            <Download size={16} /> Download Full Resume
          </a>
        </div>
      </div>
    </section>
  );
};

const SkillBar = ({ name, level }: { name: string; level: number }) => {
  const { ref, inView } = useInView(0.3);
  return (
    <div ref={ref} className="flex items-center gap-4">
      <span className="font-body text-sm text-foreground w-28">{name}</span>
      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent/60 transition-all duration-1000 ease-out"
          style={{ width: inView ? `${level}%` : "0%" }}
        />
      </div>
      <span className="font-body text-xs text-muted-foreground w-10 text-right">{level}%</span>
    </div>
  );
};

const CountCard = ({ number, suffix, label }: { number: number; suffix?: string; label: string }) => {
  const { ref, inView } = useInView(0.3);
  const [count, setCount] = useState(0);
  const counted = useRef(false);

  useEffect(() => {
    if (inView && !counted.current) {
      counted.current = true;
      let start = 0;
      const step = Math.ceil(number / 40);
      const interval = setInterval(() => {
        start += step;
        if (start >= number) { setCount(number); clearInterval(interval); }
        else setCount(start);
      }, 30);
    }
  }, [inView, number]);

  return (
    <div ref={ref} className="bg-card rounded-lg p-6 text-center border border-border">
      <span className="font-display text-4xl md:text-5xl text-accent">{count}{suffix || ""}</span>
      <p className="font-body text-xs text-muted-foreground mt-2 tracking-wider uppercase">{label}</p>
    </div>
  );
};

export default ResumeSection;

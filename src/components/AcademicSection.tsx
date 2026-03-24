import { useState } from "react";
import { useInView } from "../hooks/useInView";
import academics from "../data/academics.json";

const AcademicSection = () => {
  const [mode, setMode] = useState<"story" | "timeline">("story");
  const { ref, inView } = useInView();

  return (
    <section id="academics" className="min-h-screen py-24 px-6 md:px-12 bg-background" ref={ref}>
      <div className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-display text-4xl md:text-6xl text-foreground">ACADEMIC JOURNEY</h2>
          <div className="flex bg-secondary rounded-full p-1">
            <button onClick={() => setMode("story")} className={`px-4 py-1.5 rounded-full text-xs font-body tracking-wider transition-all ${mode === "story" ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}>Story</button>
            <button onClick={() => setMode("timeline")} className={`px-4 py-1.5 rounded-full text-xs font-body tracking-wider transition-all ${mode === "timeline" ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}>Timeline</button>
          </div>
        </div>

        <div className={`transition-opacity duration-500 ${mode === "story" ? "opacity-100" : "opacity-0 hidden"}`}>
          {academics.map((m, i) => (
            <StoryCard key={m.year} milestone={m} index={i} />
          ))}
        </div>

        <div className={`transition-opacity duration-500 ${mode === "timeline" ? "opacity-100" : "opacity-0 hidden"}`}>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border" />
            {academics.map((m, i) => (
              <TimelineCard key={m.year} milestone={m} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StoryCard = ({ milestone, index }: { milestone: typeof academics[0]; index: number }) => {
  const { ref, inView } = useInView(0.2);
  return (
    <div ref={ref} className={`relative py-16 md:py-24 transition-all duration-700 delay-${index * 100} ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
      <span className="absolute top-8 right-0 font-display text-[8rem] md:text-[12rem] leading-none text-secondary/50 select-none pointer-events-none">{milestone.year}</span>
      <div className="relative z-10 max-w-2xl">
        <h3 className="font-display text-3xl md:text-4xl text-foreground">{milestone.institution}</h3>
        <p className="font-body text-muted-foreground mt-2">{milestone.qualification}</p>
        <p className="font-body italic text-muted-foreground/70 mt-4 leading-relaxed">{milestone.storyText}</p>
      </div>
    </div>
  );
};

const TimelineCard = ({ milestone, index }: { milestone: typeof academics[0]; index: number }) => {
  const { ref, inView } = useInView(0.2);
  const isLeft = index % 2 === 0;
  return (
    <div ref={ref} className={`flex items-center mb-12 transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : isLeft ? "opacity-0 -translate-x-12" : "opacity-0 translate-x-12"}`}>
      <div className={`w-1/2 ${isLeft ? "pr-8 text-right" : "pl-8 order-2"}`}>
        <div className="bg-card rounded-lg p-6 border border-border">
          <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-body rounded-full mb-3">{milestone.year}</span>
          <h4 className="font-display text-xl text-foreground">{milestone.institution}</h4>
          <p className="font-body text-sm text-muted-foreground mt-1">{milestone.qualification}</p>
          <p className="font-body text-xs text-muted-foreground/60 mt-2">{milestone.description}</p>
        </div>
      </div>
      <div className="w-3 h-3 rounded-full bg-accent border-2 border-background z-10 flex-shrink-0" />
      <div className={`w-1/2 ${isLeft ? "order-2" : ""}`} />
    </div>
  );
};

export default AcademicSection;

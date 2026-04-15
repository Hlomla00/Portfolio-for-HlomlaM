import { Trophy } from "lucide-react";
import { useInView } from "../hooks/useInView";
import hackathonsData from "../data/hackathons.json";

type Hackathon = typeof hackathonsData.hackathons[0];

const HackathonCard = ({ hackathon, index, inView }: { hackathon: Hackathon; index: number; inView: boolean }) => (
  <div
    className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.08)]"
    style={{ animation: inView ? `cascade-in 0.5s ease-out ${index * 0.2}s both` : "none" }}
  >
    {/* Image placeholder */}
    <div className="w-full h-52 border-b border-border border-dashed flex items-center justify-center bg-secondary/30">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground/40 flex items-center justify-center mx-auto mb-2">
          <Trophy size={20} className="text-muted-foreground/40" />
        </div>
        <p className="font-body text-xs text-muted-foreground/50 tracking-wider uppercase">Photo coming soon</p>
      </div>
    </div>

    <div className="p-6">
      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="font-body text-xs text-muted-foreground tracking-widest uppercase mb-1">
            {hackathon.competition} · {hackathon.year}
          </p>
          <h3 className="font-display text-xl md:text-2xl text-foreground leading-tight">
            {hackathon.project}
          </h3>
        </div>
        {/* Position badge */}
        <span className="flex-shrink-0 px-3 py-1.5 bg-accent/15 border border-accent/30 text-accent font-display text-sm tracking-wide rounded-lg whitespace-nowrap">
          {hackathon.position}
        </span>
      </div>

      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
        {hackathon.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {hackathon.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 bg-secondary text-muted-foreground text-[11px] font-body tracking-wide rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const HackathonsSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="hackathons" className="min-h-screen py-24 px-6 md:px-12 bg-background" ref={ref}>
      <div className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <h2 className="font-display text-4xl md:text-6xl text-foreground mb-3 flex items-center gap-3">
          HACKATHONS <Trophy className="text-accent" size={32} />
        </h2>
        <p className="font-body text-sm text-muted-foreground tracking-widest uppercase mb-12">
          Competing · Building · Winning
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {hackathonsData.hackathons.map((h, i) => (
            <HackathonCard key={h.id} hackathon={h} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HackathonsSection;

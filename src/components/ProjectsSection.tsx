import { useState, useRef } from "react";
import SwipePanel from "./SwipePanel";
import { Github, ExternalLink, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import projects from "../data/projects.json";

type Project = typeof projects[0];
const categories = ["All", "Web", "Mobile", "AI/ML", "Open Source"];

const ProjectsSection = () => {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const grouped = filter === "All"
    ? categories.slice(1).map((c) => ({ cat: c, items: projects.filter((p) => p.category === c) })).filter((g) => g.items.length)
    : [{ cat: filter, items: filtered }];

  return (
    <section id="projects" className="min-h-screen py-24 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <h2 className="font-display text-4xl md:text-6xl text-foreground">
            MY WORK
            <span className="block h-1 w-16 bg-accent mt-2 rounded" />
          </h2>
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-1.5 rounded-full text-xs font-body tracking-wider transition-all ${filter === c ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {grouped.map(({ cat, items }) => (
          <div key={cat} className="mb-10">
            <h3 className="font-body text-sm text-muted-foreground tracking-widest uppercase mb-4">{cat}</h3>
            <ScrollRow>
              {items.map((p) => (
                <ProjectCard key={p.id} project={p} onClick={() => setSelected(p)} />
              ))}
            </ScrollRow>
          </div>
        ))}
      </div>

      {/* Detail panel */}
      <SwipePanel open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div>
            <h2 className="font-display text-5xl md:text-7xl text-foreground mb-4">{selected.title}</h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">{selected.description}</p>
            
            {/* Project Preview */}
            {selected.previewUrl && (
              <div className="mb-8 rounded-lg overflow-hidden border border-border bg-card">
                <iframe 
                  src={selected.previewUrl} 
                  className="w-full h-96"
                  title={selected.title}
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-8">
              {selected.techStack.map((t) => (
                <span key={t} className="px-3 py-1 bg-secondary text-muted-foreground text-xs font-body rounded-full">{t}</span>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {selected.metrics.map((m) => (
                <div key={m.label} className="bg-secondary rounded-lg p-4 text-center">
                  <span className="font-display text-2xl text-accent">{m.value}</span>
                  <p className="font-body text-xs text-muted-foreground mt-1">{m.label}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              {selected.githubUrl && (
                <a href={selected.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-secondary text-foreground font-body text-sm rounded hover:bg-accent hover:text-accent-foreground transition-all">
                  <Github size={16} /> GitHub
                </a>
              )}
              {selected.previewUrl && (
                <a href={selected.previewUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-body text-sm rounded hover:brightness-110 transition-all">
                  <Eye size={16} /> Preview
                </a>
              )}
            </div>
          </div>
        )}
      </SwipePanel>
    </section>
  );
};

const ScrollRow = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <div className="relative group">
      <button onClick={(e) => { e.stopPropagation(); scroll(-1); }} className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-background/90 border border-border rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-secondary"><ChevronLeft size={20} /></button>
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x" style={{ scrollbarWidth: "none" }}>
        {children}
      </div>
      <button onClick={(e) => { e.stopPropagation(); scroll(1); }} className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-background/90 border border-border rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-secondary"><ChevronRight size={20} /></button>
    </div>
  );
};

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="flex-shrink-0 w-72 md:w-80 snap-start cursor-pointer group"
  >
    <div className="relative aspect-video bg-secondary rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_30px_hsl(357_91%_47%/0.3)]">
      {/* Faint letter — background texture */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="font-display text-8xl text-muted-foreground/10">{project.title.charAt(0)}</span>
      </div>

      {project.featured && (
        <span className="absolute top-2 left-2 px-2 py-0.5 bg-accent text-accent-foreground text-[10px] font-body tracking-wider uppercase rounded z-10">Featured</span>
      )}

      {/* Resting state — always visible, fades out on hover */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 z-10 transition-opacity duration-300 group-hover:opacity-0">
        <span className="px-2 py-0.5 bg-background/50 text-muted-foreground text-[9px] font-body tracking-widest uppercase rounded w-fit mb-2">{project.category}</span>
        <h4 className="font-display text-lg text-foreground leading-tight">{project.title}</h4>
        <div className="flex gap-1 mt-2 flex-wrap">
          {project.techStack.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 bg-background/60 text-muted-foreground rounded-full font-body">{t}</span>
          ))}
        </div>
      </div>

      {/* Hover overlay — unchanged */}
      <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-20">
        <h4 className="font-display text-xl text-foreground">{project.title}</h4>
        <div className="flex gap-1 mt-2 flex-wrap">
          {project.techStack.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 bg-secondary text-muted-foreground rounded-full font-body">{t}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ProjectsSection;

import { useState } from "react";
import { useInView } from "../hooks/useInView";
import profile from "../data/profile.json";
import { Github, Linkedin, Mail } from "lucide-react";

const skillTags = ["HTML", "React", "Node.js", "Python", "TypeScript", "Docker", "AWS", "GraphQL"];

const AboutSection = () => {
  const [mode, setMode] = useState<"director" | "snapshot">("director");
  const { ref, inView } = useInView();

  return (
    <section id="about" className="min-h-screen py-24 px-6 md:px-12 bg-background" ref={ref}>
      <div className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        {/* Toggle */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-display text-4xl md:text-6xl text-foreground">ABOUT ME</h2>
          <div className="flex bg-secondary rounded-full p-1">
            <button
              onClick={() => setMode("director")}
              className={`px-4 py-1.5 rounded-full text-xs font-body tracking-wider transition-all ${mode === "director" ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
            >
              Director's Cut
            </button>
            <button
              onClick={() => setMode("snapshot")}
              className={`px-4 py-1.5 rounded-full text-xs font-body tracking-wider transition-all ${mode === "snapshot" ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
            >
              Snapshot
            </button>
          </div>
        </div>

        <div style={{ perspective: "1000px" }}>
          <div
            className="transition-transform duration-700"
            style={{ transformStyle: "preserve-3d", transform: mode === "snapshot" ? "rotateY(180deg)" : "rotateY(0)" }}
          >
            {/* Director's Cut */}
            <div style={{ backfaceVisibility: "hidden" }} className={mode !== "director" ? "invisible h-0 overflow-hidden" : ""}>
              <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Avatar side */}
                <div className="relative flex justify-center">
                  <div className="w-[26rem] h-[26rem] rounded-3xl bg-secondary border-2 border-accent overflow-hidden">
                    <img
                      src="/WhatsApp Image 2026-03-25 at 16.17.25.jpeg"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* Bio side */}
                <div>
                  <div className="drop-cap font-body text-muted-foreground leading-relaxed text-base">
                    {profile.aboutBio}
                  </div>
                  <div className="flex flex-wrap gap-3 mt-8">
                    {profile.traits.map((t) => (
                      <span key={t} className="px-4 py-1.5 bg-secondary text-muted-foreground font-body text-xs rounded-full tracking-wide">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Snapshot */}
            <div style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }} className={mode !== "snapshot" ? "invisible h-0 overflow-hidden" : ""}>
              <div className="max-w-md mx-auto text-center bg-card rounded-2xl p-10">
                <div className="w-24 h-24 mx-auto rounded-full bg-secondary overflow-hidden mb-4">
                  <img
                    src="/Hlodomlaada'.jpeg"
                    alt="Hlodomlada"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display text-2xl text-foreground">{profile.name}</h3>
                <p className="font-body text-sm text-muted-foreground mt-1">{profile.title}</p>
                <p className="font-body text-sm text-muted-foreground mt-4 leading-relaxed">{profile.bio}</p>
                <div className="flex justify-center gap-4 mt-6">
                  <a href={profile.social.github} className="p-3 rounded-full bg-secondary text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all hover:scale-110"><Github size={18} /></a>
                  <a href={profile.social.linkedin} className="p-3 rounded-full bg-secondary text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all hover:scale-110"><Linkedin size={18} /></a>
                  <a href={`mailto:${profile.social.email}`} className="p-3 rounded-full bg-secondary text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all hover:scale-110"><Mail size={18} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

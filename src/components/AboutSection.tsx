import { useState, useEffect, useRef } from "react";
import { useInView } from "../hooks/useInView";
import profile from "../data/profile.json";
import { Github, Linkedin, Mail } from "lucide-react";

const fetchAllRepos = async (): Promise<{ stargazers_count: number }[]> => {
  const all: { stargazers_count: number }[] = [];
  let url: string | null = "https://api.github.com/users/Hlomla00/repos?per_page=100&page=1";
  while (url) {
    const res = await fetch(url);
    const page = await res.json();
    if (!Array.isArray(page)) break;
    all.push(...page);
    const link = res.headers.get("Link") ?? "";
    const next = link.match(/<([^>]+)>;\s*rel="next"/);
    url = next ? next[1] : null;
  }
  return all;
};

const useGithubStats = () => {
  const [stats, setStats] = useState<{ repos: number; stars: number; followers: number } | null>(null);
  useEffect(() => {
    Promise.all([
      fetch("https://api.github.com/users/Hlomla00").then((r) => r.json()),
      fetchAllRepos(),
    ]).then(([user, repos]) => {
      const stars = repos.reduce((s, r) => s + (r.stargazers_count ?? 0), 0);
      setStats({
        repos: user.public_repos ?? 0,
        stars,
        followers: user.followers ?? 0,
      });
    }).catch(() => {});
  }, []);
  return stats;
};

const AnimatedCount = ({ target, inView }: { target: number; inView: boolean }) => {
  const [count, setCount] = useState(0);
  const fired = useRef(false);
  useEffect(() => {
    if (!inView || fired.current || target === 0) return;
    fired.current = true;
    const step = Math.max(1, Math.ceil(target / 40));
    let val = 0;
    const id = setInterval(() => {
      val += step;
      if (val >= target) { setCount(target); clearInterval(id); }
      else setCount(val);
    }, 30);
  }, [inView, target]);
  return <>{count}</>;
};

const skillTags = ["HTML", "React", "Node.js", "Python", "TypeScript", "Docker", "AWS", "GraphQL"];

const AboutSection = () => {
  const [mode, setMode] = useState<"director" | "snapshot">("director");
  const { ref, inView } = useInView();
  const githubStats = useGithubStats();

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
                      src="/peer-helper.jpeg"
                      alt="Profile"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                {/* Bio side */}
                <div>
                  <div className="drop-cap font-body text-muted-foreground leading-relaxed text-base">
                    {profile.aboutBio}
                  </div>
                  {githubStats && (
                    <div className="flex gap-6 mt-8">
                      {[
                        { label: "Repos", value: githubStats.repos },
                        { label: "Stars", value: githubStats.stars },
                        { label: "Followers", value: githubStats.followers },
                      ].map(({ label, value }) => (
                        <div key={label} className="text-center">
                          <p className="font-display text-2xl text-accent">
                            <AnimatedCount target={value} inView={inView} />
                          </p>
                          <p className="font-body text-[10px] text-muted-foreground tracking-widest uppercase mt-0.5">{label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-3 mt-6">
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
                    src="/peer-helper.jpeg"
                    alt="Hlodomlada"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-display text-2xl text-foreground">{profile.name}</h3>
                <p className="font-body text-sm text-muted-foreground mt-1">{profile.title}</p>
                <p className="font-body text-sm text-muted-foreground mt-4 leading-relaxed">{profile.bio}</p>
                <div className="flex justify-center gap-4 mt-6">
                  <a href={profile.social.github} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-secondary text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all hover:scale-110"><Github size={18} /></a>
                  <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-secondary text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all hover:scale-110"><Linkedin size={18} /></a>
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

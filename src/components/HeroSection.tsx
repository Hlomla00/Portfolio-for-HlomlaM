import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import ParticleCanvas from "./ParticleCanvas";
import profile from "../data/profile.json";

const Typewriter = ({ words }: { words: string[] }) => {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && display.length < word.length) {
      timeout = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), 80);
    } else if (!deleting && display.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && display.length > 0) {
      timeout = setTimeout(() => setDisplay(display.slice(0, -1)), 45);
    } else if (deleting && display.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [display, deleting, wordIndex, words]);

  return (
    <span>
      {display}
      <span className="inline-block w-[2px] h-[1em] bg-accent align-middle ml-0.5 animate-blink" />
    </span>
  );
};

const HeroSection = () => {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 200); }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <ParticleCanvas />
      <div className="film-grain" />
      <div className="relative z-10 text-center px-6 max-w-5xl">
        {/* Overline */}
        <div
          className={`flex items-center justify-center gap-2 mb-6 transition-all duration-700 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-accent animate-blink" />
          <span className="font-body text-sm tracking-[0.3em] uppercase text-accent">Available for Hire</span>
        </div>

        {/* Name */}
        <h1
          className={`font-display text-7xl leading-none tracking-wide text-foreground transition-all duration-700 delay-200 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ textShadow: "0 0 60px hsl(0 0% 100% / 0.08)" }}
        >
          {profile.name}
        </h1>

        {/* Typewriter subtitle */}
        <p
          className={`font-body text-muted-foreground text-lg md:text-xl tracking-[0.2em] mt-4 transition-all duration-700 delay-[400ms] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Typewriter words={profile.subtitles} />
        </p>

        {/* Bio */}
        <p
          className={`font-body italic text-muted-foreground/70 text-base md:text-lg mt-6 transition-all duration-700 delay-[600ms] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {profile.bio}
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-wrap justify-center gap-4 mt-10 transition-all duration-700 delay-[800ms] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-8 py-3 border border-foreground text-foreground font-body text-sm tracking-wider uppercase rounded hover:bg-foreground hover:text-background transition-all duration-300"
          >
            View My Work
          </a>
          <a
            href="/Hlomla_Magopeni_CV.pdf" download
            className="px-8 py-3 bg-accent text-accent-foreground font-body text-sm tracking-wider uppercase rounded hover:brightness-110 transition-all duration-300"
          >
            DOWNLOAD RESUME
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-down text-muted-foreground">
        <ChevronDown size={28} />
      </div>
    </section>
  );
};

export default HeroSection;

import { useInView } from "../hooks/useInView";

const MockInterviewSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="mock-interview" className="py-24 px-6 md:px-12 bg-card" ref={ref}>
      <div
        className={`max-w-4xl mx-auto transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="font-display text-4xl md:text-6xl text-foreground mb-3">MOCK INTERVIEW</h2>
        <p className="font-body text-sm text-muted-foreground tracking-widest uppercase mb-10">
          Work Readiness · PRP370S · Full-Stack Developer WIL
        </p>

        <div className="rounded-lg overflow-hidden border border-border bg-background">
          <video
            controls
            className="w-full"
            preload="metadata"
            aria-label="Mock interview for Full-Stack Developer WIL position"
          >
            <source src="/pixel-cinematic-code/mock-interview.mp4" type="video/mp4" />
            <p className="p-6 text-muted-foreground font-body text-sm">
              Your browser does not support video playback.{" "}
              <a
                href="/pixel-cinematic-code/mock-interview.mp4"
                className="text-accent underline"
              >
                Download the video
              </a>
              .
            </p>
          </video>
          <div className="px-6 py-4 border-t border-border">
            <p className="font-body text-sm text-muted-foreground">
              <span className="text-accent font-semibold">Hlomla Moosa Magopeni</span> — Mock Interview for Full-Stack Developer Work Integrated Learning (WIL) position · CPUT PRP370S
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MockInterviewSection;

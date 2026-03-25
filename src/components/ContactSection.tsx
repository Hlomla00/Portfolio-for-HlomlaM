import { useState } from "react";
import { useInView } from "../hooks/useInView";
import { Github, Linkedin, Twitter, Mail, ArrowRight, Check, Loader2 } from "lucide-react";
import profile from "../data/profile.json";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { ref, inView } = useInView();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://formspree.io/f/mykbgrqy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      if (response.ok) {
        setSent(true);
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSent(false), 4000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (err) {
      console.error('Form submission failed:', err);
      setError("Failed to send message. Please try again or contact me directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen py-24 px-6 md:px-12 bg-background overflow-hidden" ref={ref}>
      {/* Animated geometric shapes */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="absolute w-32 h-32 border border-border/20 rounded-xl animate-geo-float pointer-events-none"
          style={{ top: `${20 + i * 20}%`, left: `${10 + i * 25}%`, animationDelay: `${i * 5}s`, animationDuration: `${20 + i * 5}s` }}
        />
      ))}

      <div className={`relative z-10 max-w-3xl mx-auto text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        {/* Availability */}
        <div className="flex justify-center mb-8">
          <span className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full">
            <span className={`w-2 h-2 rounded-full ${profile.available ? "bg-green-500" : "bg-accent"} animate-blink`} />
            <span className="font-body text-xs text-muted-foreground tracking-wider">
              {profile.available ? "Available for opportunities" : "Currently unavailable"}
            </span>
          </span>
        </div>

        <h2 className="font-display text-5xl md:text-8xl text-foreground mb-4">LET'S BUILD SOMETHING</h2>
        <p className="font-body text-muted-foreground mb-12">Open to full-time roles, freelance projects, and collaborations.</p>

        {sent ? (
          <div className="animate-float-up">
            <Check className="mx-auto text-accent mb-4" size={64} />
            <p className="font-display text-3xl text-foreground">Message Sent.</p>
            <p className="font-body text-muted-foreground mt-2">I'll be in touch.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 text-left">
            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="font-body text-destructive text-sm">{error}</p>
              </div>
            )}
            {(["name", "email", "subject", "message"] as const).map((field) => (
              <div key={field}>
                {field === "message" ? (
                  <textarea
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={form[field]}
                    onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
                    rows={4}
                    required
                    disabled={loading}
                    className="w-full bg-transparent border-b border-border text-foreground font-body placeholder:text-muted-foreground/50 focus:border-accent outline-none transition-colors py-3 resize-none disabled:opacity-50"
                  />
                ) : (
                  <input
                    type={field === "email" ? "email" : "text"}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={form[field]}
                    onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
                    required
                    disabled={loading}
                    className="w-full bg-transparent border-b border-border text-foreground font-body placeholder:text-muted-foreground/50 focus:border-accent outline-none transition-colors py-3 disabled:opacity-50"
                  />
                )}
              </div>
            ))}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-accent text-accent-foreground font-body text-sm tracking-widest uppercase rounded flex items-center justify-center gap-2 group hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  SENDING...
                </>
              ) : (
                <>
                  SEND MESSAGE
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Social */}
        <div className="flex justify-center gap-4 mt-12">
          {[
            { icon: Github, href: profile.social.github },
            { icon: Linkedin, href: profile.social.linkedin },
            { icon: Twitter, href: profile.social.twitter },
            { icon: Mail, href: `mailto:${profile.social.email}` },
          ].map(({ icon: Icon, href }, i) => (
            <a key={i} href={href} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-secondary text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:scale-110 transition-all">
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

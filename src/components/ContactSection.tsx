import { useState } from "react";
import { useInView } from "../hooks/useInView";
import { Github, Linkedin, Twitter, Mail, MessageCircle } from "lucide-react";
import profile from "../data/profile.json";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { ref, inView } = useInView();

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const url = `https://wa.me/27698570219?text=Name: ${encodeURIComponent(form.name)}%0AEmail: ${encodeURIComponent(form.email)}%0AMessage: ${encodeURIComponent(form.message)}`;
    window.open(url, "_blank");
  };

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const url = `mailto:218070349@mycput.ac.za?subject=Portfolio Enquiry from ${encodeURIComponent(form.name)}&body=Name: ${encodeURIComponent(form.name)}%0AEmail: ${encodeURIComponent(form.email)}%0AMessage: ${encodeURIComponent(form.message)}`;
    window.open(url, "_blank");
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
        <p className="font-body text-muted-foreground mb-12">
          Open to full-time roles, freelance projects, and collaborations.<br/>
          <span className="text-accent font-medium">Response time: Usually within 24 hours</span>
        </p>

        <form className="space-y-8 text-left">
          {(["name", "email", "message"] as const).map((field) => (
            <div key={field}>
              {field === "message" ? (
                <textarea
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
                  rows={4}
                  required
                  className="w-full bg-transparent border-b border-border text-foreground font-body placeholder:text-muted-foreground/50 focus:border-accent outline-none transition-colors py-3 resize-none"
                />
              ) : (
                <input
                  type={field === "email" ? "email" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
                  required
                  className="w-full bg-transparent border-b border-border text-foreground font-body placeholder:text-muted-foreground/50 focus:border-accent outline-none transition-colors py-3"
                />
              )}
            </div>
          ))}
          <div className="flex gap-4">
            <button
              type="submit"
              onClick={handleWhatsApp}
              className="flex-1 py-4 bg-[#25D366] text-white font-body text-sm tracking-widest uppercase rounded flex items-center justify-center gap-2 hover:brightness-110 transition-all"
            >
              <MessageCircle size={16} />
              SEND VIA WHATSAPP
            </button>
            <button
              type="submit"
              onClick={handleEmail}
              className="flex-1 py-4 bg-accent text-accent-foreground font-body text-sm tracking-widest uppercase rounded flex items-center justify-center gap-2 hover:brightness-110 transition-all"
            >
              <Mail size={16} />
              SEND VIA EMAIL
            </button>
          </div>
        </form>

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

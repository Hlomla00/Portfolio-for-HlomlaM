import { Github, Linkedin, Mail } from "lucide-react";
import profile from "../data/profile.json";

const Footer = () => (
  <footer className="py-12 px-6 md:px-12 bg-background border-t border-border">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="font-body text-xs text-muted-foreground">
        © {new Date().getFullYear()} {profile.name}. Built with passion ☕
      </p>
      <div className="flex gap-3">
        {[
          { icon: Github, href: profile.social.github },
          { icon: Linkedin, href: profile.social.linkedin },
          { icon: Mail, href: `mailto:${profile.social.email}` },
        ].map(({ icon: Icon, href }, i) => (
          <a key={i} href={href} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
            <Icon size={14} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;

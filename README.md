# Hlomla Magopeni — Developer Portfolio

A cinematic, Netflix-inspired developer portfolio showcasing my projects, skills, and professional journey as a Full-Stack Developer.

🔗 **Live Preview**: [View Portfolio](https://id-preview--83b390c8-f345-4783-9935-e11a45663e82.lovable.app)

---

## ✨ Features

- **Cinematic Hero Section** — Particle canvas background with staggered entrance animations
- **Netflix-Style Project Showcase** — Horizontal scroll rows with category filtering and featured badges
- **Interactive Resume** — Tabbed layout with animated skill bars and downloadable CV
- **Story Mode Timeline** — A narrative-driven academic journey with giant year watermarks
- **Certifications Gallery** — Visual grid of professional credentials
- **Dark / Light Theme Toggle** — Seamless theme switching with full design-token support
- **Responsive Design** — Fully optimized for desktop, tablet, and mobile viewports
- **Loading Screen** — Branded cinematic loading animation on first visit

## 🛠️ Tech Stack

| Layer        | Technology                                      |
| ------------ | ----------------------------------------------- |
| Framework    | React 18 + TypeScript                           |
| Build Tool   | Vite 5                                          |
| Styling      | Tailwind CSS 3 + custom HSL design tokens       |
| UI Library   | shadcn/ui (Radix primitives)                    |
| Icons        | Lucide React                                    |
| Routing      | React Router DOM v6                             |
| Animation    | CSS transitions + Tailwind animate              |
| Data         | JSON-driven architecture (`src/data/`)          |

## 📁 Project Structure

```
src/
├── components/          # UI components (Hero, Navbar, Projects, etc.)
│   └── ui/              # shadcn/ui primitives
├── data/                # JSON content files (easily editable)
│   ├── profile.json     # Name, bio, social links, traits
│   ├── projects.json    # Project cards with tags & descriptions
│   ├── resume.json      # Experience, education, and skills
│   ├── academics.json   # Academic timeline entries
│   └── certifications.json
├── hooks/               # Custom React hooks
├── pages/               # Route-level page components
└── index.css            # Design tokens & global styles
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## ✏️ Customisation

All portfolio content is driven by JSON files in `src/data/`. To make it your own:

1. **Profile** — Edit `src/data/profile.json` with your name, bio, and social links.
2. **Projects** — Add or remove entries in `src/data/projects.json`.
3. **Resume** — Update experience and skills in `src/data/resume.json`.
4. **Academics** — Modify your educational timeline in `src/data/academics.json`.
5. **CV Download** — Replace `public/Hlomla_Magopeni_CV.pdf` with your own file.

## 📬 Contact

- **Email**: 218070349@mycput.ac.za
- **GitHub**: [github.com/Hlomla00](https://github.com/Hlomla00)
- **LinkedIn**: [linkedin.com](https://linkedin.com)

---

Built with passion ☕ by Hlomla Magopeni

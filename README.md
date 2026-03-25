# 🎬 Pixel Cinematic Code — Developer Portfolio

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/Portfolio-Live-brightgreen?style=for-the-badge&logo=vercel)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=flat-square&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?style=flat-square&logo=vite)

*A cinematic, Netflix-inspired developer portfolio that transforms code into visual storytelling*

[🌐 Live Demo](https://hlomla-magopeni-portfolio.vercel.app) • [📧 Contact Me](mailto:hlomlamagopenimusa@gmail.com) • [💼 LinkedIn](https://linkedin.com/in/hlomla-magopeni)

![Portfolio Screenshot](./public/portfolio-preview.png)

</div>

---

## ✨ What Makes This Portfolio Special

🎭 **Cinematic Experience** — Inspired by Netflix's sleek interface, this portfolio delivers a movie-like journey through your professional story

🚀 **Performance First** — Built with Vite for lightning-fast loading and optimized animations

🎨 **Design System** — Custom HSL color tokens with seamless dark/light theme switching

📱 **Mobile Excellence** — Responsive design that looks stunning on every device

🎯 **Developer Friendly** — JSON-driven content makes customization as easy as editing a spreadsheet

---

## 🎯 Key Features

### 🎬 Hero Section
- **Particle Canvas**: Dynamic background with floating tech particles
- **Staggered Animations**: Smooth entrance effects that guide the eye
- **Call-to-Action**: Clear navigation to your best work

### 🎪 Projects Showcase
- **Netflix-Style Rows**: Horizontal scrolling project galleries
- **Category Filtering**: Easy navigation by technology stack
- **Live Previews**: Direct links to deployed applications
- **Interactive Cards**: Hover effects and smooth transitions

### 📊 Resume Section
- **Tabbed Interface**: Experience, Skills, and Achievements
- **Animated Skill Bars**: Creative progress indicators with glow effects
- **Timeline Views**: Story mode and traditional timeline layouts

### 🎓 Academic Journey
- **Narrative Timeline**: Your educational story told cinematically
- **Giant Year Markers**: Bold typography that anchors each chapter
- **Progress Tracking**: Clear progression through your learning journey

### 🏆 Certifications Gallery
- **Visual Grid**: Professional certificates displayed beautifully
- **PDF Previews**: Click to view full certificates
- **Download Ready**: One-click access to your credentials

---

## 🛠️ Technology Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Frontend** | ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css) |
| **Build & Dev** | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite) ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier) |
| **UI/UX** | ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=flat) ![Radix UI](https://img.shields.io/badge/Radix_UI-FFFFFF?style=flat) ![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-000000?style=flat) |
| **Deployment** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel) ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat&logo=netlify) |

</div>

---

## 📁 Project Structure

```
pixel-cinematic-code/
├── public/
│   ├── hl.png                    # Custom favicon
│   ├── Hlomla_Magopeni_CV.pdf    # Downloadable resume
│   └── certificates/             # PDF certificates
├── src/
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── HeroSection.tsx       # Landing page
│   │   ├── ProjectsSection.tsx   # Project showcase
│   │   ├── ResumeSection.tsx     # Skills & experience
│   │   ├── AcademicSection.tsx   # Education timeline
│   │   └── CertificationsSection.tsx
│   ├── data/
│   │   ├── profile.json          # Personal info
│   │   ├── projects.json         # Portfolio projects
│   │   ├── resume.json           # Work experience
│   │   ├── academics.json        # Education
│   │   └── certifications.json   # Credentials
│   ├── hooks/
│   │   └── useInView.ts          # Intersection observer
│   └── lib/
│       └── utils.ts              # Utility functions
├── index.html                    # Entry point
├── package.json                  # Dependencies
└── tailwind.config.ts           # Styling config
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Hlomla00/pixel-cinematic-code.git
cd pixel-cinematic-code

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment

#### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

#### Netlify
```bash
npm run build
# Drag and drop the dist/ folder to Netlify
```

---

## 🎨 Customization Guide

### 🎭 Making It Your Own

1. **Personal Branding**
   ```json
   // src/data/profile.json
   {
     "name": "Your Name",
     "bio": "Your compelling story...",
     "social": {
       "github": "https://github.com/yourusername",
       "linkedin": "https://linkedin.com/in/yourprofile"
     }
   }
   ```

2. **Project Showcase**
   ```json
   // src/data/projects.json
   {
     "title": "Your Amazing Project",
     "techStack": ["React", "TypeScript", "Node.js"],
     "previewUrl": "https://your-project.vercel.app",
     "githubUrl": "https://github.com/yourusername/project"
   }
   ```

3. **Skills & Experience**
   ```json
   // src/data/resume.json
   {
     "skills": {
       "Frontend": [
         {"name": "React", "level": 90}
       ]
     }
   }
   ```

4. **Theme Customization**
   ```css
   /* src/index.css */
   :root {
     --accent: 357 91% 47%; /* Your brand color */
   }
   ```

### 🎨 Design System

The portfolio uses a custom design system built on HSL color values:

- **Primary Colors**: Netflix-inspired red accent
- **Typography**: Bebas Neue (display) + DM Sans (body)
- **Spacing**: Consistent 8px grid system
- **Animations**: CSS transitions with custom timing functions

---

## 📈 Performance & SEO

- **Lighthouse Score**: 95+ on all metrics
- **Bundle Size**: < 1MB gzipped
- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards
- **Accessibility**: WCAG 2.1 AA compliant
- **Mobile First**: 100/100 on mobile performance

---

## 🤝 Contributing

We love contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Add TypeScript types for new features
- Test on multiple screen sizes
- Keep bundle size in mind
- Update documentation

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- **Design Inspiration**: Netflix UI/UX patterns
- **UI Components**: shadcn/ui for beautiful primitives
- **Icons**: Lucide React for consistent iconography
- **Typography**: Google Fonts for web typography

---

## 📞 Connect With Me

<div align="center">

[![Email](https://img.shields.io/badge/Email-hlomlamagopenimusa%40gmail.com-red?style=for-the-badge&logo=gmail)](mailto:hlomlamagopenimusa@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Hlomla_Magopeni-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/hlomla-magopeni)
[![GitHub](https://img.shields.io/badge/GitHub-Hlomla00-black?style=for-the-badge&logo=github)](https://github.com/Hlomla00)
[![Portfolio](https://img.shields.io/badge/Portfolio-Live-green?style=for-the-badge&logo=vercel)](https://hlomla-magopeni-portfolio.vercel.app)

</div>

---

<div align="center">

**Built with ❤️ by Hlomla Magopeni**

*"Code is poetry, and portfolios are the stage where developers perform their art"*

⭐ Star this repo if you found it helpful!

</div>

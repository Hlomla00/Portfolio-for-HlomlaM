# CONTEXT.md — Portfolio Project

**Owner:** Hlomla Moosa Magopeni
**GitHub:** https://github.com/Hlomla00
**Live URL:** Deployed on Vercel (auto-deploys on push to `main`)
**Last updated:** 2026-04-17

---

## What this is

A personal portfolio and academic submission for the **PRP370S Project Presentation 3** module at **Cape Peninsula University of Technology (CPUT)**. Built with React, TypeScript, Vite, and Tailwind CSS. Showcases projects, certifications, hackathon wins, STAR reflections, and CV — all in one deployable site.

---

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Deployment:** Vercel (CI/CD via GitHub `main` branch)
- **Screenshots:** Puppeteer (scripts in `scripts/`)
- **Certificate conversion:** Python + pdf2image

---

## Project Structure

```
src/
  components/       # One file per section + shared UI
  data/             # JSON data files (projects, certifications, hackathons, reflections)
  pages/Index.tsx   # Single page — mounts all sections in order
public/
  projects/         # Project thumbnail JPGs
  certificates/     # Certificate PDFs + images/  (JPGs for display)
  hackathons/       # telkom/ and mict/ image folders
scripts/
  screenshot.mjs    # Puppeteer batch screenshot script
  screenshot-fix.mjs
CV.md               # Markdown CV for GitHub rendering
CONTEXT.md          # This file
```

---

## Sections (in render order)

| Section | Component | Data source |
|---|---|---|
| Hero | `HeroSection.tsx` | Hardcoded |
| About | `AboutSection.tsx` | Hardcoded |
| Projects | `ProjectsSection.tsx` | `projects.json` |
| Academic | `AcademicSection.tsx` | Hardcoded |
| Resume | `ResumeSection.tsx` | Hardcoded |
| Hackathons | `HackathonsSection.tsx` | `hackathons.json` |
| Certifications | `CertificationsSection.tsx` | `certifications.json` |
| Reflections | `ReflectionsSection.tsx` | `reflections.json` |
| Contact | `ContactSection.tsx` | Hardcoded |

---

## Projects (9 total)

| ID | Title | Category | Thumbnail | Live |
|---|---|---|---|---|
| 1 | SafeRide — Ride Hailing Platform | Academic | `/projects/saferide.jpg` | ✓ |
| 2 | CPUT Clinic Booking System | Academic | `/projects/clinic.jpg` | ✓ |
| 3 | GUM — Student Marketplace | Academic + Mobile | none (letter fallback) | — |
| queup | QueUp — Smart Queue Management | Personal | `/projects/queup.jpg` | ✓ |
| voucherbridge | VoucherBridge — Multi-Bank Voucher Wallet | Personal | `/projects/voucherbridge.jpg` | ✓ |
| flowpay | FlowPay — AI Payment Verification Protocol | Personal | `/projects/flowpay.jpg` | ✓ |
| pulse | Pulse — Friend Location & Activity Tracker | Personal | `/projects/pulse.jpg` | ✓ |
| bookmzi | BookMzi — SA Digital Book Platform | Personal | `/projects/bookmzi.jpg` | ✓ |
| gum-ai | GUM AI — Student Copilot | Personal | `/projects/gum-ai.jpg` | ✓ |

**Category filter buttons:** All · Web · Mobile · Personal · Academic

GUM (ID: 3) has `category: ["Academic", "Mobile"]` — appears in both rows in the "All" view.

---

## Certifications (8 total)

| Name | Has image | Note |
|---|---|---|
| Higher Certificate in ICT (CPUT) | No — verifyUrl only | Physical cert withheld pending fees; note field explains this |
| Technical Support Fundamentals | ✓ imageUrl | `/certificates/images/technical-support.jpg` |
| Google IT Support Professional | ✓ imageUrl | `/certificates/images/google-it-support.jpg` |
| System Administration | ✓ via pdfUrl fallback | |
| Foundations of UX Design | ✓ via pdfUrl fallback | |
| Crash Course on Python | ✓ via pdfUrl fallback | |
| Database Foundations | ✓ via pdfUrl fallback | |
| Matric Certificate | ✓ via pdfUrl fallback | |

Image display logic: `imageUrl` field takes priority; if absent, component derives JPG path from `pdfUrl` by replacing `/certificates/` → `/certificates/images/` and `.pdf` → `.jpg`.

---

## Hackathons

- **Telkom 10X Hackathon 2025** — 14 images in `public/hackathons/telkom/`
- **MICT SETA Western Cape 2026** — 21 images in `public/hackathons/mict/`

---

## Reflections (STAR method, PRP370S)

1. Reflection on coding in Markdown
2. Reflection on mock interview experience
3. Reflection on the use of GitHub Pages

---

## Entrepreneurial Background

- Mobile Car Wash, Dec 2023 — zero budget, WhatsApp marketing, residential suburb
- CPUT Entrepreneurship Game assignment
- Both documented in `CV.md` and woven into STAR reflections

---

## Contact

- **WhatsApp:** `+27 69 857 0219`
- **Email:** `218070349@mycput.ac.za`
- **LinkedIn:** https://www.linkedin.com/in/hlomlamagopeni

---

## Known non-issues

- GUM (ID: 3) has no thumbnail — intentional, letter fallback is acceptable
- Higher Certificate card shows no image — intentional, fee situation documented in `note` field
- Tailwind `delay-[Xms]` ambiguity warnings in build output — cosmetic, do not affect output

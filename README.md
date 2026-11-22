# Tharunshankar S — Award-Style Motion Portfolio

> A cinematic, scroll-driven personal portfolio engineered for **Tharunshankar S** (Full-Stack Software Engineer & Claude Certified Developer). Designed in the spirit of Awwwards / Site of the Day award-winning experiences, this site plays like a short animated film as the user scrolls.

---

## ⚡ Tech Stack

- **Framework:** Vite + React 18 + TypeScript
- **Scroll & Timelines:** GSAP (`ScrollTrigger`, custom text splitting)
- **Smooth Scrolling Physics:** Lenis (`lenis`) synchronized with GSAP's RAF ticker
- **UI Micro-Interactions & Physics:** Framer Motion + Spring Physics
- **Hero 3D Graphics:** Three.js (dynamic constellation particle cloud + wireframe icosahedron/octahedron reacting to mouse parallax)
- **Styling:** Tailwind CSS + custom glassmorphic layers and CSS variables
- **Deployment:** Deploy-ready for Vercel and Netlify (`vercel.json`, `netlify.toml`)

---

## 🎬 Motion Specifications & Features

1. **Preloader:** Precision counter from 0 to 100% with kinetic status ticker, masked typography, and a split dual-curtain wipe into the hero section.
2. **Hero:** Letter-by-letter 3D `rotateX` stagger reveal of **"THARUNSHANKAR S"**, cycling role line (*Full-Stack Engineer / TypeScript · Node · React / AI-Native Apps*), interactive 3D Three.js particle constellation reacting to mouse movement, status badge with pulsating beacon, and quick CTAs.
3. **About:** Pinned scroll section where the profile paragraph reveals word by word with opacity tied directly to scroll scrub. Features 5 count-up statistics (2+ years, 50+ txns/min, 1,000+ simulated txns/day, -30% wait time, -20% query speedup).
4. **Experience:** Pinned horizontal-scroll timeline on desktop (converts vertical wheel scroll into horizontal card translation). Cards feature clip-path reveals, staggered bullet points, and tech tags. On mobile, cleanly falls back to a vertical stack.
5. **Skills:** Dual-direction infinite kinetic marquees (row 1 scrolling left, row 2 scrolling right). Hovering over any item scales it up with an electric glow effect. Includes interactive category filtering across Languages, Frontend, Backend, Engineering, Data & Cloud, and AI.
6. **Projects:** Full-screen sticky stacked cards that scale down and blur as subsequent cards scroll into view. Features live telemetry oscilloscopes and query latency visualizations, metrics, and architecture deep-dive drawers.
7. **Credentials & Certifications:** Minimal list with animated SVG line-drawn dividers. Certifications (Claude Certified Developer, Gen AI, Prompt Engineering, SQL Masterclass, Python) feature 3D mouse tilt and holographic sheen effects.
8. **Contact:** Giant kinetic headline *"LET'S BUILD SOMETHING"*, magnetic email button with 1-click clipboard copy, celebration confetti, live toast notifications, phone/LinkedIn/location coordinates, and a continuous footer marquee.
9. **Accessibility & Performance:**
   - Full fallback for `prefers-reduced-motion`
   - Custom cursor (dot + lagging ring with "VIEW", "DRAG", "COPY" states) automatically disabled on touch/mobile devices
   - Semantic HTML, focus-visible outlines, accessible skip links, and ARIA labels
   - Optimized vendor chunk splitting (< 500kB chunks) for Lighthouse 95+ performance

---

## 🚀 Quick Start

### 1. Installation
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 🎨 Where to Tweak

All content, styles, and animation timings are cleanly isolated for instant customization:

### 1. Content & Credentials (`src/data/content.ts`)
The entire portfolio content lives in **one single file**:
- Personal details, rotating role titles, bio, and social links
- About paragraph, key pillars, and statistical counters
- Work experience roles, bullets, and technology tags
- Skills categories and marquee text arrays
- Project descriptions, metrics, and architecture highlights
- Education details and certification badges

### 2. Colors & Palette
- **Tailwind configuration:** [tailwind.config.js](file:///C:/Users/91790/.gemini/antigravity/scratch/tharunshankar-portfolio/tailwind.config.js)
  - `dark.bg`: `#0A0A0B` (Cinematic near-black)
  - `electric.lime`: `#C6FF3D` (Primary electric accent)
  - `electric.violet`: `#7C5CFF` (Secondary glow accent)
  - `dark.card`: `#121216` / `dark.surface`: `#16161C`
- **Global CSS variables:** [src/index.css](file:///C:/Users/91790/.gemini/antigravity/scratch/tharunshankar-portfolio/src/index.css)
  - Tweak `--accent-lime`, `--accent-violet`, or the noise overlay opacity (default `0.035`).

### 3. Fonts & Typography
- **Google Fonts preloads:** [index.html](file:///C:/Users/91790/.gemini/antigravity/scratch/tharunshankar-portfolio/index.html)
  - Display: `Syne`, `Space Grotesk`
  - Mono: `JetBrains Mono`
  - Body: `Plus Jakarta Sans`, `Inter`
- **Kinetic headline sizes:** [src/index.css](file:///C:/Users/91790/.gemini/antigravity/scratch/tharunshankar-portfolio/src/index.css)
  - `.headline-giant`: `clamp(2.75rem, 9.5vw, 11.5rem)`

### 4. Animation Timings & Physics
- **Preloader counter & curtain wipe duration:** [src/components/Preloader.tsx](file:///C:/Users/91790/.gemini/antigravity/scratch/tharunshankar-portfolio/src/components/Preloader.tsx#L40-L75)
  - `duration: 1.8` (counter speed)
  - `duration: 0.85` with `ease: 'expo.inOut'` (curtain reveal)
- **Lenis Smooth Scroll Physics:** [src/hooks/useLenis.ts](file:///C:/Users/91790/.gemini/antigravity/scratch/tharunshankar-portfolio/src/hooks/useLenis.ts#L18-L26)
  - `duration: 1.2`, `wheelMultiplier: 1.0`
- **Magnetic Button Pull:** [src/components/MagneticButton.tsx](file:///C:/Users/91790/.gemini/antigravity/scratch/tharunshankar-portfolio/src/components/MagneticButton.tsx) & [src/hooks/useMagnetic.ts](file:///C:/Users/91790/.gemini/antigravity/scratch/tharunshankar-portfolio/src/hooks/useMagnetic.ts)
  - `strength: 0.35`, `duration: 0.4`
- **Hero Three.js Particle Speed:** [src/components/ThreeHeroCanvas.tsx](file:///C:/Users/91790/.gemini/antigravity/scratch/tharunshankar-portfolio/src/components/ThreeHeroCanvas.tsx#L125-L148)
  - Rotation speeds and mouse parallax damping (`group.rotation.y += (targetX - ...) * 0.05`).
- **Marquee Speeds:** [tailwind.config.js](file:///C:/Users/91790/.gemini/antigravity/scratch/tharunshankar-portfolio/tailwind.config.js#L35-L40)
  - `marquee-left`: `30s` (change to `20s` for faster or `40s` for slower).

---

## 📁 Project Structure

```
tharunshankar-portfolio/
├── public/
│   ├── favicon.svg             # Custom dark/lime TS vector monogram
│   ├── og-image.svg            # 1200x630 social sharing preview
│   └── resume.pdf              # Downloadable resume placeholder
├── src/
│   ├── components/
│   │   ├── CustomCursor.tsx    # Dot + lagging ring with "VIEW"/"DRAG"/"COPY"
│   │   ├── MagneticButton.tsx  # Spring-physics magnetic hover button
│   │   ├── Navbar.tsx          # Glassmorphic header with live IST ticker & CTA
│   │   ├── NoiseOverlay.tsx    # Film grain SVG filter
│   │   ├── Preloader.tsx       # 0-100 counter & curtain wipe reveal
│   │   ├── ScrollProgress.tsx  # Top progress line + back-to-top indicator
│   │   ├── SectionHeading.tsx  # Standardized Awwwards typography header
│   │   ├── ThreeHeroCanvas.tsx # Three.js 3D particle constellation & core
│   │   └── Toast.tsx           # Framer Motion notification toast
│   ├── data/
│   │   └── content.ts          # Single source of truth for all content
│   ├── hooks/
│   │   ├── useLenis.ts         # Smooth scroll + GSAP ticker synchronization
│   │   ├── useMagnetic.ts      # Physics-based cursor attraction
│   │   ├── useMousePosition.ts # Normalized coordinates for parallax
│   │   └── useReducedMotion.ts # Accessibility prefers-reduced-motion check
│   ├── sections/
│   │   ├── HeroSection.tsx     # 3D rotateX staggered text & 3D canvas
│   │   ├── AboutSection.tsx    # Pinned word-by-word scrub reveal & count-up stats
│   │   ├── ExperienceSection.tsx # Pinned horizontal scroll timeline (UST)
│   │   ├── SkillsSection.tsx   # Dual-direction infinite marquees & deep grid
│   │   ├── ProjectsSection.tsx # Sticky stacking cards with telemetry visuals
│   │   ├── EducationCertificationsSection.tsx # 3D tilt credentials & line draw
│   │   └── ContactSection.tsx  # Giant kinetic typography, copy email, dispatch form
│   ├── App.tsx                 # Master layout & interaction orchestrator
│   ├── index.css               # Tailwind & custom motion styles
│   └── main.tsx                # React root mount
├── netlify.toml                # Netlify deployment configuration
├── vercel.json                 # Vercel deployment configuration
├── vite.config.ts              # Vite bundle chunk optimization
├── tailwind.config.js          # Tailwind theme & keyframes
└── package.json                # Dependencies & scripts
```

# Nativewit — Company Introduction Video

An **80-second, 1920×1080 company introduction video** for [Nativewit Technologies](https://nativewit.in) built entirely with [Remotion](https://www.remotion.dev/) and React. No video editor. Every frame is code.

Includes a recorded voiceover synced frame-precisely to the SRT transcript, plus a background music track.

![Nativewit Logo](public/logo.png)

---

## Preview

| Scene | Frames | Duration | VO span | Content |
|---|---|---|---|---|
| Hook | 150 | 5s | 00:00–00:05 | Product screen flashes + opening statement |
| Problem | 300 | 10s | 00:05–00:15 | Founder pain points — speed vs. wrong partners |
| Authority | 540 | 18s | 00:15–00:33 | "We're Nativewit" — logo, stats, verticals |
| Proof | 450 | 15s | 00:33–00:48 | 4 shipped product categories + cross-domain tagline |
| Differentiator | 570 | 19s | 00:48–01:07 | Co-founder mindset · hard questions · AI embedded |
| CTA | 390 | 13s | 01:07–01:20 | Logo + CTA line + nativewit.in |

**Total: 2400 frames · 80 seconds · 30fps · 1920×1080 · H.264**

---

## Audio

| File | Role | Volume |
|---|---|---|
| `public/voiceover.mp3` | Recorded VO — synced to SRT transcript | 100% |
| `public/music.mp3` | Background music | 15% |

All animation keyframes are mapped to precise transcript timestamps so on-screen text reveals match the spoken word.

---

## Tech Stack

- **[Remotion 4](https://www.remotion.dev/)** — Code-based video rendering
- **React 18** — Component model for scenes
- **TypeScript** — Type-safe props and data
- **Node.js / npm** — Build toolchain

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Preview in Remotion Studio

```bash
npm run dev
```

Opens **http://localhost:3000** — select any composition from the sidebar to preview and scrub through the timeline.

### Render to MP4

```bash
npx remotion render NativewitIntro out/nativewit-final.mp4
```

Outputs `out/nativewit-final.mp4` — 1920×1080, 30fps, H.264, ~5.7 MB.

---

## Project Structure

```
remotion/
├── public/
│   ├── logo.png                 # Nativewit brand logo
│   ├── voiceover.mp3            # Recorded voiceover — synced to transcript
│   └── music.mp3                # Background music track
├── src/
│   ├── index.ts                 # Entry — registerRoot()
│   ├── Root.tsx                 # Registers all compositions
│   ├── theme.ts                 # Brand colors & fonts
│   ├── compositions/
│   │   └── NativewitIntro.tsx   # Main 80s composition — scene orchestration + audio
│   └── scenes/
│       ├── Hook.tsx             # 0–5s — opening product flashes + statement
│       ├── Problem.tsx          # 5–15s — founder pain points
│       ├── Authority.tsx        # 15–33s — brand identity + credibility stats
│       ├── Proof.tsx            # 33–48s — 4 product categories shipped
│       ├── Differentiator.tsx   # 48–67s — co-founder mindset + AI
│       └── CTA.tsx              # 67–80s — call to action
├── system_design.md             # Architecture & component docs
├── remotion.config.ts           # Output settings
└── package.json
```

---

## Brand Theme

All scenes use the color palette from [nativewit.in](https://nativewit.in):

| Token | Value | Usage |
|---|---|---|
| Background | `#0a0a0a` | Full-screen bg |
| Surface | `#141414` | Cards & panels |
| Border | `rgba(255,255,255,0.1)` | Card borders |
| Text Primary | `#ffffff` | Headlines |
| Text Secondary | `rgba(255,255,255,0.5)` | Body text |
| Accent | `#e63434` | Highlights, glows, labels |
| Font | Nunito → Inter → sans-serif | All text |

---

## Architecture

```
index.ts → Root.tsx → NativewitIntro.tsx
                           │
                    Audio (VO + music)
                           │
          ┌────────────────┼─────────────────────┐
        Hook  Problem  Authority  Proof  Differentiator  CTA
                           │
                       theme.ts / logo.png
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Remotion Studio at localhost:3000 |
| `npx remotion render NativewitIntro out/nativewit-final.mp4` | Render final video |
| `npm run upgrade` | Upgrade Remotion packages |

---

## License

Private. © 2026 Nativewit Technologies Pvt Ltd.

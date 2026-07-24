# 💖 Premium Interactive Date Invitation Web App

An adorable, Disney/Pixar/Sanrio-inspired interactive proposal story website built with React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, and Web Audio API.

---

## ✨ Features

- 🐱 **Animated Vector SVG Cats**: Custom interactive cats with expressions (blushing, purring, waving, sleeping, excited).
- 📜 **Interactive Story Flow**:
  1. **Loading Screen**: Heartbeat loader & Web Audio initialization.
  2. **Cat Introduction**: Animated speech bubbles & cat tap Easter eggs.
  3. **A Little Rhyme**: Staggered animated glassmorphism poem card.
  4. **Pet-The-Cat Mini-Game**: Interactive petting mechanic with live purrs & heart progress meter.
  5. **Dramatic Suspense & Proposal**: Beating heart & question with a playful **NO** button (dodges 3 times with cute prompts before turning clickable).
  6. **Express Delivery Car**: Animated pastel car driving in with a tied agreement scroll.
  7. **Official Adventure Agreement**: Interactive HTML5 Canvas signature pad with gold/red **APPROVED ❤️** stamp.
  8. **Cinematic Grand Finale**: Ambient transition to a starry night sky with twinkling stars, achievement badge (**First Date Unlocked 🏆**), fireworks & memory photo frame.
- 🎵 **Native Web Audio Synth**: Soft Disney-style lofi chord progression background music, meows, purrs, pops, car honks, and stamp thumps without requiring external mp3 downloads!
- 💖 **GPU Particle System**: Floating hearts, sparkles, stars, sakura petals, cursor trail, and tap paw prints.

---

## 🛠️ Project Structure

```
d:\KITTI\
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── context/
│   │   └── AppContext.tsx          # Centralized React Context & State Management
│   ├── types/
│   │   └── app.ts                 # TypeScript types & scene definitions
│   ├── hooks/
│   │   └── useAudioEngine.ts      # Web Audio API Synthesizer & SFX
│   ├── components/
│   │   ├── CatIllustration.tsx    # Vector SVG Cat with expressions & animations
│   │   ├── DeliveryCarSVG.tsx     # Animated Pastel Express Delivery Car
│   │   ├── FloatingParticles.tsx  # High-performance Canvas Particles & Cursor Trail
│   │   ├── NavigationHeader.tsx   # Persistent Audio Mute & Restart controls
│   │   └── SignaturePad.tsx       # Touch/Mouse HTML5 Canvas signature pad
│   └── pages/
│       ├── SceneLoading.tsx
│       ├── SceneCatIntro.tsx
│       ├── ScenePoemOne.tsx
│       ├── SceneMiniGame.tsx
│       ├── SceneSuspenseProposal.tsx
│       ├── SceneProposal.tsx
│       ├── SceneNoGraceful.tsx
│       ├── SceneYesCelebration.tsx
│       ├── SceneDeliveryCar.tsx
│       ├── SceneContract.tsx
│       └── SceneFinalGrand.tsx
```

---

## 🚀 Quick Setup & Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Local Dev Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🎨 Customization Guide

### 1. Customizing the Poem
Open `src/pages/ScenePoemOne.tsx` and edit the `poemLines` array:
```typescript
const poemLines = [
  "Roses are red 🌹",
  "The sky is blue 💙",
  "We recently met,",
  "But I'd love to know you.",
];
```

### 2. Customizing Contract Terms
Open `src/pages/SceneContract.tsx` and edit the `terms` array:
```typescript
const terms = [
  "Go on one fun date.",
  "Laugh at bad jokes.",
  "Eat something tasty.",
  "Respect each other.",
];
```

### 3. Customizing Colors & Theme
Open `tailwind.config.js` to tweak pastel color tokens (`pastel.pink`, `pastel.lavender`, `pastel.peach`, `pastel.sky`).

---

## 🌐 Deployment Instructions

### Vercel (Recommended)
1. Push this project to GitHub.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository.
4. Select **Vite** as framework preset and click **Deploy**!

### Netlify
1. Run `npm run build`.
2. Drag and drop the generated `dist` folder into Netlify Drop or link your Git repository.

### GitHub Pages
1. Install `gh-pages`: `npm install -D gh-pages`
2. Add `"deploy": "npm run build && gh-pages -d dist"` to `package.json`.
3. Run `npm run deploy`.

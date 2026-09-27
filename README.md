# Memory Dealer 🕵️‍♂️💾

> *"Every photograph hides a memory worth dealing. Jack into the archive, restore the evidence, and find out what the city doesn't want you to remember."*

**Memory Dealer** is a neon-soaked, cyberpunk neo-noir web-based game built with **Next.js**, **React**, **Framer Motion**, and the **React Image Editor**.

You play as the newest detective in the Vice City P.D. Neural Archive Division. Working the night shift, your job is to jack into the secure neural uplink, download corrupted memory files, and use forensic image editing tools to restore the evidence and uncover the hidden truth.

![Memory Dealer Banner](/public/city_skyline.jpg)

---

## 🎮 Features

- **Interactive Forensic Investigation:** Use a fully functional, embedded Image Editor (`@unlayer/react-image-editor`) to manipulate brightness, contrast, crop, and draw on evidence to reveal hidden clues.
- **Cyberpunk HUD & UI:** Immersive, terminal-styled glowing interfaces using custom TailwindCSS layers, Vice City gradients, and scanline CRT effects.
- **Dynamic Targeting System:** Activate the "Extractor" module to drop a precise crosshair over the image to scan specific coordinate zones for hidden anomalies.
- **Cinematic Sequences:** Fully animated introduction sequences and end-of-case forensic reconstructions powered by `framer-motion`.
- **Dynamic Case Files:** Progress through a series of increasingly difficult cases (`NIGHT SHIFT`, `SIGNAL LOST`, `BLACKOUT`) with unique evidence logic and voice-transcribed briefings.
- **Share Evidence:** A built-in Web Share API integration allows players to instantly tweet or download their beautifully edited forensic case files!

---

## 🚀 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org) (App Router)
- **Styling:** TailwindCSS + Custom CSS variables (`globals.css`)
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Image Editor:** `@unlayer/react-image-editor`
- **Fonts:** Next Font (Bebas Neue, Fragment Mono, Instrument Serif)

---

## 🕹️ How to Play

1. **JACK IN:** Select an open case file from the Landing Page.
2. **RESTORE & RECONSTRUCT:** Use the built-in React Image Editor tools (Filter, Crop, Draw) to clear up the dark, corrupted evidence. 
3. **TARGET & EXTRACT:** Click **ARM EXTRACTOR** to scan for hidden clues within the image. Click precisely on the hidden targets to extract them.
4. **SAVE MEMORY:** Once you've manipulated the image to clearly show the evidence, click the **Save** button in the editor toolbar.
5. **EXPORT & SHARE:** With the image saved and clues extracted, the **SEND EVIDENCE** button will unlock. Export your case to trigger the cinematic reconstruction!

---

## 🛠️ Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to enter the Vice City Neural Archive!

---

*Designed and engineered in the neon glow of Vice City.*

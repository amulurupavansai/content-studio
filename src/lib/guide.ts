export interface GuideStep {
  title: string;
  goal: string;
  actions: string[];
  tools: { name: string; cost: string; use: string }[];
}

export const GUIDE_STEPS: GuideStep[] = [
  {
    title: "1. Pick a niche and validate ideas",
    goal: "Choose a topic with proven demand and a format you can repeat weekly.",
    actions: [
      "Search YouTube/TikTok for the niche and note videos with views far above the channel's subscriber count.",
      "Write 20+ ideas into the Idea Bank and tag each by series.",
      "Prioritise ideas with a clear curiosity gap in the title.",
    ],
    tools: [
      { name: "YouTube search suggest", cost: "Free", use: "Autocomplete shows what people look for" },
      { name: "Google Trends", cost: "Free", use: "Check if interest is rising or fading" },
      { name: "VidIQ / TubeBuddy (free tier)", cost: "Free–$", use: "Keyword scores and competitor stats" },
    ],
  },
  {
    title: "2. Write the script",
    goal: "A hook in the first 3 seconds, a tight body, and one clear call to action.",
    actions: [
      "Open the video in Content Studio and fill hook / body / CTA.",
      "Keep the hook to ~8 words; promise or provoke immediately.",
      "Target ~150 words per minute: Shorts/Reels ≈ 100–150 words, long form 1,200–1,800.",
      "Fact-check claims and note sources in the video notes.",
    ],
    tools: [
      { name: "Claude / ChatGPT / Gemini", cost: "Free tiers", use: "Outline, draft and tighten scripts" },
      { name: "Hemingway Editor", cost: "Free (web)", use: "Simplify sentences for spoken delivery" },
    ],
  },
  {
    title: "3. Record the voiceover",
    goal: "Clear, consistent narration without showing your face or real voice if you prefer.",
    actions: [
      "Read the script aloud once; edit anything that is awkward to say.",
      "Export WAV/MP3 at 44.1 kHz and normalise loudness (about -14 LUFS).",
      "Keep the same voice across the channel for brand consistency.",
    ],
    tools: [
      { name: "ElevenLabs", cost: "Free tier / $5+", use: "Natural AI voices (check commercial-use terms)" },
      { name: "Microsoft Edge Read Aloud / Azure TTS", cost: "Free / pay-as-you-go", use: "Decent neural voices" },
      { name: "Piper TTS", cost: "Free, open source", use: "Offline text-to-speech" },
      { name: "Audacity", cost: "Free", use: "Record, denoise and normalise" },
    ],
  },
  {
    title: "4. Create the visuals and animation",
    goal: "Simple, consistent animation synced to the voiceover.",
    actions: [
      "Split the script into scenes; one visual idea per sentence or two.",
      "Build a small asset kit (characters, backgrounds, icons) and reuse it.",
      "Animate with simple moves: pan, zoom, parallax, character swaps, text pops.",
      "For AI clips, keep them short (2–5 s) and cover them with motion and captions.",
    ],
    tools: [
      { name: "Canva", cost: "Free / Pro", use: "Quick animated templates and elements" },
      { name: "Krita / Inkscape", cost: "Free", use: "Draw characters and backgrounds" },
      { name: "Blender (Grease Pencil)", cost: "Free", use: "Full 2D/3D animation" },
      { name: "Synfig / OpenToonz", cost: "Free", use: "Dedicated 2D animation" },
      { name: "Runway / Pika / Luma (free credits)", cost: "Free–$", use: "AI image-to-video clips" },
    ],
  },
  {
    title: "5. Edit, add sound and captions",
    goal: "Fast pacing, readable captions and clean audio.",
    actions: [
      "Cut to the voiceover; change visuals every 3–6 seconds.",
      "Add background music at -20 dB under voice and light sound effects.",
      "Auto-generate captions, fix errors, use large high-contrast text.",
      "Export 1080p (16:9 for YouTube, 9:16 for Shorts/Reels).",
    ],
    tools: [
      { name: "DaVinci Resolve", cost: "Free", use: "Pro-grade editor with auto captions in Studio" },
      { name: "CapCut", cost: "Free / Pro", use: "Fast editing and auto-captions" },
      { name: "Pixabay / Freesound / YouTube Audio Library", cost: "Free", use: "Royalty-free music and SFX (check licence)" },
    ],
  },
  {
    title: "6. Package: thumbnail, title, description, hashtags",
    goal: "Win the click and help the platform understand the video.",
    actions: [
      "Work through the Checklist tab for each video.",
      "Thumbnail: one focal point, 3–4 words max, high contrast.",
      "Title: under ~60 characters, curiosity or clear benefit.",
      "Description: first 2 lines carry the hook and keyword; add timestamps and links.",
      "Add 3–5 relevant tags on YouTube and 5–10 hashtags on Instagram.",
    ],
    tools: [
      { name: "Canva / Photopea", cost: "Free", use: "Thumbnails and covers" },
      { name: "Hashtag research via platform search", cost: "Free", use: "See volume and related tags" },
    ],
  },
  {
    title: "7. Schedule and publish",
    goal: "Post consistently at the cadence you set in your Channel settings.",
    actions: [
      "Drag the video onto a date in the Calendar.",
      "Batch-produce: finish 3–5 videos, then schedule a few weeks out.",
      "Upload natively to each platform (no watermarks from other apps).",
    ],
    tools: [
      { name: "YouTube Studio scheduler", cost: "Free", use: "Schedule publish time" },
      { name: "Meta Business Suite", cost: "Free", use: "Schedule Instagram Reels" },
    ],
  },
  {
    title: "8. Review performance and iterate",
    goal: "Learn what works and double down on it.",
    actions: [
      "After 48 hours log views, likes and comments in the video's Performance tab.",
      "Compare formats, hooks and topics on the Performance page.",
      "Retire what flops; make more of what beats your average.",
    ],
    tools: [
      { name: "YouTube Studio Analytics", cost: "Free", use: "Retention graph and traffic sources" },
      { name: "Instagram Insights", cost: "Free", use: "Reach, watch time and shares" },
    ],
  },
];

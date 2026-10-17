import { Project, Testimonial, ClientLogo } from "../types/editor"

export const CLIENT_ROSTER: ClientLogo[] = [
  { name: "A24", division: "Special Projects", projectCount: 3 },
  { name: "Polestar", division: "Global Brand Films", projectCount: 4 },
  { name: "Nike Lab", division: "Speed of Thought Series", projectCount: 6 },
  { name: "Spotify", division: "Originals & Mini-Docs", projectCount: 8 },
  { name: "Figma", division: "Config Keynote Narrative", projectCount: 5 },
  { name: "Sony Music", division: "Visual Stems & Cuts", projectCount: 7 },
  { name: "Wieden+Kennedy", division: "Commercial Offline", projectCount: 12 },
  { name: "Anonymous Content", division: "Director's Cuts", projectCount: 9 }
]

export const PROJECTS: Project[] = [
  {
    id: "proj-01",
    title: "The Silent Shift",
    client: "Polestar Automotive",
    category: "Commercial",
    year: "2026",
    aspectRatio: "2.39:1 Anamorphic",
    duration: "01:45",
    resolution: "4K DCI (4096 × 1716)",
    fps: "24.00 fps",
    director: "Marcus Lindqvist (Anonymous Content)",
    colorist: "Company 3 London",
    soundDesigner: "Julian Vance (Integrated)",
    views: "3.4M Organic Views",
    turnaroundDays: 5,
    description: "An evocative, whisper-quiet electric performance film pairing macro tire slip-angles with classical string crescendo. Rhythmic editing matched to electric motor torque frequencies.",
    keyAccomplishment: "Tribeca X 2026 Official Nominee · Offline rough cut locked in 96 hours across 8TB of ARRIRAW.",
    tags: ["Anamorphic", "Automotive", "Sound Design", "Invisible VFX"],
    stillImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85",
    logGradeImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85&sat=-60&con=-20",
    finishedGradeImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85",
    edlCutsCount: 84,
    timelineStems: {
      dialogue: true,
      foley: true,
      music: true
    }
  },
  {
    id: "proj-02",
    title: "Speed of Thought",
    client: "Nike Lab x Olympic Track",
    category: "Commercial",
    year: "2026",
    aspectRatio: "16:9 DCI",
    duration: "00:60",
    resolution: "UHD 3840 × 2160",
    fps: "24.00 fps",
    director: "Elena Rostova (Wieden+Kennedy)",
    colorist: "The Mill New York",
    soundDesigner: "Wave Studios",
    views: "18.2M Views",
    turnaroundDays: 3,
    description: "High-adrenaline kinetic cutting that fractures the 100-meter sprint into psychological micro-moments. Time-remapped match cuts bridging athlete heartbeats with stadium roar.",
    keyAccomplishment: "Gold Lion shortlist in Film Craft (Editing) · +38% YouTube preroll completion rate.",
    tags: ["Kinetic Match-Cuts", "Sport", "Speed Ramping", "Pacing"],
    stillImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1600&q=85",
    logGradeImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1600&q=85&sat=-70&con=-30",
    finishedGradeImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1600&q=85",
    edlCutsCount: 142,
    timelineStems: {
      dialogue: false,
      foley: true,
      music: true
    }
  },
  {
    id: "proj-03",
    title: "Ghost in the Analog Sound",
    client: "A24 Documentaries",
    category: "Narrative",
    year: "2025",
    aspectRatio: "1.66:1 European",
    duration: "18:24",
    resolution: "4K 4096 × 2468",
    fps: "23.976 fps",
    director: "Tariq Mansour",
    colorist: "Julian Vance (Print LUT)",
    soundDesigner: "Soundfirm Berlin",
    views: "Sundance Premiere",
    turnaroundDays: 14,
    description: "A patient, atmospheric documentary chronicling the lost magnetic tape archives of the BBC Radiophonic Workshop. Tension built through deliberate silence and jump cuts on reel clicks.",
    keyAccomplishment: "Sundance Film Festival 2025 Short Form Special Jury Prize for Editing.",
    tags: ["16mm Film Grain", "Documentary", "Atmospheric", "Dialogue Editing"],
    stillImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=85",
    logGradeImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=85&sat=-65&con=-25",
    finishedGradeImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=85",
    edlCutsCount: 312,
    timelineStems: {
      dialogue: true,
      foley: true,
      music: true
    }
  },
  {
    id: "proj-04",
    title: "Neon Solitude",
    client: "Sony Music / The Midnight",
    category: "Music Video",
    year: "2026",
    aspectRatio: "2.35:1 Scope",
    duration: "04:12",
    resolution: "DCI 4K",
    fps: "24.00 fps",
    director: "Julian Meyer (Somesuch)",
    views: "9.8M Streams",
    turnaroundDays: 4,
    description: "A neon-drenched Tokyo midnight odyssey cutting between nostalgic VHS tape artifacts and razor 35mm anamorphic footage, synchronized with 80s synth transients.",
    keyAccomplishment: "VMA Best Editing Nominee · Over 95% audience retention across the 4-minute runtime.",
    tags: ["Music Video", "Retrograde", "Synthwave", "Rhythm Sync"],
    stillImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=85",
    logGradeImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=85&sat=-75&con=-35",
    finishedGradeImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=85",
    edlCutsCount: 228,
    timelineStems: {
      dialogue: false,
      foley: true,
      music: true
    }
  },
  {
    id: "proj-05",
    title: "Surviving 100 Hours of Cold",
    client: "Top Tier YouTube Creator Studio",
    category: "Short Form",
    year: "2026",
    aspectRatio: "16:9 & 9:16",
    duration: "24:18",
    resolution: "4K 60fps & 24fps",
    fps: "59.94 fps",
    director: "Creator Direction x Julian Vance",
    views: "28.4M Views",
    turnaroundDays: 6,
    description: "High-retention storytelling re-cut from 42 hours of raw multi-cam expedition footage. Redesigned narrative pacing hook within the first 12 seconds with surgical audio drops.",
    keyAccomplishment: "Retention soared from channel baseline 34% to 58.4% at the 10-minute mark.",
    tags: ["YouTube Retention", "Story Hook", "Multi-Cam", "Sound Polish"],
    stillImage: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1600&q=85",
    logGradeImage: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1600&q=85&sat=-60&con=-20",
    finishedGradeImage: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1600&q=85",
    edlCutsCount: 580,
    timelineStems: {
      dialogue: true,
      foley: true,
      music: true
    }
  },
  {
    id: "proj-06",
    title: "The Architecture of Craft",
    client: "Figma Keynote Special",
    category: "Commercial",
    year: "2025",
    aspectRatio: "16:9 DCI",
    duration: "02:30",
    resolution: "4K 3840 × 2160",
    fps: "24.00 fps",
    director: "Sarah Chen (Head of Video)",
    views: "4.1M Tech Views",
    turnaroundDays: 4,
    description: "Bespoke keynote kickoff film exploring the micro-interactions of software design through tactile physical metaphors: wood carving, metal milling, and precision typography.",
    keyAccomplishment: "Opened the 2025 Global Keynote to 45,000 live streaming designers.",
    tags: ["Tech Commercial", "Keynote", "Macro Lens", "Pacing"],
    stillImage: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1600&q=85",
    logGradeImage: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1600&q=85&sat=-60&con=-20",
    finishedGradeImage: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1600&q=85",
    edlCutsCount: 96,
    timelineStems: {
      dialogue: true,
      foley: true,
      music: true
    }
  }
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-01",
    quote: "Julian understands emotional timing better than almost any editor I've partnered with in fifteen years of directing. When we were drowning in 8TB of ARRIRAW dailies on Polestar, he delivered an offline cut in four days that brought the client team to tears.",
    author: "Marcus Lindqvist",
    role: "Executive Creative Director",
    company: "Anonymous Content",
    project: "Polestar — The Silent Shift",
    year: "2026"
  },
  {
    id: "test-02",
    quote: "Most editors wait for instructions. Julian diagnoses what the footage actually needs. His sound design pass alone saved our Nike sprint campaign two weeks of separate audio post-production.",
    author: "Elena Rostova",
    role: "Senior Agency Producer",
    company: "Wieden+Kennedy London",
    project: "Nike Lab — Speed of Thought",
    year: "2026"
  },
  {
    id: "test-03",
    quote: "We sent him our YouTube documentary cut which was losing 60% of viewers in the first two minutes. Julian restructured the narrative hook and micro-timed the cuts. Retention surged by +41.8% and became our most viral video ever.",
    author: "Tariq Mansour",
    role: "Lead Creator & Documentarian",
    company: "A24 / Horizon Docs",
    project: "Ghost in the Analog Sound",
    year: "2025"
  }
]

export const EDITORIAL_PILLARS = [
  {
    number: "01",
    title: "Psychological Narrative Pacing",
    tagline: "The cut doesn't just trim time; it directs heartbeat and breath.",
    description: "Every cut is placed against the actor's eye-blink and natural breath intervals. By respecting human cognitive saccades, transitions feel inevitable rather than assembled.",
    metricLabel: "Average Retention Boost",
    metricValue: "+41.8%"
  },
  {
    number: "02",
    title: "Surgical Multi-Stem Sound Design",
    tagline: "50% of what an audience sees is actually what they hear.",
    description: "Editing offline without sound is cutting blind. I build multi-track audio landscapes with custom Foley, sub-bass impacts, and clean dialogue stems directly in the edit suite.",
    metricLabel: "Audio Stems Included",
    metricValue: "LCR + 5.1 Ready"
  },
  {
    number: "03",
    title: "Invisible Timeline VFX",
    tagline: "No waiting for external VFX houses to lock basic shots.",
    description: "Screen replacements, clean plates, rig removals, dynamic speed ramping, and optical flow morph cuts executed right inside DaVinci Resolve & Premiere timelines.",
    metricLabel: "Turnaround Acceleration",
    metricValue: "3x Faster"
  },
  {
    number: "04",
    title: "Color Grade & Film Print Science",
    tagline: "Translating flat camera logs into rich celluloid emotion.",
    description: "Extensive experience grading ARRI LogC3/C4, RED IPP2, and Sony S-Log3 into custom Kodak 2383 and 5219 film emulation looks with authentic halation and gate weave.",
    metricLabel: "Color Precision",
    metricValue: "DCI-P3 & Rec.709"
  }
]

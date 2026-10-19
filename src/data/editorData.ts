import { Project, Testimonial, ClientLogo } from "../types/editor"

export const CLIENT_ROSTER: ClientLogo[] = [
  { name: "Official Showreel", division: "High-Tempo Brand & Motion", projectCount: 6 },
  { name: "Monster Showreel", division: "3D Commercial Animation", projectCount: 4 },
  { name: "YouTube Creator Network", division: "Long Form & Storytelling", projectCount: 18 },
  { name: "Apex Motion", division: "After Effects 24 Title Sequences", projectCount: 12 },
  { name: "The Dialogue Studio", division: "Podcast Multi-Cam Flow", projectCount: 9 },
  { name: "Kinetic Velocity", division: "Viral Short Form & Hooks", projectCount: 24 },
  { name: "Horizon Visuals", division: "Atmospheric Narrative Cuts", projectCount: 7 }
]

export const PROJECTS: Project[] = [
  {
    id: "proj-01",
    title: "Alternator - Portfolio // Official Showreel",
    client: "Commercial & 3D Motion",
    category: "Motion Graphics",
    year: "2026",
    youtubeId: "7fP0N1iH9XU",
    videoSrc: "/videos/showreel.mp4",
    aspectRatio: "16:9 DCI",
    duration: "00:40",
    resolution: "4K UHD 60fps",
    fps: "60.00 fps",
    director: "Alter (alterffx)",
    colorist: "Alter (High Contrast Commercial Grade)",
    soundDesigner: "Tactile Sound FX & Sub Hits",
    views: "Featured Showreel",
    turnaroundDays: 2,
    description: "Official editorial showreel created in After Effects 24. Combines 3D product motion, dynamic speed ramps, and frame-synced sound design to lock in viewer attention from the first second.",
    keyAccomplishment: "Demonstrates high-tempo commercial pacing, 3D camera tracking, and tactile sound design.",
    tags: ["Official Showreel", "Motion Graphics", "3D Product Motion", "Sound Design"],
    stillImage: "/thumbnails/showreel-thumb.png",
    logGradeImage: "/thumbnails/showreel-thumb.png",
    finishedGradeImage: "/thumbnails/showreel-thumb.png",
    edlCutsCount: 72,
    timelineStems: {
      dialogue: false,
      foley: true,
      music: true
    }
  },
  {
    id: "proj-monster",
    title: "Monster Commercial Showreel",
    client: "Commercial & 3D Motion",
    category: "Motion Graphics",
    year: "2026",
    youtubeId: "EPU8ivyiWHI",
    aspectRatio: "16:9 DCI",
    duration: "00:48",
    resolution: "4K UHD 60fps",
    fps: "60.00 fps",
    director: "Alter (alterffx)",
    colorist: "Alter (High Contrast Commercial Grade)",
    soundDesigner: "Tactile Sound FX & Sub Hits",
    views: "Featured Reel",
    turnaroundDays: 2,
    description: "Commercial showreel created in After Effects 24. Combines 3D product motion, dynamic speed ramps, and frame-synced sound design to lock in viewer attention from the first second.",
    keyAccomplishment: "Demonstrates high-tempo commercial pacing, 3D camera tracking, and tactile sound design.",
    tags: ["Motion Graphics", "3D Product Motion", "Speed Ramping", "Sound Design"],
    stillImage: "https://img.youtube.com/vi/EPU8ivyiWHI/maxresdefault.jpg",
    logGradeImage: "https://alterffx.carrd.co/assets/images/gallery04/d0c31d36.jpg?v=4342f943",
    finishedGradeImage: "https://img.youtube.com/vi/EPU8ivyiWHI/maxresdefault.jpg",
    edlCutsCount: 72,
    timelineStems: {
      dialogue: false,
      foley: true,
      music: true
    }
  },
  {
    id: "proj-02",
    title: "Long Form Content Mastercut",
    client: "YouTube Creators & Storytellers",
    category: "YouTube Long Form",
    year: "2026",
    youtubeId: "YMerm49il-0",
    aspectRatio: "16:9 DCI",
    duration: "12:35",
    resolution: "4K UHD",
    fps: "24.00 fps",
    director: "Alter (alterffx)",
    colorist: "Warm High-Contrast Grade",
    soundDesigner: "Bespoke Atmosphere & Soundscaping",
    views: "High Retention Master",
    turnaroundDays: 4,
    description: "12-minute high-retention YouTube long form edit. Engineered with visual pattern interrupts every 4 to 6 seconds, custom kinetic infographics, paper texture transitions, and tight narrative pacing.",
    keyAccomplishment: "Structured to hold viewer retention above 70% past the critical 3-minute drop point.",
    tags: ["YouTube Long Form", "Retention Pacing", "Pattern Interrupts", "Motion Graphics"],
    stillImage: "https://img.youtube.com/vi/YMerm49il-0/maxresdefault.jpg",
    logGradeImage: "https://alterffx.carrd.co/assets/images/gallery03/b5cfce28.jpg?v=4342f943",
    finishedGradeImage: "https://img.youtube.com/vi/YMerm49il-0/maxresdefault.jpg",
    edlCutsCount: 240,
    timelineStems: {
      dialogue: true,
      foley: true,
      music: true
    }
  },
  {
    id: "proj-03",
    title: "Podcast Edits & High-Impact Flow",
    client: "Creator Studios & Podcast Networks",
    category: "Podcast Edits",
    year: "2026",
    youtubeId: "yOTL5Le2tN0",
    aspectRatio: "16:9",
    duration: "03:15",
    resolution: "1080p / 4K Upscaled",
    fps: "30.00 fps",
    director: "Alter (alterffx)",
    views: "Viral Conversation Clip",
    turnaroundDays: 1,
    description: "Multi-camera dialogue edit for creator podcasts. Features rapid camera punch-ins, kinetic subtitle styling, contextual B-roll placement, and balanced stereo vocal mixing.",
    keyAccomplishment: "Turns conversational audio into high-velocity, watchable video moments.",
    tags: ["Podcast Edits", "Kinetic Subtitles", "Multi-Cam", "Dialogue Punch"],
    stillImage: "/thumbnails/podcast-thumb.jpg",
    logGradeImage: "/thumbnails/podcast-thumb.jpg",
    finishedGradeImage: "/thumbnails/podcast-thumb.jpg",
    edlCutsCount: 114,
    timelineStems: {
      dialogue: true,
      foley: true,
      music: true
    }
  },
  {
    id: "proj-04",
    title: "Cinematic Emotional Storytelling",
    client: "Narrative & Creative Storytellers",
    category: "Narrative",
    year: "2026",
    youtubeId: "EOC9ryvlKXM",
    aspectRatio: "2.39:1 Anamorphic",
    duration: "02:40",
    resolution: "4K DCI",
    fps: "23.976 fps",
    director: "Alter (alterffx)",
    views: "Cinematic Aesthetic",
    turnaroundDays: 3,
    description: "Cinematic narrative cut focusing on atmospheric color grading, analog film grain, and deliberate pacing between high-energy sequences.",
    keyAccomplishment: "Delivers visual breathing room and cinematic weight for narrative storytelling.",
    tags: ["Emotional Arc", "Cinematic Cut", "Film Grain", "Atmospheric"],
    stillImage: "https://img.youtube.com/vi/EOC9ryvlKXM/maxresdefault.jpg",
    logGradeImage: "https://alterffx.carrd.co/assets/images/gallery03/df9a529a.png?v=4342f943",
    finishedGradeImage: "https://img.youtube.com/vi/EOC9ryvlKXM/maxresdefault.jpg",
    edlCutsCount: 88,
    timelineStems: {
      dialogue: true,
      foley: true,
      music: true
    }
  },
  {
    id: "proj-05",
    title: "Motion Graphics & Title Showcase",
    client: "Brand Identity & Title Design",
    category: "Motion Graphics",
    year: "2026",
    youtubeId: "QKV2bXGymnE",
    aspectRatio: "16:9 DCI",
    duration: "01:12",
    resolution: "4K 60fps",
    fps: "60.00 fps",
    director: "Alter (alterffx)",
    views: "Showcase Reel",
    turnaroundDays: 2,
    description: "Custom After Effects title sequences, kinetic typography, and fluid logo reveals. Built with expression-driven physics, custom easing curves, and sub-bass impact foley.",
    keyAccomplishment: "Precision motion graphics crafted without generic preset packs.",
    tags: ["Motion Graphics", "Typography", "After Effects 24", "Expression Rigging"],
    stillImage: "https://img.youtube.com/vi/QKV2bXGymnE/maxresdefault.jpg",
    logGradeImage: "https://alterffx.carrd.co/assets/images/gallery03/1d8b1dc7.jpg?v=4342f943",
    finishedGradeImage: "https://img.youtube.com/vi/QKV2bXGymnE/maxresdefault.jpg",
    edlCutsCount: 95,
    timelineStems: {
      dialogue: false,
      foley: true,
      music: true
    }
  },
  {
    id: "proj-06",
    title: "Catchy & Attention Grabbing Scenes",
    client: "Viral Instagram & TikTok Creators",
    category: "Short Form",
    year: "2026",
    youtubeId: "EPU8ivyiWHI",
    videoSrc: "/videos/venom-reel.mp4",
    reelUrl: "https://www.instagram.com/reel/Da3SrhVhbGP/?srtk=NTc4MTIwNjQ2YQ==",
    aspectRatio: "9:16 Vertical & 16:9",
    duration: "00:30",
    resolution: "1080 × 1920 & 4K",
    fps: "60.00 fps",
    director: "Alter (alterffx)",
    views: "250K+ Across Channels",
    turnaroundDays: 1,
    description: "Vertical short-form editing built for Instagram and TikTok. Fast hook transitions, dynamic subtitle animations, and tight audio impact cuts.",
    keyAccomplishment: "Optimized for initial 1.5-second retention and viewer completion rates.",
    tags: ["Vertical 9:16", "Viral Hooks", "Dynamic Wipes", "Audio Sync"],
    stillImage: "/thumbnails/shortform-thumb.jpg",
    logGradeImage: "/thumbnails/shortform-thumb.jpg",
    finishedGradeImage: "/thumbnails/shortform-thumb.jpg",
    edlCutsCount: 65,
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
    quote: "Final master render approved and transferred to drive. Clean After Effects comp, smooth 3D tracking, and audio mix hit right on mark.",
    author: "Client Feedback #1",
    role: "Verified Direct Client",
    company: "Commercial Showcase",
    project: "Monster Commercial Animation",
    year: "2026",
    screenshotUrl: "https://alterffx.carrd.co/assets/images/gallery02/81cdf72d.jpg?v=4342f943",
    platform: "DISCORD // DM"
  },
  {
    id: "test-02",
    quote: "Received the export file on Telegram. Clean velocity curves and audio stems, pacing on the cuts was dialed in without needing re-edits.",
    author: "Client Feedback #2",
    role: "Verified Creator",
    company: "Creator Channel Series",
    project: "Long Form Content Mastercut",
    year: "2026",
    screenshotUrl: "https://alterffx.carrd.co/assets/images/gallery02/e05f9bc8.jpg?v=4342f943",
    platform: "TELEGRAM // DM"
  },
  {
    id: "test-03",
    quote: "Typography and kinetic hooks synced right with voiceover pacing. Clean delivery on the project files.",
    author: "Client Feedback #3",
    role: "Agency Director",
    company: "Social Growth Media",
    project: "Attention-Grabbing Shorts",
    year: "2026",
    screenshotUrl: "https://alterffx.carrd.co/assets/images/gallery02/90506993.jpg?v=4342f943",
    platform: "DISCORD // DM"
  },
  {
    id: "test-04",
    quote: "Stems and sound effects matched the motion curves accurately. Smooth turnaround on the cutdown.",
    author: "Client Feedback #4",
    role: "Lead Creator",
    company: "Podcast & Content Channel",
    project: "Podcast Editorial & Visual Flow",
    year: "2026",
    screenshotUrl: "https://alterffx.carrd.co/assets/images/gallery02/6f89d8ab.jpg?v=4342f943",
    platform: "TELEGRAM // DM"
  }
]

export const EDITORIAL_PILLARS = [
  {
    number: "01",
    title: "Concept & Narrative Pacing",
    tagline: "Every cut directs emotion, retention, and flow.",
    description: "Every cut is placed with intention. By eliminating unnecessary filler and introducing psychological re-hooks, audiences stay locked from the first second to the final frame.",
    metricLabel: "Average Retention Boost",
    metricValue: "+42.5%"
  },
  {
    number: "02",
    title: "After Effects 24 Motion & 3D",
    tagline: "Commercial-grade motion graphics and 3D camera compositing.",
    description: "Dynamic product animations, spatial camera moves, velocity curves, and procedural particle systems designed natively in After Effects 24 with high-frequency rendering.",
    metricLabel: "Engine Standards",
    metricValue: "60.00 FPS UHD"
  },
  {
    number: "03",
    title: "Kinetic Typography & Expression Rigging",
    tagline: "Words that move with rhythm, punch, and visual hierarchy.",
    description: "Custom kinetic typography built with mathematical expression design, elastic overshoot easing, and editorial typographic contrast that enhances every verbal cue.",
    metricLabel: "Typographic Polish",
    metricValue: "100% Bespoke"
  },
  {
    number: "04",
    title: "Tactile Sound Design & Impact Stems",
    tagline: "50% of visual impact comes from surgical audio pacing.",
    description: "Sub-bass hits, custom swooshes, risers, mechanical textures, and micro-foley timed to every camera move and cut for maximum sensory immersion.",
    metricLabel: "Audio Integration",
    metricValue: "Multi-Stem Foley"
  }
]

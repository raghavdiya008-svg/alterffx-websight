import { Project, Testimonial, ClientLogo } from "../types/editor"

export const CLIENT_ROSTER: ClientLogo[] = [
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
    description: "High-octane product commercial animation featuring 3D can compositing, fluid dynamic particle simulations, explosive speed ramping, and tactile sound design. Engineered to instantly capture viewer attention in the first 2 seconds.",
    keyAccomplishment: "Featured flagship commercial showreel demonstrating high-end After Effects 24 3D motion design.",
    tags: ["Motion Graphics", "Product Commercial", "Speed Ramping", "3D Camera Tracking"],
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
    client: "YouTube Creators & Documentaries",
    category: "YouTube Long Form",
    year: "2026",
    youtubeId: "YMerm49il-0",
    aspectRatio: "16:9 DCI",
    duration: "12:35",
    resolution: "4K UHD",
    fps: "24.00 fps",
    director: "Alter (alterffx)",
    colorist: "Warm Documentary Emulation",
    soundDesigner: "Bespoke Atmosphere & Soundscaping",
    views: "High Retention Master",
    turnaroundDays: 4,
    description: "Deep-dive YouTube long-form documentary editing built with psychological retention pacing. Integrates archival footage, custom kinetic infographics, paper texture animations, and clean pacing transitions.",
    keyAccomplishment: "Engineered to keep viewer drop-off below 15% through strategic visual pattern interrupts.",
    tags: ["YouTube Long Form", "Documentary Pacing", "Pattern Interrupts", "Motion Graphics"],
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
    description: "Dynamic multi-cam podcast editing with automated speaker tracking, animated kinetic subtitles, context-sensitive B-roll cutaways, and pristine speech compression.",
    keyAccomplishment: "Delivers maximum retention on conversational content with rhythmic audio ducking.",
    tags: ["Podcast Edits", "Kinetic Subtitles", "Multi-Cam", "Dialogue Punch"],
    stillImage: "https://img.youtube.com/vi/yOTL5Le2tN0/maxresdefault.jpg",
    logGradeImage: "https://alterffx.carrd.co/assets/images/gallery03/45bd120f.jpg?v=4342f943",
    finishedGradeImage: "https://img.youtube.com/vi/yOTL5Le2tN0/maxresdefault.jpg",
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
    description: "Mood-driven storytelling blending atmospheric cinematic pacing, analog film grain, deep emotional musical crescendos, and deliberate visual pauses.",
    keyAccomplishment: "Cultivates genuine emotional attachment through intentional pacing and visual depth.",
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
    description: "Bespoke After Effects title sequences, kinetic typography, and fluid logo transitions. Built from scratch with expression-driven physics and custom sound hits.",
    keyAccomplishment: "Demonstrates mastery of kinetic motion, easing curves, and spatial choreography.",
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
    reelUrl: "https://www.instagram.com/reel/Da3SrhVhbGP/",
    aspectRatio: "9:16 Vertical & 16:9",
    duration: "00:30",
    resolution: "1080 × 1920 & 4K",
    fps: "60.00 fps",
    director: "Alter (alterffx)",
    views: "250K+ Across Channels",
    turnaroundDays: 1,
    description: "Sub-3-second retention hooks designed for viral performance. Fast-paced visual transitions, sound-designed impacts, kinetic typography, and audio punch-ins.",
    keyAccomplishment: "Consistently achieves 90%+ 3-second hook retention on high-velocity short form platforms.",
    tags: ["Viral Hooks", "Short Form", "Sound Impacts", "Pacing"],
    stillImage: "https://alterffx.carrd.co/assets/images/gallery03/339f8f29.jpg?v=4342f943",
    logGradeImage: "https://alterffx.carrd.co/assets/images/gallery03/339f8f29.jpg?v=4342f943",
    finishedGradeImage: "https://alterffx.carrd.co/assets/images/gallery03/339f8f29.jpg?v=4342f943",
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
    quote: "Alter's speed and sense of motion design is unbelievable. The After Effects transitions and sound design transformed our product reveal completely.",
    author: "Client Feedback #1",
    role: "Verified Client",
    company: "Commercial Showcase",
    project: "Monster Commercial Animation",
    year: "2026",
    screenshotUrl: "https://alterffx.carrd.co/assets/images/gallery02/81cdf72d.jpg?v=4342f943"
  },
  {
    id: "test-02",
    quote: "Best editor I've worked with on Discord. Delivered the long-form video in under 48 hours and the retention on YouTube shot up instantly.",
    author: "Client Feedback #2",
    role: "Creator & Founder",
    company: "YouTube Documentary Series",
    project: "Long Form Content Mastercut",
    year: "2026",
    screenshotUrl: "https://alterffx.carrd.co/assets/images/gallery02/e05f9bc8.jpg?v=4342f943"
  },
  {
    id: "test-03",
    quote: "The typography and kinetic hooks are on another level. Never had to ask for more than one revision. Absolutely elite work.",
    author: "Client Feedback #3",
    role: "Agency Director",
    company: "Social Growth Media",
    project: "Attention-Grabbing Shorts",
    year: "2026",
    screenshotUrl: "https://alterffx.carrd.co/assets/images/gallery02/90506993.jpg?v=4342f943"
  },
  {
    id: "test-04",
    quote: "Insane attention to detail. The audio stems and sound effects match the motion curves perfectly. Will definitely hire again.",
    author: "Client Feedback #4",
    role: "Lead Creator",
    company: "Podcast & Narrative Channel",
    project: "Podcast Editorial & Visual Flow",
    year: "2026",
    screenshotUrl: "https://alterffx.carrd.co/assets/images/gallery02/6f89d8ab.jpg?v=4342f943"
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

export interface Project {
  id: string
  title: string
  client: string
  category: "Commercial" | "Narrative" | "Music Video" | "Short Form" | "Motion Graphics" | "YouTube Long Form" | "Podcast Edits" | "Typography"
  year: string
  aspectRatio: string
  duration: string
  resolution: string
  fps: string
  director: string
  youtubeId?: string
  reelUrl?: string
  externalUrl?: string
  colorist?: string
  soundDesigner?: string
  views?: string
  turnaroundDays: number
  description: string
  keyAccomplishment: string
  tags: string[]
  stillImage: string
  logGradeImage: string
  finishedGradeImage: string
  edlCutsCount: number
  timelineStems: {
    dialogue: boolean
    foley: boolean
    music: boolean
  }
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company: string
  project: string
  year: string
  avatarUrl?: string
  screenshotUrl?: string
}

export interface ClientLogo {
  name: string
  division: string
  projectCount: number
}

export interface CalculatorState {
  projectType: "commercial" | "narrative" | "music_video" | "creator"
  turnaround: "standard" | "priority" | "rush"
  needsColorGrade: boolean
  needsSoundDesign: boolean
  needsSocialCutdowns: boolean
  rawFootageHours: number
}

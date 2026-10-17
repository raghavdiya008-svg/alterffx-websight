import React, { useState } from "react"
import { Navbar, TimecodeTicker } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { ClientRoster } from "./components/ClientRoster"
import { WorksGallery } from "./components/WorksGallery"
import { ColorGradeLoupe } from "./components/ColorGradeLoupe"
import { EditingPhilosophy } from "./components/EditingPhilosophy"
import { Testimonials } from "./components/Testimonials"
import { RateCalculator } from "./components/RateCalculator"
import { ProjectModal } from "./components/ProjectModal"
import { CinematicTheater } from "./components/CinematicTheater"
import { AmbientLiquidBackground } from "./components/AmbientLiquidBackground"
import { Footer } from "./components/Footer"
import { StudioAttribution } from "./components/StudioAttribution"
import { Project } from "./types/editor"
import { PROJECTS } from "./data/editorData"

export function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isTheaterOpen, setIsTheaterOpen] = useState(false)
  const [theaterProject, setTheaterProject] = useState<Project | null>(null)
  const [prefilledProjectForBooking, setPrefilledProjectForBooking] = useState<string>("")
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  const handleNavClick = (sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleOpenBooking = () => {
    handleNavClick("rates")
  }

  const handleOpenTheater = (proj?: Project) => {
    setTheaterProject(proj || PROJECTS[0])
    setIsTheaterOpen(true)
  }

  const handleBookFromProject = (projectTitle: string) => {
    setSelectedProject(null)
    setIsTheaterOpen(false)
    setPrefilledProjectForBooking(projectTitle)
    handleNavClick("rates")
    showToast(`Docket initiated for ${projectTitle}.`)
  }

  return (
    <div className="min-h-screen bg-[#EDCFB5] text-[#241812] flex flex-col font-sans selection:bg-[#9A7562]/20 selection:text-[#241812] antialiased overflow-x-hidden relative liquid-mesh pb-12 sm:pb-10">
      
      {/* Living Ambient Liquid Background Mesh */}
      <AmbientLiquidBackground />

      {/* Top Laboratory Registration Strip */}
      <div className="relative z-10 w-full bg-white/40 backdrop-blur-md border-b border-white/50 px-4 sm:px-6 py-1.5 text-[10px] font-mono text-[#6D5548] flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-[#241812]">ALTER_STUDIO // AE24</span>
          <span>•</span>
          <span className="hidden sm:inline">60FPS 4K UHD</span>
        </div>
        <div className="flex items-center gap-4">
          <TimecodeTicker />
          <div className="flex items-center gap-1.5 hidden md:flex">
            <span className="w-2 h-2 rounded-full bg-[#9A7562]"></span>
            <span className="w-2 h-2 rounded-full bg-[#B79F93]"></span>
            <span className="w-2 h-2 rounded-full bg-[#241812]"></span>
          </div>
        </div>
      </div>

      {/* Sticky Lab Navbar */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onNavClick={handleNavClick}
        onOpenTheater={() => handleOpenTheater(PROJECTS[0])}
      />

      {/* Main Portfolio Sections */}
      <main className="flex-1 space-y-4">
        
        {/* Hero Section */}
        <Hero
          onWatchReel={() => handleOpenTheater(PROJECTS[0])}
          onExploreWorks={() => handleNavClick("works")}
          onOpenBooking={handleOpenBooking}
        />

        {/* Client Roster & Hardware Guarantee */}
        <ClientRoster />

        {/* Works Gallery with Dark-Room Focus & Direct Theatrical Screening */}
        <WorksGallery
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenTheater={(proj) => handleOpenTheater(proj)}
        />

        {/* Before / After Color Grade Loupe */}
        <ColorGradeLoupe />

        {/* Editing Philosophy Bento Grid */}
        <EditingPhilosophy />

        {/* Verified Director & Agency Testimonials */}
        <Testimonials />

        {/* Rate Calculator & Booking Intake Engine */}
        <RateCalculator
          prefilledProject={prefilledProjectForBooking}
          onBookingSuccess={() => showToast("Booking filed. Alter will review your footage and brief within 2 hours.")}
        />

      </main>

      {/* Video Player & NLE Breakdown Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onBookProject={handleBookFromProject}
        onOpenTheater={(proj) => {
          setSelectedProject(null)
          handleOpenTheater(proj)
        }}
      />

      {/* Theatrical Lights-Off Screening Room */}
      <CinematicTheater
        isOpen={isTheaterOpen}
        onClose={() => setIsTheaterOpen(false)}
        onBookProject={handleBookFromProject}
        initialProject={theaterProject}
      />

      {/* Studio Footer */}
      <Footer
        onNavClick={handleNavClick}
        onOpenBooking={handleOpenBooking}
      />

      {/* Permanent Hardcoded Studio Attribution Watermark & Bottom Bar */}
      <StudioAttribution />

      {/* Floating Toast Feedback Styled as Liquid Glass Tag */}
      {toastMessage && (
        <div className="fixed bottom-20 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl liquid-glass text-[#241812] text-xs font-mono shadow-2xl animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#9A7562] animate-ping"></span>
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

    </div>
  )
}

export default App

import React, { useState } from "react"
import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { ClientRoster } from "./components/ClientRoster"
import { WorksGallery } from "./components/WorksGallery"
import { ColorGradeLoupe } from "./components/ColorGradeLoupe"
import { EditingPhilosophy } from "./components/EditingPhilosophy"
import { Testimonials } from "./components/Testimonials"
import { RateCalculator } from "./components/RateCalculator"
import { ProjectModal } from "./components/ProjectModal"
import { Footer } from "./components/Footer"
import { Project } from "./types/editor"
import { PROJECTS } from "./data/editorData"

export function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
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

  const handleBookFromProject = (projectTitle: string) => {
    setSelectedProject(null)
    setPrefilledProjectForBooking(projectTitle)
    handleNavClick("rates")
    showToast(`Docket initiated for ${projectTitle}.`)
  }

  return (
    <div className="min-h-screen bg-[#D6DDBF] text-[#1C2618] flex flex-col font-sans selection:bg-[#E8512A]/25 selection:text-[#1C2618] antialiased overflow-x-hidden relative lab-grid">
      
      {/* Top Laboratory Registration Strip */}
      <div className="w-full bg-[#CBD4B1] border-b border-[#1C2618]/15 px-4 sm:px-6 py-1 text-[10px] font-mono text-[#5E6B4E] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-[#1C2618]">JV_LAB_FORM // 2026-REV-D</span>
          <span>•</span>
          <span>COLOR REEL SPEC: D65 / KODAK 2383</span>
        </div>
        <div className="flex items-center gap-4 hidden md:flex">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-xs bg-[#2A7B88]"></span>
            <span className="w-2 h-2 rounded-xs bg-[#B59226]"></span>
            <span className="w-2 h-2 rounded-xs bg-[#9E3D6A]"></span>
            <span className="w-2 h-2 rounded-xs bg-[#1C2618]"></span>
          </div>
          <span>CALIBRATED TO SMPTE RP-207</span>
        </div>
      </div>

      {/* Sticky Lab Navbar */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onNavClick={handleNavClick}
      />

      {/* Main Portfolio Sections */}
      <main className="flex-1 space-y-4">
        
        {/* Hero Section */}
        <Hero
          onWatchReel={() => setSelectedProject(PROJECTS[0])}
          onExploreWorks={() => handleNavClick("works")}
          onOpenBooking={handleOpenBooking}
        />

        {/* Client Roster & Hardware Guarantee */}
        <ClientRoster />

        {/* Works Gallery */}
        <WorksGallery
          onSelectProject={(proj) => setSelectedProject(proj)}
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
          onBookingSuccess={() => showToast("Booking docket filed. Julian will review your dailies log within 3 hours.")}
        />

      </main>

      {/* Video Player & NLE Breakdown Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onBookProject={handleBookFromProject}
      />

      {/* Studio Footer */}
      <Footer
        onNavClick={handleNavClick}
        onOpenBooking={handleOpenBooking}
      />

      {/* Floating Toast Feedback Styled as Lab Log Tag */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg bg-[#E5EBD5] border border-[#1C2618]/25 text-[#1C2618] text-xs font-mono shadow-xl animate-fade-in backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#E8512A] animate-ping"></span>
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

    </div>
  )
}

export default App

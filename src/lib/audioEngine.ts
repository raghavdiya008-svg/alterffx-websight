// Soft, pleasant ambient background music & micro-sound synthesis engine
class AudioEngine {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private bgmAudio: HTMLAudioElement | null = null
  private isMuted: boolean = true
  private isMusicPlaying: boolean = false
  private fadeInterval: ReturnType<typeof setInterval> | null = null
  private oscillators: OscillatorNode[] = []

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
        this.masterGain = this.ctx.createGain()
        this.masterGain.gain.setValueAtTime(1, this.ctx.currentTime)
        this.masterGain.connect(this.ctx.destination)
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume()
    }
  }

  public getMuted(): boolean {
    return this.isMuted
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted
    this.initContext()

    if (!this.isMuted) {
      this.startAmbientMusic()
      this.playTick(880, 0.04)
    } else {
      this.stopAmbientMusic()
    }
    return this.isMuted
  }

  // Soft, Pleasant, Warm Piano Lofi Background Music
  public startAmbientMusic() {
    if (this.isMusicPlaying) return
    this.isMusicPlaying = true

    if (typeof window !== "undefined") {
      try {
        if (!this.bgmAudio) {
          this.bgmAudio = new Audio("/audio/ambient-bgm.mp3")
          this.bgmAudio.loop = true
          this.bgmAudio.preload = "auto"
        }

        if (this.fadeInterval) {
          clearInterval(this.fadeInterval)
          this.fadeInterval = null
        }

        // Smooth gradual volume rise to a gentle, pleasant background level (0.25)
        this.bgmAudio.volume = 0.01
        const playPromise = this.bgmAudio.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              let currentVol = 0.01
              const targetVol = 0.25
              this.fadeInterval = setInterval(() => {
                if (!this.isMusicPlaying || !this.bgmAudio) {
                  if (this.fadeInterval) clearInterval(this.fadeInterval)
                  return
                }
                currentVol = Math.min(targetVol, currentVol + 0.02)
                this.bgmAudio.volume = currentVol
                if (currentVol >= targetVol) {
                  if (this.fadeInterval) clearInterval(this.fadeInterval)
                }
              }, 60)
            })
            .catch(() => {
              // Fallback to gentle harmonic sine chords if browser audio element policy restricts it
              this.fallbackSoftGenerativeBgm()
            })
        }
      } catch (_) {
        this.fallbackSoftGenerativeBgm()
      }
    }
  }

  public stopAmbientMusic() {
    this.isMusicPlaying = false

    if (this.fadeInterval) {
      clearInterval(this.fadeInterval)
      this.fadeInterval = null
    }

    if (this.bgmAudio) {
      let currentVol = this.bgmAudio.volume
      this.fadeInterval = setInterval(() => {
        currentVol = Math.max(0, currentVol - 0.03)
        if (this.bgmAudio) this.bgmAudio.volume = currentVol
        if (currentVol <= 0) {
          if (this.fadeInterval) clearInterval(this.fadeInterval)
          if (this.bgmAudio) {
            this.bgmAudio.pause()
            this.bgmAudio.currentTime = 0
          }
        }
      }, 40)
    }

    this.stopGenerativeFallback()
  }

  // Pure gentle, peaceful sine-wave chord fallback (No harsh sawtooth, no heavy bass thumping)
  private fallbackSoftGenerativeBgm() {
    if (!this.ctx || !this.masterGain) return
    try {
      const now = this.ctx.currentTime
      const filter = this.ctx.createBiquadFilter()
      filter.type = "lowpass"
      filter.frequency.setValueAtTime(320, now)

      const gainNode = this.ctx.createGain()
      gainNode.gain.setValueAtTime(0.0001, now)
      gainNode.gain.exponentialRampToValueAtTime(0.015, now + 2.0)

      filter.connect(gainNode)
      gainNode.connect(this.masterGain)

      // Soft Major 9th peaceful chord: C3, G3, B3, E4
      const notes = [130.81, 196.00, 246.94, 329.63]
      this.oscillators = notes.map((freq) => {
        const osc = this.ctx!.createOscillator()
        osc.type = "sine"
        osc.frequency.setValueAtTime(freq, now)
        osc.connect(filter)
        osc.start(now)
        return osc
      })
    } catch (_) {}
  }

  private stopGenerativeFallback() {
    this.oscillators.forEach(osc => {
      try {
        osc.stop()
        osc.disconnect()
      } catch (_) {}
    })
    this.oscillators = []
  }

  public playTick(frequency = 1200, duration = 0.03) {
    if (this.isMuted) return
    try {
      this.initContext()
      if (!this.ctx || !this.masterGain) return
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = "sine"
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.4, this.ctx.currentTime + duration)

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration)

      osc.connect(gain)
      gain.connect(this.masterGain)

      osc.start()
      osc.stop(this.ctx.currentTime + duration)
    } catch (_) {}
  }

  public playNeuralBurst() {
    if (this.isMuted) return
    try {
      this.initContext()
      if (!this.ctx || !this.masterGain) return
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = "triangle"
      osc.frequency.setValueAtTime(220, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.18)

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.22)

      osc.connect(gain)
      gain.connect(this.masterGain)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.22)
    } catch (_) {}
  }
}

export const soundFx = new AudioEngine()

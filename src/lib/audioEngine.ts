// Ultra-luxury subtle sound synthesis via pure Web Audio API
class AudioEngine {
  private ctx: AudioContext | null = null
  private ambientOsc: OscillatorNode | null = null
  private ambientGain: GainNode | null = null
  private isMuted: boolean = true

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new AudioCtx()
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
    if (!this.isMuted) {
      this.initContext()
      this.playTick(600, 0.05)
    } else {
      this.stopAmbient()
    }
    return this.isMuted
  }

  public playTick(frequency = 1200, duration = 0.03) {
    if (this.isMuted) return
    try {
      this.initContext()
      if (!this.ctx) return
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = "sine"
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.4, this.ctx.currentTime + duration)

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + duration)
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public playNeuralBurst() {
    if (this.isMuted) return
    try {
      this.initContext()
      if (!this.ctx) return
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = "triangle"
      osc.frequency.setValueAtTime(220, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.18)

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.22)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.22)
    } catch {
      // ignore
    }
  }

  public stopAmbient() {
    if (this.ambientOsc && this.ambientGain && this.ctx) {
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5)
      setTimeout(() => {
        try {
          this.ambientOsc?.stop()
          this.ambientOsc?.disconnect()
          this.ambientOsc = null
        } catch {
          // ignore
        }
      }, 500)
    }
  }
}

export const soundFx = new AudioEngine()

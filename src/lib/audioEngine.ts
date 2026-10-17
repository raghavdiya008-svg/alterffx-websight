// Ultra-luxury subtle sound synthesis & cinematic ambient music engine via Web Audio API
class AudioEngine {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private ambientGain: GainNode | null = null
  private ambientFilter: BiquadFilterNode | null = null
  private oscillators: OscillatorNode[] = []
  private lfo: OscillatorNode | null = null
  private isMuted: boolean = true
  private isMusicPlaying: boolean = false
  private chordInterval: ReturnType<typeof setInterval> | null = null

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new AudioCtx()
      
      this.masterGain = this.ctx.createGain()
      this.masterGain.gain.setValueAtTime(1, this.ctx.currentTime)
      this.masterGain.connect(this.ctx.destination)
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

  // Cinematic Ambient Background Music Generator (Warm Analog Cinema Drone)
  public startAmbientMusic() {
    if (this.isMusicPlaying || !this.ctx || !this.masterGain) return
    this.isMusicPlaying = true

    try {
      const now = this.ctx.currentTime

      // Ambient Master Gain with smooth fade in
      this.ambientGain = this.ctx.createGain()
      this.ambientGain.gain.setValueAtTime(0.0001, now)
      this.ambientGain.gain.exponentialRampToValueAtTime(0.035, now + 2.0)

      // Warm analog lowpass filter (removes harsh highs, keeps it warm and deep)
      this.ambientFilter = this.ctx.createBiquadFilter()
      this.ambientFilter.type = "lowpass"
      this.ambientFilter.frequency.setValueAtTime(420, now)
      this.ambientFilter.Q.setValueAtTime(1.8, now)

      // Slow LFO to breathe subtle movement into the filter cutoff
      this.lfo = this.ctx.createOscillator()
      const lfoGain = this.ctx.createGain()
      this.lfo.frequency.setValueAtTime(0.12, now) // 0.12 Hz slow wave
      lfoGain.gain.setValueAtTime(80, now) // Sweeps filter +/- 80Hz
      this.lfo.connect(lfoGain)
      lfoGain.connect(this.ambientFilter.frequency)
      this.lfo.start()

      // Connect nodes: Filter -> AmbientGain -> MasterGain
      this.ambientFilter.connect(this.ambientGain)
      this.ambientGain.connect(this.masterGain)

      // Lush Chord notes (Warm Pentatonic Cinema Chords: F2, C3, Ab3, Eb4)
      const chordFrequencies = [87.31, 130.81, 207.65, 311.13]
      this.oscillators = []

      chordFrequencies.forEach((freq, idx) => {
        if (!this.ctx || !this.ambientFilter) return
        const osc = this.ctx.createOscillator()
        const voiceGain = this.ctx.createGain()

        // Slight detune for analog warmth
        const detuneCents = (idx % 2 === 0 ? 1 : -1) * (4 + idx * 2)
        osc.type = idx === 0 ? "sawtooth" : "triangle"
        osc.frequency.setValueAtTime(freq, now)
        osc.detune.setValueAtTime(detuneCents, now)

        voiceGain.gain.setValueAtTime(0.25, now)
        osc.connect(voiceGain)
        voiceGain.connect(this.ambientFilter)

        osc.start()
        this.oscillators.push(osc)
      })

      // Gentle sub-bass pulse every 4 seconds
      this.chordInterval = setInterval(() => {
        if (!this.isMusicPlaying || !this.ctx || !this.masterGain) return
        try {
          const t = this.ctx.currentTime
          const subOsc = this.ctx.createOscillator()
          const subGain = this.ctx.createGain()

          subOsc.type = "sine"
          subOsc.frequency.setValueAtTime(55, t) // A1 warm sub
          subOsc.frequency.exponentialRampToValueAtTime(35, t + 0.6)

          subGain.gain.setValueAtTime(0.02, t)
          subGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.8)

          subOsc.connect(subGain)
          subGain.connect(this.masterGain)

          subOsc.start(t)
          subOsc.stop(t + 0.8)
        } catch (_) {}
      }, 4000)

    } catch (e) {
      console.warn("Ambient music init error:", e)
    }
  }

  public stopAmbientMusic() {
    this.isMusicPlaying = false
    if (this.chordInterval) {
      clearInterval(this.chordInterval)
      this.chordInterval = null
    }

    if (this.ambientGain && this.ctx) {
      const now = this.ctx.currentTime
      this.ambientGain.gain.cancelScheduledValues(now)
      this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, now)
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.0)

      setTimeout(() => {
        this.oscillators.forEach(osc => {
          try {
            osc.stop()
            osc.disconnect()
          } catch (_) {}
        })
        this.oscillators = []

        try {
          this.lfo?.stop()
          this.lfo?.disconnect()
          this.lfo = null
        } catch (_) {}
      }, 1000)
    }
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

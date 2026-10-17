export interface ModelInfo {
  id: string
  name: string
  code: string
  version: string
  parameterScale: string
  modality: string
  latencyMs: number
  accuracyScore: number
  activeContext: string
  description: string
  specialization: string
  accentColor: string
}

export interface ComputeNode {
  id: string
  location: string
  code: string
  tier: "Sovereign" | "Enterprise" | "Atelier Air-Gapped"
  gpuType: string
  gpuCount: number
  utilization: number
  temperatureC: number
  powerEfficiency: string
  pingMs: number
  activeClients: string[]
  status: "optimal" | "elevated" | "allocating"
}

export interface Artifact {
  id: string
  title: string
  category: "Horology" | "Haute Couture" | "Architecture" | "High Jewelry" | "Industrial" | "Sensory Cinema"
  maison: string
  year: string
  aspectRatio: string
  imageUrl: string
  videoUrl?: string
  prompt: string
  parameters: {
    latentSeed: string
    surfaceRoughness: number
    anisotropy: number
    viscosityTensor: number
    photonicDiffusion: string
    renderPasses: number
    geometryTokens: number
  }
  dimensions: string
  physicalMaterial: string
  synthesisTimeSec: number
  curatorNotes: string
}

export interface LatentState {
  prompt: string
  category: string
  modelId: string
  aestheticWeight: number
  surfaceRoughness: number
  refractionIndex: number
  viscosityTensor: number
  tensionDynamic: number
  seed: number
  isGenerating: boolean
  progress: number
  streamedTokens: string[]
}

export interface PrivateAllocationTier {
  id: string
  name: string
  subtitle: string
  badge?: string
  monthlyPetaFlops: string
  dedicatedGpus: string
  pricing: string
  billingPeriod: string
  turnaroundTime: string
  features: string[]
  recommendedFor: string
  popular?: boolean
}

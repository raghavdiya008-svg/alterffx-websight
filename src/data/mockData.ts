import { ModelInfo, ComputeNode, Artifact, PrivateAllocationTier } from "../types"

export const MOCK_MODELS: ModelInfo[] = [
  {
    id: "valence-omni-iv",
    name: "VALENCE OMNI-IV",
    code: "VO-4.2-ULTRA",
    version: "2026.4",
    parameterScale: "1.4 Trillion Mixture-of-Experts",
    modality: "Multimodal Tactile & Volumetric",
    latencyMs: 14.2,
    accuracyScore: 99.4,
    activeContext: "2,048,000 Tokens",
    description: "The flagship multimodal foundation model designed specifically for luxury houses, architectural ateliers, and haute horlogerie engineering.",
    specialization: "Procedural geometry, material physics, ray-traced caustics, and luxury editorial curation.",
    accentColor: "#D4AF37"
  },
  {
    id: "aura-diffusion-z",
    name: "AURA DIFFUSION-Z",
    code: "AD-Z.8",
    version: "2026.2",
    parameterScale: "680 Billion Parameters",
    modality: "Subsurface Scattering & Photons",
    latencyMs: 22.8,
    accuracyScore: 98.7,
    activeContext: "512,000 Tokens",
    description: "Specialized in sub-millimeter light transport, anisotropic brushed titanium reflections, and organic silk sheen simulations.",
    specialization: "High jewelry refraction, gemstone birefringence, and micro-capillary textile weave rendering.",
    accentColor: "#2DD4BF"
  },
  {
    id: "couture-nerf-x",
    name: "COUTURE NeRF-X",
    code: "CN-X.3-VOL",
    version: "2026.3",
    parameterScale: "420 Billion Parameters",
    modality: "Neural Radiance & 3D Gaussian Splats",
    latencyMs: 31.5,
    accuracyScore: 99.1,
    activeContext: "1,024,000 Tokens",
    description: "Generates real-time interactive 6-DoF spatial artifacts directly convertible into STEP CAD, USDZ, and CNC precision milling paths.",
    specialization: "Zero-latency 3D spatial inspection, physical prototyping, and direct-to-machining tolerance verification.",
    accentColor: "#C5A880"
  },
  {
    id: "chronos-kinetic",
    name: "CHRONOS KINETIC",
    code: "CK-1.9-TEMPORAL",
    version: "2026.1",
    parameterScale: "890 Billion Parameters",
    modality: "Temporal Dynamics & Fluid Mechanics",
    latencyMs: 18.4,
    accuracyScore: 98.2,
    activeContext: "128,000 Tokens",
    description: "Temporal coherence engine orchestrating gravitational escapements, aerodynamic fluid turbulence, and fabric draping physics.",
    specialization: "Mechanical escapement movement, wind-tunnel vortex generation, and cinematic slow-motion transitions.",
    accentColor: "#FAF9F6"
  }
]

export const MOCK_COMPUTE_NODES: ComputeNode[] = [
  {
    id: "node-zrh",
    location: "Zurich Canton, Switzerland",
    code: "ZRH-VAULT-01",
    tier: "Atelier Air-Gapped",
    gpuType: "NVIDIA B200 NVL72 Liquid-Cooled",
    gpuCount: 4096,
    utilization: 87.4,
    temperatureC: 18.2,
    powerEfficiency: "100% Alpine Hydroelectric (PUE 1.08)",
    pingMs: 4.1,
    activeClients: ["Maison Cartier Genève", "Patek Philippe Research", "Audemars Piguet Concept"],
    status: "optimal"
  },
  {
    id: "node-hnd",
    location: "Tokyo Ginza, Japan",
    code: "HND-QUANTUM-04",
    tier: "Sovereign",
    gpuType: "NVIDIA H100 SXM5 80GB",
    gpuCount: 2048,
    utilization: 73.8,
    temperatureC: 21.4,
    powerEfficiency: "Zero-Carbon Geothermal Grid",
    pingMs: 8.6,
    activeClients: ["Grand Seiko Micro Artist Studio", "Comme des Garçons Digital", "Kengo Kuma Associates"],
    status: "optimal"
  },
  {
    id: "node-cdg",
    location: "Paris Faubourg Saint-Honoré, France",
    code: "CDG-ATELIER-02",
    tier: "Atelier Air-Gapped",
    gpuType: "Custom Valence Tensor Supercluster",
    gpuCount: 3072,
    utilization: 94.1,
    temperatureC: 22.8,
    powerEfficiency: "Nuclear Co-gen Zero Emission",
    pingMs: 6.2,
    activeClients: ["Hermès Innovation Lab", "LVMH Métiers d'Art", "Yves Saint Laurent Archives"],
    status: "elevated"
  },
  {
    id: "node-jfk",
    location: "New York Madison Avenue, USA",
    code: "JFK-PRIME-08",
    tier: "Enterprise",
    gpuType: "NVIDIA H200 Tensor Core",
    gpuCount: 1536,
    utilization: 64.5,
    temperatureC: 19.5,
    powerEfficiency: "Niagara Clean Hydro Allocation",
    pingMs: 11.3,
    activeClients: ["Tiffany & Co. High Jewelry", "The Row Atelier", "Diller Scofidio + Renfro"],
    status: "optimal"
  }
]

export const MOCK_ARTIFACTS: Artifact[] = [
  {
    id: "art-01",
    title: "The Alchemist's Tourbillon No. 07",
    category: "Horology",
    maison: "Atelier Valence x Horlogerie Privée",
    year: "2026",
    aspectRatio: "16:9",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=85",
    prompt: "Tri-axial spherical tourbillon cage milled from unpolished black titanium alloy, sapphire crystal dial reveals blued balance spring oscillating in microgravity simulation, diamond-set hand-finished bridges, 240-hour power reserve indicator.",
    parameters: {
      latentSeed: "0x8F3C92B4A1",
      surfaceRoughness: 0.042,
      anisotropy: 0.89,
      viscosityTensor: 0.0,
      photonicDiffusion: "Biaxial Micro-Faceted Caustics",
      renderPasses: 128,
      geometryTokens: 48920
    },
    dimensions: "44.2mm Diameter x 13.8mm Height",
    physicalMaterial: "Grade 5 Black Ceramicized Titanium & Lab-Grown Blue Sapphire",
    synthesisTimeSec: 4.82,
    curatorNotes: "Synthesized using VO-4.2 with physical gravitational escapement calculations. Tolerance verified down to 0.0018mm across 280 internal pinions."
  },
  {
    id: "art-02",
    title: "Ethereal Liquid Basalt Gown",
    category: "Haute Couture",
    maison: "Valence Neural Haute Atelier",
    year: "2026",
    aspectRatio: "4:5",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85",
    prompt: "Architectural floor-length gown sculpted from seamless fluid metallic organza, algorithmic pleats that respond to body curvature, micro-perforated obsidian sheen, photon-reactive thread weave.",
    parameters: {
      latentSeed: "0x4A7E11D9C0",
      surfaceRoughness: 0.18,
      anisotropy: 0.94,
      viscosityTensor: 0.62,
      photonicDiffusion: "Subsurface Photonic Weave Scattering",
      renderPasses: 96,
      geometryTokens: 62410
    },
    dimensions: "Bespoke Biometric Parametric Mesh",
    physicalMaterial: "Recycled Carbon-Silk Composite & Liquid Polymer Coating",
    synthesisTimeSec: 3.95,
    curatorNotes: "Modeled with dynamic aerodynamic drape simulations under 1.2G downward deceleration. Zero seam line artifacts."
  },
  {
    id: "art-03",
    title: "Sanctuary of Acoustic Void",
    category: "Architecture",
    maison: "Monolith Spatial Labs",
    year: "2026",
    aspectRatio: "16:9",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    prompt: "Monolithic brutalist sanctuary embedded into Nordic fjord bedrock, seamless honed charcoal terrazzo, razor skylight slicing across acoustic fluted basalt wall, negative air volume optimization.",
    parameters: {
      latentSeed: "0x0B22F9E873",
      surfaceRoughness: 0.45,
      anisotropy: 0.32,
      viscosityTensor: 0.0,
      photonicDiffusion: "Atmospheric Ray-Marching Volumetric Sunbeam",
      renderPasses: 256,
      geometryTokens: 112000
    },
    dimensions: "840 m² Internal Uninterrupted Volume",
    physicalMaterial: "Self-Healing Basalt Concrete & Non-Reflective Obsidian Paneling",
    synthesisTimeSec: 6.41,
    curatorNotes: "Acoustic attenuation mapped to 18Hz sub-bass reverberation dampening. Structural loads validated via finite element neural solver."
  },
  {
    id: "art-04",
    title: "Crystalline Supernova Choker",
    category: "High Jewelry",
    maison: "Valence Haute Gemmologie",
    year: "2026",
    aspectRatio: "1:1",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1400&q=85",
    prompt: "Generative articulated collar featuring 78 cushion-cut Colombian emeralds mounted in invisible platinum prong geometry, surrounded by micro-pave D-flawless diamond constellations.",
    parameters: {
      latentSeed: "0x77E188C9FA",
      surfaceRoughness: 0.015,
      anisotropy: 0.98,
      viscosityTensor: 0.0,
      photonicDiffusion: "Full-Spectral Dispersion with Cauchy Birefringence",
      renderPasses: 320,
      geometryTokens: 76500
    },
    dimensions: "38.5cm Internal Ergonomic Contour",
    physicalMaterial: "950 Platinum & Untreated Muzo Emeralds (Total 142.8 cts)",
    synthesisTimeSec: 5.18,
    curatorNotes: "Spectral dispersion solver accurately models internal iron inclusion fluorescence under 5500K museum illumination."
  },
  {
    id: "art-05",
    title: "Kinetic Monocoque Aerodyne",
    category: "Industrial",
    maison: "Valence Aerodynamics x Studio Veloce",
    year: "2026",
    aspectRatio: "16:9",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85",
    prompt: "Autonomous grand tourer with active biomimetic cooling louvers, carbon-nanotube monocoque chassis, electrochromic privacy canopy fading from opaque basalt to optic crystal.",
    parameters: {
      latentSeed: "0x1290EE5B3A",
      surfaceRoughness: 0.038,
      anisotropy: 0.85,
      viscosityTensor: 0.15,
      photonicDiffusion: "Specular Clear-Coat Multi-Layer Depth",
      renderPasses: 180,
      geometryTokens: 94800
    },
    dimensions: "4,980mm L x 2,020mm W x 1,210mm H",
    physicalMaterial: "Forged Carbon Weave & Brushed Magnesium Castings",
    synthesisTimeSec: 7.12,
    curatorNotes: "Drag coefficient Cd calculated at 0.178 with active neural ground-effect vortex management."
  },
  {
    id: "art-06",
    title: "Chrono-Kinetic Metronome Sculpture",
    category: "Sensory Cinema",
    maison: "Valence Kinetic Laboratory",
    year: "2026",
    aspectRatio: "4:5",
    imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1400&q=85",
    prompt: "Pendulum sculpture oscillating in perpetual counter-balance, brushed champagne brass counter-weights, internal magnetic dampening fluid in visible glass cylinder.",
    parameters: {
      latentSeed: "0x98A447F102",
      surfaceRoughness: 0.08,
      anisotropy: 0.91,
      viscosityTensor: 0.45,
      photonicDiffusion: "Dielectric Liquid Lens Caustics",
      renderPasses: 144,
      geometryTokens: 52100
    },
    dimensions: "1,200mm Height x 450mm Base Diameter",
    physicalMaterial: "Solid Raw Champagne Brass, Borosilicate Glass, Ferro-Fluid",
    synthesisTimeSec: 4.15,
    curatorNotes: "Magnetic field dynamics modeled via Navier-Stokes coupled neural partial differential equations."
  }
]

export const MOCK_ALLOCATION_TIERS: PrivateAllocationTier[] = [
  {
    id: "atelier-foundry",
    name: "Atelier Foundry",
    subtitle: "For independent design houses and private haute studios",
    monthlyPetaFlops: "4.8 PetaFLOPS / mo",
    dedicatedGpus: "32 Dedicated B200 Compute Slices",
    pricing: "€14,500",
    billingPeriod: "per month",
    turnaroundTime: "< 180ms real-time latency",
    features: [
      "Full access to Valence Omni-IV & Aura Diffusion-Z",
      "Direct CAD export (STEP, IGES, Parasolid)",
      "Dedicated secure tenant with zero data retention",
      "Real-time NeRF 3D spatial viewport streaming",
      "99.95% Availability SLA with dedicated Slack/Signal engineer",
      "Up to 25 simultaneous generative pipelines"
    ],
    recommendedFor: "Boutique luxury brands, watchmakers, and premier creative directors.",
    popular: false
  },
  {
    id: "sovereign-cluster",
    name: "Sovereign Cluster",
    subtitle: "For global luxury conglomerates and automotive styling studios",
    badge: "Most Requested by Maisons",
    monthlyPetaFlops: "28.5 PetaFLOPS / mo",
    dedicatedGpus: "256 Dedicated Liquid-Cooled B200 SXM Nodes",
    pricing: "€42,000",
    billingPeriod: "per month",
    turnaroundTime: "< 35ms sub-millisecond priority",
    features: [
      "All Atelier features plus custom Maison fine-tuning",
      "Fine-tuned on your private 100-year historical brand archive",
      "Physically isolated Swiss or Parisian datacenter vault",
      "Cryptographic provenance ledger & IP watermarking",
      "Direct-to-CNC and direct-to-machining tolerance verification",
      "24/7 Dedicated Senior Machine Learning Research Director",
      "Custom procedural material shaders authored on demand"
    ],
    recommendedFor: "LVMH, Kering, Richemont division ateliers and luxury automotive studios.",
    popular: true
  },
  {
    id: "monolith-exclusive",
    name: "Monolith Imperial",
    subtitle: "Custom sovereign infrastructure built for ultimate exclusivity",
    monthlyPetaFlops: "120+ PetaFLOPS Uncapped",
    dedicatedGpus: "Dedicated 1,024+ GPU Superpod Cluster",
    pricing: "Custom Allocation",
    billingPeriod: "annual contract",
    turnaroundTime: "Sub-5ms Dedicated High-Speed Fiber",
    features: [
      "Complete custom-trained proprietary foundational model",
      "Full on-premise hardware installation in your private vault",
      "Air-gapped quantum-encrypted inference pipelines",
      "Co-ownership of fine-tuned weights and model checkpoints",
      "White-glove executive residency by Valence AI Research Scientists",
      "Unrestricted parallel synthesis across all luxury modalities"
    ],
    recommendedFor: "National sovereign wealth funds, ultra-luxury group flagships, and aerospace studios.",
    popular: false
  }
]

export const MOCK_LIVE_TELEMETRY = [
  { time: "15:44:02.102", cluster: "ZRH-VAULT-01", event: "Dispatched 64-pass raytraced caustics for Tourbillon No. 07", latency: "14.2ms", status: "converged" },
  { time: "15:44:01.884", cluster: "CDG-ATELIER-02", event: "Biometric parametric drape solver converged: 62,410 tokens", latency: "18.6ms", status: "optimal" },
  { time: "15:43:58.411", cluster: "HND-QUANTUM-04", event: "Micro-capillary silk refractive index calibrated: n=1.542", latency: "9.4ms", status: "optimal" },
  { time: "15:43:54.029", cluster: "JFK-PRIME-08", event: "CAD STEP export compiled for Tiffany High Jewelry division", latency: "31.2ms", status: "completed" },
  { time: "15:43:49.718", cluster: "ZRH-VAULT-01", event: "Zero-gravity balance spring oscillation validated: Δ=0.00012mm", latency: "12.8ms", status: "converged" },
  { time: "15:43:42.155", cluster: "CDG-ATELIER-02", event: "Neural radiance field volumetric splat rendered in 4K UHD", latency: "24.1ms", status: "completed" }
]

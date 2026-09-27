import { EventConfig, Judge, Project, RubricCriterion, AuditLog, ParticipantTeam, ParticipantUser } from '../types';

export const initialRubric: RubricCriterion[] = [
  {
    id: 'crit-innovation',
    name: 'Novelty & Innovation',
    description: 'Originality of the conceptual approach and divergence from standard solutions.',
    weight: 30,
    maxScore: 10,
    anchors: [
      { score: 2, label: 'Derivative wrapper with trivial tweaks' },
      { score: 6, label: 'Competent application of known frameworks' },
      { score: 10, label: 'Radical paradigm shift or novel architectural primitive' }
    ]
  },
  {
    id: 'crit-tech',
    name: 'Technical Execution & Depth',
    description: 'Architectural soundness, code craftsmanship, handling edge cases and system performance.',
    weight: 30,
    maxScore: 10,
    anchors: [
      { score: 2, label: 'Unstable prototype, major unhandled failures' },
      { score: 6, label: 'Solid implementation, functional happy path' },
      { score: 10, label: 'Production-grade resilience, optimal performance & test coverage' }
    ]
  },
  {
    id: 'crit-impact',
    name: 'Real-world Viability & Impact',
    description: 'Measurable problem-market fit, scalability potential, and quantitative utility.',
    weight: 25,
    maxScore: 10,
    anchors: [
      { score: 2, label: 'Hypothetical toy problem with negligible demand' },
      { score: 6, label: 'Clear utility for defined niche user segment' },
      { score: 10, label: 'Massive addressable problem with high deployment velocity' }
    ]
  },
  {
    id: 'crit-presentation',
    name: 'Clarity & Technical Communication',
    description: 'Quality of the submission artifacts, reproduction documentation, and demo transparency.',
    weight: 15,
    maxScore: 10,
    anchors: [
      { score: 2, label: 'Opaque documentation, broken video/demo links' },
      { score: 6, label: 'Clear walkthrough with step-by-step reproduction' },
      { score: 10, label: 'Exemplary clarity, interactive verifiable sandboxes' }
    ]
  }
];

export const initialEvents: EventConfig[] = [
  {
    id: 'evt-agamotto-2026',
    title: 'AGAMOTTO GLOBAL GRAND PRIX 2026',
    tagline: 'High-Integrity Collegiate & Research Invitational for Systems, AI & Cryptography',
    description: 'The premier worldwide competition utilizing double-blind Z-score evaluation. Compete against elite research and university engineering teams across distributed systems, privacy preserving computation, and autonomous machine learning.',
    eventCode: 'AGAMOTTO-2026',
    status: 'judging',
    prizes: '$50,000 in Non-Dilutive Grants',
    startDate: 'Sep 20, 2026',
    endDate: 'Oct 02, 2026',
    registrationDeadline: 'Sep 24, 2026',
    submissionDeadline: 'Sep 26, 2026',
    judgingDeadline: 'Oct 01, 2026',
    isPublic: true,
    registrationMode: 'open',
    minTeamSize: 2,
    maxTeamSize: 4,
    editingPolicy: 'allow-until-deadline',
    versioningEnabled: true,
    judgesPerProject: 3,
    assignmentMode: 'auto',
    normalizationMethod: 'z_score',
    identityRevealed: false,
    tieBreakOrder: ['crit-tech', 'crit-innovation', 'crit-impact'],
    judgeNotesEnabled: true,
    emailNotifications: true,
    participantsCount: 342,
    bannerGradient: 'from-blue-600 via-indigo-900 to-cyan-900',
    tracks: [
      'Infrastructure & Systems',
      'AI & Autonomous Systems',
      'Privacy & Cryptography',
      'BioTech & Health'
    ],
    rubric: initialRubric
  },
  {
    id: 'evt-quantum-hack',
    title: 'QuantumSafe & Post-Quantum Cryptography Cup',
    tagline: 'Lattice-Based Implementations, Hardware Acceleration & Zero-Knowledge Circuits',
    description: 'Hardware, firmware, and cryptography sprint testing implementations of NIST FIPS-approved post-quantum algorithms on modern embedded and server hardware.',
    eventCode: 'QUANTUM-2026',
    status: 'registration',
    prizes: '$35,000 USD + Hardware Kits',
    startDate: 'Oct 15, 2026',
    endDate: 'Nov 01, 2026',
    registrationDeadline: 'Oct 14, 2026',
    submissionDeadline: 'Oct 29, 2026',
    judgingDeadline: 'Nov 01, 2026',
    isPublic: true,
    registrationMode: 'approval-required',
    minTeamSize: 1,
    maxTeamSize: 3,
    editingPolicy: 'allow-until-deadline',
    versioningEnabled: true,
    judgesPerProject: 3,
    assignmentMode: 'auto',
    normalizationMethod: 'z_score',
    identityRevealed: false,
    tieBreakOrder: ['crit-tech', 'crit-innovation'],
    judgeNotesEnabled: true,
    emailNotifications: true,
    participantsCount: 189,
    bannerGradient: 'from-emerald-600 via-teal-950 to-cyan-950',
    tracks: [
      'Lattice Cryptography',
      'Hardware Side-Channel Defense',
      'ZK-SNARK Optimization'
    ],
    rubric: initialRubric
  },
  {
    id: 'evt-agentic-frontier',
    title: 'Autonomous Multi-Agent Consensus Arena',
    tagline: 'Decentralized Agent Coordination, Tool Verification & Swarm Resilience',
    description: 'Build fault-tolerant agent architectures that reach verified consensus under adversarial communication delay, hallucination injection, and Byzantine peer nodes.',
    eventCode: 'SWARM-2026',
    status: 'active',
    prizes: '$75,000 USD Seed Grants',
    startDate: 'Nov 10, 2026',
    endDate: 'Nov 28, 2026',
    registrationDeadline: 'Nov 09, 2026',
    submissionDeadline: 'Nov 25, 2026',
    judgingDeadline: 'Nov 28, 2026',
    isPublic: true,
    registrationMode: 'open',
    minTeamSize: 2,
    maxTeamSize: 5,
    editingPolicy: 'allow-until-deadline',
    versioningEnabled: true,
    judgesPerProject: 4,
    assignmentMode: 'auto',
    normalizationMethod: 'z_score',
    identityRevealed: false,
    tieBreakOrder: ['crit-innovation', 'crit-tech'],
    judgeNotesEnabled: true,
    emailNotifications: true,
    participantsCount: 512,
    bannerGradient: 'from-fuchsia-700 via-purple-950 to-pink-950',
    tracks: [
      'Adversarial Swarms',
      'Deterministic Tool Sandboxes',
      'Multi-Model Consensus'
    ],
    rubric: initialRubric
  },
  {
    id: 'evt-defi-scale',
    title: 'Sub-Millisecond State Machine Invitational',
    tagline: 'Extreme High-Frequency Orderbooks & eBPF Shard Optimization',
    description: 'Closed research competition evaluating ultra low latency execution rings.',
    eventCode: 'SPEED-2026',
    status: 'closed',
    prizes: '$25,000 USD',
    startDate: 'Aug 01, 2026',
    endDate: 'Aug 20, 2026',
    isPublic: false,
    registrationMode: 'approval-required',
    minTeamSize: 2,
    maxTeamSize: 4,
    editingPolicy: 'locked',
    versioningEnabled: false,
    judgesPerProject: 3,
    assignmentMode: 'manual',
    normalizationMethod: 'trimmed_mean',
    identityRevealed: true,
    participantsCount: 140,
    bannerGradient: 'from-slate-700 via-neutral-900 to-black',
    tracks: [
      'Kernel Bypass Networking',
      'Atomic Shard Settlement'
    ],
    rubric: initialRubric
  }
];

export const initialJudges: Judge[] = [
  {
    id: 'jdg-01',
    name: 'Dr. Aris Thorne',
    email: 'aris.thorne@vertex-systems.io',
    affiliation: 'Principal Architect @ Vertex Systems',
    title: 'Distributed Systems Lead',
    track: 'Infrastructure & Systems',
    assignedCount: 5,
    completedCount: 3,
    conflicts: [
      { projectId: 'PRJ-019', reason: 'Judge is a team member' }
    ],
    scoringBias: -0.35 // Slightly strict
  },
  {
    id: 'jdg-02',
    name: 'Maya Lin',
    email: 'm.lin@quantumcore.dev',
    affiliation: 'Staff Security Engineer @ CloudShield',
    title: 'Zero-Knowledge Cryptographer',
    track: 'Privacy & Cryptography',
    assignedCount: 4,
    completedCount: 3,
    conflicts: [
      { projectId: 'PRJ-008', reason: 'Conflict of interest: former lab advisor at MIT' }
    ],
    scoringBias: 0.12
  },
  {
    id: 'jdg-03',
    name: 'Devon Vance',
    email: 'devon@synthesis-ai.org',
    affiliation: 'Research Director @ Synthesis Labs',
    title: 'Autonomous Agents Fellow',
    track: 'AI & Autonomous Systems',
    assignedCount: 4,
    completedCount: 4,
    conflicts: [
      { projectId: 'PRJ-024', reason: 'Judge was co-author with Team Lead in 2025' }
    ],
    scoringBias: 0.58 // Lenient
  },
  {
    id: 'jdg-04',
    name: 'Dr. Soraya Khemir',
    email: 'soraya@khemir-foundry.com',
    affiliation: 'VP of Engineering @ Helion Bio',
    title: 'Computational Biology Engineer',
    track: 'BioTech & Health',
    assignedCount: 3,
    completedCount: 2,
    conflicts: [],
    scoringBias: -0.65 // Very strict
  },
  {
    id: 'jdg-05',
    name: 'Kaelen O\'Connor',
    email: 'kaelen@hypervector.net',
    affiliation: 'Founding Partner @ Signal Capital',
    title: 'Systems & Infrastructure Specialist',
    track: 'Infrastructure & Systems',
    assignedCount: 3,
    completedCount: 3,
    conflicts: [
      { projectId: 'PRJ-031', reason: 'Judge angel invested in team members prior startup' }
    ],
    scoringBias: 0.05
  }
];

export const initialProjects: Project[] = [
  {
    id: 'PRJ-024',
    eventId: 'evt-agamotto-2026',
    codeName: 'PROJECT #024 — CLASSIFIED',
    title: 'Aetheria: Sub-Millisecond Byzantine Consensus',
    tagline: 'Decentralized state machine replication using vectorized speculative execution.',
    teamName: 'Nova Dynamics',
    college: 'Stanford University & ETH Zürich',
    members: [
      { name: 'Kiran Patel', role: 'Consensus Architect', college: 'Stanford University', email: 'kiran@stanford.edu' },
      { name: 'Clara Weber', role: 'Kernel Systems Dev', college: 'ETH Zürich', email: 'c.weber@ethz.ch' },
      { name: 'Li Wei', role: 'Cryptographic Protocol', college: 'Stanford University', email: 'li.wei@stanford.edu' }
    ],
    track: 'Infrastructure & Systems',
    problem: 'Current BFT engines experience catastrophic throughput degradation when Byzantine leaders throttle transaction pipeline validation, choking cross-shard atomicity.',
    solution: 'Aetheria pipelines speculative block verification through SIMD instruction sets, decoupling consensus ordering from execution verification with cryptographic fallbacks.',
    techStack: ['Rust', 'eBPF', 'Tokio', 'AVX-512', 'gRPC', 'WebAssembly'],
    githubUrl: 'https://github.com/mock-org/aetheria-engine',
    demoUrl: 'https://aetheria-benchmark.live',
    presentationFileName: 'Aetheria_Whitepaper_v2.pdf',
    submittedAt: '2026-09-26 18:42:10 UTC',
    status: 'submitted',
    assignedJudges: ['jdg-01', 'jdg-02', 'jdg-05'],
    scores: [
      {
        judgeId: 'jdg-01',
        judgeName: 'Dr. Aris Thorne',
        criteriaScores: { 'crit-innovation': 9, 'crit-tech': 10, 'crit-impact': 9, 'crit-presentation': 8 },
        justifications: {
          'crit-innovation': 'Vectorized block validation is exceptionally novel; beats standard Raft/HotStuff variants.',
          'crit-tech': 'Flawless Rust crate with zero-copy memory buffers and exhaustive deterministic simulation harness.',
          'crit-impact': 'Immediate applicability for high-frequency settlement networks.',
          'crit-presentation': 'Benchmarking graphs are reproducible and clearly documented.'
        },
        totalRaw: 9.15,
        submittedAt: '2026-09-26 21:10:00 UTC',
        status: 'locked'
      },
      {
        judgeId: 'jdg-02',
        judgeName: 'Maya Lin',
        criteriaScores: { 'crit-innovation': 9, 'crit-tech': 9, 'crit-impact': 9, 'crit-presentation': 9 },
        justifications: {
          'crit-innovation': 'Elegant mathematical proofs for the adversarial threshold.',
          'crit-tech': 'Clean architecture, minimal attack surface.',
          'crit-impact': 'Addresses real cloud-scale synchronization headaches.',
          'crit-presentation': 'Comprehensive diagramming of consensus rounds.'
        },
        totalRaw: 9.00,
        submittedAt: '2026-09-26 22:30:15 UTC',
        status: 'locked'
      },
      {
        judgeId: 'jdg-05',
        judgeName: 'Kaelen O\'Connor',
        criteriaScores: { 'crit-innovation': 9, 'crit-tech': 9, 'crit-impact': 10, 'crit-presentation': 9 },
        justifications: {
          'crit-innovation': 'Superb formulation.',
          'crit-tech': 'Remarkable engineering rigor demonstrated in test harness.',
          'crit-impact': 'Clear commercial market readiness.',
          'crit-presentation': 'Demo sandbox ran flawlessly with injected 30% node churn.'
        },
        totalRaw: 9.25,
        submittedAt: '2026-09-27 00:15:20 UTC',
        status: 'locked'
      }
    ],
    rawAverage: 9.13,
    normalizedScore: 96.8,
    zScoreRaw: 1.84,
    rank: 1,
    versions: [
      { version: 1, timestamp: '2026-09-26 14:10 UTC', summary: 'Initial draft of consensus engine spec', editedBy: 'Kiran Patel' },
      { version: 2, timestamp: '2026-09-26 18:42 UTC', summary: 'Added AVX-512 benchmark graphs and whitepaper upload', editedBy: 'Clara Weber' }
    ]
  },
  {
    id: 'PRJ-008',
    eventId: 'evt-agamotto-2026',
    codeName: 'PROJECT #008 — CLASSIFIED',
    title: 'BioSieve: Real-Time Pathogen Genomic Profiler',
    tagline: 'Edge-native sequencing anomaly detector for wastewater surveillance.',
    teamName: 'Helix Vector Lab',
    college: 'MIT & Harvard Medical School',
    members: [
      { name: 'Dr. Mateo Gomez', role: 'Genomics Lead', college: 'Harvard Medical School', email: 'mateo@hms.harvard.edu' },
      { name: 'Elena Rostova', role: 'Embedded Systems', college: 'MIT', email: 'elena@mit.edu' }
    ],
    track: 'BioTech & Health',
    problem: 'Early pathogen outbreak discovery relies on centralized lab sequencing with 7-day turnaround lags, forfeiting containment windows.',
    solution: 'BioSieve executes quantized probabilistic hidden Markov models directly on Oxford Nanopore edge hardware for instant taxonomic classification.',
    techStack: ['Python', 'C++', 'PyTorch Edge', 'ONNX', 'CUDA', 'FastAPI'],
    githubUrl: 'https://github.com/mock-org/biosieve-edge',
    demoUrl: 'https://biosieve-telemetry.med.org',
    presentationFileName: 'BioSieve_FieldStudy_MIT.pdf',
    submittedAt: '2026-09-26 19:15:33 UTC',
    status: 'submitted',
    assignedJudges: ['jdg-01', 'jdg-03', 'jdg-04'],
    scores: [
      {
        judgeId: 'jdg-01',
        judgeName: 'Dr. Aris Thorne',
        criteriaScores: { 'crit-innovation': 9, 'crit-tech': 9, 'crit-impact': 9, 'crit-presentation': 8 },
        justifications: {
          'crit-innovation': 'Edge quantization of genomic sequences is deeply impressive.',
          'crit-tech': 'Remarkable C++ binding optimization with zero memory leaks.',
          'crit-impact': 'Massive public health consequence if scaled.',
          'crit-presentation': 'Video demo validated live streaming nanopore data.'
        },
        totalRaw: 8.85,
        submittedAt: '2026-09-26 21:45:00 UTC',
        status: 'locked'
      },
      {
        judgeId: 'jdg-03',
        judgeName: 'Devon Vance',
        criteriaScores: { 'crit-innovation': 9, 'crit-tech': 9, 'crit-impact': 10, 'crit-presentation': 9 },
        justifications: {
          'crit-innovation': 'Inspiring interdisciplinary project.',
          'crit-tech': 'Very robust error handling under noisy signal conditions.',
          'crit-impact': 'Global epidemic mitigation capabilities.',
          'crit-presentation': 'Great documentation.'
        },
        totalRaw: 9.25,
        submittedAt: '2026-09-26 22:50:00 UTC',
        status: 'locked'
      },
      {
        judgeId: 'jdg-04',
        judgeName: 'Dr. Soraya Khemir',
        criteriaScores: { 'crit-innovation': 8, 'crit-tech': 9, 'crit-impact': 9, 'crit-presentation': 8 },
        justifications: {
          'crit-innovation': 'Solid use of HMM quantization.',
          'crit-tech': 'Tested across real NCBI viral databases with high sensitivity.',
          'crit-impact': 'High feasibility.',
          'crit-presentation': 'Clean concise deck.'
        },
        totalRaw: 8.55,
        submittedAt: '2026-09-26 23:20:00 UTC',
        status: 'locked'
      }
    ],
    rawAverage: 8.88,
    normalizedScore: 94.2,
    zScoreRaw: 1.51,
    rank: 2
  },
  {
    id: 'PRJ-014',
    eventId: 'evt-agamotto-2026',
    codeName: 'PROJECT #014 — CLASSIFIED',
    title: 'ZeroLens: Verifiable Zero-Knowledge Optical Watermarking',
    tagline: 'Hardware-attested image authenticity proving provenance without metadata stripping vulnerability.',
    teamName: 'Prism Crypt',
    college: 'Carnegie Mellon University',
    members: [
      { name: 'Aiden Thorne', role: 'ZK Cryptographer', college: 'CMU', email: 'aiden@cmu.edu' },
      { name: 'Zainab Qazi', role: 'Optics Engineer', college: 'CMU', email: 'zqazi@cmu.edu' }
    ],
    track: 'Privacy & Cryptography',
    problem: 'Generative AI deepfakes evade traditional cryptographic watermarks through lossy recompression and screenshot resampling.',
    solution: 'ZeroLens creates non-interactive zero-knowledge proofs directly inside sensor ISP pipelines, verifiable without revealing RAW sensor calibration keys.',
    techStack: ['Halo2', 'Rust', 'WebGPU', 'OpenCV', 'React', 'TypeScript'],
    githubUrl: 'https://github.com/mock-org/zerolens-zkp',
    demoUrl: 'https://zerolens.verifiable.media',
    presentationFileName: 'ZeroLens_Attestation_Spec.pdf',
    submittedAt: '2026-09-26 17:05:44 UTC',
    status: 'submitted',
    assignedJudges: ['jdg-01', 'jdg-02', 'jdg-03', 'jdg-05'],
    scores: [
      {
        judgeId: 'jdg-01',
        judgeName: 'Dr. Aris Thorne',
        criteriaScores: { 'crit-innovation': 8, 'crit-tech': 9, 'crit-impact': 8, 'crit-presentation': 8 },
        justifications: {
          'crit-innovation': 'Pioneering application of Halo2 SNARK proofs to hardware optical ISP pipelines.',
          'crit-tech': 'Very low circuit overhead and fast prover generation.',
          'crit-impact': 'Critical countermeasure against synthetic media forgery.',
          'crit-presentation': 'Crisp interactive provenance validator.'
        },
        totalRaw: 8.35,
        submittedAt: '2026-09-27 01:20:00 UTC',
        status: 'draft'
      },
      {
        judgeId: 'jdg-02',
        judgeName: 'Maya Lin',
        criteriaScores: { 'crit-innovation': 9, 'crit-tech': 8, 'crit-impact': 8, 'crit-presentation': 9 },
        justifications: {
          'crit-innovation': 'First implementation of Halo2 SNARK circuits directly in ISP pipeline models.',
          'crit-tech': 'Proof verification time is under 180ms in browser WebGPU.',
          'crit-impact': 'Critically urgent for journalistic integrity.',
          'crit-presentation': 'Interactive verification widget was instant.'
        },
        totalRaw: 8.45,
        submittedAt: '2026-09-26 23:10:00 UTC',
        status: 'locked'
      },
      {
        judgeId: 'jdg-03',
        judgeName: 'Devon Vance',
        criteriaScores: { 'crit-innovation': 8, 'crit-tech': 8, 'crit-impact': 9, 'crit-presentation': 8 },
        justifications: {
          'crit-innovation': 'Creative blend of cryptographic primitives.',
          'crit-tech': 'Clean circuit design with minimal constraint bloat.',
          'crit-impact': 'High commercial relevance.',
          'crit-presentation': 'Crisp demo.'
        },
        totalRaw: 8.25,
        submittedAt: '2026-09-27 00:05:00 UTC',
        status: 'locked'
      },
      {
        judgeId: 'jdg-05',
        judgeName: 'Kaelen O\'Connor',
        criteriaScores: { 'crit-innovation': 8, 'crit-tech': 8, 'crit-impact': 8, 'crit-presentation': 8 },
        justifications: {
          'crit-innovation': 'Strong originality.',
          'crit-tech': 'Very clean WebGPU shaders.',
          'crit-impact': 'Great venture potential.',
          'crit-presentation': 'Clear presentation.'
        },
        totalRaw: 8.00,
        submittedAt: '2026-09-27 00:45:00 UTC',
        status: 'locked'
      }
    ],
    rawAverage: 8.23,
    normalizedScore: 88.5,
    zScoreRaw: 0.92,
    rank: 3
  },
  {
    id: 'PRJ-019',
    eventId: 'evt-agamotto-2026',
    codeName: 'PROJECT #019 — CLASSIFIED',
    title: 'VoltPulse: Autonomous Grid Frequency Stabilizer',
    tagline: 'Decentralized battery storage orchestration responding to micro-second grid disturbances.',
    teamName: 'GridSentinels',
    college: 'Georgia Tech & TU Munich',
    members: [
      { name: 'Felix Bauer', role: 'Power Systems', college: 'TU Munich', email: 'f.bauer@tum.de' },
      { name: 'Ananya Rao', role: 'Control Theory', college: 'Georgia Tech', email: 'arao@gatech.edu' }
    ],
    track: 'Infrastructure & Systems',
    problem: 'Renewable energy injection volatility causes rapid sub-second frequency swings, threatening wide-area blackout cascade.',
    solution: 'VoltPulse uses decentralized reinforcement learning on microinverters with local phase-locked loops for autonomous inertia injection.',
    techStack: ['C++', 'Rust', 'Modbus TCP', 'Simulink', 'ZeroMQ', 'Grafana'],
    githubUrl: 'https://github.com/mock-org/voltpulse-grid',
    demoUrl: 'https://voltpulse-simulator.io',
    presentationFileName: 'VoltPulse_IEEE_Draft.pdf',
    submittedAt: '2026-09-26 18:02:11 UTC',
    status: 'submitted',
    // Assigned to jdg-02, jdg-04. jdg-01 was BLOCKED due to conflict: "Judge is a team member"
    // Currently only 2 completed reviews! Showcases "Required 3 / Completed 2 / Missing 1"
    assignedJudges: ['jdg-02', 'jdg-04', 'jdg-03'],
    scores: [
      {
        judgeId: 'jdg-02',
        judgeName: 'Maya Lin',
        criteriaScores: { 'crit-innovation': 8, 'crit-tech': 8, 'crit-impact': 8, 'crit-presentation': 7 },
        justifications: {
          'crit-innovation': 'Smart application of distributed consensus to frequency response.',
          'crit-tech': 'Hardware-in-the-loop simulation runs smoothly.',
          'crit-impact': 'Vital as grids decarbonize.',
          'crit-presentation': 'Good real-time dashboard.'
        },
        totalRaw: 7.85,
        submittedAt: '2026-09-27 00:01:00 UTC',
        status: 'locked'
      },
      {
        judgeId: 'jdg-04',
        judgeName: 'Dr. Soraya Khemir',
        criteriaScores: { 'crit-innovation': 8, 'crit-tech': 8, 'crit-impact': 7, 'crit-presentation': 8 },
        justifications: {
          'crit-innovation': 'Well thought out mathematics.',
          'crit-tech': 'Robust latency bounds under simulated packet drop.',
          'crit-impact': 'Substantial infrastructure utility.',
          'crit-presentation': 'Very detailed analysis.'
        },
        totalRaw: 7.75,
        submittedAt: '2026-09-27 00:30:00 UTC',
        status: 'locked'
      }
    ],
    rawAverage: 7.80,
    normalizedScore: 82.1,
    zScoreRaw: 0.28,
    rank: 4
  },
  {
    id: 'PRJ-001',
    eventId: 'evt-agamotto-2026',
    codeName: 'PROJECT #001 — CLASSIFIED',
    title: 'OmniScan: Open Neurological Biomarker Mapping',
    tagline: 'Standardizing non-invasive pupillometry and micro-tremor detection on mobile cameras.',
    teamName: 'NeuroFrontier',
    college: 'Oxford & University of Toronto',
    members: [
      { name: 'Samira Haddad', role: 'Computer Vision', college: 'Oxford', email: 'samira@ox.ac.uk' },
      { name: 'Kenji Sato', role: 'Neurobiology', college: 'University of Toronto', email: 'k.sato@utoronto.ca' }
    ],
    track: 'BioTech & Health',
    problem: 'Early neurodegenerative diagnosis relies on specialized clinical PET scanners costing upwards of $2M.',
    solution: 'OmniScan extracts sub-pixel micro-saccadic eye movement tremor features from 240fps smartphone camera video with validated clinical correlation.',
    techStack: ['Swift', 'Metal', 'CoreML', 'Python', 'Statsmodels'],
    githubUrl: 'https://github.com/mock-org/omniscan-vision',
    demoUrl: 'https://omniscan-demo.org',
    presentationFileName: 'OmniScan_Clinical_Trial_Protocol.pdf',
    submittedAt: '2026-09-26 16:30:00 UTC',
    status: 'submitted',
    assignedJudges: ['jdg-01', 'jdg-03', 'jdg-04'],
    scores: [
      {
        judgeId: 'jdg-01',
        judgeName: 'Dr. Aris Thorne',
        criteriaScores: { 'crit-innovation': 7, 'crit-tech': 7, 'crit-impact': 8, 'crit-presentation': 8 },
        justifications: {
          'crit-innovation': 'Clever signal processing algorithms.',
          'crit-tech': 'Sub-pixel optical flow algorithm handles motion artifacts well.',
          'crit-impact': 'Democratizes neurology screening.',
          'crit-presentation': 'Demonstrated on 3 distinct iPhone camera sensors.'
        },
        totalRaw: 7.40,
        submittedAt: '2026-09-26 20:30:00 UTC',
        status: 'locked'
      },
      {
        judgeId: 'jdg-03',
        judgeName: 'Devon Vance',
        criteriaScores: { 'crit-innovation': 8, 'crit-tech': 7, 'crit-impact': 8, 'crit-presentation': 7 },
        justifications: {
          'crit-innovation': 'Solid concept.',
          'crit-tech': 'Good model inference speed.',
          'crit-impact': 'High patient access improvement.',
          'crit-presentation': 'Clean deck.'
        },
        totalRaw: 7.55,
        submittedAt: '2026-09-26 23:45:00 UTC',
        status: 'locked'
      },
      {
        judgeId: 'jdg-04',
        judgeName: 'Dr. Soraya Khemir',
        criteriaScores: { 'crit-innovation': 7, 'crit-tech': 7, 'crit-impact': 7, 'crit-presentation': 7 },
        justifications: {
          'crit-innovation': 'Building on existing pupillometry literature.',
          'crit-tech': 'Needs broader demographic dataset validation.',
          'crit-impact': 'Encouraging screening tool.',
          'crit-presentation': 'Solid.'
        },
        totalRaw: 7.00,
        submittedAt: '2026-09-27 00:55:00 UTC',
        status: 'locked'
      }
    ],
    rawAverage: 7.32,
    normalizedScore: 78.4,
    zScoreRaw: -0.15,
    rank: 5
  },
  {
    id: 'PRJ-031',
    eventId: 'evt-agamotto-2026',
    codeName: 'PROJECT #031 — CLASSIFIED',
    title: 'KubeMorph: Memory-Slicing Ephemeral MicroVMs',
    tagline: 'Instant 4ms cold-start serverless container sandbox using copy-on-write page tables.',
    teamName: 'HyperKube Systems',
    college: 'University of Washington & UC Berkeley',
    members: [
      { name: 'Liam Zhang', role: 'Hypervisor Dev', college: 'UC Berkeley', email: 'lzhang@berkeley.edu' },
      { name: 'Nadia El-Amin', role: 'Cloud Architecture', college: 'UW', email: 'nadia@cs.washington.edu' }
    ],
    track: 'Infrastructure & Systems',
    problem: 'Serverless functions suffer from 150-400ms cold starts when initializing JVM or Python dependencies in enterprise multi-tenant clouds.',
    solution: 'KubeMorph snapshots pre-forked microVM memory state directly into NVMe over Fabrics, slicing page faults to zero upon cold invoke.',
    techStack: ['Rust', 'KVM', 'Linux Kernel', 'QEMU', 'SPDK', 'gRPC'],
    githubUrl: 'https://github.com/mock-org/kubemorph-vmm',
    demoUrl: 'https://kubemorph-bench.dev',
    presentationFileName: 'KubeMorph_Architecture.pdf',
    submittedAt: '2026-09-26 19:40:00 UTC',
    status: 'submitted',
    assignedJudges: ['jdg-01', 'jdg-02', 'jdg-03'],
    scores: [
      {
        judgeId: 'jdg-01',
        judgeName: 'Dr. Aris Thorne',
        criteriaScores: { 'crit-innovation': 7, 'crit-tech': 8, 'crit-impact': 7, 'crit-presentation': 7 },
        justifications: {
          'crit-innovation': 'Well known pattern executed with high precision.',
          'crit-tech': 'Very clean KVM API usage.',
          'crit-impact': 'Reduces cloud computing waste.',
          'crit-presentation': 'Benchmark scripts run reliably.'
        },
        totalRaw: 7.30,
        submittedAt: '2026-09-26 22:15:00 UTC',
        status: 'locked'
      },
      {
        judgeId: 'jdg-02',
        judgeName: 'Maya Lin',
        criteriaScores: { 'crit-innovation': 7, 'crit-tech': 7, 'crit-impact': 7, 'crit-presentation': 7 },
        justifications: {
          'crit-innovation': 'Solid execution.',
          'crit-tech': 'Memory isolation boundaries are secure.',
          'crit-impact': 'Helpful for serverless developers.',
          'crit-presentation': 'Good documentation.'
        },
        totalRaw: 7.00,
        submittedAt: '2026-09-27 00:20:00 UTC',
        status: 'locked'
      },
      {
        judgeId: 'jdg-03',
        judgeName: 'Devon Vance',
        criteriaScores: { 'crit-innovation': 8, 'crit-tech': 7, 'crit-impact': 7, 'crit-presentation': 7 },
        justifications: {
          'crit-innovation': 'Practical optimization.',
          'crit-tech': 'Fast cold start recorded.',
          'crit-impact': 'Cost savings are demonstrable.',
          'crit-presentation': 'Straightforward.'
        },
        totalRaw: 7.30,
        submittedAt: '2026-09-27 01:02:00 UTC',
        status: 'locked'
      }
    ],
    rawAverage: 7.20,
    normalizedScore: 76.2,
    zScoreRaw: -0.32,
    rank: 6
  }
];

export const initialParticipantsList: ParticipantUser[] = [
  {
    id: 'usr-001',
    name: 'Kiran Patel',
    email: 'kiran@stanford.edu',
    college: 'Stanford University',
    degree: 'B.S. Computer Science',
    graduationYear: '2027',
    teamId: 'team-024',
    teamName: 'Nova Dynamics',
    status: 'approved',
    registeredAt: '2026-09-20 10:14 UTC',
    github: 'https://github.com/kiranpatel-cs'
  },
  {
    id: 'usr-002',
    name: 'Clara Weber',
    email: 'c.weber@ethz.ch',
    college: 'ETH Zürich',
    degree: 'M.Sc. Computer Engineering',
    graduationYear: '2026',
    teamId: 'team-024',
    teamName: 'Nova Dynamics',
    status: 'approved',
    registeredAt: '2026-09-20 11:22 UTC',
    github: 'https://github.com/claraweber'
  },
  {
    id: 'usr-003',
    name: 'Li Wei',
    email: 'li.wei@stanford.edu',
    college: 'Stanford University',
    degree: 'Ph.D. Applied Mathematics',
    graduationYear: '2028',
    teamId: 'team-024',
    teamName: 'Nova Dynamics',
    status: 'approved',
    registeredAt: '2026-09-20 12:05 UTC',
    github: 'https://github.com/liwei-math'
  },
  {
    id: 'usr-004',
    name: 'Dr. Mateo Gomez',
    email: 'mateo@hms.harvard.edu',
    college: 'Harvard Medical School',
    degree: 'Postdoctoral Fellow',
    graduationYear: '2026',
    teamId: 'team-008',
    teamName: 'Helix Vector Lab',
    status: 'approved',
    registeredAt: '2026-09-21 09:30 UTC',
    github: 'https://github.com/mateogomez-bio'
  },
  {
    id: 'usr-005',
    name: 'Elena Rostova',
    email: 'elena@mit.edu',
    college: 'MIT',
    degree: 'M.S. Electrical Engineering',
    graduationYear: '2027',
    teamId: 'team-008',
    teamName: 'Helix Vector Lab',
    status: 'approved',
    registeredAt: '2026-09-21 14:15 UTC',
    github: 'https://github.com/erostova'
  },
  {
    id: 'usr-006',
    name: 'Maya Lindqvist',
    email: 'm.lindqvist@kth.se',
    college: 'KTH Royal Institute of Technology',
    degree: 'B.Sc. Information Technology',
    graduationYear: '2027',
    status: 'pending',
    registeredAt: '2026-09-24 16:50 UTC',
    github: 'https://github.com/mayalindqvist'
  },
  {
    id: 'usr-007',
    name: 'Tariq Al-Mansoor',
    email: 'tariq@kaust.edu.sa',
    college: 'KAUST',
    degree: 'Ph.D. Computer Science',
    graduationYear: '2028',
    status: 'pending',
    registeredAt: '2026-09-24 18:10 UTC',
    github: 'https://github.com/talmansoor'
  }
];

export const initialParticipantTeams: ParticipantTeam[] = [
  {
    id: 'team-024',
    eventId: 'evt-agamotto-2026',
    name: 'Nova Dynamics',
    inviteCode: 'NOVA-8924',
    track: 'Infrastructure & Systems',
    members: [
      { name: 'Kiran Patel', email: 'kiran@stanford.edu', college: 'Stanford University', role: 'Consensus Architect', isLeader: true },
      { name: 'Clara Weber', email: 'c.weber@ethz.ch', college: 'ETH Zürich', role: 'Kernel Systems Dev', isLeader: false },
      { name: 'Li Wei', email: 'li.wei@stanford.edu', college: 'Stanford University', role: 'Cryptographic Protocol', isLeader: false }
    ]
  },
  {
    id: 'team-008',
    eventId: 'evt-agamotto-2026',
    name: 'Helix Vector Lab',
    inviteCode: 'HELIX-4412',
    track: 'BioTech & Health',
    members: [
      { name: 'Dr. Mateo Gomez', email: 'mateo@hms.harvard.edu', college: 'Harvard Medical School', role: 'Genomics Lead', isLeader: true },
      { name: 'Elena Rostova', email: 'elena@mit.edu', college: 'MIT', role: 'Embedded Systems', isLeader: false }
    ]
  },
  {
    id: 'team-014',
    eventId: 'evt-agamotto-2026',
    name: 'Prism Crypt',
    inviteCode: 'PRISM-7709',
    track: 'Privacy & Cryptography',
    members: [
      { name: 'Aiden Thorne', email: 'aiden@cmu.edu', college: 'Carnegie Mellon University', role: 'ZK Cryptographer', isLeader: true },
      { name: 'Zainab Qazi', email: 'zqazi@cmu.edu', college: 'Carnegie Mellon University', role: 'Optics Engineer', isLeader: false }
    ]
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'log-001',
    eventId: 'evt-agamotto-2026',
    timestamp: '2026-09-26 12:00:00 UTC',
    actor: 'system',
    actorRole: 'system',
    action: 'LIFECYCLE_TRANSITION',
    entity: 'evt-agamotto-2026',
    details: 'Event shifted from SUBMISSION to JUDGING phase. 6 submissions locked and blinded.',
    hashSignature: '0x9a3e47b99c73e1f0e4b859e9428db872'
  },
  {
    id: 'log-002',
    eventId: 'evt-agamotto-2026',
    timestamp: '2026-09-26 12:05:14 UTC',
    actor: 'Dr. Aris Thorne',
    actorRole: 'judge',
    action: 'CONFLICT_CHECK_RUN',
    entity: 'PRJ-019',
    details: 'Conflict detected on PRJ-019 (Reason: "Judge is a team member"). Assignment blocked automatically.',
    hashSignature: '0x3c78fa21e48bc39d8923a1ef503b8791'
  },
  {
    id: 'log-003',
    eventId: 'evt-agamotto-2026',
    timestamp: '2026-09-26 12:06:02 UTC',
    actor: 'system',
    actorRole: 'system',
    action: 'JUDGE_BALANCING_MATRIX',
    entity: 'evt-agamotto-2026',
    details: 'Workload distribution verified: 3 evaluations assigned per submission across 5 verified judges.',
    hashSignature: '0x7e8b91c203fa8d9e2384a8bc94380f2d'
  },
  {
    id: 'log-004',
    eventId: 'evt-agamotto-2026',
    timestamp: '2026-09-26 21:10:00 UTC',
    actor: 'Dr. Aris Thorne',
    actorRole: 'judge',
    action: 'EVALUATION_LOCKED',
    entity: 'PRJ-024',
    details: 'Blind review locked for PRJ-024. Raw weighted score: 9.15/10.00. SHA-256 signature generated.',
    hashSignature: '0x1b2e88a4c33d45ef8923b01889c2fa77'
  },
  {
    id: 'log-005',
    eventId: 'evt-agamotto-2026',
    timestamp: '2026-09-26 22:30:15 UTC',
    actor: 'Maya Lin',
    actorRole: 'judge',
    action: 'EVALUATION_LOCKED',
    entity: 'PRJ-024',
    details: 'Blind review locked for PRJ-024. Raw weighted score: 9.00/10.00.',
    hashSignature: '0xfa03bc49281de37a9082bc5e7710384a'
  },
  {
    id: 'log-006',
    eventId: 'evt-agamotto-2026',
    timestamp: '2026-09-27 00:45:00 UTC',
    actor: 'system',
    actorRole: 'system',
    action: 'INTEGRITY_PULSE_CHECK',
    entity: 'evt-agamotto-2026',
    details: 'Deterministic integrity audit executed. Conflicts: 0 active bypasses. Completion rate: 94.4%.',
    hashSignature: '0x992cf08182ec77a942bc01837498a1be'
  },
  {
    id: 'log-007',
    eventId: 'evt-agamotto-2026',
    timestamp: '2026-09-27 01:05:00 UTC',
    actor: 'system',
    actorRole: 'system',
    action: 'Z_SCORE_NORMALIZATION_PIPELINE',
    entity: 'evt-agamotto-2026',
    details: 'Calculated judge mean deviations and standardized Z-scores across all finished evaluations.',
    hashSignature: '0x55dc98a2307ef11082bc3391789c83fa'
  }
];

export const initialEventConfig = initialEvents[0];
export const initialParticipantTeam = initialParticipantTeams[0];

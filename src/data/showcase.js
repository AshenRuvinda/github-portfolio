export const showcaseItems = [
  {
    id: 1,
    title: 'Manjula Constructions',
    subtitle: 'Modern Web Application & Client Portal for Architectural Construction Services',
    status: 'In Active Development', // 'In Active Development' | 'Beta Testing' | 'Shipped' | 'Concept / Prototype'
    progress: 75,
    category: 'Ongoing Web Application',
    featured: true,
    thumbnail: 'https://manjulaconstructions.vercel.app/images/hero-modern-house.jpg',
    videoUrl: '', // Add demo video URL when available
    gallery: [
      'https://manjulaconstructions.vercel.app/images/hero-modern-house.jpg',
      'https://github.com/AshenRuvinda/ProjectImages/blob/master/mc2.PNG?raw=true',
    ],
    tags: ['Next.js', 'React', 'TailwindCSS', 'Vercel', 'Responsive Design', 'SEO'],
    description:
      'A bespoke digital experience and business portal engineered for Manjula Constructions — a premier home design, residential building, and civil contracting firm based in Negombo, Sri Lanka.',
    overview:
      'Manjula Constructions is an ongoing, production-grade web application tailored to provide clients with seamless project inquiries, an interactive service catalog, and architectural portfolio showcases. Built with modern Next.js and Tailwind CSS, the platform emphasizes lightning-fast loading speeds, bilingual localization considerations, and fluid mobile ergonomics.',
    architecture: [
      {
        title: 'Modern Next.js Architecture',
        detail: 'Utilizes Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR) on Vercel for instant page loads and optimal SEO rankings.',
      },
      {
        title: 'Interactive Project Catalog & Services',
        detail: 'Dynamic presentation of civil construction, tile fixing, ceiling work, plastering, plumbing, and electrical services with high-resolution visual showcases.',
      },
      {
        title: 'Direct Client Inquiry Channel',
        detail: 'Streamlined WhatsApp and call-to-action touchpoints allowing prospective homeowners to request estimates directly from mobile and desktop devices.',
      },
      {
        title: 'Responsive & Retina-Ready UI',
        detail: 'Custom-crafted UI components optimized for mobile accessibility, high-DPI displays, and intuitive navigation.',
      },
    ],
    highlights: [
      'Production deployment live on Vercel platform',
      'Engineered with modern Next.js and Tailwind CSS',
      'Mobile-first responsive architecture with smooth animations',
      'Comprehensive service breakdown and architectural imagery',
      'Optimized Core Web Vitals and local SEO metadata',
    ],
    demoUrl: 'https://manjulaconstructions.vercel.app/',
    repoUrl: 'https://github.com/AshenRuvinda',
    lastUpdated: 'Nov 2026',
  },
  {
    id: 2,
    title: 'F1 25 Telemetry & Community Platform',
    subtitle: 'Real-time UDP Telemetry Parser, Desktop Companion & Global Time-Trial Leaderboard',
    status: 'In Active Development',
    progress: 60,
    category: 'Telemetry & Systems Software',
    featured: true,
    thumbnail: 'https://image.api.playstation.com/vulcan/ap/rnd/202505/1521/ca36c3ae7641a273ff3f00e63732fb76e2850c57f577d6eb.jpg',
    videoUrl: '', // Add demo video URL when recorded
    gallery: [
      'https://wp.clutchpoints.com/wp-content/uploads/2025/07/EA-F1-25-Season-2-Release-Date-Gameplay-Trailer.jpg?w=1200',
      'https://github.com/AshenRuvinda/ProjectImages/blob/master/image.png?raw=true',
    ],
    tags: ['Electron', 'Node.js', 'UDP Sockets', 'Next.js 14', 'Socket.IO', 'MongoDB', 'Recharts'],
    description:
      'A cross-platform esports telemetry and analytics ecosystem that captures live 60Hz UDP packets from EA SPORTS F1 25 across PC, PS5, and Xbox, verifying and ranking global Time Trial lap performances.',
    overview:
      'The F1 25 Telemetry Platform connects real-time sim-racing physics with cloud analytics. Featuring a monorepo setup with an Electron desktop companion listening on UDP port 20777, an Express & Socket.IO backend, and a Next.js 14 web client, it provides competitive drivers with deep telemetry telemetry charts (throttle, brake, gear, speed deltas, tire temperatures) and automated anti-cheat lap verification.',
    architecture: [
      {
        title: 'Binary UDP Packet Parser',
        detail: 'High-frequency Node.js dgram listener in Electron decoding F1 25 binary packet streams (Motion, Lap Data, Car Telemetry, Car Status) in real time.',
      },
      {
        title: 'Automated Anti-Cheat Verification Pipeline',
        detail: 'Multi-layer validation engine inspecting sector consistency, track boundary limits, physical velocity thresholds, and telemetry replay hashes to eliminate fabricated lap times.',
      },
      {
        title: 'Full-Duplex Socket.IO Live Streaming',
        detail: 'Streams live race car metrics and telemetry telemetry to spectator dashboards and race engineer HUDs with sub-10ms latency.',
      },
      {
        title: 'Full Circuit Database & Seed Engine',
        detail: 'MongoDB schemas pre-seeded with all 24 official F1 25 Grand Prix circuits, track lengths, sector benchmarks, and dynamic leaderboards.',
      },
    ],
    highlights: [
      'Electron desktop companion listening on UDP port 20777',
      'Supports cross-platform telemetry from PC, PS5, and Xbox Series X|S',
      'Automated lap validation eliminating illegitimate or glitch times',
      'Real-time telemetry HUD with speed, gear, throttle/brake traces and tire wear',
      'Modern Next.js 14 web leaderboard and driver profiles',
    ],
    demoUrl: '',
    repoUrl: 'https://github.com/AshenRuvinda/F125WebApp',
    lastUpdated: 'Nov 2026',
  },
];

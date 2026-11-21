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
    downloadUrl: 'https://github.com/AshenRuvinda/F1companion/releases/download/F125Companion/F1-25-Desktop-Companion-v1.0.0-Windows.zip',
    downloadLabel: 'Download Companion App',
    downloadInfo: 'v1.0.0 · Windows 64-bit (.zip ~152 MB)',
    repoUrl: 'https://github.com/AshenRuvinda/F125WebApp',
    lastUpdated: 'Nov 2026',
  },
  {
    id: 3,
    title: 'Nissan GT-R R35 Nismo 3D Experience',
    subtitle: 'Interactive 3D Web Visualizer, Real-Time Configurator & Cinematic Showcase',
    status: 'In Active Development',
    progress: 85,
    category: 'Interactive 3D Web App',
    featured: true,
    thumbnail: 'https://cimg2.ibsrv.net/ibimg/hgm/1920x1080-1/100/736/2020-nissan-gt-r_100736666.jpg',
    videoUrl: '',
    gallery: [
      'https://cimg2.ibsrv.net/ibimg/hgm/1920x1080-1/100/736/2020-nissan-gt-r_100736666.jpg',
      
    ],
    tags: ['Three.js', 'React Three Fiber', 'Next.js 16', 'GLSL Shaders', 'GSAP', 'Tailwind CSS', 'Framer Motion'],
    description:
      'A cinematic, interactive 3D web experience showcasing the iconic 2022 Nissan GT-R R35 Nismo. Features real-time mesh rendering, dynamic camera transitions, and an interactive bespoke color customizer.',
    overview:
      'The Nissan GT-R R35 Nismo 3D Experience pushes modern browser graphics to their limits using Three.js and React Three Fiber. Users can explore every aerodynamic contour in real time, inspect carbon-fiber aero packages, interact with dynamic studio lighting, and customize factory exterior paint finishes with physically accurate PBR clearcoat reflections.',
    architecture: [
      {
        title: 'React Three Fiber & Drei 3D Pipeline',
        detail: 'High-fidelity GLTF/GLB model rendering with optimized draw calls, custom environment HDR lighting, and shadow contact planes.',
      },
      {
        title: 'Real-Time PBR Material Customizer',
        detail: 'Dynamic shader material manipulation allowing real-time switching of factory paint finishes (Stealth Gray, Ultimate Silver, Pearl Black, Brilliant White) with clearcoat roughness and metallic flake effects.',
      },
      {
        title: 'Smooth Camera Physics with GSAP & Framer Motion',
        detail: 'Interpolated orbit camera choreography guiding users seamlessly between hero, exterior, cockpit, and engineering spec camera views.',
      },
      {
        title: 'Responsive Next.js 16 App Architecture',
        detail: 'Modern Next.js 16 architecture optimized with Turbopack, responsive HUD overlays, and preloader asset optimization.',
      },
    ],
    highlights: [
      'High-fidelity 3D model of the 2022 Nissan GT-R R35 Nismo',
      'Interactive real-time 360° orbital exploration with dynamic zoom and pan',
      'Real-time bespoke color customizer with physically based rendering (PBR)',
      'Cinematic camera choreography powered by GSAP and React Three Fiber',
      'Engineered with modern Next.js 16, React 19, and Tailwind CSS',
    ],
    demoUrl: 'https://3-dwebsite-git-main-ashen-ruvindas-projects.vercel.app/',
    repoUrl: 'https://github.com/AshenRuvinda/3Dwebsite',
    lastUpdated: 'Nov 2026',
  },
];

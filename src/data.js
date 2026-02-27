/**
 * Radar configuration and default data for UI/UX Technology Radar.
 *
 * Quadrants represent categories of technology relevant to design and UX.
 * Rings represent maturity / recommendation levels.
 */

export const QUADRANTS = [
  { id: 0, name: 'Design Tools & Platforms', color: '#3B82F6' },
  { id: 1, name: 'Techniques & Methods', color: '#10B981' },
  { id: 2, name: 'Frameworks & UI Libraries', color: '#F59E0B' },
  { id: 3, name: 'AI & Emerging Technology', color: '#EC4899' },
];

export const RINGS = [
  { id: 0, name: 'Adopt', description: 'Proven, strongly recommended for broad use' },
  { id: 1, name: 'Trial', description: 'Worth pursuing — proven value in real projects' },
  { id: 2, name: 'Assess', description: 'Worth exploring — understand the potential impact' },
  { id: 3, name: 'Hold', description: 'Proceed with caution — evaluate before investing' },
];

let _nextId = 1;

export function generateId() {
  return `item-${Date.now()}-${_nextId++}`;
}

/**
 * Default radar items curated for UI/UX designers, HCI experts, and UX professionals.
 */
export function getDefaultData() {
  return [
    // ─── Design Tools & Platforms ────────────────────────────────

    // Adopt
    {
      id: generateId(), name: 'Figma', quadrant: 0, ring: 0, isNew: false,
      description: 'The industry standard for collaborative interface design. Real-time multiplayer editing, robust component systems, and a thriving plugin ecosystem make it indispensable for modern design teams.',
    },
    {
      id: generateId(), name: 'Miro', quadrant: 0, ring: 0, isNew: false,
      description: 'Visual collaboration platform ideal for remote workshops, journey mapping, affinity diagramming, and design sprints with distributed teams.',
    },

    // Trial
    {
      id: generateId(), name: 'Framer', quadrant: 0, ring: 1, isNew: false,
      description: 'Advanced prototyping tool that exports production-ready code. Excellent for high-fidelity interactive prototypes and marketing site creation.',
    },
    {
      id: generateId(), name: 'Storybook', quadrant: 0, ring: 1, isNew: false,
      description: 'UI component development and documentation environment. Essential for building, testing, and showcasing design system components in isolation.',
    },
    {
      id: generateId(), name: 'Maze', quadrant: 0, ring: 1, isNew: true,
      description: 'Rapid remote usability testing platform that connects directly to Figma prototypes. Enables continuous discovery and fast validation cycles.',
    },

    // Assess
    {
      id: generateId(), name: 'Penpot', quadrant: 0, ring: 2, isNew: false,
      description: 'Open-source design platform with SVG-native approach. A credible Figma alternative for teams valuing open standards and self-hosting.',
    },
    {
      id: generateId(), name: 'Spline', quadrant: 0, ring: 2, isNew: true,
      description: '3D design tool for creating interactive web experiences. Enables designers to create 3D UI elements, animations, and immersive product visuals.',
    },
    {
      id: generateId(), name: 'Motiff', quadrant: 0, ring: 2, isNew: true,
      description: 'AI-powered interface design tool that uses machine learning to accelerate layout, component selection, and design iteration workflows.',
    },

    // Hold
    {
      id: generateId(), name: 'Adobe XD', quadrant: 0, ring: 3, isNew: false,
      description: 'Adobe\'s UI design tool with an uncertain roadmap after Adobe ended new feature development. Existing projects should plan migration to alternatives.',
    },
    {
      id: generateId(), name: 'InVision', quadrant: 0, ring: 3, isNew: false,
      description: 'Once a leading prototyping and collaboration tool, now winding down its services. Teams should migrate to modern alternatives.',
    },
    {
      id: generateId(), name: 'Sketch', quadrant: 0, ring: 3, isNew: false,
      description: 'Mac-only design tool that pioneered modern UI design workflows but has lost significant ground to cross-platform tools like Figma.',
    },

    // ─── Techniques & Methods ────────────────────────────────────

    // Adopt
    {
      id: generateId(), name: 'Design Systems', quadrant: 1, ring: 0, isNew: false,
      description: 'Systematic approach to building consistent, scalable UI through shared components, tokens, and guidelines. The foundation of efficient design at scale.',
    },
    {
      id: generateId(), name: 'Accessibility-First Design', quadrant: 1, ring: 0, isNew: false,
      description: 'Building WCAG compliance into the design process from the start rather than retrofitting. Ensures inclusive experiences for all users regardless of ability.',
    },
    {
      id: generateId(), name: 'User Journey Mapping', quadrant: 1, ring: 0, isNew: false,
      description: 'Visualizing complete user experiences across touchpoints to identify pain points, opportunities, and moments that matter in the end-to-end experience.',
    },
    {
      id: generateId(), name: 'Design Tokens', quadrant: 1, ring: 0, isNew: false,
      description: 'Platform-agnostic design variables (colors, spacing, typography) that bridge design tools and code, enabling consistent multi-platform theming.',
    },

    // Trial
    {
      id: generateId(), name: 'DesignOps', quadrant: 1, ring: 1, isNew: false,
      description: 'Operational practices to scale and optimize design team workflows — covering tooling, processes, team structures, and design infrastructure.',
    },
    {
      id: generateId(), name: 'Jobs-to-be-Done Framework', quadrant: 1, ring: 1, isNew: false,
      description: 'Research framework focusing on the underlying motivations and progress users seek rather than demographics, leading to more innovative solution design.',
    },
    {
      id: generateId(), name: 'Inclusive Design', quadrant: 1, ring: 1, isNew: false,
      description: 'Designing for the full range of human diversity — including ability, language, culture, age, and context — as a source of innovation rather than constraint.',
    },
    {
      id: generateId(), name: 'Research Repositories', quadrant: 1, ring: 1, isNew: true,
      description: 'Centralized, searchable knowledge bases for user research insights. Prevents redundant research and democratizes findings across the organization.',
    },

    // Assess
    {
      id: generateId(), name: 'Spatial Design Patterns', quadrant: 1, ring: 2, isNew: true,
      description: 'Interaction paradigms for AR, VR, and mixed reality interfaces. As spatial computing grows, understanding 3D interaction models becomes increasingly valuable.',
    },
    {
      id: generateId(), name: 'AI-Augmented Research', quadrant: 1, ring: 2, isNew: true,
      description: 'Using AI to synthesize large volumes of qualitative research data — interview transcripts, survey responses, and behavioral patterns.',
    },
    {
      id: generateId(), name: 'Design Engineering', quadrant: 1, ring: 2, isNew: false,
      description: 'A hybrid discipline bridging design and front-end development. Design engineers prototype in code, build design tools, and ensure high-fidelity implementation.',
    },
    {
      id: generateId(), name: 'Multimodal Interaction Design', quadrant: 1, ring: 2, isNew: true,
      description: 'Designing for voice, gesture, haptic, and gaze input simultaneously. Key for wearables, spatial computing, and ambient computing contexts.',
    },

    // Hold
    {
      id: generateId(), name: 'Waterfall Handoffs', quadrant: 1, ring: 3, isNew: false,
      description: 'Sequential design-to-development handoff without iteration. Replace with continuous collaboration, shared component libraries, and embedded design reviews.',
    },
    {
      id: generateId(), name: 'Pixel-Perfect Specs', quadrant: 1, ring: 3, isNew: false,
      description: 'Rigid pixel-level specifications that ignore responsive contexts, design tokens, and component-based thinking. Favor flexible, token-based specifications.',
    },
    {
      id: generateId(), name: 'Personas Without Data', quadrant: 1, ring: 3, isNew: false,
      description: 'Creating user archetypes based on assumptions rather than research. If using personas, ground them in real behavioral data and refresh them regularly.',
    },

    // ─── Frameworks & UI Libraries ───────────────────────────────

    // Adopt
    {
      id: generateId(), name: 'React', quadrant: 2, ring: 0, isNew: false,
      description: 'Dominant component library for building interactive UIs. Vast ecosystem, strong design system tooling (Storybook, Radix), and wide industry adoption.',
    },
    {
      id: generateId(), name: 'Tailwind CSS', quadrant: 2, ring: 0, isNew: false,
      description: 'Utility-first CSS framework enabling rapid UI development with consistent spacing, color, and typography systems aligned to design tokens.',
    },
    {
      id: generateId(), name: 'WCAG 2.2', quadrant: 2, ring: 0, isNew: false,
      description: 'Latest Web Content Accessibility Guidelines providing testable criteria for making web content accessible. A non-negotiable standard for professional work.',
    },
    {
      id: generateId(), name: 'Next.js', quadrant: 2, ring: 0, isNew: false,
      description: 'React meta-framework with built-in routing, server components, and image optimization. Strong choice for design-forward marketing and product sites.',
    },

    // Trial
    {
      id: generateId(), name: 'Svelte', quadrant: 2, ring: 1, isNew: false,
      description: 'Compiler-based framework with minimal runtime overhead. Concise syntax, built-in transitions, and excellent DX make it appealing for interaction-rich UIs.',
    },
    {
      id: generateId(), name: 'Radix UI', quadrant: 2, ring: 1, isNew: false,
      description: 'Unstyled, accessible component primitives that handle complex interaction patterns (modals, dropdowns, tabs) while letting designers control all visual styling.',
    },
    {
      id: generateId(), name: 'CSS Container Queries', quadrant: 2, ring: 1, isNew: true,
      description: 'Responsive design based on component container size rather than viewport. Enables truly modular, context-aware components in design systems.',
    },
    {
      id: generateId(), name: 'shadcn/ui', quadrant: 2, ring: 1, isNew: true,
      description: 'Copy-paste component collection built on Radix and Tailwind. Not a dependency — you own the code, making it highly customizable for brand-specific design systems.',
    },

    // Assess
    {
      id: generateId(), name: 'View Transitions API', quadrant: 2, ring: 2, isNew: true,
      description: 'Native browser API for smooth, animated page transitions. Enables app-like navigation experiences in multi-page websites without JavaScript frameworks.',
    },
    {
      id: generateId(), name: 'Open Props', quadrant: 2, ring: 2, isNew: true,
      description: 'CSS custom properties library providing a comprehensive set of design tokens for consistent spacing, colors, easings, and animations out of the box.',
    },
    {
      id: generateId(), name: 'Astro', quadrant: 2, ring: 2, isNew: false,
      description: 'Content-focused framework with island architecture — ships zero JS by default. Ideal for documentation sites, portfolios, and design system websites.',
    },
    {
      id: generateId(), name: 'Web Components', quadrant: 2, ring: 2, isNew: false,
      description: 'Native browser component model for framework-agnostic UI elements. Promising for shareable design system components across different tech stacks.',
    },

    // Hold
    {
      id: generateId(), name: 'Bootstrap', quadrant: 2, ring: 3, isNew: false,
      description: 'Established CSS framework showing its age for bespoke design systems. Its opinionated styling makes customization harder than utility-first approaches.',
    },
    {
      id: generateId(), name: 'jQuery UI', quadrant: 2, ring: 3, isNew: false,
      description: 'Legacy interaction widget library. Modern CSS, native browser APIs, and component libraries provide better alternatives for every jQuery UI feature.',
    },
    {
      id: generateId(), name: 'CSS-in-JS Runtime', quadrant: 2, ring: 3, isNew: false,
      description: 'Runtime style injection libraries (styled-components, Emotion) carry performance overhead. Prefer zero-runtime alternatives like Tailwind, CSS Modules, or vanilla-extract.',
    },

    // ─── AI & Emerging Technology ────────────────────────────────

    // Adopt
    {
      id: generateId(), name: 'GitHub Copilot', quadrant: 3, ring: 0, isNew: false,
      description: 'AI pair programming assistant for implementing design system code, prototyping interactions, and accelerating front-end development workflows.',
    },
    {
      id: generateId(), name: 'AI Content Generation', quadrant: 3, ring: 0, isNew: false,
      description: 'Using LLMs for UX writing, microcopy, content variations, and placeholder text that reflects real content strategy rather than lorem ipsum.',
    },
    {
      id: generateId(), name: 'AI Research Assistants', quadrant: 3, ring: 0, isNew: false,
      description: 'ChatGPT, Claude, and similar AI assistants for synthesizing research findings, generating interview guides, analyzing survey data, and exploring design concepts.',
    },

    // Trial
    {
      id: generateId(), name: 'Galileo AI', quadrant: 3, ring: 1, isNew: true,
      description: 'AI-generated UI designs from text descriptions. Useful for rapid ideation, exploring layout alternatives, and generating starting points for design iteration.',
    },
    {
      id: generateId(), name: 'AI Usability Testing', quadrant: 3, ring: 1, isNew: true,
      description: 'Automated heuristic evaluation using AI models to identify potential usability issues, accessibility gaps, and interaction problems before user testing.',
    },
    {
      id: generateId(), name: 'Vercel v0', quadrant: 3, ring: 1, isNew: true,
      description: 'AI-powered UI generation from text and image prompts. Produces React/Tailwind code that can serve as a rapid prototyping bridge between design and code.',
    },
    {
      id: generateId(), name: 'AI Accessibility Auditing', quadrant: 3, ring: 1, isNew: true,
      description: 'AI-enhanced accessibility checking that goes beyond automated rule-based scans to identify contextual and experiential accessibility issues.',
    },

    // Assess
    {
      id: generateId(), name: 'Generative UI', quadrant: 3, ring: 2, isNew: true,
      description: 'Real-time AI-generated interfaces that adapt to user context, preferences, and intent. Raises fundamental questions about design consistency and user control.',
    },
    {
      id: generateId(), name: 'Voice UI Patterns', quadrant: 3, ring: 2, isNew: false,
      description: 'Conversational interface design patterns for voice assistants and voice-first experiences. Critical for multimodal and ambient computing contexts.',
    },
    {
      id: generateId(), name: 'AR Prototyping', quadrant: 3, ring: 2, isNew: true,
      description: 'Spatial computing prototyping tools for augmented reality experiences. Apple Vision Pro and similar devices are creating demand for spatial UX expertise.',
    },
    {
      id: generateId(), name: 'AI Design Critique', quadrant: 3, ring: 2, isNew: true,
      description: 'AI-powered design review providing feedback on visual hierarchy, spacing, accessibility, and adherence to design system guidelines.',
    },

    // Hold
    {
      id: generateId(), name: 'Fully Autonomous Design', quadrant: 3, ring: 3, isNew: false,
      description: 'End-to-end AI-generated design without human oversight. Current AI lacks the contextual understanding, ethical judgment, and empathy required for human-centered design.',
    },
    {
      id: generateId(), name: 'AI-Only User Research', quadrant: 3, ring: 3, isNew: false,
      description: 'Replacing human research participants with AI-simulated users. Synthetic users cannot replicate real human behavior, emotions, and lived experiences.',
    },
    {
      id: generateId(), name: 'Blockchain in UX', quadrant: 3, ring: 3, isNew: false,
      description: 'Cryptocurrency wallet integration and blockchain-based features in mainstream consumer interfaces. The UX overhead remains prohibitive for most use cases.',
    },
  ];
}

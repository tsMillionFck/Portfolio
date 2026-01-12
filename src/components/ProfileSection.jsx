export default function ProfileSection() {
  const TIERS = [
    {
      title: '1. The "Intelligence" Tier (AI & Autonomous Systems)',
      description:
        "Engineering autonomous systems that reason, remember, and adapt. Focusing on LLM context management, RAG pipelines, and agentic behaviors.",
      projects: [
        {
          name: "The Mio Project",
          desc: 'Flagship AI agent platform (The "General").',
        },
        {
          name: "AI - Sales Qualification Engine",
          desc: "B2B automation and data scoring.",
        },
        {
          name: "Autonomous Content Re-purposer",
          desc: "Heavy task queuing and media AI.",
        },
        {
          name: "Blog App with Past Interaction",
          desc: "Demonstrates Long-term Memory (RAG).",
        },
        {
          name: "AI-PowerRecipe & AI-Quiz",
          desc: "Consumer-facing AI utility.",
        },
        {
          name: "Book Suggestion Engine",
          desc: "Recommendation logic and semantic search.",
        },
      ],
    },
    {
      title: '2. The "Real-Time & Enterprise" Tier (High Stakes)',
      description:
        "Architecting high-stakes environments where latency matters. Specific focus on secure financial data flow, webhooks, and live state synchronization.",
      projects: [
        {
          name: "Real-Time Stripe Dashboard",
          desc: "Financial data visualization and Webhooks.",
        },
        {
          name: "Collaboration Design Canvas",
          desc: "Socket.io and real-time state syncing.",
        },
        {
          name: "Chat Application (Internship & Current)",
          desc: "High-speed messaging architecture.",
        },
        {
          name: "Interactive Map & InfoGraphs",
          desc: "Large-scale data visualization (D3.js).",
        },
        {
          name: "E-commerce Suite (01, 02, 03)",
          desc: "Payment gateways, cart logic, and inventory.",
        },
      ],
    },
    {
      title: '3. The "Swiss Design" Tier (UI/UX Motion Mastery)',
      description:
        "Crafting interfaces that feel physical. Utilizing advanced motion libraries to create interactions that are precise, weighted, and essential.",
      projects: [
        {
          name: "The Swiss Component Library",
          desc: "Framer Motion & reusable physics components.",
        },
        {
          name: "UI Design Giver",
          desc: "An application that generates aesthetics (Bento, Glassmorphism).",
        },
        {
          name: "The Portfolio",
          desc: 'Your personal "Swiss Minimalist" showcase.',
        },
        {
          name: "Landing Page Series",
          desc: "Demonstrating 5+ styles (Minimalism, Brutalism, Glassmorphism).",
        },
      ],
    },
    {
      title: '4. The "Productivity & Logic" Tier (Core Mastery)',
      description:
        "Deep mastery of the fundamentals. Robust state management, local persistence, and efficient CRUD operations form the bedrock of reliable software.",
      projects: [
        {
          name: "The Mind Map",
          desc: "Complex UI relationships and canvas logic.",
        },
        {
          name: "One Journal",
          desc: "Persistent data, rich text, and user privacy.",
        },
        {
          name: "Budget & Expense Trackers",
          desc: "CRUD operations and data calculation.",
        },
        {
          name: "Music Player 2.0",
          desc: "Asset handling and audio API controls.",
        },
        {
          name: "Weather & News Apps",
          desc: "Third-party API integration and rapid data fetching.",
        },
      ],
    },
  ];

  return (
    <div className="col-span-2 max-lg:col-span-1 bg-bauhaus-yellow p-[4vw] max-md:p-[40px_20px]">
      <div>
        <span className="font-body text-xs font-bold uppercase tracking-wider mb-4 block text-black">
          PHILOSOPHY
        </span>
        <p className="font-display text-xl leading-[1.6] text-black mb-8">
          True engineering lies in the details. It's about designing systems
          that are resilient, scalable, and intuitive. My work bridges the gap
          between complex backend logic and fluid frontend interactions,
          ensuring that every pixel serves a purpose and every function performs
          efficiently.
        </p>
      </div>

      <div className="mt-8 text-black flex flex-col gap-6">
        {TIERS.map((tier, index) => (
          <div
            key={index}
            className="interactable p-5 border-2 border-black/20 rounded-lg transition-all duration-300 hover:bg-black/5 hover:border-black cursor-pointer"
          >
            <h3 className="font-display text-lg font-bold mb-2 break-words">
              {tier.title}
            </h3>
            <p className="font-body text-sm text-black/70 mb-4 italic">
              {tier.description}
            </p>
            <ul className="flex flex-col gap-1.5">
              {tier.projects.map((project, idx) => (
                <li key={idx} className="font-body text-sm">
                  <span className="font-bold text-black/90">
                    {project.name}:
                  </span>{" "}
                  <span className="text-black/80">{project.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 text-black">
        <span className="font-body text-xs font-bold uppercase tracking-wider mb-4 block text-black">
          THE BUILDER'S STANDARD
        </span>
        <p className="font-display text-xl leading-[1.6] text-black mb-4">
          Complexity doesn't scare me; usually, it invites me.
        </p>
        <p className="font-body text-base leading-[1.6] text-black/80 mb-6">
          I look for problems that require architectural discipline and
          technical creativity to solve. Let's build something lasting.
        </p>
        <span className="interactable font-display text-2xl font-bold border-b-2 border-black cursor-pointer hover:text-bauhaus-red transition-colors duration-200">
          Let's Forge Your Foundation.
        </span>
      </div>
    </div>
  );
}

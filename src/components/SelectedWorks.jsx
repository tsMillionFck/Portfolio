import { useState } from "react";
import ProjectCard from "./projects/ProjectCard";
import ProjectDrawer from "./projects/ProjectDrawer";
import RealTimeEnterprisePage from "./projects/RealTimeEnterprisePage";
import IntelligencePage from "./projects/IntelligencePage";
import ProjectPageTemplate from "./projects/ProjectPageTemplate";
import ProjectHoverWidget from "./projects/ProjectHoverWidget";
import JournalPage from "./projects/JournalPage";
import MioPage from "./projects/MioPage";
import ChatPage from "./projects/ChatPage";
import MindMapPage from "./projects/MindMapPage";
import UILibraryPage from "./projects/UILibraryPage";
import MioPipelinePage from "./projects/MioPipelinePage";

// Featured Grid Projects (Row 1)
const gridProjects = [
  {
    category: "AI / AGENTIC",
    title: "The Mio Project",
    shapeStyle: {
      background: "var(--yellow)",
      borderRadius: "50%",
    },
    hasPage: "mio",
    reference: "Agentic Intelligence",
  },
  {
    category: "TYPOGRAPHY",
    title: "One-Journal",
    shapeStyle: {
      background: "var(--ink)",
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    },
    hasPage: "journal",
    reference: "Daily Writing",
  },
  {
    category: "AI / AGENTIC",
    title: "The Mind Map",
    shapeStyle: {
      background: "var(--red)",
      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
    },
    hasPage: "mindmap",
    reference: "Knowledge Graph",
  },

  {
    category: "AI / PIPELINE",
    title: "Mio-Pipeline",
    shapeStyle: {
      background: "#1a1b26",
      border: "2px solid #bb9af7",
      borderRadius: "4px",
    },
    hasPage: "miopipeline",
    reference: "Visual Graph Engine",
  },
  {
    category: "COMMUNICATION",
    title: "Chat App",
    shapeStyle: {
      background: "var(--green, #00FF94)",
      clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
    },
    hasPage: "chat",
    reference: "Real-time Comm",
  },
];

// Drawer Projects (Catalog)
const drawerProjects = [
  // THE PROJECTS
  {
    number: "06",
    category: "THE PROJECTS",
    title: "The Real Tracker",
    description:
      "Financial dashboard designing to track runway and financial freedom with a raw, Neo-Brutalist industrial aesthetic.",
    longDescription:
      "Core Architecture: Full-stack MERN (MongoDB, Express, React, Node) application. / Financial Logic: Implements complex calculations for 'Runway' and 'Financial Freedom' status. / Dashboard Features: Includes a 'Log' card, 'Command Grid' for entries, and technical charts. / Authentication: Secure sessions with JWT and bcryptjs. / Design: Neo-Brutalist style with #e0e7ff backgrounds and 4px black borders.",
    visual: <ProjectHoverWidget type="budget" />,
    techStack: [
      { name: "MongoDB", type: "backend" },
      { name: "Express", type: "backend" },
      { name: "React", type: "frontend" },
      { name: "Node.js", type: "backend" },
      { name: "JWT", type: "backend" },
      { name: "bcryptjs", type: "backend" },
    ],
    buttonText: "VIEW",
    demoUrl: "https://the-real-tracker-psi.vercel.app",
  },
  {
    number: "07",
    category: "THE PROJECTS",
    title: "musicPlayer3.0",
    description:
      "A Swiss International Style music player featuring dynamic theming and high-contrast typographic interaction.",
    longDescription:
      "Core Architecture: React 19 and Vite, leveraging Tailwind CSS 4 for styling. / Dynamic Theming: Uses colorthief to extract dominant colors from album covers. / Titan Background: Massive scrolling marquee displays song titles. / Design: Minimalist Swiss style with rotating cross animations and grayscale filters. / Interaction: includes a 'Spark Canvas' for particle effects.",
    visual: <ProjectHoverWidget type="music" />,
    techStack: [
      { name: "React 19", type: "frontend" },
      { name: "Tailwind v4", type: "frontend" },
      { name: "Colorthief", type: "frontend" },
      { name: "Vite", type: "frontend" },
    ],
    buttonText: "OPEN",
    demoUrl: "https://napster-three.vercel.app",
  },
  {
    number: "08",
    category: "THE PROJECTS",
    title: "WeatherForcast",
    description:
      "An immersive environmental dashboard with state-driven UI and animated weather visualizations.",
    longDescription:
      "Purpose: An immersive environmental dashboard. / State-Driven UI: Changes its entire CSS class based on weather data (e.g., weather-storm). / Animated Weather: Implements custom keyframe animations for sun, clouds, and rain. / Information Ticker: Bottom-running news ticker for alerts. / Design: Neo-Retro palette with Courier New fonts and collapsible detail panels.",
    visual: <ProjectHoverWidget type="weather" />,
    techStack: [
      { name: "React 19", type: "frontend" },
      { name: "Vite", type: "frontend" },
      { name: "CSS Modules", type: "frontend" },
      { name: "Courier New", type: "frontend" },
    ],
    buttonText: "FORECAST",
    demoUrl: "https://weather-forcast-umber.vercel.app",
  },

  // THE INTELLIGENCE
  {
    number: "09",
    category: "THE INTELLIGENCE",
    title: "VibeRead AI",
    description:
      "Semantic book discovery engine that processes natural language 'vibes' to match your emotional reading needs.",
    longDescription:
      "Core Architecture: React 18 and Vite with Tailwind CSS. / Semantic Search: Processes natural language 'vibes' instead of searching by title. / AI Service Integration: Uses language models to match book summaries to user descriptions. / Design: 'Minimalist Librarian' aesthetic with Zinc-950 dark theme. / Interaction: Smooth transitions revealing synopses and similarity discovery.",
    visual: <ProjectHoverWidget type="book" />,
    techStack: [
      { name: "React 18", type: "frontend" },
      { name: "Vite", type: "frontend" },
      { name: "Tailwind", type: "frontend" },
      { name: "AI AI-Service", type: "backend" },
    ],
    buttonText: "ASK AI",
    demoUrl: "https://book-suggestion-ai.vercel.app",
  },
  {
    number: "10",
    category: "THE INTELLIGENCE",
    title: "AI-QUIZ (Wized Quiz)",
    description:
      "Bento-styled gamified learning platform with AI-generated questions and high-frequency feedback loops.",
    longDescription:
      "Core Architecture: React 19, Lucide React, and Canvas Confetti. / Smart Generation: Connects to an AI backend to generate questions on any subject. / Game Loop: Correct/Incorrect audio feedback and progress bars. / Feedback: Confetti bursts on completion and skeletal loading states. / Design: Bento-styled with 32px rounded corners and purple accents (#8b5cf6).",
    visual: <ProjectHoverWidget type="quiz" />,
    techStack: [
      { name: "React 19", type: "frontend" },
      { name: "Lucide React", type: "frontend" },
      { name: "Canvas Confetti", type: "frontend" },
      { name: "AI-Generator", type: "backend" },
    ],
    buttonText: "START",
    demoUrl: "https://ai-quiz-kappa-five.vercel.app",
  },

  // REAL TIME & ENTERPRISE
  {
    number: "11",
    category: "REAL TIME",
    title: "Mio-Spatial",
    description:
      "Clinical and professional interactive mapping tool for categorized location intelligence and geo-filtering.",
    longDescription:
      "Core Architecture: Vanilla JavaScript and Leaflet.js. / Geo-Filtering: Filter map pins by category (Work, Food, Nature, Fun) using Filter Chips. / Sidebar Sync: Map interactions automatically highlight corresponding items in the sidebar. / Location Intelligence: 'Locate Me' feature and custom popup-content templates. / Design: Clinical theme with Inter font and clear sidebar separation.",
    visual: <ProjectHoverWidget type="map" />,
    techStack: [
      { name: "Vanilla JS", type: "frontend" },
      { name: "Leaflet.js", type: "frontend" },
      { name: "Inter Font", type: "frontend" },
    ],
    buttonText: "EXPLORE",
    demoUrl: "https://interactive-info-graphs.vercel.app",
  },
  {
    number: "12",
    category: "REAL TIME",
    title: "Orbital Debris Tracker",
    description:
      "NASA-inspired scientific tracker visualizing space pollution history through timeline scrubbing and orbit simulation.",
    longDescription:
      "Purpose: Historical visualization of space pollution. / Timeline Scrubbing: Range slider updates charts synchronously from 1960 to 2020. / Multi-View Charts: Uses Chart.js to toggle between Line, Bar, and Pie representations. / Simulation: Central canvas orbit system populating with debris dots. / Design: NASA-inspired 'Scientific' theme with large year displays.",
    visual: <ProjectHoverWidget type="infograph" />,
    techStack: [
      { name: "JavaScript", type: "frontend" },
      { name: "Chart.js", type: "frontend" },
      { name: "HTML5 Canvas", type: "frontend" },
      { name: "NASA Data API", type: "backend" },
    ],
    buttonText: "ANALYZE",
    demoUrl: "https://interactive-info-graphs-aymy.vercel.app",
  },

  // DESIGN MENU
  {
    number: "13",
    category: "DESIGN MENU",
    title: "UI Design Giver",
    description:
      "A dual-step AI meta-tool that generates design concepts and live CSS previews for provided layouts.",
    longDescription:
      "Core Architecture: React 19, Google Generative AI (Gemini). / Dual-Step AI Generation: First generates 3 design concepts, then applies them to user HTML/JSX via generated CSS. / Live Preview: Sandboxed real-time rendering of generated CSS. / Design: Neutral grayscale aesthetic (Slate-50) focusing on generated content.",
    visual: <ProjectHoverWidget type="design_giver" />,
    techStack: [
      { name: "React 19", type: "frontend" },
      { name: "Gemini AI", type: "backend" },
      { name: "Tailwind CSS", type: "frontend" },
      { name: "Lucide React", type: "frontend" },
    ],

    buttonText: "GENERATE",
    demoUrl: "https://design-gen-eight.vercel.app",
  },
  {
    number: "14",
    category: "DESIGN MENU",
    title: "UI/UX Library",
    description:
      "A curated Design Encyclopedia. Explore, visualize, and implement distinct web design aesthetics from Swiss Style to Neo-Brutalism.",
    longDescription:
      "Core Architecture: React 18 / Vite. / Purpose: A living documentation for UI trends. / Features: Interactive Catalog to switch design schools, Live Rendering of components, and Context-Aware backgrounds. / Design Schools: Structuralists, Morphisms, and Extremists.",
    visual: <ProjectHoverWidget type="library" />,
    techStack: [
      { name: "React 18", type: "frontend" },
      { name: "Vite", type: "frontend" },
      { name: "Tailwind", type: "frontend" },
    ],
    buttonText: "BROWSE",
    hasPage: "library",
    demoUrl: "https://ui-library-x.vercel.app",
  },
];

export default function SelectedWorks() {
  // Grid project pages state
  const [realTimeOpen, setRealTimeOpen] = useState(false);
  const [intelligenceOpen, setIntelligenceOpen] = useState(false);
  const [mioOpen, setMioOpen] = useState(false);
  const [journalOpen, setJournalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [mindMapOpen, setMindMapOpen] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [mioPipelineOpen, setMioPipelineOpen] = useState(false);

  // Drawer project pages state
  const [activeDrawerProject, setActiveDrawerProject] = useState(null);

  const handleProjectClick = (pageType) => {
    if (pageType === "flux") setRealTimeOpen(true);
    if (pageType === "cortex") setIntelligenceOpen(true);
    if (pageType === "mio") setMioOpen(true);
    if (pageType === "journal") setJournalOpen(true);
    if (pageType === "chat") setChatOpen(true);
    if (pageType === "mindmap") setMindMapOpen(true);
    if (pageType === "library") setLibraryOpen(true);
    if (pageType === "miopipeline") setMioPipelineOpen(true);
  };

  return (
    <>
      {/* Grid Project Pages */}
      <RealTimeEnterprisePage
        isOpen={realTimeOpen}
        onClose={() => setRealTimeOpen(false)}
      />
      <IntelligencePage
        isOpen={intelligenceOpen}
        onClose={() => setIntelligenceOpen(false)}
      />
      <MioPage isOpen={mioOpen} onClose={() => setMioOpen(false)} />
      <ChatPage isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      <JournalPage isOpen={journalOpen} onClose={() => setJournalOpen(false)} />
      <MindMapPage isOpen={mindMapOpen} onClose={() => setMindMapOpen(false)} />
      <UILibraryPage
        isOpen={libraryOpen}
        onClose={() => setLibraryOpen(false)}
      />
      <MioPipelinePage
        isOpen={mioPipelineOpen}
        onClose={() => setMioPipelineOpen(false)}
      />

      {/* Reusable Drawer Project Modal */}
      <ProjectPageTemplate
        isOpen={!!activeDrawerProject}
        onClose={() => setActiveDrawerProject(null)}
        project={activeDrawerProject}
      />

      {/* Section Header */}
      <div
        id="work"
        className="grid grid-cols-5 w-full border-t-2 border-b-2 border-line bg-bg transition-colors duration-500 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1"
      >
        <div className="col-span-5 max-xl:col-span-3 max-lg:col-span-2 max-md:col-span-1 min-h-[100px] bg-ink text-bg p-[4vw]">
          <h2 className="font-display text-[2rem] text-bg">Selected Works</h2>
        </div>
      </div>

      {/* Featured Projects Grid (5 Columns) */}
      <div className="grid grid-cols-5 w-full border-b-2 border-line bg-bg transition-colors duration-500 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
        {gridProjects.map((project, index) => (
          <div
            key={index}
            onClick={
              project.hasPage && !project.url
                ? () => handleProjectClick(project.hasPage)
                : undefined
            }
            className="h-full"
          >
            <ProjectCard
              category={project.category}
              title={project.title}
              shapeStyle={project.shapeStyle}
              href={project.url || "#"}
              reference={project.reference}
            />
          </div>
        ))}
      </div>

      {/* Drawer Projects (Catalog) */}
      <div className="flex flex-col p-0 border-t-2 border-line w-full">
        {drawerProjects.map((project, index) => (
          <ProjectDrawer
            key={index}
            number={project.number}
            category={project.category}
            title={project.title}
            description={project.description}
            visual={project.visual}
            techStack={project.techStack}
            buttonText={project.buttonText}
            onClick={() =>
              project.hasPage
                ? handleProjectClick(project.hasPage)
                : setActiveDrawerProject(project)
            }
            demoUrl={project.demoUrl}
          />
        ))}
      </div>
    </>
  );
}

import { useState } from "react";
import ProjectCard from "./projects/ProjectCard";
import ProjectDrawer from "./projects/ProjectDrawer";
import MewoMiniPlayer from "./projects/MewoMiniPlayer";
import WeatherCard from "./projects/WeatherCard";
import RealTimeEnterprisePage from "./projects/RealTimeEnterprisePage";
import IntelligencePage from "./projects/IntelligencePage";
import MewoPage from "./projects/MewoPage";
import JournalPage from "./projects/JournalPage";
import ClimatePage from "./projects/ClimatePage";
import MioPage from "./projects/MioPage";
import ChatPage from "./projects/ChatPage";
import MindMapPage from "./projects/MindMapPage";
import UILibraryPage from "./projects/UILibraryPage";

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
    category: "DESIGN / LIBRARY",
    title: "UI/UX Library",
    shapeStyle: {
      background: "var(--blue)",
      borderRadius: "20px",
    },
    hasPage: "library",
    reference: "Design System",
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
    title: "Budget Tracker",
    description: "Expense management",
    visual: (
      <div className="w-full h-full bg-red-500 rounded-lg opacity-20"></div>
    ),
    techStack: [
      { name: "React", type: "frontend" },
      { name: "Vite", type: "frontend" },
      { name: "Tailwind", type: "frontend" },
    ],
    buttonText: "VIEW",
    demoUrl: "https://the-real-tracker-psi.vercel.app",
  },
  {
    number: "07",
    category: "THE PROJECTS",
    title: "Music Player 2",
    description: "Typographic player",
    visual: <MewoMiniPlayer />,
    techStack: [
      { name: "React", type: "frontend" },
      { name: "Tailwind", type: "frontend" },
      { name: "Express", type: "backend" },
    ],
    buttonText: "OPEN",
    pageKey: "mewo", // Keeping internal link for demo if needed
    demoUrl: "https://napster-three.vercel.app",
  },
  {
    number: "08",
    category: "THE PROJECTS",
    title: "Weather Forecast",
    description: "News & Climate",
    visual: <WeatherCard />,
    techStack: [
      { name: "React", type: "frontend" },
      { name: "API", type: "backend" },
    ],
    buttonText: "FORECAST",
    pageKey: "climate",
    demoUrl: "https://weather-forcast-umber.vercel.app",
  },

  // THE INTELLIGENCE
  {
    number: "09",
    category: "THE INTELLIGENCE",
    title: "Book Suggestion",
    description: "AI Recommendation Engine",
    visual: (
      <div className="w-full h-full bg-blue-500 rounded-lg opacity-20"></div>
    ),
    techStack: [
      { name: "AI", type: "backend" },
      { name: "React", type: "frontend" },
    ],
    buttonText: "ASK AI",
    demoUrl: "https://book-suggestion-ai.vercel.app",
  },
  {
    number: "10",
    category: "THE INTELLIGENCE",
    title: "AI Quiz",
    description: "Knowledge Assessment",
    visual: (
      <div className="w-full h-full bg-purple-500 rounded-lg opacity-20"></div>
    ),
    techStack: [
      { name: "React", type: "frontend" },
      { name: "Gemini", type: "backend" },
    ],
    buttonText: "START",
    demoUrl: "https://ai-quiz-kappa-five.vercel.app",
  },

  // REAL TIME & ENTERPRISE
  {
    number: "11",
    category: "REAL TIME",
    title: "Interactive Map",
    description: "Data Visualization",
    visual: (
      <div className="w-full h-full bg-green-500 rounded-lg opacity-20"></div>
    ),
    techStack: [
      { name: "Leaflet", type: "frontend" },
      { name: "D3.js", type: "frontend" },
    ],
    buttonText: "EXPLORE",
    demoUrl: "https://interactive-info-graphs.vercel.app",
  },
  {
    number: "12",
    category: "REAL TIME",
    title: "InfoGraph",
    description: "Visual Analytics",
    visual: (
      <div className="w-full h-full bg-orange-500 rounded-lg opacity-20"></div>
    ),
    techStack: [
      { name: "React", type: "frontend" },
      { name: "Recharts", type: "frontend" },
    ],
    buttonText: "ANALYZE",
    demoUrl: "https://interactive-info-graphs-aymy.vercel.app",
  },

  // DESIGN MENU
  {
    number: "13",
    category: "DESIGN MENU",
    title: "UI Design Giver",
    description: "Generative Design",
    visual: (
      <div className="w-full h-full bg-pink-500 rounded-lg opacity-20"></div>
    ),
    techStack: [
      { name: "AI", type: "backend" },
      { name: "Tailwind", type: "frontend" },
    ],
    buttonText: "GENERATE",
    demoUrl: "https://design-gen-eight.vercel.app",
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

  // Drawer project pages state
  const [mewoOpen, setMewoOpen] = useState(false);
  const [climateOpen, setClimateOpen] = useState(false);

  const handleProjectClick = (pageType) => {
    if (pageType === "flux") setRealTimeOpen(true);
    if (pageType === "cortex") setIntelligenceOpen(true);
    if (pageType === "mio") setMioOpen(true);
    if (pageType === "journal") setJournalOpen(true);
    if (pageType === "chat") setChatOpen(true);
    if (pageType === "mindmap") setMindMapOpen(true);
    if (pageType === "library") setLibraryOpen(true);
  };

  const handleDrawerClick = (pageKey) => {
    if (pageKey === "mewo") setMewoOpen(true);
    if (pageKey === "journal") setJournalOpen(true);
    if (pageKey === "climate") setClimateOpen(true);
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

      {/* Drawer Project Pages */}
      <MewoPage isOpen={mewoOpen} onClose={() => setMewoOpen(false)} />
      <ClimatePage isOpen={climateOpen} onClose={() => setClimateOpen(false)} />

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
            onClick={
              project.pageKey
                ? () => handleDrawerClick(project.pageKey)
                : undefined
            }
            demoUrl={project.demoUrl}
          />
        ))}
      </div>
    </>
  );
}

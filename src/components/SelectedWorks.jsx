import { useState } from "react";
import ProjectCard from "./projects/ProjectCard";
import ProjectDrawer from "./projects/ProjectDrawer";
import MewoMiniPlayer from "./projects/MewoMiniPlayer";
import JournalSheet from "./projects/JournalSheet";
import AuthCard from "./projects/AuthCard";
import WeatherCard from "./projects/WeatherCard";
import NodeCard from "./projects/NodeCard";
import FluxPage from "./projects/FluxPage";
import OrbitPage from "./projects/OrbitPage";
import CortexPage from "./projects/CortexPage";
import MonoPage from "./projects/MonoPage";

const gridProjects = [
  {
    category: "FINTECH / APP",
    title: "Flux",
    shapeStyle: { background: "var(--red)", borderRadius: "50%" },
    hasPage: "flux",
  },
  {
    category: "WEBGL",
    title: "Orbit",
    shapeStyle: { background: "var(--blue)" },
    hasPage: "orbit",
  },
  {
    category: "AI / LLM",
    title: "Cortex",
    shapeStyle: {
      background: "var(--yellow)",
      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
    },
    hasPage: "cortex",
  },
  {
    category: "SYSTEM",
    title: "Mono",
    shapeStyle: { background: "var(--ink)", borderRadius: "20px" },
    hasPage: "mono",
  },
];

const drawerProjects = [
  {
    number: "06",
    category: "MUSIC",
    title: "Mewo",
    description: "Typographic music player",
    visual: <MewoMiniPlayer />,
    techStack: [
      { name: "React", type: "frontend" },
      { name: "Vite", type: "frontend" },
      { name: "TailwindCSS", type: "frontend" },
      { name: "Node.js", type: "backend" },
      { name: "Express", type: "backend" },
    ],
    buttonText: "OPEN",
  },
  {
    number: "07",
    category: "TYPOGRAPHY",
    title: "Journal",
    description: "Daily writing app",
    visual: <JournalSheet />,
    techStack: [
      { name: "React 19", type: "frontend" },
      { name: "Vite", type: "frontend" },
      { name: "Tailwind v4", type: "frontend" },
      { name: "GSAP", type: "tool" },
      { name: "ESLint", type: "tool" },
    ],
    buttonText: "WRITE",
  },
  {
    number: "08",
    category: "SECURITY",
    title: "Terminal",
    description: "Auth system",
    visual: <AuthCard />,
    techStack: [
      { name: "React 19", type: "frontend" },
      { name: "Vite", type: "frontend" },
      { name: "Node.js", type: "backend" },
      { name: "Express", type: "backend" },
      { name: "MongoDB", type: "backend" },
      { name: "JWT", type: "backend" },
    ],
    buttonText: "LOGIN",
  },
  {
    number: "09",
    category: "API",
    title: "Climate",
    description: "Weather dashboard",
    visual: <WeatherCard />,
    techStack: [
      { name: "React", type: "frontend" },
      { name: "Vite", type: "frontend" },
      { name: "Vanilla CSS", type: "frontend" },
      { name: "ESLint", type: "tool" },
      { name: "npm", type: "tool" },
    ],
    buttonText: "FORECAST",
  },
  {
    number: "10",
    category: "CANVAS",
    title: "Synapse",
    description: "Mind mapping tool",
    visual: <NodeCard />,
    techStack: [
      { name: "React 19", type: "frontend" },
      { name: "Zustand", type: "frontend" },
      { name: "React Markdown", type: "frontend" },
      { name: "Vite", type: "frontend" },
      { name: "Tailwind v4", type: "frontend" },
      { name: "PostCSS", type: "tool" },
    ],
    buttonText: "CONNECT",
  },
];

export default function SelectedWorks() {
  const [fluxOpen, setFluxOpen] = useState(false);
  const [orbitOpen, setOrbitOpen] = useState(false);
  const [cortexOpen, setCortexOpen] = useState(false);
  const [monoOpen, setMonoOpen] = useState(false);

  const handleProjectClick = (pageType) => {
    if (pageType === "flux") setFluxOpen(true);
    if (pageType === "orbit") setOrbitOpen(true);
    if (pageType === "cortex") setCortexOpen(true);
    if (pageType === "mono") setMonoOpen(true);
  };

  return (
    <>
      {/* Project Pages */}
      <FluxPage isOpen={fluxOpen} onClose={() => setFluxOpen(false)} />
      <OrbitPage isOpen={orbitOpen} onClose={() => setOrbitOpen(false)} />
      <CortexPage isOpen={cortexOpen} onClose={() => setCortexOpen(false)} />
      <MonoPage isOpen={monoOpen} onClose={() => setMonoOpen(false)} />

      {/* Section Header */}
      <div
        id="work"
        className="grid grid-cols-4 w-full border-t-2 border-b-2 border-line bg-bg transition-colors duration-500 max-lg:grid-cols-2 max-md:grid-cols-1"
      >
        <div className="col-span-4 max-lg:col-span-2 max-md:col-span-1 min-h-[100px] bg-ink text-bg p-[4vw]">
          <h2 className="font-display text-[2rem] text-bg">Selected Works</h2>
        </div>
      </div>

      {/* Grid Projects (01-04) */}
      <div className="grid grid-cols-4 w-full border-b-2 border-line bg-bg transition-colors duration-500 max-lg:grid-cols-2 max-md:grid-cols-1">
        {gridProjects.map((project, index) => (
          <div
            key={index}
            onClick={
              project.hasPage
                ? () => handleProjectClick(project.hasPage)
                : undefined
            }
          >
            <ProjectCard
              category={project.category}
              title={project.title}
              shapeStyle={project.shapeStyle}
            />
          </div>
        ))}
      </div>

      {/* Drawer Projects (06-10) */}
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
          />
        ))}
      </div>
    </>
  );
}

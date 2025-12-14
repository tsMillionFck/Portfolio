import { ThemeProvider } from "./contexts/ThemeContext";
import PhysicsCursor from "./components/PhysicsCursor";
import SmoothScroll from "./components/SmoothScroll";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import EyeSection from "./components/EyeSection";
import SelectedWorks from "./components/SelectedWorks";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";

export default function App() {
  return (
    <ThemeProvider>
      <PhysicsCursor />
      <Header />
      <SmoothScroll>
        {/* Spacer for fixed header */}
        <div className="h-20" />

        <HeroSection />
        <EyeSection />
        <SelectedWorks />
        <AboutSection />
        <ContactSection />
      </SmoothScroll>
    </ThemeProvider>
  );
}

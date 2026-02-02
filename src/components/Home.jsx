import PhysicsCursor from "./PhysicsCursor";
import SmoothScroll from "./SmoothScroll";
import Header from "./Header";
import HeroSection from "./HeroSection";
import EyeSection from "./EyeSection";
import SelectedWorks from "./SelectedWorks";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";

export default function Home() {
  return (
    <>
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
    </>
  );
}

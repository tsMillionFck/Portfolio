import AeroCard from "./AeroCard";
import ProfileSection from "./ProfileSection";

export default function AboutSection() {
  return (
    <div
      id="about"
      className="grid grid-cols-4 w-full border-t-2 border-b-2 border-line bg-bg transition-colors duration-500 max-lg:grid-cols-2 max-md:grid-cols-1"
    >
      {/* Aero Card */}
      <div className="col-span-2 max-lg:col-span-1 p-0 min-h-[600px]">
        <AeroCard />
      </div>

      {/* Profile */}
      <ProfileSection />
    </div>
  );
}

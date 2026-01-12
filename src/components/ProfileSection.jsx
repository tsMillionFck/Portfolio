import PhysicsCursor from "./PhysicsCursor";

export default function ProfileSection() {
  const PHILOSOPHY_POINTS = [
    {
      title: "1. Architect (The Skeleton)",
      content:
        "Code without architecture is just a liability. I treat software like a living organism—it needs a robust skeletal structure to scale. My approach is Local-First and AI-Native, ensuring that the systems I build aren't just fast today, but resilient for the infrastructure of 2026.",
      keywords: ["Scalability", "Reliability", "Low-Latency"],
    },
    {
      title: "2. Design (The Skin)",
      content:
        "Design is not an afterthought; it’s the interface of trust. Influenced by Swiss Minimalism and Neo-Brutalism, I prioritize high-density information with zero clutter. I believe in 'The Morphisms'—using glass, shadows, and blurs to create depth and guide the user’s eye without distraction.",
      keywords: ["Aesthetic Integrity", "Hierarchy", "Intentionality"],
    },
    {
      title: "3. Code (The Logic)",
      content:
        "I write Foundational Code. By mastering the low-level mechanics of JavaScript and the 'MERN Evolution' stack, I build abstractions that remain clean and maintainable. To me, a bug is a failure in logic, and performance is a feature, not an optimization.",
      keywords: ["Type-Safety (TS)", "Clean Architecture", "Efficiency"],
    },
    {
      title: "4. Creativity (The Spark)",
      content:
        "Creativity is solving old problems with 'Illegal' solutions. Whether it's using Rage-Click detection to trigger AI interventions or building an Infinite Canvas for non-linear thinking, I use tech as a playground for human-centric innovation.",
      keywords: ["Proactive Logic", "Innovation", "User-Empathy"],
    },
  ];

  return (
    <div className="col-span-2 max-lg:col-span-1 bg-bauhaus-yellow p-[4vw] max-md:p-[40px_20px] relative overflow-hidden">
      {/* Physics Cursor as a distraction within this section */}
      <PhysicsCursor />

      <div className="relative z-10">
        <span className="font-body text-xs font-bold uppercase tracking-wider mb-4 block text-black">
          PHILOSOPHY
        </span>
        <p className="font-display text-xl leading-[1.6] text-black mb-12">
          I build for the next web—where intelligence is native, performance is
          physics, and design is an interface of trust.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 relative z-10">
        {PHILOSOPHY_POINTS.map((point, index) => (
          <div
            key={index}
            className="interactable group p-8 border-2 border-black bg-white/5 transition-all duration-300 hover:bg-white/20 hover:shadow-[8px_8px_0_0_#000] cursor-crosshair"
          >
            <h3 className="font-display text-2xl font-bold mb-3 text-black">
              {point.title}
            </h3>
            <p className="font-body text-base leading-relaxed text-black/80 mb-6 max-w-2xl">
              {point.content}
            </p>
            <div className="flex flex-wrap gap-2">
              {point.keywords.map((keyword, kIndex) => (
                <span
                  key={kIndex}
                  className="px-3 py-1 bg-black text-[10px] uppercase tracking-widest text-white font-bold"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 pt-10 border-t-2 border-black/10 relative z-10">
        <span className="font-body text-xs font-bold uppercase tracking-wider mb-6 block text-black/40">
          NORTH STAR
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold italic leading-tight text-black max-w-xl">
          "Turning raw data noise into meaningful, physics-driven digital
          experiences."
        </h2>
        <div className="mt-12">
          <span className="interactable font-display text-lg font-bold border-b-2 border-black cursor-pointer hover:text-bauhaus-red transition-colors duration-200">
            Let's Forge Your Foundation.
          </span>
        </div>
      </div>
    </div>
  );
}

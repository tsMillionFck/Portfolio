export default function ProfileSection() {
  return (
    <div className="col-span-2 max-lg:col-span-1 bg-bauhaus-yellow p-[4vw] max-md:p-[40px_20px]">
      <div>
        <span className="font-body text-xs font-bold uppercase tracking-wider mb-4 block text-black">
          PHILOSOPHY
        </span>
        <p className="font-display text-xl leading-[1.6] text-black mb-8">
          In the digital realm, speed is not a feature; it is a necessity for
          improvement. We prioritize rapid deployment to initiate the Feedback
          Flywheel faster, ensuring continuous refinement and scale.
        </p>
      </div>

      <div className="mt-8 text-black">
        <div className="flex flex-col gap-4">
          <div className="interactable p-4 border-2 border-black/20 rounded-lg transition-all duration-300 hover:bg-black/10 hover:border-black cursor-pointer">
            <h3 className="font-display text-lg font-bold mb-1">We Create</h3>
            <p className="font-body text-sm opacity-80">
              Forging the first stable version with meticulous care and logic.
            </p>
          </div>
          <div className="interactable p-4 border-2 border-black/20 rounded-lg transition-all duration-300 hover:bg-black/10 hover:border-black cursor-pointer">
            <h3 className="font-display text-lg font-bold mb-1">We Explore</h3>
            <p className="font-body text-sm opacity-80">
              Deploying quickly to gather real-world data and identify knowledge
              gaps.
            </p>
          </div>
          <div className="interactable p-4 border-2 border-black/20 rounded-lg transition-all duration-300 hover:bg-black/10 hover:border-black cursor-pointer">
            <h3 className="font-display text-lg font-bold mb-1">We Expand</h3>
            <p className="font-body text-sm opacity-80">
              Using that data to continuously refine, adapt, and scale the
              architecture.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 text-black">
        <span className="font-body text-xs font-bold uppercase tracking-wider mb-4 block text-black">
          GOT A DIRECTIVE?
        </span>
        <p className="font-display text-xl leading-[1.6] text-black mb-4">
          Time is the only constraint.
        </p>
        <p className="font-body text-base leading-[1.6] text-black/80 mb-6">
          If you have an idea, a vision, or a challenge that requires a
          multidisciplinary mind—contact me now. We will dedicate the necessary
          focus and deliver a tangible prototype within a few hours.
        </p>
        <span className="interactable font-display text-2xl font-bold border-b-2 border-black cursor-pointer hover:text-bauhaus-red transition-colors duration-200">
          Let's Forge Your Foundation.
        </span>
      </div>
    </div>
  );
}

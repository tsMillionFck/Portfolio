export default function ContactSection() {
  return (
    <div
      id="contact"
      className="grid grid-cols-4 w-full border-t-2 border-line bg-bg transition-colors duration-500 max-lg:grid-cols-2 max-md:grid-cols-1"
    >
      {/* Email */}
      <div className="col-span-3 max-lg:col-span-1 border-r-2 border-line py-[100px] px-[4vw] max-md:border-r-0 max-md:p-[40px_20px]">
        <span className="font-body text-xs font-bold uppercase tracking-wider mb-4 block">
          START A PROJECT
        </span>
        <p className="font-mono text-lg text-ink/60 mb-6">
          Any question? Or have an idea?
        </p>
        <a
          href="mailto:admin@mewo-mio.co"
          className="interactable font-display text-[clamp(2rem,6vw,6rem)] text-ink no-underline block leading-none hover:text-bauhaus-blue transition-colors duration-300"
        >
          admin@mewo-mio.co
        </a>
      </div>

      {/* Copyright */}
      <div className="flex justify-end items-end p-[4vw] max-md:p-[40px_20px]">
        <span className="font-body text-xs font-bold uppercase tracking-wider">
          © 2025
        </span>
      </div>
    </div>
  );
}

export default function ProjectCard({
  category,
  title,
  shapeStyle = {},
  href = "#",
  reference,
}) {
  return (
    <div className="h-full border-r-2 border-line min-h-[200px] p-[4vw] flex flex-col justify-between relative overflow-hidden transition-colors duration-300 hover:bg-ink hover:text-bg group max-md:border-r-0 max-md:p-[40px_20px]">
      {href && href !== "#" ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="interactable no-underline text-inherit h-full flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div
              className="w-[60px] h-[60px] bg-ink mb-5 transition-transform duration-300 group-hover:scale-[1.2] group-hover:rotate-[10deg] group-hover:bg-bg"
              style={shapeStyle}
            />
            <span className="font-body text-xs font-bold uppercase tracking-wider mb-4 block transition-colors duration-300 group-hover:text-bg group-hover:opacity-70">
              {category}
            </span>
            <h2 className="font-display text-[clamp(1.5rem,2.5vw,2.5rem)] m-0 relative z-10 transition-colors duration-500">
              {title}
            </h2>
          </div>
          <div className="mt-10 relative">
            <span className="transition-opacity duration-300 group-hover:opacity-0 absolute left-0">
              ↗ VIEW CASE
            </span>
            <span className="transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute left-0 font-body text-xs font-bold uppercase tracking-wider">
              {reference}
            </span>
          </div>
        </a>
      ) : (
        <div className="interactable h-full flex flex-col justify-between cursor-pointer">
          <div>
            <div
              className="w-[60px] h-[60px] bg-ink mb-5 transition-transform duration-300 group-hover:scale-[1.2] group-hover:rotate-[10deg] group-hover:bg-bg"
              style={shapeStyle}
            />
            <span className="font-body text-xs font-bold uppercase tracking-wider mb-4 block transition-colors duration-300 group-hover:text-bg group-hover:opacity-70">
              {category}
            </span>
            <h2 className="font-display text-[clamp(1.5rem,2.5vw,2.5rem)] m-0 relative z-10 transition-colors duration-500">
              {title}
            </h2>
          </div>
          <div className="mt-10 relative">
            <span className="transition-opacity duration-300 group-hover:opacity-0 absolute left-0">
              ↗ VIEW CASE
            </span>
            <span className="transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute left-0 font-body text-xs font-bold uppercase tracking-wider">
              {reference}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

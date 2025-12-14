export default function ProjectCard({
  category,
  title,
  shapeStyle = {},
  href = "#",
}) {
  return (
    <div className="border-r-2 border-line min-h-[200px] p-[4vw] flex flex-col justify-between relative overflow-hidden transition-colors duration-300 hover:bg-ink hover:text-bg group max-md:border-r-0 max-md:p-[40px_20px]">
      <a
        href={href}
        className="interactable no-underline text-inherit h-full flex flex-col justify-between"
      >
        <div>
          <div
            className="w-[60px] h-[60px] bg-ink mb-5 transition-transform duration-300 group-hover:scale-[1.2] group-hover:rotate-[10deg] group-hover:bg-bg"
            style={shapeStyle}
          />
          <span className="font-body text-xs font-bold uppercase tracking-wider mb-4 block transition-colors duration-300 group-hover:text-bg group-hover:opacity-70">
            {category}
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] m-0 relative z-10 transition-colors duration-500">
            {title}
          </h2>
        </div>
        <div className="mt-10">↗ VIEW CASE</div>
      </a>
    </div>
  );
}

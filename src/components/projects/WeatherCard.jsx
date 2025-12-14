export default function WeatherCard() {
  return (
    <div className="w-[140px] h-[160px] bg-white border-2 border-ink shadow-[6px_6px_0_var(--ink)] flex flex-col transition-all duration-300 group-hover:translate-y-[-5px] group-hover:shadow-[10px_10px_0_var(--ink)]">
      {/* Main Section */}
      <div className="flex-1 bg-bauhaus-blue flex flex-col items-center justify-center border-b-2 border-ink text-white group-hover:bg-ink">
        {/* Sun Icon */}
        <div className="w-[30px] h-[30px] bg-bauhaus-yellow border-2 border-ink rounded-full mb-2.5 shadow-[2px_2px_0_rgba(0,0,0,0.2)] group-hover:bg-bg group-hover:border-bg" />

        {/* Temperature */}
        <div className="font-['Arial_Black',sans-serif] text-[1.8rem] leading-[0.9] group-hover:text-bauhaus-yellow">
          24°
        </div>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-2 bg-white h-[60px]">
        <div className="flex flex-col justify-center pl-2.5 border-r-2 border-ink">
          <span className="text-[0.5rem] font-bold underline text-[#888] mb-0.5 uppercase">
            HUMIDITY
          </span>
          <span className="font-['Arial_Black',sans-serif] text-[0.8rem] text-ink">
            42%
          </span>
        </div>
        <div className="flex flex-col justify-center pl-2.5">
          <span className="text-[0.5rem] font-bold underline text-[#888] mb-0.5 uppercase">
            WIND
          </span>
          <span className="font-['Arial_Black',sans-serif] text-[0.8rem] text-ink">
            12K
          </span>
        </div>
      </div>
    </div>
  );
}

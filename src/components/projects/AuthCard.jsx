export default function AuthCard() {
  return (
    <div className="w-[140px] h-[170px] bg-white border-2 border-ink shadow-[6px_6px_0_var(--ink)] flex flex-col p-2.5 gap-2 relative transition-all duration-300 group-hover:translate-y-[-5px] group-hover:shadow-[10px_10px_0_var(--ink)]">
      {/* Badge */}
      <div className="bg-bauhaus-blue border-2 border-ink p-1 text-center font-body font-black text-[0.5rem] shadow-[2px_2px_0_var(--ink)] mb-[5px] text-white">
        EXP_TERM
      </div>

      {/* Title */}
      <div className="bg-ink text-white text-[0.6rem] font-bold text-center py-0.5 font-mono">
        ACCESS
      </div>

      {/* Inputs */}
      <div className="w-full h-5 bg-[#f4f4f4] border-2 border-ink relative mt-[5px] before:content-['••••'] before:absolute before:top-1/2 before:left-[5px] before:-translate-y-1/2 before:text-[0.8rem] before:tracking-widest before:text-ink before:opacity-50 group-hover:before:content-['USER_1'] group-hover:before:text-bauhaus-blue group-hover:before:opacity-100 group-hover:before:tracking-normal" />
      <div className="w-full h-5 bg-[#f4f4f4] border-2 border-ink relative before:content-['••••'] before:absolute before:top-1/2 before:left-[5px] before:-translate-y-1/2 before:text-[0.8rem] before:tracking-widest before:text-ink before:opacity-50" />

      {/* Button */}
      <div className="mt-auto w-full h-[25px] bg-bauhaus-yellow border-2 border-ink shadow-[3px_3px_0_var(--ink)] flex items-center justify-center text-[0.5rem] font-black font-body group-hover:bg-ink group-hover:text-bauhaus-yellow group-hover:border-bauhaus-yellow group-hover:shadow-[2px_2px_0_var(--yellow)]">
        INIT
      </div>
    </div>
  );
}

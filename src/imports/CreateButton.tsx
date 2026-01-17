import svgPaths from "./svg-8mn5cwr03p";

export default function CreateButton() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] items-center justify-center pl-[20px] pr-[24px] py-[12px] relative rounded-[999px] size-full" data-name="Create button">
      <div className="relative shrink-0 size-[16px]" data-name="Sparkle">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <g id="Sparkle">
            <path d={svgPaths.p124ef7b0} fill="var(--fill-0, #EAA300)" id="Shape" />
          </g>
        </svg>
      </div>
      <p className="font-['Alexandria:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#050505] text-[16px] text-nowrap">Create</p>
    </div>
  );
}
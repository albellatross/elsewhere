import svgPaths from "./svg-gcktd7nzit";

export default function TemplatesButton() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] items-center justify-center pl-[20px] pr-[24px] py-[12px] relative rounded-[999px] size-full" data-name="Templates button">
      <div className="relative shrink-0 size-[16px]" data-name="Board">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <g id="Board">
            <path d={svgPaths.p2853cd00} fill="var(--fill-0, #3A96DD)" id="Shape" />
          </g>
        </svg>
      </div>
      <p className="font-['Alexandria:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#050505] text-[16px] text-nowrap">Templates</p>
    </div>
  );
}
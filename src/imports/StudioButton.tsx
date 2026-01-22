import svgPaths from "./svg-qzjdsrhoeb";

export default function StudioButton() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] items-center justify-center pl-[20px] pr-[24px] py-[12px] relative rounded-[999px] size-full" data-name="Studio button">
      <div aria-hidden="true" className="absolute border border-[rgba(31,31,31,0.1)] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <div className="relative shrink-0 size-[16px]" data-name="Design Ideas">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <g id="Design Ideas">
            <path d={svgPaths.p120bce80} fill="var(--fill-0, #7160E8)" id="Shape" />
          </g>
        </svg>
      </div>
      <p className="font-sans font-semibold leading-[normal] relative shrink-0 text-[#050505] text-[16px] text-nowrap">Studio</p>
    </div>
  );
}
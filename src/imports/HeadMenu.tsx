import svgPaths from "./svg-k7qa4ktvx4";

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        {children}
      </svg>
    </div>
  );
}

export default function HeadMenu() {
  return (
    <div className="bg-[rgba(255,255,255,0.7)] content-stretch flex gap-[30px] items-center px-[16px] py-[12px] relative rounded-[9999px] size-full" data-name="Head menu">
      <div aria-hidden="true" className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="content-stretch flex gap-[10px] h-[44px] items-center justify-center pl-[20px] pr-[24px] py-[12px] relative rounded-[999px] shrink-0 w-[150px]" data-name="Create button">
        <Wrapper>
          <g id="Sparkle">
            <path d={svgPaths.p124ef7b0} fill="var(--fill-0, #050505)" id="Shape" />
          </g>
        </Wrapper>
        <p className="font-sans font-semibold leading-[normal] relative shrink-0 text-[#050505] text-[16px] text-nowrap">Create</p>
      </div>
      <div className="content-stretch flex gap-[10px] h-[44px] items-center justify-center pl-[20px] pr-[24px] py-[12px] relative rounded-[999px] shrink-0 w-[150px]" data-name="Templates button">
        <Wrapper>
          <g id="Board">
            <path d={svgPaths.p2853cd00} fill="var(--fill-0, #050505)" id="Shape" />
          </g>
        </Wrapper>
        <p className="font-sans font-semibold leading-[normal] relative shrink-0 text-[#050505] text-[16px] text-nowrap">Templates</p>
      </div>
      <div className="content-stretch flex gap-[10px] h-[44px] items-center justify-center pl-[20px] pr-[24px] py-[12px] relative rounded-[999px] shrink-0 w-[150px]" data-name="Studio button">
        <div aria-hidden="true" className="absolute border border-[rgba(31,31,31,0.1)] border-solid inset-0 pointer-events-none rounded-[999px]" />
        <Wrapper>
          <g id="Design Ideas">
            <path d={svgPaths.p120bce80} fill="var(--fill-0, #050505)" id="Shape" />
          </g>
        </Wrapper>
        <p className="font-sans font-semibold leading-[normal] relative shrink-0 text-[#050505] text-[16px] text-nowrap">Studio</p>
      </div>
    </div>
  );
}
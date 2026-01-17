import svgPaths from "./svg-pike97bdu9";
import imgImage2 from "figma:asset/4d16195059d39c7deee83014ca6f70f28f7c7995.png";
import imgImage1 from "figma:asset/00926064bc7d84728f25977aee8c5f952da25ede.png";

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[50px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
        {children}
      </svg>
    </div>
  );
}

function Image({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute inset-0 pointer-events-none rounded-[22.141px]">
      <div className="absolute inset-0 overflow-hidden rounded-[22.141px]">{children}</div>
      <div aria-hidden="true" className="absolute border-[2.768px] border-solid border-white inset-0 rounded-[22.141px]" />
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[28px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        {children}
      </svg>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center pb-[40px] pt-[20px] px-[40px] relative size-full">
      <div className="content-stretch flex flex-col gap-[40px] items-end relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[28px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex gap-[12px] items-center justify-center pl-[8px] pr-0 py-0 relative shrink-0">
            <Wrapper>
              <g id="Person Board Add">
                <path d={svgPaths.p8fd1770} fill="var(--fill-0, #242424)" id="Shape" />
              </g>
            </Wrapper>
            <ol className="block font-['Alexandria:SemiBold',sans-serif] font-semibold leading-[0] list-decimal relative shrink-0 text-[#050505] text-[16px] text-center text-nowrap uppercase" start="1">
              <li className="list-inside ms-[24px]">
                <span className="leading-[normal]">photo input</span>
              </li>
            </ol>
          </div>
          <div className="content-stretch flex flex-col gap-[28px] h-[199px] items-center justify-center pb-0 pt-[10px] px-0 relative rounded-[16px] shrink-0 w-full" data-name="Upload Photo">
            <div aria-hidden="true" className="absolute border-[#b3b3b3] border-[3px] border-dashed inset-[-1.5px] pointer-events-none rounded-[17.5px]" />
            <div className="relative shrink-0 size-[32px]" data-name="Image Add">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                <g id="Image Add">
                  <path d={svgPaths.p3e164e00} fill="var(--fill-0, #242424)" id="Shape" />
                </g>
              </svg>
            </div>
            <div className="content-stretch flex flex-col gap-[8px] items-center leading-[normal] relative shrink-0">
              <p className="font-['Alexandria:SemiBold',sans-serif] font-semibold relative shrink-0 text-[#050505] text-[16px] text-center w-full">Upload Photo</p>
              <p className="font-['Alexandria:Medium',sans-serif] font-medium relative shrink-0 text-[#999] text-[13px] w-full">Face should be clearly visible</p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[28px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex gap-[12px] items-center justify-center pl-[8px] pr-0 py-0 relative shrink-0">
            <Wrapper>
              <g id="Guest">
                <path d={svgPaths.p1f995572} fill="var(--fill-0, #242424)" id="Shape" />
              </g>
            </Wrapper>
            <ol className="block font-['Alexandria:SemiBold',sans-serif] font-semibold leading-[0] list-decimal relative shrink-0 text-[#050505] text-[16px] text-center text-nowrap uppercase" start="2">
              <li className="list-inside ms-[24px]">
                <span className="leading-[normal]">Photo Purpose</span>
              </li>
            </ol>
          </div>
          <div className="content-stretch flex gap-[36px] items-center relative shrink-0" data-name="photograph">
            <div className="h-[226px] relative shrink-0 w-[188px]" data-name="image 4">
              <Image>
                <img alt="" className="absolute h-[124.49%] left-0 max-w-none top-[1.83%] w-full" src={imgImage2} />
              </Image>
            </div>
            <div className="h-[226px] relative shrink-0 w-[187px]" data-name="image 3">
              <Image>
                <img alt="" className="absolute h-[124.49%] left-0 max-w-none top-[0.04%] w-full" src={imgImage1} />
              </Image>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[28px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex gap-[12px] items-center justify-center pl-[8px] pr-0 py-0 relative shrink-0">
            <Wrapper>
              <g id="Image Table">
                <path d={svgPaths.p3f6d3580} fill="var(--fill-0, #242424)" id="Shape" />
              </g>
            </Wrapper>
            <ol className="block font-['Alexandria:SemiBold',sans-serif] font-semibold leading-[0] list-decimal relative shrink-0 text-[#050505] text-[16px] text-center text-nowrap uppercase" start="3">
              <li className="list-inside ms-[24px]">
                <span className="leading-[normal]">background</span>
              </li>
            </ol>
          </div>
          <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0 w-full" data-name="color list">
            <Wrapper1>
              <g id="blue">
                <circle cx="25" cy="25" fill="var(--fill-0, #E6F0FF)" id="Ellipse 3" r="23.5" stroke="url(#paint0_linear_88_858)" strokeWidth="3" />
              </g>
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_88_858" x1="-175.775" x2="50.0198" y1="2.85292" y2="3.26628">
                  <stop stopColor="#8B5CF6" />
                  <stop offset="0.5" stopColor="#A855F7" />
                  <stop offset="1" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </Wrapper1>
            <Wrapper1>
              <g id="red">
                <circle cx="25" cy="25" fill="var(--fill-0, #FF907F)" id="Ellipse 3" r="23.5" stroke="var(--stroke-0, #B3B3B3)" strokeWidth="3" />
              </g>
            </Wrapper1>
            <Wrapper1>
              <g id="white">
                <circle cx="25" cy="25" fill="var(--fill-0, white)" id="Ellipse 3" r="23.5" stroke="var(--stroke-0, #B3B3B3)" strokeWidth="3" />
              </g>
            </Wrapper1>
            <Wrapper1>
              <g id="grey">
                <circle cx="25" cy="25" fill="var(--fill-0, #EDEDED)" id="Ellipse 3" r="23.5" stroke="var(--stroke-0, #B3B3B3)" strokeWidth="3" />
              </g>
            </Wrapper1>
            <Wrapper1>
              <g id="black">
                <circle cx="25" cy="25" fill="var(--fill-0, #3D3D3D)" id="Ellipse 3" r="23.5" stroke="var(--stroke-0, #B3B3B3)" strokeWidth="3" />
              </g>
            </Wrapper1>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[8px] items-start justify-center pb-0 pt-[20px] px-0 relative shrink-0 w-full">
          <p className="font-['Alexandria:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[11px] text-black text-nowrap">* Ready to generate a compliant ID photo</p>
          <div className="bg-[#333] h-[50px] relative rounded-[12px] shrink-0 w-full" data-name="Generate button">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[10px] items-center justify-center pl-[20px] pr-[24px] py-[12px] relative size-full">
                <div className="relative shrink-0 size-[20px]" data-name="Sparkle">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <g id="Sparkle">
                      <path d={svgPaths.p1a8c2ac0} fill="var(--fill-0, white)" fillOpacity="0.9" id="Shape" />
                    </g>
                  </svg>
                </div>
                <p className="font-['Alexandria:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.9)] text-nowrap">Generate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
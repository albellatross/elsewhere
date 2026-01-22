import svgPaths from "./svg-pb1j67rgzd";
import imgImage1 from "figma:asset/074489fd96c75949a777cead25a7f27c3edf4778.png";
import imgCard02 from "figma:asset/7aa95b09a23fe314cbceec472e6eb4a58c4a639e.png";

export default function Card() {
  return (
    <div className="bg-[#e6f0ff] content-stretch flex flex-col items-start justify-between pb-[45px] pt-[25px] px-[25px] relative rounded-[24px] size-full" data-name="Card1">
      <div aria-hidden="true" className="absolute border border-[#c7ddff] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.14),0px_0px_2px_0px_rgba(0,0,0,0.12)]" />
      <div className="content-stretch flex flex-col gap-[38px] items-start relative shrink-0 w-full">
        <div className="relative rounded-[16px] shrink-0 size-[300px]">
          <div className="overflow-clip relative rounded-[inherit] size-full">
            <div className="absolute flex items-center justify-center left-0 size-[300px] top-0">
              <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                <div className="relative size-[300px]" data-name="card 02">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img alt="" className="absolute h-[150%] left-0 max-w-none top-[-3.25%] w-full" src={imgCard02} />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute h-[300px] left-[19px] top-[0.5px] w-[281px]">
              <div className="overflow-clip relative rounded-[inherit] size-full">
                <div className="absolute flex items-center justify-center left-[-19px] size-[300px] top-0">
                  <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                    <div className="relative size-[300px]" data-name="image 1">
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <img alt="" className="absolute h-[150.04%] left-[0.09%] max-w-none top-[-3.92%] w-full" src={imgImage1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-1px] pointer-events-none" />
            </div>
            <div className="absolute left-[9px] size-[20px] top-[140.5px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <g id="Frame 10">
                  <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Ellipse 2" r="10" transform="matrix(-1 0 0 1 20 0)" />
                  <g id="Sparkle">
                    <path d={svgPaths.p202bfe40} fill="var(--fill-0, #EAA300)" id="Shape" />
                  </g>
                </g>
              </svg>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[16px]" />
        </div>
        <div className="flex items-center justify-center relative shrink-0 w-full">
          <div className="flex-none rotate-[180deg] scale-y-[-100%] w-full">
            <div className="content-stretch flex flex-col gap-[15px] items-start leading-[normal] relative text-[#050505] w-full" data-name="content">
              <p className="font-sans font-semibold relative shrink-0 text-[20px] w-full">ID Photo</p>
              <p className="font-sans font-normal relative shrink-0 text-[16px] w-full">Clean, compliant photos for official use</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center min-w-full relative shrink-0 w-[min-content]">
          <div className="flex-none rotate-[180deg] scale-y-[-100%] w-full">
            <p className="font-sans font-normal leading-[normal] relative text-[#050505] text-[14px] w-full">Passport · Visa · Resume</p>
          </div>
        </div>
      </div>
    </div>
  );
}
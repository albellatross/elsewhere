import svgPaths from "./svg-c6uf7rwk1q";
import imgPortrait031 from "figma:asset/bed55a3a25e4f52d68f261109995bcb4f8fe7cb9.png";
import imgForest02 from "figma:asset/7b8381a43c932167aaff34c32384a08345d2da42.png";
import imgCard01 from "figma:asset/ee953cd1e1318ebfa0d446c4c897b0a78e41fd55.png";
import imgCard02 from "figma:asset/324a92db77baf45ac716eb581c43b2f231c164f9.png";

function BackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        {children}
      </svg>
    </div>
  );
}

function SparkleBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage>
      <g id="Sparkle">{children}</g>
    </BackgroundImage>
  );
}

export default function Component() {
  return (
    <div className="bg-white relative size-full" data-name="2">
      <div className="absolute h-[1080px] left-[-1222px] overflow-clip top-0 w-[4747px]" data-name="BG">
        <div className="absolute h-[1080px] left-[291px] opacity-40 top-0 w-[3800px]" data-name="forest 02">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgForest02} />
        </div>
        <div className="absolute h-[1080px] left-[630px] opacity-50 top-0 w-[1371px]" data-name="forest 01">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-full left-0 max-w-none top-0 w-[277.22%]" src={imgForest02} />
          </div>
        </div>
        <div className="absolute bg-gradient-to-b bottom-0 from-[rgba(255,255,255,0)] h-[215px] left-[432px] to-[#ffffff] w-[3500px]" />
        <div className="absolute h-[74.132px] left-[2931px] top-[435px] w-[387px]">
          <div className="absolute inset-[-9.44%_-1.04%_-5.36%_-1.49%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 396.8 85.1079">
              <path d={svgPaths.pd152a03} id="Vector 2" stroke="url(#paint0_linear_1_459)" strokeWidth="14" />
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_459" x1="-1354.74" x2="392.761" y1="11.2296" y2="27.9304">
                  <stop stopColor="#8B5CF6" />
                  <stop offset="0.5" stopColor="#A855F7" />
                  <stop offset="1" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="absolute flex h-[541.022px] items-center justify-center left-[2608.84px] top-[101.05px] w-[423.111px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
          <div className="flex-none rotate-[11.074deg]">
            <div className="h-[485.502px] pointer-events-none relative rounded-[24px] w-[336.117px]" data-name="card 01">
              <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[24px] size-full" src={imgCard01} />
              <div aria-hidden="true" className="absolute border-[#e8ffb7] border-[6px] border-solid inset-[-6px] rounded-[30px]" />
            </div>
          </div>
        </div>
        <div className="absolute flex h-[531.149px] items-center justify-center left-[2052px] top-[302.72px] w-[426.526px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
          <div className="flex-none rotate-[346deg]">
            <div className="h-[466.829px] pointer-events-none relative rounded-[24px] w-[323.189px]" data-name="card 02">
              <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[24px] size-full" src={imgCard02} />
              <div aria-hidden="true" className="absolute border-[#fbc810] border-[6px] border-solid inset-[-6px] rounded-[30px]" />
            </div>
          </div>
        </div>
        <div className="absolute content-stretch flex flex-col h-[985px] items-center left-[2173px] pb-[19px] pt-0 px-0 top-[94.77px] w-[586px]" data-name="portrait image">
          <div className="aspect-[612/1024] mb-[-19px] pointer-events-none relative shrink-0 w-full" data-name="portrait 03 1">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover size-full" src={imgPortrait031} />
            <div className="absolute inset-0 shadow-[inset_0px_4px_6.6px_0px_rgba(255,255,255,0.25)]" />
          </div>
          <div className="h-[23px] mb-[-19px] relative shrink-0 w-[628px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 628 23">
              <ellipse cx="314" cy="11.5" fill="url(#paint0_radial_1_457)" id="Ellipse 1" opacity="0.3" rx="314" ry="11.5" />
              <defs>
                <radialGradient cx="0" cy="0" gradientTransform="translate(314 11.5) scale(314 11.5)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_457" r="1">
                  <stop stopColor="#737373" />
                  <stop offset="1" stopColor="#737373" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="absolute h-[386.031px] left-[1134px] top-[526.73px] w-[1684px]">
          <div className="absolute inset-[-1.81%_-0.28%_-1.81%_-0.12%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1690.79 400.031">
              <path d={svgPaths.p27a12980} id="Vector 1" stroke="url(#paint0_linear_1_452)" strokeWidth="14" />
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_452" x1="-201.008" x2="2164.42" y1="122.274" y2="109.647">
                  <stop offset="0.0824716" stopColor="#8B5CF6" stopOpacity="0.5" />
                  <stop offset="0.332593" stopColor="#9A59F7" stopOpacity="0.2" />
                  <stop offset="0.504862" stopColor="#A855F7" />
                  <stop offset="1" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[28px] items-start left-[130px] top-1/2 translate-y-[-50%] w-[680px]" data-name="text content">
        <div className="content-stretch flex flex-col gap-[70px] items-start relative shrink-0" data-name="text">
          <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="title">
              <p className="font-sans font-bold leading-[72px] relative shrink-0 text-[#0b0b0b] text-[80px] text-nowrap">Rem</p>
              <div className="relative shrink-0 size-[80px]" data-name="pen">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 80">
                  <g clipPath="url(#clip0_1_443)" id="pen">
                    <path d={svgPaths.p3c28970} fill="var(--fill-0, black)" id="Vector" />
                    <path d={svgPaths.p11a83b10} fill="var(--fill-0, black)" id="Vector_2" />
                    <path d={svgPaths.p8257080} fill="var(--fill-0, black)" id="Vector_3" />
                    <path d={svgPaths.p3ea95a00} fill="var(--fill-0, black)" id="Vector_4" />
                    <path d={svgPaths.p28039a00} fill="var(--fill-0, black)" id="Vector_5" />
                    <path d={svgPaths.p198fd980} fill="var(--fill-0, black)" id="Vector_6" />
                    <path d={svgPaths.p1219ce80} fill="var(--fill-0, black)" id="Vector_7" />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_443">
                      <rect fill="white" height="80" width="80" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <p className="font-sans font-bold leading-[72px] relative shrink-0 text-[#0b0b0b] text-[80px] text-nowrap">x Reality.</p>
            </div>
            <p className="font-sans font-medium leading-[72px] relative shrink-0 text-[#8e8e93] text-[80px] text-nowrap">Not Identity.</p>
          </div>
          <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-nowrap">
            <p className="font-sans font-semibold leading-[28px] relative shrink-0 text-[#1c1c1e] text-[24px]">Same you. New worlds.</p>
            <div className="font-sans font-normal leading-[24px] relative shrink-0 text-[#5f5f66] text-[20px]">
              <p className="mb-0">Drop a photo in. Remix the world around you.</p>
              <p>No prompts. No face swaps. No weird AI vibes.</p>
            </div>
          </div>
        </div>
        <div className="bg-[#333] content-stretch flex gap-[10px] h-[44px] items-center justify-center pl-[20px] pr-[24px] py-[12px] relative rounded-[999px] shrink-0" data-name="Entry button">
          <SparkleBackgroundImage>
            <path d={svgPaths.p124ef7b0} fill="var(--fill-0, white)" fillOpacity="0.9" id="Shape" />
          </SparkleBackgroundImage>
          <p className="font-sans font-semibold leading-[normal] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.9)] text-nowrap">Try it now</p>
        </div>
      </div>
      <div className="absolute h-[50px] left-[132px] top-[45px] w-[125.179px]" data-name="logo">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 125.179 50">
          <g id="logo">
            <path d={svgPaths.p34824e00} fill="var(--fill-0, #0B0B0B)" id="Vector 1" />
            <g>
              <g id="Frame 2">
                <path d={svgPaths.p9f7be00} fill="var(--fill-0, white)" id="Vector" />
                <path d={svgPaths.pbe26100} fill="var(--fill-0, white)" id="Vector_2" />
                <path d={svgPaths.p2c113600} fill="var(--fill-0, white)" id="Vector_3" />
                <path d={svgPaths.p32f30c80} fill="var(--fill-0, white)" id="Vector_4" />
                <path d={svgPaths.p17b8aa40} fill="var(--fill-0, white)" id="Vector_5" />
              </g>
              <path d={svgPaths.p3e6a6880} fill="var(--fill-0, white)" id="Vector_6" />
              <g id="Frame 3">
                <path d={svgPaths.p106b7c00} fill="var(--fill-0, white)" id="Vector_7" />
                <path d={svgPaths.pb1d480} fill="var(--fill-0, white)" id="Vector_8" />
                <path d={svgPaths.pa29dd00} fill="var(--fill-0, white)" id="Vector_9" />
              </g>
            </g>
          </g>
        </svg>
      </div>
      <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex gap-[30px] items-center left-1/2 px-[16px] py-[12px] rounded-[9999px] top-[51px] translate-x-[-50%]" data-name="Head menu">
        <div aria-hidden="true" className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-[9999px]" />
        <div className="content-stretch flex gap-[10px] h-[44px] items-center justify-center pl-[20px] pr-[24px] py-[12px] relative rounded-[999px] shrink-0 w-[150px]" data-name="Create button">
          <SparkleBackgroundImage>
            <path d={svgPaths.p124ef7b0} fill="var(--fill-0, #050505)" id="Shape" />
          </SparkleBackgroundImage>
          <p className="font-sans font-semibold leading-[normal] relative shrink-0 text-[#050505] text-[16px] text-nowrap">Create</p>
        </div>
        <div className="content-stretch flex gap-[10px] h-[44px] items-center justify-center pl-[20px] pr-[24px] py-[12px] relative rounded-[999px] shrink-0 w-[150px]" data-name="Templates button">
          <BackgroundImage>
            <g id="Board">
              <path d={svgPaths.p2853cd00} fill="var(--fill-0, #050505)" id="Shape" />
            </g>
          </BackgroundImage>
          <p className="font-sans font-semibold leading-[normal] relative shrink-0 text-[#050505] text-[16px] text-nowrap">Templates</p>
        </div>
        <div className="content-stretch flex gap-[10px] h-[44px] items-center justify-center pl-[20px] pr-[24px] py-[12px] relative rounded-[999px] shrink-0 w-[150px]" data-name="Studio button">
          <div aria-hidden="true" className="absolute border border-[rgba(31,31,31,0.1)] border-solid inset-0 pointer-events-none rounded-[999px]" />
          <BackgroundImage>
            <g id="Design Ideas">
              <path d={svgPaths.p120bce80} fill="var(--fill-0, #050505)" id="Shape" />
            </g>
          </BackgroundImage>
          <p className="font-sans font-semibold leading-[normal] relative shrink-0 text-[#050505] text-[16px] text-nowrap">Studio</p>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col h-[60px] items-center justify-between left-[calc(50%+0.5px)] pb-0 pt-[10px] px-0 shadow-[0px_4px_4px_0px_rgba(255,255,255,0.7)] top-[1025px] translate-x-[-50%] w-[261px]" data-name="Scroll to explore more templates">
        <div className="absolute h-[41px] left-[calc(50%-0.5px)] opacity-90 top-[calc(50%-9.5px)] translate-x-[-50%] translate-y-[-50%] w-[260px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 260 41\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(13 -3.2558e-8 6.9261e-9 2.05 130 20.873)\\\'><stop stop-color=\\\'rgba(255,255,255,1)\\\' offset=\\\'0.55939\\\'/><stop stop-color=\\\'rgba(255,255,255,0)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>')" }} />
        <p className="font-sans font-normal leading-[normal] relative shrink-0 text-[#242424] text-[14px] text-nowrap">Scroll to explore more</p>
        <div className="relative shrink-0 size-[32px]" data-name="Chevron">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="Chevron">
              <path d={svgPaths.p1a5bf100} fill="var(--fill-0, #242424)" id="Shape" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
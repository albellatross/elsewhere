import svgPaths from "./svg-k9p22mdyo7";
import imgCard02 from "figma:asset/7aa95b09a23fe314cbceec472e6eb4a58c4a639e.png";
import imgImage1 from "figma:asset/a58bff95e38d1eef23bab058f0ede9bcc287192e.png";
import imgCard1 from "figma:asset/8ff67fbd850326ea6af659bc13e9ac8dbc37d16a.png";
import imgImage2 from "figma:asset/bd8c26711b42d9824251ddffe2917288e02582a6.png";
import imgCard2 from "figma:asset/b6b2dd85428ea511bce874d4f06430114aad6aef.png";
import imgImage3 from "figma:asset/2f2a4278676870bd4b14a1ba6544a4438fc53b98.png";
import imgCard3 from "figma:asset/70ce267f1a846de764bc9f5d4f525565f6d7295f.png";

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="content-stretch flex flex-col items-start justify-between pb-[45px] pt-[25px] px-[25px] relative size-full">
      <div className="content-stretch flex flex-col gap-[38px] items-start relative shrink-0 w-full">
        <div className="opacity-0 relative rounded-[24px] shrink-0 size-[300px]" data-name="card 02">
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[24px]">
            <img alt="" className="absolute h-[150%] left-0 max-w-none top-[-3.25%] w-full" src={imgCard02} />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[-0.34px] flex items-center justify-center left-[0.24px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">{children}</div>
      </div>
    </div>
  );
}

function Chevron({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[48px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Chevron">{children}</g>
      </svg>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="content-stretch flex items-center justify-center p-[13.838px] relative">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="h-[163px] pointer-events-none relative rounded-[22.141px] w-[122px]" data-name="image 1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
type ContentProps = {
  text: string;
  text1: string;
};

function Content({ text, text1 }: ContentProps) {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start leading-[normal] relative shrink-0 text-[#050505] w-full">
      <p className="font-['Alexandria:SemiBold',sans-serif] font-semibold relative shrink-0 text-[20px] w-full">{text}</p>
      <p className="font-['Alexandria:Regular',sans-serif] font-normal relative shrink-0 text-[16px] w-full">{text1}</p>
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center px-0 py-[50px] relative size-full" data-name="2">
      <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0" data-name="content">
        <div className="content-stretch flex items-end justify-between relative shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[699px]" data-name="title">
            <p className="font-['Alexandria:SemiBold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[#1c1c1e] text-[24px] text-nowrap">Create images that fit real moments</p>
            <p className="font-['Alexandria:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#5f5f66] text-[20px] w-[685px]">Subtle remix ideas that transform your images in unexpected ways — perfect for exploration, play, and inspiration.</p>
          </div>
          <div className="content-stretch flex gap-[30px] items-start opacity-0 relative shrink-0">
            <Chevron>
              <path d={svgPaths.p3e612680} fill="var(--fill-0, #CCCCCC)" id="Shape" />
            </Chevron>
            <Chevron>
              <path d={svgPaths.p5ecab00} fill="var(--fill-0, #242424)" id="Shape" />
            </Chevron>
          </div>
        </div>
        <div className="content-stretch flex gap-[20px] items-center max-w-[1660px] min-w-[695px] overflow-clip relative shrink-0 w-[1659px]" data-name="card content">
          <div className="basis-0 content-stretch flex flex-col gap-[40px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Card1">
            <div className="h-[533px] relative rounded-[24px] shrink-0 w-full" data-name="Card1">
              <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[24px]">
                <div className="absolute bg-[#fafafa] inset-0 rounded-[24px]" />
                <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[24px] size-full" src={imgCard1} />
              </div>
              <div aria-hidden="true" className="absolute border border-[#ebebeb] border-solid inset-0 pointer-events-none rounded-[24px]" />
              <Wrapper1>
                <Wrapper>
                  <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[22.141px] size-full" src={imgImage1} />
                  <div aria-hidden="true" className="absolute border-[2.768px] border-solid border-white inset-0 rounded-[22.141px]" />
                </Wrapper>
              </Wrapper1>
            </div>
            <Content text="A Moment in Zootopia" text1="Place yourself inside a lighthearted scene inspired by the world of Zootopia, blending your presence with animated charm." />
          </div>
          <div className="basis-0 content-stretch flex flex-col gap-[40px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Card2">
            <div className="h-[533px] relative rounded-[24px] shrink-0 w-full" data-name="Card2">
              <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[24px]">
                <div className="absolute bg-[#fafafa] inset-0 rounded-[24px]" />
                <div className="absolute inset-0 overflow-hidden rounded-[24px]">
                  <img alt="" className="absolute h-[112.5%] left-0 max-w-none top-[0.04%] w-full" src={imgCard2} />
                </div>
              </div>
              <div aria-hidden="true" className="absolute border border-[#ebebeb] border-solid inset-0 pointer-events-none rounded-[24px]" />
              <Wrapper1>
                <Wrapper>
                  <div className="absolute inset-0 overflow-hidden rounded-[22.141px]">
                    <img alt="" className="absolute h-[112.27%] left-[-0.21%] max-w-none top-[1.68%] w-full" src={imgImage2} />
                  </div>
                  <div aria-hidden="true" className="absolute border-[2.768px] border-solid border-white inset-0 rounded-[22.141px]" />
                </Wrapper>
              </Wrapper1>
            </div>
            <Content text="Step Into a Character" text1="Reimagine yourself as a character you love, preserving your features while shifting costume, style, and atmosphere." />
          </div>
          {[...Array(2).keys()].map((_, i) => (
            <div className="basis-0 content-stretch flex flex-col gap-[40px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Card3">
              <div className="h-[533px] relative rounded-[24px] shrink-0 w-full" data-name="Card3">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[24px]">
                  <div className="absolute bg-[#fafafa] inset-0 rounded-[24px]" />
                  <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[24px] size-full" src={imgCard3} />
                </div>
                <div aria-hidden="true" className="absolute border border-[#ebebeb] border-solid inset-0 pointer-events-none rounded-[24px]" />
                <Wrapper1>
                  <Wrapper>
                    <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[22.141px] size-full" src={imgImage3} />
                    <div aria-hidden="true" className="absolute border-[2.768px] border-solid border-white inset-0 rounded-[22.141px]" />
                  </Wrapper>
                </Wrapper1>
              </div>
              <Content text="Scenes in Simple Lines" text1="Transform a favorite film moment into a minimal line illustration, focusing on form, mood, and visual rhythm." />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
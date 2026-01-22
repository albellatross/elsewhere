import svgPaths from "./svg-gy0m5i0gur";
import imgCard02 from "figma:asset/7aa95b09a23fe314cbceec472e6eb4a58c4a639e.png";
import imgCard3 from "figma:asset/036f0ee5fba18ff822e6c272fcc37bfe0bffbb5c.png";
import imgCard4 from "figma:asset/f2228ee11ca8d06eba074b23c0a70793fc067439.png";
import imgCard5 from "figma:asset/2e16334c5cdc94f5c8510a56b98996b427c379ac.png";
import imgCard6 from "figma:asset/71ce7433da4b83fdfc3555c8c5beca0bf40c09c6.png";

function Card({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative rounded-[24px] shrink-0 size-[300px]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[24px]">{children}</div>
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
type ContentProps = {
  text: string;
  text1: string;
};

function Content({ text, text1 }: ContentProps) {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start leading-[normal] relative shrink-0 text-[#050505] w-full">
      <p className="font-sans font-semibold relative shrink-0 text-[20px] w-full">{text}</p>
      <p className="font-sans font-normal relative shrink-0 text-[16px] w-full">{text1}</p>
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center px-0 py-[50px] relative size-full" data-name="1">
      <div className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0" data-name="content">
        <div className="content-stretch flex items-end justify-between relative shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[699px]" data-name="title">
            <p className="font-sans font-semibold leading-[28px] relative shrink-0 text-[#1c1c1e] text-[24px] text-nowrap">Create images that fit real moments</p>
            <p className="font-sans font-normal leading-[24px] relative shrink-0 text-[#5f5f66] text-[20px] w-[685px]">Professional, personal, or playful — start with a template and shape the result your way.</p>
          </div>
          <div className="content-stretch flex gap-[30px] items-start relative shrink-0">
            <Chevron>
              <path d={svgPaths.p3e612680} fill="var(--fill-0, #CCCCCC)" id="Shape" />
            </Chevron>
            <Chevron>
              <path d={svgPaths.p5ecab00} fill="var(--fill-0, #242424)" id="Shape" />
            </Chevron>
          </div>
        </div>
        <div className="content-stretch flex gap-[20px] items-center max-w-[1660px] min-w-[695px] overflow-clip relative shrink-0 w-[1659px]" data-name="card content">
          <div className="bg-[#fafafa] content-stretch flex flex-col h-[533px] items-start justify-between pb-[45px] pt-[25px] px-[25px] relative rounded-[24px] shrink-0" data-name="Card1">
            <div aria-hidden="true" className="absolute border border-[#ebebeb] border-solid inset-0 pointer-events-none rounded-[24px]" />
            <div className="content-stretch flex flex-col gap-[38px] items-start relative shrink-0 w-full">
              <Card>
                <img alt="" className="absolute h-[150%] left-0 max-w-none top-[-3.25%] w-full" src={imgCard02} />
              </Card>
              <Content text="ID Photo" text1="Clean, compliant photos for official use" />
            </div>
            <p className="font-sans font-normal leading-[normal] relative shrink-0 text-[#050505] text-[14px] w-full">Passport · Visa · Resume</p>
          </div>
          <div className="bg-[#fafafa] content-stretch flex flex-col h-[533px] items-start justify-between pb-[45px] pt-[25px] px-[25px] relative rounded-[24px] shrink-0" data-name="Card2">
            <div aria-hidden="true" className="absolute border border-[#ebebeb] border-solid inset-0 pointer-events-none rounded-[24px]" />
            <div className="content-stretch flex flex-col gap-[38px] items-start relative shrink-0 w-full">
              <Card>
                <img alt="" className="absolute h-[150%] left-0 max-w-none top-[-2.07%] w-full" src={imgCard3} />
              </Card>
              <Content text="Professional Portrait" text1="A confident, natural look for your profile" />
            </div>
            <p className="font-sans font-normal leading-[normal] relative shrink-0 text-[#050505] text-[14px] w-full">LinkedIn · Personal brand</p>
          </div>
          <div className="bg-[#fafafa] content-stretch flex flex-col h-[533px] items-start justify-between pb-[45px] pt-[25px] px-[25px] relative rounded-[24px] shrink-0" data-name="Card3">
            <div aria-hidden="true" className="absolute border border-[#ebebeb] border-solid inset-0 pointer-events-none rounded-[24px]" />
            <div className="content-stretch flex flex-col gap-[38px] items-start relative shrink-0 w-full">
              <Card>
                <img alt="" className="absolute h-[150%] left-0 max-w-none top-[-0.16%] w-full" src={imgCard4} />
              </Card>
              <Content text="Personal Photoshoot" text1="Express your style, mood, and identity" />
            </div>
            <p className="font-sans font-normal leading-[normal] relative shrink-0 text-[#050505] text-[14px] w-full">Lifestyle · Art · Self-expression</p>
          </div>
          <div className="bg-[#fafafa] content-stretch flex flex-col h-[533px] items-start justify-between pb-[45px] pt-[25px] px-[25px] relative rounded-[24px] shrink-0" data-name="Card4">
            <div aria-hidden="true" className="absolute border border-[#ebebeb] border-solid inset-0 pointer-events-none rounded-[24px]" />
            <div className="content-stretch flex flex-col gap-[38px] items-start relative shrink-0 w-full">
              <Card>
                <img alt="" className="absolute h-[150%] left-0 max-w-none top-[-11.84%] w-full" src={imgCard5} />
              </Card>
              <Content text="Pet Portrait" text1="Beautiful portraits of the ones you love" />
            </div>
            <p className="font-sans font-normal leading-[normal] relative shrink-0 text-[#050505] text-[14px] w-full">Cats · Dogs · Companions</p>
          </div>
          <div className="bg-[#fafafa] content-stretch flex flex-col h-[533px] items-start justify-between pb-[45px] pt-[25px] px-[25px] relative rounded-[24px] shrink-0" data-name="Card5">
            <div aria-hidden="true" className="absolute border border-[#ebebeb] border-solid inset-0 pointer-events-none rounded-[24px]" />
            <div className="content-stretch flex flex-col gap-[38px] items-start relative shrink-0 w-full">
              <Card>
                <img alt="" className="absolute h-[150%] left-0 max-w-none top-[-11.78%] w-full" src={imgCard6} />
              </Card>
              <Content text="Product Visuals" text1="Clean, compelling images that sell" />
            </div>
            <p className="font-sans font-normal leading-[normal] relative shrink-0 text-[#050505] text-[14px] w-full">Lifestyle · Art · Self-expression</p>
          </div>
          <div className="absolute flex h-[533px] items-center justify-center right-[-0.5px] top-0 w-[215px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-[270deg]">
              <div className="bg-gradient-to-b from-[rgba(255,255,255,0)] h-[215px] to-[#ffffff] w-[533px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
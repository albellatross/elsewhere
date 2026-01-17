import imgImage1 from "figma:asset/d6f3058a7367b06ca05064a77997d807cbff132a.png";
import imgCard02 from "figma:asset/4e20f4fd352d56777e85a7ca16ac3162b3ee8a5f.png";
import imgCard3 from "figma:asset/71ce7433da4b83fdfc3555c8c5beca0bf40c09c6.png";

export default function Card() {
  return (
    <div className="bg-[#e3d2cb] content-stretch flex flex-col items-start justify-between pb-[45px] pt-[25px] px-[25px] relative rounded-[24px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.14),0px_0px_2px_0px_rgba(0,0,0,0.12)] size-full" data-name="Card5">
      <div className="content-stretch flex flex-col gap-[38px] items-start relative shrink-0 w-full">
        <div className="relative shrink-0 size-[300px]">
          <div className="absolute flex items-center justify-center left-0 size-[300px] top-0">
            <div className="flex-none rotate-[180deg] scale-y-[-100%]">
              <div className="relative rounded-[24px] size-[300px]" data-name="card 02">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[24px]">
                  <div className="absolute inset-0 overflow-hidden rounded-[24px]">
                    <img alt="" className="absolute h-[150%] left-0 max-w-none top-[-21.14%] w-full" src={imgCard02} />
                  </div>
                  <div className="absolute inset-0 overflow-hidden rounded-[24px]">
                    <img alt="" className="absolute h-[150%] left-0 max-w-none top-[-11.78%] w-full" src={imgCard3} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 content-stretch flex items-center left-[201px] p-[10px]">
            <div className="flex items-center justify-center relative shrink-0">
              <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                <div className="h-[118px] pointer-events-none relative rounded-[16px] w-[79px]" data-name="image 1">
                  <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[16px] size-full" src={imgImage1} />
                  <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 rounded-[16px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center relative shrink-0 w-full">
          <div className="flex-none rotate-[180deg] scale-y-[-100%] w-full">
            <div className="content-stretch flex flex-col gap-[15px] items-start leading-[normal] relative text-[#050505] w-full" data-name="content">
              <p className="font-['Alexandria:SemiBold',sans-serif] font-semibold relative shrink-0 text-[20px] w-full">Product Visuals</p>
              <p className="font-['Alexandria:Regular',sans-serif] font-normal relative shrink-0 text-[16px] w-full">Express your style, mood, and identity</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center min-w-full relative shrink-0 w-[min-content]">
          <div className="flex-none rotate-[180deg] scale-y-[-100%] w-full">
            <p className="font-['Alexandria:Regular',sans-serif] font-normal leading-[normal] relative text-[#050505] text-[14px] w-full">Lifestyle · Art · Self-expression</p>
          </div>
        </div>
      </div>
    </div>
  );
}
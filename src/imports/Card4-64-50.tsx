import imgCard3 from "figma:asset/264e196e9b74fa3a6e3776ed82ab09ee14efabbb.png";
import imgCard02 from "figma:asset/7aa95b09a23fe314cbceec472e6eb4a58c4a639e.png";
import imgImage1 from "figma:asset/e159137de17bd63ae194d24c968da0a0852f069f.png";

export default function Card() {
  return (
    <div className="relative w-[350px]" data-name="Card4">
      <div className="content-stretch flex flex-col gap-[40px] items-start relative w-full">
        <div className="h-[533px] relative rounded-[24px] shrink-0 w-full" data-name="Card3">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[24px]">
            <div className="absolute bg-[#fafafa] inset-0 rounded-[24px]" />
            <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[24px] size-full" src={imgCard3} />
          </div>
          <div aria-hidden="true" className="absolute border border-[#ebebeb] border-solid inset-0 pointer-events-none rounded-[24px]" />
          <div className="content-stretch flex flex-col items-start justify-between pb-[45px] pt-[25px] px-[25px] relative size-full">
            <div className="content-stretch flex flex-col gap-[38px] items-start relative shrink-0 w-full">
              <div className="opacity-0 relative rounded-[24px] shrink-0 size-[300px]" data-name="card 02">
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[24px]">
                  <img alt="" className="absolute h-[150%] left-0 max-w-none top-[-3.25%] w-full" src={imgCard02} />
                </div>
              </div>
            </div>
            <div className="absolute bottom-[-0.34px] flex items-center justify-center left-[0.24px]">
              <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                <div className="content-stretch flex items-center justify-center p-[13.838px] relative">
                  <div className="flex items-center justify-center relative shrink-0">
                    <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                      <div className="h-[163px] pointer-events-none relative rounded-[22.141px] w-[122px]" data-name="image 1">
                        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[22.141px] size-full" src={imgImage1} />
                        <div aria-hidden="true" className="absolute border-[2.768px] border-solid border-white inset-0 rounded-[22.141px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[15px] items-start leading-[normal] relative shrink-0 text-[#050505] w-full" data-name="content">
          <p className="font-['Alexandria:SemiBold',sans-serif] font-semibold relative shrink-0 text-[20px] w-full">Office Selfie</p>
          <p className="font-['Alexandria:Regular',sans-serif] font-normal relative shrink-0 text-[16px] w-full">A playful remix that frames your pet like an office worker caught in a spontaneous selfie — earnest, awkward, and strangely relatable.</p>
        </div>
      </div>
    </div>
  );
}
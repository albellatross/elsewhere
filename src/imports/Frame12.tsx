import imgCard02 from "figma:asset/7aa95b09a23fe314cbceec472e6eb4a58c4a639e.png";
import imgImage1 from "figma:asset/a58bff95e38d1eef23bab058f0ede9bcc287192e.png";
import imgCard1 from "figma:asset/8ff67fbd850326ea6af659bc13e9ac8dbc37d16a.png";
import imgWavingHand from "figma:asset/c9d45269057a88787a328656000c1d10a4c1a3de.png";

export default function Frame() {
  return (
    <div className="overflow-clip relative rounded-[24px] size-full">
      <div className="absolute content-stretch flex flex-col h-[533px] items-start justify-between left-0 pb-[45px] pt-[25px] px-[25px] rounded-[24px] top-0 w-[350px]" data-name="Card1">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[24px]">
          <div className="absolute bg-[#fafafa] inset-0 rounded-[24px]" />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[24px] size-full" src={imgCard1} />
        </div>
        <div aria-hidden="true" className="absolute border border-[#ebebeb] border-solid inset-0 pointer-events-none rounded-[24px]" />
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
      <div className="absolute backdrop-blur-[4.95px] backdrop-filter bg-[rgba(255,255,255,0.59)] h-[561px] left-1/2 top-[calc(50%+14px)] translate-x-[-50%] translate-y-[-50%] w-[410px]" />
      <div className="absolute bg-[#333] content-stretch flex gap-[6px] h-[44px] items-center justify-center left-[calc(50%-0.5px)] pl-[20px] pr-[24px] py-[12px] rounded-[999px] top-[calc(50%+0.5px)] translate-x-[-50%] translate-y-[-50%]" data-name="Entry button">
        <div className="overflow-clip relative shrink-0 size-[25px]" data-name="Waving hand">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgWavingHand} />
        </div>
        <p className="font-['Alexandria:SemiBold','Noto_Sans_JP:Bold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.9)] text-nowrap">Try it！</p>
      </div>
    </div>
  );
}
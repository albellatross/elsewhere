import imgImage1 from "figma:asset/dd2451a38c7ed3f97a655681efcd4c885199a227.png";
import imgCard02 from "figma:asset/2e16334c5cdc94f5c8510a56b98996b427c379ac.png";

export default function Card() {
  return (
    <div className="bg-[#efe4cb] content-stretch flex flex-col items-start justify-between pb-[45px] pt-[25px] px-[25px] relative rounded-[24px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.14),0px_0px_2px_0px_rgba(0,0,0,0.12)] size-full" data-name="Card4">
      <div className="content-stretch flex flex-col gap-[38px] items-start relative shrink-0 w-full">
        <div className="relative shrink-0 size-[300px]">
          <div className="absolute flex items-center justify-center left-0 size-[300px] top-0">
            <div className="flex-none rotate-[180deg] scale-y-[-100%]">
              <div className="relative rounded-[24px] size-[300px]" data-name="card 02">
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[24px]">
                  <img alt="" className="absolute h-[150%] left-0 max-w-none top-[-11.84%] w-full" src={imgCard02} />
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
              <p className="font-sans font-semibold relative shrink-0 text-[20px] w-full">Pet Portrait</p>
              <p className="font-sans font-normal relative shrink-0 text-[16px] w-full">Beautiful portraits of the ones you love</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center min-w-full relative shrink-0 w-[min-content]">
          <div className="flex-none rotate-[180deg] scale-y-[-100%] w-full">
            <p className="font-sans font-normal leading-[normal] relative text-[#050505] text-[14px] w-full">Cats · Dogs · Companions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
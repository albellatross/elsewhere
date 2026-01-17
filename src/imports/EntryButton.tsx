import imgWavingHand from "figma:asset/c9d45269057a88787a328656000c1d10a4c1a3de.png";

export default function EntryButton() {
  return (
    <div className="bg-[#333] content-stretch flex gap-[6px] items-center justify-center pl-[20px] pr-[24px] py-[12px] relative rounded-[999px] size-full" data-name="Entry button">
      <div className="overflow-clip relative shrink-0 size-[25px]" data-name="Waving hand">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgWavingHand} />
      </div>
      <p className="font-['Alexandria:SemiBold','Noto_Sans_JP:Bold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.9)] text-nowrap">Try it！</p>
    </div>
  );
}
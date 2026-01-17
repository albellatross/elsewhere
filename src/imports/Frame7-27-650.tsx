import imgImage1 from "figma:asset/dd2451a38c7ed3f97a655681efcd4c885199a227.png";

export default function Frame() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative size-full">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="h-[118px] pointer-events-none relative rounded-[16px] w-[79px]" data-name="image 1">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[16px] size-full" src={imgImage1} />
            <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 rounded-[16px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
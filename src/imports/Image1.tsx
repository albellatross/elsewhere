import imgImage1 from "figma:asset/00926064bc7d84728f25977aee8c5f952da25ede.png";

export default function Image() {
  return (
    <div className="relative size-full" data-name="image 1">
      <div className="absolute inset-0 pointer-events-none rounded-[22.141px]" data-name="image 1">
        <div className="absolute inset-0 overflow-hidden rounded-[22.141px]">
          <img alt="" className="absolute h-[124.49%] left-0 max-w-none top-[0.04%] w-full" src={imgImage1} />
        </div>
        <div aria-hidden="true" className="absolute border-[2.768px] border-solid border-white inset-0 rounded-[22.141px]" />
      </div>
    </div>
  );
}
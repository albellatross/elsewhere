import clsx from "clsx";
import imgForest02 from "figma:asset/7b8381a43c932167aaff34c32384a08345d2da42.png";
type Frame4ForestProps = {
  additionalClassNames?: string;
};

function Frame4Forest({ children, additionalClassNames = "" }: React.PropsWithChildren<Frame4ForestProps>) {
  return (
    <div className={clsx("absolute h-[1080px] left-0 opacity-[0.18] top-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-white inset-0" />
        <div className="absolute inset-0 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <Frame4Forest additionalClassNames="w-[2847px]">
        <img alt="" className="absolute h-full left-[-33.49%] max-w-none top-0 w-[133.5%]" src={imgForest02} />
      </Frame4Forest>
      <Frame4Forest additionalClassNames="w-[1028px]">
        <img alt="" className="absolute h-full left-[-0.03%] max-w-none top-0 w-[369.71%]" src={imgForest02} />
      </Frame4Forest>
    </div>
  );
}
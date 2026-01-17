import svgPaths from "./svg-hwcpe2jyen";
import clsx from "clsx";
import { motion } from "motion/react";

type BackgroundImage3Props = {
  additionalClassNames?: string;
};

function BackgroundImage3({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage3Props>) {
  return (
    <div style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties} className={clsx("absolute flex h-[32px] items-center justify-center translate-x-[-50%] translate-y-[-50%]", additionalClassNames)}>
      {children}
    </div>
  );
}
type BackgroundImage2Props = {
  additionalClassNames?: string;
};

function BackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage2Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
        {children}
      </div>
    </div>
  );
}

function BackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties} className="absolute inset-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 17.25">
        {children}
      </svg>
    </div>
  );
}
type ChevronShapeBackgroundImage19Props = {
  additionalClassNames?: string;
};

function ChevronShapeBackgroundImage19({ children, additionalClassNames = "" }: React.PropsWithChildren<ChevronShapeBackgroundImage19Props>) {
  return (
    <BackgroundImage2 additionalClassNames={clsx("absolute h-[22px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[12.25px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.25 22">
        {children}
      </svg>
    </BackgroundImage2>
  );
}
type ChevronShapeBackgroundImage18Props = {
  additionalClassNames?: string;
};

function ChevronShapeBackgroundImage18({ children, additionalClassNames = "" }: React.PropsWithChildren<ChevronShapeBackgroundImage18Props>) {
  return (
    <BackgroundImage2 additionalClassNames={clsx("absolute h-[22px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[12px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 22">
        {children}
      </svg>
    </BackgroundImage2>
  );
}
type ChevronShapeBackgroundImage17Props = {
  additionalClassNames?: string;
};

function ChevronShapeBackgroundImage17({ children, additionalClassNames = "" }: React.PropsWithChildren<ChevronShapeBackgroundImage17Props>) {
  return (
    <BackgroundImage2 additionalClassNames={clsx("absolute h-[12.25px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[22px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 12.25">
        {children}
      </svg>
    </BackgroundImage2>
  );
}
type ChevronShapeBackgroundImage16Props = {
  additionalClassNames?: string;
};

function ChevronShapeBackgroundImage16({ children, additionalClassNames = "" }: React.PropsWithChildren<ChevronShapeBackgroundImage16Props>) {
  return (
    <BackgroundImage2 additionalClassNames={clsx("absolute h-[12px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[22px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 12">
        {children}
      </svg>
    </BackgroundImage2>
  );
}
type ChevronShapeBackgroundImage15Props = {
  additionalClassNames?: string;
};

function ChevronShapeBackgroundImage15({ children, additionalClassNames = "" }: React.PropsWithChildren<ChevronShapeBackgroundImage15Props>) {
  return (
    <BackgroundImage2 additionalClassNames={clsx("absolute h-[8px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[4.75px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.75 8">
        {children}
      </svg>
    </BackgroundImage2>
  );
}
type ChevronShapeBackgroundImage14Props = {
  additionalClassNames?: string;
};

function ChevronShapeBackgroundImage14({ children, additionalClassNames = "" }: React.PropsWithChildren<ChevronShapeBackgroundImage14Props>) {
  return (
    <BackgroundImage2 additionalClassNames={clsx("absolute h-[8px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[4.5px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 8">
        {children}
      </svg>
    </BackgroundImage2>
  );
}
type ChevronShapeBackgroundImage13Props = {
  additionalClassNames?: string;
};

function ChevronShapeBackgroundImage13({ children, additionalClassNames = "" }: React.PropsWithChildren<ChevronShapeBackgroundImage13Props>) {
  return (
    <BackgroundImage2 additionalClassNames={clsx("absolute h-[10px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[5.5px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.5 10">
        {children}
      </svg>
    </BackgroundImage2>
  );
}
type ChevronShapeBackgroundImage12Props = {
  additionalClassNames?: string;
};

function ChevronShapeBackgroundImage12({ children, additionalClassNames = "" }: React.PropsWithChildren<ChevronShapeBackgroundImage12Props>) {
  return (
    <BackgroundImage2 additionalClassNames={clsx("absolute h-[12.001px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[6.501px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.50134 12.0009">
        {children}
      </svg>
    </BackgroundImage2>
  );
}
type ChevronShapeBackgroundImage11Props = {
  additionalClassNames?: string;
};

function ChevronShapeBackgroundImage11({ children, additionalClassNames = "" }: React.PropsWithChildren<ChevronShapeBackgroundImage11Props>) {
  return (
    <BackgroundImage2 additionalClassNames={clsx("absolute h-[12.001px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[6.499px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.49919 12.0008">
        {children}
      </svg>
    </BackgroundImage2>
  );
}
type ChevronShapeBackgroundImage10Props = {
  additionalClassNames?: string;
};

function ChevronShapeBackgroundImage10({ children, additionalClassNames = "" }: React.PropsWithChildren<ChevronShapeBackgroundImage10Props>) {
  return (
    <BackgroundImage2 additionalClassNames={clsx("absolute h-[16px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[9px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 16">
        {children}
      </svg>
    </BackgroundImage2>
  );
}
type ChevronShapeBackgroundImage9Props = {
  additionalClassNames?: string;
};

function ChevronShapeBackgroundImage9({ children, additionalClassNames = "" }: React.PropsWithChildren<ChevronShapeBackgroundImage9Props>) {
  return (
    <BackgroundImage2 additionalClassNames={clsx("absolute h-[16px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[8.75px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.75 16">
        {children}
      </svg>
    </BackgroundImage2>
  );
}
type ChevronShapeBackgroundImage8Props = {
  additionalClassNames?: string;
};

function ChevronShapeBackgroundImage8({ children, additionalClassNames = "" }: React.PropsWithChildren<ChevronShapeBackgroundImage8Props>) {
  return (
    <BackgroundImage2 additionalClassNames={clsx("absolute h-[19.5px] top-[calc(50%-0.25px)] translate-x-[-50%] translate-y-[-50%] w-[10.75px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.75 19.5">
        {children}
      </svg>
    </BackgroundImage2>
  );
}
type ChevronShapeBackgroundImage7Props = {
  additionalClassNames?: string;
};

function ChevronShapeBackgroundImage7({ children, additionalClassNames = "" }: React.PropsWithChildren<ChevronShapeBackgroundImage7Props>) {
  return (
    <BackgroundImage2 additionalClassNames={clsx("absolute h-[19px] top-[calc(50%-0.5px)] translate-x-[-50%] translate-y-[-50%] w-[10.25px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.25 19">
        {children}
      </svg>
    </BackgroundImage2>
  );
}
type ChevronShapeBackgroundImage6Props = {
  additionalClassNames?: string;
};

function ChevronShapeBackgroundImage6({ children, additionalClassNames = "" }: React.PropsWithChildren<ChevronShapeBackgroundImage6Props>) {
  return (
    <BackgroundImage2 additionalClassNames={clsx("absolute h-[4.75px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[8px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 4.75">
        {children}
      </svg>
    </BackgroundImage2>
  );
}
type ChevronShapeBackgroundImage5Props = {
  additionalClassNames?: string;
};

function ChevronShapeBackgroundImage5({ children, additionalClassNames = "" }: React.PropsWithChildren<ChevronShapeBackgroundImage5Props>) {
  return (
    <BackgroundImage2 additionalClassNames={clsx("absolute h-[4.5px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[8px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 4.5">
        {children}
      </svg>
    </BackgroundImage2>
  );
}
type ChevronShapeBackgroundImage4Props = {
  additionalClassNames?: string;
};

function ChevronShapeBackgroundImage4({ children, additionalClassNames = "" }: React.PropsWithChildren<ChevronShapeBackgroundImage4Props>) {
  return (
    <BackgroundImage2 additionalClassNames={clsx("absolute h-[5.5px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[10px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 5.5">
        {children}
      </svg>
    </BackgroundImage2>
  );
}
type ChevronShapeBackgroundImage3Props = {
  additionalClassNames?: string;
};

function ChevronShapeBackgroundImage3({ children, additionalClassNames = "" }: React.PropsWithChildren<ChevronShapeBackgroundImage3Props>) {
  return (
    <BackgroundImage2 additionalClassNames={clsx("absolute h-[6.501px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[12.001px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0009 6.50134">
        {children}
      </svg>
    </BackgroundImage2>
  );
}
type ChevronShapeBackgroundImage2Props = {
  additionalClassNames?: string;
};

function ChevronShapeBackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<ChevronShapeBackgroundImage2Props>) {
  return (
    <BackgroundImage2 additionalClassNames={clsx("absolute h-[6.499px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[12.001px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0008 6.49919">
        {children}
      </svg>
    </BackgroundImage2>
  );
}
type ChevronShapeBackgroundImage1Props = {
  additionalClassNames?: string;
};

function ChevronShapeBackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<ChevronShapeBackgroundImage1Props>) {
  return (
    <BackgroundImage2 additionalClassNames={clsx("absolute h-[9px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[16px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 9">
        {children}
      </svg>
    </BackgroundImage2>
  );
}
type ChevronShapeBackgroundImageProps = {
  additionalClassNames?: string;
};

function ChevronShapeBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ChevronShapeBackgroundImageProps>) {
  return (
    <BackgroundImage2 additionalClassNames={clsx("absolute h-[8.75px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[16px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 8.75">
        {children}
      </svg>
    </BackgroundImage2>
  );
}

function ChevronBackgroundImage3() {
  return (
    <div style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties} className="absolute inset-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 11">
        <path d={svgPaths.p38c29c00} fill="var(--fill-0, #242424)" id="Shape" />
      </svg>
    </div>
  );
}

function ChevronBackgroundImage2() {
  return (
    <div style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties} className="absolute inset-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 10.75">
        <path d={svgPaths.p311e8800} fill="var(--fill-0, #242424)" id="Shape" />
      </svg>
    </div>
  );
}

function BackgroundImage() {
  return (
    <div style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties} className="absolute inset-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 17.5">
        <path d={svgPaths.p3a016680} fill="var(--fill-0, #242424)" id="Shape" />
      </svg>
    </div>
  );
}
type ChevronBackgroundImage1Props = {
  additionalClassNames?: string;
};

function ChevronBackgroundImage1({ additionalClassNames = "" }: ChevronBackgroundImage1Props) {
  return (
    <div className={clsx("flex-none", additionalClassNames)}>
      <div className="h-[17.5px] relative w-[32px]" data-name="Shape">
        <BackgroundImage />
      </div>
    </div>
  );
}
type ChevronBackgroundImageProps = {
  additionalClassNames?: string;
};

function ChevronBackgroundImage({ additionalClassNames = "" }: ChevronBackgroundImageProps) {
  return (
    <div className={clsx("flex-none", additionalClassNames)}>
      <div className="h-[17.25px] relative w-[32px]" data-name="Shape">
        <BackgroundImage1>
          <path d={svgPaths.p31da0c00} fill="var(--fill-0, #242424)" id="Shape" />
        </BackgroundImage1>
      </div>
    </div>
  );
}
type ChevronProps = {
  className?: string;
  direction?: "Down" | "Up" | "Left" | "Right";
  size?: "12" | "16" | "20" | "24" | "28" | "32" | "48";
  theme?: "Regular" | "Filled";
};

function Chevron({ className, direction = "Down", size = "12", theme = "Regular" }: ChevronProps) {
  if (direction === "Up" && size === "48" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Up, Size=48, Theme=Regular">
        <div className="absolute flex h-[17.25px] items-center justify-center left-1/2 top-[calc(50%-0.38px)] translate-x-[-50%] translate-y-[-50%] w-[32px]">
          <ChevronBackgroundImage additionalClassNames="rotate-[180deg]" />
        </div>
      </div>
    );
  }
  if (direction === "Up" && size === "48" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Up, Size=48, Theme=Filled">
        <div className="absolute flex h-[17.5px] items-center justify-center left-1/2 top-[calc(50%-0.25px)] translate-x-[-50%] translate-y-[-50%] w-[32px]">
          <ChevronBackgroundImage1 additionalClassNames="rotate-[180deg]" />
        </div>
      </div>
    );
  }
  if (direction === "Up" && size === "28" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Up, Size=28, Theme=Regular">
        <div className="absolute flex h-[10.75px] items-center justify-center left-1/2 top-[calc(50%-0.63px)] translate-x-[-50%] translate-y-[-50%] w-[20px]">
          <div className="flex-none rotate-[180deg]">
            <div className="h-[10.75px] relative w-[20px]" data-name="Shape">
              <ChevronBackgroundImage2 />
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (direction === "Up" && size === "28" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Up, Size=28, Theme=Filled">
        <div className="absolute flex h-[11px] items-center justify-center left-1/2 top-[calc(50%-0.5px)] translate-x-[-50%] translate-y-[-50%] w-[20px]">
          <div className="flex-none rotate-[180deg]">
            <div className="h-[11px] relative w-[20px]" data-name="Shape">
              <ChevronBackgroundImage3 />
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (direction === "Up" && size === "24" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Up, Size=24, Theme=Regular">
        <ChevronShapeBackgroundImage additionalClassNames="top-[calc(50%-0.63px)]">
          <path d={svgPaths.pcb09c80} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage>
      </div>
    );
  }
  if (direction === "Up" && size === "24" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Up, Size=24, Theme=Filled">
        <ChevronShapeBackgroundImage1 additionalClassNames="top-[calc(50%-0.5px)]">
          <path d={svgPaths.pfe1a100} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage1>
      </div>
    );
  }
  if (direction === "Up" && size === "20" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Up, Size=20, Theme=Regular">
        <ChevronShapeBackgroundImage2 additionalClassNames="top-[calc(50%-0.75px)]">
          <path d={svgPaths.p11c10670} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage2>
      </div>
    );
  }
  if (direction === "Up" && size === "20" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Up, Size=20, Theme=Filled">
        <ChevronShapeBackgroundImage3 additionalClassNames="top-[calc(50%-0.75px)]">
          <path d={svgPaths.p12c6e600} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage3>
      </div>
    );
  }
  if (direction === "Up" && size === "16" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Up, Size=16, Theme=Regular">
        <ChevronShapeBackgroundImage4 additionalClassNames="top-[calc(50%-0.25px)]">
          <path d={svgPaths.p4fc3100} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage4>
      </div>
    );
  }
  if (direction === "Up" && size === "16" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Up, Size=16, Theme=Filled">
        <ChevronShapeBackgroundImage4 additionalClassNames="top-[calc(50%-0.25px)]">
          <path d={svgPaths.p3640ac00} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage4>
      </div>
    );
  }
  if (direction === "Up" && size === "12" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Up, Size=12, Theme=Regular">
        <ChevronShapeBackgroundImage5 additionalClassNames="top-[calc(50%-0.75px)]">
          <path d={svgPaths.p27b10280} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage5>
      </div>
    );
  }
  if (direction === "Up" && size === "12" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Up, Size=12, Theme=Filled">
        <ChevronShapeBackgroundImage6 additionalClassNames="top-[calc(50%-0.63px)]">
          <path d={svgPaths.p3e68500} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage6>
      </div>
    );
  }
  if (direction === "Right" && size === "48" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Right, Size=48, Theme=Regular">
        <BackgroundImage3 additionalClassNames="left-[calc(50%+0.38px)] top-1/2 w-[17.25px]">
          <ChevronBackgroundImage additionalClassNames="rotate-[270deg]" />
        </BackgroundImage3>
      </div>
    );
  }
  if (direction === "Right" && size === "48" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Right, Size=48, Theme=Filled">
        <BackgroundImage3 additionalClassNames="left-[calc(50%+0.25px)] top-[calc(50%-0.25px)] w-[17.5px]">
          <ChevronBackgroundImage1 additionalClassNames="rotate-[270deg]" />
        </BackgroundImage3>
      </div>
    );
  }
  if (direction === "Right" && size === "28" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Right, Size=28, Theme=Regular">
        <ChevronShapeBackgroundImage7 additionalClassNames="left-[calc(50%+0.88px)]">
          <path d={svgPaths.p725cf00} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage7>
      </div>
    );
  }
  if (direction === "Right" && size === "28" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Right, Size=28, Theme=Filled">
        <ChevronShapeBackgroundImage8 additionalClassNames="left-[calc(50%+0.63px)]">
          <path d={svgPaths.pe979000} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage8>
      </div>
    );
  }
  if (direction === "Right" && size === "24" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Right, Size=24, Theme=Regular">
        <ChevronShapeBackgroundImage9 additionalClassNames="left-[calc(50%+0.62px)]">
          <path d={svgPaths.p212a1b00} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage9>
      </div>
    );
  }
  if (direction === "Right" && size === "24" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Right, Size=24, Theme=Filled">
        <ChevronShapeBackgroundImage10 additionalClassNames="left-[calc(50%+0.5px)]">
          <path d={svgPaths.p14db1c00} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage10>
      </div>
    );
  }
  if (direction === "Right" && size === "20" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Right, Size=20, Theme=Regular">
        <ChevronShapeBackgroundImage11 additionalClassNames="left-[calc(50%+0.75px)]">
          <path d={svgPaths.p154164f0} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage11>
      </div>
    );
  }
  if (direction === "Right" && size === "20" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Right, Size=20, Theme=Filled">
        <ChevronShapeBackgroundImage12 additionalClassNames="left-[calc(50%+0.75px)]">
          <path d={svgPaths.p20cb9e70} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage12>
      </div>
    );
  }
  if (direction === "Right" && size === "16" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Right, Size=16, Theme=Regular">
        <ChevronShapeBackgroundImage13 additionalClassNames="left-[calc(50%+0.25px)]">
          <path d={svgPaths.p21a22340} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage13>
      </div>
    );
  }
  if (direction === "Right" && size === "16" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Right, Size=16, Theme=Filled">
        <ChevronShapeBackgroundImage13 additionalClassNames="left-[calc(50%+0.25px)]">
          <path d={svgPaths.p3a120580} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage13>
      </div>
    );
  }
  if (direction === "Right" && size === "12" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Right, Size=12, Theme=Regular">
        <ChevronShapeBackgroundImage14 additionalClassNames="left-[calc(50%+0.75px)]">
          <path d={svgPaths.p329e3500} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage14>
      </div>
    );
  }
  if (direction === "Right" && size === "12" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Right, Size=12, Theme=Filled">
        <ChevronShapeBackgroundImage15 additionalClassNames="left-[calc(50%+0.63px)]">
          <path d={svgPaths.pe7d5d80} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage15>
      </div>
    );
  }
  if (direction === "Left" && size === "48" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Left, Size=48, Theme=Regular">
        <BackgroundImage3 additionalClassNames="left-[calc(50%-0.37px)] top-1/2 w-[17.25px]">
          <ChevronBackgroundImage additionalClassNames="rotate-[90deg]" />
        </BackgroundImage3>
      </div>
    );
  }
  if (direction === "Left" && size === "48" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Left, Size=48, Theme=Filled">
        <BackgroundImage3 additionalClassNames="left-[calc(50%-0.25px)] top-[calc(50%-0.25px)] w-[17.5px]">
          <ChevronBackgroundImage1 additionalClassNames="rotate-[90deg]" />
        </BackgroundImage3>
      </div>
    );
  }
  if (direction === "Left" && size === "28" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Left, Size=28, Theme=Regular">
        <ChevronShapeBackgroundImage7 additionalClassNames="left-[calc(50%-0.87px)]">
          <path d={svgPaths.p62ad300} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage7>
      </div>
    );
  }
  if (direction === "Left" && size === "28" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Left, Size=28, Theme=Filled">
        <ChevronShapeBackgroundImage8 additionalClassNames="left-[calc(50%-0.62px)]">
          <path d={svgPaths.p266de500} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage8>
      </div>
    );
  }
  if (direction === "Left" && size === "24" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Left, Size=24, Theme=Regular">
        <ChevronShapeBackgroundImage9 additionalClassNames="left-[calc(50%-0.63px)]">
          <path d={svgPaths.p4dacf00} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage9>
      </div>
    );
  }
  if (direction === "Left" && size === "24" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Left, Size=24, Theme=Filled">
        <ChevronShapeBackgroundImage10 additionalClassNames="left-[calc(50%-0.5px)]">
          <path d={svgPaths.p398d8200} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage10>
      </div>
    );
  }
  if (direction === "Left" && size === "20" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Left, Size=20, Theme=Regular">
        <ChevronShapeBackgroundImage11 additionalClassNames="left-[calc(50%-0.75px)]">
          <path d={svgPaths.p3b178cf0} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage11>
      </div>
    );
  }
  if (direction === "Left" && size === "20" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Left, Size=20, Theme=Filled">
        <ChevronShapeBackgroundImage12 additionalClassNames="left-[calc(50%-0.75px)]">
          <path d={svgPaths.p2f1aa000} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage12>
      </div>
    );
  }
  if (direction === "Left" && size === "16" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Left, Size=16, Theme=Regular">
        <ChevronShapeBackgroundImage13 additionalClassNames="left-[calc(50%-0.25px)]">
          <path d={svgPaths.p27aef80} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage13>
      </div>
    );
  }
  if (direction === "Left" && size === "16" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Left, Size=16, Theme=Filled">
        <ChevronShapeBackgroundImage13 additionalClassNames="left-[calc(50%-0.25px)]">
          <path d={svgPaths.p1d4d9700} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage13>
      </div>
    );
  }
  if (direction === "Left" && size === "12" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Left, Size=12, Theme=Regular">
        <ChevronShapeBackgroundImage14 additionalClassNames="left-[calc(50%-0.75px)]">
          <path d={svgPaths.pb3b8480} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage14>
      </div>
    );
  }
  if (direction === "Left" && size === "12" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Left, Size=12, Theme=Filled">
        <ChevronShapeBackgroundImage15 additionalClassNames="left-[calc(50%-0.63px)]">
          <path d={svgPaths.p373c9c00} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage15>
      </div>
    );
  }
  if (direction === "Down" && size === "48" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Down, Size=48, Theme=Regular">
        <div className="absolute h-[17.25px] left-1/2 top-[calc(50%+0.38px)] translate-x-[-50%] translate-y-[-50%] w-[32px]" data-name="Shape">
          <BackgroundImage1>
            <path d={svgPaths.p2dc21f00} fill="var(--fill-0, #242424)" id="Shape" />
          </BackgroundImage1>
        </div>
      </div>
    );
  }
  if (direction === "Down" && size === "48" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Down, Size=48, Theme=Filled">
        <div className="absolute h-[17.5px] left-1/2 top-[calc(50%+0.25px)] translate-x-[-50%] translate-y-[-50%] w-[32px]" data-name="Shape">
          <BackgroundImage />
        </div>
      </div>
    );
  }
  if (direction === "Down" && size === "28" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Down, Size=28, Theme=Regular">
        <div className="absolute h-[10.75px] left-1/2 top-[calc(50%+0.63px)] translate-x-[-50%] translate-y-[-50%] w-[20px]" data-name="Shape">
          <ChevronBackgroundImage2 />
        </div>
      </div>
    );
  }
  if (direction === "Down" && size === "28" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Down, Size=28, Theme=Filled">
        <div className="absolute h-[11px] left-1/2 top-[calc(50%+0.5px)] translate-x-[-50%] translate-y-[-50%] w-[20px]" data-name="Shape">
          <ChevronBackgroundImage3 />
        </div>
      </div>
    );
  }
  if (direction === "Down" && size === "24" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Down, Size=24, Theme=Regular">
        <ChevronShapeBackgroundImage additionalClassNames="top-[calc(50%+0.62px)]">
          <path d={svgPaths.p23c83400} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage>
      </div>
    );
  }
  if (direction === "Down" && size === "24" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Down, Size=24, Theme=Filled">
        <ChevronShapeBackgroundImage1 additionalClassNames="top-[calc(50%+0.5px)]">
          <path d={svgPaths.p2eed3900} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage1>
      </div>
    );
  }
  if (direction === "Down" && size === "20" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Down, Size=20, Theme=Regular">
        <ChevronShapeBackgroundImage2 additionalClassNames="top-[calc(50%+0.75px)]">
          <path d={svgPaths.p101e4700} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage2>
      </div>
    );
  }
  if (direction === "Down" && size === "20" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Down, Size=20, Theme=Filled">
        <ChevronShapeBackgroundImage3 additionalClassNames="top-[calc(50%+0.75px)]">
          <path d={svgPaths.p149dd000} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage3>
      </div>
    );
  }
  if (direction === "Down" && size === "16" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Down, Size=16, Theme=Regular">
        <ChevronShapeBackgroundImage4 additionalClassNames="top-[calc(50%+0.25px)]">
          <path d={svgPaths.p22f5b00} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage4>
      </div>
    );
  }
  if (direction === "Down" && size === "16" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Down, Size=16, Theme=Filled">
        <ChevronShapeBackgroundImage4 additionalClassNames="top-[calc(50%+0.25px)]">
          <path d={svgPaths.pf297500} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage4>
      </div>
    );
  }
  if (direction === "Down" && size === "12" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Down, Size=12, Theme=Filled">
        <ChevronShapeBackgroundImage6 additionalClassNames="top-[calc(50%+0.63px)]">
          <path d={svgPaths.pe230480} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage6>
      </div>
    );
  }
  if (direction === "Down" && size === "32" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Down, Size=32, Theme=Regular">
        <ChevronShapeBackgroundImage16 additionalClassNames="top-[calc(50%+1px)]">
          <path d={svgPaths.p24264500} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage16>
      </div>
    );
  }
  if (direction === "Down" && size === "32" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Down, Size=32, Theme=Filled">
        <ChevronShapeBackgroundImage17 additionalClassNames="top-[calc(50%+0.88px)]">
          <path d={svgPaths.p3a65fb80} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage17>
      </div>
    );
  }
  if (direction === "Up" && size === "32" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Up, Size=32, Theme=Regular">
        <ChevronShapeBackgroundImage16 additionalClassNames="top-[calc(50%-1px)]">
          <path d={svgPaths.p2054c200} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage16>
      </div>
    );
  }
  if (direction === "Up" && size === "32" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Up, Size=32, Theme=Filled">
        <ChevronShapeBackgroundImage17 additionalClassNames="top-[calc(50%-0.88px)]">
          <path d={svgPaths.p9511e00} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage17>
      </div>
    );
  }
  if (direction === "Left" && size === "32" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Left, Size=32, Theme=Regular">
        <ChevronShapeBackgroundImage18 additionalClassNames="left-[calc(50%-1px)]">
          <path d={svgPaths.p327c0a00} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage18>
      </div>
    );
  }
  if (direction === "Left" && size === "32" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Left, Size=32, Theme=Filled">
        <ChevronShapeBackgroundImage19 additionalClassNames="left-[calc(50%-0.88px)]">
          <path d={svgPaths.pa07fa00} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage19>
      </div>
    );
  }
  if (direction === "Right" && size === "32" && theme === "Regular") {
    return (
      <div className={className} data-name="Direction=Right, Size=32, Theme=Regular">
        <ChevronShapeBackgroundImage18 additionalClassNames="left-[calc(50%+1px)]">
          <path d={svgPaths.p1a0b9072} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage18>
      </div>
    );
  }
  if (direction === "Right" && size === "32" && theme === "Filled") {
    return (
      <div className={className} data-name="Direction=Right, Size=32, Theme=Filled">
        <ChevronShapeBackgroundImage19 additionalClassNames="left-[calc(50%+0.88px)]">
          <path d={svgPaths.p9ab7a80} fill="var(--fill-0, #242424)" id="Shape" />
        </ChevronShapeBackgroundImage19>
      </div>
    );
  }
  return (
    <div className={className} data-name="Direction=Down, Size=12, Theme=Regular">
      <ChevronShapeBackgroundImage5 additionalClassNames="top-[calc(50%+0.75px)]">
        <path d={svgPaths.p2e2fea80} fill="var(--fill-0, #242424)" id="Shape" />
      </ChevronShapeBackgroundImage5>
    </div>
  );
}

export default function ScrollToExploreMoreTemplates() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-center relative size-full" data-name="Scroll to explore more templates">
      <div className="absolute h-[63px] left-[-18px] top-[-4px] w-[298px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\\'0 0 298 63\\\\' xmlns=\\\\'http://www.w3.org/2000/svg\\\\' preserveAspectRatio=\\\\'none\\\\'><rect x=\\\\'0\\\\' y=\\\\'0\\\\' height=\\\\'100%\\\\' width=\\\\'100%\\\\' fill=\\\\'url(%23grad)\\\\' opacity=\\\\'1\\\\'/><defs><radialGradient id=\\\\'grad\\\\' gradientUnits=\\\\'userSpaceOnUse\\\\' cx=\\\\'0\\\\' cy=\\\\'0\\\\' r=\\\\'10\\\\' gradientTransform=\\\\'matrix(14.843 -7.8085e-15 2.8695e-10 3.1379 149 21.764)\\\\'><stop stop-color=\\\\'rgba(255,255,255,1)\\\\' offset=\\\\'0\\\\'/><stop stop-color=\\\\'rgba(255,255,255,0)\\\\' offset=\\\\'1\\\\'/></radialGradient></defs></svg>')" }} />
      <motion.p 
        className="font-['Alexandria:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#242424] text-[13px] text-nowrap"
        animate={{ 
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.03, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Scroll to explore more templates
      </motion.p>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Chevron className="relative shrink-0 size-[32px]" size="32" />
      </motion.div>
    </div>
  );
}
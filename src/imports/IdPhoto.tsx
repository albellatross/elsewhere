import svgPaths from "./svg-lxjhel9141";
import clsx from "clsx";
import imgImage1 from "figma:asset/00926064bc7d84728f25977aee8c5f952da25ede.png";
import imgImage2 from "figma:asset/4d16195059d39c7deee83014ca6f70f28f7c7995.png";
type IdPhotoShapeProps = {
  additionalClassNames?: string;
};

function IdPhotoShape({ children, additionalClassNames = "" }: React.PropsWithChildren<IdPhotoShapeProps>) {
  return (
    <div className={clsx("absolute left-1/2 translate-x-[-50%] translate-y-[-50%]", additionalClassNames)}>
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
        {children}
      </div>
    </div>
  );
}
type Wrapper2Props = {
  additionalClassNames?: string;
};

function Wrapper2({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return (
    <div className={clsx("absolute top-[calc(50%-0.25px)] translate-x-[-50%] translate-y-[-50%]", additionalClassNames)}>
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
        {children}
      </div>
    </div>
  );
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div className={clsx("absolute top-1/2 translate-x-[-50%] translate-y-[-50%]", additionalClassNames)}>
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
        {children}
      </div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex gap-[10px] items-center justify-center pl-[20px] pr-[24px] py-[12px] relative size-full">{children}</div>
    </div>
  );
}
type IdPhotoHelperProps = {
  additionalClassNames?: string;
};

function IdPhotoHelper({ children, additionalClassNames = "" }: React.PropsWithChildren<IdPhotoHelperProps>) {
  return (
    <div className={clsx("h-[50px] relative shrink-0", additionalClassNames)}>
      <Wrapper>{children}</Wrapper>
    </div>
  );
}

function ArrowLeftShape({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper1 additionalClassNames="h-[22px] left-1/2 w-[26px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 22">
        {children}
      </svg>
    </Wrapper1>
  );
}

function KeyShape({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute h-[20px] left-1/2 top-[calc(50%+0.05px)] translate-x-[-50%] translate-y-[-50%] w-[20.1px]">
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.1 20">
          {children}
        </svg>
      </div>
    </div>
  );
}

function PersonBoardAddShape1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute left-[calc(50%+1px)] size-[20px] top-[calc(50%+1px)] translate-x-[-50%] translate-y-[-50%]">
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          {children}
        </svg>
      </div>
    </div>
  );
}
type Shape8Props = {
  additionalClassNames?: string;
};

function Shape8({ children, additionalClassNames = "" }: React.PropsWithChildren<Shape8Props>) {
  return (
    <div className={clsx("absolute size-[24px] translate-x-[-50%] translate-y-[-50%]", additionalClassNames)}>
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          {children}
        </svg>
      </div>
    </div>
  );
}

function PersonBoardAddShape({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute left-[calc(50%+0.75px)] size-[27.5px] top-[calc(50%+0.75px)] translate-x-[-50%] translate-y-[-50%]">
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.5 27.5">
          {children}
        </svg>
      </div>
    </div>
  );
}
type Shape7Props = {
  additionalClassNames?: string;
};

function Shape7({ children, additionalClassNames = "" }: React.PropsWithChildren<Shape7Props>) {
  return (
    <div className={clsx("absolute size-[16px] translate-x-[-50%] translate-y-[-50%]", additionalClassNames)}>
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          {children}
        </svg>
      </div>
    </div>
  );
}

function GuestShape5({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper1 additionalClassNames="h-[10px] left-1/2 w-[8px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 10">
        {children}
      </svg>
    </Wrapper1>
  );
}

function GuestShape4({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper1 additionalClassNames="h-[28px] left-1/2 w-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 28">
        {children}
      </svg>
    </Wrapper1>
  );
}

function GuestShape3({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper1 additionalClassNames="h-[40px] left-1/2 w-[32px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 40">
        {children}
      </svg>
    </Wrapper1>
  );
}

function GuestShape2({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper1 additionalClassNames="h-[14px] left-1/2 w-[10px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 14">
        {children}
      </svg>
    </Wrapper1>
  );
}

function GuestShape1({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper1 additionalClassNames="h-[16px] left-1/2 w-[12px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 16">
        {children}
      </svg>
    </Wrapper1>
  );
}

function GuestShape({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper1 additionalClassNames="h-[20px] left-1/2 w-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
        {children}
      </svg>
    </Wrapper1>
  );
}

function Shape6({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper1 additionalClassNames="left-1/2 size-[12px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        {children}
      </svg>
    </Wrapper1>
  );
}

function Shape5({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper1 additionalClassNames="left-1/2 size-[14px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        {children}
      </svg>
    </Wrapper1>
  );
}

function Shape4({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper1 additionalClassNames="left-1/2 size-[18px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        {children}
      </svg>
    </Wrapper1>
  );
}

function Shape3({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper1 additionalClassNames="left-1/2 size-[22px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        {children}
      </svg>
    </Wrapper1>
  );
}

function Shape2({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper1 additionalClassNames="left-1/2 size-[36px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        {children}
      </svg>
    </Wrapper1>
  );
}
type Shape1Props = {
  additionalClassNames?: string;
};

function Shape1({ children, additionalClassNames = "" }: React.PropsWithChildren<Shape1Props>) {
  return (
    <div className={clsx("absolute size-[26px] top-1/2 translate-x-[-50%] translate-y-[-50%]", additionalClassNames)}>
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
          {children}
        </svg>
      </div>
    </div>
  );
}
type ShapeProps = {
  additionalClassNames?: string;
};

function Shape({ children, additionalClassNames = "" }: React.PropsWithChildren<ShapeProps>) {
  return (
    <div className={clsx("absolute size-[15px] translate-x-[-50%] translate-y-[-50%]", additionalClassNames)}>
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
          {children}
        </svg>
      </div>
    </div>
  );
}

function Image4() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[22.141px]">
      <img alt="" className="absolute h-[124.49%] left-0 max-w-none top-[1.83%] w-full" src={imgImage2} />
    </div>
  );
}

function Image2ImageImage() {
  return (
    <div className="absolute inset-0 pointer-events-none rounded-[22.141px]">
      <Image4 />
      <div aria-hidden="true" className="absolute border-[2.768px] border-solid border-white inset-0 rounded-[22.141px]" />
    </div>
  );
}

function Image3() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[22.141px]">
      <img alt="" className="absolute h-[124.49%] left-0 max-w-none top-[0.04%] w-full" src={imgImage1} />
    </div>
  );
}

function Image1ImageImage() {
  return (
    <div className="absolute inset-0 pointer-events-none rounded-[22.141px]">
      <Image3 />
      <div aria-hidden="true" className="absolute border-[2.768px] border-solid border-white inset-0 rounded-[22.141px]" />
    </div>
  );
}
type ArrowResetProps = {
  className?: string;
  size?: "20" | "24" | "32" | "48";
  theme?: "Regular" | "Filled";
};

function ArrowReset({ className, size = "20", theme = "Regular" }: ArrowResetProps) {
  if (size === "20" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=20, Theme=Filled">
        <Shape additionalClassNames="left-[calc(50%-0.25px)] top-[calc(50%-0.25px)]">
          <path d={svgPaths.p2eed780} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape>
      </div>
    );
  }
  if (size === "24" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=24, Theme=Filled">
        <Wrapper1 additionalClassNames="h-[19.5px] left-[calc(50%-0.38px)] w-[19.25px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.25 19.5">
            <path d={svgPaths.p32305400} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </Wrapper1>
      </div>
    );
  }
  if (size === "24" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=24, Theme=Regular">
        <Wrapper1 additionalClassNames="left-[calc(50%-0.5px)] size-[19px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.p2ebd3af0} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </Wrapper1>
      </div>
    );
  }
  if (size === "32" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=32, Theme=Regular">
        <Shape1 additionalClassNames="left-[calc(50%-1px)]">
          <path d={svgPaths.p2a212b00} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape1>
      </div>
    );
  }
  if (size === "32" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=32, Theme=Filled">
        <Wrapper1 additionalClassNames="left-[calc(50%-1px)] size-[26.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.5 26.5">
            <path d={svgPaths.p39858300} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </Wrapper1>
      </div>
    );
  }
  if (size === "48" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=48, Theme=Regular">
        <Wrapper2 additionalClassNames="h-[38.5px] left-[calc(50%-1px)] w-[38px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38.0002 38.5">
            <path d={svgPaths.p33b55300} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </Wrapper2>
      </div>
    );
  }
  if (size === "48" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=48, Theme=Filled">
        <Wrapper2 additionalClassNames="h-[39px] left-[calc(50%-1px)] w-[38.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38.5 39">
            <path d={svgPaths.p57bcac0} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </Wrapper2>
      </div>
    );
  }
  return (
    <div className={className} data-name="Size=20, Theme=Regular">
      <Wrapper2 additionalClassNames="left-[calc(50%-0.25px)] size-[14.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5 14.5">
          <path d={svgPaths.p22b6d800} fill="var(--fill-0, #242424)" id="Shape" />
        </svg>
      </Wrapper2>
    </div>
  );
}
type ResetButtonProps = {
  className?: string;
  property1?: "Default" | "Variant2";
};

function ResetButton({ className, property1 = "Default" }: ResetButtonProps) {
  const element = <div aria-hidden="true" className="absolute border border-[rgba(31,31,31,0.1)] border-solid inset-0 pointer-events-none rounded-[999px]" />;
  const element1 = (
    <Wrapper>
      <ArrowReset className="overflow-clip relative shrink-0 size-[20px]" />
      <p className="font-['Alexandria:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#050505] text-[16px] text-nowrap">Reset</p>
    </Wrapper>
  );
  if (property1 === "Variant2") {
    return (
      <div className={className} data-name="Property 1=Variant2">
        {element}
        {element1}
      </div>
    );
  }
  return (
    <div className={className} data-name="Property 1=Default">
      {element}
      {element1}
    </div>
  );
}
type ImageProps = {
  className?: string;
  size?: "16" | "20" | "24" | "28" | "32" | "48";
  theme?: "Regular" | "Filled";
};

function Image({ className, size = "16", theme = "Regular" }: ImageProps) {
  if (size === "48" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=48, Theme=Regular">
        <Shape2>
          <path d={svgPaths.pc430400} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape2>
      </div>
    );
  }
  if (size === "48" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=48, Theme=Filled">
        <Shape2>
          <path d={svgPaths.p37b83500} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape2>
      </div>
    );
  }
  if (size === "28" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=28, Theme=Regular">
        <Shape3>
          <path d={svgPaths.p39f14800} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape3>
      </div>
    );
  }
  if (size === "28" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=28, Theme=Filled">
        <Shape3>
          <path d={svgPaths.p2f68e6c0} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape3>
      </div>
    );
  }
  if (size === "24" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=24, Theme=Regular">
        <Shape4>
          <path d={svgPaths.p2567d200} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape4>
      </div>
    );
  }
  if (size === "24" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=24, Theme=Filled">
        <Shape4>
          <path d={svgPaths.p80f88c0} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape4>
      </div>
    );
  }
  if (size === "20" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=20, Theme=Regular">
        <Shape5>
          <path d={svgPaths.p19631e80} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape5>
      </div>
    );
  }
  if (size === "20" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=20, Theme=Filled">
        <Shape5>
          <path d={svgPaths.p83f1700} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape5>
      </div>
    );
  }
  if (size === "16" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=16, Theme=Filled">
        <Shape6>
          <path d={svgPaths.p19271400} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape6>
      </div>
    );
  }
  if (size === "32" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=32, Theme=Regular">
        <Shape1 additionalClassNames="left-1/2">
          <path d={svgPaths.pe5fb800} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape1>
      </div>
    );
  }
  if (size === "32" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=32, Theme=Filled">
        <Shape1 additionalClassNames="left-1/2">
          <path d={svgPaths.p19295b00} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape1>
      </div>
    );
  }
  return (
    <div className={className} data-name="Size=16, Theme=Regular">
      <Shape6>
        <path d={svgPaths.pe2f400} fill="var(--fill-0, #242424)" id="Shape" />
      </Shape6>
    </div>
  );
}
type BlackProps = {
  className?: string;
  property1?: "Default" | "Variant2";
};

function Black({ className, property1 = "Default" }: BlackProps) {
  if (property1 === "Variant2") {
    return (
      <button className={className} data-name="Property 1=Variant2">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
          <circle cx="25" cy="25" fill="var(--fill-0, #3D3D3D)" id="Ellipse 3" r="23.5" stroke="url(#paint0_linear_88_613)" strokeWidth="3" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_88_613" x1="-175.775" x2="50.0198" y1="2.85292" y2="3.26628">
              <stop stopColor="#8B5CF6" />
              <stop offset="0.5" stopColor="#A855F7" />
              <stop offset="1" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>
      </button>
    );
  }
  return (
    <button className={className} data-name="Property 1=Default">
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(61, 61, 61, 1)", "--stroke-0": "rgba(179, 179, 179, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
          <circle cx="25" cy="25" fill="var(--fill-0, #3D3D3D)" id="Ellipse 3" r="23.5" stroke="var(--stroke-0, #B3B3B3)" strokeWidth="3" />
        </svg>
      </div>
    </button>
  );
}
type GreyProps = {
  className?: string;
  property1?: "Default" | "Variant2";
};

function Grey({ className, property1 = "Default" }: GreyProps) {
  if (property1 === "Variant2") {
    return (
      <button className={className} data-name="Property 1=Variant2">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
          <circle cx="25" cy="25" fill="var(--fill-0, #EDEDED)" id="Ellipse 3" r="23.5" stroke="url(#paint0_linear_88_559)" strokeWidth="3" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_88_559" x1="-175.775" x2="50.0198" y1="2.85292" y2="3.26628">
              <stop stopColor="#8B5CF6" />
              <stop offset="0.5" stopColor="#A855F7" />
              <stop offset="1" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>
      </button>
    );
  }
  return (
    <button className={className} data-name="Property 1=Default">
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(237, 237, 237, 1)", "--stroke-0": "rgba(179, 179, 179, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
          <circle cx="25" cy="25" fill="var(--fill-0, #EDEDED)" id="Ellipse 3" r="23.5" stroke="var(--stroke-0, #B3B3B3)" strokeWidth="3" />
        </svg>
      </div>
    </button>
  );
}
type WhiteProps = {
  className?: string;
  property1?: "Default" | "Variant2";
};

function White({ className, property1 = "Default" }: WhiteProps) {
  if (property1 === "Variant2") {
    return (
      <button className={className} data-name="Property 1=Variant2">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
          <circle cx="25" cy="25" fill="var(--fill-0, white)" id="Ellipse 3" r="23.5" stroke="url(#paint0_linear_88_537)" strokeWidth="3" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_88_537" x1="-175.775" x2="50.0198" y1="2.85292" y2="3.26628">
              <stop stopColor="#8B5CF6" />
              <stop offset="0.5" stopColor="#A855F7" />
              <stop offset="1" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>
      </button>
    );
  }
  return (
    <button className={className} data-name="Property 1=Default">
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 255, 255, 1)", "--stroke-0": "rgba(179, 179, 179, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
          <circle cx="25" cy="25" fill="var(--fill-0, white)" id="Ellipse 3" r="23.5" stroke="var(--stroke-0, #B3B3B3)" strokeWidth="3" />
        </svg>
      </div>
    </button>
  );
}
type RedProps = {
  className?: string;
  property1?: "Default" | "Variant2";
};

function Red({ className, property1 = "Default" }: RedProps) {
  if (property1 === "Variant2") {
    return (
      <button className={className} data-name="Property 1=Variant2">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
          <circle cx="25" cy="25" fill="var(--fill-0, #FF907F)" id="Ellipse 3" r="23.5" stroke="url(#paint0_linear_88_553)" strokeWidth="3" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_88_553" x1="-175.775" x2="50.0198" y1="2.85292" y2="3.26628">
              <stop stopColor="#8B5CF6" />
              <stop offset="0.5" stopColor="#A855F7" />
              <stop offset="1" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>
      </button>
    );
  }
  return (
    <button className={className} data-name="Property 1=Default">
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 144, 127, 1)", "--stroke-0": "rgba(179, 179, 179, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
          <circle cx="25" cy="25" fill="var(--fill-0, #FF907F)" id="Ellipse 3" r="23.5" stroke="var(--stroke-0, #B3B3B3)" strokeWidth="3" />
        </svg>
      </div>
    </button>
  );
}
type BlueProps = {
  className?: string;
  property1?: "Default" | "Variant2";
};

function Blue({ className, property1 = "Default" }: BlueProps) {
  if (property1 === "Variant2") {
    return (
      <button className={className} data-name="Property 1=Variant2">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
          <circle cx="25" cy="25" fill="var(--fill-0, #E6F0FF)" id="Ellipse 3" r="23.5" stroke="url(#paint0_linear_88_575)" strokeWidth="3" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_88_575" x1="-175.775" x2="50.0198" y1="2.85292" y2="3.26628">
              <stop stopColor="#8B5CF6" />
              <stop offset="0.5" stopColor="#A855F7" />
              <stop offset="1" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>
      </button>
    );
  }
  return (
    <button className={className} data-name="Property 1=Default">
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(230, 240, 255, 1)", "--stroke-0": "rgba(179, 179, 179, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
          <circle cx="25" cy="25" fill="var(--fill-0, #E6F0FF)" id="Ellipse 3" r="23.5" stroke="var(--stroke-0, #B3B3B3)" strokeWidth="3" />
        </svg>
      </div>
    </button>
  );
}
type ImageTableProps = {
  className?: string;
  size?: "16" | "20" | "24" | "28" | "32" | "48";
  theme?: "Regular" | "Filled";
};

function ImageTable({ className, size = "16", theme = "Regular" }: ImageTableProps) {
  if (size === "48" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=48, Theme=Regular">
        <Shape2>
          <path d={svgPaths.p320780c0} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape2>
      </div>
    );
  }
  if (size === "48" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=48, Theme=Filled">
        <Shape2>
          <path d={svgPaths.p2aed6f00} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape2>
      </div>
    );
  }
  if (size === "32" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=32, Theme=Regular">
        <Shape1 additionalClassNames="left-1/2">
          <path d={svgPaths.pa386100} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape1>
      </div>
    );
  }
  if (size === "32" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=32, Theme=Filled">
        <Shape1 additionalClassNames="left-1/2">
          <path d={svgPaths.p144f4b80} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape1>
      </div>
    );
  }
  if (size === "28" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=28, Theme=Regular">
        <Shape3>
          <path d={svgPaths.p939ae80} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape3>
      </div>
    );
  }
  if (size === "28" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=28, Theme=Filled">
        <Shape3>
          <path d={svgPaths.p312472c0} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape3>
      </div>
    );
  }
  if (size === "24" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=24, Theme=Regular">
        <Shape4>
          <path d={svgPaths.p2ed49e00} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape4>
      </div>
    );
  }
  if (size === "24" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=24, Theme=Filled">
        <Shape4>
          <path d={svgPaths.p7eb5200} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape4>
      </div>
    );
  }
  if (size === "20" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=20, Theme=Regular">
        <Shape5>
          <path d={svgPaths.pc635d00} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape5>
      </div>
    );
  }
  if (size === "20" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=20, Theme=Filled">
        <Shape5>
          <path d={svgPaths.p2492da80} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape5>
      </div>
    );
  }
  if (size === "16" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=16, Theme=Filled">
        <Shape6>
          <path d={svgPaths.p388480} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape6>
      </div>
    );
  }
  return (
    <div className={className} data-name="Size=16, Theme=Regular">
      <Shape6>
        <path d={svgPaths.p231cc300} fill="var(--fill-0, #242424)" id="Shape" />
      </Shape6>
    </div>
  );
}
type Image1Props = {
  className?: string;
  property1?: "Default" | "Variant2" | "Variant3";
};

function Image1({ className, property1 = "Default" }: Image1Props) {
  if (property1 === "Variant2") {
    return (
      <button className={className} data-name="Property 1=Variant2">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <Image1ImageImage />
          <div className="absolute backdrop-blur-[7.5px] backdrop-filter bg-[rgba(39,39,39,0.54)] inset-[-0.88%_-11.76%_-0.88%_-11.23%]" />
          <div className="absolute content-stretch flex flex-col gap-[8px] items-center justify-center leading-[normal] left-1/2 px-[20px] py-0 text-center top-1/2 translate-x-[-50%] translate-y-[-50%] w-[183px]">
            <p className="font-['Alexandria:SemiBold',sans-serif] font-semibold relative shrink-0 text-[16px] text-white w-full">Professional use</p>
            <p className="font-['Alexandria:Medium',sans-serif] font-medium relative shrink-0 text-[#ccc] text-[10px] w-full">Polished, confident, workplace-ready</p>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-[2.77px] border-solid border-white inset-0 pointer-events-none rounded-[22.14px]" />
      </button>
    );
  }
  if (property1 === "Variant3") {
    return (
      <div className={className} data-name="Property 1=Variant3">
        <div className="absolute inset-0 pointer-events-none rounded-[22.141px]" data-name="image 1">
          <Image3 />
          <div aria-hidden="true" className="absolute border-[#8b5cf6] border-[2.768px] border-solid inset-0 rounded-[22.141px]" />
        </div>
      </div>
    );
  }
  return (
    <div className={className} data-name="Property 1=Default">
      <Image1ImageImage />
    </div>
  );
}
type Image2Props = {
  className?: string;
  property1?: "Default" | "Variant2" | "Variant3";
};

function Image2({ className, property1 = "Default" }: Image2Props) {
  if (property1 === "Variant2") {
    return (
      <button className={className} data-name="Property 1=Variant2">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <Image2ImageImage />
          <div className="absolute backdrop-blur-[7.5px] backdrop-filter bg-[rgba(39,39,39,0.54)] inset-[-0.88%_-11.17%]" />
          <div className="absolute content-stretch flex flex-col gap-[8px] inset-[34.07%_1.6%_34.07%_1.06%] items-center justify-center leading-[normal] px-[20px] py-0 text-center">
            <p className="font-['Alexandria:SemiBold',sans-serif] font-semibold relative shrink-0 text-[16px] text-white w-full">Official submission</p>
            <p className="font-['Alexandria:Medium',sans-serif] font-medium relative shrink-0 text-[#ccc] text-[10px] w-full">Strict, neutral, compliance-focused</p>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-[2.77px] border-solid border-white inset-0 pointer-events-none rounded-[22.14px]" />
      </button>
    );
  }
  if (property1 === "Variant3") {
    return (
      <div className={className} data-name="Property 1=Variant3">
        <div className="absolute inset-0 pointer-events-none rounded-[22.141px]" data-name="image 2">
          <Image4 />
          <div aria-hidden="true" className="absolute border-[#8b5cf6] border-[2.768px] border-solid inset-0 rounded-[22.141px]" />
        </div>
      </div>
    );
  }
  return (
    <div className={className} data-name="Property 1=Default">
      <Image2ImageImage />
    </div>
  );
}
type GuestProps = {
  className?: string;
  size?: "12" | "16" | "20" | "24" | "28" | "32" | "48";
  theme?: "Regular" | "Filled";
};

function Guest({ className, size = "12", theme = "Regular" }: GuestProps) {
  if (size === "28" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=28, Theme=Regular">
        <Wrapper1 additionalClassNames="h-[24px] left-1/2 w-[20px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 23.9997">
            <path d={svgPaths.p1a037540} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </Wrapper1>
      </div>
    );
  }
  if (size === "28" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=28, Theme=Filled">
        <Wrapper1 additionalClassNames="h-[24px] left-1/2 w-[20px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 24">
            <path d={svgPaths.p3520b900} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </Wrapper1>
      </div>
    );
  }
  if (size === "24" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=24, Theme=Regular">
        <GuestShape>
          <path d={svgPaths.p2aeca600} fill="var(--fill-0, #242424)" id="Shape" />
        </GuestShape>
      </div>
    );
  }
  if (size === "24" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=24, Theme=Filled">
        <GuestShape>
          <path d={svgPaths.p2181aa80} fill="var(--fill-0, #242424)" id="Shape" />
        </GuestShape>
      </div>
    );
  }
  if (size === "20" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=20, Theme=Regular">
        <GuestShape1>
          <path d={svgPaths.p2b043b00} fill="var(--fill-0, #242424)" id="Shape" />
        </GuestShape1>
      </div>
    );
  }
  if (size === "20" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=20, Theme=Filled">
        <GuestShape1>
          <path d={svgPaths.p2cf9b300} fill="var(--fill-0, #242424)" id="Shape" />
        </GuestShape1>
      </div>
    );
  }
  if (size === "16" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=16, Theme=Regular">
        <GuestShape2>
          <path d={svgPaths.p16309100} fill="var(--fill-0, #242424)" id="Shape" />
        </GuestShape2>
      </div>
    );
  }
  if (size === "16" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=16, Theme=Filled">
        <GuestShape2>
          <path d={svgPaths.p335d600} fill="var(--fill-0, #242424)" id="Shape" />
        </GuestShape2>
      </div>
    );
  }
  if (size === "48" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=48, Theme=Regular">
        <GuestShape3>
          <path d={svgPaths.p1375f300} fill="var(--fill-0, #242424)" id="Shape" />
        </GuestShape3>
      </div>
    );
  }
  if (size === "48" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=48, Theme=Filled">
        <GuestShape3>
          <path d={svgPaths.p1c9aae00} fill="var(--fill-0, #242424)" id="Shape" />
        </GuestShape3>
      </div>
    );
  }
  if (size === "32" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=32, Theme=Regular">
        <GuestShape4>
          <path d={svgPaths.p2b8f4d80} fill="var(--fill-0, #242424)" id="Shape" />
        </GuestShape4>
      </div>
    );
  }
  if (size === "32" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=32, Theme=Filled">
        <GuestShape4>
          <path d={svgPaths.p336f000} fill="var(--fill-0, #242424)" id="Shape" />
        </GuestShape4>
      </div>
    );
  }
  if (size === "12" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=12, Theme=Filled">
        <GuestShape5>
          <path d={svgPaths.p251f5800} fill="var(--fill-0, #242424)" id="Shape" />
        </GuestShape5>
      </div>
    );
  }
  return (
    <div className={className} data-name="Size=12, Theme=Regular">
      <GuestShape5>
        <path d={svgPaths.p22b60580} fill="var(--fill-0, #242424)" id="Shape" />
      </GuestShape5>
    </div>
  );
}
type PersonBoardAddProps = {
  className?: string;
  size?: "16" | "20" | "24" | "28" | "32";
  theme?: "Regular" | "Filled";
};

function PersonBoardAdd({ className, size = "16", theme = "Regular" }: PersonBoardAddProps) {
  if (size === "20" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=20, Theme=Regular">
        <Shape7 additionalClassNames="left-[calc(50%+1px)] top-[calc(50%+1px)]">
          <path d={svgPaths.p6e12ff0} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape7>
      </div>
    );
  }
  if (size === "20" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=20, Theme=Filled">
        <Shape7 additionalClassNames="left-[calc(50%+1px)] top-[calc(50%+1px)]">
          <path d={svgPaths.p9bf9700} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape7>
      </div>
    );
  }
  if (size === "32" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=32, Theme=Regular">
        <PersonBoardAddShape>
          <path d={svgPaths.p9076400} fill="var(--fill-0, #242424)" id="Shape" />
        </PersonBoardAddShape>
      </div>
    );
  }
  if (size === "32" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=32, Theme=Filled">
        <PersonBoardAddShape>
          <path d={svgPaths.p51a7a80} fill="var(--fill-0, #242424)" id="Shape" />
        </PersonBoardAddShape>
      </div>
    );
  }
  if (size === "28" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=28, Theme=Regular">
        <Shape8 additionalClassNames="left-[calc(50%+1px)] top-[calc(50%+1px)]">
          <path d={svgPaths.p1ed0fc00} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape8>
      </div>
    );
  }
  if (size === "28" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=28, Theme=Filled">
        <Shape8 additionalClassNames="left-[calc(50%+1px)] top-[calc(50%+1px)]">
          <path d={svgPaths.p10eaf080} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape8>
      </div>
    );
  }
  if (size === "24" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=24, Theme=Regular">
        <PersonBoardAddShape1>
          <path d={svgPaths.p3a862d00} fill="var(--fill-0, #242424)" id="Shape" />
        </PersonBoardAddShape1>
      </div>
    );
  }
  if (size === "24" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=24, Theme=Filled">
        <PersonBoardAddShape1>
          <path d={svgPaths.p2c2db70} fill="var(--fill-0, #242424)" id="Shape" />
        </PersonBoardAddShape1>
      </div>
    );
  }
  if (size === "16" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=16, Theme=Filled">
        <Shape additionalClassNames="left-[calc(50%+0.5px)] top-[calc(50%+0.5px)]">
          <path d={svgPaths.pacca380} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape>
      </div>
    );
  }
  return (
    <div className={className} data-name="Size=16, Theme=Regular">
      <Shape additionalClassNames="left-[calc(50%+0.5px)] top-[calc(50%+0.5px)]">
        <path d={svgPaths.p1638db50} fill="var(--fill-0, #242424)" id="Shape" />
      </Shape>
    </div>
  );
}
type KeyProps = {
  className?: string;
  size?: "16" | "20" | "24" | "32";
  theme?: "Regular" | "Filled";
};

function Key({ className, size = "16", theme = "Regular" }: KeyProps) {
  if (size === "24" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=24, Theme=Regular">
        <KeyShape>
          <path d={svgPaths.p2c458f80} fill="var(--fill-0, #242424)" id="Shape" />
        </KeyShape>
      </div>
    );
  }
  if (size === "24" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=24, Theme=Filled">
        <KeyShape>
          <path d={svgPaths.p1aa8b600} fill="var(--fill-0, #242424)" id="Shape" />
        </KeyShape>
      </div>
    );
  }
  if (size === "20" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=20, Theme=Regular">
        <Shape7 additionalClassNames="left-1/2 top-1/2">
          <path d={svgPaths.pbfef400} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape7>
      </div>
    );
  }
  if (size === "20" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=20, Theme=Filled">
        <Shape7 additionalClassNames="left-1/2 top-1/2">
          <path d={svgPaths.p3cdaff00} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape7>
      </div>
    );
  }
  if (size === "16" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=16, Theme=Filled">
        <Shape6>
          <path d={svgPaths.p28000700} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape6>
      </div>
    );
  }
  if (size === "32" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=32, Theme=Regular">
        <Shape8 additionalClassNames="left-1/2 top-1/2">
          <g id="Shape">
            <path d={svgPaths.p21064a00} fill="var(--fill-0, #242424)" />
            <path d={svgPaths.p308b2680} fill="var(--fill-0, #242424)" />
          </g>
        </Shape8>
      </div>
    );
  }
  if (size === "32" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=32, Theme=Filled">
        <Shape8 additionalClassNames="left-1/2 top-1/2">
          <path d={svgPaths.p1bc70e00} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape8>
      </div>
    );
  }
  return (
    <div className={className} data-name="Size=16, Theme=Regular">
      <Shape6>
        <g id="Shape">
          <path d={svgPaths.p138aa080} fill="var(--fill-0, #242424)" />
          <path d={svgPaths.p2cab7200} fill="var(--fill-0, #242424)" />
        </g>
      </Shape6>
    </div>
  );
}
type ArrowLeftProps = {
  className?: string;
  size?: "12" | "16" | "20" | "24" | "28" | "32" | "48";
  theme?: "Regular" | "Filled";
};

function ArrowLeft({ className, size = "12", theme = "Regular" }: ArrowLeftProps) {
  if (size === "28" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=28, Theme=Regular">
        <Wrapper1 additionalClassNames="h-[19.999px] left-1/2 w-[22.003px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.0032 19.9991">
            <path d={svgPaths.p208c6000} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </Wrapper1>
      </div>
    );
  }
  if (size === "28" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=28, Theme=Filled">
        <Wrapper1 additionalClassNames="h-[19.998px] left-1/2 w-[22.003px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.0032 19.9977">
            <path d={svgPaths.p36eb4a80} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </Wrapper1>
      </div>
    );
  }
  if (size === "24" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=24, Theme=Regular">
        <Wrapper1 additionalClassNames="h-[15.995px] left-1/2 w-[18px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 15.9955">
            <path d={svgPaths.p16f56a80} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </Wrapper1>
      </div>
    );
  }
  if (size === "24" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=24, Theme=Filled">
        <Wrapper1 additionalClassNames="h-[16.001px] left-1/2 w-[18.001px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0014 16.0009">
            <path d={svgPaths.p90fbd00} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </Wrapper1>
      </div>
    );
  }
  if (size === "20" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=20, Theme=Regular">
        <Wrapper1 additionalClassNames="h-[13.997px] left-1/2 w-[16px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 13.9974">
            <path d={svgPaths.p202fac00} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </Wrapper1>
      </div>
    );
  }
  if (size === "20" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=20, Theme=Filled">
        <Wrapper1 additionalClassNames="h-[14.002px] left-1/2 w-[16px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 14.0021">
            <path d={svgPaths.p33ac0900} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </Wrapper1>
      </div>
    );
  }
  if (size === "32" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=32, Theme=Regular">
        <ArrowLeftShape>
          <path d={svgPaths.p16fbc380} fill="var(--fill-0, #242424)" id="Shape" />
        </ArrowLeftShape>
      </div>
    );
  }
  if (size === "32" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=32, Theme=Filled">
        <ArrowLeftShape>
          <path d={svgPaths.p2fc23380} fill="var(--fill-0, #242424)" id="Shape" />
        </ArrowLeftShape>
      </div>
    );
  }
  if (size === "48" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=48, Theme=Regular">
        <Wrapper1 additionalClassNames="h-[32px] left-[calc(50%+1px)] w-[38px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 31.9999">
            <path d={svgPaths.p2be2a00} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </Wrapper1>
      </div>
    );
  }
  if (size === "48" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=48, Theme=Filled">
        <Wrapper1 additionalClassNames="h-[32.5px] left-[calc(50%+1px)] w-[38.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38.5 32.5">
            <path d={svgPaths.p6f5cdc0} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </Wrapper1>
      </div>
    );
  }
  if (size === "16" && theme === "Regular") {
    return (
      <div className={className} data-name="Size=16, Theme=Regular">
        <Wrapper1 additionalClassNames="h-[10px] left-1/2 w-[12px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 10">
            <path d={svgPaths.p1efc8980} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </Wrapper1>
      </div>
    );
  }
  if (size === "16" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=16, Theme=Filled">
        <Wrapper1 additionalClassNames="h-[10px] left-[calc(50%-0.13px)] w-[12.25px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.25 10">
            <path d={svgPaths.p40a2d80} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </Wrapper1>
      </div>
    );
  }
  if (size === "12" && theme === "Filled") {
    return (
      <div className={className} data-name="Size=12, Theme=Filled">
        <Wrapper1 additionalClassNames="h-[8px] left-[calc(50%-0.13px)] w-[9.25px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.25 8.0002">
            <path d={svgPaths.p15098500} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </Wrapper1>
      </div>
    );
  }
  return (
    <div className={className} data-name="Size=12, Theme=Regular">
      <Wrapper1 additionalClassNames="h-[8px] left-1/2 w-[9px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 8">
          <path d={svgPaths.pe859500} fill="var(--fill-0, #242424)" id="Shape" />
        </svg>
      </Wrapper1>
    </div>
  );
}

export default function IdPhoto() {
  return (
    <div className="bg-white h-[1080px] relative translate-x-[-50%] translate-y-[-50%] w-[1920px]" data-name="ID Photo">
      <div className="content-stretch flex flex-col items-start relative size-full">
        <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center justify-between px-[40px] py-0 relative size-full">
              <div className="content-stretch flex gap-[33px] items-center relative shrink-0">
                <ArrowLeft className="overflow-clip relative shrink-0 size-[20px]" size="20" />
                <div className="content-stretch flex gap-[18px] items-center relative shrink-0">
                  <div className="flex h-[30px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
                    <div className="flex-none rotate-[90deg]">
                      <div className="h-0 relative w-[30px]">
                        <div className="absolute inset-[-1px_0_0_0]" style={{ "--stroke-0": "rgba(179, 179, 179, 1)" } as React.CSSProperties}>
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 1">
                            <line id="Line 1" stroke="var(--stroke-0, #B3B3B3)" strokeLinecap="round" x1="0.5" x2="29.5" y1="0.5" y2="0.5" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[8px] items-start leading-[normal] relative shrink-0 text-[#050505] w-[1036px]" data-name="content">
                    <p className="font-['Alexandria:SemiBold',sans-serif] font-semibold relative shrink-0 text-[20px] w-full">ID Photo</p>
                    <p className="font-['Alexandria:Regular',sans-serif] font-normal relative shrink-0 text-[16px] w-full">Clean, compliant photos for official use</p>
                  </div>
                </div>
              </div>
              <div className="h-[50px] relative rounded-[999px] shrink-0 w-[200px]" data-name="API key button">
                <div aria-hidden="true" className="absolute border border-[rgba(31,31,31,0.1)] border-solid inset-0 pointer-events-none rounded-[999px]" />
                <Wrapper>
                  <Key className="overflow-clip relative shrink-0 size-[16px]" />
                  <p className="font-['Alexandria:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#050505] text-[16px] text-nowrap">API key</p>
                </Wrapper>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex h-[1012px] items-center justify-between relative shrink-0 w-full">
          <div aria-hidden="true" className="absolute border-[#b3b3b3] border-[1px_0px_0px] border-solid inset-[-1px_0_0_0] pointer-events-none" />
          <div className="bg-white content-stretch flex flex-col h-full items-center pb-[40px] pt-[20px] px-[40px] relative shrink-0 w-[521px]">
            <div className="content-stretch flex flex-col gap-[40px] items-end relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[28px] items-start relative shrink-0 w-full">
                <div className="content-stretch flex gap-[12px] items-center justify-center pl-[8px] pr-0 py-0 relative shrink-0">
                  <PersonBoardAdd className="relative shrink-0 size-[28px]" size="28" />
                  <ol className="block font-['Alexandria:SemiBold',sans-serif] font-semibold leading-[0] list-decimal relative shrink-0 text-[#050505] text-[16px] text-center text-nowrap uppercase" start="1">
                    <li className="list-inside ms-[24px]">
                      <span className="leading-[normal]">photo input</span>
                    </li>
                  </ol>
                </div>
                <div className="h-[199px] relative rounded-[16px] shrink-0 w-full" data-name="Upload Photo">
                  <div aria-hidden="true" className="absolute border-[#b3b3b3] border-[3px] border-dashed inset-[-1.5px] pointer-events-none rounded-[17.5px]" />
                  <div className="flex flex-col items-center justify-center size-full">
                    <div className="content-stretch flex flex-col gap-[28px] items-center justify-center pb-0 pt-[10px] px-0 relative size-full">
                      <div className="overflow-clip relative shrink-0 size-[32px]" data-name="Image Add">
                        <div className="absolute left-[calc(50%-1px)] size-[28px] top-[calc(50%-1px)] translate-x-[-50%] translate-y-[-50%]" data-name="Shape">
                          <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
                              <path d={svgPaths.p3602aa80} fill="var(--fill-0, #242424)" id="Shape" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col gap-[8px] items-center leading-[normal] relative shrink-0">
                        <p className="font-['Alexandria:SemiBold',sans-serif] font-semibold relative shrink-0 text-[#050505] text-[16px] text-center w-full">Upload Photo</p>
                        <p className="font-['Alexandria:Medium',sans-serif] font-medium relative shrink-0 text-[#999] text-[13px] w-full">Face should be clearly visible</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[28px] items-start relative shrink-0 w-full">
                <div className="content-stretch flex gap-[12px] items-center justify-center pl-[8px] pr-0 py-0 relative shrink-0">
                  <Guest className="overflow-clip relative shrink-0 size-[28px]" size="28" />
                  <ol className="block font-['Alexandria:SemiBold',sans-serif] font-semibold leading-[0] list-decimal relative shrink-0 text-[#050505] text-[16px] text-center text-nowrap uppercase" start="2">
                    <li className="list-inside ms-[24px]">
                      <span className="leading-[normal]">Photo Purpose</span>
                    </li>
                  </ol>
                </div>
                <div className="content-stretch flex gap-[36px] items-center relative shrink-0" data-name="photograph">
                  <Image2 className="h-[226px] relative shrink-0 w-[188px]" />
                  <Image1 className="h-[226px] relative shrink-0 w-[187px]" />
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[28px] items-start relative shrink-0 w-full">
                <div className="content-stretch flex gap-[12px] items-center justify-center pl-[8px] pr-0 py-0 relative shrink-0">
                  <ImageTable className="overflow-clip relative shrink-0 size-[28px]" size="28" />
                  <ol className="block font-['Alexandria:SemiBold',sans-serif] font-semibold leading-[0] list-decimal relative shrink-0 text-[#050505] text-[16px] text-center text-nowrap uppercase" start="3">
                    <li className="list-inside ms-[24px]">
                      <span className="leading-[normal]">background</span>
                    </li>
                  </ol>
                </div>
                <div className="content-stretch cursor-pointer flex gap-[16px] items-center justify-center relative shrink-0 w-full" data-name="color list">
                  <Blue className="block relative shrink-0 size-[50px]" property1="Variant2" />
                  <Red className="block relative shrink-0 size-[50px]" />
                  <White className="block relative shrink-0 size-[50px]" />
                  <Grey className="block relative shrink-0 size-[50px]" />
                  <Black className="block relative shrink-0 size-[50px]" />
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[8px] items-start justify-center pb-0 pt-[20px] px-0 relative shrink-0 w-full">
                <p className="font-['Alexandria:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[11px] text-black text-nowrap">* Ready to generate a compliant ID photo</p>
                <IdPhotoHelper additionalClassNames="bg-[#333] rounded-[12px] w-full">
                  <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Sparkle">
                    <IdPhotoShape additionalClassNames="h-[13.997px] top-1/2 w-[14.001px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.0007 13.9974">
                        <path d={svgPaths.p37928d00} fill="var(--fill-0, white)" fillOpacity="0.9" id="Shape" />
                      </svg>
                    </IdPhotoShape>
                  </div>
                  <p className="font-['Alexandria:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.9)] text-nowrap">Generate</p>
                </IdPhotoHelper>
              </div>
            </div>
          </div>
          <div className="basis-0 bg-[#fafafa] grow h-full min-h-px min-w-px relative shrink-0">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center p-[10px] relative size-full">
                <div className="content-stretch flex flex-col gap-[29px] items-center justify-center relative shrink-0 w-[575px]">
                  <div className="content-stretch flex flex-col gap-[15.68px] h-[862px] items-center justify-center pb-0 pt-[5.6px] px-0 relative rounded-[8.96px] shrink-0 w-[575px]" data-name="Photo preview">
                    <div aria-hidden="true" className="absolute border-[#b3b3b3] border-[1.68px] border-dashed inset-[-0.84px] pointer-events-none rounded-[9.8px]" />
                    <Image className="overflow-clip relative shrink-0 size-[32px]" size="32" />
                    <div className="content-stretch flex flex-col items-center relative shrink-0">
                      <p className="font-['Alexandria:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#050505] text-[16px] text-center w-full">Image preview</p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                    <ResetButton className="h-[50px] relative rounded-[999px] shrink-0 w-[200px]" />
                    <IdPhotoHelper additionalClassNames="bg-[#a6a6a6] rounded-[999px] w-[200px]">
                      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Arrow Download">
                        <IdPhotoShape additionalClassNames="h-[13px] top-[calc(50%-0.5px)] w-[10px]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 13">
                            <path d={svgPaths.p2f9c1e00} fill="var(--fill-0, white)" id="Shape" />
                          </svg>
                        </IdPhotoShape>
                      </div>
                      <p className="font-['Alexandria:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.9)] text-nowrap">Download</p>
                    </IdPhotoHelper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
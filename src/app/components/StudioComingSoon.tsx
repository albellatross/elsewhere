import { useLottie } from "lottie-react";
import comingSoonAnimation from "@ainimation/Coming Soon.json";

type StudioComingSoonProps = {
  size?: number | string;
  className?: string;
};

const StudioComingSoon = ({ size = "2.4%", className = "" }: StudioComingSoonProps) => {
  const options = {
    animationData: comingSoonAnimation,
    loop: true,
    autoplay: true,
  };

  const style = {
    width: typeof size === "number" ? `${size}px` : size,
    height: typeof size === "number" ? `${size}px` : size,
  };

  const { View } = useLottie(options, { style });

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="overflow-hidden">{View}</div>
    </div>
  );
};

export default StudioComingSoon;


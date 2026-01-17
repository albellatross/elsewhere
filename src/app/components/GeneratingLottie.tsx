import { useLottie } from "lottie-react";
import generatingAnimation from "@/assets/Generating.json";

type GeneratingLottieProps = {
  size?: number;
};

// 轻量的生成中动画，带浅紫色柔光背景
const GeneratingLottie = ({ size = 36 }: GeneratingLottieProps) => {
  const options = {
    animationData: generatingAnimation,
    loop: true,
    autoplay: true,
  };

  const style = { width: size, height: size };
  const { View } = useLottie(options, { style });

  return (
    <div className="relative inline-flex items-center justify-center">
      <div className="absolute inset-[-8px] rounded-full bg-gradient-to-br from-[#f2ecff] via-[#e6daff] to-[#dcd0ff] blur-md opacity-85" />
      <div className="relative">{View}</div>
    </div>
  );
};

export default GeneratingLottie;


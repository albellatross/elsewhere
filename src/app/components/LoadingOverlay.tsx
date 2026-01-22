import { useEffect, useState } from "react";
import { useLottie } from "lottie-react";
import loadingAnimation from "@/assets/LoadingPage.json";

type LoadingOverlayProps = {
  size?: number | string;
};

const LoadingOverlay = ({ size = "40vmin" }: LoadingOverlayProps) => {
  const options = {
    animationData: loadingAnimation,
    loop: true,
    autoplay: true,
  };

  const style = {
    width: typeof size === "number" ? `${size}px` : size,
    height: typeof size === "number" ? `${size}px` : size,
  };
  const textOffset = "-140px";
  const { View } = useLottie(options, { style });

  const messages = [
    "Going somewhere else…",
    "You’re in between now",
    "On the way to elsewhere",
    "A moment outside the moment",
    "Let the world take a breath",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => window.clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <div className="overflow-hidden" style={style}>
          {View}
        </div>
        <div
          className="text-[13px] md:text-[14px] text-[#5f5f66] tracking-[0.06em] font-sans font-medium text-center"
          style={{ marginTop: textOffset }}
        >
          <div className="story-line" key={messageIndex}>
            {messages[messageIndex]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;


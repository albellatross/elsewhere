import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useLottie } from "lottie-react";
import cameraAnimation from "../../../../ainimation/Camera.json";
import coffeeAnimation from "../../../../ainimation/coffee machine.json";
import ramenAnimation from "../../../../ainimation/Ramen Bowl.json";
import chatAnimation from "../../../../ainimation/Online Chatting.json";
import sunbedAnimation from "../../../../ainimation/Beach Furniture.json";
import windAnimation from "../../../../ainimation/Forest Tracking.json";
import sunsetAnimation from "../../../../ainimation/Forest River.json";
import cutleryAnimation from "../../../../ainimation/Potluck Dinner (1).json";
import magicAnimation from "../../../../ainimation/Magic Wand.json";
import celebrationAnimation from "../../../../ainimation/Confetti.json";

const ANIMATION_DURATION = 3; // Sync with text rotation interval (3s)

interface StandardAnimatedLottieProps {
  animationData: object;
  onComplete: () => void;
  scaleMultiplier?: number;
  offset?: { x: number; y: number };
}

const StandardAnimatedLottie = ({ 
  animationData,
  onComplete, 
  scaleMultiplier = 1, 
  offset = { x: 0, y: 0 } 
}: StandardAnimatedLottieProps) => {
  const options = {
    animationData,
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet"
    }
  };
  const { View } = useLottie(options, { style: { width: "100%", height: "100%" } });

  return (
    <motion.div 
      className="size-full flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0, 1, 1], // Fade in quickly, then stay visible
      }}
      exit={{ 
        opacity: 0, 
        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } // Smoother fade out with custom easing
      }}
      transition={{ 
        duration: ANIMATION_DURATION, 
        times: [0, 0.15, 1], 
        ease: [0.4, 0, 0.2, 1] // Custom easing curve for smoother animation
      }}
      onAnimationComplete={() => {
        onComplete(); 
      }}
    >
      <motion.div
        className="w-full h-full drop-shadow-xl flex items-center justify-center"
        initial={{ 
          scale: 0.5 * scaleMultiplier,
          x: offset.x,
          y: offset.y,
          filter: 'blur(4px)' // Add initial blur for smoother entrance
        }}
        animate={{ 
          scale: [0.5 * scaleMultiplier, 1.15 * scaleMultiplier, 1 * scaleMultiplier, 1 * scaleMultiplier], // Overshoot effect with multiplier
          x: offset.x,
          y: offset.y,
          filter: ['blur(4px)', 'blur(0px)', 'blur(0px)', 'blur(0px)'] // Clear blur during entrance
        }} 
        transition={{
            duration: ANIMATION_DURATION,
            times: [0, 0.2, 0.35, 1], 
            ease: [0.34, 1.56, 0.64, 1] // Spring-like easing for more dynamic overshoot
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          {View}
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Animated Camera ---
const CameraSequence = ({ onComplete }: { onComplete: () => void }) => {
  return <StandardAnimatedLottie animationData={cameraAnimation} onComplete={onComplete} />;
};

// --- Animated Coffee ---
const CoffeeSequence = ({ onComplete }: { onComplete: () => void }) => {
  // Scale down by 20% then additional 6% -> 0.8 * 0.94 = 0.752
  return <StandardAnimatedLottie animationData={coffeeAnimation} onComplete={onComplete} scaleMultiplier={0.752} />;
};

// --- Animated Ramen ---
const RamenSequence = ({ onComplete }: { onComplete: () => void }) => {
  // Scale down by an additional 15% from 0.8 -> 0.8 * 0.85 ≈ 0.68
  // Move slightly right by 2px
  return <StandardAnimatedLottie animationData={ramenAnimation} onComplete={onComplete} scaleMultiplier={0.68} offset={{ x: 2, y: 0 }} />;
};

// --- Animated Chat ---
const ChatSequence = ({ onComplete }: { onComplete: () => void }) => {
  // Slightly move toward bottom-right while keeping a gentle top-left bias
  return <StandardAnimatedLottie animationData={chatAnimation} onComplete={onComplete} offset={{ x: -12, y: -12 }} />;
};

// --- Animated Sunbed ---
const SunbedSequence = ({ onComplete }: { onComplete: () => void }) => {
  return <StandardAnimatedLottie animationData={sunbedAnimation} onComplete={onComplete} />;
};

// --- Animated Wind ---
const WindSequence = ({ onComplete }: { onComplete: () => void }) => {
  return <StandardAnimatedLottie animationData={windAnimation} onComplete={onComplete} />;
};

// --- Animated Sunset ---
const SunsetSequence = ({ onComplete }: { onComplete: () => void }) => {
  return <StandardAnimatedLottie animationData={sunsetAnimation} onComplete={onComplete} />;
};

// --- Animated Cutlery ---
const CutlerySequence = ({ onComplete }: { onComplete: () => void }) => {
  return <StandardAnimatedLottie animationData={cutleryAnimation} onComplete={onComplete} scaleMultiplier={1.08} />;
};

// --- Animated Magic ---
const MagicSequence = ({ onComplete }: { onComplete: () => void }) => {
  return <StandardAnimatedLottie animationData={magicAnimation} onComplete={onComplete} />;
};

// --- Animated Celebration ---
const CelebrationSequence = ({ onComplete }: { onComplete: () => void }) => {
  // Now uses StandardAnimatedImage to ensure loop timing works
  return <StandardAnimatedLottie animationData={celebrationAnimation} onComplete={onComplete} />;
};

// --- Main Coordinator ---
export const GenerationAnimation = () => {
  const [stage, setStage] = useState<'camera' | 'coffee' | 'ramen' | 'chat' | 'sunbed' | 'wind' | 'sunset' | 'cutlery' | 'magic' | 'celebration'>('camera');

  useEffect(() => {
    setStage('camera');
  }, []);

  const handleCameraComplete = () => setStage('coffee');
  const handleCoffeeComplete = () => setStage('ramen');
  const handleRamenComplete = () => setStage('chat');
  const handleChatComplete = () => setStage('sunbed');
  const handleSunbedComplete = () => setStage('wind');
  const handleWindComplete = () => setStage('sunset');
  const handleSunsetComplete = () => setStage('cutlery');
  const handleCutleryComplete = () => setStage('magic');
  const handleMagicComplete = () => setStage('celebration');
  const handleCelebrationComplete = () => setStage('camera'); // Loop back to start

  const isStart = stage === 'camera';
  const isEnd = stage === 'celebration';
  const globalScale = isStart ? 0.85 : (isEnd ? 0.9 : 1);
  const globalTransition = { duration: 1.5, ease: "easeInOut" };

  return (
    <div className="relative w-28 h-28 flex items-center justify-center select-none pointer-events-none">
      <motion.div 
        className="size-full"
        animate={{ scale: globalScale }}
        transition={globalTransition}
      >
        <AnimatePresence mode="popLayout">
          {stage === 'camera' && (
            <div key="camera-wrapper" className="absolute inset-0">
              <CameraSequence onComplete={handleCameraComplete} />
            </div>
          )}
          
          {stage === 'coffee' && (
            <div key="coffee-wrapper" className="absolute inset-0">
              <CoffeeSequence onComplete={handleCoffeeComplete} />
            </div>
          )}

          {stage === 'ramen' && (
            <div key="ramen-wrapper" className="absolute inset-0">
              <RamenSequence onComplete={handleRamenComplete} />
            </div>
          )}

          {stage === 'chat' && (
            <div key="chat-wrapper" className="absolute inset-0">
              <ChatSequence onComplete={handleChatComplete} />
            </div>
          )}

          {stage === 'sunbed' && (
            <div key="sunbed-wrapper" className="absolute inset-0">
              <SunbedSequence onComplete={handleSunbedComplete} />
            </div>
          )}

          {stage === 'wind' && (
            <div key="wind-wrapper" className="absolute inset-0">
              <WindSequence onComplete={handleWindComplete} />
            </div>
          )}

          {stage === 'sunset' && (
            <div key="sunset-wrapper" className="absolute inset-0">
              <SunsetSequence onComplete={handleSunsetComplete} />
            </div>
          )}

          {stage === 'cutlery' && (
            <div key="cutlery-wrapper" className="absolute inset-0">
              <CutlerySequence onComplete={handleCutleryComplete} />
            </div>
          )}

          {stage === 'magic' && (
            <div key="magic-wrapper" className="absolute inset-0">
              <MagicSequence onComplete={handleMagicComplete} />
            </div>
          )}

          {stage === 'celebration' && (
            <div key="celebration-wrapper" className="absolute inset-0">
              <CelebrationSequence onComplete={handleCelebrationComplete} />
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
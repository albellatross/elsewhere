import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import imgCamera from "figma:asset/c0cb7f405f534d0931b3d217184987677b8dc169.png";
import imgCoffee from "figma:asset/9b32d44aeec93f527ca51f688ece674461b0a521.png";
import imgRamen from "figma:asset/6da70a3b4311ab688c29ae593da8209e4bdbfae0.png";
import imgChat from "figma:asset/9314a54b4384e800899339c7acb95475d5317b24.png";
import imgSunbed from "figma:asset/de2313305842ec44aeb76e1c6053e3068372cf68.png";
import imgWind from "figma:asset/edc88567adfb6d17a3e04c7556de54c9030c0466.png";
import imgSunset from "figma:asset/98daef03d9a6e3f5fd827722d838b942079c1574.png";
import imgCutlery from "figma:asset/eabdfbc8df9cb3de5632ebf075c284ca31320d5c.png";
import imgMagic from "figma:asset/e232cb7ad1fd639eae1905fa662a692d35e584da.png";
import imgCelebration from "figma:asset/0160c8d64442264a75be7e9ddf533c5b8fd1567c.png";

const ANIMATION_DURATION = 3; // Sync with text rotation interval (3s)

interface StandardAnimatedImageProps {
  src: string;
  alt: string;
  onComplete: () => void;
  scaleMultiplier?: number;
  offset?: { x: number; y: number };
}

const StandardAnimatedImage = ({ 
  src, 
  alt, 
  onComplete, 
  scaleMultiplier = 1, 
  offset = { x: 0, y: 0 } 
}: StandardAnimatedImageProps) => {
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
      <motion.img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-contain drop-shadow-xl"
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
      />
    </motion.div>
  );
};

// --- Animated Camera ---
const CameraSequence = ({ onComplete }: { onComplete: () => void }) => {
  return <StandardAnimatedImage src={imgCamera} alt="Camera" onComplete={onComplete} />;
};

// --- Animated Coffee ---
const CoffeeSequence = ({ onComplete }: { onComplete: () => void }) => {
  // Scale down by 20% -> scaleMultiplier = 0.8
  return <StandardAnimatedImage src={imgCoffee} alt="Coffee" onComplete={onComplete} scaleMultiplier={0.8} />;
};

// --- Animated Ramen ---
const RamenSequence = ({ onComplete }: { onComplete: () => void }) => {
  // Scale down by an additional 15% from 0.8 -> 0.8 * 0.85 ≈ 0.68
  // Move slightly right by 2px
  return <StandardAnimatedImage src={imgRamen} alt="Ramen" onComplete={onComplete} scaleMultiplier={0.68} offset={{ x: 2, y: 0 }} />;
};

// --- Animated Chat ---
const ChatSequence = ({ onComplete }: { onComplete: () => void }) => {
  // Move to top-left -> negative x and y offset
  return <StandardAnimatedImage src={imgChat} alt="Chat" onComplete={onComplete} offset={{ x: -20, y: -20 }} />;
};

// --- Animated Sunbed ---
const SunbedSequence = ({ onComplete }: { onComplete: () => void }) => {
  return <StandardAnimatedImage src={imgSunbed} alt="Sunbed" onComplete={onComplete} />;
};

// --- Animated Wind ---
const WindSequence = ({ onComplete }: { onComplete: () => void }) => {
  return <StandardAnimatedImage src={imgWind} alt="Wind" onComplete={onComplete} />;
};

// --- Animated Sunset ---
const SunsetSequence = ({ onComplete }: { onComplete: () => void }) => {
  return <StandardAnimatedImage src={imgSunset} alt="Sunset" onComplete={onComplete} />;
};

// --- Animated Cutlery ---
const CutlerySequence = ({ onComplete }: { onComplete: () => void }) => {
  return <StandardAnimatedImage src={imgCutlery} alt="Cutlery" onComplete={onComplete} />;
};

// --- Animated Magic ---
const MagicSequence = ({ onComplete }: { onComplete: () => void }) => {
  return <StandardAnimatedImage src={imgMagic} alt="Magic" onComplete={onComplete} />;
};

// --- Animated Celebration ---
const CelebrationSequence = ({ onComplete }: { onComplete: () => void }) => {
  // Now uses StandardAnimatedImage to ensure loop timing works
  return <StandardAnimatedImage src={imgCelebration} alt="Celebration" onComplete={onComplete} />;
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
    <div className="relative w-64 h-64 flex items-center justify-center select-none pointer-events-none">
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
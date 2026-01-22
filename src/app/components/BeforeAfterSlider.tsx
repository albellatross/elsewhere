import { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';
import svgPaths from "../../imports/svg-ndl72mflk9";

type BeforeAfterSliderProps = {
  beforeImage: string;
  afterImage: string;
  imageTop: string;
  isHovered: boolean;
};

export default function BeforeAfterSlider({ 
  beforeImage, 
  afterImage, 
  imageTop, 
  isHovered 
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shouldStartAnimation, setShouldStartAnimation] = useState(false);
  const [showSlider, setShowSlider] = useState(false); // 初始隐藏滑杆
  const [beforeOpacity, setBeforeOpacity] = useState(0); // 控制before照片透明度
  const animationFrameRef = useRef<number>();
  const mousePositionRef = useRef<number>(0);
  const hoverTimeoutRef = useRef<number>();
  const isHoveredRef = useRef<boolean>(false);

  // 实时同步 hover 状态
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  // 智能hover检测 - 100ms区分快速滑过和真正hover
  useEffect(() => {
    if (isHovered && !hasAnimated) {
      // 100ms后检查鼠标是否还在卡片上
      hoverTimeoutRef.current = window.setTimeout(() => {
        if (isHoveredRef.current) {
          // 确认是真正的hover，触发动画
          setShouldStartAnimation(true);
        }
      }, 100);
    } else if (!isHovered) {
      // 鼠标离开，取消检测
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      setShouldStartAnimation(false);
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [isHovered, hasAnimated]);

  // Hover时的自动动画 - 从右到左
  useEffect(() => {
    if (shouldStartAnimation && !hasAnimated) {
      setIsAnimating(true);
      
      // 第一步：平滑淡入before照片（200ms - 加快速度）
      const fadeInDuration = 200;
      const fadeInStart = Date.now();
      
      const fadeIn = () => {
        if (!isHoveredRef.current) {
          setBeforeOpacity(0);
          setSliderPosition(0);
          setIsAnimating(false);
          setShouldStartAnimation(false);
          setShowSlider(true);
          return;
        }

        const elapsed = Date.now() - fadeInStart;
        const progress = Math.min(elapsed / fadeInDuration, 1);
        
        // easeOut 缓动
        const eased = 1 - Math.pow(1 - progress, 3);
        
        setBeforeOpacity(eased);
        setSliderPosition(100); // 保持在100%显示完整before
        
        if (progress < 1) {
          requestAnimationFrame(fadeIn);
        } else {
          // 淡入完成，隐藏滑杆，停留200ms（加快停留时间）
          setShowSlider(false);
          
          const showBeforeTimeout = setTimeout(() => {
            // 检查鼠标是否还在
            if (!isHoveredRef.current) {
              setBeforeOpacity(0);
              setSliderPosition(0);
              setIsAnimating(false);
              setShouldStartAnimation(false);
              setShowSlider(true);
              return;
            }
            
            // 第二步：显示滑杆，开始对比动画（100 -> 0）
            setShowSlider(true);
            setBeforeOpacity(1); // 确保完全不透明
            
            // 然后从右到左滑动 (100 -> 0)，逐渐显示after
            const duration = 1500; // 1.5秒对比动画（加快速度）
            const startTime = Date.now();
            
            const animate = () => {
              // 关键检查：在动画循环中持续检查鼠标是否还在
              if (!isHoveredRef.current) {
                // 鼠标已离开，立即停止动画
                if (animationFrameRef.current) {
                  cancelAnimationFrame(animationFrameRef.current);
                }
                setSliderPosition(0);
                setIsAnimating(false);
                setShouldStartAnimation(false);
                setHasAnimated(false);
                setShowSlider(true);
                return;
              }

              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              // 使用easeInOut缓动函数
              const eased = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
              
              // 从100到0
              const position = 100 - (eased * 100);
              setSliderPosition(position);
              
              if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(animate);
              } else {
                setHasAnimated(true);
                setIsAnimating(false);
                
                // 动画完成后，再次检查鼠标是否还在
                if (!isHoveredRef.current) {
                  setSliderPosition(0);
                  setShouldStartAnimation(false);
                  setHasAnimated(false);
                  setShowSlider(true);
                  return;
                }
                
                // 动画完成后，平滑过渡到当前鼠标位置
                const targetPosition = mousePositionRef.current;
                const startPosition = 0;
                const transitionDuration = 250; // 250ms 平滑过渡（加快速度）
                const transitionStartTime = Date.now();
                
                setIsTransitioning(true);
                
                const smoothTransition = () => {
                  // 关键检查：在过渡动画中也要检查
                  if (!isHoveredRef.current) {
                    setSliderPosition(0);
                    setIsTransitioning(false);
                    setShouldStartAnimation(false);
                    setHasAnimated(false);
                    setShowSlider(true);
                    return;
                  }

                  const elapsed = Date.now() - transitionStartTime;
                  const progress = Math.min(elapsed / transitionDuration, 1);
                  
                  // easeOut 缓动，更自然
                  const eased = 1 - Math.pow(1 - progress, 3);
                  
                  const newPosition = startPosition + (targetPosition - startPosition) * eased;
                  setSliderPosition(newPosition);
                  
                  if (progress < 1) {
                    requestAnimationFrame(smoothTransition);
                  } else {
                    setIsTransitioning(false);
                  }
                };
                
                requestAnimationFrame(smoothTransition);
              }
            };
            
            animationFrameRef.current = requestAnimationFrame(animate);
          }, 200);

          // 清理函数
          return () => {
            clearTimeout(showBeforeTimeout);
          };
        }
      };
      
      animationFrameRef.current = requestAnimationFrame(fadeIn);
    }
    
    // 离开hover时重置
    if (!isHovered) {
      // 取消正在进行的动画
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setSliderPosition(0);
      setHasAnimated(false);
      setIsAnimating(false);
      setIsTransitioning(false);
      setShouldStartAnimation(false);
      setShowSlider(false); // 重置为隐藏状态
      setBeforeOpacity(0); // 重置透明度
      mousePositionRef.current = 0;
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [shouldStartAnimation, hasAnimated, isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;
    
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    // 始终记录鼠标位置
    mousePositionRef.current = percentage;
    
    // 只有在动画完全结束后才允许手动交互
    if (!hasAnimated) return; // 动画未完成，不响应鼠标
    if (isAnimating || isTransitioning) return; // 动画进行中，不响应
    
    // 动画完成后，实时跟随鼠标
    setSliderPosition(percentage);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full rounded-[clamp(16px,1.25vw,24px)] overflow-hidden bg-white cursor-pointer"
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        aspectRatio: '3 / 4',
        maxHeight: '80vh', // 限制最大高度，避免窄屏过长
        boxShadow: 'inset 0 0 0 3px rgba(255, 255, 255, 0.95)'
      }}
    >
      {/* After Image (背景层 - 处理后的图片) */}
      <div className="absolute inset-0">
        <img 
          alt="After" 
          className="absolute left-0 w-full object-cover select-none"
          style={{
            height: '150%',
            top: imageTop,
            pointerEvents: 'none'
          }}
          src={afterImage}
          draggable={false}
        />
      </div>

      {/* Before Image (前景层 - 原始图片) */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          opacity: beforeOpacity, // 添加透明度控制
        }}
        initial={false}
        transition={{ duration: 0 }}
      >
        <img 
          alt="Before" 
          className="absolute left-0 w-full object-cover select-none"
          style={{
            height: '150%',
            top: imageTop,
            pointerEvents: 'none'
          }}
          src={beforeImage}
          draggable={false}
        />
        
        {/* BEFORE 标签 - 始终显示当before照片可见时 */}
        <motion.div
          className="absolute top-2 md:top-3 left-2 md:left-3 bg-white/90 backdrop-blur-sm px-2 md:px-3 py-1 md:py-1.5 rounded-full z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: (isHovered && beforeOpacity > 0.3) ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <span className="font-sans font-semibold text-[9px] md:text-[11px] text-[#050505] uppercase tracking-wider">
            Before
          </span>
        </motion.div>
      </motion.div>

      {/* 滑杆线条和手柄 */}
      <motion.div
        className="absolute top-0 bottom-0 z-20"
        style={{ left: `${sliderPosition}%` }}
        initial={false}
        transition={{ duration: 0 }}
      >
        {/* 垂直线 */}
        <motion.div 
          className="absolute top-0 bottom-0 w-[3px] bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)]"
          style={{ left: '-1.5px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: (isHovered && showSlider) ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
        
        {/* 滑杆手柄 */}
        <motion.div 
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[40px] h-[40px] bg-white rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.2)] flex items-center justify-center cursor-ew-resize"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: (isHovered && showSlider) ? 1 : 0,
            scale: (isHovered && showSlider) ? 1 : 0.8
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {/* 星星图标 */}
          <div className="w-[20px] h-[20px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <g>
                <path d={svgPaths.p3fd63480} fill="#EAA300" />
              </g>
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
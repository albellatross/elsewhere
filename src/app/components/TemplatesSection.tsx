import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import svgPaths from "../../imports/svg-t4c74lvrtc";
import imgCard02 from "figma:asset/7aa95b09a23fe314cbceec472e6eb4a58c4a639e.png";
import imgCard4 from "figma:asset/f2228ee11ca8d06eba074b23c0a70793fc067439.png";
import imgCard5 from "figma:asset/2e16334c5cdc94f5c8510a56b98996b427c379ac.png";
import imgCard6 from "figma:asset/71ce7433da4b83fdfc3555c8c5beca0bf40c09c6.png";
import imgImage1 from "figma:asset/074489fd96c75949a777cead25a7f27c3edf4778.png";
import imgImage1Card3 from "figma:asset/db55938ff0e95d32ece17969b4ba737e3373d211.png";
import imgImage1Card4 from "figma:asset/dd2451a38c7ed3f97a655681efcd4c885199a227.png";
import imgImage1Card5 from "figma:asset/d6f3058a7367b06ca05064a77997d807cbff132a.png";
import BeforeAfterSlider from './BeforeAfterSlider';

function Card({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`relative rounded-[20px] shrink-0 w-full aspect-square overflow-hidden bg-white ${className}`}>
      {children}
    </div>
  );
}

function Chevron({ children, onClick, disabled }: React.PropsWithChildren<{ onClick?: () => void; disabled?: boolean }>) {
  return (
    <motion.div 
      className="relative shrink-0 size-[48px] cursor-pointer"
      onClick={onClick}
      whileHover={!disabled ? { scale: 1.1 } : {}}
      whileTap={!disabled ? { scale: 0.9 } : {}}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Chevron">{children}</g>
      </svg>
    </motion.div>
  );
}

type ContentProps = {
  text: string;
  text1: string;
};

function Content({ text, text1 }: ContentProps) {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start leading-[normal] relative shrink-0 text-[#050505] w-full">
      <p className="font-['Alexandria:SemiBold',sans-serif] font-semibold relative shrink-0 text-[20px] w-full">{text}</p>
      <p className="font-['Alexandria:Regular',sans-serif] font-normal relative shrink-0 text-[16px] w-full">{text1}</p>
    </div>
  );
}

type TemplatesSectionProps = {
  onCardClick?: (cardId: string) => void;
};

export default function TemplatesSection({ onCardClick }: TemplatesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1, margin: "0px 0px -100px 0px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [hasScrolledToCenter, setHasScrolledToCenter] = useState(false);

  // 智能滚动到视口中心
  useEffect(() => {
    if (isInView && !hasScrolledToCenter && sectionRef.current) {
      // 延迟执行，确保所有动画和布局都已完成
      const timer = setTimeout(() => {
        if (!sectionRef.current) return;
        
        const section = sectionRef.current;
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const sectionHeight = rect.height;
        
        // 计算理想的居中位置
        // section的上边缘应该在 viewportCenter - sectionHeight/2
        const viewportCenter = viewportHeight / 2;
        const idealTop = viewportCenter - sectionHeight / 2;
        const currentTop = rect.top;
        
        // 向上滚动为负值，向下滚动为正值
        const scrollDistance = currentTop - idealTop;
        
        // 只在需要显著调整时才滚动
        if (Math.abs(scrollDistance) > 30) {
          window.scrollBy({
            top: scrollDistance,
            behavior: 'smooth'
          });
        }
        
        setHasScrolledToCenter(true);
      }, 600);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, hasScrolledToCenter]);

  // 窗口大小改变时重新计算居中（如果已经居中过）
  useEffect(() => {
    if (!hasScrolledToCenter || !sectionRef.current) return;

    const handleResize = () => {
      if (!sectionRef.current) return;
      
      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      const viewportCenter = viewportHeight / 2;
      const idealTop = viewportCenter - sectionHeight / 2;
      const currentTop = rect.top;
      const scrollDistance = currentTop - idealTop;
      
      // 窗口变化时也进行居中调整
      if (Math.abs(scrollDistance) > 50) {
        window.scrollBy({
          top: scrollDistance,
          behavior: 'smooth'
        });
      }
    };

    // 使用防抖，避免频繁触发
    let resizeTimer: number;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(handleResize, 200);
    };

    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimer);
    };
  }, [hasScrolledToCenter]);

  const scrollToIndex = (index: number) => {
    if (cardsContainerRef.current) {
      const cardWidth = 320; // 300px card + 20px gap
      cardsContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const cards = [
    {
      id: 'standard-id-photo',
      img: imgCard02,
      imageTop: '0%',
      title: 'ID Photo',
      description: 'Clean, compliant photos for official use.',
      tags: 'Passport • Visa • Resume',
      shadowColor: 'rgba(180, 192, 210, 0.32)', // softer, grayer blue
      hoverBg: 'rgba(230, 240, 255, 0.95)' // #E6F0FF
    },
    {
      id: 'sketch-illustration',
      img: imgCard4,
      imageTop: '-4%',
      title: 'Personal Photoshoot',
      description: 'Express your style, mood, and identity.',
      tags: 'Lifestyle • Art • Self-expression',
      shadowColor: 'rgba(196, 176, 156, 0.30)', // warm tint, desaturated
      hoverBg: 'rgba(246, 219, 212, 0.95)' // #F6DBD4
    },
    {
      id: 'character-portrait',
      img: imgCard5,
      imageTop: '-5%',
      title: 'Pet Portrait',
      description: 'Beautiful portraits of the ones you love.',
      tags: 'Cats • Dogs • Companions',
      shadowColor: 'rgba(195, 165, 140, 0.30)', // softer pumpkin, more gray
      hoverBg: 'rgba(239, 228, 203, 0.95)' // #EFE4CB
    },
    {
      id: 'pet-portrait',
      img: imgCard6,
      imageTop: '-4%',
      title: 'Product Visuals',
      description: 'Clean, compelling images that sell.',
      tags: 'Beauty • Product • E-commerce',
      shadowColor: 'rgba(175, 160, 140, 0.30)', // muted golden-brown
      hoverBg: 'rgba(227, 210, 203, 0.95)' // #E3D2CB
    }
  ];

  return (
    <motion.div 
      ref={sectionRef}
      id="templates-trigger"
      className="bg-white w-full relative -mt-[clamp(30px,12vh,150px)]" 
      data-name="templates-section"
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{ position: 'relative' }}
    >
      {/* 内容容器 - 锁定最大宽度 */}
      <div className="max-w-[var(--content-max-width)] mx-auto px-[var(--content-padding)] py-[clamp(60px,8vh,120px)]">
        <div className="content-stretch flex flex-col gap-[clamp(32px,4.5vh,60px)] items-start relative shrink-0 w-full" data-name="content">
          <motion.div 
            className="content-stretch flex items-end justify-between relative shrink-0 w-full flex-wrap gap-4"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="content-stretch flex flex-col gap-[clamp(10px,1.2vh,14px)] items-start relative shrink-0 max-w-[699px]" data-name="title">
              <p className="font-['Alexandria:SemiBold',sans-serif] font-semibold leading-[1.2] relative shrink-0 text-[#1c1c1e] 
                           text-[clamp(18px,4.8vw,22px)] md:text-[clamp(20px,1.4vw,26px)]">
                Create images that fit real moments
              </p>
              <p className="font-['Alexandria:Regular',sans-serif] font-normal leading-[1.35] relative shrink-0 text-[#5f5f66] 
                           text-[clamp(15px,4vw,17px)] md:text-[clamp(16px,1.05vw,19px)] max-w-[685px]">
                Professional, personal, or playful — start with a template and shape the result your way.
              </p>
            </div>
          </motion.div>

          {/* 响应式卡片网格 - 优化为4张卡片布局 */}
          <div className="relative w-full">
            <motion.div 
              ref={cardsContainerRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
                         gap-[clamp(18px,2.5vw,24px)] 
                         relative w-full"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  className="content-stretch flex flex-col items-start justify-between 
                            pb-[clamp(20px,2.2vh,32px)] 
                            pt-[clamp(18px,2vh,28px)] 
                            px-[clamp(18px,1.4vw,28px)] 
                            relative rounded-[clamp(18px,1.6vw,26px)] shrink-0 cursor-pointer bg-[#fafafa]
                            transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:ring-offset-2"
                  data-name={`Card${index + 1}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`${card.title}: ${card.description}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  onFocus={() => setHoveredCard(index)}
                  onBlur={() => setHoveredCard(null)}
                  onClick={() => onCardClick?.(card.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onCardClick?.(card.id);
                    }
                  }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    boxShadow: hoveredCard === index 
                      ? `0px 20px 40px -10px ${card.shadowColor}, 0px 1px 2px 0px rgba(0,0,0,0.14)`
                      : '0px 1px 2px 0px rgba(0,0,0,0.14), 0px 0px 2px 0px rgba(0,0,0,0.12)',
                    transition: 'box-shadow 0.4s ease'
                  }}
                >
                  <div aria-hidden="true" className="absolute border border-[#ebebeb] border-solid inset-0 pointer-events-none rounded-[clamp(18px,1.6vw,26px)]" />
                  
                  {/* 背景颜色过渡 */}
                  <motion.div
                    className="absolute inset-0 rounded-[clamp(18px,1.6vw,26px)]"
                    style={{ backgroundColor: card.hoverBg }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* 卡片内容 */}
                  <div className="content-stretch flex flex-col gap-[clamp(22px,2.5vh,40px)] items-start relative shrink-0 w-full z-10">
                    {/* Before/After 滑杆图片容器 */}
                    <BeforeAfterSlider
                      beforeImage={index === 0 ? imgImage1 : index === 1 ? imgImage1Card3 : index === 2 ? imgImage1Card4 : imgImage1Card5}
                      afterImage={card.img}
                      imageTop={card.imageTop}
                      isHovered={hoveredCard === index}
                    />
                    
                    {/* 文字内容 - 优化字号和间距 */}
                    <div className="content-stretch flex flex-col gap-[clamp(10px,1.1vh,16px)] items-start leading-[normal] relative shrink-0 text-[#050505] w-full">
                      <p className="font-['Alexandria:SemiBold',sans-serif] font-semibold relative shrink-0 w-full
                                   text-[clamp(16px,4.2vw,19px)] md:text-[clamp(17px,1.3vw,20px)]">
                        {card.title}
                      </p>
                      <p className="font-['Alexandria:Regular',sans-serif] font-normal relative shrink-0 w-full text-[#5f5f66] leading-[1.4]
                                   text-[clamp(12px,3.2vw,13px)] md:text-[clamp(12px,0.85vw,14px)]">
                        {card.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Tags - 优化字号 */}
                  <p className="font-['Alexandria:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 w-full text-[#8e8e93] z-10 
                               mt-[clamp(14px,1.5vh,26px)]
                               text-[clamp(12px,3.2vw,13px)] md:text-[clamp(12px,0.8vw,14px)]">
                    {card.tags}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
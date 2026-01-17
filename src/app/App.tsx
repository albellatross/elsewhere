import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react';
import svgPaths from '../imports/svg-1fcglqngzg';
import imgPortrait031 from 'figma:asset/bed55a3a25e4f52d68f261109995bcb4f8fe7cb9.png';
import imgBg from 'figma:asset/7b8381a43c932167aaff34c32384a08345d2da42.png';
import imgCard01 from 'figma:asset/ee953cd1e1318ebfa0d446c4c897b0a78e41fd55.png';
import imgCard02 from 'figma:asset/324a92db77baf45ac716eb581c43b2f231c164f9.png';
import imgCard03 from 'figma:asset/9edc81eb878126b228d4df83cd7f3e1cbc61f510.png';
import TemplatesSection from './components/TemplatesSection';
import RemixIdeasSection from './components/RemixIdeasSection';
import Footer from './components/Footer';
import IDPhotoDetailPage from './components/IDPhotoDetailPage';
import SketchIllustrationPage from './components/SketchIllustrationPage';
import Card01Detail from './components/Card01Detail';
import Card02Detail from './components/Card02Detail';

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-[1em] h-[1em]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        {children}
      </svg>
    </div>
  );
}

function Sparkle({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper>
      <g id="Sparkle">{children}</g>
    </Wrapper>
  );
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const templatesTriggerRef = useRef<HTMLElement>(null);
  const remixIdeasRef = useRef<HTMLDivElement>(null);
  const templatesSectionRef = useRef<HTMLDivElement>(null);
  
  // 详情页状态管理
  const [activeDetailPage, setActiveDetailPage] = useState<string | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  
  const { scrollY } = useScroll();
  
  // 监听 TemplatesSection 是否进入视口
  const isTemplatesInView = useInView(templatesTriggerRef, { 
    once: false, 
    amount: 0.05, // 当元素的5%进入视口时触发
    margin: "-150px 0px 0px 0px" // 当元素顶部距离视口顶部150px时提前触发
  });

  // 在组件挂载后获取 templates-trigger 元素的引用
  useEffect(() => {
    const element = document.getElementById('templates-trigger');
    if (element) {
      templatesTriggerRef.current = element;
    }
  }, []);

  // 视差效果配置
  const bgX = useTransform(scrollYProgress, [0, 1], ['0vw', '10vw']);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0vh', '15vh']);
  
  // 背景图片透明度 - 保持可见
  const bgOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.6, 0.3]);
  
  // 森林背景视差
  const forestX = useTransform(scrollYProgress, [0, 1], ['0vw', '5vw']);
  
  // 人物图片视差 - 响应式优化
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0vh', '-20vh']);
  const portraitX = useTransform(scrollYProgress, [0, 1], ['0vw', '-20vw']);
  const portraitScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1.1]);
  
  // 卡片01动画 - 旋转角度从11.074度开始 - 响应式优化
  const card01Rotate = useTransform(scrollYProgress, [0, 0.5, 1], [11.074, 25, 40]);
  const card01Y = useTransform(scrollYProgress, [0, 0.5, 1], ['0vh', '-8vh', '-18vh']);
  const card01X = useTransform(scrollYProgress, [0, 0.5, 1], ['0vw', '3vw', '7vw']);
  const card01Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.03, 1.06]);
  
  // 卡片02动画 - 旋转角度从346度(-14度)开始 - 响应式优化
  const card02Rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-14, -25, -40]);
  const card02Y = useTransform(scrollYProgress, [0, 0.5, 1], ['0vh', '5vh', '12vh']);
  const card02X = useTransform(scrollYProgress, [0, 0.5, 1], ['0vw', '-3vw', '-7vw']);
  const card02Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.03, 1.06]);
  
  // 卡片03动画 - 旋转角度从28.435度开始 - 响应式优化
  const card03Rotate = useTransform(scrollYProgress, [0, 0.5, 1], [28.435, 40, 55]);
  const card03Y = useTransform(scrollYProgress, [0, 0.5, 1], ['0vh', '-12vh', '-25vh']);
  const card03X = useTransform(scrollYProgress, [0, 0.5, 1], ['0vw', '2vw', '5vw']);
  const card03Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.08, 1.15]);
  
  // 装饰线条动画 - 优化透视关系
  const decorLineRotate = useTransform(scrollYProgress, [0, 1], [0, 3]);
  const decorLineScale = useTransform(scrollYProgress, [0, 1], [1, 1.01]);
  const decorLineOpacity = useTransform(scrollYProgress, [0, 0.3, 0.55], [1, 0.3, 0]);
  const decorLineY = useTransform(scrollYProgress, [0, 1], ['0vh', '-30vh']);
  const decorLineX = useTransform(scrollYProgress, [0, 1], ['0vw', '12vw']);
  
  // 底部装饰线动画 - 增强穿插效果
  const bottomLineOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.3, 0]);
  const bottomLineScale = useTransform(scrollYProgress, [0, 1], [1, 1.01]);
  const bottomLineY = useTransform(scrollYProgress, [0, 1], ['0vh', '-30vh']);
  const bottomLineX = useTransform(scrollYProgress, [0, 1], ['0vw', '10vw']);
  
  // 文字内容淡出 - 在滚动早期就完全消失
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], ['0vh', '-20vh']);

  // 滚动提示动画
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scrollHintY = useTransform(scrollYProgress, [0, 0.2], ['0vh', '-3vh']);
  
  // 导航栏交互逻辑 - 首页时跟随视差消失，卡片页时固定显示
  // 在首页滚动时跟随文字淡出
  const navHeroOpacity = useTransform(scrollYProgress, [0, 0.25, 0.3], [1, 0.3, 0]);
  const navHeroY = useTransform(scrollYProgress, [0, 0.3], ['0vh', '-15vh']);
  
  // 移动端视差效果 - 独立的motion values
  const mobileContainerY = useTransform(scrollYProgress, [0, 0.5], ['0vh', '-10vh']);
  const mobilePortraitY = useTransform(scrollYProgress, [0, 0.5], ['0vh', '-5vh']);
  const mobilePortraitScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  const mobileCard01Y = useTransform(scrollYProgress, [0, 0.5], ['0vh', '-3vh']);
  const mobileCard01Rotate = useTransform(scrollYProgress, [0, 0.5], [8, 15]);
  const mobileCard01Scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.03]);
  const mobileCard02Y = useTransform(scrollYProgress, [0, 0.5], ['0vh', '2vh']);
  const mobileCard02Rotate = useTransform(scrollYProgress, [0, 0.5], [-10, -18]);
  const mobileCard02Scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.03]);
  const mobileCard03Y = useTransform(scrollYProgress, [0, 0.5], ['0vh', '-6vh']);
  const mobileCard03Rotate = useTransform(scrollYProgress, [0, 0.5], [20, 35]);
  const mobileCard03Scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  
  // 固定导航栏显示逻辑 - 已移除
  // const navFixedOpacity = useTransform(scrollY, [800, 1200], [0, 1]);
  // const navFixedY = useTransform(scrollY, [800, 1200], [-20, 0]);
  
  // 卡片页导航栏增强效果 - 已移除
  // const navBgOpacity = useTransform(scrollY, [1200, 1400], [0.85, 0.95]);
  // const navBlur = useTransform(scrollY, [1200, 1400], [16, 20]);
  // const navShadow = useTransform(scrollY, [1200, 1400], [0.05, 0.15]);
  // const navBorderOpacity = useTransform(scrollY, [1200, 1400], [0.3, 0.4]);
  
  // 使用 useMotionTemplate 格式化样式值 - 已移除
  // const navBgColor = useMotionTemplate`rgba(255, 255, 255, ${navBgOpacity})`;
  // const navBlurFilter = useMotionTemplate`blur(${navBlur}px)`;
  // const navBoxShadow = useMotionTemplate`0 4px 20px rgba(0, 0, 0, ${navShadow})`;
  // const navBorderColor = useMotionTemplate`rgba(240, 240, 240, ${navBorderOpacity})`;

  // 平滑滚动函数
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const offsetTop = ref.current.offsetTop - 80; // 减去导航栏高度
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* 详情页覆盖层 - 最外层，覆盖整个页面 */}
      <AnimatePresence mode="wait">
        {activeDetailPage === 'standard-id-photo' && (
          <IDPhotoDetailPage onClose={() => setActiveDetailPage(null)} />
        )}
        {activeDetailPage === 'sketch-illustration' && (
          <SketchIllustrationPage onClose={() => setActiveDetailPage(null)} />
        )}
        {activeDetailPage === 'character-portrait' && (
          <Card01Detail onClose={() => setActiveDetailPage(null)} />
        )}
        {activeDetailPage === 'pet-portrait' && (
          <Card02Detail onClose={() => setActiveDetailPage(null)} />
        )}
      </AnimatePresence>
      
      {/* 主页面内容 */}
      <div className="w-full bg-white relative min-h-screen" style={{ position: 'relative' }}>
        {/* 第一部分：滚动视差英雄区 */}
        <div ref={containerRef} className="relative w-full h-[110vh] overflow-hidden max-w-[2560px] mx-auto" style={{ position: 'relative' }}>
          {/* 固定容器 */}
          <div className="sticky top-0 w-full h-screen overflow-x-clip overflow-y-visible relative">
            <div className="bg-white h-full w-full relative">
              {/* 背景层 - 超大容器以实现视差效果 - 精确还原 Figma 设计 */}
              <motion.div 
                className="absolute h-full left-[-63.65vw] overflow-hidden top-0 w-[247.24vw]"
                style={{ 
                  x: bgX, 
                  y: bgY, 
                  opacity: bgOpacity,
                  willChange: 'transform, opacity'
                }}
              >
                {/* 白色容器层 */}
                <div className="absolute bg-white h-full left-[53.02vw] top-0 w-[148.28vw]">
                  {/* 森林背景层1 - 宽层静态背景 */}
                  <div className="absolute h-full left-0 top-0 w-full opacity-[0.18]">
                    <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                      <div className="absolute bg-white inset-0" />
                      <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
                        <img 
                          alt="" 
                          className="absolute max-w-none left-[-33.49%] w-[115%] h-[82%] top-[2%]" 
                          src={imgBg} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* 森林背景层2 - 窄层带视差 */}
                  <motion.div 
                    className="absolute h-full left-0 top-0 w-[53.54vw] opacity-[0.18]"
                    style={{ 
                      x: forestX,
                      willChange: 'transform'
                    }}
                  >
                    <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                      <div className="absolute bg-white inset-0" />
                      <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
                        <img 
                          alt="" 
                          className="absolute max-w-none left-[-0.03%] w-[320%] h-[82%] top-[2%]" 
                          src={imgBg} 
                        />
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* 顶部渐变过渡 - 白色到透明，双层柔和 */}
                  <div className="absolute top-0 left-0 w-full h-[30%] pointer-events-none z-10">
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-white/75 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/25 to-transparent" />
                  </div>
                  
                  {/* 底部渐变过渡 - 三层叠加，极致柔和 */}
                  <div className="absolute bottom-0 left-0 w-full h-[40%] pointer-events-none z-10">
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/45 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-white/15 to-transparent" />
                  </div>
                </div>
                
                {/* 右上装饰线条 - 仅桌面版 */}
                <motion.div 
                  className="hidden md:block absolute h-[6.86vh] left-[148vw] top-[40.28vh] w-[20.16vw] max-w-[387px]"
                  style={{ 
                    rotate: decorLineRotate,
                    scale: decorLineScale,
                    opacity: decorLineOpacity,
                    y: decorLineY,
                    x: decorLineX
                  }}
                >
                  <div className="absolute inset-[-9.44%_-1.04%_-5.36%_-1.49%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 396.8 85.1079">
                      <path d={svgPaths.pd152a03} stroke="url(#paint0_linear_1_459)" strokeWidth="14" />
                      <defs>
                        <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_459" x1="-1354.74" x2="392.761" y1="11.2296" y2="27.9304">
                          <stop stopColor="#8B5CF6" />
                          <stop offset="0.5" stopColor="#A855F7" />
                          <stop offset="1" stopColor="#EC4899" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </motion.div>
                
                {/* 卡片 01 */}
                <motion.div 
                  className="absolute flex items-center justify-center left-[15vw] md:left-[135.88vw] top-[55vh] md:top-[11vh] w-[25vw] md:w-[20vw] z-22"
                  style={{ 
                    y: card01Y,
                    x: card01X,
                    rotate: card01Rotate,
                    scale: card01Scale,
                    willChange: 'transform'
                  }}
                >
                  <div className="aspect-[3/4] pointer-events-none relative rounded-[12px] md:rounded-[1.25vw] w-full max-w-[270px]">
                    <img 
                      alt="" 
                      className="absolute inset-0 object-cover object-center rounded-[12px] md:rounded-[1.25vw] size-full" 
                      src={imgCard01} 
                    />
                    <div aria-hidden="true" className="absolute border-[#e8ffb7] border-[3px] md:border-[0.31vw] border-solid inset-[-3px] md:inset-[-0.31vw] rounded-[15px] md:rounded-[1.56vw]" />
                  </div>
                </motion.div>
                
                {/* 卡片 02 */}
                <motion.div 
                  className="absolute flex items-center justify-center left-[35vw] md:left-[106.88vw] top-[68vh] md:top-[30vh] w-[25vw] md:w-[20vw] z-20"
                  style={{ 
                    y: card02Y,
                    x: card02X,
                    rotate: card02Rotate,
                    scale: card02Scale,
                    willChange: 'transform'
                  }}
                >
                  <div className="aspect-[3/4] pointer-events-none relative rounded-[12px] md:rounded-[1.25vw] w-full max-w-[260px]">
                    <img 
                      alt="" 
                      className="absolute inset-0 object-cover object-center rounded-[12px] md:rounded-[1.25vw] size-full" 
                      src={imgCard02} 
                    />
                    <div aria-hidden="true" className="absolute border-[#fbc810] border-[3px] md:border-[0.31vw] border-solid inset-[-3px] md:inset-[-0.31vw] rounded-[15px] md:rounded-[1.56vw]" />
                  </div>
                </motion.div>
                
                {/* 人物图片 */}
                <motion.div 
                  className="absolute content-stretch flex flex-col h-[50vh] md:h-[85vh] items-center left-[50vw] md:left-[118vw] translate-x-[-50%] md:translate-x-0 pb-[1.76vh] pt-0 px-0 top-[48vh] md:top-[10vh] w-[35vw] md:w-[28vw] max-w-[450px] z-25"
                  style={{ 
                    y: portraitY,
                    x: portraitX,
                    scale: portraitScale,
                    willChange: 'transform'
                  }}
                >
                  <div className="aspect-[612/1024] mb-[-1.76vh] pointer-events-none relative shrink-0 w-full">
                    <img 
                      alt="" 
                      className="absolute inset-0 max-w-none object-cover object-center size-full" 
                      src={imgPortrait031} 
                    />
                  </div>
                  <div className="h-[2.13vh] mb-[-1.76vh] relative shrink-0 w-[32.71vw]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 628 23">
                      <ellipse cx="314" cy="11.5" fill="url(#paint0_radial_1_457)" opacity="0.3" rx="314" ry="11.5" />
                      <defs>
                        <radialGradient cx="0" cy="0" gradientTransform="translate(314 11.5) scale(314 11.5)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_457" r="1">
                          <stop stopColor="#737373" />
                          <stop offset="1" stopColor="#737373" stopOpacity="0" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </div>
                </motion.div>
                
                {/* 底部装饰线 - 单层，自然穿插 - 仅桌面版 */}
                <motion.div 
                  className="hidden md:block absolute h-[35.74vh] left-[59.07vw] top-[50vh] w-[87.71vw] z-[30]"
                  style={{ 
                    opacity: bottomLineOpacity,
                    scale: bottomLineScale,
                    y: bottomLineY,
                    x: bottomLineX,
                    willChange: 'transform, opacity'
                  }}
                >
                  <div className="absolute inset-[-1.81%_-0.28%_-1.81%_-0.12%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1690.79 400.031">
                      <path d={svgPaths.p27a12980} stroke="url(#paint0_linear_bottom)" strokeWidth="14" />
                      <defs>
                        <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_bottom" x1="-201.008" x2="2164.42" y1="122.274" y2="109.647">
                          <stop offset="0.0824716" stopColor="#8B5CF6" stopOpacity="0.5" />
                          <stop offset="0.332593" stopColor="#9A59F7" stopOpacity="0.2" />
                          <stop offset="0.504862" stopColor="#A855F7" />
                          <stop offset="1" stopColor="#EC4899" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </motion.div>
              </motion.div>

              {/* Logo - 首页时跟随滚动，卡片页时固定 */}
              <motion.div 
                className="absolute h-[3.5vh] left-[5vw] md:left-[6.88vw] top-[3.5vh] w-[5.5vw] min-w-[70px] z-50"
                style={{
                  opacity: navHeroOpacity,
                  y: navHeroY
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 125.179 50">
                  <g>
                    <path d={svgPaths.p34824e00} fill="var(--fill-0, #0B0B0B)" />
                    <g>
                      <g>
                        <path d={svgPaths.p9f7be00} fill="var(--fill-0, white)" />
                        <path d={svgPaths.pbe26100} fill="var(--fill-0, white)" />
                        <path d={svgPaths.p2c113600} fill="var(--fill-0, white)" />
                        <path d={svgPaths.p32f30c80} fill="var(--fill-0, white)" />
                        <path d={svgPaths.p17b8aa40} fill="var(--fill-0, white)" />
                      </g>
                      <path d={svgPaths.p3e6a6880} fill="var(--fill-0, white)" />
                      <g>
                        <path d={svgPaths.p106b7c00} fill="var(--fill-0, white)" />
                        <path d={svgPaths.pb1d480} fill="var(--fill-0, white)" />
                        <path d={svgPaths.pa29dd00} fill="var(--fill-0, white)" />
                      </g>
                    </g>
                  </g>
                </svg>
              </motion.div>

              {/* 顶部菜单 - 首页时跟随滚动 */}
              <motion.div 
                className="hidden md:flex absolute bg-[rgba(255,255,255,0.7)] backdrop-blur-md content-stretch gap-[1.56vw] items-center left-1/2 px-[0.83vw] py-[1.11vh] rounded-[9999px] top-[4.72vh] translate-x-[-50%] z-50"
                style={{
                  opacity: navHeroOpacity,
                  y: navHeroY
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div aria-hidden="true" className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-[9999px]" />
                
                {/* Create Button */}
                <motion.div 
                  className="content-stretch flex gap-[0.52vw] h-[4.07vh] items-center justify-center pl-[1.04vw] pr-[1.25vw] py-[1.11vh] relative rounded-[999px] shrink-0 w-[7.81vw] min-w-[120px] cursor-pointer overflow-hidden"
                  initial={{ backgroundColor: 'rgba(255,255,255,0)' }}
                  whileHover={{ 
                    backgroundColor: 'rgba(255,255,255,1)',
                    scale: 1.05
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(templatesSectionRef)}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="relative shrink-0 size-[1em]"
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <g>
                        <motion.path 
                          d={svgPaths.p124ef7b0} 
                          initial={{ fill: '#050505' }}
                          whileHover={{ fill: '#EAA300' }}
                          transition={{ duration: 0.2 }}
                        />
                      </g>
                    </svg>
                  </motion.div>
                  <p className="font-['Alexandria:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#050505] text-[clamp(12px,0.83vw,16px)] text-nowrap">Create</p>
                </motion.div>
                
                {/* Templates Button */}
                <motion.div 
                  className="content-stretch flex gap-[0.52vw] h-[4.07vh] items-center justify-center pl-[1.04vw] pr-[1.25vw] py-[1.11vh] relative rounded-[999px] shrink-0 w-[7.81vw] min-w-[120px] cursor-pointer overflow-hidden"
                  initial={{ backgroundColor: 'rgba(255,255,255,0)' }}
                  whileHover={{ 
                    backgroundColor: 'rgba(255,255,255,1)',
                    scale: 1.05
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(remixIdeasRef)}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="relative shrink-0 size-[1em]"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <g>
                        <motion.path 
                          d={svgPaths.p2853cd00} 
                          initial={{ fill: '#050505' }}
                          whileHover={{ fill: '#3A96DD' }}
                          transition={{ duration: 0.2 }}
                        />
                      </g>
                    </svg>
                  </motion.div>
                  <p className="font-['Alexandria:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#050505] text-[clamp(12px,0.83vw,16px)] text-nowrap">Templates</p>
                </motion.div>
                
                {/* Studio Button */}
                <motion.div 
                  className="content-stretch flex gap-[0.52vw] h-[4.07vh] items-center justify-center pl-[1.04vw] pr-[1.25vw] py-[1.11vh] relative rounded-[999px] shrink-0 w-[7.81vw] min-w-[120px] cursor-pointer overflow-hidden"
                  initial={{ backgroundColor: 'rgba(255,255,255,0)' }}
                  whileHover={{ 
                    backgroundColor: 'rgba(255,255,255,1)',
                    scale: 1.05
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div aria-hidden="true" className="absolute border border-[rgba(31,31,31,0.1)] border-solid inset-0 pointer-events-none rounded-[999px]" />
                  <motion.div 
                    className="relative shrink-0 size-[1em]"
                    initial={{ y: 0 }}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <g>
                        <motion.path 
                          d={svgPaths.p120bce80} 
                          initial={{ fill: '#050505' }}
                          whileHover={{ fill: '#7160E8' }}
                          transition={{ duration: 0.2 }}
                        />
                      </g>
                    </svg>
                  </motion.div>
                  <p className="font-['Alexandria:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#050505] text-[clamp(12px,0.83vw,16px)] text-nowrap">Studio</p>
                </motion.div>
              </motion.div>

              {/* 文字内容区域 - 桌面端左侧，移动端居中且在卡片上方 */}
              <motion.div 
                className="absolute left-0 top-[14vh] md:top-[53%] md:translate-y-[-50%] w-full z-30"
                style={{ 
                  opacity: textOpacity, 
                  y: textY,
                  willChange: 'transform, opacity'
                }}
              >
                {/* 内容容器 - 使用与 RemixIdeasSection 相同的布局系统 */}
                <div className="max-w-[var(--content-max-width)] mx-auto px-[var(--content-padding)]">
                  <div className="max-w-[520px]">
                    <div 
                      className="content-stretch flex flex-col items-center md:items-start relative shrink-0"
                      style={{ 
                        gap: 'clamp(20px, 4vh, 56px)' 
                      }}
                    >
                      <div className="content-stretch flex flex-col gap-[clamp(36px,5.8vh,66px)] items-center md:items-start relative shrink-0">
                        <div className="content-stretch flex flex-col gap-[clamp(8px,1.2vh,14px)] items-center md:items-start relative shrink-0">
                          {/* 标题 - 优化响应式字号 */}
                          <motion.div 
                            className="content-stretch flex items-center justify-center md:justify-start relative shrink-0"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                          >
                            <p className="font-['Alexandria:Bold',sans-serif] font-bold leading-[0.9] relative shrink-0 text-[#0b0b0b] 
                                          text-[clamp(28px,7.5vw,40px)] md:text-[clamp(42px,3.2vw,48px)] lg:text-[clamp(46px,3.5vw,52px)]">Rem</p>
                            <div className="relative shrink-0 w-[clamp(28px,7.5vw,40px)] h-[clamp(28px,7.5vw,40px)] 
                                              md:w-[clamp(42px,3.2vw,48px)] md:h-[clamp(42px,3.2vw,48px)] 
                                              lg:w-[clamp(46px,3.5vw,52px)] lg:h-[clamp(46px,3.5vw,52px)]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 80">
                                <g clipPath="url(#clip0_1_443)">
                                  <path d={svgPaths.p3c28970} fill="var(--fill-0, black)" />
                                  <path d={svgPaths.p11a83b10} fill="var(--fill-0, black)" />
                                  <path d={svgPaths.p8257080} fill="var(--fill-0, black)" />
                                  <path d={svgPaths.p3ea95a00} fill="var(--fill-0, black)" />
                                  <path d={svgPaths.p28039a00} fill="var(--fill-0, black)" />
                                  <path d={svgPaths.p198fd980} fill="var(--fill-0, black)" />
                                  <path d={svgPaths.p1219ce80} fill="var(--fill-0, black)" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1_443">
                                    <rect fill="white" height="80" width="80" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <p className="font-['Alexandria:Bold',sans-serif] font-bold leading-[0.9] relative shrink-0 text-[#0b0b0b] 
                                          text-[clamp(28px,7.5vw,40px)] md:text-[clamp(42px,3.2vw,48px)] lg:text-[clamp(46px,3.5vw,52px)]">x Reality.</p>
                          </motion.div>
                          
                          <motion.p 
                            className="font-['Alexandria:Medium',sans-serif] font-medium leading-[0.9] relative shrink-0 text-[#8e8e93] text-center md:text-left 
                                       text-[clamp(28px,7.5vw,40px)] md:text-[clamp(42px,3.2vw,48px)] lg:text-[clamp(46px,3.5vw,52px)]"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                          >
                            Not Identity.
                          </motion.p>
                        </div>
                        
                        {/* 副标题和描述 - 优化字号和间距 */}
                        <motion.div 
                          className="content-stretch flex flex-col gap-[clamp(8px,1.2vh,14px)] items-center md:items-start relative shrink-0"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.8 }}
                        >
                          <p className="font-['Alexandria:SemiBold',sans-serif] font-semibold leading-[1.2] relative shrink-0 text-[#1c1c1e] text-center md:text-left 
                                        text-[clamp(14px,3.8vw,17px)] md:text-[clamp(16px,1.3vw,19px)] lg:text-[clamp(18px,1.4vw,20px)]">
                            Same you. New worlds.
                          </p>
                          <div className="font-['Alexandria:Regular',sans-serif] font-normal leading-[1.35] relative shrink-0 text-[#5f5f66] text-center md:text-left 
                                          text-[clamp(12px,3.2vw,14px)] md:text-[clamp(14px,1.1vw,16px)] lg:text-[clamp(15px,1.15vw,17px)] 
                                          max-w-[320px] md:max-w-[420px] lg:max-w-[480px]">
                            <p className="mb-0">Drop a photo in. Remix the world around you.</p>
                            <p className="mb-0 hidden md:block">No prompts. No face swaps. No weird AI vibes.</p>
                            <p className="mb-0 md:hidden">No prompts, face swaps, or weird AI.</p>
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* Try it now 按钮 - 优化响应式尺寸 */}
                      <motion.div 
                        className="bg-[#333] content-stretch flex gap-[clamp(6px,1.5vw,8px)] items-center justify-center relative rounded-[999px] shrink-0 cursor-pointer w-fit mx-auto md:mx-0"
                        style={{
                          paddingLeft: 'clamp(24px, 6vw, 38px)',
                          paddingRight: 'clamp(24px, 6vw, 38px)',
                          paddingTop: 'clamp(12px, 2.2vh, 15px)',
                          paddingBottom: 'clamp(12px, 2.2vh, 15px)'
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        whileHover={{ scale: 1.05, backgroundColor: '#000' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Sparkle>
                          <path d={svgPaths.p124ef7b0} fill="var(--fill-0, white)" fillOpacity="0.9" />
                        </Sparkle>
                        <p className="font-['Alexandria:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 
                                      text-[clamp(14px,3.6vw,16px)] md:text-[clamp(14px,1.05vw,16px)] lg:text-[clamp(15px,1.1vw,17px)] 
                                      text-[rgba(255,255,255,0.9)] text-nowrap">Try it now</p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 移动端：人物和卡片在文字下方 */}
              <motion.div 
                className="md:hidden absolute left-1/2 translate-x-[-50%] top-[60vh] w-[80vw] max-w-[400px] z-10 flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                style={{
                  y: mobileContainerY,
                  willChange: 'transform'
                }}
              >
                {/* 人物图片 - 移动端 */}
                <motion.div 
                  className="content-stretch flex flex-col items-center w-full"
                  style={{
                    y: mobilePortraitY,
                    scale: mobilePortraitScale,
                    willChange: 'transform'
                  }}
                >
                  <div className="aspect-[612/1024] pointer-events-none relative shrink-0 w-[60%]">
                    <img 
                      alt="" 
                      className="absolute inset-0 max-w-none object-cover object-center size-full rounded-[12px]" 
                      src={imgPortrait031} 
                    />
                  </div>
                  <div className="h-[8px] mt-[-4px] relative shrink-0 w-[70%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 628 23">
                      <ellipse cx="314" cy="11.5" fill="url(#paint0_radial_mobile)" opacity="0.3" rx="314" ry="11.5" />
                      <defs>
                        <radialGradient cx="0" cy="0" gradientTransform="translate(314 11.5) scale(314 11.5)" gradientUnits="userSpaceOnUse" id="paint0_radial_mobile" r="1">
                          <stop stopColor="#737373" />
                          <stop offset="1" stopColor="#737373" stopOpacity="0" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </div>
                </motion.div>

                {/* 卡片展示 - 移动端 - 带视差效果 */}
                <div className="flex gap-3 justify-center w-full mt-4">
                  <motion.div 
                    className="aspect-[3/4] pointer-events-none relative rounded-[12px] w-[28%]"
                    style={{
                      y: mobileCard01Y,
                      rotate: mobileCard01Rotate,
                      scale: mobileCard01Scale,
                      willChange: 'transform'
                    }}
                  >
                    <img 
                      alt="" 
                      className="absolute inset-0 object-cover object-center rounded-[12px] size-full" 
                      src={imgCard01} 
                    />
                    <div aria-hidden="true" className="absolute border-[#e8ffb7] border-[3px] border-solid inset-[-3px] rounded-[15px]" />
                  </motion.div>
                  <motion.div 
                    className="aspect-[3/4] pointer-events-none relative rounded-[12px] w-[28%]"
                    style={{
                      y: mobileCard02Y,
                      rotate: mobileCard02Rotate,
                      scale: mobileCard02Scale,
                      willChange: 'transform'
                    }}
                  >
                    <img 
                      alt="" 
                      className="absolute inset-0 object-cover object-center rounded-[12px] size-full" 
                      src={imgCard02} 
                    />
                    <div aria-hidden="true" className="absolute border-[#fbc810] border-[3px] border-solid inset-[-3px] rounded-[15px]" />
                  </motion.div>
                  <motion.div 
                    className="aspect-[3/4] pointer-events-none relative rounded-[12px] w-[28%]"
                    style={{
                      y: mobileCard03Y,
                      rotate: mobileCard03Rotate,
                      scale: mobileCard03Scale,
                      willChange: 'transform'
                    }}
                  >
                    <img 
                      alt="" 
                      className="absolute inset-0 object-cover object-center rounded-[12px] size-full" 
                      src={imgCard03} 
                    />
                    <div aria-hidden="true" className="absolute border-[#ff907f] border-[3px] border-solid inset-[-3px] rounded-[15px]" />
                  </motion.div>
                </div>
              </motion.div>

              {/* 卡片 03 - 右下角大卡片 */}
              <motion.div 
                className="absolute flex items-center justify-center left-[60vw] md:left-[68.07vw] top-[78vh] md:top-[46vh] w-[30vw] md:w-[26vw] z-[60]"
                style={{ 
                  y: card03Y,
                  x: card03X,
                  rotate: card03Rotate,
                  scale: card03Scale,
                  willChange: 'transform'
                }}
              >
                <div className="aspect-[3/4] pointer-events-none relative rounded-[12px] md:rounded-[1.25vw] w-full max-w-[300px]">
                  <img 
                    alt="" 
                    className="absolute inset-0 object-cover object-center rounded-[12px] md:rounded-[1.25vw] size-full" 
                    src={imgCard03} 
                  />
                  <div aria-hidden="true" className="absolute border-[#ff907f] border-[3px] md:border-[0.31vw] border-solid inset-[-3px] md:inset-[-0.31vw] rounded-[15px] md:rounded-[1.56vw]" />
                </div>
              </motion.div>

              {/* 滚动提示 */}
              <motion.div 
                className="hidden md:flex absolute bottom-[5vh] left-1/2 translate-x-[-50%] z-40 content-stretch flex-col h-[5.56vh] items-center justify-between pb-0 pt-[0.93vh] px-0 shadow-[0px_4px_4px_0px_rgba(255,255,255,0.7)] w-[13.59vw] min-w-[261px]"
                style={{ opacity: scrollHintOpacity, y: scrollHintY }}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  y: [0, -8, 0]
                }}
                transition={{ 
                  opacity: { duration: 0.8, delay: 1.2 },
                  y: { 
                    duration: 2,
                    delay: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <div className="absolute h-[3.8vh] left-1/2 opacity-90 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[13.54vw]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 260 41\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(13 -3.2558e-8 6.9261e-9 2.05 130 20.873)\\'><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0.55939\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
                <p className="font-['Alexandria:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#242424] text-[clamp(12px,0.73vw,14px)] text-nowrap">Scroll to explore more</p>
                <motion.div 
                  className="relative shrink-0 size-[2.96vh]"
                  animate={{ 
                    y: [0, 4, 0]
                  }}
                  transition={{ 
                    duration: 1.5,
                    delay: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                    <g>
                      <path d={svgPaths.p1a5bf100} fill="var(--fill-0, #242424)" />
                    </g>
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 第二部分：模板展示区 */}
        <div ref={templatesSectionRef}>
          <TemplatesSection onCardClick={(cardId) => setActiveDetailPage(cardId)} />
        </div>
        <div ref={remixIdeasRef}>
          <RemixIdeasSection />
        </div>
        <Footer />
      </div>
    </>
  );
}
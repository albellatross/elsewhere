import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import svgPaths from '../../imports/svg-k9p22mdyo7';
import { ImageWithFallback } from './figma/ImageWithFallback';
import imgCard02 from "figma:asset/7aa95b09a23fe314cbceec472e6eb4a58c4a639e.png";
import imgImage1 from "figma:asset/a58bff95e38d1eef23bab058f0ede9bcc287192e.png";
import imgCard1 from "figma:asset/8ff67fbd850326ea6af659bc13e9ac8dbc37d16a.png";
import imgImage2 from "figma:asset/bd8c26711b42d9824251ddffe2917288e02582a6.png";
import imgCard2 from "figma:asset/b6b2dd85428ea511bce874d4f06430114aad6aef.png";
import imgImage3 from "figma:asset/2f2a4278676870bd4b14a1ba6544a4438fc53b98.png";
import imgCard3 from "figma:asset/70ce267f1a846de764bc9f5d4f525565f6d7295f.png";
import imgCard4 from "figma:asset/264e196e9b74fa3a6e3776ed82ab09ee14efabbb.png";
import imgImage4 from "figma:asset/e159137de17bd63ae194d24c968da0a0852f069f.png";
import imgWavingHand from "figma:asset/c9d45269057a88787a328656000c1d10a4c1a3de.png";

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="content-stretch flex flex-col items-start justify-between pb-[25px] md:pb-[45px] pt-[15px] md:pt-[25px] px-[15px] md:px-[25px] relative size-full">
      <div className="content-stretch flex flex-col gap-[20px] md:gap-[38px] items-start relative shrink-0 w-full">
        <div className="opacity-0 relative rounded-[16px] md:rounded-[24px] shrink-0 w-full aspect-square" data-name="card 02">
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px] md:rounded-[24px]">
            <img alt="" className="absolute h-[150%] left-0 max-w-none top-[-3.25%] w-full" src={imgCard02} />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[-0.34px] flex items-center justify-center left-[0.24px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">{children}</div>
      </div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="content-stretch flex items-center justify-center p-[7px] md:p-[12px] relative">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="h-[85px] md:h-[120px] relative rounded-[12px] md:rounded-[17px] w-[64px] md:w-[90px] overflow-hidden bg-[#f5f5f5]" data-name="image 1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

type ContentProps = {
  text: string;
  text1: string;
};

function Content({ text, text1 }: ContentProps) {
  return (
    <div className="content-stretch flex flex-col gap-[clamp(10px,1.1vh,16px)] items-start leading-[normal] relative shrink-0 text-[#050505] w-full">
      <p className="font-['Alexandria:SemiBold',sans-serif] font-semibold relative shrink-0 w-full
                   text-[clamp(16px,4.2vw,19px)] md:text-[clamp(17px,1.3vw,20px)]">{text}</p>
      <p className="font-['Alexandria:Regular',sans-serif] font-normal relative shrink-0 w-full text-[#5f5f66] leading-[1.4]
                   text-[clamp(12px,3.2vw,13px)] md:text-[clamp(12px,0.85vw,14px)]">{text1}</p>
    </div>
  );
}

type CardProps = {
  image: string;
  beforeImage: string;
  title: string;
  description: string;
  index: number;
};

function RemixCard({ image, beforeImage, title, description, index }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });

  return (
    <motion.div 
      ref={cardRef}
      className="w-full md:w-[calc(33.333%-14px)] content-stretch flex flex-col gap-[clamp(24px,2.4vh,38px)] items-start relative md:max-w-[380px]"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* 卡片容器 - 3:4 比例 */}
      <div 
        className="relative rounded-[clamp(16px,1.25vw,24px)] shrink-0 w-full cursor-pointer group overflow-hidden"
        style={{
          aspectRatio: '3 / 4',
          willChange: 'transform'
        }}
        data-name="Card"
      >
        {/* 背景和图片 */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[clamp(16px,1.25vw,24px)]">
          <div className="absolute bg-[#fafafa] inset-0 rounded-[clamp(16px,1.25vw,24px)]" />
          <div className="absolute inset-0 overflow-hidden rounded-[clamp(16px,1.25vw,24px)]">
            <ImageWithFallback 
              src={image}
              alt={title}
              className="absolute max-w-none object-center object-cover size-full transition-transform duration-400 ease-out group-hover:scale-105" 
            />
          </div>
        </div>
        
        {/* 边框 */}
        <div aria-hidden="true" className="absolute border border-[#ebebeb] border-solid inset-0 pointer-events-none rounded-[clamp(16px,1.25vw,24px)]" />
        
        {/* Before 图片预览 */}
        <Wrapper1>
          <Wrapper>
            <div className="absolute inset-0 overflow-hidden rounded-[14px] md:rounded-[19px]">
              <ImageWithFallback 
                src={beforeImage}
                alt={`${title} - before`}
                className="absolute max-w-none object-center object-cover size-full" 
              />
            </div>
            <div aria-hidden="true" className="absolute border-[2px] md:border-[2.5px] border-solid border-white inset-0 rounded-[14px] md:rounded-[19px]" />
          </Wrapper>
        </Wrapper1>

        {/* 白色毛玻璃遮罩层 - Figma 设计 */}
        <div
          className="absolute inset-[-30px] pointer-events-none rounded-[clamp(16px,1.25vw,24px)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[4.95px] backdrop-filter bg-[rgba(255,255,255,0.59)]"
        />

        {/* Hover 按钮 - Figma 设计 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="bg-[#333] content-stretch flex gap-[6px] items-center justify-center h-[44px] pl-[20px] pr-[24px] py-[12px] rounded-[999px] pointer-events-auto cursor-pointer transform scale-80 translate-y-2 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
            }}
          >
            <div className="overflow-clip relative shrink-0 size-[25px]">
              <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgWavingHand} />
            </div>
            <p className="font-['Alexandria:SemiBold','Noto_Sans_JP:Bold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.9)] text-nowrap">Try it</p>
          </button>
        </div>
      </div>
      
      {/* 标题和描述 */}
      <Content text={title} text1={description} />
    </motion.div>
  );
}

export default function RemixIdeasSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });

  // 滚动视差效果
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const titleY = useTransform(scrollYProgress, [0, 0.3, 1], [50, 0, -30]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

  const cards = [
    {
      beforeImage: imgImage1,
      image: imgCard1,
      title: 'A Moment in Zootopia',
      description: 'Place yourself inside a lighthearted scene inspired by the world of Zootopia, blending your presence with animated charm.',
    },
    {
      beforeImage: imgImage2,
      image: imgCard2,
      title: 'Step Into a Character',
      description: 'Reimagine yourself as a character you love, preserving your features while shifting costume, style, and atmosphere.',
    },
    {
      beforeImage: imgImage3,
      image: imgCard3,
      title: 'Scenes in Simple Lines',
      description: 'Transform a favorite film moment into a minimal line illustration, focusing on form, mood, and visual rhythm.',
    },
    {
      beforeImage: imgImage4,
      image: imgCard4,
      title: 'Office Selfie',
      description: 'A playful remix that frames your pet like an office worker caught in a spontaneous selfie — earnest, awkward, and strangely relatable.',
    },
  ];

  return (
    <section 
      id="remix-ideas-section" 
      ref={sectionRef}
      className="bg-white w-full relative" 
      data-name="templates-section"
      style={{ position: 'relative' }}
    >
      {/* 内容容器 - 锁定最大宽度 */}
      <div className="max-w-[var(--content-max-width)] mx-auto px-[var(--content-padding)] py-[clamp(50px,8vh,100px)]">
        <div className="content-stretch flex flex-col gap-[30px] md:gap-[40px] items-start relative shrink-0 w-full" data-name="content">
          <motion.div 
            ref={titleRef}
            className="content-stretch flex flex-col md:flex-row items-start justify-between relative shrink-0 w-full gap-4"
            style={{ y: titleY, opacity: titleOpacity }}
          >
            <div className="content-stretch flex flex-col gap-[8px] md:gap-[12px] items-start relative shrink-0 max-w-[699px]" data-name="title">
              <motion.p 
                className="font-['Alexandria:SemiBold',sans-serif] font-semibold leading-[1.2] relative shrink-0 text-[#1c1c1e] text-[clamp(18px,1.45vw,26px)]"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6 }}
              >
                Create images that fit real moments
              </motion.p>
              <motion.p 
                className="font-['Alexandria:Regular',sans-serif] font-normal leading-[1.3] md:leading-[1.35] relative shrink-0 text-[#5f5f66] text-[clamp(15px,4vw,17px)] md:text-[clamp(16px,1.05vw,19px)] w-full"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Subtle remix ideas that transform your images in unexpected ways — perfect for exploration, play, and inspiration.
              </motion.p>
            </div>
          </motion.div>
          
          <div className="content-stretch flex flex-col md:flex-row gap-[30px] md:gap-[20px] items-stretch overflow-visible relative shrink-0 w-full" data-name="card content">
            {cards.map((card, index) => (
              <RemixCard 
                key={index}
                image={card.image}
                beforeImage={card.beforeImage}
                title={card.title}
                description={card.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import svgPaths from '../../imports/svg-k9p22mdyo7';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { remixIdeas } from './remixIdeasConfig';
import imgWavingHand from "figma:asset/c9d45269057a88787a328656000c1d10a4c1a3de.png";
import { fetchVariantDetails, fetchVariants, type VariantDetailsResponse } from '../services/config';

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  const placeholder = remixIdeas[0]?.image ?? '';
  return (
    <div className="content-stretch flex flex-col items-start justify-between pb-[25px] md:pb-[45px] pt-[15px] md:pt-[25px] px-[15px] md:px-[25px] relative size-full">
      <div className="content-stretch flex flex-col gap-[20px] md:gap-[38px] items-start relative shrink-0 w-full">
        <div className="opacity-0 relative rounded-[16px] md:rounded-[24px] shrink-0 w-full aspect-square" data-name="card 02">
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px] md:rounded-[24px]">
            <img alt="" className="absolute h-[150%] left-0 max-w-none top-[-3.25%] w-full" src={placeholder} />
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
      <p className="font-sans font-semibold relative shrink-0 w-full
                   text-[clamp(16px,4.2vw,19px)] md:text-[clamp(17px,1.3vw,20px)]">{text}</p>
      <p className="font-sans font-normal relative shrink-0 w-full text-[#5f5f66] leading-[1.4]
                   text-[clamp(12px,3.2vw,13px)] md:text-[clamp(12px,0.85vw,14px)]">{text1}</p>
    </div>
  );
}

type CardProps = {
  id: string;
  image: string;
  beforeImage: string;
  title: string;
  description: string;
  index: number;
  onCardClick?: (id: string) => void;
};

function RemixCard({ id, image, beforeImage, title, description, index, onCardClick }: CardProps) {
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
        role="button"
        tabIndex={0}
        onClick={() => onCardClick?.(id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onCardClick?.(id);
          }
        }}
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
            onClick={(e) => {
              e.stopPropagation();
              onCardClick?.(id);
            }}
          >
            <div className="overflow-clip relative shrink-0 size-[25px]">
              <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgWavingHand} />
            </div>
            <p className="font-sans font-semibold leading-[normal] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.9)] text-nowrap">Try it</p>
          </button>
        </div>
      </div>
      
      {/* 标题和描述 */}
      <Content text={title} text1={description} />
    </motion.div>
  );
}

type RemixIdeasSectionProps = {
  onCardClick?: (id: string) => void;
};

export default function RemixIdeasSection({ onCardClick }: RemixIdeasSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });
  const [ideas, setIdeas] = useState(remixIdeas);

  // 滚动视差效果
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const titleY = useTransform(scrollYProgress, [0, 0.3, 1], [50, 0, -30]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

  useEffect(() => {
    let cancelled = false;

    const resolveUrl = (ref?: { public_url?: string | null }) => {
      if (!ref) return null;
      return ref.public_url ?? null;
    };

    const pickByRole = (refs: VariantDetailsResponse['references'] | undefined, tokens: string[]) => {
      if (!refs?.length) return null;
      return refs.find((ref) => {
        const role = (ref.role || '').toLowerCase();
        const key = (ref.key || '').toLowerCase();
        return tokens.some((token) => role.includes(token) || key.includes(token));
      }) || null;
    };

    const syncIdeas = async () => {
      const variants = await fetchVariants('templates');
      if (!variants || !variants.length || cancelled) return;

      const activeKeys = Array.from(new Set(remixIdeas.map((idea) => idea.variantKey || idea.id)));
      const detailPairs = await Promise.all(
        activeKeys.map(async (key) => {
          const detail = await fetchVariantDetails('templates', key);
          return detail ? [key, detail] as const : null;
        })
      );

      if (cancelled) return;

      const detailsMap = new Map<string, VariantDetailsResponse>();
      detailPairs.forEach((entry) => {
        if (entry) detailsMap.set(entry[0], entry[1]);
      });

      setIdeas((prev) => prev.map((idea) => {
        const variantKey = idea.variantKey || idea.id;
        const variant = variants.find((item) => item.key === variantKey);
        const detail = detailsMap.get(variantKey);

        const refs = detail?.references ?? [];
        const afterRef = pickByRole(refs, ['after', 'output', 'sample', 'final']);
        const beforeRef = pickByRole(refs, ['before', 'input', 'source', 'upload']);

        const metadata = (variant?.metadata_json && typeof variant.metadata_json === 'object')
          ? variant.metadata_json as Record<string, unknown>
          : undefined;

        const accentCandidate = metadata && typeof metadata['accent'] === 'string'
          ? metadata['accent'] as string
          : null;
        const gradientCandidate = metadata && Array.isArray(metadata['gradient']) && metadata['gradient'].length === 2
          ? metadata['gradient'] as [string, string]
          : null;

        return {
          ...idea,
          title: variant?.name || idea.title,
          description: variant?.description || idea.description,
          image: resolveUrl(afterRef) || idea.image,
          beforeImage: resolveUrl(beforeRef) || idea.beforeImage,
          accent: accentCandidate || idea.accent,
          gradient: gradientCandidate || idea.gradient,
        };
      }));
    };

    void syncIdeas();
    const intervalId = window.setInterval(syncIdeas, 60000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

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
                className="font-nord font-semibold leading-[1.2] relative shrink-0 text-[#1c1c1e] text-[clamp(18px,1.45vw,26px)]"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6 }}
              >
                Create images that fit real moments
              </motion.p>
              <motion.p 
                className="font-nord font-normal leading-[1.3] md:leading-[1.35] relative shrink-0 text-[#5f5f66] text-[clamp(15px,4vw,17px)] md:text-[clamp(16px,1.05vw,19px)] w-full"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Subtle remix ideas that transform your images in unexpected ways — perfect for exploration, play, and inspiration.
              </motion.p>
            </div>
          </motion.div>
          
          <div className="content-stretch flex flex-col md:flex-row gap-[30px] md:gap-[20px] items-stretch overflow-visible relative shrink-0 w-full" data-name="card content">
            {ideas.map((card, index) => (
              <RemixCard 
                key={card.id}
                id={card.id}
                image={card.image}
                beforeImage={card.beforeImage}
                title={card.title}
                description={card.description}
                index={index}
                onCardClick={onCardClick}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
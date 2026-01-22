import { useCallback, useRef, useEffect } from 'react';
import { animate } from 'motion/react';

/**
 * A hook that provides a function to trigger an adaptive "scroll assist" interaction.
 * It also handles global scroll forwarding to the container.
 */
export function useScrollAssist() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Global scroll forwarding: scroll the left panel even when mouse is on the right side
  useEffect(() => {
    const handleGlobalWheel = (e: WheelEvent) => {
      const container = scrollContainerRef.current;
      if (!container) return;

      // Only apply global forwarding on desktop (large screens) where the layout is side-by-side
      // and only if the mouse is NOT already over the scroll container
      if (window.innerWidth >= 1024 && !container.contains(e.target as Node)) {
        // Forward the scroll delta to the container
        container.scrollTop += e.deltaY;
      }
    };

    window.addEventListener('wheel', handleGlobalWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleGlobalWheel);
  }, []);

  const triggerScrollAssist = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // 1. Check if there's enough content to scroll
    const hasMoreContent = container.scrollHeight > container.clientHeight + 10;
    const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 20;

    if (!hasMoreContent || isAtBottom) return;

    // 2. Identify the "next" major content block
    const contentWrapper = container.firstElementChild;
    if (!contentWrapper) return;

    const sections = Array.from(contentWrapper.firstElementChild?.children || contentWrapper.children) as HTMLElement[];
    
    const viewportTop = container.scrollTop;
    
    let targetSection: HTMLElement | null = null;
    
    for (const section of sections) {
      const sectionTop = section.offsetTop;
      
      if (sectionTop > viewportTop + (container.clientHeight * 0.2)) {
        targetSection = section;
        break;
      }
    }

    // 3. Calculate target scroll position
    let targetScrollTop: number;
    
    if (targetSection) {
      // Adaptive: Scroll to bring the next section into a clearer view
      // We aim for the section to start about 30% from the top of the container
      const idealTarget = targetSection.offsetTop - (container.clientHeight * 0.3);
      const maxScroll = container.clientHeight * 0.35; 
      
      targetScrollTop = Math.min(
        viewportTop + maxScroll,
        Math.max(viewportTop + 60, idealTarget), // Minimum move of 60px to be noticeable
        container.scrollHeight - container.clientHeight
      );
    } else {
      const fallbackStep = container.clientHeight * 0.18; 
      targetScrollTop = Math.min(
        viewportTop + fallbackStep,
        container.scrollHeight - container.clientHeight
      );
    }

    // 4. Perform the animation with a more balanced spring
    if (targetScrollTop > viewportTop) {
      animate(viewportTop, targetScrollTop, {
        type: "spring",
        stiffness: 85,
        damping: 30,
        mass: 1.2,
        onUpdate: (latest) => {
          if (container) {
            container.scrollTop = latest;
          }
        }
      });
    }
  }, []);

  return { scrollContainerRef, triggerScrollAssist };
}

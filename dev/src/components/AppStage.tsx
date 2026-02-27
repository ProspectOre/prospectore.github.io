import { useCallback, useEffect, useMemo, useRef, useState, type TouchEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { AppFocusState } from '../App';

interface AppStageProps {
  focusState: AppFocusState;
  onFocusChange: (state: AppFocusState) => void;
}

type AppId = 'guardreel' | 'mycut';

type AppCard = {
  id: AppId;
  name: string;
  category: string;
  desc: string;
  iconUrl: string;
  screenshots: string[];
  accent: string;
  link: string;
};

const apps: AppCard[] = [
  {
    id: 'guardreel',
    name: 'GuardReel',
    category: 'Tesla Dashcam Editor',
    desc: 'Review and share your Tesla footage with precision playback, synchronized camera views, and fast export.',
    iconUrl: '/assets/guardreel_icon.png',
    screenshots: [
      '/assets/guardreel_screenshot_1.jpg',
      '/assets/guardreel_screenshot_2.jpg',
      '/assets/guardreel_screenshot_3.jpg',
    ],
    accent: 'text-aurora-1',
    link: 'https://apps.apple.com/us/app/guardreel-dashcam-editor/id6758811138',
  },
  {
    id: 'mycut',
    name: 'MyCut',
    category: 'Commission Tracker',
    desc: 'Track every deal and audit your pay with total clarity. Built for sales professionals who need certainty.',
    iconUrl: '/assets/mycut_icon.png',
    screenshots: [
      '/assets/mycut_screenshot_1.jpg',
      '/assets/mycut_screenshot_2.jpg',
      '/assets/mycut_screenshot_3.jpg',
    ],
    accent: 'text-aurora-2',
    link: 'https://apps.apple.com/app/id6757658940',
  },
];

const cardSpring = { type: 'spring', stiffness: 210, damping: 24, mass: 0.86 } as const;

export default function AppStage({ focusState, onFocusChange }: AppStageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (focusState === 'idle') return;
    const idx = apps.findIndex((app) => app.id === focusState);
    if (idx >= 0 && idx !== activeIndex) {
      setActiveIndex(idx);
    }
  }, [focusState, activeIndex]);

  const selected = useMemo(() => apps[activeIndex], [activeIndex]);

  const go = useCallback((delta: number) => {
    const next = (activeIndex + delta + apps.length) % apps.length;
    setActiveIndex(next);
    onFocusChange(apps[next].id);
  }, [activeIndex, onFocusChange]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') go(-1);
      if (event.key === 'ArrowRight') go(1);
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [go]);

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartX.current = null;

    if (startX == null || endX == null) return;
    const delta = endX - startX;
    if (Math.abs(delta) < 48) return;
    go(delta > 0 ? -1 : 1);
  };

  return (
    <section
      className="relative flex h-full w-full flex-col items-center justify-center overflow-visible py-4 md:flex-row md:overflow-hidden md:py-0"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-x-0 top-1/2 z-20 hidden -translate-y-1/2 justify-between px-4 md:flex">
        <button
          type="button"
          onClick={() => go(-1)}
          className="h-10 w-10 rounded-full border border-white/15 bg-black/45 text-white/70 backdrop-blur-md transition hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          aria-label="Previous app"
        >
          <span className="text-xl">‹</span>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="h-10 w-10 rounded-full border border-white/15 bg-black/45 text-white/70 backdrop-blur-md transition hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          aria-label="Next app"
        >
          <span className="text-xl">›</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.article
          key={selected.id}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 42, scale: 0.985 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0, scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -42, scale: 0.985 }}
          transition={prefersReducedMotion ? { duration: 0.2 } : cardSpring}
          className="relative mx-auto grid h-auto min-h-0 w-full max-w-6xl grid-cols-1 gap-6 overflow-hidden rounded-[1.6rem] border border-white/12 bg-white/[0.04] p-5 backdrop-blur-xl md:h-[74vh] md:min-h-[520px] md:gap-8 md:rounded-[2rem] md:p-6 xl:grid-cols-[1fr_1fr] xl:p-10"
        >
          <div className="flex min-w-0 w-full flex-col items-center justify-center text-center xl:mx-auto xl:max-w-[30rem]">
            <img src={selected.iconUrl} alt={`${selected.name} icon`} className="mb-5 h-16 w-16 rounded-3xl border border-white/20 object-cover md:mb-6 md:h-20 md:w-20" />
            <p className={`mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] md:text-xs md:tracking-[0.22em] ${selected.accent}`}>{selected.category}</p>
            <h3 className="mb-3 text-3xl font-semibold tracking-tight md:mb-4 md:text-5xl">{selected.name}</h3>
            <p className="mx-auto mb-6 max-w-lg text-sm leading-relaxed text-white/72 md:mb-8 md:text-lg">{selected.desc}</p>

            <a
              href={selected.link}
              target="_blank"
              rel="noreferrer"
              className="mx-auto inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor" aria-hidden="true">
                <path d="M16.77 12.53c.02 2.31 2.03 3.08 2.05 3.09-.02.05-.32 1.12-1.06 2.21-.64.94-1.31 1.88-2.35 1.9-1.03.02-1.36-.61-2.53-.61-1.16 0-1.53.59-2.5.63-1 .04-1.76-1-2.41-1.93-1.32-1.92-2.33-5.43-.98-7.79.67-1.17 1.87-1.91 3.17-1.93.99-.02 1.92.67 2.53.67.61 0 1.75-.83 2.95-.71.5.02 1.9.2 2.8 1.52-.07.05-1.67.98-1.66 2.95zM14.96 7.49c.54-.65.9-1.56.8-2.46-.78.03-1.73.52-2.28 1.17-.5.58-.93 1.5-.81 2.38.87.07 1.76-.44 2.29-1.09z" />
              </svg>
              <span>Download on App Store</span>
            </a>
          </div>

          <div className="w-full xl:hidden">
            <div className="mx-auto grid w-full max-w-[23rem] grid-cols-3 gap-2">
              {selected.screenshots.map((src, idx) => (
                <motion.img
                  key={`${selected.id}-mobile-${src}`}
                  src={src}
                  alt={`${selected.name} screenshot ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                  transition={prefersReducedMotion ? { duration: 0.2 } : { duration: 0.38, delay: idx * 0.06, ease: 'easeOut' }}
                  className="w-full rounded-[1.1rem] border border-white/20 object-cover shadow-xl [aspect-ratio:9/19.5]"
                />
              ))}
            </div>
          </div>

          <div className="relative hidden h-full min-w-0 -translate-x-4 items-center justify-center xl:flex">
            {selected.screenshots.map((src, idx) => {
              const offset = idx - 1;
              return (
                <div key={src} className="absolute inset-0 flex items-center justify-center" style={{ zIndex: offset === 0 ? 12 : 11 }}>
                  <motion.img
                    src={src}
                    alt={`${selected.name} screenshot ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: offset * 52, y: 20, rotateY: offset * -14, scale: 0.94 }}
                    animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: offset * 72, y: Math.abs(offset) * 14, rotateY: offset * -10, scale: 1 }}
                    transition={prefersReducedMotion ? { duration: 0.2 } : { duration: 0.6, delay: 0.12 + idx * 0.12, ease: 'easeOut' }}
                    className="h-[88%] max-h-[680px] w-auto rounded-[1.4rem] border border-white/20 object-cover shadow-2xl [aspect-ratio:9/19.5]"
                  />
                </div>
              );
            })}
          </div>
        </motion.article>
      </AnimatePresence>

      <div className="mt-6 flex w-full max-w-6xl justify-between px-2 md:hidden">
        <button
          type="button"
          onClick={() => go(-1)}
          className="h-11 w-11 rounded-full border border-white/15 bg-black/45 text-white/70 backdrop-blur-md transition hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          aria-label="Previous app"
        >
          <span className="text-xl">‹</span>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="h-11 w-11 rounded-full border border-white/15 bg-black/45 text-white/70 backdrop-blur-md transition hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          aria-label="Next app"
        >
          <span className="text-xl">›</span>
        </button>
      </div>
    </section>
  );
}

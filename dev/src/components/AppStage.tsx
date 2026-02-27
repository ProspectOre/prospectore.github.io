import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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

  useEffect(() => {
    if (focusState === 'idle') return;
    const idx = apps.findIndex((app) => app.id === focusState);
    if (idx >= 0 && idx !== activeIndex) {
      setActiveIndex(idx);
    }
  }, [focusState, activeIndex]);

  const selected = useMemo(() => apps[activeIndex], [activeIndex]);

  const go = (delta: number) => {
    const next = (activeIndex + delta + apps.length) % apps.length;
    setActiveIndex(next);
    onFocusChange(apps[next].id);
  };

  return (
    <section className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 justify-between px-1 md:px-4">
        <button
          type="button"
          onClick={() => go(-1)}
          className="h-10 w-10 rounded-full border border-white/15 bg-black/45 text-white/70 backdrop-blur-md transition hover:bg-white/15 hover:text-white"
          aria-label="Previous app"
        >
          <span className="text-xl">‹</span>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="h-10 w-10 rounded-full border border-white/15 bg-black/45 text-white/70 backdrop-blur-md transition hover:bg-white/15 hover:text-white"
          aria-label="Next app"
        >
          <span className="text-xl">›</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.article
          key={selected.id}
          initial={{ opacity: 0, x: 42, scale: 0.985 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -42, scale: 0.985 }}
          transition={cardSpring}
          className="relative mx-auto grid h-[74vh] min-h-[520px] w-full max-w-6xl grid-cols-1 gap-8 overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.04] p-6 backdrop-blur-xl lg:grid-cols-[0.95fr_1.05fr] lg:p-10"
        >
          <div className="flex min-w-0 flex-col justify-center">
            <img src={selected.iconUrl} alt={`${selected.name} icon`} className="mb-6 h-20 w-20 rounded-3xl border border-white/20 object-cover" />
            <p className={`mb-2 text-xs font-semibold uppercase tracking-[0.22em] ${selected.accent}`}>{selected.category}</p>
            <h3 className="mb-4 text-4xl font-semibold tracking-tight md:text-5xl">{selected.name}</h3>
            <p className="mb-8 max-w-lg text-base leading-relaxed text-white/72 md:text-lg">{selected.desc}</p>

            <a
              href={selected.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:opacity-90"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden="true">
                <path d="M16.77 12.53c.02 2.31 2.03 3.08 2.05 3.09-.02.05-.32 1.12-1.06 2.21-.64.94-1.31 1.88-2.35 1.9-1.03.02-1.36-.61-2.53-.61-1.16 0-1.53.59-2.5.63-1 .04-1.76-1-2.41-1.93-1.32-1.92-2.33-5.43-.98-7.79.67-1.17 1.87-1.91 3.17-1.93.99-.02 1.92.67 2.53.67.61 0 1.75-.83 2.95-.71.5.02 1.9.2 2.8 1.52-.07.05-1.67.98-1.66 2.95zM14.96 7.49c.54-.65.9-1.56.8-2.46-.78.03-1.73.52-2.28 1.17-.5.58-.93 1.5-.81 2.38.87.07 1.76-.44 2.29-1.09z" />
              </svg>
              <span>Download on App Store</span>
            </a>
          </div>

          <div className="relative hidden h-full min-w-0 items-center justify-center lg:flex">
            {selected.screenshots.map((src, idx) => (
              <motion.img
                key={src}
                src={src}
                alt={`${selected.name} screenshot ${idx + 1}`}
                initial={{ opacity: 0, x: 90, y: 24, rotateY: -16, scale: 0.92 }}
                animate={{ opacity: 1, x: (idx - 1) * 98, y: Math.abs(idx - 1) * 16, rotateY: -10, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.12 + idx * 0.12, ease: 'easeOut' }}
                className="absolute h-[88%] w-auto rounded-[1.4rem] border border-white/20 object-cover shadow-2xl"
                style={{ zIndex: 10 - idx }}
              />
            ))}
          </div>
        </motion.article>
      </AnimatePresence>
    </section>
  );
}

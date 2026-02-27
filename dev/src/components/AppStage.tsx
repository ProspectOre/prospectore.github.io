import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppFocusState } from '../App';

interface AppStageProps {
  focusState: AppFocusState;
  onFocusChange: (state: AppFocusState) => void;
}

type AppId = 'mycut' | 'guardreel';

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
];

const spring = { type: 'spring', stiffness: 230, damping: 24, mass: 0.9 } as const;

export default function AppStage({ focusState, onFocusChange }: AppStageProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const selected = useMemo(() => {
    if (focusState === 'idle') return apps[activeIndex];
    return apps.find((app) => app.id === focusState) ?? apps[0];
  }, [focusState, activeIndex]);

  const go = (delta: number) => {
    const next = (activeIndex + delta + apps.length) % apps.length;
    setActiveIndex(next);
    if (focusState !== 'idle') onFocusChange(apps[next].id);
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
        {focusState === 'idle' ? (
          <motion.div
            key="carousel"
            className="relative flex h-full w-full items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative h-[72vh] min-h-[500px] w-full max-w-6xl">
              {apps.map((app, index) => {
                const offset = index - activeIndex;
                return (
                  <motion.button
                    key={app.id}
                    type="button"
                    className="absolute left-1/2 top-1/2 h-[66vh] min-h-[440px] w-[86vw] max-w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-left backdrop-blur-xl"
                    animate={{
                      x: offset * 360,
                      scale: offset === 0 ? 1 : 0.86,
                      opacity: Math.abs(offset) > 1 ? 0 : offset === 0 ? 1 : 0.42,
                      rotateY: offset * -12,
                    }}
                    transition={spring}
                    onClick={() => {
                      if (offset === 0) {
                        onFocusChange(app.id);
                      } else {
                        setActiveIndex(index);
                      }
                    }}
                  >
                    <div className="flex h-full flex-col">
                      <img src={app.iconUrl} alt={`${app.name} icon`} className="mb-6 h-16 w-16 rounded-2xl border border-white/20 object-cover" />
                      <p className={`mb-2 text-xs font-semibold uppercase tracking-[0.22em] ${app.accent}`}>{app.category}</p>
                      <h3 className="mb-4 text-3xl font-semibold tracking-tight">{app.name}</h3>
                      <p className="text-sm leading-relaxed text-white/70">{app.desc}</p>
                      <div className="mt-auto text-sm text-white/45">Tap to expand</div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.article
            key={selected.id}
            layout
            transition={spring}
            className="relative mx-auto grid h-[74vh] min-h-[520px] w-full max-w-6xl grid-cols-1 gap-8 overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.04] p-6 backdrop-blur-xl lg:grid-cols-[0.95fr_1.05fr] lg:p-10"
          >
            <button
              type="button"
              onClick={() => onFocusChange('idle')}
              className="absolute right-4 top-4 z-20 h-8 w-8 rounded-full border border-white/15 bg-black/45 text-white/80 transition hover:bg-white/15"
              aria-label="Close app detail"
            >
              ×
            </button>

            <div className="flex min-w-0 flex-col justify-center">
              <img src={selected.iconUrl} alt={`${selected.name} icon`} className="mb-6 h-20 w-20 rounded-3xl border border-white/20 object-cover" />
              <p className={`mb-2 text-xs font-semibold uppercase tracking-[0.22em] ${selected.accent}`}>{selected.category}</p>
              <h3 className="mb-4 text-4xl font-semibold tracking-tight md:text-5xl">{selected.name}</h3>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-white/72 md:text-lg">{selected.desc}</p>

              <a href={selected.link} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center">
                <img
                  src="/assets/app_store_badge.svg"
                  alt="Download on the App Store"
                  className="h-[46px] w-auto transition hover:opacity-90"
                />
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
        )}
      </AnimatePresence>
    </section>
  );
}

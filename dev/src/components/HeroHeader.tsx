import { motion, useReducedMotion } from 'framer-motion';

interface HeroHeaderProps {
    onContactClick: () => void;
}

export default function HeroHeader({ onContactClick }: HeroHeaderProps) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <header className="flex w-full items-center justify-between">
            <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0.2 } : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3"
            >
                <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-white/20 bg-white/5 shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(76,137,255,0.95),transparent_56%),radial-gradient(circle_at_78%_84%,rgba(28,201,143,0.7),transparent_58%)]" />
                    <div className="absolute inset-[1px] rounded-[10px] bg-black/45" />
                    <svg viewBox="0 0 24 24" className="relative z-10 h-full w-full p-[6px]" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <defs>
                            <linearGradient id="prospect-mark-gradient" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FFFFFF" />
                                <stop offset="1" stopColor="#B8D5FF" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M12 2.9 4.3 7.5l3 8.2L12 20.2l4.7-4.5 3-8.2L12 2.9Z"
                            stroke="url(#prospect-mark-gradient)"
                            strokeWidth="1.3"
                        />
                        <path
                            d="M12 6.1 8.2 8.4l1.4 4 2.4 2.3 2.4-2.3 1.4-4L12 6.1Z"
                            fill="url(#prospect-mark-gradient)"
                            fillOpacity="0.7"
                        />
                    </svg>
                </div>
                <span className="font-semibold tracking-tight text-lg text-white/95">Prospect<span className="text-white/50">Ore</span></span>
            </motion.div>

            <motion.nav
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0.2 } : { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
                <button
                    onClick={onContactClick}
                    className="text-sm font-medium tracking-wide text-white/60 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                    Support
                </button>
            </motion.nav>
        </header>
    );
}

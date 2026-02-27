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
                <div className="h-8 w-8 rounded-full bg-apple-gray-100/10 flex items-center justify-center border border-white/10 shadow-inner">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 22h20L12 2z" fill="url(#paint0_linear)" />
                        <defs>
                            <linearGradient id="paint0_linear" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FFF" />
                                <stop offset="1" stopColor="#999" />
                            </linearGradient>
                        </defs>
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

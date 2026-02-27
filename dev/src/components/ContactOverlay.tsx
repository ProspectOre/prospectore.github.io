import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ContactOverlayProps {
    onClose: () => void;
}

export default function ContactOverlay({ onClose }: ContactOverlayProps) {
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6" role="dialog" aria-modal="true" aria-labelledby="support-dialog-title">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0.2 : 0.4 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={onClose}
            />

            <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
                transition={prefersReducedMotion ? { duration: 0.2 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex w-full max-w-lg flex-col items-center rounded-[2rem] border border-white/12 bg-white/[0.04] p-6 text-center shadow-2xl backdrop-blur-xl md:p-10"
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    aria-label="Close support dialog"
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <h2 id="support-dialog-title" className="text-3xl font-bold tracking-tight mb-4 text-balance">Always here.</h2>
                <p className="text-white/60 mb-8 text-balance leading-relaxed">
                    We believe great software is backed by exceptional service. Drop us a line and experience the difference.
                </p>

                <a
                    href="mailto:support@prospectorellc.com"
                    className="group relative text-xl font-semibold tracking-tight text-white transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                    support@prospectorellc.com
                    <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-aurora-1 to-aurora-3 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
                </a>
            </motion.div>
        </div>
    );
}

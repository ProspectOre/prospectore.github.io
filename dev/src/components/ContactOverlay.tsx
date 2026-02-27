import { motion } from 'framer-motion';

interface ContactOverlayProps {
    onClose: () => void;
}

export default function ContactOverlay({ onClose }: ContactOverlayProps) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={onClose}
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="glass-panel relative z-10 w-full max-w-lg rounded-[2rem] p-10 flex flex-col items-center text-center shadow-2xl"
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <h2 className="text-3xl font-bold tracking-tight mb-4 text-balance">Always here.</h2>
                <p className="text-white/60 mb-8 text-balance leading-relaxed">
                    We believe great software is backed by exceptional service. Drop us a line and experience the difference.
                </p>

                <a
                    href="mailto:support@prospectorellc.com"
                    className="group relative text-xl font-semibold tracking-tight text-white hover:text-white transition-colors"
                >
                    support@prospectorellc.com
                    <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-aurora-1 to-aurora-3 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
                </a>
            </motion.div>
        </div>
    );
}

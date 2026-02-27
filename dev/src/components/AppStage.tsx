import { motion, AnimatePresence } from 'framer-motion';
import { AppFocusState } from '../App';
import { useState } from 'react';

interface AppStageProps {
    focusState: AppFocusState;
    onFocusChange: (state: AppFocusState) => void;
}

export default function AppStage({ focusState, onFocusChange }: AppStageProps) {
    const [hoveredApp, setHoveredApp] = useState<AppFocusState | null>(null);

    const apps = [
        {
            id: 'mycut' as const,
            name: 'MyCut',
            category: 'Commission Tracker',
            desc: 'Track every deal and audit your pay with total clarity. Built specifically for sales professionals who demand transparency.',
            icon: 'M',
            iconUrl: '/assets/mycut_icon.jpg',
            screenshots: [
                '/assets/mycut_screenshot_1.jpg',
                '/assets/mycut_screenshot_2.jpg',
                '/assets/mycut_screenshot_3.jpg',
            ],
            color: 'text-aurora-2',
            link: 'https://apps.apple.com/app/id6757658940'
        },
        {
            id: 'guardreel' as const,
            name: 'GuardReel',
            category: 'Tesla Dashcam',
            desc: 'The ultimate viewer to scrub, review, and share logic-defying moments caught by your Tesla\'s cameras—all natively on your iPhone.',
            icon: 'G',
            iconUrl: '/assets/guardreel_icon.jpg',
            screenshots: [
                '/assets/guardreel_screenshot_1.jpg',
                '/assets/guardreel_screenshot_2.jpg',
                '/assets/guardreel_screenshot_3.jpg',
            ],
            color: 'text-aurora-1',
            link: 'https://apps.apple.com/us/app/guardreel-dashcam-editor/id6758811138'
        }
    ];

    // If an app is focused, we only render that app expanded.
    const isExpanded = focusState !== 'idle';
    const focusedAppData = apps.find(a => a.id === focusState);

    return (
        <div className="w-full max-w-4xl relative">
            <AnimatePresence mode="wait">
                {!isExpanded ? (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
                    >
                        {apps.map((app) => (
                            <motion.div
                                key={app.id}
                                layoutId={`card-${app.id}`}
                                onClick={() => onFocusChange(app.id)}
                                onHoverStart={() => setHoveredApp(app.id)}
                                onHoverEnd={() => setHoveredApp(null)}
                                className="group relative cursor-pointer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.1] }}
                            >
                                <div className="glass-panel rounded-3xl p-8 h-full flex flex-col items-start transition-colors duration-500 ease-in-out group-hover:bg-white/[0.06]">
                                    <motion.div
                                        layoutId={`icon-${app.id}`}
                                        className="w-16 h-16 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center mb-8 shadow-inner overflow-hidden"
                                    >
                                        {app.iconUrl ? (
                                            <img src={app.iconUrl} alt={app.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className={`font-serif text-2xl font-bold ${app.color}`}>{app.icon}</span>
                                        )}
                                    </motion.div>

                                    <motion.h3 layoutId={`title-${app.id}`} className="text-2xl font-semibold tracking-tight mb-2">
                                        {app.name}
                                    </motion.h3>

                                    <motion.span layoutId={`cat-${app.id}`} className={`text-xs uppercase tracking-widest font-semibold ${app.color} mb-4`}>
                                        {app.category}
                                    </motion.span>

                                    <motion.div
                                        initial={{ opacity: 0.6 }}
                                        animate={{ opacity: hoveredApp === app.id ? 1 : 0.6 }}
                                        className="mt-auto text-sm text-white/50 group-hover:text-white/80 transition-colors duration-300"
                                    >
                                        Click to explore →
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="expanded"
                        className="w-full h-[60vh] max-h-[600px]"
                    >
                        {focusedAppData && (
                            <motion.div
                                layoutId={`card-${focusedAppData.id}`}
                                className="glass-panel rounded-[2rem] p-10 h-full w-full flex flex-col md:flex-row gap-10 overflow-hidden relative"
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => onFocusChange('idle')}
                                    className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-20"
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>

                                <div className="flex-1 flex flex-col justify-center max-w-md">
                                    <motion.div
                                        layoutId={`icon-${focusedAppData.id}`}
                                        className="w-20 h-20 rounded-3xl bg-black/50 border border-white/10 flex items-center justify-center mb-8 shadow-inner overflow-hidden"
                                    >
                                        {focusedAppData.iconUrl ? (
                                            <img src={focusedAppData.iconUrl} alt={focusedAppData.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className={`font-serif text-3xl font-bold ${focusedAppData.color}`}>{focusedAppData.icon}</span>
                                        )}
                                    </motion.div>

                                    <motion.h3 layoutId={`title-${focusedAppData.id}`} className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
                                        {focusedAppData.name}
                                    </motion.h3>

                                    <motion.span layoutId={`cat-${focusedAppData.id}`} className={`text-sm uppercase tracking-widest font-semibold ${focusedAppData.color} mb-6`}>
                                        {focusedAppData.category}
                                    </motion.span>

                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.6 }}
                                        className="text-lg text-white/70 leading-relaxed mb-8 text-balance"
                                    >
                                        {focusedAppData.desc}
                                    </motion.p>

                                    <motion.a
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.6 }}
                                        href={focusedAppData.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-medium w-fit hover:scale-105 transition-transform"
                                    >
                                        <svg viewBox="0 0 814 1000" className="w-4 h-4 fill-current"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-43.4-150.3-109.1C67 373.2 17 225.3 17 216.1 17 94.8 99.9 31.8 181.3 31.8c69.9 0 119.6 43.5 160.3 43.5 39.5 0 99.6-47.4 180.9-47.4 28.8 0 130.3 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" /></svg>
                                        Download on App Store
                                    </motion.a>
                                </div>

                                {/* Beautiful app preview imagery */}
                                <div className="flex-1 hidden md:flex items-center justify-center relative overflow-hidden group perspective-[1200px] pl-12">
                                    {focusedAppData.screenshots?.map((src, idx) => (
                                        <motion.img
                                            key={src}
                                            src={src}
                                            initial={{ opacity: 0, x: 100, y: 30, rotateY: -20, scale: 0.9 }}
                                            animate={{ opacity: 1, x: (idx - 1) * 85, y: Math.abs(idx - 1) * 15, rotateY: -10, scale: 1 }}
                                            transition={{ delay: 0.4 + idx * 0.15, duration: 0.8, ease: "easeOut" }}
                                            className="absolute h-full max-h-[85%] w-auto object-cover rounded-[1.5rem] shadow-2xl border border-white/20 transition-transform duration-500 hover:scale-105 hover:z-50"
                                            style={{ zIndex: 10 - idx }}
                                            alt={`${focusedAppData.name} Screenshot ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

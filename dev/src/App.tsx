import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AppLayout from './components/AppLayout.tsx';
import InteractiveBackground from './components/InteractiveBackground.tsx';
import HeroHeader from './components/HeroHeader.tsx';
import AppStage from './components/AppStage.tsx';
import ContactOverlay from './components/ContactOverlay.tsx';

export type AppFocusState = 'idle' | 'mycut' | 'guardreel';

function App() {
    const [focusState, setFocusState] = useState<AppFocusState>('idle');
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <AppLayout>
            <InteractiveBackground focusState={focusState} />

            <div className="relative z-10 flex h-full w-full flex-col px-6 md:px-12 py-8 max-w-7xl mx-auto pointer-events-none">
                {/* Header commands are pointer accessible */}
                <div className="pointer-events-auto">
                    <HeroHeader onContactClick={() => setIsContactOpen(true)} />
                </div>

                {/* Main interactive stage */}
                <main className="flex-1 flex flex-col justify-center items-center pointer-events-auto mt-12 md:mt-0">
                    <AppStage focusState={focusState} onFocusChange={setFocusState} />
                </main>

                {/* Modals and Overlays */}
                <AnimatePresence>
                    {isContactOpen && (
                        <div className="pointer-events-auto">
                            <ContactOverlay onClose={() => setIsContactOpen(false)} />
                        </div>
                    )}
                </AnimatePresence>

                {/* Minimal Footer integrated organically */}
                <footer className="w-full flex justify-between items-center mt-auto pb-4 opacity-40 text-xs font-mono tracking-widest uppercase">
                    <span>© {new Date().getFullYear()} ProspectOre LLC</span>
                    <span className="hidden sm:inline-block">Software engineered to inspire awe</span>
                </footer>
            </div>
        </AppLayout>
    );
}

export default App;

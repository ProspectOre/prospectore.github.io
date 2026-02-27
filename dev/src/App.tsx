import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AppLayout from './components/AppLayout.tsx';
import IntelligentBackdrop from './components/IntelligentBackdrop.tsx';
import HeroHeader from './components/HeroHeader.tsx';
import AppStage from './components/AppStage.tsx';
import ContactOverlay from './components/ContactOverlay.tsx';

export type AppFocusState = 'idle' | 'mycut' | 'guardreel';

function App() {
  const [focusState, setFocusState] = useState<AppFocusState>('guardreel');
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <AppLayout>
      <IntelligentBackdrop focusState={focusState} />

      <div className="pointer-events-none relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col px-4 py-5 md:px-12 md:py-8">
        <div className="pointer-events-auto">
          <HeroHeader onContactClick={() => setIsContactOpen(true)} />
        </div>

        <main className="pointer-events-auto flex flex-1 items-center justify-center overflow-visible md:overflow-hidden">
          <AppStage focusState={focusState} onFocusChange={setFocusState} />
        </main>

        <AnimatePresence>
          {isContactOpen && (
            <div className="pointer-events-auto">
              <ContactOverlay onClose={() => setIsContactOpen(false)} />
            </div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}

export default App;

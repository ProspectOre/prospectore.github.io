import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AppLayout from './components/AppLayout.tsx';
import IntelligentBackdrop from './components/IntelligentBackdrop.tsx';
import HeroHeader from './components/HeroHeader.tsx';
import AppStage from './components/AppStage.tsx';
import ContactOverlay from './components/ContactOverlay.tsx';

export type AppFocusState = 'idle' | 'mycut' | 'guardreel';

function App() {
  const [focusState, setFocusState] = useState<AppFocusState>('idle');
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <AppLayout>
      <IntelligentBackdrop focusState={focusState} />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col px-6 py-8 md:px-12 pointer-events-none">
        <div className="pointer-events-auto">
          <HeroHeader onContactClick={() => setIsContactOpen(true)} />
        </div>

        <main className="pointer-events-auto flex-1 overflow-hidden">
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

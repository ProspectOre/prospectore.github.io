import { motion } from 'framer-motion';
import { AppFocusState } from '../App';

interface IntelligentBackdropProps {
  focusState: AppFocusState;
}

export default function IntelligentBackdrop({ focusState }: IntelligentBackdropProps) {
  const backgroundForState = (state: AppFocusState) => {
    switch (state) {
      case 'guardreel':
        return '#070B13';
      case 'mycut':
        return '#07110D';
      default:
        return '#0B0B0D';
    }
  };

  const orbA = (state: AppFocusState) => {
    switch (state) {
      case 'guardreel':
        return 'radial-gradient(circle, rgba(76, 137, 255, 0.20) 0%, transparent 70%)';
      case 'mycut':
        return 'radial-gradient(circle, rgba(28, 201, 143, 0.22) 0%, transparent 72%)';
      default:
        return 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 65%)';
    }
  };

  const orbB = (state: AppFocusState) => {
    switch (state) {
      case 'guardreel':
        return 'radial-gradient(circle, rgba(96, 56, 255, 0.16) 0%, transparent 70%)';
      case 'mycut':
        return 'radial-gradient(circle, rgba(16, 147, 104, 0.20) 0%, transparent 70%)';
      default:
        return 'radial-gradient(circle, rgba(140, 140, 155, 0.08) 0%, transparent 60%)';
    }
  };

  return (
    <motion.div
      className="absolute inset-0 z-0 overflow-hidden"
      animate={{ backgroundColor: backgroundForState(focusState) }}
      transition={{ duration: 1.1, ease: 'easeOut' }}
    >
      <motion.div
        className="absolute left-[-12%] top-[-14%] h-[62vw] w-[62vw] rounded-full blur-[92px]"
        animate={{
          background: orbA(focusState),
          x: [0, 32, -16, 0],
          y: [0, 28, 44, 0],
        }}
        transition={{
          background: { duration: 1.1 },
          x: { repeat: Infinity, duration: 24, ease: 'linear' },
          y: { repeat: Infinity, duration: 19, ease: 'linear' },
        }}
      />

      <motion.div
        className="absolute bottom-[-14%] right-[-8%] h-[56vw] w-[56vw] rounded-full blur-[92px]"
        animate={{
          background: orbB(focusState),
          x: [0, -24, 16, 0],
          y: [0, -36, -12, 0],
        }}
        transition={{
          background: { duration: 1.1 },
          x: { repeat: Infinity, duration: 30, ease: 'linear' },
          y: { repeat: Infinity, duration: 23, ease: 'linear' },
        }}
      />
    </motion.div>
  );
}

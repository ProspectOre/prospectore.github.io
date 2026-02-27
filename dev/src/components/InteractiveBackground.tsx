import { motion } from 'framer-motion';
import { AppFocusState } from '../App';

interface BackgroundProps {
    focusState: AppFocusState;
}

export default function InteractiveBackground({ focusState }: BackgroundProps) {
    // Define aurora colors based on focus state
    const getBackgroundColor = (state: AppFocusState) => {
        switch (state) {
            case 'idle':
                return 'rgba(20, 20, 22, 1)';
            case 'guardreel':
                return 'rgba(10, 15, 36, 1)'; // Deep space blue/black
            case 'mycut':
                return 'rgba(38, 18, 18, 1)'; // Deep crimson/black
        }
    };

    const getOrb1Color = (state: AppFocusState) => {
        switch (state) {
            case 'idle': return 'radial-gradient(circle, rgba(200,200,250,0.08) 0%, transparent 60%)';
            case 'guardreel': return 'radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, transparent 70%)';
            case 'mycut': return 'radial-gradient(circle, rgba(255, 90, 95, 0.15) 0%, transparent 70%)';
        }
    };

    const getOrb2Color = (state: AppFocusState) => {
        switch (state) {
            case 'idle': return 'radial-gradient(circle, rgba(100,100,100,0.05) 0%, transparent 60%)';
            case 'guardreel': return 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)';
            case 'mycut': return 'radial-gradient(circle, rgba(230, 50, 50, 0.12) 0%, transparent 60%)';
        }
    };

    return (
        <motion.div
            className="absolute inset-0 z-0 overflow-hidden"
            animate={{ backgroundColor: getBackgroundColor(focusState) }}
            transition={{ duration: 1.5, ease: 'linear' }}
        >
            {/* Orb 1: Primary Aurora */}
            <motion.div
                className="absolute w-[60vw] h-[60vw] rounded-full top-[-10%] left-[-10%] blur-[80px]"
                animate={{
                    background: getOrb1Color(focusState),
                    x: [0, 40, -20, 0],
                    y: [0, 20, 50, 0]
                }}
                transition={{
                    background: { duration: 1.5 },
                    x: { repeat: Infinity, duration: 25, ease: "linear" },
                    y: { repeat: Infinity, duration: 20, ease: "linear" }
                }}
            />

            {/* Orb 2: Secondary Aurora */}
            <motion.div
                className="absolute w-[55vw] h-[55vw] rounded-full bottom-[-10%] right-[-5%] blur-[90px]"
                animate={{
                    background: getOrb2Color(focusState),
                    x: [0, -30, 20, 0],
                    y: [0, -40, -10, 0]
                }}
                transition={{
                    background: { duration: 1.5 },
                    x: { repeat: Infinity, duration: 30, ease: "linear" },
                    y: { repeat: Infinity, duration: 25, ease: "linear" }
                }}
            />
        </motion.div>
    );
}

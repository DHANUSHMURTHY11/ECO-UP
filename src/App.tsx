import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from './context/AppContext';
import { FloatingParticles } from './components/FloatingParticles';
import { NavigationHeader } from './components/NavigationHeader';

import { SceneLoading } from './pages/SceneLoading';
import { SceneCatIntro } from './pages/SceneCatIntro';
import { ScenePoemOne } from './pages/ScenePoemOne';
import { SceneMiniGame } from './pages/SceneMiniGame';
import { SceneSuspenseProposal } from './pages/SceneSuspenseProposal';
import { SceneProposal } from './pages/SceneProposal';
import { SceneNoGraceful } from './pages/SceneNoGraceful';
import { SceneYesCelebration } from './pages/SceneYesCelebration';
import { SceneDeliveryCar } from './pages/SceneDeliveryCar';
import { SceneContract } from './pages/SceneContract';
import { SceneFinalGrand } from './pages/SceneFinalGrand';

export const AppContent: React.FC = () => {
  const { state } = useApp();

  useEffect(() => {
    if (state.isNightMode) {
      document.body.classList.add('night-mode');
    } else {
      document.body.classList.remove('night-mode');
    }
  }, [state.isNightMode]);

  const renderScene = () => {
    switch (state.currentScene) {
      case 'LOADING':
        return <SceneLoading key="loading" />;
      case 'CAT_INTRO':
        return <SceneCatIntro key="cat_intro" />;
      case 'POEM_ONE':
        return <ScenePoemOne key="poem_one" />;
      case 'PET_GAME':
        return <SceneMiniGame key="pet_game" />;
      case 'SUSPENSE_PROPOSAL':
        return <SceneSuspenseProposal key="suspense" />;
      case 'PROPOSAL_QUESTION':
        return <SceneProposal key="proposal" />;
      case 'NO_GRACEFUL':
        return <SceneNoGraceful key="no_graceful" />;
      case 'YES_CELEBRATION':
        return <SceneYesCelebration key="yes_celebration" />;
      case 'DELIVERY_CAR':
        return <SceneDeliveryCar key="delivery_car" />;
      case 'CONTRACT':
        return <SceneContract key="contract" />;
      case 'GRAND_FINALE':
        return <SceneFinalGrand key="grand_finale" />;
      default:
        return <SceneLoading key="default" />;
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Particles Canvas */}
      <FloatingParticles />

      {/* Persistent Navigation Header */}
      <NavigationHeader />

      {/* Animated Scene Transition Container */}
      <main className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.currentScene}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full min-h-screen"
          >
            {renderScene()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

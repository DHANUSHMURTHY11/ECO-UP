import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from './context/AppContext';
import { FloatingParticles } from './components/FloatingParticles';
import { NavigationHeader } from './components/NavigationHeader';
import { BackgroundMusicPlayer } from './components/BackgroundMusicPlayer';

import { SceneLoading } from './pages/SceneLoading';
import { SceneCatIntro } from './pages/SceneCatIntro';
import { SceneFlowerGift } from './pages/SceneFlowerGift';
import { SceneHeartConnection } from './pages/SceneHeartConnection';
import { ScenePoemOne } from './pages/ScenePoemOne';
import { ScenePromise } from './pages/ScenePromise';
import { SceneMemoriesGallery } from './pages/SceneMemoriesGallery';
import { SceneProposal } from './pages/SceneProposal';
import { SceneNoGraceful } from './pages/SceneNoGraceful';
import { SceneYesCelebration } from './pages/SceneYesCelebration';
import { SceneFinalGrand } from './pages/SceneFinalGrand';

export const AppContent: React.FC = () => {
  const { state } = useApp();

  useEffect(() => {
    if (state.isNightMode) {
      document.body.classList.add('night-mode');
      document.body.classList.remove('golden-hour');
    } else if (state.isGoldenHour) {
      document.body.classList.add('golden-hour');
      document.body.classList.remove('night-mode');
    } else {
      document.body.classList.remove('night-mode');
      document.body.classList.remove('golden-hour');
    }
  }, [state.isNightMode, state.isGoldenHour]);

  const renderScene = () => {
    switch (state.currentScene) {
      case 'LOADING':
        return <SceneLoading key="loading" />;
      case 'CAT_INTRO':
        return <SceneCatIntro key="cat_intro" />;
      case 'FLOWER_GIFT':
        return <SceneFlowerGift key="flower_gift" />;
      case 'HEART_CONNECTION':
        return <SceneHeartConnection key="heart_connection" />;
      case 'POEM_ONE':
        return <ScenePoemOne key="poem_one" />;
      case 'PROMISE_SECTION':
        return <ScenePromise key="promise_section" />;
      case 'MEMORIES_GALLERY':
        return <SceneMemoriesGallery key="memories_gallery" />;
      case 'PROPOSAL_QUESTION':
        return <SceneProposal key="proposal" />;
      case 'NO_GRACEFUL':
        return <SceneNoGraceful key="no_graceful" />;
      case 'YES_CELEBRATION':
        return <SceneYesCelebration key="yes_celebration" />;
      case 'GRAND_FINALE':
        return <SceneFinalGrand key="grand_finale" />;
      default:
        return <SceneLoading key="default" />;
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <FloatingParticles />
      <NavigationHeader />
      <BackgroundMusicPlayer />

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

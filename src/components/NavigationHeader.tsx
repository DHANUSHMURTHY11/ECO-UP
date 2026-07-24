import React from 'react';
import { useApp } from '../context/AppContext';
import { Volume2, VolumeX, Sparkles, RefreshCw } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';

export const NavigationHeader: React.FC = () => {
  const { state, dispatch, goToScene } = useApp();
  const { playPop } = useAudioEngine();

  const handleAudioToggle = () => {
    playPop(800);
    dispatch({ type: 'TOGGLE_AUDIO' });
  };

  const handleReset = () => {
    playPop(400);
    goToScene('CAT_INTRO');
  };

  if (state.currentScene === 'LOADING') return null;

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 max-w-4xl mx-auto flex items-center justify-between pointer-events-auto">
      {/* Brand Badge */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-white/60 shadow-sm text-sm font-semibold text-pink-600 select-none">
        <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
        <span>A Little Story</span>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        {/* Reset / Replay button */}
        <button
          onClick={handleReset}
          className="p-2.5 rounded-full bg-white/70 backdrop-blur-md border border-white/60 shadow-sm text-pink-500 hover:bg-pink-50 hover:scale-110 active:scale-95 transition-all"
          title="Restart Story"
          aria-label="Restart Story"
        >
          <RefreshCw className="w-5 h-5" />
        </button>

        {/* Audio Mute / Unmute Button */}
        <button
          onClick={handleAudioToggle}
          className="p-2.5 rounded-full bg-white/70 backdrop-blur-md border border-white/60 shadow-sm text-pink-500 hover:bg-pink-50 hover:scale-110 active:scale-95 transition-all flex items-center gap-1.5 px-3.5"
          title={state.audioMuted ? 'Unmute Sound' : 'Mute Sound'}
          aria-label={state.audioMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {state.audioMuted ? (
            <>
              <VolumeX className="w-5 h-5 text-gray-400" />
              <span className="text-xs font-medium text-gray-400 hidden sm:inline">Muted</span>
            </>
          ) : (
            <>
              <Volume2 className="w-5 h-5 text-pink-500 animate-pulse" />
              <span className="text-xs font-semibold text-pink-500 hidden sm:inline">Music ON</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};

import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

const sceneTrackMap: Record<string, string> = {
  CAT_INTRO: './assets/audio/beginning_song.mpeg',
  FLOWER_GIFT: './assets/audio/beginning_song.mpeg',
  HEART_CONNECTION: './assets/audio/beginning_song.mpeg',
  POEM_ONE: './assets/audio/poem_song.mpeg',
  PROMISE_SECTION: './assets/audio/poem_song.mpeg',
  MEMORIES_GALLERY: './assets/audio/this_could_be_us_song.mpeg',
  PROPOSAL_QUESTION: './assets/audio/this_could_be_us_song.mpeg',
  NO_GRACEFUL: './assets/audio/this_could_be_us_song.mpeg',
  YES_CELEBRATION: './assets/audio/celebration_song.mpeg',
  CONTRACT: './assets/audio/celebration_song.mpeg',
  POST_SIGNATURE: './assets/audio/celebration_song.mpeg',
  GRAND_FINALE: './assets/audio/celebration_song.mpeg',
};

export const BackgroundMusicPlayer: React.FC = () => {
  const { state, dispatch } = useApp();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackRef = useRef<string | null>(null);

  // User Interaction Auto-Start Listener
  useEffect(() => {
    const handleFirstTouch = () => {
      if (!state.audioStarted) {
        dispatch({ type: 'START_AUDIO' });
      }
    };

    window.addEventListener('click', handleFirstTouch, { once: true });
    window.addEventListener('touchstart', handleFirstTouch, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstTouch);
      window.removeEventListener('touchstart', handleFirstTouch);
    };
  }, [state.audioStarted, dispatch]);

  // Track Selector & Audio Controller
  useEffect(() => {
    if (!audioRef.current) return;

    const targetTrack = sceneTrackMap[state.currentScene] || './assets/audio/beginning_song.mpeg';

    // Mute Controller
    audioRef.current.muted = state.audioMuted || !state.audioStarted;

    // Track Switcher
    if (currentTrackRef.current !== targetTrack) {
      currentTrackRef.current = targetTrack;
      audioRef.current.src = targetTrack;
      audioRef.current.load();

      if (state.audioStarted && !state.audioMuted) {
        audioRef.current.play().catch(() => {});
      }
    } else {
      if (state.audioStarted && !state.audioMuted && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [state.currentScene, state.audioStarted, state.audioMuted]);

  return (
    <audio
      ref={audioRef}
      loop
      preload="auto"
      className="hidden"
    />
  );
};

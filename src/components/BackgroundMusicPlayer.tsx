import React, { useEffect, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';

const BASE = import.meta.env.BASE_URL || './';

const sceneTrackMap: Record<string, string> = {
  CAT_INTRO: `${BASE}assets/audio/beginning_song.mpeg`,
  FLOWER_GIFT: `${BASE}assets/audio/beginning_song.mpeg`,
  HEART_CONNECTION: `${BASE}assets/audio/beginning_song.mpeg`,
  POEM_ONE: `${BASE}assets/audio/poem_song.mpeg`,
  PROMISE_SECTION: `${BASE}assets/audio/poem_song.mpeg`,
  MEMORIES_GALLERY: `${BASE}assets/audio/this_could_be_us_song.mpeg`,
  PROPOSAL_QUESTION: `${BASE}assets/audio/this_could_be_us_song.mpeg`,
  NO_GRACEFUL: `${BASE}assets/audio/this_could_be_us_song.mpeg`,
  YES_CELEBRATION: `${BASE}assets/audio/celebration_song.mpeg`,
  CONTRACT: `${BASE}assets/audio/celebration_song.mpeg`,
  POST_SIGNATURE: `${BASE}assets/audio/celebration_song.mpeg`,
  GRAND_FINALE: `${BASE}assets/audio/celebration_song.mpeg`,
};

export const BackgroundMusicPlayer: React.FC = () => {
  const { state, dispatch } = useApp();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackRef = useRef<string | null>(null);
  const hasInteracted = useRef(false);

  // Auto-start audio on first user interaction (click/touch)
  const handleInteraction = useCallback(() => {
    if (hasInteracted.current) return;
    hasInteracted.current = true;

    if (!state.audioStarted) {
      dispatch({ type: 'START_AUDIO' });
    }

    // Immediately try to play the current track on first interaction
    if (audioRef.current) {
      const targetTrack = sceneTrackMap[state.currentScene] || sceneTrackMap.CAT_INTRO;
      if (!currentTrackRef.current) {
        currentTrackRef.current = targetTrack;
        audioRef.current.src = targetTrack;
        audioRef.current.load();
      }
      audioRef.current.volume = 0.7;
      audioRef.current.play().catch(() => {});
    }
  }, [state.audioStarted, state.currentScene, dispatch]);

  useEffect(() => {
    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [handleInteraction]);

  // Track Selector & Audio Controller - switches tracks on scene change
  useEffect(() => {
    if (!audioRef.current) return;

    const targetTrack = sceneTrackMap[state.currentScene] || sceneTrackMap.CAT_INTRO;

    // Handle mute state
    if (state.audioMuted || !state.audioStarted) {
      audioRef.current.pause();
      return;
    }

    // Switch track if scene changed to a new track
    if (currentTrackRef.current !== targetTrack) {
      // Fade out then switch
      currentTrackRef.current = targetTrack;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = targetTrack;
      audioRef.current.load();
      audioRef.current.volume = 0.7;
      audioRef.current.play().catch(() => {});
    } else {
      // Same track, ensure it's playing
      if (audioRef.current.paused) {
        audioRef.current.volume = 0.7;
        audioRef.current.play().catch(() => {});
      }
    }
  }, [state.currentScene, state.audioStarted, state.audioMuted]);

  return (
    <audio
      ref={audioRef}
      loop
      preload="auto"
      style={{ display: 'none' }}
    />
  );
};

import { useEffect, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';

export const useAudioEngine = () => {
  const { state } = useApp();
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const timerRef = useRef<number | null>(null);

  // Initialize Web Audio Context
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Play soft pop sound
  const playPop = useCallback((pitch = 440) => {
    if (state.audioMuted || !state.audioStarted) return;
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Audio fallback
    }
  }, [state.audioMuted, state.audioStarted, getAudioContext]);

  // Play cute meow / purr sound
  const playPurr = useCallback(() => {
    if (state.audioMuted || !state.audioStarted) return;
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      
      // Meow glide frequency
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(520, ctx.currentTime + 0.15);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {}
  }, [state.audioMuted, state.audioStarted, getAudioContext]);

  // Play Stamp sound
  const playStamp = useCallback(() => {
    if (state.audioMuted || !state.audioStarted) return;
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {}
  }, [state.audioMuted, state.audioStarted, getAudioContext]);

  // Play Celebration Chime
  const playCelebration = useCallback(() => {
    if (state.audioMuted || !state.audioStarted) return;
    try {
      const ctx = getAudioContext();
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.1, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.4);
      });
    } catch {}
  }, [state.audioMuted, state.audioStarted, getAudioContext]);

  // Play Car Honk
  const playCarHonk = useCallback(() => {
    if (state.audioMuted || !state.audioStarted) return;
    try {
      const ctx = getAudioContext();
      [400, 500].forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      });
    } catch {}
  }, [state.audioMuted, state.audioStarted, getAudioContext]);

  // Background Melody Loop (Lofi Disney style chord progression)
  useEffect(() => {
    if (!state.audioStarted || state.audioMuted) {
      if (timerRef.current) clearInterval(timerRef.current);
      isPlayingRef.current = false;
      return;
    }

    if (isPlayingRef.current) return;
    isPlayingRef.current = true;

    // Soft Arpeggio Notes (C maj7 -> Am7 -> F maj7 -> G7)
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 349.23], // G7
    ];

    let chordIndex = 0;
    let noteIndex = 0;

    const playNextNote = () => {
      if (state.audioMuted) return;
      try {
        const ctx = getAudioContext();
        const currentChord = chords[chordIndex];
        const freq = currentChord[noteIndex];

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0005, ctx.currentTime + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.8);

        noteIndex = (noteIndex + 1) % currentChord.length;
        if (noteIndex === 0) {
          chordIndex = (chordIndex + 1) % chords.length;
        }
      } catch {}
    };

    timerRef.current = window.setInterval(playNextNote, 600);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      isPlayingRef.current = false;
    };
  }, [state.audioStarted, state.audioMuted, getAudioContext]);

  return {
    playPop,
    playPurr,
    playStamp,
    playCelebration,
    playCarHonk,
  };
};

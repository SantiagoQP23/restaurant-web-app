import { useRef, useCallback, useState, useEffect } from 'react';

/**
 * Custom hook to play notification sounds with user control
 * Uses Web Audio API to generate a pleasant notification beep
 * @version 1.0 2026-01-07
 */
export const useNotificationSound = (volume: number = 0.5) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    // Load mute preference from localStorage
    const saved = localStorage.getItem('notificationSoundMuted');
    return saved === 'true';
  });
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(false);

  // Initialize AudioContext on first user interaction
  useEffect(() => {
    const initAudioContext = () => {
      if (!audioContextRef.current) {
        try {
          audioContextRef.current = new (window.AudioContext ||
            (window as any).webkitAudioContext)();
          setIsAudioEnabled(true);
        } catch (error) {
          console.warn('AudioContext not supported:', error);
        }
      }
    };

    // Try to initialize immediately
    initAudioContext();

    // Also listen for user interaction to enable audio
    const enableAudio = () => {
      initAudioContext();
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }
    };

    window.addEventListener('click', enableAudio, { once: true });
    window.addEventListener('keydown', enableAudio, { once: true });

    return () => {
      window.removeEventListener('click', enableAudio);
      window.removeEventListener('keydown', enableAudio);
    };
  }, []);

  // Save mute preference to localStorage
  useEffect(() => {
    localStorage.setItem('notificationSoundMuted', String(isMuted));
  }, [isMuted]);

  /**
   * Plays a pleasant notification sound (two-tone beep)
   */
  const play = useCallback(async () => {
    if (isMuted || !audioContextRef.current) {
      return;
    }

    try {
      const ctx = audioContextRef.current;

      // Resume context if suspended (browser autoplay policy)
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      const currentTime = ctx.currentTime;

      // Create oscillator for first tone (higher pitch)
      const oscillator1 = ctx.createOscillator();
      const gainNode1 = ctx.createGain();

      oscillator1.connect(gainNode1);
      gainNode1.connect(ctx.destination);

      oscillator1.frequency.value = 800; // Hz
      oscillator1.type = 'sine';

      gainNode1.gain.setValueAtTime(0, currentTime);
      gainNode1.gain.linearRampToValueAtTime(volume, currentTime + 0.01);
      gainNode1.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.15);

      oscillator1.start(currentTime);
      oscillator1.stop(currentTime + 0.15);

      // Create oscillator for second tone (lower pitch)
      const oscillator2 = ctx.createOscillator();
      const gainNode2 = ctx.createGain();

      oscillator2.connect(gainNode2);
      gainNode2.connect(ctx.destination);

      oscillator2.frequency.value = 600; // Hz
      oscillator2.type = 'sine';

      gainNode2.gain.setValueAtTime(0, currentTime + 0.15);
      gainNode2.gain.linearRampToValueAtTime(volume, currentTime + 0.16);
      gainNode2.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.35);

      oscillator2.start(currentTime + 0.15);
      oscillator2.stop(currentTime + 0.35);
    } catch (error) {
      console.error('Error playing notification sound:', error);
    }
  }, [isMuted, volume]);

  /**
   * Toggle mute state
   */
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  /**
   * Set mute state explicitly
   */
  const setMute = useCallback((mute: boolean) => {
    setIsMuted(mute);
  }, []);

  return {
    play,
    isMuted,
    toggleMute,
    setMute,
    isAudioEnabled
  };
};

import {
  createAudioPlayer,
  setAudioModeAsync,
  type AudioPlayer,
} from 'expo-audio';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { PlaybackStatus } from '@/src/types/audio';

const SKIP_SECONDS = 5;
const END_TOLERANCE = 0.2;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const total = Math.floor(seconds);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function useAudioPlayer() {
  const playerRef = useRef<AudioPlayer | null>(null);
  const [status, setStatus] = useState<PlaybackStatus>('idle');
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    playerRef.current = createAudioPlayer(null);

    return () => {
      playerRef.current?.remove();
      playerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!activeUrl) return;

    const timer = setInterval(() => {
      const player = playerRef.current;
      if (!player) return;

      setCurrentTime(player.currentTime);
      setDuration(player.duration);

      if (player.playing) {
        setStatus('playing');
        return;
      }

      const atEnd =
        player.duration > 0 &&
        player.currentTime >= Math.max(0, player.duration - END_TOLERANCE);

      if (atEnd) {
        setStatus('idle');
        setActiveUrl(null);
        setCurrentTime(0);
        return;
      }

      if (player.currentTime > 0 || player.paused) {
        setStatus('paused');
      }
    }, 200);

    return () => clearInterval(timer);
  }, [activeUrl]);

  const getPlayer = () => {
    if (!playerRef.current) {
      playerRef.current = createAudioPlayer(null);
    }
    return playerRef.current;
  };

  const stop = useCallback(async () => {
    const player = playerRef.current;
    if (!player) return;

    player.pause();
    await player.seekTo(0);
    setStatus('idle');
    setActiveUrl(null);
    setCurrentTime(0);
    setDuration(0);
  }, []);

  const pause = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    player.pause();
    setCurrentTime(player.currentTime);
    setDuration(player.duration);
    setStatus('paused');
  }, []);

  const resume = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    player.play();
    setStatus('playing');
  }, []);

  const play = useCallback(
    async (url: string) => {
      if (!url) return;

      if (activeUrl === url && status === 'playing') {
        pause();
        return;
      }

      if (activeUrl === url && status === 'paused') {
        resume();
        return;
      }

      setStatus('loading');
      setActiveUrl(url);

      try {
        await setAudioModeAsync({ playsInSilentMode: true });
        const player = getPlayer();
        player.replace(url);
        await player.seekTo(0);
        player.play();
        setStatus('playing');
        setCurrentTime(0);
        setDuration(player.duration);
      } catch {
        await stop();
        throw new Error('Could not play pronunciation.');
      }
    },
    [activeUrl, status, pause, resume, stop],
  );

  const toggle = useCallback(
    async (url: string) => {
      await play(url);
    },
    [play],
  );

  const replay = useCallback(
    async (url: string) => {
      try {
        await setAudioModeAsync({ playsInSilentMode: true });
        const player = getPlayer();
        player.replace(url);
        await player.seekTo(0);
        player.play();
        setActiveUrl(url);
        setStatus('playing');
        setCurrentTime(0);
        setDuration(player.duration);
      } catch {
        await stop();
        throw new Error('Could not replay pronunciation.');
      }
    },
    [stop],
  );

  const seekBy = useCallback(async (offsetSeconds: number) => {
    const player = playerRef.current;
    if (!player || !activeUrl) return;

    const target = Math.max(
      0,
      Math.min(player.duration > 0 ? player.duration : player.currentTime + offsetSeconds, player.currentTime + offsetSeconds),
    );
    await player.seekTo(target);
    setCurrentTime(target);
    setDuration(player.duration);
    if (!player.playing && status !== 'loading') {
      setStatus('paused');
    }
  }, [activeUrl, status]);

  const skipBackward = useCallback(async () => {
    await seekBy(-SKIP_SECONDS);
  }, [seekBy]);

  const skipForward = useCallback(async () => {
    await seekBy(SKIP_SECONDS);
  }, [seekBy]);

  const isPlayingUrl = useCallback(
    (url: string) => activeUrl === url && status === 'playing',
    [activeUrl, status],
  );

  const isPausedUrl = useCallback(
    (url: string) => activeUrl === url && status === 'paused',
    [activeUrl, status],
  );

  const isLoadingUrl = useCallback(
    (url: string) => activeUrl === url && status === 'loading',
    [activeUrl, status],
  );

  const isActiveUrl = useCallback((url: string) => activeUrl === url, [activeUrl]);

  const progressLabel = formatTime(currentTime);
  const durationLabel = formatTime(duration);
  const progressRatio = duration > 0 ? Math.min(1, currentTime / duration) : 0;

  return {
    status,
    activeUrl,
    currentTime,
    duration,
    progressLabel,
    durationLabel,
    progressRatio,
    play,
    pause,
    stop,
    toggle,
    replay,
    resume,
    skipBackward,
    skipForward,
    isPlayingUrl,
    isPausedUrl,
    isLoadingUrl,
    isActiveUrl,
  };
}
